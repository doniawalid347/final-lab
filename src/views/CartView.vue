<template>
  <div class="container mt-4">
    <div class="card shadow-lg">
      <div class="card-header bg-primary text-white">
        <h4 class="mb-0">🛒 Your Cart</h4>
      </div>
      <div class="card-body">
        <table class="table table-hover table-bordered align-middle" v-if="cart.length">
          <thead class="table-light">
            <tr>
              <th>Product</th>
              <th>Price</th>
              <th style="width: 180px;">Quantity</th>
              <th>Total</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in cart" :key="item.id">
              <td>{{ item.title }}</td>
              <td>${{ item.price }}</td>
              <td>
                <div class="d-flex align-items-center justify-content-center gap-2">
                  <button class="btn btn-sm btn-outline-secondary" @click="decrease(item)">-</button>
                  <span class="fw-bold">{{ item.quantity }}</span>
                  <button class="btn btn-sm btn-outline-secondary" @click="increase(item)">+</button>
                </div>
              </td>
              <td>${{ (item.price * item.quantity).toFixed(2) }}</td>
              <td>
                <button class="btn btn-sm btn-outline-danger" @click="remove(item)">Remove</button>
              </td>
            </tr>
          </tbody>
        </table>

        <div v-else class="alert alert-info text-center">
          Your cart is empty 🛍️
        </div>
      </div>
      <div class="card-footer text-end" v-if="cart.length">
        <h5 class="mb-0">Total: <span class="text-success">${{ total.toFixed(2) }}</span></h5>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, watch } from 'vue'

export default {
  name: 'CartView',
  setup() {
    const cart = ref(JSON.parse(localStorage.getItem('cart') || '[]'))

    const increase = (item) => { item.quantity++; save() }
    const decrease = (item) => { if (item.quantity > 1) item.quantity--; save() }
    const remove = (item) => { cart.value = cart.value.filter(i => i.id !== item.id); save() }

    const total = computed(() => cart.value.reduce((sum, i) => sum + i.price * i.quantity, 0))

    const save = () => { localStorage.setItem('cart', JSON.stringify(cart.value)) }

    watch(cart, save, { deep: true })

    return { cart, increase, decrease, remove, total }
  }
}
</script>
