import firebase from 'firebase'

const userStore = {
    state: () => ({
        logged: false,
        user: {},
        loading: false
    }),

    mutations: {
        AUTH_USER(state, user) {
            state.user = user
            state.logged = true
        },
        LOGOUT_USER(state) {
            state.logged = false
            state.user = null
        }
    },

    actions: {
        async login({ commit }, { email, password }) {
            await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
            firebase.auth().signInWithEmailAndPassword(email, password)
                .then(result => {
                    commit('AUTH_USER', result.user)
                })
                .catch(error => {
                    console.log(error.message)
                });
        },

        logout({ commit }) {
            firebase.auth().signOut().then(() => {
                commit('LOGOUT_USER')
            }).catch(error => {
                console.log(error.message)
            });
        },

        checkUser({ commit }) {
            firebase.auth().onAuthStateChanged(user => {
                if (user) {
                    commit('AUTH_USER', user)
                }
            })
        }

    },

    getters: {
        isLogged: state => state.logged,
        userLogged: state => state.user
    }
}

export default userStore