<template>
  <div v-if="details" class="d-flex flex-column min-vh-100">
    <a @click="$router.go(-1)" class="position-absolute fw-bold text-white h5 p-2 rounded text-decoration-none">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-90deg-left" viewBox="0 0 16 16">
        <path fill-rule="evenodd" d="M1.146 4.854a.5.5 0 0 1 0-.708l4-4a.5.5 0 1 1 .708.708L2.707 4H12.5A2.5 2.5 0 0 1 15 6.5v8a.5.5 0 0 1-1 0v-8A1.5 1.5 0 0 0 12.5 5H2.707l3.147 3.146a.5.5 0 1 1-.708.708l-4-4z"/>
      </svg>
      Back
    </a>
    <div v-for="(item, index) in details" :key="index">
      <img v-if="item" :src="item.background_image" class="w-100">
      <h1 v-if="item" class="mt-5 mb-4 details-w mx-auto">{{ item.name }}</h1>
      <p v-if="item" class="fs-6 fw-light mb-1 details-w mx-auto" v-html="item.description_raw"></p>
    </div>
        <div class="details-w mx-auto">
          <div class="d-flex flex-wrap fw-light justify-content-between" v-if="details.suggested">
            <p class="mb-5 d-block w-100">{{ details.suggested.seo_text }}</p>
            <div class="size mb-2 position-relative" v-for="(item, index) in details.suggested.results" :key="index">
              <img class="w-100 h-75 mb-2 rounded" :src="item.background_image"/>
              <h6 class="w-100 text-center p-1 fw-light">
                <router-link class="link-style" :to="{ name: 'details', params: { id: item.id }}">{{ item.name }}</router-link>
              </h6>
            </div>
          </div>
        </div>
  </div>
</template>

<script>
import { defineComponent, watchEffect, ref } from 'vue'
import { useRoute } from 'vue-router'
import getDetails from '../Api/getDetails'
export default defineComponent({
  setup () {
    const route = useRoute()
    const details = ref()
    let suggested = ref()
    function getId (id) {
      details.value = getDetails(id)
      suggested = getDetails(id)
    }
    watchEffect(() => {
      getId(route.params.id)
    })

    return {
      details,
      suggested
    }
  }
})

</script>
<style>
a {
  cursor: pointer;
}
body {
  background-color: #151515;
  color: white;
}
.link-style {
  text-decoration: none;
  cursor: pointer;
  color: white;
}
.size{
    width: 30%;
    height: 220px;
}
.details-w{
 width: 90%;
}
@media only screen and (max-width: 595px) {
    .size{
        width: auto;
        height: 250px;
    }
}
@media only screen and (min-width: 600px) {
  .size{
    width: 45%;
    height: 220px;
}
}
@media only screen and (min-width: 1000px) {
    .size{
        width: 26%;
        height: 200px;
    }
}
@media only screen and (min-width: 1440px) {
    .size{
        width: 26%;
        height: 220px;
    }
}
</style>
