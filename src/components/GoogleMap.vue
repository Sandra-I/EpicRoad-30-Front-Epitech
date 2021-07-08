<template>
    <div class="map-container">
        <GmapMap
            :center="center"
            :zoom="13"
            :options="{
                disableDefaultUI: true,
            }"
            style="width: 100%; height: 100%"
        >
            <GmapMarker
                :key="'accomodation'+index"
                v-for="(m, index) in markers.accomodations"
                :position="m"
                :icon="bedIcon"
            />
            <GmapMarker
                :key="'restaurant'+index"
                v-for="(m, index) in markers.restaurants"
                :position="m"
                :icon="restaurantIcon"
            />
            <GmapMarker
                :key="'ativity'+index"
                v-for="(m, index) in markers.activities"
                :position="m"
                :icon="activityIcon"
            />
        </GmapMap>
    </div>
</template>

<script>
import bedIcon from "../assets/bed-map.png";
import activityIcon from "../assets/activity-map.png";
import restaurantIcon from "../assets/restaurant-map.png";

export default {
    name: "GoogleMap",
    props: ["markers"],
    data() {
        return {
            center: { lat: 48.854, lng: 2.347 },
            bedIcon: bedIcon,
            activityIcon: activityIcon,
            restaurantIcon: restaurantIcon
        };
    },
    watch: {
        markers: {
            handler(value) {
                if (value.restaurants[0] && value.restaurants[0].lat && value.restaurants[0].lng) {
                    this.center = { lat: value.restaurants[0].lat, lng: value.restaurants[0].lng};
                }
            },
            deep: true
        }
    }
};
</script>

<style lang="scss">
.map-container {
    height: 100%;
}
</style>