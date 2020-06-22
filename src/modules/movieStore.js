import axios from 'axios'

const movieStore = {
    state: () => ({
        movies: [],
        popular: [],
        upcoming: [],
        topRated: [],
        nowPlaying: []
    }),

    mutations: {
        FETCH_POPULAR(state, popular) {
            state.popular = popular
        },
        FETCH_TOP_RATED(state, topRated) {
            state.topRated = topRated
        },
        FETCH_UPCOMING(state, upcoming) {
            state.upcoming = upcoming
        },
        FETCH_NOW_PLAYING(state, nowPlaying) {
            state.nowPlaying = nowPlaying
        },
        FETCH_MOVIES(state, movies) {
            state.movies = movies
        }
    },

    actions: {
        async getMovies({ commit }, { page, sort }) {
            const response = await axios.get(`https://api-moviehub.herokuapp.com/${sort}?page=${page}`)
            commit('FETCH_MOVIES', response.data)
        }
    },

    getters: {
        allMovies: state => {
            return state.movies
        },

        popularMovies: state => {
            return state.popular
        },

        topRatedMovies: state => {
            return state.topRated
        },

        nowPlayingMovies: state => {
            return state.nowPlaying
        },

        upcomingMovies: state => {
            return state.upcoming
        },

        latestMovie: state => state.movies.results[state.movies.results.length - 1]
    }
}

export default movieStore