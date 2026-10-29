<template>
  <h1>Catalogue de livres</h1>
  <p class="loading" v-if="store.loading">Chargement du catalogue...</p>
  <template v-else>
    <AddBookForm @add-book="addBook" />
    <BookList :books="store.books" @toggle-fav="toggleFavori" @delete-book="deleteBook" />
  </template>
</template>

<script>
import AddBookForm from '../components/AddBookForm.vue'
import BookList from '../components/BookList.vue'
import { store } from '../store/books.js'

export default {
  name: 'HomeView',
  components: { AddBookForm, BookList },
  data() {
    return { store }
  },
  methods: {
    addBook(bookData) {
      const id = Math.max(0, ...store.books.map(book => book.id)) + 1
      store.books.push({ ...bookData, id })
    },
    toggleFavori(book) {
      book.isFav = !book.isFav
    },
    deleteBook(book) {
      store.books = store.books.filter(b => b.id !== book.id)
    }
  }
}
</script>
