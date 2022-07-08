if (typeof window.LabomepMoodleElements === 'undefined') {
  // Normalement ce script ne devrait être chargé qu'une unique fois car appelé en module
  // On vérifie tout de même au cas où que le fichier ne soit pas appelé en module
  window.LabomepMoodleElements = []

  window.addEventListener('message', (event) => {
    if (event.data?.action.startsWith('sesalab::result::')) {
      const iMoodle = parseInt(event.data.action.substring('sesalab::result::'.length))
      if (typeof window.LabomepMoodleElements[iMoodle] !== 'undefined') {
        const iframe = window.LabomepMoodleElements[iMoodle]
        if (event.data.result.score !== undefined && event.data.result.fin !== false) {
          const moodleScore = Math.round(event.data.result.score * 10) * 10
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
        SERVEUR_URL = new URL(this.getAttribute('serveur') || 'https://bibliotheque.sesamath.net')
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
      iframe.style.height = '80vh'
      iframe.setAttribute('src', SERVEUR_URL + 'ressource/voir/' + this.getAttribute('identifiant') + '?loadedMessageAction=sesalab::ressourceLoaded&resultatMessageAction=sesalab::result::' + iMoodle)
      iframe.setAttribute('frameBorder', '0')
      iframe.setAttribute('allow', 'fullscreen')

      if (!questionDiv.classList.contains('notyetanswered')) {
        iframe.style.pointerEvents = 'none';
        iframe.style.filter = 'blur(5px)';
        const successMessage = document.createElement('div');
        successMessage.textContent = 'Vous avez déjà effectué cet exercice';
        successMessage.setAttribute('style', 'position: absolute;top: 50%;left: 50%;transform: translate(-50%, -50%);background-color: lightgreen;padding: 10px;border: 1px solid green;color: green;');
        shadow.appendChild(iframe)
        shadow.appendChild(successMessage)
      } else {
        const fullscreenIcon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAB2HAAAdhwGP5fFlAAAAGXRFWHRTb2Z0d2FyZQB3d3cuaW5rc2NhcGUub3Jnm+48GgAAAEtJREFUWIXtl0EKACAIBNv+/+ftbqBIRBAzV00HhSjZ9mggSVm8W292km+AgOLOqh2fEvs9nwACCCAAAMB7AAEEENjugfIAf8PfBBYFhyAdDEK+jwAAAABJRU5ErkJggg==';
        const fullscreenElement = document.createElement('img');
        fullscreenElement.setAttribute('src', fullscreenIcon);
        fullscreenElement.setAttribute('style', 'position: absolute;top: 25px;right: 30px;cursor: pointer;');
        fullscreenElement.addEventListener('click', () => {
          if (!document.fullscreenElement) {
            this.requestFullscreen();
          } else {
            document.exitFullscreen();
            // Force recize event to fix strange bug
            setTimeout(() => {
              iframe.setAttribute('width', '99%');
              setTimeout(() => { iframe.setAttribute('width', '100%'); }, 100);
            }, 100);


          }
        });
        shadow.appendChild(iframe)
        shadow.appendChild(fullscreenElement)
      }

    }

    attributeChangedCallback(name, oldValue, newValue) {
      name === 'height' && (this.iframe.style.height = newValue)
    }

    static get observedAttributes() { return ['height'] }
  }

  // Define the new element
  customElements.define('labomep-moodle', LabomepMoodle)
}