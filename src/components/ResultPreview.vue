<template>
    <div class="result-preview" @click="getDetailRoute()">
        <div class="square">
            <img v-if="!result.img" alt="accomodation 1" :src="imgPlaceholder" />
            <img v-if="result.img" alt="accomodation 1" :src="result.img" />
        </div>
        <div class="details">
            <img class="favorite-icon" :src="icon" @click="manageFavorite(result.type, result.id, $event)">
            <label class="name">{{ result.name }}</label>
            <span v-if="result.address">{{ result.address }}</span>
            <span v-if="result.description" class="description">{{ result.description }}</span>
            <div class="price">
                <span v-if="result.price_detail">{{ result.price_detail }}</span>
                <span v-if="result.total" class="total">Price : Starting at {{ result.total }} €</span>
            </div>
        </div>
    </div>
</template>

<script>
import Favorites from "@/api/favorites"

export default {
    name: "ResultPreview",
    props: ["result", "route", "isFavorite"],
    data: (vm) => ({
        icon: "",
        favoriteIcon: require('../assets/heart.svg'),
        isFavoriteIcon: require('../assets/heart-full.svg'),
        imgPlaceholder: require('../assets/img_placeholder.jpg'),
        favoriteStatus: vm.isFavorite

    }),
    mounted () {
        this.icon = this.favoriteStatus ? this.isFavoriteIcon : this.favoriteIcon;
    },
    methods: {
        getDetailRoute () {
            return this.route ? this.$router.push(this.route) : "";
        },
        manageFavorite (type, id, e) {
            e.stopPropagation();
            if (!this.favoriteStatus) {
                Favorites.addFavorite(type, id).then(() => {
                    this.icon = this.isFavoriteIcon;
                    this.favoriteStatus = true;
                });
            } else {
                Favorites.removeFavorite(id).then(() => {
                    this.icon = this.favoriteIcon;
                    this.favoriteStatus = false;
                });
                this.icon = this.favoriteIcon;
                this.$emit("remove");
            }
        },
    }
};
</script>

<style lang="scss">
.result-preview {
    display: flex;
    text-align: left;
    margin-bottom: 50px;
    .square {
        position: relative;
        display: block;
        margin: auto;
        width: 25%;
        &::before {
            content: "";
            padding-top: 100%;
            display: block;
        }
        img {
            position: absolute;
            width: 100%;
            height: 100%;
            object-fit: cover;
            top: 0;
            left: 0;
            bottom: 0;
            margin: auto;
            border-radius: 5%;
        }
    }
    .details {
        display: flex;
        flex-direction: column;
        flex-grow: 2;
        padding: 10px 0 10px 5%;
        justify-content: space-between;
        width: 75%;
        position: relative;
        label {
            font-weight: bold;
            font-size: 1.2rem;
        }
        .name {
            padding-right: 20px;
            text-transform: uppercase;
        }
        .favorite-icon {
            width: 20px;
            height: 20px;
            position: absolute;
            right: 0;
            cursor: pointer;
        }
        .description {
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2; /* number of lines to show */
            -webkit-box-orient: vertical;
        }
        .price {
            display: flex;
            justify-content: space-between;
            .total {
                font-weight: bold;
            }
        }
    }
}
</style>
