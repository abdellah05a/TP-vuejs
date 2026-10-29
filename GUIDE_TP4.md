# TP 4 — Catalogue de livres : solution et mode d’emploi

## 1. Lancer le projet

1. Extraire l’archive TP4_corrige.zip dans un dossier simple, par exemple Documents/TP4.
2. Ouvrir le dossier `starter` dans Visual Studio Code (Fichier > Ouvrir un dossier).
3. Ouvrir Terminal > Nouveau terminal. Vérifier que le terminal est dans `starter`, le dossier contenant `package.json`.
4. Exécuter :

```powershell
npm.cmd install
npm.cmd run dev
```

5. Ouvrir l’adresse affichée dans le terminal, généralement http://localhost:5173.
6. Garder le terminal ouvert pendant l’utilisation. Pour arrêter : Ctrl+C.

Les commandes `npm.cmd` sont adaptées à Windows et évitent le blocage éventuel de `npm.ps1` par PowerShell. Si npm n’est pas reconnu, installer Node.js avec npm, puis rouvrir le terminal. Ne pas ouvrir index.html par double-clic : ce projet utilise Vite.

## 2. Ce qui est complété

### Exercice 1 — Configurer les routes

Dans `src/router/index.js`, les vues sont importées et associées à trois routes :

| Adresse | Nom | Vue |
| --- | --- | --- |
| `/` | home | HomeView |
| `/livre/:id` | book-details | BookDetailsView |
| `/:pathMatch(.*)*` | not-found | NotFoundView |

`createRouter({ history: createWebHistory(), routes })` crée le routeur. Le fichier `main.js` fourni l’enregistre déjà avec `.use(router)`. `App.vue` affiche la vue courante avec `<router-view />`.

### Exercice 2 — Brancher l’accueil

Dans `src/views/HomeView.vue`, `@add-book="addBook"` reçoit le livre du formulaire. `:books="store.books"` transmet la liste au composant BookList. Les événements `toggle-fav` et `delete-book` appellent les méthodes correspondantes.

```js
const id = Math.max(0, ...store.books.map(book => book.id)) + 1
store.books.push({ ...bookData, id })
```

Le nouvel identifiant vaut le maximum des identifiants présents plus un ; pour une liste vide il vaut 1. Le formulaire n’apparaît qu’après le chargement initial, pour éviter qu’un ajout soit écrasé par les données chargées.

### Exercice 3 — Retrouver un livre

Dans `src/views/BookDetailsView.vue` :

```js
const id = Number(this.$route.params.id)
return this.store.books.find(book => book.id === id)
```

Le paramètre d’URL est une chaîne de caractères. `Number()` permet de le comparer aux identifiants numériques avec `===`. La propriété calculée réagit au changement du paramètre ou du catalogue. Pendant le chargement, un message est affiché ; après chargement, un identifiant absent affiche « Livre introuvable ».

### Exercice 4 — Revenir en arrière

```js
retour() {
  this.$router.back()
}
```

Le bouton appelle une méthode : c’est une navigation programmatique. Il revient à l’entrée précédente de l’historique du navigateur. Pour le tester, ouvrir d’abord l’accueil puis cliquer sur « Voir détails ».

### Bonus — Composition API

`src/components/BookCardSetup.vue` utilise `defineProps`, `defineEmits` et `computed`. La prop `book` conserve le même validator que BookCard.vue. Les événements restent `toggle-fav` et `delete-book`. `libelleFavori` change automatiquement entre « Ajouter aux favoris » et « Retirer des favoris ».

Le bonus est activé dans BookList.vue par l’import de BookCardSetup.vue sous le nom BookCard. La version Options API d’origine est conservée dans BookCard.vue. Pour utiliser la version de base, remplacer uniquement cet import par `import BookCard from './BookCard.vue'`.

## 3. Comprendre le partage des données

`props` transmet des données du parent à l’enfant ; `$emit` permet à l’enfant de signaler une action au parent. HomeView et BookDetailsView sont deux vues alternées par le routeur. Le store commun exporte une même instance réactive qu’elles peuvent toutes deux importer. Les modifications restent donc visibles quand on navigue entre les vues.

Le store fourni est en mémoire : recharger la page réinitialise le catalogue. Aucune base de données ni persistance n’est demandée dans ce TP. Le formulaire d’origine est conservé : saisir un titre non vide pour respecter le validator des cartes.

## 4. Tests à refaire pour ta démonstration

1. Ouvrir l’accueil : les quatre livres initiaux apparaissent après le chargement.
2. Ajouter un livre avec titre, auteur et année : une nouvelle carte apparaît.
3. Cliquer sur « Ajouter aux favoris », puis « Retirer des favoris » : le badge et le style changent.
4. Ouvrir « Voir détails » : le titre, l’auteur et l’année correspondent au livre choisi.
5. Cliquer sur « Retour » : le catalogue réapparaît et le livre ajouté est toujours présent.
6. Supprimer un livre : sa carte disparaît.
7. Ouvrir `/livre/99999` : le message « Livre introuvable » apparaît.
8. Ouvrir `/page-inconnue` : la page 404 apparaît ; son lien ramène à l’accueil.
9. Recharger `/livre/2` : le détail du livre initial numéro 2 apparaît après chargement.
10. Vérifier la compilation avec `npm.cmd run build`.

## 5. Préparer le rendu

Le dossier `starter` contient le code corrigé et ce guide. Si un dépôt de fichiers est demandé, transmettre les sources et package-lock.json ; ne pas inclure node_modules ni dist. L’énoncé ne demande pas explicitement de rapport. Si ton enseignant en demande un séparément, ajouter des captures de l’accueil, du détail, des favoris et de la page 404, et expliquer les quatre exercices et le bonus avec tes propres mots.

## 6. Vérifications effectuées sur la solution

Compilation de production réussie avec `npm.cmd run build`. Tests automatisés dans Chrome réussis : affichage des quatre livres, ajout, ajout/retrait des favoris, détail du nouveau livre, retour avec conservation des données, suppression, identifiant absent, route 404 et accès direct à /livre/2. Aucune erreur JavaScript détectée pendant ces tests.
