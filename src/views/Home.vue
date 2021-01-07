<template>
  <body @click="closeMenu">
    <div class="d-flex mx-auto page-wrapper justify-content-center flex-column">
      <div class="dropdown mt-5 d-flex w-100 flex-column mb-5" :class="{'is-active': open}" v-if="genres">
        <p class="h1 fw-bold text-center">Best of the year 🏆</p>
        <button class="btn btn-secondary dropdown-toggle mx-auto mt-3"  @click="toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
          {{$route.params.name ? $route.params.name : 'Action'}}
        </button>
        <ul class="dropdown-menu mx-auto flex-column" v-if="genres.genres"  aria-labelledby="dropdownMenuButton" :style="{'display': `${obj.showDropDown}`, 'left': '50%'}">
          <li v-for="(genre, index) in genres.genres.slice(0,10)" :key="index">
              <router-link class="dropdown-item" :to="{ name: 'genre', params: { genreId: genre.id, name: genre.name }}">{{ genre.name }}</router-link>
          </li>
        </ul>
      </div>
      <!-- <p v-if="error"> {{ error }}</p> -->
      <div v-if="data" class="d-flex flex-wrap justify-content-center height">
        <div v-for="(item, index) in data.games" :key="index" class="d-flex flex-wrap m-2 mb-3">
            <div class="card" style="width: 17rem;" v-if="item">
              <video width="298" height="199" controls v-if="item.clip" @click="loadVid($event)" :id="item.id" :poster="item.background_image" playsinline>
                    <source :src="item.clip.clips.full" type="video/mp4">
                    Your browser does not support HTML video.
                  </video>
                  <img class="card-img-top h-50" v-if="!item.clip" :src="item.background_image" :alt="item.name" :style="{'display': `${obj.display}`}">
              <!-- <img :src="item.background_image" class="card-img-top h-50" alt="..."> -->
              <div class="card-body position-relative">
                <h5 class="card-title">{{ item.name }}</h5>
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
      <!-- <div v-if="games" class="d-flex flex-wrap m-4">
          <div class="card d-flex mx-auto m-4" v-for="(item, index) in games" :key='index'>
            <div class="card-body h-auto p-0 rounded">
              <div class="h-55 mb-1">
                <div v-if="item" class="game_video">
                  <video width="320" height="220" controls v-if="item.clip" @click="loadVid($event)" :id="item.id" :poster="item.background_image" playsinline>
                    <source :src="item.clip.clips.full" type="video/mp4">
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
                    <span v-if="index">, </span> <span>{{ genre.name }}</span>
                  </div>
                  <p class="card-text p-0" v-if="item.esrb_rating">, {{ item.esrb_rating.name }}</p>
                </div>
                  <router-link class="color z-index-1 position-absolute fixed-bottom text-center w-auto" :to="{ name: 'details', params: { id: item.id }}">Details</router-link>
              </div>
            </div>
          </div>
      </div> -->
    </div>
  </body>
</template>

<script lang='ts'>
import { defineComponent, reactive, ref, watchEffect } from 'vue'
import getGames from '../Hooks/getGames'
import { useRoute } from 'vue-router'
import getGenres from '../Hooks/getGenres'

export default defineComponent({
  setup () {
    const route = useRoute()
    const data = ref()
    const genres = getGenres('https://api.rawg.io/api/genres')
    const obj = reactive({
      showDropDown: 'none',
      dropdown: false,
      open: false
    })

    function toggle () {
      obj.dropdown = !obj.dropdown
      if (obj.dropdown === true) {
        obj.showDropDown = 'flex'
      } else {
        obj.showDropDown = 'none'
      }
      alert(obj.dropdown)
    }
    // const highlightEl = (color ) => (event, el) => {
    //   if (el) {
    //     el.style.background = color
    //   } else {
    //     event.target.style.background = color
    //   }
    // }
    // const clearHighlightEl = (event, el) => {
    //   if (el) {
    //     el.style.background = ''
    //   } else {
    //     event.target.style.background = ''
    //   }
    // }

    function loadVid (event: Event) {
      const target = (event.target as HTMLElement)
      const form = document.getElementById(`${target.id}`)
      if (form) ((form as HTMLMediaElement).onended) = function () { console.log('Video has stopped playing') }
      if (form) ((form as HTMLMediaElement).onended) = function () { ((form as HTMLMediaElement).load()) }
      event.stopPropagation()
    }

    watchEffect(() => {
      const genreID = route.params.genreId ? route.params.genreId : 4
      data.value = getGames(`https://api.rawg.io/api/games?dates=2020-01-01,2020-12-31&ordering=-rating&ordering=-metacritic&genres=${genreID}`)
    })

    return {
      data,
      genres,
      obj,
      toggle,
      loadVid
    }
  }
})

</script>

<style lang="scss">
body {
  height: 100vh;
}
.btn-holder {
  right: 10px;
  bottom: 10px;
}
.card video {
  object-fit: cover;
}
.page-wrapper {
  width: 95%;
}
.height {
  min-height: 100vh;
}
.game_video video{
  object-fit: cover;
  width: 100%;
}
.foo-hover {
  background: green;
  z-index: 5000;
  img {
    display: none;
  }
}
.h-55 {
  height: 200px;
  width: 100%;
}

.h-10 {
  min-height: 50px;
}
.color {
  color: white;
  background-color:black;
  width: fit-content;
  padding: 10px;
  text-decoration: none;
  border-radius: 5px;
  box-shadow: rgb(0,0,0, 0.3) 2px 9px 14px;
  cursor: pointer;
  z-index: 1;
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
.card-title {
  font-size: 20px;
}
.card-text {
  height: fit-content;
}
.card-body {
  background-color: white;
  width: 100%;
}
.card-info {
  display: flex;
  flex-direction: column;
  height: 40%;
}

@media only screen and (max-width: 500px) {
  .card {
    min-height: 400px;
    background-color: transparent;
    color: black;
  }
  .h-55 {
    height: 220px;
  }
  // .card-body {

  //   background-color: red;
  // }
}

@media only screen and (min-width: 500px) {
  .card {
    width: 400px;
    height: 380px;
    background-color: transparent;
    color: black;
  }
  .h-55 {
    height: 220px;
  }
}
</style>
