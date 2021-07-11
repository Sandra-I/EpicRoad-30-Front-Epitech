<template>
    <div class="favorite">
        <h2>All your favorites</h2>
        <v-row class="favorites" v-if="favorites.length">
            <ResultPreview :result="favorite" v-for="favorite in favorites" :key="favorite.id" :route="'/detail/' + favorite.type + '/' + favorite.ressourceId" :isFavorite="true" :isLoggedIn="isLoggedIn" @remove="removeFavorite(favorite)"/>
        </v-row>
        <span v-else>No favorites to display.</span>
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
    props: {
        isLoggedIn: Boolean
    },
    components: {
        ResultPreview,
    },
    data: () => ({
        favorites: [],
        hasFavorite: false
    }),
    mounted() {
        Favorites.getFavorites().then((favorites) => {
            if (Object.keys(favorites).length != 0) this.hasFavorite = true;
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
}

@media screen and (min-width: 960px) {
    .favorite {
        .favorites {
            .result-preview {
                max-width: 50%;
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
