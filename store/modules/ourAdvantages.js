import axios from "axios";

const prefix = "our-advantages"

export default {
    namespaced: true,
    state: {
        ourAdvantages:{
            loading:false,
            resource: [],
            single:[]
        },
    },
    getters: {
        getOurAdvantagesData(state) {
            return state.ourAdvantages
        },

        getSingle(state) {
            return state.ourAdvantages.single
        }
    },
    mutations: {
        setOurAdvantagesLoading(state, loading){
            state.ourAdvantages.loading = loading
        },
        setOurAdvantages(state, ourAdvantages){
            state.ourAdvantages.resource = ourAdvantages
        },
        setSingle(state,ourAdvantages){
            state.ourAdvantages.single = ourAdvantages
        }
    },
    actions: {
        async STORE_OUR_ADVANTAGES_SECTION(ctx,params) {
            const res = await axios.post(`${prefix}`,params)
            return res.data
        },

        async ALL_DATA({commit}) {
            commit("setOurAdvantagesLoading", true)
            const res = await axios.get(`${prefix}`)

            commit("setOurAdvantages", res.data.data)
            commit("setOurAdvantagesLoading", false)
        },

        async DELETE_OUR_ADVANTAGES({dispatch},id) {
            await axios.delete(`${prefix}/${id}`)
            dispatch('ALL_DATA')
        },

        async EDIT_DATA({commit},id) {
            commit("setOurAdvantagesLoading", true)
            const res = await axios.get(`${prefix}/${id}`)

            commit('setSingle',res.data.data)
            commit("setOurAdvantagesLoading", false)
        },

        async SAVE_EDIT_DATA(ctx,{params,id}) {
            const res = await axios.post(`${prefix}/${id}`,params);
            return res.data
        }
    }
}
