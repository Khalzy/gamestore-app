<template>
     <splide :slides="slides">
    <splide-slide v-for="slide in slides" :key="slide.src">
      <img :src="slide.src">
    </splide-slide>
  </splide>
</template>
<script lang='ts'>
  export default {
	  data() {
		  return {
			  slides: [
					{ src: 'image01.jpg' },
					{ src: 'image02.jpg' },
					{ src: 'image03.jpg' },
				]
		  };
	  },
  }
</script>