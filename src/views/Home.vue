<template>
  <div class="home">
    <h3 v-if="event.loading"></h3>
    <h3 v-if="!event.loading && event.error">{{event.error}}</h3>
    <div v-if="!event.data !== null" class="d-flex flex-wrap">
        <div class="card d-flex mx-auto" v-for="(product, index) in event.data" :key='index'>
          <div class="card-body">
            <img class="card-img-top h-50 pb-2" :src="event.setImg ? require(`@/assets/loading.gif`) : product.background_image" :alt="product.name">
            <div class="card-info">
              <h5 class="card-title">{{ product.name }}</h5>
              <p class="card-text p-0 m-0">{{ product.rating }}</p>
              <div class="d-flex flex-wrap mb-2">
                <div class="card-text p-0 m-0" v-for="(item, index) in product.genres" :key="index">
                  <span>{{ item.name }}</span><span class="pe-1" v-if="index+1 < product.genres.length">,</span>
                </div>
              </div>
                <p class="card-text p-0 m-0 mb-2" v-if="product.esrb_rating">{{ product.esrb_rating.name }}</p>
            </div>
            <a :href="'/products/' + products.id" class="btn btn-primary">Details</a>
          </div>
        </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, onBeforeMount, ref, reactive, watch } from 'vue'
import axios from 'axios'
interface FetchState {
  loading: boolean;
  error: string;
  data: any | typeof ref;
  status: number;
  setImg: boolean;
}
export default defineComponent({
  setup () {
    const event = reactive<FetchState>({
      data: ref([]),
      error: '',
      loading: true,
      status: 0,
      setImg: true
    })

    onBeforeMount(async () => {
      const headers = { 'Content-Type': 'application/json' }
      const res = await axios.get('https://api.rawg.io/api/games', { headers })
        .then(response => {
          event.data = response.data.results
          event.status = response.status
          event.loading = false
        })
        .catch(err => {
          event.error = `there was me  ${err}`
        })

      if (event.status) {
        event.loading = false
      } else {
        event.error = `Error getting data ${event.error}`
      }
    })
    function setImg () {
      event.setImg = false
    }
    setTimeout(setImg, 2000)
    return {
      event
    }
  }
})
</script>

<style lang="scss">
body{
  padding: 0;
  margin: 0;
}
.bg-img {
  max-width: 200px;
  height: 200px;
  width: 200px;
  height: 160px;
  resize: both;
  background-size: cover;
  object-fit: cover;
  border-radius: 10px;
}
.card {
  width: 18rem;
  height: auto
}

.card-info {
  height: 140px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
</style>
