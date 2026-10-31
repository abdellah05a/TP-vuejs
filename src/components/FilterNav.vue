<template>
  <div class="filters">
    <label>Rechercher une offre
      <input type="search" placeholder="Titre, entreprise ou ville…" :value="search" @input="$emit('update:search', $event.target.value)" />
    </label>
    <label>Expérience requise
      <select :value="experience" @change="$emit('update:experience', $event.target.value)">
        <option value="all">Toutes les offres</option>
        <option value="junior">Débutant (0 à 1 an)</option>
        <option value="experienced">Expérimenté (2 ans et plus)</option>
      </select>
    </label>
  </div>
</template>
<script setup>
defineProps({ search: String, experience: String })
defineEmits(['update:search', 'update:experience'])
</script>
