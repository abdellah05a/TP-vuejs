<template>
  <article class="book" :class="{ favori: book.isFav }">
    <h3>{{ book.title }}</h3>
    <p class="book-meta">{{ book.author }} · {{ book.year }}</p>
    <span v-if="book.isFav" class="badge-favori">★ Favori</span>
    <slot name="actions"></slot>
    <div class="actions">
      <!-- L’enfant demande une modification ; App.vue l’effectue. -->
      <button type="button" :aria-pressed="book.isFav" @click="$emit('toggle-fav', book)">{{ book.isFav ? 'Retirer des favoris' : 'Ajouter aux favoris' }}</button>
      <button type="button" class="danger" @click="$emit('delete-book', book)">Supprimer</button>
    </div>
  </article>
</template>

<script>
export default {
  name: 'BookCard',
  props: {
    book: {
      type: Object,
      required: true,
      validator(value) {
        return value !== null && typeof value.title === 'string' && value.title.trim().length > 0
      }
    }
  },
  emits: ['toggle-fav', 'delete-book']
}
</script>
