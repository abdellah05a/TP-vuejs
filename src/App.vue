<template>
  <header class="topbar"><div class="shell nav">
    <RouterLink class="brand" to="/">Jobs<span>.</span></RouterLink>
    <nav aria-label="Navigation principale">
      <RouterLink to="/">Les offres</RouterLink>
      <RouterLink class="button small" to="/add">+ Ajouter une offre</RouterLink>
    </nav>
  </div></header>
  <main class="shell"><RouterView :key="$route.fullPath" /></main>
  <footer class="shell">TP Jobs App · Vue.js & JSON Server · Données de démonstration</footer>
</template>
