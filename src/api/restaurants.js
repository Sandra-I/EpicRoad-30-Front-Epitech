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
                        const data = response.data.map(eat => restaurants.formatToResult(eat));
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
                        const data = response.data.map(drink => restaurants.formatToResult(drink));
                        resolve(data);
                    }
                    reject();
                })
                .catch((error) => {
                    reject(error);
                })
        });
    },

    formatToResult: (data) => {
        return {
            img: data.thumbnails,
            name: data.name,
            address: data.location.address,
            lat: data.location.lat,
            lng: data.location.lng
        }
    }

};

export default restaurants;