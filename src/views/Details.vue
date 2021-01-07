<template>
  <div v-if="details" class="d-flex flex-column">
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
import getDetails from '../Hooks/getDetails'
export default defineComponent({
  setup () {
    const route = useRoute()
    const details = ref()
    let suggested = ref()
    function getId (id) {
      details.value = getDetails(id)
      suggested = getDetails(id)
      console.log(details)
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
body {
  background-color: white;
  color: black;
}
.link-style {
  text-decoration: none;
  cursor: pointer;
  color: black;
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
