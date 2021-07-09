import axios from 'axios'

const BASEURL = 'http://localhost:7000/api'

export default {
    // Post Register
    postSignup (params) {
        return axios.post(`${BASEURL}/auth/signup`, params)
    },

    // Post Authentification
    postLogin (params) {
        return axios.post(`${BASEURL}/auth/login`, params)
    },

    // Post Logout
    postLogout () {
        return axios.delete(`${BASEURL}/auth/logout`)
    },
}