<template>
    <div class="favorite">
        <h2>More Results</h2>
        <v-row class="favorites">
            <v-col cols="12" xs="12" sm="12" md="6" lg="6" class="favorite" v-for="result in moreResults" :key="result.id">
                <ResultPreview :result="result" :route="'/detail/' + result.type + '/' + result.ressourceId" :isFavorite="true" @remove="removeFavorite(favorite)"/>
            </v-col>
        </v-row>
    </div>
</template>

<script>
import ResultPreview from "@/components/ResultPreview.vue";
import AccomodationsApi from "@/api/accomodations";
import RestaurantsApi from "@/api/restaurants";
import ActivitiesApi from "@/api/activities";
import Favorites from "@/api/favorites";

export default {
    name: "MoreResults",
    components: {
        ResultPreview,
    },
    data: () => ({
        moreResults: []
    }),
    mounted() {
        this.moreResults = this.$route.query.moreResults;
        Favorites.getFavorites().then((favorites) => {
            favorites.forEach((favorite) => {
                switch (favorite.type) {
                    case "accomodation":
                        AccomodationsApi.getAccomodationById(favorite.ressourceId).then((accomodation) => {
                            this.favorites.push(accomodation);
                        });
                        break;
                    case "eat":
                        RestaurantsApi.getEatById(favorite.ressourceId).then((restaurant) => {
                            this.favorites.push(restaurant);
                        });
                        break;
                    case "drink":
                        RestaurantsApi.getDrinkById(favorite.ressourceId).then((restaurant) => {
                            this.favorites.push(restaurant);
                        });
                        break;
                    case "activity":
                        ActivitiesApi.getActivityById(favorite.ressourceId).then((activity) => {
                            this.favorites.push(activity);
                        });
                        break;
                }
            });
        });
    },
    methods: {
        removeFavorite(item) {
            this.favorites = this.favorites.filter(favorite => favorite.id !== item.id);
        }
    }
};
</script>

<style lang="scss">
.favorite {
    h2 {
        margin-bottom: 50px;
    }
    .trips {
        display: flex;
        margin-bottom: 50px;
    }
    .detail-trips {
        .detail {
            margin-bottom: 100px;
        }
    }
}
</style>
