<template>
  <form class="panel job-form" @submit.prevent="submit">
    <label>Titre de l’offre<input v-model="form.title" required maxlength="120" /></label>
    <div class="form-row">
      <label>Entreprise<input v-model="form.company" required maxlength="100" /></label>
      <label>Ville<input v-model="form.location" required maxlength="100" /></label>
    </div>
    <label>Description<textarea v-model="form.description" required rows="6" maxlength="5000"></textarea></label>
    <div class="form-row">
      <label>Salaire mensuel (MAD)<input v-model.number="form.salary" type="number" min="0" step="0.01" required /></label>
      <label>Années d’expérience<input v-model.number="form.experience" type="number" min="0" step="1" required /></label>
    </div>
    <label>Date de création<input v-model="form.dateCreated" type="date" required /></label>
    <p v-if="validation" class="error" role="alert">{{ validation }}</p>
    <p v-if="error" class="error" role="alert">{{ error }}</p>
    <div class="actions"><button class="button" :disabled="busy" type="submit">{{ busy ? 'Enregistrement…' : submitLabel }}</button>
      <RouterLink :to="cancelTo" class="button secondary">Annuler</RouterLink></div>
  </form>
</template>
<script setup>
import { reactive, ref } from 'vue'
const props = defineProps({ initial: { type: Object, default: () => ({}) }, busy: Boolean, error: String, submitLabel: { type: String, default: 'Ajouter l’offre' }, cancelTo: { type: [String, Object], default: '/' } })
const emit = defineEmits(['save'])
const now = new Date()
const today = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`
const form = reactive({ title: '', company: '', location: '', description: '', salary: '', experience: 0, dateCreated: today, ...props.initial })
const validation = ref('')
function submit() {
  if (props.busy) return
  validation.value = ''
  const data = { title: form.title.trim(), company: form.company.trim(), location: form.location.trim(), description: form.description.trim(), salary: form.salary, experience: form.experience, dateCreated: form.dateCreated }
  if (!data.title || !data.company || !data.location || !data.description) { validation.value = 'Complétez tous les champs texte avec un contenu non vide.'; return }
  if (typeof data.salary !== 'number' || !Number.isFinite(data.salary) || data.salary < 0 || !Number.isInteger(data.experience) || data.experience < 0 || !data.dateCreated) { validation.value = 'Vérifiez le salaire, l’expérience et la date.'; return }
  emit('save', data)
}
</script>
