<template>
  <div class="book" :class="{ favori: book.isFav }">
    <h3>{{ book.title }}</h3>
    <p>{{ book.author }} -- {{ book.year }}</p>
    <span class="badge-favori" v-if="book.isFav">Favori</span>
    <div>
      <button @click="emit('toggle-fav', book)">{{ libelleFavori }}</button>
      <button @click="emit('delete-book', book)">Supprimer</button>
    </div>
    <slot name="actions"></slot>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  book: {
    type: Object,
    required: true,
    validator(value) {
      return typeof value.title === 'string' && value.title.length > 0
    }
  }
})

const emit = defineEmits(['toggle-fav', 'delete-book'])
const libelleFavori = computed(() =>
  props.book.isFav ? 'Retirer des favoris' : 'Ajouter aux favoris'
)
</script>
