import axios from 'axios'

const movieStore = {
    state: () => ({ 
        movies: []
    }),

    mutations: {
        FETCH_MOVIES(state, movies) {
            state.movies = movies
        }
    },

    actions: {
        async getMovies ({ commit }) {
            const response = await axios.get('https://jsonplaceholder.typicode.com/photos')             
            commit('FETCH_MOVIES', response.data)
        },
    },

    getters: {
        allMovies: state => { 
            return state.movies.filter(movie => movie.id < 10) 
        },

        topRatedMovies: state => { 
            return state.movies 
        },

        newMovies: state => {
            return state.movies 
        },

        upcomingMovies: state => { 
            return state.movies 
        },
    }
}

export default movieStore