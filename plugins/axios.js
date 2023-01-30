import Vue from 'vue'
import axios from 'axios'
import VueAxios from "vue-axios"

import {store} from '@/store'

axios.defaults.baseURL = /*`${process.env.APP_URL}*/`/api`

axios.interceptors.request.use(
    config => {
        config.headers.common['Access-Control-Allow-Origin'] = '*'
        config.headers.common['Authorization'] = localStorage.getItem('token')

        return config;
    },
    error => Promise.reject(error)
);

axios.interceptors.response.use(response => response, function (error) {
    if (error.response.status === 400)
        console.log(error.response.data.error.message)

    if (error.response.status === 401)
        store.commit('auth/clear')

    return Promise.reject(error);
});

Vue.use(VueAxios, axios)
