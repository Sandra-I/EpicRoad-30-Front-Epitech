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
    props: ["markers","center"],
    data() {
        return {
            bedIcon: bedIcon,
            activityIcon: activityIcon,
            restaurantIcon: restaurantIcon
        };
    }
};
</script>

<style lang="scss">
.map-container {
    height: 100%;
}
</style>