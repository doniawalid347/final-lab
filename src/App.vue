<template>
  <AppNavbar />
  <div class="container mt-4">
    <router-view />
  </div>
</template>

<script>
import AppNavbar from './components/AppNavbar.vue'

export default {
  name: 'App',
  components: { AppNavbar }
}
</script>


<style>
body {
  background-color: #f8f9fa;
}
</style>
