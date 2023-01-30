import axios from "axios";

const prefix = "about-page";

export default {
    namespaced: true,
    state: {
        aboutPage:{
            loading:false,
            page:[]
        },
    },
    getters: {
        getPage(state) {
          return state.aboutPage.page
        }
    },
    mutations: {
        setAboutPageLoading(state, loading){
            state.aboutPage.loading = loading
        },
        setAboutPage(state, page){
            state.aboutPage.page = page
        },
    },
    actions: {
        async STORE_ABOUT_PAGE_SECTION(ctx,params) {
            const res = await axios.post(`${prefix}`,params)
            return res.data
        },

        async GET_DATA({commit}) {
            commit("setAboutPageLoading", true)
            const res = await axios.get(`${prefix}`)

            commit("setAboutPage", res.data.data)
            commit("setAboutPageLoading", false)
        },

        async SAVE_EDIT_DATA(ctx,{params,id}) {
            const res = await axios.post(`${prefix}/${id}`,params);
            return res.data
        }
    }
}
