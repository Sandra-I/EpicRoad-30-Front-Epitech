<template>
    <div class="map-container">
        <GmapMap
            :center="center"
            :zoom="14"
            :options="{
                disableDefaultUI: true,
            }"
            style="width: 100%; height: 100%"
        >
            <GmapMarker
                :key="index"
                v-for="(m, index) in markers.accomodations"
                :position="m"
                :clickable="true"
                :draggable="true"
                @click="center = m"
                :icon="bedIcon"
            />
            <GmapMarker
                :key="index"
                v-for="(m, index) in markers.restaurants"
                :position="m"
                :clickable="true"
                :draggable="true"
                @click="center = m"
                :icon="activityIcon"
            />
            <GmapMarker
                :key="index"
                v-for="(m, index) in markers.activities"
                :position="m"
                :clickable="true"
                :draggable="true"
                @click="center = m"
                :icon="restaurantIcon"
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
    data() {
        return {
            center: { lat: 48.854, lng: 2.347 },
            markers: {
                accomodations: [
                    { lat: 48.8686, lng: 2.3056 },
                    { lat: 48.8704, lng: 2.2990 },
                    { lat: 48.8680, lng: 2.3267 },
                ],
                restaurants: [
                    { lat: 48.8421, lng: 2.3198 },
                    { lat: 48.8716, lng: 2.3126 },
                    { lat: 48.8609, lng: 2.3523 },
                ],
                activities: [
                    { lat: 48.8598, lng: 2.3386 },
                    { lat: 48.8519, lng: 2.2822 },
                    { lat: 48.8556, lng: 2.2964 },
                ],
            },
            bedIcon: bedIcon,
            activityIcon: activityIcon,
            restaurantIcon: restaurantIcon
        };
    },
};
</script>

<style lang="scss">
.map-container {
    height: 100%;
}
</style>