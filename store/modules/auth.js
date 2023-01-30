import { router } from "@/router"
import axios from "axios";

const prefix = "auth"

export default {
    namespaced: true,
    state: {
        user: null,
        loading: false,
        token: localStorage.getItem("token")
    },
    getters: {
        user(state) {
            return state.user
        },
        token(state) {
            return state.token
        }
    },
    mutations: {
        setUser(state, user) {
            state.user = user;
        },
        setToken(state, token) {
            state.token = token;
            localStorage.setItem('token', token);
        },
        clear(state) {
            state.token = null;
            state.user = null;
            localStorage.removeItem('token');
        }
    },
    actions: {
        async login({commit}, payload) {
            const res = await axios.post(`${prefix}/login`, payload)

            commit("setUser", res.data.user)
            commit("setToken", res.data.token)
            await router.push({name: "Dashboard"})
        },
        async logout({commit}) {
            await axios.post(`${prefix}/logout`)

            commit("clear")
            await router.push({name: "Login"})
        }
    }
}
