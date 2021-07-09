import axios from "axios";

const urlApi = process.env.VUE_APP_URL_API;
const activities = {

    getActivities: (lat, lng) => {
        return new Promise((resolve, reject) => {
            var requestUrl = urlApi + "/api/activities?lat=" + lat + "&lng=" + lng;
            axios.get(requestUrl)
                .then((response) => {
                    if (response.data.length) {
                        const data = response.data.map(activity => activities.formatToResult(activity));
                        resolve(data);
                    }
                    reject();
                })
                .catch((error) => {
                    reject(error);
                })
        });
    },

    getActivityById: (id) => {
        return new Promise((resolve, reject) => {
            axios.get(urlApi + "/api/activities/" + id)
                .then((response) => {
                    if (response.data) {
                        resolve(activities.formatToDetail(response.data));
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
            id: data.id,
            img: data.pictures[0],
            name: data.name,
            description: data.shortDescription,
            total: parseInt(data.price.amount),
            lat: data.geoCode.latitude,
            lng: data.geoCode.longitude
        }
    },

    formatToDetail: (data) => {
        return {
            id: data.id,
            img: data.pictures,
            name: data.name,
            rating: parseFloat(data.rating).toFixed(2),
            description: data.shortDescription,
            total: parseInt(data.price.amount).toFixed(2),
            website: data.bookingLink,
            lat: data.geoCode.latitude,
            lng: data.geoCode.longitude
        }
    }

};

export default activities;