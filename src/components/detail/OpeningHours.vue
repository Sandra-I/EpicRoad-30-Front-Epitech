<template>
    <div class="opening-hours">
        <h3>Opening Hours</h3>
        <div
            class="status"
            v-bind:class="{
                open: item.status == 'open',
                close: item.status == 'close',
            }"
        >
            <span>{{ item.status }}</span>
        </div>
        <ul class="opening">
            <li v-for="openingHour in item.opening" :key="openingHour.days">
                <img src="../../assets/clock.svg"/>
                <span>{{ openingHour.days }} from {{ getHoursInterval(openingHour.hours) }}</span>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: "Description",
    props: ["item"],
    methods: {
        getHoursInterval(hours) {
            if (Array.isArray(hours)) {
                return hours.join(" and ")
            }
            return hours;
        }
    }
};
</script>

<style lang="scss">
.opening-hours {
    .status {
        width: 100px;
        padding: 10px 20px;
        text-align: center;
        text-transform: uppercase;
        font-weight: bold;
        border-radius: 5px;
        margin-bottom: 50px;
        &.open {
            background-color: #a2e7c7;
            color: #04bf68;
        }
        &.close {
            padding-left: 5% !important;
        }
    }
    .opening {
        list-style-type: none;
        padding-left: 0 !important;
        li {
            display: flex;
            margin: 30px 0;
            img {
                width: 25px;
                height: 25px;
                margin-right: 20px;
            }
        }
    }
}
</style>
