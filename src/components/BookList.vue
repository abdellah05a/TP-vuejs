<template>
  <div class="book-list">
    <p v-if="books.length === 0" class="empty">Votre catalogue est vide. Ajoutez votre premier livre.</p>
    <BookCard v-for="book in books" :key="book.id" :book="book"
      @toggle-fav="$emit('toggle-fav', $event)"
      @delete-book="$emit('delete-book', $event)">
      <!-- Ce contenu est défini par le parent, puis inséré dans BookCard. -->
      <template #actions><small class="slot-content">Genre : {{ book.genre || 'Non précisé' }}</small></template>
    </BookCard>
  </div>
</template>

<script>
import BookCard from './BookCard.vue'
export default {
  name: 'BookList',
  components: { BookCard },
  props: { books: { type: Array, required: true } },
  emits: ['toggle-fav', 'delete-book']
}
</script>
