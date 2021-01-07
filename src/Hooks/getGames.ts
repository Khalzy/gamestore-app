import { watchEffect, ref } from 'vue'
import axios from 'axios'

// interface FetchState {
//   games: typeof ref;
//   error: Error | string;
// }
export default function getGames (link: string) {
  // const state = reactive<FetchState>({
  //   games: ref(),
  //   error: ''
  // })
  const games = ref()
  const error = ref()
  const fetchData = async () => {
    const headers = { 'Content-Type': 'application/json' }
    await axios.get(link, { headers })
      .then(response => {
        games.value = response.data.results
        // console.log(response.data.results)
        // console.log(games.value)
      }).catch(err => {
        error.value = err
        console.log(err, 'ddd')
      })
  }

  watchEffect(() => {
    fetchData()
  })
  return {
    games,
    error
  }
}
