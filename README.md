# _Répertoire archivé, voir : https://aide.labomep.sesamath.net/doku.php?id=tutoriels:moodle:start_

# Labomep-Moodle (Sesathèque)
 
_Remarque : cet outil n'est pas un outil officiel_
 
Labomep-Moodle est une passerelle pour inclure des exercices labomep (provenant de la sesathèque) directement sur moodle dans un Test (quiz).
Cela ne permet pas de profiter de toutes les fonctionnaltiés offerte par LaboMep, mais offre la possibilité d'inclure des exos labomep parmi d'autres questions Moodle (et pourquoi pas [Mathalea](https://coopmaths.fr/mathalea.html?v=moodle&z=1)). Cela evite aussi de rajouter une plateforme supplémentaire aux élèves.
Les élèves n'ont pas besoin de compte labomep mais l'enseignant lui à besoin d'un compte pour des raisons pratiques.

![image](https://user-images.githubusercontent.com/53106394/176482767-e8a2debd-9f5e-470a-9ef0-eacded540fe0.png)

## Choix de l'exercice

Rendez-vous sur la plateforme [labomep](https://labomep.sesamath.net/) et choisissez l'exercice de votre choix. Faite ensuite clic droit puis `Plus d'information`.

![image](https://user-images.githubusercontent.com/53106394/176483383-5950e3d8-8ff7-4d18-b09d-81b6ba64d685.png)

Copiez l'adresse url de la page qui s'ouvre. Elle devrait être de la forme `https://bibliotheque.sesamath.net/ressource/decrire/5caf95ba4bb1527df9236bc7?inc=3`.

## Récupération de l'exportation GIFT des questions

Ouvrez cette page : https://degrangem.github.io/labomep-moodle/index.html

Collez l'url précédemment copiée dans le champs texte « URL de la page "Plus d'information" » (ne touchez pas au premier champs texte).

Cliquez ensuite sur le bouton pour télécharger pour obtenir le fichier GIFT à importer dans moodle.

<details>
<summary>Remarque sur la vie privée</summary>
Une requête vers les serveurs de Github (Microsoft) sera effectuée à chaque chargement de la question.
Si vous souhaitez éviter cela, vous pouvez télécharger le fichier <a href="https://github.com/DegrangeM/labomep-moodle/raw/master/labomep-moodle.js">labomep-moodle.js</a> et l'héberger à l'emplacer de votre choix et modifier le champs associé sur la page de génération du GIFT. Cela demande cependant des compétences techniques.
</details>

## Import de la question dans la banque de question

Si vous n'avez pas encore déjà créé votre activité Test (Quiz en anglais) faites le.
Accédez au menu d'importation dans la banque de question via le menu de votre activité. 

<table><tr>
<td><img src="https://user-images.githubusercontent.com/53106394/155229742-27eaae9c-48e0-495a-84c5-7df740914796.png" width="100%" /></td>
<td><img src="https://user-images.githubusercontent.com/53106394/155229764-400df559-8af3-4ebf-adae-22d9fb4f3585.png" width="100%" /></td>
</tr></table>

Sélectionner le format  `Format GIFT`, déposez votre fichier dans la zone prévu à cet effet et appuyez sur le bouton d'importation.

## Ajouter la question à un test

Retournez sur votre activité, ouvrez le menu de votre activité et cliquez sur le lien "Modifier le test".

Appuyez sur le lien "Ajouter" et sélectionnez "de la banque de question".

![image](https://user-images.githubusercontent.com/53106394/155230688-fe9fabf4-00d8-4ea8-b8bb-053b50db99a4.png)

Il ne vous reste plus qu'à cocher la question précédemment importée, puis à cliquer sur le bouton "Ajouter les questions sélectionnée".

![image](https://user-images.githubusercontent.com/53106394/155233063-d9bdf5a1-39dd-4b68-bf3a-6e4546f5ab7b.png)

## Quelques remarques sur la configuration du test

Il est conseillé de configurer le test sur "Feedback à postériori". Dans le cas contraire la validation d'un exercice entraînera un rechargement de la page qui fera perdre le travail en cours sur un exercice de la même page.

Une autre possibilité est de configurer l'exercice sur "Feedback immédiat" mais de configurer le test pour n'afficher qu'une seule question par page.

## Astuce

Pour éviter d'encombrer votre banque de question, vous pouvez créer une catégorie et lors de l'importation choisir la catégorie dans laquelle ajouter les questions.

## Remarque importante sur la triche

Les élèves ont la possibilité de tricher en actualisant la page pour obtenir une nouvelle serie d'exercice. Les élèves doués en informatique ont aussi la possibilité de tricher en se donnant tous les points à l'exercice sans l'effectuer.
