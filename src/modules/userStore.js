import firebase from 'firebase'

const userStore = {
    state: () => ({
        logged: false,
        user: {}
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
                .then((result) => {
                    commit('AUTH_USER', result.user)
                })
                .catch(error => {
                    console.log(error.message)
                });
        },

        logout({ commit }) {
            firebase.auth().signOut().then(() => {
                console.log('logout')
                commit('LOGOUT_USER')
            }).catch(error => {
                console.log(error.message)
            });
        },

        checkUser({ commit }) {
            firebase.auth().onAuthStateChanged(user => {
                if (user) {
                    commit('AUTH_USER', user)
                } else {
                    console.log('Nao esta logado')
                }
            });
        }
    },

    getters: {
        isLogged: state => state.logged
    }
}

export default userStore