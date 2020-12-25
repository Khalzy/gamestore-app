import { reactive, watchEffect } from 'vue'
import axios from 'axios'

interface FetchState {
    platforms: Array<TemplateStringsArray>;
}
export default function getdog (link: string) {
  const state = reactive<FetchState>({
    platforms: []
  })
  const fetchData = async () => {
    const headers = { 'Content-Type': 'application/json' }
    const result = await axios.get(link, { headers })
    state.platforms = result.data.results
    console.log(state.platforms)
  }

  watchEffect(() => {
    fetchData()
  })
  return state
}
