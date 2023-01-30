import axios from 'axios'

const prefix = 'footer'

export default {
    namespaced: true,
    state: {
        text: ""
    },
    getters: {
        getFooterText(state){
            return state.text
        }
    },
    mutations: {
        setFooterText(state, payload){
            state.text = payload
        }
    },
    actions: {
        GET_FOOTER_TEXT(context){
            return new Promise((resolve, reject) => {
                axios.get(prefix)
                    .then(result => {
                        if(result.status === 200){
                            context.commit('setFooterText', result.data.data)
                            resolve(true)
                        }
                    })
                    .catch(error => {
                        reject(error)
                    })
            })
        },
        UPDATE_FOOTER_TEXT(context, text){
            return new Promise((resolve, reject) => {
                axios.put(prefix, {text})
                    .then(result => {
                        if(result.status === 200)
                            resolve(true)
                    })
                    .catch(error => {
                        reject(error)
                    })
            })
        }
    }
}
