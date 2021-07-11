<template>
    <div class="result">
        <div class="section">
            <h2>Location on your trip</h2>
            <LocationRoute :currentSearch="currentSearch" @update-current-search="updateCurrentSearch"/>
        </div>
        <div class="section">
            <h2 v-if="currentSearch.budgetAmount">
                Everything you want in <strong>{{ currentSearch.location.city }}</strong> for <strong>{{ currentSearch.budgetAmount }} €</strong>
            </h2>
            <h2 v-else>
                Everything you want in <strong>{{ currentSearch.location.city }}</strong>
            </h2>
            <div class="selection">
                <div class="item" v-if="accomodations[0]" @click="$router.push('/detail/accomodation/'+accomodations[0].id)">
                    <div class="square">
                        <img v-if="accomodations[0].img" alt="accomodation-suggestion" :src="accomodations[0].img" />
                        <img v-if="!accomodations[0].img" alt="accomodation-suggestion" src="../assets/img_placeholder.jpg"/>
                    </div>
                    <div class="details">
                        <label class="place">{{ accomodations[0].name }}</label>
                        <span class="price">{{ accomodations[0].total }} €</span>
                    </div>
                </div>
                <div class="item" v-if="restaurants[0]" @click="$router.push('/detail/'+restaurants[0].type+'/'+restaurants[0].id)">
                    <div class="square">
                        <img v-if="restaurants[0].img" alt="restaurant-suggestion" :src="restaurants[0].img" />
                        <img v-if="!restaurants[0].img" alt="restaurant-suggestion" src="../assets/img_placeholder.jpg"/>
                    </div>
                    <div class="details">
                        <label class="place">{{ restaurants[0].name }}</label>
                    </div>
                </div>
                <div class="item" v-if="activities[0]" @click="$router.push('/detail/activity/'+activities[0].id)">
                    <div class="square">
                        <img v-if="activities[0].img" alt="activities-suggestion" :src="activities[0].img" />
                        <img v-if="!activities[0].img" alt="activities-suggestion" src="../assets/img_placeholder.jpg"/>
                    </div>
                    <div class="details">
                        <label class="place">{{ activities[0].name }}</label>
                        <span class="price">{{ activities[0].total }} €</span>
                    </div>
                </div>
            </div>
        </div>
        <v-row class="section d-flex">
            <div class="results">
                <div class="result">
                    <div class="header">
                        <h3>Accomodations</h3>
                    </div>
                    <v-row>
                        <ResultPreview  v-for="(accomodation, index) in accomodations.slice(0, 3)" :key="index" :result="accomodation" :route="'/detail/accomodation/'+accomodation.id" :isFavorite="checkIsFavorite(accomodation)" :isLoggedIn="isLoggedIn"/>
                    </v-row>
                    <a v-if="accomodations.length > 3" href="">See {{ accomodations.length - 3 }} additional accommodations ...</a>
                    <label v-if="accomodations.length == 0">No accomodations found in this area.</label>
                </div>
                <div class="result">
                    <div class="header">
                        <h3>Bars & Restaurants</h3>
                    </div>
                    <v-row>
                        <ResultPreview v-for="(restaurant, index) in restaurants.slice(0, 3)" :key="index" :result="restaurant" :route="'/detail/'+restaurant.type+'/'+restaurant.id" :isFavorite="checkIsFavorite(restaurant)" :isLoggedIn="isLoggedIn"/>
                    </v-row>
                    <a v-if="restaurants.length > 3" href="">See {{ restaurants.length - 3 }} additional restaurants ...</a>
                    <label v-if="restaurants.length == 0">No restaurants found in this area.</label>
                </div>
                <div class="result">
                    <div class="header">
                        <h3>Activities</h3>
                    </div>
                    <v-row>
                        <ResultPreview v-for="(activity, index) in activities.slice(0, 3)" :key="index" :result="activity" :route="'/detail/activity/'+activity.id" :isFavorite="checkIsFavorite(activity)" :isLoggedIn="isLoggedIn"/>
                    </v-row>
                    <a v-if="activities.length > 3" href="">See {{ activities.length - 3 }} additional activities ...</a>
                    <label v-if="activities.length == 0">No activities found in this area.</label>
                </div>
            </div>
            <div class="map">
                <GoogleMap :markers="markers" :center="centerGoogleMap"/>
            </div>
        </v-row>
    </div>
