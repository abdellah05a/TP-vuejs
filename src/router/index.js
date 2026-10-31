import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import AddJob from '../views/AddJob.vue'
import EditJob from '../views/EditJob.vue'
import JobDetail from '../views/JobDetail.vue'
import NotFound from '../views/NotFound.vue'
export default createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'home', component: Home },
    { path: '/add', name: 'add', component: AddJob },
    { path: '/jobs/:id', name: 'detail', component: JobDetail },
    { path: '/jobs/:id/edit', name: 'edit', component: EditJob },
    { path: '/:pathMatch(.*)*', name: 'not-found', component: NotFound }
  ],
  scrollBehavior: () => ({ top: 0 })
})
