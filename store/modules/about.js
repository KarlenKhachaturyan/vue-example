import axios from "axios";

const prefix = "about-us"

export default {
    namespaced: true,
    state: {
        about:{
          loading:false,
          resource: [],
          single:[]
        },
    },
    getters: {
        getAboutData(state) {
            return state.about
        },

        getSingle(state) {
          return state.about.single
        }
    },
    mutations: {
        setAboutLoading(state, loading){
            state.about.loading = loading
        },
        setAbout(state, about){
            state.about.resource = about
        },
        setSingle(state,about){
            state.about.single = about
        }

    },
    actions: {
        async STORE_ABOUT_SECTION(ctx,params) {
            const res = await axios.post(`${prefix}/store`,params)
            return res.data
        },

        async ALL_DATA({commit}) {
            commit("setAboutLoading", true)
            const res = await axios.get(`${prefix}/all`)

            commit("setAbout", res.data.data)
            commit("setAboutLoading", false)
        },

        async DELETE_ABOUT({dispatch},id) {
            await axios.delete(`${prefix}/delete/${id}`)
            dispatch('ALL_DATA')
        },

        async EDIT_DATA({commit},id) {
            commit("setAboutLoading", true)
            const res = await axios.get(`${prefix}/edit/${id}`)

            commit('setSingle', {... res.data.data, file: JSON.parse(res.data.data.file)})
            commit("setAboutLoading", false)
        },

        async SAVE_EDIT_DATA(ctx,{params,id}) {
            const res = await axios.post(`${prefix}/update/${id}`,params);
            return res.data
        }
    }
}
