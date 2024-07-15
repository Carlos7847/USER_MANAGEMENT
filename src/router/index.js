import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginViewVue from '@/views/Login-view.vue';
import UpdateProfileViewVue from '@/views/Update-profile-view.vue';
import RegisterProfileViewVue from '@/views/Register-profile-view.vue';
import { authState } from '@/auth';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: { requiresAuth: true }
  },

  {
    path: '/login',
    name: 'Login',
    component: LoginViewVue,
    meta: { requiresGuest: true }
  },
  {
    path: '/update-profile',
    name: 'UpdateProfile',
    component: UpdateProfileViewVue,
    meta: { requiresAuth: true }
  },
  {
    path: '/register-profile',
    name: 'RegisterProfile',
    component: RegisterProfileViewVue,
    meta: { requiresGuest: true }
  },
  // { path: '/:pathMatch(.*)*', name: 'Login', component: LoginViewVue },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})


router.beforeEach((to, from, next) => {

  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const requiresGuest = to.matched.some(record => record.meta.requiresGuest);

  // const token = localStorage.getItem('token');

  if (requiresAuth && (!authState.token || authState.token === 'undefined') && to.name !== 'Login') {
    next('/login');
  } else if (requiresGuest && authState.token && authState.token !== 'undefined') {
    next('/');
  } else {
    next();
  }


});

export default router
