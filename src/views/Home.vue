<template>
  <div class="home">
    <h3 v-if="data"></h3>
    <h3 v-if="!data.loading && data.error">{{data.error}}</h3>
    <div v-if="!data.data !== null" class="d-flex flex-wrap">
        <div class="card d-flex mx-auto mb-1 mt-5 border-bottom-0" v-for="(item, index) in data.games" :key='index'>
          <div class="card-body h-auto p-0 rounded">
            <img class="card-img-top h-55 mb-1" :src="item.background_image" :alt="item.name">
            <div class="card-info p-2 position-relative">
              <div class="d-flex justify-content-between min-h-60">
                <h5 class="card-title">{{ item.name }}</h5>
                <p class="card-text p-1 btn btn-warning">{{ item.rating }}</p>
              </div>
              <div class="d-flex flex-wrap h-10">
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
import { defineComponent, onBeforeMount, ref, toRefs, reactive, watch } from 'vue'
import axios from 'axios'
import getGames from '../Hooks/getGames'

export default defineComponent({
  setup () {
    const data = getGames('https://api.rawg.io/api/games')
    return {
      data
    }
  }
})

</script>

<style lang="scss">
.h-55 {
  height: 220px;
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
  width: 18rem;
  height: 380px;
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
}
.card-info {
  display: flex;
  flex-direction: column;
  height: 40%;
}
</style>
