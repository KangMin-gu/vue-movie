import axios from "axios";

export default {
    namespaced: 'movie',
    state:() => ({
        title : '',
        loading: false,
        movies: []
    }),
    getters:{

    },
    mutations:{
        updateState(state, payload){
            Object.keys(payload).forEach(key => {
                state[key] = payload[key]
            })
        }
    },
    actions: {
        async searchMovies({ state, commit }){
           // state.loading = true
            commit('updateState', {
                loading : true,
            })
            console.log('searchMovies')
            const res = await axios.get(`http://www.omdbapi.com/?i=tt3896198&apikey=848caf4b&s=${state.title}`)
            console.log(res.data)
           // state.loading = false
            commit('updateState', {
                movies: res.data.Search,
                loading : false,
            })
        }
    }
}