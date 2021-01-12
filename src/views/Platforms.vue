<template>
  <div class="d-flex mx-auto page-wrapper justify-content-center mt-5 flex-column">
    <p v-if="!data.error" class="h1 fw-bold text-center mb-5">
      Games on {{ $route.params.platform }}
    </p>
    <h1 v-if="data.error" class="text-center">{{ data.error.message }}</h1>
    <div v-else class="content-wrapper">
      <div class="dropdown d-flex flex-column w-90 mx-auto" if="genres">
        <div
          class="text-white h5 border-0 dropdown-toggle mt-3 fw-bold"
          @click="dropdown = !dropdown"
          id="dropdownMenuButton"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          Sort
        </div>

        <ul class="flex-column" v-if="platforms.platforms" v-show="dropdown">
          <li v-for="(item, index) in platforms.platforms.slice(0, 8)" :key="index">
            <router-link
              class="dropdown-item h5"
              @click="dropdown = false"
              :to="{ name: 'platforms', params: { id: item.id, platform: item.name } }"
              >{{ item.name }}</router-link
            >
          </li>
        </ul>
      </div>
      <div class="carousel">
        <div class="swipeCard" v-for="(item, index) in data.games" :key="index">
          <img class="swipeCard__image" :src="item.background_image" :alt="item.name" />
          <div class="swipeCard__body">
            <div class="d-flex justify-content-between min-h-60">
              <h5 class="swipeCard__title">{{ item.name }}</h5>
              <p class="p-1 btn btn-warning" v-if="item.metacritic">
                {{ item.metacritic }}
              </p>
              <p class="card-text p-1 btn btn-warning" v-else>{{ item.rating }}</p>
            </div>
            <div class="swipeCard__genres">
              <p v-for="(genre, index) in item.genres.slice(0, 2)" :key="index">
                <span v-if="index">/ </span> <span class="pe-1">{{ genre.name }}</span>
              </p>
            </div>
            <router-link
              class="swipeCard__details"
              :to="{ name: 'details', params: { id: item.id } }"
              >Details</router-link
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, watchEffect } from 'vue'
import getGames from '../Api/getGames'
import { useRoute } from 'vue-router'
import getGenres from '../Api/getGenres'
import getPlatformGames from '../Api/getPlatformGames'

export default defineComponent({
  setup () {
    const route = useRoute()
    const data = ref()
    const platforms = ref()
    const dropdown = ref(false)
    const genres = getGenres('https://api.rawg.io/api/genres')
    function getPlatform () {
      platforms.value = getPlatformGames('https://api.rawg.io/api/platforms')
    }
    watchEffect(() => {
      const platformID = route.params.id
      data.value = getGames(
        `https://api.rawg.io/api/games?dates=2020-01-01,2020-12-31&ordering=-added&platforms=${platformID}`
      )
      getPlatform()
    })
    return {
      data,
      genres,
      platforms,
      dropdown
    }
  }
})
</script>
