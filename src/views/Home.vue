<template>
  <div class="d-flex mx-auto page-wrapper justify-content-center mt-5 flex-column">
    <p v-if="!data.error" class="h1 fw-bold text-center mb-5">
      Best {{ $route.params.name }} of 2020
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

        <ul class="flex-column" v-if="genres.genres" v-show="dropdown">
          <li v-for="(genre, index) in genres.genres.slice(0, 10)" :key="index">
            <router-link
              class="dropdown-item h5"
              @click="dropdown = false"
              :to="{ name: 'genre', params: { genreId: genre.id, name: genre.name } }"
              >{{ genre.name }}</router-link
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
    <div>
      <p class="swipeCard__slogan">Coming Soon</p>
      <div class="carousel">
        <div class="swipeCard" v-for="(item, index) in popular.games" :key="index">
          <img class="swipeCard__image" :src="item.background_image" :alt="item.name" />
          <div class="swipeCard__body">
            <h5 class="swipeCard__title">{{ item.name }}</h5>
            <div class="swipeCard__genres">
              <p
                class="swipeCard__genres"
                v-for="(genre, index) in item.genres.slice(0, 2)"
                :key="index"
              >
                <span v-if="index">/ </span>
                <span class="pe-1 swipeCard__genres">{{ genre.name }}</span>
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
import { useRoute } from 'vue-router'
import getGames from '../Api/getGames'
import getGenres from '../Api/getGenres'

export default defineComponent({
  setup () {
    const route = useRoute()
    const data = ref()
    const popular = ref()
    const genres = getGenres('https://api.rawg.io/api/genres')
    const dropdown = ref(false)

    watchEffect(() => {
      const genreID = route.params.genreId ? route.params.genreId : 4
      data.value = getGames(
        `https://api.rawg.io/api/games?dates=2020-01-01,2020-12-31&ordering=-rating&ordering=-metacritic&genres=${genreID}`
      )
      popular.value = getGames(
        `https://api.rawg.io/api/games?dates=2021-01-01,2021-12-31&ordering=-added&genres=${genreID}`
      )
    })

    return {
      data,
      genres,
      dropdown,
      popular
    }
  }
})
</script>
