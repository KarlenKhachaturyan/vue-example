import axios from "axios";

const prefix = "home-slide"

export default {
    namespaced: true,
    state: {
        homeSlide:{
            loading:false,
            resource: [],
            single:[]
        },
    },
    getters: {
        getHomeSlideData(state) {
            return state.homeSlide
        },

        getSingle(state) {
            return state.homeSlide.single
        }
    },
    mutations: {
        setHomeSlideLoading(state, loading){
            state.homeSlide.loading = loading
        },
        setHomeSlide(state, homeSlide){
            state.homeSlide.resource = homeSlide
        },
        setSingle(state,homeSlide){
            state.homeSlide.single = homeSlide
        }
    },
    actions: {
        async STORE_HOME_SLIDE_SECTION(ctx,params) {
            const res = await axios.post(`${prefix}`,params)
            return res.data
        },

        async ALL_DATA({commit}) {
            commit("setHomeSlideLoading", true)
            const res = await axios.get(`${prefix}`)

            commit("setHomeSlide", res.data.data)
            commit("setHomeSlideLoading", false)
        },

        async DELETE_HOME_SLIDE({dispatch},id) {
            await axios.delete(`${prefix}/${id}`)
            dispatch('ALL_DATA')
        },

        async EDIT_DATA({commit},id) {
            commit("setHomeSlideLoading", true)
            const res = await axios.get(`${prefix}/${id}`)

            commit('setSingle',res.data.data)
            commit("setHomeSlideLoading", false)
        },

        async SAVE_EDIT_DATA(ctx,{params,id}) {
            const res = await axios.post(`${prefix}/${id}`,params);
            return res.data
        }
    }
}
