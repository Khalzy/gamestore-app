import axios from 'axios'
import { ref, watchEffect } from 'vue'

export default function getDetails (id: number) {
  const details = ref()
  const video = ref()
  const suggested = ref()
  function getAllData () {
    function getUserPermissions () {
      return axios.get(`https://api.rawg.io/api/games/${id}/suggested`)
    }

    Promise.all([getUserPermissions()])
      .then(function (results) {
        suggested.value = results[0].data
      })
    const res = axios.get(`https://api.rawg.io/api/games/${id}`)
      .then(response => {
        details.value = response.data
        video.value = response.data.clip
      })
    return res
  }

  watchEffect(() => {
    getAllData()
  })

  return {
    details,
    video,
    suggested
  }
}
