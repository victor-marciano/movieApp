import axios from 'axios'

const movieStore = {
    state: () => ({ 
        movies: [],
        search: []
    }),

    mutations: {
        FETCH_MOVIES(state, movies) {
            state.movies = movies
        },
        SEARCH_MOVIE(state, search) {
            state.search = search
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

        someMovies: state => {
            return state.movies.filter(movie => movie.id < 50)            
        }, 

        topRatedMovies: state => { 
            return state.movies 
        },

        newMovies: state => {
            return state.movies 
        },

        upcomingMovies: state => { 
            return state.movies 
        }
    }
}

export default movieStore