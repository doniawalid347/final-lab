<template>
  <div class="container mt-5">
    <h2 class="text-center mb-4">Products</h2>

    <input type="text" class="form-control mb-4" placeholder="Search..." v-model="search">

    <div class="row justify-content-center">
      <div v-for="product in filteredProducts" :key="product.id" class="col-md-3 mb-4 d-flex align-items-stretch">
        <div class="card text-center w-100">
          <img :src="product.image" class="card-img-top p-3" alt="Product Image">
          <div class="card-body d-flex flex-column">
            <h5 class="card-title">{{ product.title }}</h5>
            <p class="card-text">${{ product.price }}</p>
            <button class="btn btn-primary mt-auto" @click="addToCart(product)">Add to Cart</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, watch } from "vue";

export default {
  name: "ProductsView",
  setup() {
    const products = ref([]);
    const search = ref("");
    const filteredProducts = ref([]);

    const fetchProducts = async () => {
      const res = await fetch("https://fakestoreapi.com/products");
      products.value = await res.json();
      filteredProducts.value = products.value;
    };

    const addToCart = (product) => {
      const cart = JSON.parse(localStorage.getItem("cart") || "[]");
      const existing = cart.find((p) => p.id === product.id);
      if (existing) existing.quantity++;
      else cart.push({ ...product, quantity: 1 });
      localStorage.setItem("cart", JSON.stringify(cart));
      alert(product.title + " added to cart!");
    };

    watch(search, (newVal) => {
      filteredProducts.value = products.value.filter((p) =>
        p.title.toLowerCase().includes(newVal.toLowerCase())
      );
    });

    onMounted(fetchProducts);

    return { products, search, filteredProducts, addToCart };
  },
};
</script>
