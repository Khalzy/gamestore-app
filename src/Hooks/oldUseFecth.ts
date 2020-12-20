// export default function useFetch (url: string) {
//     const state = reactive<FetchState>({
//       loading: false,
//       error: '',
//       data: null
//     })
//     const fetchData = async () => {
//       state.loading = true
//       state.data = null
//       state.error = ''
//       try {
//         const response = await fetch(url, {
//           headers: {
//             accept: 'application/json'
//           }
//         })
//         if (response.ok) {
//           const json = await response.json()
//           state.data = json
//         } else {
//           state.error = 'Error fetching data'
//         }
//       } catch (error) {
//         state.error = `Error fetching data. ${error.message}`
//       }
//       state.loading = false
//     }
  
    // watchEffect(() => {
    //   console.log('url has changed', url)
    // })
  
//     return state
//   }


import { reactive } from 'vue'
// import { ref, onMounted } from 'vue'

// interface FetchState {
//     loading: boolean;
//     error: string;
//     data: {string: string | number | object | [] } | null;
// }

interface State {
  error: string;
  loading: boolean;
  list: object;
}

export default async function getGames (url: string) {
  const state: State = reactive({
    list: [],
    error: '',
    loading: false
  })

  const response = await fetch(url, {
    headers: {
      accept: 'application/json'
    }
  })

  if (response.ok) {
    const json = response.json()
    state.list = json
  } else {
    state.error = 'Error fetching data'
  }
  return state
}


// interface State {
//   error: string;
//   loading: boolean;
//   data: object;
// }

// export default function getGames (url: string) {
//   const state = reactive<FetchState>({
//     data: ref(),
//     error: '',
//     loading: false
//   })
//   const getData = (res: any) => {
//     console.log(res)
//     state.data.value = 'eee'
//     state.loading = true
//     state.error = 'No errors'
//   }
//   const fetchData = async () => {
//     state.error = ''
//     state.loading = false
//     const response = await fetch(url, {
//       headers: {
//         accept: 'application/json'
//       }
//     })
//     const jsonV = response.json()
//     getData(jsonV)
//     // state.loading = false
//   }

//   onMounted(() => {
//     console.log('url been mounted', url)
//     fetchData()
//   })

  // const route = useRoute()
  // const userData = ref()

  // // fetch the user information when params change
  // watch(
  //   () => route.params,
  //   async newParams => {
  //     userData.value = await fetchUser(newParams.id)
  //   }
  // )
  // watchEffect(() => {
  //   console.log('url has changed', url)
  //   // fetchData()
  // })

  // try{

  //   const response = await fetch(url, {
  //     headers: {
  //       accept: 'application/json'
  //     }
  //   })

  //   if (response.ok) {
  //     const json = response.json()
  //     state.data = json
  //   } else {
  //     state.error = 'Error fetching data'
  //   }
  // } catch (error) {

  // }

//   return state
// }





    // const getData = (res: any) => {
    //       console.log(res)
    //       state.data.value = 'eee'
    //       state.loading = true
    //       state.error = 'No errors'
    //     }
        // const fetchData = async () => {
        //   state.error = ''
        //   state.loading = false
        //   const response = await fetch(url, {
        //     headers: {
        //       accept: 'application/json'
        //     }
        //   })
        //   const jsonV = response.json()
        //   getData(jsonV)
        //   // state.loading = false
        // }