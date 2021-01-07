<template>
    <div class="d-flex flex-column text-center mt-4">
      <h1>Random dog pictures</h1>
        <div class="contain mx-auto py-2 mb-5">
          <img v-if="dog" class="contain d-block rounded" :src="dog.img" />
        </div>
      <button class="btn btn-primary w-5 mx-auto" @click="getData">New Dog</button>
    </div>
</template>

<script>
import getDog from '../Hooks/getDog'
import { defineComponent, ref } from 'vue'
export default defineComponent({
  setup () {
    const dog = ref('')
    function getData () {
      dog.value = getDog('https://dog.ceo/api/breeds/image/random')
    }
    return {
      getData,
      dog
    }
  }
})
</script>

<style>
.contain {
    width: 20rem;
    height: 20rem;
}

@media screen and (min-width: 300px) {
    .contain {
      width: 15rem;
      height: 15rem;
    }
}
@media screen and (min-width: 700px) {
    .contain {
      width: 30rem;
      height: 30rem;
    }
}
</style>
