<template>
  <RouterLink class="back" to="/">← Retour aux offres</RouterLink>
  <h1>Ajouter une offre</h1><p class="intro">Présentez le poste et les compétences recherchées.</p>
  <JobForm :busy="busy" :error="error" @save="save" />
</template>
<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import JobForm from '../components/JobForm.vue'
import { addJob } from '../services/jobs'
const router = useRouter(), busy = ref(false), error = ref('')
async function save(data) {
  busy.value = true; error.value = ''
  try { const job = await addJob(data); await router.push({ name: 'detail', params: { id: job.id } }) }
  catch (e) { error.value = e.message } finally { busy.value = false }
}
</script>
