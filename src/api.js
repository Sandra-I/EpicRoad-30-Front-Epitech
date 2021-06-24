import axios from 'axios'

const BASEURL = 'http://localhost:7000/api'

export default {
    // Post Authentification
    postLogin (params) {
        return axios.post(`${BASEURL}/auth/login`, params)
    }
}