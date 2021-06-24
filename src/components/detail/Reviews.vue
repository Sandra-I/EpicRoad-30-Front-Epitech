<template>
    <div class="reviews">
        <h3>Reviews</h3>
        <v-row v-for="review in item.reviews" :key="review.key" class="review">
            <v-col cols="12" xs="12" sm="2" md="2" lg="2" class="review-profile">
                <img class="pp" v-if="review.profile.img" :src="review.profile.img"/>
                <span class="name">{{ review.profile.name }}</span>
                <span class="note">Note: {{ review.note }}</span>
            </v-col>
            <v-col cols="12" xs="12" sm="10" md="10" lg="10" class="review-content">
                <div class="review-header">
                    <strong>{{ review.title }}</strong>
                    <span>{{ review.date }}</span>
                </div>
                <p v-html="review.content">{{ review.content}}</p>
            </v-col>
        </v-row>
        <a href="">Load more reviews</a>
    </div>
</template>

<script>
export default {
    name: "Reviews",
    props: ["item"],
};
</script>

<style lang="scss">
.reviews {
    h3 {
        margin-bottom: 80px !important;
    }
    .review {
        &:not(:last-child){
            padding-bottom: 80px;
        }
        .review-profile {
            display: flex;
            flex-direction: column;
            align-items: center;
            .pp {
                width: 35%;
                margin-bottom: 20px;
            }
            .note {
                font-weight: bold;
                text-align: center;
            }
        }
        .review-header {
            display: flex;
            justify-content: space-between;
            margin-bottom: 20px;
        }
    }
    a {
        display: block;
        text-align: center;
    }
}
</style>
