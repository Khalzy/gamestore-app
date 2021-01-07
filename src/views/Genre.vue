<template>
<div class="home">
    <div class="dropdown p-2" v-if="genres" @click="toggle">
      <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
        {{$route.params.name}}
      </button>
      <ul class="dropdown-menu" v-if="genres.genres"  aria-labelledby="dropdownMenuButton" :style="{'display': `${obj.showDropDown}`}">
        <li v-for="(item, index) in genres.genres.slice(0,10)" :key="index">
          <router-link :to="{ name: 'genre', params: { genreId: item.id, name: item.name }}">
            <a class="dropdown-item" href="#">{{ item.name }}</a>
          </router-link>
        </li>
      </ul>
    </div>
    <h3 v-if="data"></h3>
    <h3 v-if="!data.loading && data.error">{{data.error}}</h3>
    <div v-if="!data.data !== null" class="d-flex flex-wrap">
        <div class="card d-flex mx-auto mb-1 mt-5" v-for="(item, index) in data.games" :key='index'>
          <div class="card-body h-auto p-0 rounded">
            <div class="h-55 mb-1">
              <div v-if="item" class="game_video">
                <video width="320" height="200" controls v-if="item.clip" :poster="item.background_image" playsinline>
                  <source :src="item.clip.clips.full" type="video/mp4">
                  <!-- <source src="mov_bbb.ogg" type="video/ogg"> -->
                  Your browser does not support HTML video.
                </video>
                <img class="h-55" v-if="!item.clip" :src="item.background_image" :alt="item.name" :style="{'display': `${obj.display}`}">
              </div>
            </div>
            <div class="card-info p-2">
              <div class="d-flex justify-content-between min-h-60">
                <h5 class="card-title">{{ item.name }}</h5>
                <p class="card-text p-1 btn btn-warning">{{ item.metacritic }}</p>
              </div>
              <div class="d-flex flex-wrap h-10 mb-5">
                <div class="d-flex flex-wrap text-box"></div>
                <div class="card-text m-0 pr-1" v-for="(genre, index) in item.genres" :key="index">
                  <span>{{ genre.name }}</span>,
                </div>
                <p class="card-text p-0" v-if="item.esrb_rating">{{ item.esrb_rating.name }}</p>
              </div>
                <router-link class="color z-index-1 position-absolute fixed-bottom text-center w-auto" :to="{ name: 'details', params: { id: item.id }}">Details</router-link>
            </div>
          </div>
        </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, reactive, ref, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import getGames from '../Hooks/getGames'
import getGenres from '../Hooks/getGenres'

export default defineComponent({
  setup () {
    const route = useRoute()
    const data = ref()
    function getSort (id: unknown) {
      data.value = getGames(`https://api.rawg.io/api/games?dates=2020-01-01,2020-12-31&ordering=-rating&ordering=-metacritic&genres=${id}`)
    }
    const genres = getGenres('https://api.rawg.io/api/genres')
    const obj = reactive({
      showDropDown: 'none',
      dropdown: false,
      display: 'block',
      video: false
    })
    const hover = true
    function toggle () {
      obj.dropdown = !obj.dropdown
      if (obj.dropdown === true) {
        obj.showDropDown = 'block'
      } else {
        obj.showDropDown = 'none'
      }
    }
    function video () {
      obj.video = !obj.video
      if (obj.video === true) {
        obj.display = 'none'
      } else {
        obj.display = 'block'
      }
    }

    watchEffect(() => {
      getSort(route.params.genre)
    })
    return {
      data,
      genres,
      toggle,
      video,
      obj,
      hover
    }
  }
})
</script>
// .game_video video{
//   object-fit: cover;
// }
// .foo-hover {
//   background: green;
//   z-index: 5000;
//   img {
//     display: none;
//   }
// }
// .h-55 {
//   height: 200px;
//   width: 100%;
// }

// .h-10 {
//   min-height: 50px;
// }
// .color {
//   color: white;
//   background-color:black;
//   width: fit-content;
//   padding: 10px;
//   text-decoration: none;
//   border-radius: 5px;
//   box-shadow: rgb(0,0,0, 0.3) 2px 9px 14px;
//   cursor: pointer;
//   z-index: 1;
// }
// body {
//   padding: 0;
//   margin: 0;
//   background-color: #545454;
//   color: white;
// }
// .card {
//   min-width: 20em;
//   height: 380px;
//   background-color: transparent;
//   color: black;
// }
// .card-title {
//   font-size: 20px;
// }
// .card-text {
//   height: fit-content;
// }
// .card-body {
//   background-color: white;
// }
// .card-info {
//   display: flex;
//   flex-direction: column;
//   height: 40%;
// }

// @media only screen and (min-width: 320px) {
//   .card {
//     width: 12rem;
//     height: 380px;
//     background-color: transparent;
//     color: black;
//   }
//   .h-55 {
//     height: 200px;
//   }
// }
