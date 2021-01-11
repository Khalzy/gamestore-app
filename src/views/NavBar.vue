<template>
  <nav class="navbar navbar-expand-lg sticky-top navbar-dark bg-primary">
    <div class="container-fluid">
      <a class="navbar-brand fw-bold" href="#">Gamestore</a>
      <button
        class="navbar-toggler"
        @click="dropdown = !dropdown"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="navbar-collapse" id="navbarNav" v-show="dropdown">
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link class="nav-link mr-1" :to="{ name: 'Home' }">Home</router-link>
          </li>
          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              @click="platformDropDown = !platformDropDown"
              id="navbarDropdownMenuLink"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Platforms
            </a>
            <ul
              class="dropdown-menu"
              aria-labelledby="navbarDropdownMenuLink"
              v-show="platformDropDown"
              v-if="platforms.platforms"
            >
              <li v-for="(item, index) in platforms.platforms.slice(0, 8)" :key="index">
                <router-link
                  class="dropdown-item text-dark"
                  :to="{
                    name: 'platforms',
                    params: { platform: item.name, id: item.id },
                  }"
                  >{{ item.name }}</router-link
                >
              </li>
            </ul>
          </li>
          <li class="nav-item">
            <router-link class="nav-link mr-1" :to="{ name: 'Random' }"
              >Random</router-link
            >
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
<script lang="ts">
import { defineComponent, watchEffect, ref } from 'vue'
import getPlatformGames from '../Api/getPlatformGames'

export default defineComponent({
  setup () {
    const platforms = ref()
    const dropdown = ref(false)
    const platformDropDown = ref(false)

    function getPlatform () {
      platforms.value = getPlatformGames('https://api.rawg.io/api/platforms')
    }
    watchEffect(() => {
      getPlatform()
    })
    return {
      platforms,
      dropdown,
      platformDropDown
    }
  }
})
</script>
