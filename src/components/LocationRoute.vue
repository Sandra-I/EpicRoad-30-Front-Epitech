<template>
    <div class="route">
        <ul>
            <li v-for="route in routes" v-bind:key="route.id">
                <label>{{ route.location.formatted_address }}</label>
                <div class="details">
                    <div>
                        <span v-if="route.dateIn && route.dateOut">{{ formatDate(route.dateIn) }} to {{ formatDate(route.dateOut) }} </span>
                    </div>
                    <div>
                        <span v-if="route.budgetAmount">Budget : {{ route.budgetAmount }} €</span>
                    </div>
                    <div class="selection">
                        <img alt="restaurant logo" :src="restaurantIcon" />
                        <img alt="bicycle logo" :src="activityIcon" />
                        <img alt="bed logo" :src="bedIcon" />
                    </div>
                </div>
            </li>
        </ul>
        <a class="edit-route" @click="$router.push('/')">Edit this route</a>
    </div>
</template>

<script>
import moment from 'moment'
import bedIcon from "../assets/bed.svg";
import activityIcon from "../assets/bicycle.svg";
import restaurantIcon from "../assets/restaurant.svg";
import bedIconLight from "../assets/bed-light.svg";
import activityIconLight from "../assets/bicycle-light.svg";
import restaurantIconLight from "../assets/restaurant-light.svg";

export default {
    name: "LocationRoute",
    props: ["inMenu"],
    data: (vm) => ({
        routes: [],
        bedIcon: vm.inMenu ? bedIconLight : bedIcon,
        restaurantIcon: vm.inMenu ? restaurantIconLight : restaurantIcon,
        activityIcon: vm.inMenu ? activityIconLight : activityIcon,
    }),
    created: function () {
        this.routes = JSON.parse(localStorage.getItem('search'));
    },
    methods: {
        formatDate (date) {
            return moment(new Date(date)).format("D MMMM")
        }
    }
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
}
</style>

