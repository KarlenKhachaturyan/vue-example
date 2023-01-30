import axios from 'axios'

const prefix = 'question'

export default {
    namespaced: true,
    state: {
        questions: {
            status: "loading",
            resource: {}
        },
    },
    getters: {
        getQuestionsContent(state) {
            return state.questions
        },
        getQuestionsContentStatus(state) {
            return state.questions.status
        }
    },
    mutations: {
        setQuestionsContent(state, payload) {
            state.questions.resource = payload
        },
        setQuestionsLoading(state, status) {
            state.questions.status = status
        }
    },
    actions: {
        GET_QUESTIONS_DATA({commit},  page = 1) {
            return new Promise((resolve, reject) => {
                axios.get(`${prefix}?page=${page}`)
                    .then(result => {
                        commit('setQuestionsContent', result.data)
                        commit('setQuestionsLoading', 'completed')
                    })
                    .catch(error => {
                        reject(error)
                    })
            })
        },
        GET_SINGLE_QUESTION(ctx,id){
            return new Promise((resolve, reject) => {
                axios.get(`${prefix}/${id}`)
                    .then(res => {
                        resolve(res)
                    })
                    .catch(err => {
                        reject(err)
                    })
            })
        },
        DESTROY_QUESTION(ctx, id){
            return new Promise((resolve, reject) => {
                axios.delete(`${prefix}/${id}`)
                    .then(res => {
                        resolve(res)
                    })
                    .catch(err => {
                      reject(err)
                    })
            })
        }
    }
}
