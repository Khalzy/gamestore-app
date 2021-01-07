<template>
<nav class="navbar navbar-expand-lg  sticky-top navbar-dark bg-primary">
  <div class="container-fluid">
    <a class="navbar-brand fw-bold" href="#">NavBar</a>
    <button class="navbar-toggler" @click='toggle' type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav" :style="{'display': `${obj.showSection}`}">
      <ul class="navbar-nav">
        <li class="nav-item">
          <router-link class="nav-link mr-1" :to="{ name: 'Home' }">Home</router-link>
        </li>
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" @click='dropdown' id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Platforms
          </a>
          <ul class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink" :style="{'display': `${obj.showDropDown}`}">
            <li v-for="(item, index) in platforms.platforms.slice(0,8)" :key="index">
              <router-link class="dropdown-item" :to="{ name: 'platforms', params: { platform: item.name, id: item.id }}">{{ item.name }}</router-link>
            </li>
          </ul>
        </li>
        <li class="nav-item">
          <router-link class="nav-link mr-1" :to="{ name: 'Random' }">Random</router-link>
        </li>
      </ul>
    </div>
  </div>
</nav>
</template>
<script lang='ts'>
import { defineComponent, reactive, watchEffect, ref } from 'vue'
import getPlaforms from '../Hooks/getPlatforms'

export default defineComponent({
  setup () {
    const platforms = ref()
    const obj = reactive({
      showSection: 'none',
      showDropDown: 'none',
      toggle: false,
      dropdown: false
    })
    function toggle () {
      obj.toggle = !obj.toggle
      if (obj.toggle === true) {
        obj.showSection = 'block'
      } else {
        obj.showSection = 'none'
      }
    }
    function dropdown () {
      obj.dropdown = !obj.dropdown
      if (obj.dropdown === true) {
        obj.showDropDown = 'block'
      } else {
        obj.showDropDown = 'none'
      }
    }
    function getPlatform () {
      platforms.value = getPlaforms('https://api.rawg.io/api/platforms')
    }
    watchEffect(() => {
      getPlatform()
    })
    return {
      toggle,
      obj,
      dropdown,
      platforms
    }
  }

})
</script>
<style >
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

.items {
  width: 20px;
}
</style>
