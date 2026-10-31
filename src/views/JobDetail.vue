<template>
  <RouterLink class="back" to="/">← Retour aux offres</RouterLink>
  <p v-if="loading" role="status">Chargement de l’offre…</p>
  <article v-else-if="job" class="panel detail">
    <span class="tag">{{ job.location }}</span><h1>{{ job.title }}</h1><p class="intro">{{ job.company }}</p>
    <dl class="facts">
      <div><dt>Salaire mensuel</dt><dd>{{ salaryLabel(job.salary) }}</dd></div>
      <div><dt>Expérience requise</dt><dd>{{ job.experience }} an(s)</dd></div>
      <div><dt>Date de création</dt><dd>{{ dateLabel(job.dateCreated) }}</dd></div>
    </dl>
    <h2>Description du poste</h2><p class="description">{{ job.description }}</p>
    <div class="actions">
      <RouterLink class="button" :to="{ name: 'edit', params: { id: job.id } }">Modifier l’offre</RouterLink>
      <button class="button danger" :disabled="busy" @click="remove">{{ busy ? 'Suppression…' : 'Supprimer l’offre' }}</button>
    </div>
  </article>
  <p v-if="error" role="alert" class="error">{{ error }}</p>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getJob, deleteJob } from '../services/jobs'
import { salaryLabel, dateLabel } from '../format'
const route = useRoute(), router = useRouter(), job = ref(null), loading = ref(true), busy = ref(false), error = ref('')
onMounted(async () => {
  try { job.value = await getJob(route.params.id) } catch (e) { error.value = e.message } finally { loading.value = false }
})
async function remove() {
  if (busy.value || !window.confirm(`Supprimer définitivement l’offre « ${job.value.title} » ?`)) return
  busy.value = true; error.value = ''
  try { await deleteJob(job.value.id); await router.push('/') }
  catch (e) { error.value = e.message } finally { busy.value = false }
}
</script>
