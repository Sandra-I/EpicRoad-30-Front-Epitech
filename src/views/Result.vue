<template>
    <div class="result">
        <div class="section">
            <h2>Location on your trip</h2>
            <img class="favorite" :src="favoriteIcon">
            <LocationRoute />
        </div>
        <div class="section">
            <h2>
                Everything you want in <strong>Paris</strong> for
                <strong>885 €</strong>
            </h2>
            <div class="selection">
                <div class="item">
                    <div class="square">
                        <img alt="molitor resort" src="../assets/molitor.png" />
                    </div>
                    <div class="details">
                        <label class="place">Molitor Resort</label>
                        <span class="price">526 €</span>
                    </div>
                </div>
                <div class="item">
                    <div class="square">
                        <img alt="burger nation" src="../assets/burger.png" />
                    </div>
                    <div class="details">
                        <label class="place">Burger Nation</label>
                        <span class="price">17 €</span>
                    </div>
                </div>
                <div class="item">
                    <div class="square">
                        <img alt="louvre museum" src="../assets/louvre.png" />
                    </div>
                    <div class="details">
                        <label class="place">Louvre Museum</label>
                        <span class="price">42 €</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="section d-flex">
            <div class="results">
                <div class="result">
                    <div class="header">
                        <h3>Accomodations</h3>
                        <v-btn text class="filter">
                            Filters
                            <img alt="filter icon" src="../assets/filter.svg" />
                        </v-btn>
                    </div>
                    <ResultPreview  v-for="(accomodation, index) in accomodations.slice(0, 3)" :key="index" :result="accomodation" />
                    <a href="">See {{ accomodations.length - 3 }} additional accommodations ...</a>
                </div>
                <div class="result">
                    <div class="header">
                        <h3>Bars & Restaurants</h3>
                        <v-btn text class="filter">
                            Filters
                            <img alt="filter icon" src="../assets/filter.svg" />
                        </v-btn>
                    </div>
                    <ResultPreview v-for="(restaurant, index) in restaurants.slice(0, 3)" :key="index" :result="restaurant" />
                    <a href="">See {{ restaurants.length - 3 }} additional restaurants ...</a>
                </div>
                <div class="result">
                    <div class="header">
                        <h3>Activities</h3>
                        <v-btn text class="filter">
                            Filters
                            <img alt="filter icon" src="../assets/filter.svg" />
                        </v-btn>
                    </div>
                    <ResultPreview v-for="(activity, index) in activities.slice(0, 3)" :key="index" :result="activity" :route="'/result/activity/'+activity.id"/>
                    <a href="">See {{ activities.length - 3 }} additional activities ...</a>
                </div>
            </div>
            <div class="map">
                <GoogleMap :markers="markers"/>
            </div>
        </div>
    </div>
</template>

<script>
import LocationRoute from "@/components/LocationRoute.vue";
import ResultPreview from "@/components/ResultPreview.vue";
import GoogleMap from '@/components/GoogleMap.vue';
import accomodationsApi from "@/api/accomodations";
import restaurantsApi from "@/api/restaurants";
import activitiesApi from "@/api/activities";

export default {
    name: "Result",
    components: {
        LocationRoute,
        ResultPreview,
        GoogleMap
    },
    data: () => ({
        favoriteIcon: require('../assets/heart.svg'),
        accomodations: [],
        restaurants: [],
        activities: [],
        markers: {
            "accomodations": [],
            "restaurants": [],
            "activities": []
        }
    }),
    mounted () {
        const search = JSON.parse(localStorage.getItem('search'));
        accomodationsApi.getAccomodations(search[0].location.lat, search[0].location.lng).then(accomodations => {
            if (accomodations.length) {
                this.accomodations = accomodations;
                // Set Google Map markers
                this.markers.accomodations = this.accomodations.slice(0,3).map(accomodation => ({
                    "lat": parseFloat(accomodation.lat),
                    "lng": parseFloat(accomodation.lng)
                }))
            }
        });
        restaurantsApi.getRestaurants(search[0].location.city).then(restaurants => {
            if (restaurants.length) {
                this.restaurants = restaurants;
                // Set Google Map markers
                this.markers.restaurants = this.restaurants.slice(0,3).map(restaurant => ({
                    "lat": parseFloat(restaurant.lat),
                    "lng": parseFloat(restaurant.lng)
                }))
            }
        });
        activitiesApi.getActivities(search[0].location.lat, search[0].location.lng).then(activities => {
            if (activities.length) {
                this.activities = activities;
                // Set Google Map markers
                this.markers.activities = this.activities.slice(0, 3).map(activity => ({
                    "lat": parseFloat(activity.lat),
                    "lng": parseFloat(activity.lng)
                }))
            }
        });
    }
};
</script>

<style lang="scss">
.result {    
    a {
        text-decoration: none;
        font-weight: bold;
    }

    .section {
        text-align: left;
        margin-bottom: 100px;
        position: relative;
        h2 {
            margin-bottom: 40px;
        }
        .favorite {
            width: 20px;
            height: 20px;
            position: absolute;
            right: 0;
            top: 10px;
        }
    }

    .selection {
        display: flex;
        justify-content: space-between;
        width: 100%;
        .item {
            width: 20%;
            &:hover {
                opacity: 0.6;
                cursor: pointer;
            }
            .square {
                position: relative;
                display: block;
                margin: auto;
                &::before {
                    content: "";
                    padding-top: 100%;
                    display: block;
                }
                img {
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    top: 0;
                    left: 0;
                    bottom: 0;
                    margin: auto;
                    border-radius: 5%;
                }
            }
            .details {
                display: flex;
                padding-top: 20px;
                justify-content: space-between;
                .place {
                    font-weight: bold;
                    text-transform: uppercase;
                }
            }
        }
    }

    .results {
        width: 50%;
        padding-right: 50px;
        .result {
            &:not(:first-child) {
                margin-top: 100px;
            }
            .header {
                display: flex;
                justify-content: space-between;
                margin-bottom: 50px;
                h3 {
                    text-align: left;
                    font-size: 24px;
                }
                .filter {
                    display: flex;
                    text-transform: none;
                    color: #6e6e6e;
                    letter-spacing: 0;
                    font-size: 16px;
                    img {
                        margin-left: 15px;
                        width: 15px;
                        height: 15px;
                    }
                }
            }
            .result-preview {
                &:hover {
                    cursor: pointer;
                }
            }
        }
    }

    .map {
        padding-left: 50px;
        width: calc(50% + 10vw);
        margin-right: -10vw;
        margin-bottom: -250px;
        .vue-map {
            border-radius: 20px 0 0 0;
        }
    }
}
</style>
