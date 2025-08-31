<template>
  <div>
    <h2>Products</h2>

    <!-- Search bar -->
    <input
      v-model="searchText"
      type="text"
      class="form-control mb-3"
      placeholder="Search for products..."
    />

    <!-- Products grid -->
    <div class="row g-3">
      <div class="col-md-4 mb-3" v-for="product in filteredProducts" :key="product.id">
        <div class="card h-100">
          <img :src="product.image" class="card-img-top p-3" style="height:200px; object-fit:contain;" />
          <div class="card-body d-flex flex-column">
            <h5 class="card-title">{{ product.title }}</h5>
            <p class="card-text fw-bold">${{ product.price }}</p>
            <button class="btn btn-primary mt-auto" @click="addToCart(product)">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue'

export default {
  name: 'ProductsView',
  setup() {
    const products = ref([])
    const searchText = ref('')
    const cart = ref(JSON.parse(localStorage.getItem('cart') || '[]'))

    const fetchProducts = async () => {
      const res = await fetch('https://fakestoreapi.com/products')
      products.value = await res.json()
    }

    const filteredProducts = computed(() =>
      products.value.filter(p =>
        p.title.toLowerCase().includes(searchText.value.toLowerCase())
      )
    )

    const addToCart = (product) => {
      const item = cart.value.find(p => p.id === product.id)
      if (item) item.quantity++
      else cart.value.push({ ...product, quantity: 1 })

      localStorage.setItem('cart', JSON.stringify(cart.value))

      // تحديث Navbar مباشرة
      window.dispatchEvent(new Event('storage'))
    }

    onMounted(fetchProducts)

    return { products, searchText, filteredProducts, addToCart }
  }
}
</script>
