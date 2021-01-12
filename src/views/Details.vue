<template>
  <div v-if="details" class="d-flex flex-column min-vh-100">
    <a
      @click="$router.go(-1)"
      class="position-absolute fw-bold text-white h5 p-2 rounded text-shadow"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        class="bi bi-arrow-90deg-left"
        viewBox="0 0 16 16"
      >
        <path
          fill-rule="evenodd"
          d="M1.146 4.854a.5.5 0 0 1 0-.708l4-4a.5.5 0 1 1 .708.708L2.707 4H12.5A2.5 2.5 0 0 1 15 6.5v8a.5.5 0 0 1-1 0v-8A1.5 1.5 0 0 0 12.5 5H2.707l3.147 3.146a.5.5 0 1 1-.708.708l-4-4z"
        />
      </svg>
      Back
    </a>
    <div v-if="details.details" class="info">
      <img :src="details.details.background_image" class="w-100" />
      <h1 class="mt-5 mb-4 h1 mx-auto w-90">{{ details.details.name }}</h1>
      <div class="m-auto w-90 mb-5 d-flex justify-content-between">
        <div>
          <p class="text-fit">Developed by</p>
          <div v-for="(item, index) in details.details.developers" :key="index">
            <sub class="mt-5 mb-4 fw-light">{{ item.name }}</sub>
          </div>
        </div>
        <div>
          <p class="text-fit text-end">Published by</p>
          <div v-for="(item, index) in details.details.publishers" :key="index">
            <sub class="mt-5 mb-4 fw-light">{{ item.name }}</sub>
          </div>
        </div>
      </div>
      <div class="mx-auto w-90 mb-5" v-if="details.details.released">
        <p>Release date</p>
        <sub class="mx-auto w-90 fw-light">{{ details.details.released }}</sub>
      </div>
      <h4 class="w-90 mx-auto mb-3" v-if="details.details.description_raw">About</h4>
      <p
        class="fs-6 fw-normal mb-1 w-90 mx-auto mb-5"
        v-html="details.details.description_raw"
      ></p>
    </div>

    <div class="mx-auto w-90">
      <div class="d-flex flex-wrap fw-normal" v-if="details.suggested">
        <p class="mb-5">{{ details.suggested.seo_text }}</p>
        <div class="carousel-y">
          <div
            class="card-y"
            v-for="(item, index) in details.suggested.results"
            :key="index"
          >
            <router-link :to="{ name: 'details', params: { id: item.id } }">
              <img class="mx-auto sizing mb-2 rounded" :src="item.background_image" />
              <h6 class="text-center mx-auto p-1 fw-light h-20px">
                {{ item.name }}
              </h6>
            </router-link>
          </div>
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
<style scoped>
a {
  cursor: pointer;
}
.preview video {
  width: 80%;
  height: auto;
  margin: 0 auto;
}

.preview {
  display: flex;
  justify-content: center;
}
.link-style {
  text-decoration: none;
  cursor: pointer;
  color: white;
}
.size {
  width: 30%;
  height: 220px;
}

.text-shadow {
  text-shadow: rgb(0, 0, 0, 0.5) 4px 1px;
}
@media only screen and (max-width: 595px) {
  .size {
    width: auto;
    height: 250px;
  }
}
@media only screen and (min-width: 600px) {
  .size {
    width: 45%;
    height: 220px;
  }
}
@media only screen and (min-width: 1000px) {
  .size {
    width: 26%;
    height: 200px;
  }
}
@media only screen and (min-width: 1440px) {
  .size {
    width: 26%;
    height: 220px;
  }
}
</style>
