import axios from "axios";

const BASE_URL = process.env.VUE_APP_URL_API;
const activities = {

    getActivities: (lat, lng) => {
        return new Promise((resolve, reject) => {
            var requestUrl = BASE_URL + "/api/activities?lat=" + lat + "&lng=" + lng;
            axios.get(requestUrl)
                .then((response) => {
                    if (response.data.length) {
                        const data = response.data.map(activity => activities.formatToResult(activity));
                        resolve(data);
                    }
                    if (response.data.code == "ClientError") {
                        reject(response.data.response.body);
                    }
                    resolve([]);
                })
                .catch((error) => {
                    reject(error);
                })
        });
    },

    getActivityById: (id) => {
        return new Promise((resolve, reject) => {
            axios.get(BASE_URL + "/api/activities/" + id)
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
            total: (data.price) ? parseInt(data.price.amount) : "",
            lat: (data.geoCode) ? data.geoCode.latitude : "",
            lng: (data.geoCode) ? data.geoCode.longitude: "",
            type: "activity"
        }
    },

    formatToDetail: (data) => {
        return {
            id: data.id,
            img: data.pictures,
            name: data.name,
            rating: parseFloat(data.rating).toFixed(2),
            description: data.shortDescription,
            total: (data.price) ? parseFloat(data.price.amount).toFixed(2) : "",
            website: data.bookingLink,
            lat: (data.geoCode) ? data.geoCode.latitude : "",
            lng: (data.geoCode) ? data.geoCode.longitude: ""
        }
    }

};

export default activities;