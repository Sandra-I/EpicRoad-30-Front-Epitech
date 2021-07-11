<template>
    <div class="route">
        <ul>
            <li v-for="route in routes" v-bind:key="route.id">
                <label>{{ route.location.formatted_address }}</label>
                <div class="details">
                    <div>
                        <span v-if="route.dateIn && route.dateOut"
                            >{{ formatDate(route.dateIn) }} to
                            {{ formatDate(route.dateOut) }}
                        </span>
                    </div>
                    <div>
                        <span v-if="route.budgetAmount"
                            >Budget : {{ route.budgetAmount }} €</span
                        >
                    </div>
                    <div class="selection">
                        <img alt="restaurant logo" :src="restaurantIcon" />
                        <img alt="bicycle logo" :src="activityIcon" />
                        <img alt="bed logo" :src="bedIcon" />
                    </div>
                </div>
            </li>
        </ul>
        <div class="d-flex justify-space-between align-end">
            <a class="edit-route" @click="$router.push('/')">Edit this route</a>
            <div class="transports">
                <div class="transport-details">
                    <div>
                        <img class="car" src="../assets/car.svg" /><label>{{
                            transports.driving
                        }}</label>
                    </div>
                    <div>
                        <img src="../assets/bicycle-dark.svg" /><label>{{
                            transports.bicycling
                        }}</label>
                    </div>
                    <div>
                        <img src="../assets/walking.svg" /><label>{{
                            transports.walking
                        }}</label>
                    </div>
                </div>
                <a
                    class="edit-route"
                    v-bind:href="googleThisRoute()"
                    target="_blank"
                    >See the complete route</a
                >
            </div>
        </div>
    </div>
</template>

<script>
import moment from "moment";
import bedIcon from "../assets/bed.svg";
import activityIcon from "../assets/bicycle.svg";
import restaurantIcon from "../assets/restaurant.svg";
import bedIconLight from "../assets/bed-light.svg";
import activityIconLight from "../assets/bicycle-light.svg";
import restaurantIconLight from "../assets/restaurant-light.svg";
import Transports from "@/api/transports";

export default {
    name: "LocationRoute",
    props: ["inMenu"],
    data: (vm) => ({
        routes: [],
        bedIcon: vm.inMenu ? bedIconLight : bedIcon,
        restaurantIcon: vm.inMenu ? restaurantIconLight : restaurantIcon,
        activityIcon: vm.inMenu ? activityIconLight : activityIcon,
        transports: {
            driving: "",
            bicycling: "",
            walking: ""
        }
    }),
    created: function () {
        this.routes = JSON.parse(localStorage.getItem("search"));
    },
    mounted() {
        const origin = {
            lat: this.routes[0].location.lat,
            lng: this.routes[0].location.lng,
        };
        const destination = {
            lat: this.routes[this.routes.length - 1].location.lat,
            lng: this.routes[this.routes.length - 1].location.lng,
        };
        const waypoints = this.routes
            .filter(
                (_route, index) => index != 0 && index != this.routes.length - 1
            )
            .map((route) => {
                return { lat: route.location.lat, lng: route.location.lng };
            });
        
        const modes = ["driving", "bicycling", "walking"];
        modes.forEach((mode) => {
            Transports.getTravelTimeDuration(
                origin,
                destination,
                waypoints,
                mode
            ).then((infos) => {
                const durationToHours = Math.floor(infos.duration / 60 / 60);
                const restInMinutes = (durationToHours > 0 ) ? parseInt((infos.duration % (durationToHours * 3600)) / 60) : parseInt(infos.duration / 60);
                this.transports[mode] = parseInt(infos.distance / 1000) + " km in ";
                this.transports[mode] += (durationToHours > 0) ? durationToHours + " h " : "",
                this.transports[mode] += restInMinutes + " min";
            });
        });
    },
    methods: {
        formatDate(date) {
            return moment(new Date(date)).format("D MMMM");
        },
        googleThisRoute() {
            try {
                const searchParamsArray = [];
                let url = `https://www.google.com/maps/dir/`;
                Object.values(this.routes).map((result) => {
                    const searchParams = {
                        street_number: result.location.street_number,
                        street: result.location.street,
                        zip_code: result.location.zip_code,
                        city: result.location.city,
                    };
                    searchParamsArray.push(Object.values(searchParams));
                });
                searchParamsArray.map((result) => {
                    url += `${result}/`;
                });
                return url;
            } catch (error) {
                console.error(error.message);
            }
        },
    },
};
</script>

<style lang="scss">
.route {
    ul {
        list-style-type: none;
        text-align: left;
        padding-left: 10px !important;
        position: relative;

        &:before {
            content: "";
            display: inline-block;
            position: absolute;
            left: 16px;
            top: 8px;
            height: calc(100% - 60px);
            border-left: dashed 3px var(--v-primary-base);
        }

        li {
            position: relative;
            padding-left: 40px;
            margin-bottom: 30px;
            font-weight: 600;
            font-size: 18px;
            &:before {
                content: "";
                display: inline-block;
                width: 15px;
                height: 15px;
                background: var(--v-primary-base);
                position: absolute;
                left: 0;
                top: 5px;
                border-radius: 15px;
            }

            label {
                font-weight: 400;
            }
        }

        .details {
            display: flex;
            justify-content: space-between;
            font-size: 16px;
            font-weight: normal;
            margin: 5px 0;

            .selection {
                width: 110px;
                justify-content: flex-start;
                img {
                    height: 20px;
                    margin-left: 15px;
                }
            }
        }
    }

    .edit-route {
        display: block;
        text-align: left;
        margin-top: 40px;
        padding-left: 50px;
    }

    .transports {
        margin-top: 50px;
        a {
            text-align: right;
        }
        .transport-details {
            display: flex;
            div {
                margin-left: 30px;
                display: flex;
                align-items: center;
            }
            img {
                height: 20px;
                margin-right: 10px;
                &.car {
                    height: 25px;
                }
            }
        }
    }
}
</style>

