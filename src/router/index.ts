import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/views/LoginView.vue'
import HomeView from '../views/HomeView.vue'
import { useAuthStore } from '@/stores'
import { getTokenFromLocalStorage } from '@/helpers'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    { path: '/login', name: 'login', component: LoginView },
    {
      path: '/interpretes',
      name: 'interpretes',
      component: () => import('../views/InterpreteView.vue'),
      children: [
        { path: '', component: () => import('../components/interprete/InterpreteList.vue') },
        { path: 'crear', component: () => import('../components/interprete/InterpreteCreate.vue') },
        {
          path: 'editar/:id',
          component: () => import('../components/interprete/InterpreteEdit.vue')
        }
      ]
    },
    {
      path: '/canciones',
      name: 'canciones',
      component: () => import('../views/CancionView.vue'),
      children: [
        { path: '', component: () => import('../components/cancion/CancionList.vue') },
        { path: 'crear', component: () => import('../components/cancion/CancionCreate.vue') },
        {
          path: 'editar/:id',
          component: () => import('../components/cancion/CancionEdit.vue')
        }
      ]
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    }
  ]
})

router.beforeEach(async (to) => {
  const publicPages = ['/login']
  const authRequired = !publicPages.includes(to.path)
  const authStore = useAuthStore()

  if (authRequired && !getTokenFromLocalStorage()) {
    if (authStore) authStore.logout()
    authStore.returnUrl = to.fullPath
    return '/login'
  }
})

export default router
