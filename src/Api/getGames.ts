import { watchEffect, ref } from 'vue'
import axios from 'axios'

export default function getGames (link: string) {
  const games = ref()
  const error = ref()
  const fetchData = async () => {
    const headers = { 'Content-Type': 'application/json' }
    await axios.get(link, { headers })
      .then(response => {
        games.value = response.data.results
      }).catch(err => {
        error.value = err
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
