import { UserService, AuthenticationError } from '../services/user.service'
import { TokenService } from '../services/storage.service'
import router from '../router'


const state =  {
    authenticating: false,
    accessToken: TokenService.getToken(),
    authenticationErrorCode: 0,
    authenticationError: '',
    authenticationSuccess: false,

}

const getters = {
    loggedIn: (state) => {
        return state.accessToken ? true : false
    },

    authenticationErrorCode: (state) => {
        return state.authenticationErrorCode
    },

    authenticationError: (state) => {
        return state.authenticationError
    },

    authenticating: (state) => {
        return state.authenticating
    },
    authenticationSuccess: (state) => {
        return state.authenticationSuccess
    }
}

const actions = {
    async login({ commit }, {username, password}) {
        commit('loginRequest');

        try {
            const token = await UserService.login(username, password);
            commit('loginSuccess', token)
            // Redirect the user to the page he first tried to visit or to the home view
            //router.push(router.history.current.query.redirect || '/');

            return true
        } catch (e) {
            if (e instanceof AuthenticationError) {
                commit('loginError', {errorCode: e.errorCode, errorMessage: e.message})
            }

            return false
        }
    },
    async register({ commit }, {username, password, firstname, lastname, email, phonenumber}) {
        commit('registerRequest');

        try {
            const token = await UserService.register(username, password, firstname, lastname, email, phonenumber);
            commit('registerSuccess', token)

            // Redirect the user to the page he first tried to visit or to the home view
            router.push(router.history.current.query.redirect || '/login');

            return true
        } catch (e) {
            if (e instanceof AuthenticationError) {
                commit('registerError', {errorCode: e.errorCode, errorMessage: e.message})
            }

            return false
        }
    },
    logout({ commit }) {
        UserService.logout()
        commit('logoutSuccess')
        router.push('/search_visitor')
    }
}

const mutations = {
    loginRequest(state) {
        state.authenticating = true;
        state.authenticationError = ''
        state.authenticationErrorCode = 0
    },

    loginSuccess(state, accessToken) {
        state.accessToken = accessToken
        state.authenticationSuccess = true;
        state.authenticating = false;
    },

    loginError(state, {errorCode, errorMessage}) {
        state.authenticating = false
        state.authenticationErrorCode = errorCode
        state.authenticationError = errorMessage
    },

    registerRequest(state) {
        state.authenticating = true;
        state.authenticationError = ''
        state.authenticationErrorCode = 0
    },

    registerSuccess(state, accessToken) {
        state.accessToken = accessToken
        state.authenticationSuccess = true;
        state.authenticating = false;
    },

    registerError(state, {errorCode, errorMessage}) {
        state.authenticating = false
        state.authenticationErrorCode = errorCode
        state.authenticationError = errorMessage
    },

    logoutSuccess(state) {
        state.accessToken = ''
    }
}

export const auth = {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}