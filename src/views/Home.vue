<template>
  <section class="hero"><p class="eyebrow">LE CATALOGUE DES OPPORTUNITÉS</p>
    <h1>Trouvez votre prochain emploi.</h1>
    <p>Consultez les offres et gérez les recrutements depuis un même espace.</p>
  </section>
  <FilterNav v-model:search="search" v-model:experience="experience" />
  <p v-if="loading" role="status">Chargement des offres…</p>
  <div v-else-if="error" class="error" role="alert">{{ error }} <button @click="load">Réessayer</button></div>
  <template v-else>
    <p class="count">{{ filtered.length }} offre(s) disponible(s)</p>
    <div v-if="!filtered.length" class="empty">Aucune offre ne correspond à votre recherche.</div>
    <div class="cards">
      <article v-for="job in filtered" :key="job.id" class="card">
        <div class="row"><span class="tag">{{ job.location }}</span><span class="muted">{{ job.experience }} an(s) d’expérience</span></div>
        <h2><RouterLink :to="{ name: 'detail', params: { id: job.id } }">{{ job.title }}</RouterLink></h2>
        <p class="company">{{ job.company }}</p><p class="excerpt">{{ job.description }}</p>
        <div class="card-bottom"><strong>{{ salaryLabel(job.salary) }} <small>/ mois</small></strong>
          <RouterLink :to="{ name: 'detail', params: { id: job.id } }">Voir l’offre →</RouterLink>
        </div>
      </article>
    </div>
  </template>
</template>
<script setup>
import { ref, computed, onMounted } from 'vue'
import FilterNav from '../components/FilterNav.vue'
import { getJobs } from '../services/jobs'
import { salaryLabel } from '../format'
const jobs = ref([]), search = ref(''), experience = ref('all'), loading = ref(true), error = ref('')
const filtered = computed(() => jobs.value.filter(job => {
  const matches = `${job.title} ${job.company} ${job.location}`.toLocaleLowerCase('fr').includes(search.value.trim().toLocaleLowerCase('fr'))
  return matches && (experience.value === 'all' || (experience.value === 'junior' ? job.experience <= 1 : job.experience >= 2))
}))
async function load() {
  loading.value = true; error.value = ''
  try { jobs.value = await getJobs() } catch (e) { error.value = e.message } finally { loading.value = false }
}
onMounted(load)
</script>
