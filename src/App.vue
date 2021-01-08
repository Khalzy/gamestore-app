<template>
  <div id="app">
      <NavBar />
      <router-view />
      <Footer />
  </div>
</template>

<script lang='ts'>
import { defineComponent } from 'vue'
import NavBar from './views/NavBar.vue'
import Footer from './views/Footer.vue'
export default defineComponent({
  components: { NavBar, Footer }
})
</script>
