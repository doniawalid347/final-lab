<template>
  <div>
    <h2>Products</h2>

    <input
      v-model="searchText"
      type="text"
      class="form-control mb-3"
      placeholder="Search for products..."
    />

    <div class="d-flex gap-3 mb-3">
      <select v-model="selectedCategory" class="form-select w-auto">
        <option value="">All Categories</option>
        <option v-for="c in categories" :key="c" :value="c">{{ c }}</option>
      </select>

      <select v-model="sortOption" class="form-select w-auto">
        <option value="">Sort By</option>
        <option value="price-asc">Price: Low → High</option>
        <option value="price-desc">Price: High → Low</option>
        <option value="name-asc">Name: A → Z</option>
        <option value="name-desc">Name: Z → A</option>
      </select>
    </div>

    <div class="row g-3">
      <div class="col-md-4 mb-3" v-for="product in sortedProducts" :key="product.id">
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

    <!-- Alert -->
    <div v-if="showAlert" class="alert alert-success mt-3" role="alert">
      ✅ Product added to cart!
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

    
    const categories = ref([])
    const selectedCategory = ref('')
    const sortOption = ref('')
    const showAlert = ref(false)

    const fetchProducts = async () => {
      const res = await fetch('https://fakestoreapi.com/products')
      const data = await res.json()
      products.value = data

      categories.value = [...new Set(data.map(p => p.category))]
    }

    const filteredProducts = computed(() =>
      products.value.filter(p =>
        p.title.toLowerCase().includes(searchText.value.toLowerCase()) &&
        (selectedCategory.value === '' || p.category === selectedCategory.value)
      )
    )

    const sortedProducts = computed(() => {
      let result = [...filteredProducts.value]

      if (sortOption.value === 'price-asc') {
        result.sort((a, b) => a.price - b.price)
      } else if (sortOption.value === 'price-desc') {
        result.sort((a, b) => b.price - a.price)
      } else if (sortOption.value === 'name-asc') {
        result.sort((a, b) => a.title.localeCompare(b.title))
      } else if (sortOption.value === 'name-desc') {
        result.sort((a, b) => b.title.localeCompare(a.title))
      }

      return result
    })

    const addToCart = (product) => {
      const item = cart.value.find(p => p.id === product.id)
      if (item) item.quantity++
      else cart.value.push({ ...product, quantity: 1 })

      localStorage.setItem('cart', JSON.stringify(cart.value))

      window.dispatchEvent(new Event('storage'))

      // إظهار تنبيه
      showAlert.value = true
      setTimeout(() => showAlert.value = false, 1500)
    }

    onMounted(fetchProducts)

    return {
      products,
      searchText,
      categories,
      selectedCategory,
      sortOption,
      filteredProducts,
      sortedProducts,
      addToCart,
      showAlert
    }
  }
}
</script>
<style scoped>
.card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
}

.card:hover {
  transform: translateY(-8px) scale(1.03);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
}
</style>
