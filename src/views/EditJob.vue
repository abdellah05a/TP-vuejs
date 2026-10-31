<template>
  <RouterLink class="back" to="/">← Retour aux offres</RouterLink><h1>Modifier l’offre</h1>
  <p v-if="loading" role="status">Chargement de l’offre…</p>
  <JobForm v-else-if="job" :initial="job" :busy="busy" :error="error" submit-label="Enregistrer les modifications" :cancel-to="{ name: 'detail', params: { id: route.params.id } }" @save="save" />
  <p v-else class="error" role="alert">{{ error }}</p>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import JobForm from '../components/JobForm.vue'
import { getJob, updateJob } from '../services/jobs'
const route = useRoute(), router = useRouter(), job = ref(null), loading = ref(true), busy = ref(false), error = ref('')
onMounted(async () => {
  try { job.value = await getJob(route.params.id) } catch (e) { error.value = e.message } finally { loading.value = false }
})
async function save(data) {
  busy.value = true; error.value = ''
  try { await updateJob(route.params.id, data); await router.push({ name: 'detail', params: { id: route.params.id } }) }
  catch (e) { error.value = e.message } finally { busy.value = false }
}
</script>
