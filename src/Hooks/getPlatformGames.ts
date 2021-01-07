import { reactive, watchEffect, ref } from 'vue'
import axios from 'axios'

interface FetchState {
    platforms: Array<TemplateStringsArray> | null | object;
}
export default function getPlatform (link: string) {
  const state = reactive<FetchState>({
    platforms: ref()
  })
  const fetchData = async () => {
    const headers = { 'Content-Type': 'application/json' }
    const result = await axios.get(link, { headers })
    state.platforms = result.data.results
    // console.log(state.platforms)
  }

  watchEffect(() => {
    fetchData()
  })
  return state
}
