import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/', 
    name: 'home',
    component: import('../views/HomeView.vue'), 
  },
  {
    path: '/:catchAll(.*)', 
    redirect: '/' 
  },
  
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/AboutView.vue'),
  },
  {
    path: '/post',
    name: 'post',
    component: () => import( '../components/detailPost.vue')
  },
  {
    path: '/submit',
    name: 'submitPost',
    component: () => import( '../components/posts.vue')
  },
  {
    path: '/user',
    name: 'userDetails',
    component: () => import( '../components/userDetails.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;