</template>

<script>
import LocationRoute from "@/components/LocationRoute.vue";
import ResultPreview from "@/components/ResultPreview.vue";
import GoogleMap from '@/components/GoogleMap.vue';
import AccomodationsApi from "@/api/accomodations";
import RestaurantsApi from "@/api/restaurants";
import ActivitiesApi from "@/api/activities";
import Favorites from "@/api/favorites"

export default {
    name: "Result",
    components: {
        LocationRoute,
        ResultPreview,
        GoogleMap
    },
    props: {
        isLoggedIn: Boolean
    },
    data: () => ({
        favoriteIcon: require('../assets/heart.svg'),
        accomodations: [],
        restaurants: [],
        activities: [],
        favorites: [],
        markers: {
            "accomodations": [],
            "restaurants": [],
            "activities": []
        },
        centerGoogleMap: { lat: 48.854, lng: 2.347 },
        currentSearch: {"location": {}, "budgetAmount": 0}
    }),
    mounted () {
        this.currentSearch = JSON.parse(localStorage.getItem('search'))[0];
        this.loadRessources(this.currentSearch);
        if (this.isLoggedIn) {
            Favorites.getFavorites().then((favorites) => {
                this.favorites = favorites
            });
        }
    },
    methods: {
        loadRessources(search) {
            this.centerGoogleMap = { lat: search.location.lat, lng: search.location.lng };
            AccomodationsApi.getAccomodations(search.location.lat, search.location.lng, search.budgetAmount).then(accomodations => {
                if (accomodations) {
                    this.accomodations = accomodations;
                    // Set Google Map markers
                    this.markers.accomodations = this.accomodations.slice(0,3).map(accomodation => ({
                        "lat": parseFloat(accomodation.lat),
                        "lng": parseFloat(accomodation.lng)
                    }))
                }
            });
            RestaurantsApi.getRestaurants(search.location.city).then(restaurants => {
                if (restaurants) {
                    this.restaurants = restaurants;
                    // Set Google Map markers
                    this.markers.restaurants = this.restaurants.slice(0,3).map(restaurant => ({
                        "lat": parseFloat(restaurant.lat),
                        "lng": parseFloat(restaurant.lng)
                    }))
                }
            });
            ActivitiesApi.getActivities(search.location.lat, search.location.lng).then(activities => {
                if (activities) {
                    this.activities = activities;
                    // Set Google Map markers
                    this.markers.activities = this.activities.slice(0, 3).map(activity => ({
                        "lat": parseFloat(activity.lat),
                        "lng": parseFloat(activity.lng)
                    }))
                }
            })
        },
        checkIsFavorite(item) {
            if (this.favorites.length) {
                return this.favorites.some((favorite) => favorite.ressourceId === item.id && favorite.type === item.type);
            }
            return false;
        },
        updateCurrentSearch(searchId) {
            const searchs = JSON.parse(localStorage.getItem('search'));
            const index = searchs.findIndex(search => search.id == searchId);
            this.currentSearch = searchs[index];
            this.loadRessources(this.currentSearch);
        }
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
                    max-width: 80%;
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

@media screen and (max-width: 960px) {
    .result {

        .results {
            width: 100%;    
        }

        .map {
            height: 70vh;
            width: 100%;
            padding-left: 0;
            margin-right: 0;
            margin-top: 100px;
            .vue-map {
                border-radius: 10px 10px 0 0;
            }
        }
    }
}
</style>
