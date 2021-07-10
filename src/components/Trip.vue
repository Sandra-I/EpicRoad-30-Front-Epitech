<template>
    <div class="trip" v-bind:class="{ 'active': active }">
        <div class="header">
            <span class="name">{{ trip.name }}</span>
            <img class="cancel" src="../assets/cancel-black.svg"/>
        </div>
        <span class="infos">{{ getTripDetail(trip) }}</span>
        <a class="trip-link" :href="trip.resultLink">See all results for this trip</a>
    </div>
</template>

<script>
export default {
    name: "Trip",
    props: ["trip", "active"],
    methods: {
        getTripDetail(trip) {
            var buffer = ""
            const destinationsLength = trip.destinations.length;
            const favoritesLength = trip.destinations.reduce((acc, item) => acc + item.favorites.length, 0);
            if (destinationsLength > 0) {
                buffer += destinationsLength.toString();
                buffer += (destinationsLength > 1) ? " destinations": " destination"
                if (favoritesLength > 0) {
                    buffer += " with ";
                    buffer += favoritesLength.toString();
                    buffer += (favoritesLength > 1) ? " favorites": " favorite"
                }
            }
            return buffer;
        }
    }
};
</script>

<style lang="scss">
.trip {
    background-color: #f6f6f6;
    padding: 30px;
    margin: 30px 50px 30px 0;
    border-radius: 10px;
    min-width: 300px;
    cursor: pointer;
    &.active {
        background-color: #dedede;
    }
    span, a {
        display: block;
    }
    .header, .infos {
        margin-bottom: 20px;
    }
    .header {
        display: flex;
        justify-content: space-between;
        .name {
            font-weight: bold;
            text-transform: uppercase;
        }
        .cancel {
            cursor: pointer;
        }
        img {
            width: 12px;
            height: 12px;
        }
    }
}
</style>
