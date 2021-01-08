<template>
  <div class="d-flex mx-auto page-wrapper mt-5 justify-content-center flex-column">
    <p class="h1 fw-bold text-center  mb-5">Games on {{$route.params.platform}}</p>
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
<script lang="ts">
import { defineComponent, ref, watchEffect } from 'vue'
import getGames from '../Api/getGames'
import { useRoute } from 'vue-router'
import getGenres from '../Api/getGenres'

export default defineComponent({
  setup () {
    const route = useRoute()
    const data = ref()

    const genres = getGenres('https://api.rawg.io/api/genres')

    function loadVid (event: Event) {
      const target = (event.target as HTMLElement)
      const form = document.getElementById(`${target.id}`)
      if (form) ((form as HTMLMediaElement).onended) = function () { console.log('Video has stopped playing') }
      if (form) ((form as HTMLMediaElement).onended) = function () { ((form as HTMLMediaElement).load()) }
    }
    watchEffect(() => {
      const platformID = route.params.id
      data.value = getGames(`https://api.rawg.io/api/games?dates=2020-01-01,2020-12-31&ordering=-added&platforms=${platformID}`)
    })
    return {
      data,
      genres,
      loadVid
    }
  }
})

</script>
