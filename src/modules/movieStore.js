import axios from 'axios'

const movieStore = {
    state: () => ({
        movies: [],
        movieDetails: {},
        search: []
    }),

    mutations: {
        FETCH_MOVIES(state, movies) {
            state.movies = movies
        },

        FETCH_MOVIE_DETAILS(state, movieDetails) {
            state.movieDetails = movieDetails
        },

        SEARCH_MOVIE(state, movies) {
            state.search = movies
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
        },

        async searchMovie({ commit }, { query }) {
            const response = await axios.get(`https://api-moviehub.herokuapp.com/search?search=${query}`)
            commit('SEARCH_MOVIE', response.data)
        }

    },

    getters: {
        allMovies: state => state.movies,
        movieDetails: state => state.movieDetails,
        searchResults: state => state.search
    }
}

export default movieStore