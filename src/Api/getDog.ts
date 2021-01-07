import { reactive, watchEffect } from 'vue'
import axios from 'axios'

interface FetchState {
    img: string;
}
export default function getdog (link: string) {
  const state = reactive<FetchState>({
    img: ''
  })
  const fetchData = async () => {
    const headers = { 'Content-Type': 'application/json' }
    const result = await axios.get(link, { headers })
    state.img = result.data.message
  }

  watchEffect(() => {
    fetchData()
  })
  return state
}
