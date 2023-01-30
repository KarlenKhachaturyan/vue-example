import axios from "axios";

const prefix = "pages"

export default {
    namespaced: true,
    state: {
        page: {
            loading: false,
            resource: {},
            single: {}
        }
    },
    getters: {
        pages (state) {
            return state.page
        },
    },
    mutations: {
        setPageLoading(state, loading) {
            state.page.loading = loading
        },
        setPage(state, members) {
            state.page.resource = members
            state.page.loading = false
        },
        setSinglePage(state, member) {
            state.page.single = member
            state.page.loading = false
        }
    },
    actions: {
        async GET_PAGES({commit}) {
            commit("setPageLoading", true)
            const res = await axios.get(prefix)

            commit("setPage", res.data)
            commit("setPageLoading", false)
        },
        async GET_SINGLE_PAGE({commit}, id) {
            commit("setPageLoading", true)
            const res = await axios.get(`${prefix}/${id}`)

            commit("setSinglePage", res.data.data)
            commit("setPageLoading", false)
        },
        async UPDATE_PAGE({commit}, [id, payload]) {
            payload.append("_method", "put")

            commit("setPageLoading", true)
            const res = await axios.post(`${prefix}/${id}`, payload)

            return res.data.data
        }
    }
}
