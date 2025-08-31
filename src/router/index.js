import { createRouter, createWebHistory } from "vue-router";

import HomeView from '../views/Home.vue'

import ProductsView from '../views/Products.vue'
import AboutView from '../views/About.vue'
import CartView from '../views/Cart.vue'
import ContactView from '../views/Contact.vue'

const routes = [
  { path: '/home', component: HomeView },
  { path: '/products', component: ProductsView },
  { path: '/about', component: AboutView },
  { path: '/cart', component: CartView },
  { path: '/contact', component: ContactView },
]

export default createRouter({
  history: createWebHistory(),
  routes
})
