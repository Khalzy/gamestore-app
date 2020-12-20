<template>
  <div id="app">
      <NavBar />
      <div>
          <router-view />
      </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent } from 'vue'
import NavBar from './components/NavBar.vue'
import component from '*.vue'

export default defineComponent({
  components: { NavBar },
  component: {
    NavBar
  }
})

</script>
<style lang="scss">

</style>
