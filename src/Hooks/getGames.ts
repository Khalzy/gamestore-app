import { reactive, watchEffect } from 'vue'
import axios from 'axios'

interface FetchState {
    games: object | any;
    error: string;
    loading: boolean;
}
export default function getGames (link: string) {
  const state = reactive<FetchState>({
    games: null,
    error: '',
    loading: false
  })
  const fetchData = async () => {
    const headers = { 'Content-Type': 'application/json' }
    const result = await axios.get(link, { headers })
    state.games = result.data.results
    console.log(state.games)
  }

  watchEffect(() => {
    console.log('url has changed', link)
    fetchData()
  })
  return state
}
