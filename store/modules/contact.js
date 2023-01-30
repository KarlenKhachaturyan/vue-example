import axios from 'axios'

const prefix = 'contact'

export default {
    namespaced: true,
    state: {
        contact_data: {}
    },
    getters: {
        getContactData (state) {
            state.contact_data.map_coordinates = JSON.parse(state.contact_data.map_coordinates)
            return state.contact_data
        }
    },
    mutations: {
        setContactData (state, { data }) {
            state.contact_data = data
        }
    },
    actions: {
        GET_DATA (context) {
            return new Promise((resolve, reject) => {
                axios.get(`${prefix}`)
                    .then(result => {
                        if(result.status === 200){
                            context.commit('setContactData', result.data)
                            resolve(true)
                        }
                    })
                    .catch(error => {
                        reject(error)
                    })
            })
        },
        UPDATE_DATA (context, data) {
            return new Promise((resolve, reject) => {
                axios.put(`${prefix}/1`, data)
                    .then(({ data }) => {
                        if(data.updated) {
                            resolve('Updated Successfully')
                        }
                    })
                    .catch(error => {
                        reject(error)
                    })
            })
        }
    }
}
