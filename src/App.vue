<template>
  <main>
    <header><p class="eyebrow">TP 3 · COMPOSANTS & CYCLE DE VIE</p>
      <h1>Ma bibliothèque</h1><p class="intro">Ajoutez vos lectures et retrouvez vos livres favoris.</p>
    </header>

    <!-- L’élément reste dans le DOM ; v-show change sa visibilité. -->
    <p v-show="loading" class="loading" role="status">Chargement du catalogue…</p>

    <section v-if="!loading" class="layout">
      <aside><AddBookForm @add-book="addBook" /></aside>
      <section aria-label="Catalogue de livres">
        <div class="section-title"><h2>Le catalogue</h2><span>{{ books.length }} livre(s) · {{ favoriteCount }} favori(s)</span></div>
        <BookList :books="books" @toggle-fav="toggleFavori" @delete-book="deleteBook" />
      </section>
    </section>
    <footer>Vue.js · Props, événements, slot nommé et hook mounted</footer>
  </main>
</template>

<script>
import AddBookForm from './components/AddBookForm.vue'
import BookList from './components/BookList.vue'

// Données de départ : l’état modifiable reste exclusivement dans App.vue.
const initialBooks = [
  { id: 1, title: 'Clean Code', author: 'Robert C. Martin', year: 2008, genre: 'Génie logiciel', isFav: true },
  { id: 2, title: 'Introduction to Algorithms', author: 'Cormen, Leiserson, Rivest, Stein', year: 2009, genre: 'Algorithmique', isFav: false },
  { id: 3, title: 'Design Patterns', author: 'Gamma, Helm, Johnson, Vlissides', year: 1994, genre: 'Génie logiciel', isFav: true },
  { id: 4, title: 'Computer Networks', author: 'Andrew S. Tanenbaum', year: 2010, genre: 'Réseaux', isFav: false }
]

export default {
  name: 'App',
  components: { AddBookForm, BookList },
  data() {
    return { books: [], loading: true, loadingTimer: null, nextId: 5 }
  },
  computed: {
    favoriteCount() { return this.books.filter(book => book.isFav).length }
  },
  methods: {
    addBook(bookData) {
      this.books.push({ ...bookData, id: this.nextId++ })
    },
    toggleFavori(book) {
      const selected = this.books.find(item => item.id === book.id)
      if (selected) selected.isFav = !selected.isFav
    },
    deleteBook(book) {
      this.books = this.books.filter(item => item.id !== book.id)
    }
  },
  mounted() {
    this.loadingTimer = setTimeout(() => {
      this.books = initialBooks
      this.loading = false
    }, 600)
  },
  beforeUnmount() { clearTimeout(this.loadingTimer) }
}
</script>
