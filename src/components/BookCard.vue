<template>
  <div class="book" :class="{ favori: book.isFav }">
    <h3>{{ book.title }}</h3>
    <p>{{ book.author }} -- {{ book.year }}</p>
    <span class="badge-favori" v-if="book.isFav">Favori</span>
    <div>
      <button @click="$emit('toggle-fav', book)">Favori</button>
      <button @click="$emit('delete-book', book)">Supprimer</button>
    </div>
    <slot name="actions"></slot>
  </div>
</template>

<script>
export default {
  name: 'BookCard',
  props: {
    book: {
      type: Object,
      required: true,
      validator(value) {
        return typeof value.title === 'string' && value.title.length > 0
      }
    }
  },
  emits: ['toggle-fav', 'delete-book']
}
</script>
