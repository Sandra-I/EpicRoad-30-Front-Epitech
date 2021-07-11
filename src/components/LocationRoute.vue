<template>
    <div v-if="routes.length" class="route">
        <ul>
            <li v-for="route in routes" v-bind:key="route.id">
                <div class="route-container" v-bind:class="{active: currentSearch && route.id == currentSearch.id}" @click="updateCurrentSearch(route.id)">
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
                    </div>
                </div>
            </li>
        </ul>
        <v-row  class="d-flex justify-space-between align-end">
            <v-col cols="12" xs="12" sm="12" md="4" lg="4" v-if="!inMenu">
                <a class="link-route" @click="$router.push('/')">Edit this route</a>
            </v-col>
            <v-col cols="12" xs="12" sm="12" md="8" lg="8" class="transports" v-if="routes.length > 1">
                <div class="transport-details">
                    <div>
                        <img class="car" :src="carIcon" /><label>{{
                            transports.driving
                        }}</label>
                    </div>
                    <div>
                        <img :src="bicycleIcon" /><label>{{
                            transports.bicycling
                        }}</label>
                    </div>
                    <div>
                        <img :src="walkingIcon" /><label>{{
                            transports.walking
                        }}</label>
                    </div>
                </div>
                <a
                    class="link-route"
                    v-bind:href="googleThisRoute()"
                    target="_blank">
                    See the complete route
                </a>
            </v-col>
        </v-row>
    </div>
</template>

<script>
import moment from "moment";
import carIcon from "../assets/car.svg";
import bicycleIcon from "../assets/bicycle-dark.svg";
import walkingIcon from "../assets/walking.svg";
import carIconLight from "../assets/car-light.svg";
import bicycleIconLight from "../assets/bicycle-light.svg";
import walkingIconLight from "../assets/walking-light.svg";
import Transports from "@/api/transports";

export default {
    name: "LocationRoute",
    props: ["inMenu", "currentSearch"],
    data: (vm) => ({
        routes: [],
        carIcon: vm.inMenu ? carIconLight : carIcon,
        walkingIcon: vm.inMenu ? walkingIconLight : walkingIcon,
        bicycleIcon: vm.inMenu ? bicycleIconLight : bicycleIcon,
        transports: {
            driving: "",
            bicycling: "",
            walking: ""
        }
    }),
    created: function () {
        const serches = JSON.parse(localStorage.getItem("search"))
        this.routes = serches ? serches : [];
    },
    mounted() {
        if (this.routes.length) {
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
        }
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
        updateCurrentSearch(routeId) {
            this.$emit("update-current-search", routeId);
        }
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
            top: 25px;
            height: calc(100% - 90px);
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
                top: 25px;
                border-radius: 15px;
            }

            label {
                font-weight: 400;
            }

            .route-container {
                cursor: pointer;
                padding: 20px 30px;
                &.active {
                    border-radius: 20px;
                    background-color: #e6e6e6;
                }
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

    .link-route {
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
            justify-content: flex-end;
            div {
                margin-left: 30px;
                display: flex;
                align-items: right;
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

