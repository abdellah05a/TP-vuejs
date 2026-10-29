# TP 3 — Composants et cycle de vie

## Lancer le projet

1. Extraire TP3_corrige.zip.
2. Ouvrir le dossier extrait dans Visual Studio Code.
3. Ouvrir Terminal > Nouveau terminal, puis vérifier avec `dir package.json` que le terminal se trouve dans le bon dossier.
4. Exécuter :

```powershell
npm.cmd install
npm.cmd run dev
```

5. Ouvrir http://127.0.0.1:5175 et garder le terminal ouvert. Ctrl+C arrête le serveur.

Le port 5175 évite les ports des TP précédents. Si ce port est occupé, arrêter l’ancienne instance avant de relancer. Si npm n’est pas reconnu, installer Node.js avec npm et rouvrir VS Code. Avec Node.js 24, si l’installation échoue avec UNABLE_TO_VERIFY_LEAF_SIGNATURE, exécuter `$env:NODE_OPTIONS="--use-system-ca"`, puis relancer l’installation.

Le PDF mentionne un starter non joint : ce projet reconstitue une solution complète conforme aux exercices. Les quatre livres initiaux reprennent le catalogue utilisé dans le TP 4 fourni précédemment.

## Architecture

```text
App.vue — possède books et modifie les livres
├── AddBookForm.vue — saisie et émission de add-book
└── BookList.vue — reçoit books et relaie les événements
    └── BookCard.vue — reçoit book, affiche le livre et émet les actions
```

Les props descendent du parent vers l’enfant. Les événements remontent de l’enfant vers le parent. Le formulaire possède seulement son brouillon local ; la liste des livres appartient à App.vue.

## Exercice 1 — Props et affichage

BookList déclare `books: { type: Array, required: true }`. App lui transmet `:books="books"`. La liste utilise `v-for="book in books"`, `:key="book.id"` et `:book="book"` sur BookCard. La clé permet à Vue d’identifier chaque carte quand la liste change.

## Exercice 2 — Validation de la prop book

BookCard déclare une prop `book` de type Object, obligatoire, avec un validator :

```js
validator(value) {
  return value !== null && typeof value.title === 'string' && value.title.trim().length > 0
}
```

Un titre vide ou composé uniquement d’espaces est refusé par cette validation. Le validator Vue produit un avertissement de développement ; il ne bloque pas à lui seul une saisie. Le formulaire vérifie donc aussi les valeurs avant d’émettre add-book.

Le titre du formulaire est une prop facultative `heading`, de type String, avec la valeur par défaut « Ajouter un livre ». Cela illustre aussi l’objectif des valeurs par défaut.

## Exercice 3 — Ne pas modifier une prop

BookCard utilise `$emit('toggle-fav', book)` au clic. BookList relaie l’événement avec `@toggle-fav="$emit('toggle-fav', $event)"`. App le reçoit avec `@toggle-fav="toggleFavori"` et modifie le livre dans sa propre liste.

La suppression suit la même chaîne avec delete-book. Ni BookCard ni BookList ne modifient les objets reçus. L’ajout suit la chaîne AddBookForm → add-book → App.addBook. App génère des identifiants successifs.

## Exercice 4 — Slot nommé

BookCard expose `<slot name="actions"></slot>` juste après le badge favori. BookList y insère :

```vue
<template #actions>
  <small class="slot-content">Genre : {{ book.genre || 'Non précisé' }}</small>
</template>
```

Le texte « Genre : … » visible dans chaque carte est donc défini par BookList et affiché à l’emplacement prévu par BookCard.

## Exercice 5 — Chargement initial

App démarre avec `books: []` et `loading: true`. Son hook mounted lance :

```js
setTimeout(() => {
  this.books = initialBooks
  this.loading = false
}, 600)
```

Le message utilise exactement `v-show="loading"`. Après chargement, l’élément reste dans le DOM mais devient invisible. Le formulaire et les cartes sont montés après chargement ; cela évite qu’un ajout effectué avant les 600 ms soit écrasé par initialBooks. Le délai est annulé si App est démonté avant la fin.

## Bonus — Référence de template

Le champ titre possède `ref="titreInput"`. Dans mounted de AddBookForm :

```js
this.$refs.titreInput.focus()
```

Le curseur se place automatiquement dans le titre dès l’apparition du formulaire. Il y revient aussi après un ajout réussi. Le hook mounted est utilisé car le champ existe alors dans le DOM.

## Démonstration à effectuer

1. Recharger la page : observer brièvement le chargement (600 ms), puis les quatre livres.
2. Vérifier que le curseur est automatiquement placé dans le titre.
3. Ajouter un livre avec un titre, un auteur, une année et un genre ; cocher Favori si souhaité.
4. Vérifier que la nouvelle carte et les compteurs se mettent à jour.
5. Ajouter puis retirer un favori : le badge et le fond de la carte changent.
6. Vérifier le texte « Genre » injecté par le slot nommé.
7. Supprimer un livre : sa carte disparaît et les compteurs sont actualisés.
8. Supprimer tous les livres : le message de catalogue vide apparaît ; ajouter un nouveau livre fonctionne toujours.
9. Recharger : les données initiales reviennent. La persistance ne fait pas partie de ce TP.

## Vérifier et remettre

Exécuter `npm.cmd run build` pour vérifier la compilation. La commande `npm.cmd run preview` permet ensuite de consulter la compilation à l’adresse affichée.

Pour remettre le projet, conserver src, index.html, vite.config.js, package.json et package-lock.json. Ne pas inclure node_modules ni dist. Le guide accompagne le code pour comprendre chaque exercice. L’énoncé ne demande pas de rapport : si un rapport est demandé séparément, utiliser des captures du catalogue, du formulaire et d’un livre favori, et expliquer la circulation des données.

## Vérifications réalisées

Compilation réussie. Tests dans Chrome réussis : chargement puis masquage du message sans retrait du DOM, focus automatique, quatre cartes initiales, slot nommé, validation des saisies, ajout, favoris, suppression, catalogue vide et nouvel ajout, réinitialisation au rechargement. Affichage vérifié sur ordinateur et mobile. Aucune erreur JavaScript ni alerte Vue pendant les tests.
