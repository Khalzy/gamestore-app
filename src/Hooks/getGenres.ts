import { reactive, watchEffect } from 'vue'
import axios from 'axios'

interface FetchState {
    genres: object | any;
    error: string;
}
export default function getGames (link: string) {
  const state = reactive<FetchState>({
    genres: null,
    error: ''
  })
  const fetchData = async () => {
    const headers = { 'Content-Type': 'application/json' }
    const result = await axios.get(link, { headers })
    state.genres = result.data.results
  }

  watchEffect(() => {
    fetchData()
  })
  return state
}
