import axios from "axios";

const urlApi = process.env.VUE_APP_URL_API;
const restaurants = {

    getRestaurants: (city = false) => {
        return new Promise((resolve, reject) => {
            var results = []
            restaurants.getEats(city).then((eats) => {
                if (eats.length) results.push(...eats);
                restaurants.getDrinks(city).then((drinks) => {
                    if (drinks.length) results.push(...drinks);
                    resolve(results.sort(() => Math.random() - 0.5));
                })
                .catch((error) => {
                    reject(error);
                });
            })
            .catch((error) => {
                reject(error);
            });
        });
    },

    getEats: (city = false) => {
        return new Promise((resolve, reject) => {
            var requestUrl = urlApi + "/api/eats" + (city ? "?near=" + city.toLowerCase() : "");
            axios.get(requestUrl)
                .then((response) => {
                    if (response.data.length) {
                        const data = response.data.map(eat => restaurants.formatToResult(eat, "eat"));
                        resolve(data);
                    }
                    reject();
                })
                .catch((error) => {
                    reject(error);
                })
        });
    },

    getEatById: (id) => {
        return new Promise((resolve, reject) => {
            axios.get(urlApi+"/api/eats/"+id)
                .then((response) => {
                    if (response.data.length) {
                        const data = response.data.map(eat => restaurants.formatToDetail(eat));
                        resolve(data);
                    }
                    reject();
                })
                .catch((error) => {
                    reject(error);
                })
        });
    },

    getDrinks: (city = false) => {
        return new Promise((resolve, reject) => {
            var requestUrl = urlApi + "/api/drinks" + (city ? "?near=" + city.toLowerCase() : "");
            axios.get(requestUrl)
                .then((response) => {
                    if (response.data.length) {
                        const data = response.data.map(drink => restaurants.formatToResult(drink, "drink"));
                        resolve(data);
                    }
                    reject();
                })
                .catch((error) => {
                    reject(error);
                })
        });
    },

    getDrinkById: (id) => {
        return new Promise((resolve, reject) => {
            axios.get(urlApi+"/api/drinks/"+id)
                .then((response) => {
                    if (response.data.length) {
                        const data = response.data.map(drink => restaurants.formatToDetail(drink));
                        resolve(data);
                    }
                    reject();
                })
                .catch((error) => {
                    reject(error);
                })
        });
    },

    formatToResult: (data, type) => {
        return {
            id: data.id,
            img: data.thumbnails,
            name: data.name,
            address: restaurants.getAddress(data),
            lat: data.location.lat,
            lng: data.location.lng,
            type: type
        }
    },

    formatToDetail: (data) => {
        console.log(data);
        return {
            id: data.id,
            name: data.name,
            address: restaurants.getAddress(data),
            lat: data.location.lat,
            lng: data.location.lng,
            type: type
        }
    },

    getAddress: (data) => {
        if (data.location.address) {
            return data.location.address + " " + data.location.city;
        }
        if (data.location.neighborhood) {
            return data.location.neighborhood + ", " + data.location.city;
        }
    }

};

export default restaurants;