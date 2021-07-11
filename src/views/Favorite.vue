<template>
    <div class="favorite">
        <h2>All your favorites</h2>
        <v-row class="favorites">
            <template v-if="hasFavorite">
                <v-col cols="12" xs="12" sm="12" md="12" lg="6" class="favorite" v-for="favorite in favorites" :key="favorite.id">
                    <ResultPreview :result="favorite" :route="'/detail/' + favorite.type + '/' + favorite.ressourceId" :isFavorite="true" @remove="removeFavorite(favorite)"/>
                </v-col>
            </template>
            <template v-else>
                <v-col cols="12" xs="12" sm="12" md="12" lg="6" class="favorite">
                    <p>No favorite yet!</p>
                </v-col>
            </template>
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
    name: "Favorite",
    components: {
        ResultPreview,
    },
    data: () => ({
        favorites: [],
        hasFavorite: false
    }),
    mounted() {
        Favorites.getFavorites().then((favorites) => {
            if (!Object.keys(favorites).length === 0) this.hasFavorite = true;
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
