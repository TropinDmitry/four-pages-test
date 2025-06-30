import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect: '/sales'
  },
  {
    path: '/sales',
    name: 'sales',
    component: () => import('../views/SalesView.vue')
  },
  {
    path: '/orders',
    name: 'orders',
    component: () => import('../views/OrdersView.vue')
  },
  {
    path: '/stocks',
    name: 'stocks',
    component: () => import('../views/StocksView.vue')
  },
  {
    path: '/incomes',
    name: 'incomes',
    component: () => import('../views/IncomesView.vue')
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;