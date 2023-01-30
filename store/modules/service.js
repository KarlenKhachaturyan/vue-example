import axios from "axios";

const prefix = "service"

export default {
    namespaced: true,
    state: {
        service:{
            loading:false,
            resource: [],
            single:[]
        },
    },
    getters: {
        getServiceData(state) {
            return state.service
        },

        getSingle(state) {
            return state.service.single
        },

        isVisibleLimit(state) {
            return state.service.resource.reduce((count, item) => count += item?.visible, 0) >= 6
        }
    },
    mutations: {
        setServiceLoading(state, loading){
            state.service.loading = loading
        },
        setService(state, service){
            state.service.resource = service
        },
        setSingle(state,service){
            state.service.single = service
        }

    },
    actions: {
        async STORE_SERVICE_SECTION(ctx,params) {
            const res = await axios.post(`${prefix}/store`,params)
            return res.data
        },

        async ALL_DATA({commit}) {
            commit("setServiceLoading", true)
            const res = await axios.get(`${prefix}/all`)

            commit("setService", res.data.data)
            commit("setServiceLoading", false)
        },

        async DELETE_SERVICE({dispatch},id) {
            await axios.delete(`${prefix}/delete/${id}`)
            dispatch('ALL_DATA')
        },

        async EDIT_DATA({commit},id) {
            commit("setServiceLoading", true)
            const res = await axios.get(`${prefix}/edit/${id}`)

            commit('setSingle', {... res.data.data, file: JSON.parse(res.data.data.file)})
            commit("setServiceLoading", false)
        },

        async SAVE_EDIT_DATA(ctx, [id , params]) {
            params.append("_method", "put")
            const res = await axios.post(`${prefix}/update/${id}`,params);

            return res.data
        }
    }
}
