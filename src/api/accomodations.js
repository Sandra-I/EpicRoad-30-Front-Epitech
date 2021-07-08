import axios from "axios";

const urlApi = process.env.VUE_APP_URL_API;
const accomodations = {

    getAccomodations: (lat, lng) => {
        return new Promise((resolve, reject) => {
            var requestUrl = urlApi + "/api/hotels?latitude=" + lat + "&longitude=" + lng;
            axios.get(requestUrl)
                .then((response) => {
                    if (response.data.length) {
                        const data = response.data.map(accomodation => accomodations.formatToResult(accomodation.hotel));
                        resolve(data);
                    }
                    reject();
                })
                .catch((error) => {
                    reject(error);
                })
        });
    },

    getAccomodationById: (acc_id) => {
        return new Promise((resolve, reject) => {
            axios.get(urlApi + "/api/hotels/" + acc_id)
                .then((response) => {
                    resolve(response.data);
                })
                .catch((error) => {
                    reject(error);
                })
        });
    },

    formatToResult: (data) => {
        return {
            img: (data.media && data.media.length) ? data.media[0].uri : "",
            name: data.name,
            description: (data.description && data.description.text) ? data.description.text : "",
            address: accomodations.formatAddress(data.address),
            lat: data.latitude,
            lng: data.longitude
        }
    },

    formatAddress: (data) => {
        const address = data.lines.join(",") + " " + data.postalCode + " " + data.cityName;
        return address.toLowerCase()
            .split(' ')
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    }
};

export default accomodations;