<template>
    <nav class="navbar z-index-10 sticky-top navbar-expand-lg navbar-light bg-light">
    <a class="navbar-brand p-3 h1" href="#">Gamesmew</a>
    <button class="mr-3 btn" @click='toggle' type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav" :style="{'display': `${obj.showSection}`}">
        <div class="navbar-nav">
            <router-link class="nav-link mr-1" :to="{ name: 'Home' }">Home</router-link>
            <div class="dropdown">
              <button class="btn btn-secondary dropdown-toggle"  @click='dropdown' type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                Dropdown button
              </button>
            <div class="d-flex flex-wrap ml-5 mt-2">
              <ul class="dropdown-menu items" v-for="(item, index) in platforms.platforms.slice(0, 5)" :key="index" :style="{'display': `${obj.showDropDown}`}" aria-labelledby="dropdownMenuButton">
                <li><router-link class="dropdown-item" :to="{ name: 'platforms', params: { platform: item.name }}">{{ item.name }}</router-link></li>
              </ul>
                <p v-if="dropDown" class="h1">more</p>
            </div>
            </div>
            <router-link class="nav-link mr-1" :to="{ name: 'Random' }">Random</router-link>
        </div>
    </div>
    </nav>
</template>
<script lang='ts'>
import { defineComponent, reactive, watchEffect, ref } from 'vue'
import getPlaforms from '../Hooks/getPlatforms'
import { useRoute } from 'vue-router'
export default defineComponent({
  setup () {
    const route = useRoute()
    const platform = route.params.platform
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
        console.log(obj.showDropDown)
      } else {
        obj.showDropDown = 'none'
        console.log(obj.showDropDown)
      }
    }
    function getPlatform () {
      platforms.value = getPlaforms('https://api.rawg.io/api/platforms')
      console.log(route.params.id)
    }
    watchEffect(() => {
      getPlatform()
      console.log(platform, 'url has changessssss')
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
.btn {
  outline: none;
}
.items {
  width: 20px;
}
</style>
