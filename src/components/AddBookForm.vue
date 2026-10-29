<template>
  <form class="panel" @submit.prevent="soumettre">
    <h2>{{ heading }}</h2>
    <label>Titre<input ref="titreInput" v-model="newBook.title" required maxlength="150" placeholder="Ex. Le Petit Prince" /></label>
    <label>Auteur<input v-model="newBook.author" required maxlength="150" placeholder="Nom de l’auteur" /></label>
    <div class="form-row">
      <label>Année<input v-model.number="newBook.year" type="number" required min="1" max="9999" step="1" placeholder="1943" /></label>
      <label>Genre<input v-model="newBook.genre" maxlength="80" placeholder="Roman" /></label>
    </div>
    <label class="checkbox"><input v-model="newBook.isFav" type="checkbox" /> Ajouter aux favoris</label>
    <p v-if="error" class="error" role="alert">{{ error }}</p>
    <button type="submit" class="primary">Ajouter le livre</button>
  </form>
</template>

<script>
const emptyBook = () => ({ title: '', author: '', year: null, genre: '', isFav: false })
export default {
  name: 'AddBookForm',
  // Exemple d’une prop facultative avec valeur par défaut.
  props: { heading: { type: String, default: 'Ajouter un livre' } },
  emits: ['add-book'],
  data() { return { newBook: emptyBook(), error: '' } },
  methods: {
    soumettre() {
      this.error = ''
      const book = { ...this.newBook, title: this.newBook.title.trim(), author: this.newBook.author.trim(), genre: this.newBook.genre.trim() }
      if (!book.title || !book.author || !Number.isInteger(book.year) || book.year < 1 || book.year > 9999) {
        this.error = 'Indiquez un titre, un auteur et une année entière entre 1 et 9999.'
        return
      }
      this.$emit('add-book', book)
      this.newBook = emptyBook()
      this.$refs.titreInput.focus()
    }
  },
  mounted() { this.$refs.titreInput.focus() }
}
</script>
