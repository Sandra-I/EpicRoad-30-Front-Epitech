import axios from 'axios'

const BASE_URL = process.env.VUE_APP_URL_API;
const favorites = {

    addFavorite(type, id) {
        return new Promise((resolve, reject) => {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('jwt')
                }
            };
            axios.post(BASE_URL + '/api/favoris', {
                    type: type,
                    ressourceId: id
                }, config)
                .then((response) => {
                    resolve(response);
                })
                .catch((error) => {
                    reject(error);
                })
        });
    },

    removeFavorite(ressource_id) {
        return new Promise((resolve, reject) => {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('jwt')
                }
            };
            favorites.getFavorites().then((response) => {
                // Find ressources id
                if (response) {
                    const toDelete = response.find(favorite => favorite.ressourceId === ressource_id);
                    if (toDelete) {
                        axios.delete(BASE_URL + '/api/favoris/' + toDelete.id, config)
                            .then((response) => {
                                resolve(response);
                            })
                            .catch((error) => {
                                reject(error);
                            });
                    } else {
                        reject("Favorite not found");
                    }
                } else {
                    reject("Request error");
                }
            });
        });
    },

    getFavorites() {
        return new Promise((resolve, reject) => {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('jwt')
                }
            };
            axios.get(BASE_URL + '/api/favoris', config)
                .then((response) => {
                    if (response.data) {
                        resolve(response.data);
                    }
                    reject("Request error");
                })
                .catch((error) => {
                    reject(error);
                })
        });
    }
}

export default favorites;