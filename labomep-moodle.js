if (typeof window.LabomepMoodleElements === 'undefined') {
  // Normalement ce script ne devrait être chargé qu'une unique fois car appelé en module
  // On vérifie tout de même au cas où que le fichier ne soit pas appelé en module
  // Ou que l'on appelle des fichiers depuis des serveurs différents
  // Remarque dans ce dernier cas : tout les exos seront chargés depuis le premier serveur
  window.LabomepMoodleElements = []

  window.addEventListener('message', (event) => {
    if (typeof event.data.action.startsWith('sesalab::result::')) {
      const iMoodle = parseInt(event.data.action.substring('sesalab::result::'.length))
      if (typeof window.LabomepMoodleElements[event.data.iMoodle] !== 'undefined') {
        const iframe = window.LabomepMoodleElements[event.data.iMoodle]
        if (event.data.resultat.score !== undefined) {
          const realScore = event.data.resultat.score*100
          const possiblesScores = ['100', '90', '83.33333', '80', '75', '70', '66.66667', '60', '50', '40', '33.33333', '30', '25', '20', '16.66667', '14.28571', '12.5', '11.11111', '10', '5', '0','-1'] /* -1 n'est pas possible mais simplifie l'algo */
          const greaterPossiblesScores = possiblesScores.filter(x=>parseFloat(x) >= realScore)
          const moodleScore = Math.abs(parseFloat(possiblesScores[greaterPossiblesScores.length-1]) - realScore) < Math.abs(parseFloat(possiblesScores[greaterPossiblesScores.length]) - realScore) ? possiblesScores[greaterPossiblesScores.length-1] : possiblesScores[greaterPossiblesScores.length]
          iframe.parentNode.parentNode.querySelector('[name$="_answer"]').value = moodleScore
          iframe.parentNode.parentNode.querySelector('[name$="_-submit"]')?.click()
        }
      }
    }
  })

  const style = document.createElement('style')
  style.innerHTML = '.labomep-question-type .form-inline, .labomep-question-type .im-controls, .labomep-question-type .rightanswer { display: none; }'
  document.head.appendChild(style)

  class LabomepMoodle extends HTMLElement {
    connectedCallback() {
      let SERVEUR_URL
      try {
        SERVEUR_URL = new URL('../..', this.getAttribute('serveur') || 'https://bibliotheque.sesamath.net')
        if (SERVEUR_URL.protocol !== 'http:' && SERVEUR_URL.protocol !== 'https:') {
          throw new Error('Le serveur doit avoir un protocol en http ou https')
        }
        SERVEUR_URL = SERVEUR_URL.href
      } catch (e) {
        SERVEUR_URL = 'data:text,' + e
      }

      const shadow = this.attachShadow({ mode: 'open' }) // this.shadowRoot

      const iMoodle = window.LabomepMoodleElements.length

      let questionDiv = this.parentNode
      // On remonte de parent en parent depuis la balise script jusqu'à trouver le div avec le numero de la question en id
      while (questionDiv !== null) { // s'arrêtera lorsqu'il n'y aura plus de parents
        if (typeof questionDiv.id === 'string' && questionDiv.id.startsWith('question-')) {
          break
        }
        questionDiv = questionDiv.parentNode
      }

      if (questionDiv === null) {
        shadow.appendChild(document.createTextNode('[Erreur de détection de la l’environnement moodle]'))
        return
      }

      questionDiv.classList.add('labomep-question-type')

      const iframe = document.createElement('iframe')
      this.iframe = iframe
      window.LabomepMoodleElements.push(this)

      iframe.setAttribute('width', '100%')
      iframe.setAttribute('height', '400')
      iframe.setAttribute('src', SERVEUR_URL + '/ressource/voir/' + this.getAttribute('identifiant') + '?loadedMessageAction=sesalab::ressourceLoaded&resultatMessageAction=sesalab::result::' + iMoodle)
      iframe.setAttribute('frameBorder', '0')
      iframe.setAttribute('allow', 'fullscreen')
      shadow.appendChild(iframe)

    }

    attributeChangedCallback(name, oldValue, newValue) {
      name === 'height' && (this.iframe.height = newValue)
    }

    static get observedAttributes() { return ['height'] }
  }

  // Define the new element
  customElements.define('labomep-moodle', LabomepMoodle)
}