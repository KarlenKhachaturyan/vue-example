import axios from 'axios'
const prefix = 'socials'

export default {
    namespaced: true,
    state: {
        socials_data: {},
        single: {}
    },
    getters: {
        getSocialsData(state) {
            return state.socials_data
        },
        getSingleSocialData(state){
            return state.single
        }
    },
    mutations: {
        setSocialsData(state, payload){
            state.socials_data = payload
        },
        setSingleSocialData(state, payload){
            state.single = payload
        }
    },
    actions: {
        GET_SOCIALS_DATA (context) {
            return new Promise((resolve, reject) => {
                axios.get(prefix)
                    .then(res => {
                        if (res.status === 200) {
                            context.commit('setSocialsData', res.data.data)
                            resolve(true)
                        }
                    })
                    .catch(error => {
                        reject(error)
                    })
            })
        },
        CREATE_SOCIAL_LINK(context, payload){
            return new Promise((resolve, reject) => {
                axios.post(prefix, payload)
                    .then(res => {
                        if(res.status === 200)
                            resolve(res)
                    })
                    .catch(error => {
                        reject(error)
                    })
            })
        },
        GET_SINGLE_SOCIAL_LINK(context, id) {
            return new Promise((resolve, reject) => {
                axios.get(`${prefix}/${id}`)
                    .then(res => {
                        if (res.status === 200) {
                            context.commit('setSingleSocialData', res.data.data)
                            resolve(true)
                        }
                    })
                    .catch(error => {
                        reject(error)
                    })
            })
        },
        UPDATE_SOCIAL_LINK(context, [id, payload]){
            return new Promise((resolve, reject) => {
                axios.put(`${prefix}/${id}`, payload)
                    .then(res => {
                        if(res.status === 200)
                            resolve(res)
                    })
                    .catch(error => {
                        reject(error)
                    })
            })
        },
        DELETE_SOCIAL_LINK(context, id){
            return new Promise((resolve, reject) => {
                axios.delete(`${prefix}/${id}`)
                    .then(res => {
                        if(res.status === 200)
                            resolve(res)
                    })
                    .catch(error => {
                        reject(error)
                    })
            })
        }
    }
}
