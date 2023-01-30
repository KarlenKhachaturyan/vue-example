import axios from "axios";

const prefix = "team";

export default {
    namespaced: true,
    state: {
        content: {
            status: "loading",
            resource: {}
        },
        members: {
            loading: true,
            resource: {},
            single: {}
        }
    },
    getters: {
        content(state) {
          return state.content
        },
        members (state) {
            return state.members
        },
    },
    mutations: {
        setPageStatus(state, status) {
            state.content.status = status
        },
        setPageContent(state, payload) {
            state.content.resource = payload
        },
        setMembersLoading(state, loading) {
            state.members.loading = loading
        },
        setMembers(state, members) {
            state.members.resource = members
            state.members.loading = false
        },
        setSingleMember(state, member) {
            state.members.single = member
            state.members.loading = false
        }
    },
    actions: {
        async FETCH_PAGE({commit}) {
            const res = await axios.get(`${prefix}/page`)

            commit("setPageContent", res.data.data)
        },
        async GET_PAGE({commit, dispatch}) {
            commit("setPageStatus", "loading")

            await dispatch("FETCH_PAGE")
            commit("setPageStatus", "completed")
        },
        async UPDATE_PAGE({commit, dispatch}, payload) {
            commit("setPageStatus", "updating")
            await axios.put(`${prefix}/page`, payload)

            await dispatch("FETCH_PAGE");
            commit("setPageStatus", "completed")
        },
        async GET_MEMBERS({commit}, page = 1, payload = {}) {
            commit("setMembersLoading", true)
            const res = await axios.get(`${prefix}/member?page=${page}`, payload)

            commit("setMembers", res.data.data)
            commit("setMembersLoading", false)
        },
        async GET_SINGLE_MEMBER({commit}, id) {
            commit("setMembersLoading", true)
            const res = await axios.get(`${prefix}/member/${id}`)

            commit("setSingleMember", res.data.data)
            commit("setMembersLoading", false)
        },
        async CREATE_MEMBER({commit}, payload) {
            commit("setMembersLoading", true)
            const res = await axios.post(`${prefix}/member`, payload)

            return res.data.data
        },
        async UPDATE_MEMBER({commit}, [id, payload]) {
            commit("setMembersLoading", true)
            const res = await axios.post(`${prefix}/member/${id}`, payload)

            return res.data.data
        },
        async DESTROY_MEMBER({commit, dispatch}, id) {
            commit("setMembersLoading", true)
            await axios.delete(`${prefix}/member/${id}`)

            await dispatch("GET_MEMBERS");
        }
    }
}
