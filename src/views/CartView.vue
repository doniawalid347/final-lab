<template>
  <div>
    <h2>Your Cart</h2>
    <table class="table table-striped" v-if="cart.length">
      <thead>
        <tr>
          <th>Product</th>
          <th>Price</th>
          <th>Quantity</th>
          <th>Total</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in cart" :key="item.id">
          <td>{{ item.title }}</td>
          <td>${{ item.price }}</td>
          <td>
            <button class="btn btn-sm btn-secondary" @click="decrease(item)">-</button>
            {{ item.quantity }}
            <button class="btn btn-sm btn-secondary" @click="increase(item)">+</button>
          </td>
          <td>${{ (item.price * item.quantity).toFixed(2) }}</td>
          <td><button class="btn btn-sm btn-danger" @click="remove(item)">Remove</button></td>
        </tr>
      </tbody>
    </table>
    <div v-else class="alert alert-info">Cart is empty</div>
    <h4 v-if="cart.length">Total: ${{ total.toFixed(2) }}</h4>
  </div>
</template>

<script>
import { ref, computed, watch } from 'vue'

export default {
  name: 'CartView',
  setup() {
    const cart = ref(JSON.parse(localStorage.getItem('cart') || '[]'))

    const increase = (item) => { item.quantity++; save() }
    const decrease = (item) => { if (item.quantity>1) item.quantity--; save() }
    const remove = (item) => { cart.value = cart.value.filter(i => i.id !== item.id); save() }

    const total = computed(() => cart.value.reduce((sum,i)=>sum+i.price*i.quantity,0))

    const save = () => { localStorage.setItem('cart', JSON.stringify(cart.value)) }

    watch(cart, save, { deep:true })

    return { cart, increase, decrease, remove, total }
  }
}
</script>
