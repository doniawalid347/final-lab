<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-secondary">
    <div class="container">
      <router-link class="navbar-brand" to="/">  🛍️ MyShop</router-link>

      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link class="nav-link" to="/" exact-active-class="active">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/products" exact-active-class="active">Products</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/about" exact-active-class="active">About</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/contact" exact-active-class="active">Contact</router-link>
          </li>
        </ul>

        <button class="btn btn-light position-relative" @click="goToCart">
          🛒 Cart
          <span 
            class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
          >
            {{ cartCount }}
          </span>
        </button>
      </div>
    </div>
  </nav>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'

export default {
  name: 'AppNavbar',
  setup() {
    const router = useRouter()
    const cart = ref(JSON.parse(localStorage.getItem('cart') || '[]'))

    const cartCount = computed(() =>
      cart.value.reduce((sum, item) => sum + item.quantity, 0)
    )

    const goToCart = () => router.push('/cart')

    const updateCart = () => {
      cart.value = JSON.parse(localStorage.getItem('cart') || '[]')
    }

    onMounted(() => {
      window.addEventListener('storage', updateCart)
    })

    return { cartCount, goToCart }
  }
}
</script>