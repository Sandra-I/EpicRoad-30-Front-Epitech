<template>
    <v-row class="main-detail">
        <h2>{{ item.name }}</h2>
        <div class="subsection">
            <div class="note">
                <img src="../../assets/star.svg" />
                <img src="../../assets/star.svg" />
                <img src="../../assets/star.svg" />
                <img src="../../assets/star.svg" />
                <img src="../../assets/star.svg" />
                <span class="numeric">4.9/5</span>
            </div>
            <span class="price">Average price : {{ item.price }}</span>
        </div>
        <div class="subsection">
            <span>13 Rue Nungesser et Coli, 75016 Paris</span>
            <a :href="item.website">{{ item.website }}</a>
        </div>
        <div class="subsection phone">
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
        span, a {
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
