import axios from 'axios'
const movieApiKey = process.env.VUE_APP_MOVIEDB_API_KEY

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
            const response = await axios.get(`https://api.themoviedb.org/3/movie/${sort}?api_key=${movieApiKey}&page=${page}`)
            commit('FETCH_MOVIES', response.data)
        },

        async getMovieDetails({ commit }, { movie }) {
            const response = await axios.get(`https://api.themoviedb.org/3/movie/${movie}?api_key=${movieApiKey}&append_to_response=videos,images,credits,similar}`)
            commit('FETCH_MOVIE_DETAILS', response.data)
        },

        async searchMovie({ commit }, { query }) {
            const response = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${movieApiKey}&query=${query}`)
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