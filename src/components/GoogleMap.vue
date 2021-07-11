<template>
    <div class="map-container">
        <GmapMap
            :center="center"
            :zoom="13"
            :options="options"
            style="width: 100%; height: 100%"
        >
            <GmapMarker
                v-for="(m, index) in markers.accomodations"
                :key="'accomodation'+index"
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
            <GmapMarker
                v-if="markers.single"
                :position="markers.single"
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
    props: ["markers","center","mapStyleId"],
    data: () => ({
        bedIcon: bedIcon,
        activityIcon: activityIcon,
        restaurantIcon: restaurantIcon,
        options: {
            disableDefaultUI: true
        }
    }),
    mounted() {
        if (this.mapStyleId) {
            this.options.mapId = this.mapStyleId
        }
    }
};
</script>

<style lang="scss">
.map-container {
    height: 100%;
}
</style>