<template>
    <div class="route">
        <ul>
            <li>
                <label>Grote Markt, 1000 Brussel, Belgique</label>
                <div class="details">
                    <span>22 april to 23 april</span>
                    <span>Budget : 200 - 250 €</span>
                    <div class="selection">
                        <img
                            alt="restaurant logo"
                            :src="restaurantIcon"
                        />
                        <img alt="bicycle logo" :src="this.activityIcon" />
                        <img alt="bed logo" :src="bedIcon" />
                    </div>
                </div>
            </li>
            <li>
                <label>Avenue des Champs Elysées, 75008 Paris</label>
                <div class="details">
                    <span>23 april to 25 april</span>
                    <span>Budget : 800 - 900 €</span>
                    <div class="selection">
                        <img
                            alt="restaurant logo"
                            :src="restaurantIcon"
                        />
                        <img alt="bicycle logo" :src="activityIcon" />
                    </div>
                </div>
            </li>
            <li>
                <label>Monplaisir, 69008 Lyon </label>
                <div class="details">
                    <span>25 april to 26 april</span>
                    <span>Budget : 100 - 150 €</span>
                    <div class="selection">
                        <img alt="bed logo" :src="bedIcon" />
                    </div>
                </div>
            </li>
        </ul>
        <a class="edit-route" href="">Edit this route</a>
    </div>
</template>

<script>
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
            bedIcon: vm.inMenu ? bedIconLight : bedIcon,
            restaurantIcon: vm.inMenu ? restaurantIconLight : restaurantIcon,
            activityIcon: vm.inMenu ? activityIconLight : activityIcon,
        })
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

