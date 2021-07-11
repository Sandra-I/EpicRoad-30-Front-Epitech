import axios from 'axios'

const BASE_URL = process.env.VUE_APP_URL_API;
const transports = {

    getTravelTimeDuration(origin, destination, waypoints, mode) {
        return new Promise((resolve, reject) => {
            const params = {
                origin: `${parseFloat(origin.lat).toFixed(7)},${parseFloat(origin.lng).toFixed(7)}`,
                destination: `${parseFloat(destination.lat).toFixed(7)},${parseFloat(destination.lng).toFixed(7)}`,
                waypoints: (waypoints.length) ? waypoints.map(waypoint => `${parseFloat(waypoint.lat).toFixed(7)},${parseFloat(waypoint.lng).toFixed(7)}`).join('|') : "",
                mode: mode
            }
            axios.get(BASE_URL + '/api/transport', {params})
                .then((response) => {
                    if (response.data) {
                        const route = response.data.routes[0];
                        if (route) {
                            var distance = 0;
                            var duration = 0;
                            route.legs.forEach(leg => {
                                distance += leg.distance.value;
                                duration += leg.duration.value;
                            })
                            resolve({distance: distance, duration: duration});
                        }
                    }
                    reject("Request error");
                })
                .catch((error) => {
                    reject(error);
                })
        });
    }
}

export default transports;