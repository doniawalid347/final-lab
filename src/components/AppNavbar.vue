<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container">
      <a class="navbar-brand" href="#">Shop</a>
      <div>
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link 
              class="nav-link" 
              to="/" 
              exact-active-class="active-link"
            >Home</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/products" exact-active-class="active-link">Products</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/about" exact-active-class="active-link">About</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/cart" exact-active-class="active-link">Cart</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/contact" exact-active-class="active-link">Contact</router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "AppNavbar"
};
</script>

<style>
.active-link {
  color: #0d6efd !important; /* لون Bootstrap الأزرق */
  border-bottom: 2px solid #0d6efd; /* خط تحت النص */
}
</style>
