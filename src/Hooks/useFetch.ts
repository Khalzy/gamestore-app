import { reactive, toRefs } from 'vue'

interface FetchState {
  loading: boolean;
  error: string;
  data: string | number | object | null | any;
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
export default {
  setup() {
    const event = reactive<FetchState>({
      data: null,
      error: '',
      loading: false
    });

    // onMounted(() => {

    // });
    async function fetchData(url: string) {
       const response = await fetch(url, {
        headers: {
          accept: 'application/json'
        }
      })
        const json = response.json()
        event.data = json
    }
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
    return { ...toRefs(event), fetchData };
  }
};