import axios from "axios";

const BASE_URL = process.env.VUE_APP_URL_API;
const accomodations = {

    getAccomodations: (lat, lng, budget) => {
        return new Promise((resolve, reject) => {
            var requestUrl = BASE_URL + "/api/hotels?radius=30&latitude=" + lat + "&longitude=" + lng + (budget ? "&priceRange=0-"+(0.9*budget)+"&currency=EUR" : "");
            axios.get(requestUrl)
                .then((response) => {
                    if (response.data.length) {
                        const data = response.data.map(accomodation => accomodations.formatToResult(accomodation));
                        resolve(data);
                    }
                    resolve([]);
                })
                .catch((error) => {
                    reject(error);
                })
        });
    },

    getAccomodationById: (acc_id) => {
        return new Promise((resolve, reject) => {
            axios.get(BASE_URL + "/api/hotels/by-hotel?hotelId=" + acc_id)
                .then((response) => {
                    resolve(accomodations.formatToDetail(response.data));
                })
                .catch((error) => {
                    reject(error);
                })
        });
    },

    formatToResult: (data) => {
        return {
            id: data.hotel.hotelId,
            img: (data.hotel.media && data.hotel.media.length) ? data.hotel.media[0].uri : "",
            name: data.hotel.name,
            description: (data.hotel.description && data.hotel.description.text) ? data.hotel.description.text : "",
            address: accomodations.formatAddress(data.hotel.address),
            total: parseInt(data.offers[0].price.total),
            lat: data.hotel.latitude,
            lng: data.hotel.longitude,
            type: "accomodation"
        }
    },

    formatToDetail: (data) => {
        return {
            name: data.hotel.name,
            total: parseFloat(data.offers[0].price.total).toFixed(2),
            phone: accomodations.formatPhone(data.hotel.contact.phone),
            img: data.hotel.media.map(media => media.uri),
            description: data.hotel.description.text,
            opening: {
                isOpen: true
            },
            attributes: data.hotel.amenities.map(amenity => amenity.toLowerCase()),
            email: data.hotel.contact.email,
            rating: parseFloat(data.hotel.rating).toFixed(2),
            lat: data.hotel.latitude,
            lng: data.hotel.longitude
        }
    },

    formatAddress: (data) => {
        const address = data.lines.join(", ") + " " + data.postalCode + " " + data.cityName;
        return address.toLowerCase()
            .split(' ')
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    },

    formatPhone: (phone) => {
        if (phone.includes("/")) {
            const str = phone.split('/')
            return "+" + str[0] + str[1] + str[2];
        }
        return phone
    }
};

export default accomodations;