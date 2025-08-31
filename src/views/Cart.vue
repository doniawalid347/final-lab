<template>
  <div class="container mt-5">
    <h2 class="text-center mb-4">Shopping Cart</h2>

    <div v-if="cartItems.length === 0" class="alert alert-info text-center">
      Your cart is empty.
    </div>

    <div v-else>
      <table class="table table-striped table-bordered text-center align-middle">
        <thead class="table-dark">
          <tr>
            <th scope="col">Product</th>
            <th scope="col">Price</th>
            <th scope="col">Quantity</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in cartItems" :key="item.id">
            <td>{{ item.title }}</td>
            <td>${{ item.price }}</td>
            <td>
              <div class="d-flex justify-content-center align-items-center">
                <button class="btn btn-sm btn-secondary me-2" @click="decrease(item)">-</button>
                {{ item.quantity }}
                <button class="btn btn-sm btn-secondary ms-2" @click="increase(item)">+</button>
              </div>
            </td>
            <td>
              <button class="btn btn-sm btn-danger" @click="remove(item)">Remove</button>
            </td>
          </tr>
        </tbody>
      </table>

      <div class="text-end mt-3">
        <h4>Total: ${{ totalPrice }}</h4>
        <button class="btn btn-success mt-2">Checkout</button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from "vue";

export default {
  name: "CartView",
  setup() {
    const cartItems = ref(JSON.parse(localStorage.getItem("cart") || "[]"));

    const increase = (item) => {
      item.quantity++;
      localStorage.setItem("cart", JSON.stringify(cartItems.value));
    };

    const decrease = (item) => {
      if (item.quantity > 1) item.quantity--;
      localStorage.setItem("cart", JSON.stringify(cartItems.value));
    };

    const remove = (item) => {
      cartItems.value = cartItems.value.filter((i) => i.id !== item.id);
      localStorage.setItem("cart", JSON.stringify(cartItems.value));
    };

    const totalPrice = computed(() =>
      cartItems.value.reduce((sum, item) => sum + item.price * item.quantity, 0)
    );

    return { cartItems, increase, decrease, remove, totalPrice };
  },
};
</script>
