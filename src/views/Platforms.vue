<template>
<div>
    <h1 v-if="data.platforms" class="d-block text-center m-5">Games on {{$route.params.platform}}</h1>
    <div class="d-flex flex-wrap m-4">
        <div class="card d-flex mx-auto mb-1 mt-4" v-for="(item, index) in data.platforms" :key='index'>
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
                <p class="card-text p-1 btn btn-warning" v-if="item.metacritic">{{ item.metacritic }}</p>
                <p class="card-text p-1 btn btn-warning" v-else>{{ item.rating }}</p>
              </div>
              <div class="d-flex flex-wrap h-10 mb-5">
                <div class="d-flex flex-wrap text-box"></div>
                <div class="card-text m-0 pr-1" v-for="(genre, index) in item.genres" :key="index">
                 <span v-if="index">, </span> <span>{{ genre.name }}</span>
                </div>
                <p class="card-text p-0" v-if="item.esrb_rating">,{{ item.esrb_rating.name }}</p>
              </div>
                <router-link class="color z-index-1 position-absolute fixed-bottom text-center w-auto" :to="{ name: 'details', params: { id: item.id }}">Details</router-link>
            </div>
          </div>
        </div>
    </div>
</div>
</template>
<script lang="ts">
import { defineComponent, ref, watchEffect, reactive } from 'vue'
import getPlatformGames from '../Hooks/getPlatformGames'
import { useRoute } from 'vue-router'
import getGenres from '../Hooks/getGenres'
export default defineComponent({
  setup () {
    const route = useRoute()
    const data = ref({})
    function getPlatforms (platformID: string[] | string) {
      data.value = getPlatformGames(`https://api.rawg.io/api/games?dates=2020-01-01,2020-12-31&ordering=-added&platforms=${platformID}`)
      console.log(data.value)
    }
    const genres = getGenres('https://api.rawg.io/api/genres')
    const obj = reactive({
      showDropDown: 'none',
      dropdown: false,
      display: 'block',
      video: false,
      play: false
    })

    function toggle () {
      obj.dropdown = !obj.dropdown
      if (obj.dropdown === true) {
        obj.showDropDown = 'flex'
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

    function loadVid (event: Event) {
      obj.play = !obj.play
      const target = (event.target as HTMLElement)
      const form = document.getElementById(`${target.id}`)
      if (obj.play === false) ((form as HTMLMediaElement).load())
    }
    watchEffect(() => {
      getPlatforms(route.params.id)
      console.log(route.params.id)
    })
    return {
      data,
      toggle,
      video,
      obj,
      genres,
      loadVid,
      isNavbarCollapseOpen: false
    }
  }
})

</script>
<style>
.img-size {
    height: 200px;
}

.overflow {
    overflow: hidden;
    width: 30em;
    overflow-x: auto;
    white-space: nowrap;
}
</style>
