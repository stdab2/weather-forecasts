import { createRouter, createWebHistory } from 'vue-router'
import Forecast from '../components/Forecast.vue'
import Recommandation from '@/components/Recommandation.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: Forecast,
  }
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
});