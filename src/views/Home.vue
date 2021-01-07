<template>
  <div class="d-flex mx-auto page-wrapper justify-content-center flex-column">
    <div class="dropdown mt-5 d-flex w-100 flex-column mb-5" v-if="genres">
      <p class="h1 fw-bold text-center">Best of the year 🏆</p>
      <button class="btn btn-secondary dropdown-toggle mx-auto mt-3"  @click="dropdown = !dropdown" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
        {{$route.params.name ? $route.params.name : 'Action'}}
      </button>
      <ul class="dropdown-display-menu mx-auto flex-column" v-if="genres.genres" v-show="dropdown">
        <li v-for="(genre, index) in genres.genres.slice(0,10)" :key="index">
            <router-link class="dropdown-item" :to="{ name: 'genre', params: { genreId: genre.id, name: genre.name }}">{{ genre.name }}</router-link>
        </li>
      </ul>
    </div>

    <div v-if="data" class="d-flex flex-wrap justify-content-center min-vh-100">
      <div v-for="(item, index) in data.games" :key="index" class="d-flex flex-wrap m-2-5  mb-3">
          <div class="card" style="width: 16rem;" v-if="item">
            <video width="298" height="199" controls v-if="item.clip" @click="loadVid($event)" :id="item.id" :poster="item.background_image" playsinline>
                  <source :src="item.clip.clips.full" type="video/mp4">
                  Your browser does not support HTML video.
                </video>
                <img class="card-img-top h-50" v-if="!item.clip" :src="item.background_image" :alt="item.name">
            <div class="card-body position-relative bg-white">
              <div class="d-flex justify-content-between min-h-60">
                <h5 class="card-title">{{ item.name }}</h5>
                <p class="card-text p-1 btn btn-warning" v-if="item.metacritic">{{ item.metacritic }}</p>
                <p class="card-text p-1 btn btn-warning" v-else>{{ item.rating }}</p>
              </div>
              <div class="d-flex flex-wrap fw-light">
                <p class="card-text" v-for="(genre, index) in item.genres" :key="index">
                    <span v-if="index">, </span> <span>{{ genre.name }}</span>
                </p>
                <p class="card-text p-0" v-if="item.esrb_rating">, {{ item.esrb_rating.name }}</p>
              </div>
                <router-link class="btn btn-primary position-absolute btn-holder" :to="{ name: 'details', params: { id: item.id }}">Details</router-link>
            </div>
          </div>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, ref, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import getGames from '../Api/getGames'
import getGenres from '../Api/getGenres'

export default defineComponent({
  setup () {
    const route = useRoute()
    const data = ref()
    const genres = getGenres('https://api.rawg.io/api/genres')
    const dropdown = ref(false)

    function loadVid (event: Event) {
      const target = (event.target as HTMLElement)
      const form = document.getElementById(`${target.id}`)
      if (form) ((form as HTMLMediaElement).onended) = function () { console.log('Video has stopped playing') }
      if (form) ((form as HTMLMediaElement).onended) = function () { ((form as HTMLMediaElement).load()) }
    }

    watchEffect(() => {
      const genreID = route.params.genreId ? route.params.genreId : 4
      data.value = getGames(`https://api.rawg.io/api/games?dates=2020-01-01,2020-12-31&ordering=-rating&ordering=-metacritic&genres=${genreID}`)
    })

    return {
      data,
      genres,
      loadVid,
      dropdown
    }
  }
})
</script>

<style>
.dropdown-display-menu {
  position: absolute;
  top: 100%;
  left: 50%;
  z-index: 1000;
  min-width: 10rem;
  padding: 0.5rem 0;
  margin: 0.125rem 0 0;
  font-size: 1rem;
  color: #212529;
  text-align: left;
  list-style: none;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid rgba(0, 0, 0, 0.15);
  border-radius: 0.25rem;
}
body {
  min-height: 100vh;
}
.btn-holder {
  right: 10px;
  bottom: 10px;
}
.card video {
  object-fit: cover;
}
.m-2-5 {
  margin: 0.6em;
}
.page-wrapper {
  width: 100%;
  min-height: 100vh;
}

.game_video video{
  object-fit: cover;
  width: 100%;
}

body {
  padding: 0;
  margin: 0;
  background-color: #545454;
  color: white;
}
.card {
  min-width: 300px;
  min-height: 400px;
  max-height: 400px;
  background-color: transparent;
  color: black;
}
.card-text {
  height: fit-content;
}
@media only screen and (max-width: 500px) {
  .card {
    min-height: 400px;
    background-color: transparent;
    color: black;
  }
}

@media only screen and (min-width: 500px) {
  .card {
    width: 400px;
    height: 380px;
    background-color: transparent;
    color: black;
  }
}
</style>
