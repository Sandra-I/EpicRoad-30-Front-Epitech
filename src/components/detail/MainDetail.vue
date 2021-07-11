<template>
    <v-row class="main-detail">
        <h2>{{ item.name }}</h2>
        <div class="subsection">
            <div v-if="item.rating && parseFloat(item.rating) > 0" class="note">
                <img v-if="item.rating > 0" src="../../assets/star.svg" />
                <img v-else src="../../assets/star-empty.svg" />
                <img v-if="item.rating > 1" src="../../assets/star.svg" />
                <img v-else src="../../assets/star-empty.svg" />
                <img v-if="item.rating > 2" src="../../assets/star.svg" />
                <img v-else src="../../assets/star-empty.svg" />
                <img v-if="item.rating > 3" src="../../assets/star.svg" />
                <img v-else src="../../assets/star-empty.svg" />
                <img v-if="item.rating > 4" src="../../assets/star.svg" />
                <img v-else src="../../assets/star-empty.svg" />
                <span class="numeric">{{ item.rating }}</span>
            </div>
            <span v-if="isNaN(item.total)" class="price">Average Price : {{ item.total }}</span>
            <span v-else class="price">Price : Starting at {{ item.total }} €</span>
        </div>
        <div class="subsection" v-if="item.address || item.website">
            <span>{{ item.address }}</span>
            <label>Website : </label><a :href="item.website">{{ item.website }}</a>
        </div>
        <div class="subsection phone" v-if="item.phone">
            <img src="../../assets/phone.svg" />
            <span>{{ item.phone }}</span>
        </div>
    </v-row>
</template>

<script>
export default {
    name: "MainDetail",
    props: ["item"],
};
</script>

<style lang="scss">
.main-detail {
    h2 {
        font-size: 2.2rem;
        width: 100%;
        margin-bottom: 40px;
    }
    .subsection {
        width: 100%;
        margin-bottom: 40px;
        img {
            width: 20px;
            margin-right: 5px;
        }
        span {
            display: block;
            margin-bottom: 20px;
            &.phone,
            &.numeric {
                display: inline-block;
                margin-left: 10px;
            }
        }
    }
    .note {
        display: flex;
        align-items: baseline;
    }
    .phone {
        display: flex;
        img {
            margin-right: 15px;
        }
        span {
            margin-bottom: 0;
        }
    }
}
</style>
