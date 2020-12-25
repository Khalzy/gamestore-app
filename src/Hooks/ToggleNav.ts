import { createApp } from 'vue'
// const toggleNavbar = {
const toggleNavbar = createApp({
    data () {
        return {
          show: true
        }
      },
      methods: {
        toggle () {
          this.show = !this.show
        }
      }
})

toggleNavbar.mount('.navbar-toggler')
