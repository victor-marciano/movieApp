import axios from 'axios'

const movieStore = {
    state: () => ({
        movies: [],
        popular: [],
        upcoming: [],
        topRated: [],
        nowPlaying: [],
        latest: {}
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
        },
        FETCH_LATEST(state, latest) {
            state.latest = latest
        }
    },

    actions: {
        // async getPopular({ commit }, page) {
        //     const response = await axios.get(`https://api-moviehub.herokuapp.com/popular?page=${page}`)
        //     commit('FETCH_POPULAR', response.data)
        // },
        // async getUpcoming({ commit }, page) {
        //     const response = await axios.get(`https://api-moviehub.herokuapp.com/upcoming?page=${page}`)
        //     commit('FETCH_UPCOMING', response.data)
        // },
        // async getTopRated({ commit }, page) {
        //     const response = await axios.get(`https://api-moviehub.herokuapp.com/top?page=${page}`)
        //     commit('FETCH_TOP_RATED', response.data)
        // },
        // async getNowPlaying({ commit }, page) {
        //     const response = await axios.get(`https://api-moviehub.herokuapp.com/now?page=${page}`)
        //     commit('FETCH_NOW_PLAYING', response.data)
        // },
        async getMovies({ commit }, { page, sort }) {
            const response = await axios.get(`https://api-moviehub.herokuapp.com/${sort}?page=${page}`)
            commit('FETCH_MOVIES', response.data)
        },

        async getLatest({ commit }) {
            const response = await axios.get(`https://api-moviehub.herokuapp.com/latest`)
            commit('FETCH_LATEST', response.data)
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

        latestMovie: state => state.latest
    }
}

export default movieStore