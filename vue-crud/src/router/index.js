import { createRouter, createWebHistory } from 'vue-router';
import ProductoList from '@/components/ProductoList.vue';
import ProductoForm from '@/components/ProductoForm.vue';

const routes = [
  { path: '/', name: 'ProductoList', component: ProductoList },
  { path: '/nuevo', name: 'CrearProducto', component: ProductoForm },
  { path: '/editar/:id', name: 'EditarProducto', component: ProductoForm, props: true }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
