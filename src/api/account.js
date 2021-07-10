import axios from 'axios'

const BASE_URL = process.env.VUE_APP_URL_API;
export default {

    // Post Register
    postSignup(firstname, lastname, email, password) {
        return new Promise((resolve, reject) => {
            axios.post(`${BASE_URL}/api/auth/signup`, {
                    firstname: firstname,
                    lastname: lastname,
                    email: email,
                    password: password
                })
                .then(res => {
                    if (res.status === 200) {
                        resolve({
                            status: "success"
                        });
                    }
                }).catch(error => {
                    reject({
                        status: "error",
                        error: error
                    });
                });
        });
    },

    // Post Authentification
    postLogin(email, password) {
        return new Promise((resolve, reject) => {
            axios.post(`${BASE_URL}/api/auth/login`, {
                    email: email,
                    password: password
                })
                .then(res => {
                    if (res.status === 200) {
                        localStorage.setItem('user', JSON.stringify(res.data.user))
                        localStorage.setItem('jwt', res.data.accessToken)
                        resolve({
                            status: "success"
                        });
                    }
                    reject({
                        status: "error",
                        error: res.status
                    })
                }).catch(error => {
                    reject({
                        status: "error",
                        error: error
                    });
                });
        })
    },

    // Post Logout
    postLogout() {
        return new Promise((resolve, reject) => {
            axios.delete(`${BASE_URL}/api/auth/logout`)
            .then(res => {
                if (res.status === 204) {
                    localStorage.clear();
                }
                resolve({status: "success"})
            }).catch(error => {
                reject({
                    status: "error",
                    error: error
                });
            });
        });
    },
}