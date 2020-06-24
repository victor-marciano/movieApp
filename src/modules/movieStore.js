import axios from 'axios'

const movieStore = {
    state: () => ({
        movies: [],
        movieDetails: {}
    }),

    mutations: {
        FETCH_MOVIES(state, movies) {
            state.movies = movies
        },

        FETCH_MOVIE_DETAILS(state, movieDetails) {
            state.movieDetails = movieDetails
        }
    },

    actions: {
        async getMovies({ commit }, { page, sort }) {
            const response = await axios.get(`https://api-moviehub.herokuapp.com/${sort}?page=${page}`)
            commit('FETCH_MOVIES', response.data)
        },

        async getMovieDetails({ commit }, { movie }) {
            const response = await axios.get(`https://api-moviehub.herokuapp.com/movie/${movie}`)
            commit('FETCH_MOVIE_DETAILS', response.data)
        }
    },

    getters: {
        allMovies: state => state.movies,
        movieDetails: state => state.movieDetails
    }
}

export default movieStore