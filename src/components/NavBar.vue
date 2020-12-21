<template>
    <nav class="navbar sticky-top navbar-expand-lg navbar-light bg-light">
    <a class="navbar-brand p-3" href="#">Website Name</a>
    <button @click='toggle' type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav" :style="{'display': `${obj.showSection}`}">
        <div class="navbar-nav">
            <router-link class="nav-link mr-1" :to="{ name: 'Home' }">Home</router-link>
            <router-link class="nav-link mr-1" :to="{ name: 'Categories' }">Categories</router-link>
            <router-link class="nav-link mr-1" :to="{ name: 'Random' }">Random</router-link>
        </div>
    </div>
    </nav>
</template>
<script lang='ts'>
import { defineComponent, reactive } from 'vue'

export default defineComponent({
  setup () {
    const obj = reactive({
      showSection: 'none',
      toggle: false
    })
    function toggle () {
      obj.toggle = !obj.toggle
      if (obj.toggle === true) {
        obj.showSection = 'block'
      } else {
        obj.showSection = 'none'
      }
    }
    return {
      toggle,
      obj
    }
  }

})
</script>
