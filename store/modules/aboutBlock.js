import axios from "axios";

const prefix = "about-block"

export default {
    namespaced: true,
    state: {
        aboutBlock:{
            loading:false,
            resource: [],
            single:[]
        },
    },
    getters: {
        getAboutBlockData(state) {
            return state.aboutBlock
        },

        getSingle(state) {
            return state.aboutBlock.single
        }
    },
    mutations: {
        setAboutBlockLoading(state, loading){
            state.aboutBlock.loading = loading
        },
        setAboutBlock(state, aboutBlock){
            state.aboutBlock.resource = aboutBlock
        },
        setSingle(state,aboutBlock){
            state.aboutBlock.single = aboutBlock
        }
    },
    actions: {
        async STORE_ABOUT_BLOCK_SECTION(ctx,params) {
            const res = await axios.post(`${prefix}`,params)
            return res.data
        },

        async FIRST_DATA({commit}) {
            commit("setAboutBlockLoading", true)
            const res = await axios.get(`${prefix}/first`)

            commit("setSingle", res.data.data)
            commit("setAboutBlockLoading", false)
        },

        async SAVE_EDIT_DATA(ctx,params) {
            const res = await axios.post(`${prefix}/update`,params);
            return res.data
        }
    }
}
