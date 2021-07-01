<template>
    <div class="detail-trip">
        <h2>Detail for {{ trip.name }}</h2>
        <div class="destination" v-for="destination in trip.destinations" :key="destination.key">
            <div class="infos">
                <i class="bullet"/>
                <span class="address">{{ destination.address }}</span>
                <span class="date">{{ formatDate(destination.dateIn) }} to {{ formatDate(destination.dateOut) }}</span>
                <span class="budget">Budget : {{ destination.budgetStart }} - {{ destination.budgetEnd }} €</span>
                <img src="../assets/cancel-black.svg"/>
            </div>
            <v-row class="favorites">
                <span v-if="destination.favorites.length == 0">No favorites for this location.</span>
                <v-col cols="12" xs="12" sm="12" md="12" lg="6" class="favorite" v-for="favorite in destination.favorites" :key="favorite.key">
                    <ResultPreview :result="favorite" />
                </v-col>
            </v-row>
        </div>
    </div>
</template>

<script>
import moment from 'moment'
import ResultPreview from "@/components/ResultPreview.vue";

export default {
    name: "Trip",
    props: ["trip", "active"],
    components: {ResultPreview},
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
        },
        formatDate(date) {
            return moment(new Date(date)).format("D MMM");
        }
    }
};
</script>

<style lang="scss">
.detail-trip {
    h2 {
        margin-bottom: 50px;
    }
    .destination {
        .infos {
            display: flex;
            justify-content: space-between;
            align-items: baseline;
            width: 100%;
            margin-bottom: 50px;
            .bullet {
                width: 10px;
                height: 10px;
                background: #0D65D9;
                border-radius: 10px;
                margin-right: 20px;
            }
            .address, .date, .budget {
                flex: 1;
            }
            img {
                width: 12px;
                height: 12px;
                cursor: pointer;
            }
        }
        .favorites {
            margin-bottom: 80px;
            .favorite {
                &:nth-child(2n) {
                    padding-left: 3%;
                }
                &:nth-child(2n+1) {
                    padding-right: 3%;
                }
            }
        }
    }
}
</style>
