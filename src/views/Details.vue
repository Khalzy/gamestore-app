<template>
    <div class="d-flex flex-column">
        <img :src="state.data.background_image" class="w-100">
        <div class="details-w mx-auto">
            <h1 class="mt-5 mb-5">{{ state.data.name }}</h1>
            <p class="fs-6 fw-light mb-5">{{ state.data.description_raw }}</p>
            <div class="d-flex flex-wrap fw-light justify-content-between" v-if="state.perm">
                <p class="mb-5 d-block w-100">{{ state.perm.seo_text }}</p>
                <div class="size" v-for="(item, index) in state.perm.results" :key="index">
                    <img class="heights mb-2 rounded-2" :src="item.background_image"/>
                    <h6 class="w-100 text-center p-1 fw-normal">{{ item.name }}</h6>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang='ts'>
import axios from 'axios'
import { onMounted, ref, reactive } from 'vue'
import { useRoute } from 'vue-router'

interface FetchState {
    data: any;
    video: any;
    perm: any;
}
export default {
  setup () {
    const route = useRoute()
    const state = reactive<FetchState>({
      data: ref([]),
      video: ref(),
      perm: ref()
    })

    onMounted(() => {
      const id = route.params.id
      function getUserAccount () {
        return axios.get(`https://api.rawg.io/api/games/${id}/movies`)
      }

      function getUserPermissions () {
        return axios.get(`https://api.rawg.io/api/games/${id}/suggested`)
      }

      Promise.all([getUserAccount(), getUserPermissions()])
        .then(function (results) {
          const acct = results[0]
          const perm = results[1]
          console.log(acct, perm)
          state.perm = results[1].data
        })
      const res = axios.get(`https://api.rawg.io/api/games/${id}`)
        .then(data => {
          state.data = data.data
          state.video = data.data.clip
          console.log(data.data)
        })
    })
    console.log(state.video)
    return {
      state
    }
  }
}
</script>
<style>
.size{
    width: 30%;
}
.details-w{
 width: 90%;
}
.heights {
    width: 100%;
}
</style>
