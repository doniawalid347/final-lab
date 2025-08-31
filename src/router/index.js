import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/Home.vue';
import ProductsView from '../views/Products.vue';
import AboutView from '../views/About.vue';
import CartView from '../views/Cart.vue';
import ContactView from '../views/Contact.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/home',  // ممكن تخليه redirect بس
    redirect: '/'   // أي حد يدخل /home يتحول للـ Home الافتراضي
  },
  {
    path: '/products',
    name: 'Products',
    component: ProductsView
  },
  {
    path: '/about',
    name: 'About',
    component: AboutView
  },
  {
    path: '/cart',
    name: 'Cart',
    component: CartView
  },
  {
    path: '/contact',
    name: 'Contact',
    component: ContactView
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
