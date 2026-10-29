// Mini "store" fait main avec reactive().
//
// Pourquoi ce fichier existe : HomeView et BookDetailsView sont deux
// composants différents (deux vues distinctes du routeur), mais doivent
// tous les deux lire -- et parfois modifier -- la même liste de livres.
// Un simple `data()` ne suffit plus ici, puisqu'il n'existe pas de relation
// parent/enfant entre ces deux vues pour se transmettre des props.
//
// reactive() crée un objet réactif au niveau du module : tous les
// composants qui importent `store` partagent la même instance, et Vue met
// à jour l'affichage partout où `store.books` est utilisé dès qu'un
// composant le modifie. C'est une solution correcte pour un petit projet ;
// au-delà de quelques vues, on migre généralement vers Pinia, qui organise
// ce même principe (état partagé + actions) de façon structurée.
import { reactive } from 'vue'

const initialBooks = [
  { id: 1, title: 'Clean Code', author: 'Robert C. Martin', year: 2008, genre: 'Génie logiciel', isFav: true },
  { id: 2, title: 'Introduction to Algorithms', author: 'Cormen, Leiserson, Rivest, Stein', year: 2009, genre: 'Algorithmique', isFav: false },
  { id: 3, title: 'Design Patterns', author: 'Gamma, Helm, Johnson, Vlissides', year: 1994, genre: 'Génie logiciel', isFav: true },
  { id: 4, title: 'Computer Networks', author: 'Andrew S. Tanenbaum', year: 2010, genre: 'Réseaux', isFav: false }
]

export const store = reactive({
  books: [],
  loading: true
})

// Simule un chargement réseau, comme au TP3.
setTimeout(() => {
  store.books = initialBooks
  store.loading = false
}, 400)
