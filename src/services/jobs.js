const endpoint = 'http://127.0.0.1:3001/jobs'
async function request(path = '', options = {}) {
  let response
  try {
    response = await fetch(endpoint + path, {
      ...options,
      headers: { 'Content-Type': 'application/json', ...options.headers }
    })
  } catch {
    throw new Error('Serveur inaccessible. Vérifiez que JSON Server est lancé sur le port 3001.')
  }
  if (!response.ok) {
    throw new Error(response.status === 404 ? 'Cette offre n’existe plus ou est introuvable.' : `La demande a échoué (erreur ${response.status}).`)
  }
  return response.status === 204 ? null : response.json()
}
export const getJobs = () => request()
export const getJob = id => request('/' + encodeURIComponent(id))
export const addJob = job => request('', { method: 'POST', body: JSON.stringify(job) })
export const updateJob = (id, job) => request('/' + encodeURIComponent(id), { method: 'PATCH', body: JSON.stringify(job) })
export const deleteJob = id => request('/' + encodeURIComponent(id), { method: 'DELETE' })
