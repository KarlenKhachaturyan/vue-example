import axios from "axios";

const prefix = "partner"

export default {
    namespaced: true,
    state: {
        partners:{
            loading:false,
            resource: [],
            single:[]
        },
    },
    getters: {
        getPartnersData(state) {
            return state.partners
        },

        getSingle(state) {
            return state.partners.single
        }
    },
    mutations: {
        setPartnersLoading(state, loading){
            state.partners.loading = loading
        },
        setPartners(state, partners){
            state.partners.resource = partners
        },
        setSingle(state,partner){
            state.partners.single = partner
        }
    },
    actions: {
        async STORE_PARTNER_SECTION(ctx,params) {
            const res = await axios.post(`${prefix}`,params)
            return res.data
        },

        async ALL_DATA({commit}) {
            commit("setPartnersLoading", true)
            const res = await axios.get(`${prefix}`)

            commit("setPartners", res.data.data)
            commit("setPartnersLoading", false)
        },

        async DELETE_PARTNER({dispatch},id) {
            await axios.delete(`${prefix}/${id}`)
            dispatch('ALL_DATA')
        },

        async EDIT_DATA({commit},id) {
            commit("setPartnersLoading", true)
            const res = await axios.get(`${prefix}/${id}`)

            commit('setSingle',res.data.data)
            commit("setPartnersLoading", false)
        },

        async SAVE_EDIT_DATA(ctx,{params,id}) {
            const res = await axios.post(`${prefix}/${id}`,params);
            return res.data
        }
    }
}
