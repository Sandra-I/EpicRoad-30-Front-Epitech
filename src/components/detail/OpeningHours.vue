<template>
    <div class="opening-hours">
        <h3>Opening Hours</h3>
        <div
            class="status"
            v-bind:class="{
                open: item.opening.isOpen,
                close: !item.opening.isOpen
            }"
        >
            <span>{{ getStatus() }}</span>
        </div>
        <ul class="opening">
            <li v-for="openingHours in item.opening.timeframes" :key="openingHours.days">
                <img src="../../assets/clock.svg"/>
                <span>{{ openingHours.days }} from {{ getHoursInterval(openingHours.open) }}</span>
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
                if (hours[0].renderedTime) {
                    return hours.map(hour => hour.renderedTime).join(" and ");
                }
                return hours.join(" and ");
            }
            return hours;
        },
        getStatus() {
            return (this.item.opening.isOpen) ? "Open" : "Closed";
        }
    }
};
</script>

<style lang="scss">
.opening-hours {
    .status {
        width: 110px;
        padding: 10px 0;
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
            background-color: #db524d;
            color: #ffffff;
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
