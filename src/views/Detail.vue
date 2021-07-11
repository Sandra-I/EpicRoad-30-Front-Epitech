<template>
    <div class="detail">
        <v-row>
            <v-col
                class="left section margin-bottom"
                cols="12"
                xs="12"
                sm="12"
                md="6"
                lg="6"
            >
                <ImagePreview :item="item" />
            </v-col>
            <v-col
                class="right section margin-bottom"
                cols="12"
                xs="12"
                sm="12"
                md="6"
                lg="6"
            >
                <MainDetail :item="item" />
            </v-col>
        </v-row>
        <v-row>
            <v-col
                v-if="
                    !(item.opening || item.status) &&
                    !(item.social || item.phone)
                "
                class="left section"
                cols="12"
                xs="12"
                sm="12"
                md="12"
                lg="12"
            >
                <Description
                    v-if="item.description"
                    :item="item"
                    class="sub-section"
                />
                <Attributes
                    v-if="item.attributes"
                    :item="item"
                    class="sub-section"
                />
            </v-col>
            <v-col
                v-else
                class="left section"
                cols="12"
                xs="12"
                sm="12"
                md="6"
                lg="6"
            >
                <Description
                    v-if="item.description"
                    :item="item"
                    class="sub-section"
                />
                <Attributes
                    v-if="item.attributes"
                    :item="item"
                    class="sub-section"
                />
            </v-col>
            <v-col
                v-if="item.status || item.opening || item.social || item.phone"
                class="right section"
                cols="12"
                xs="12"
                sm="12"
                md="6"
                lg="6"
            >
                <OpeningHours
                    v-if="item.status || item.opening"
                    :item="item"
                    class="sub-section"
                />
                <Contact
                    v-if="item.social || item.phone"
                    :item="item"
                    class="sub-section"
                />
            </v-col>
        </v-row>
        <v-row v-if="item.reviews">
            <Reviews :item="item" />
        </v-row>
    </div>
</template>

<script>
import ImagePreview from "@/components/detail/ImagePreview.vue";
import MainDetail from "@/components/detail/MainDetail.vue";
import Description from "@/components/detail/Description.vue";
import OpeningHours from "@/components/detail/OpeningHours.vue";
import Attributes from "@/components/detail/Attributes.vue";
import Contact from "@/components/detail/Contact.vue";
import Reviews from "@/components/detail/Reviews.vue";
import accomodationsApi from "@/api/accomodations";
import restaurantsApi from "@/api/restaurants";
import activitiesApi from "@/api/activities";

import photo1 from "../assets/molitor.png";
import photo2 from "../assets/molitor-2.jpg";
import photo3 from "../assets/molitor-3.jpg";
import photo4 from "../assets/molitor-4.jpg";
import profile from "../assets/review-profile.svg";

export default {
    name: "Detail",
    components: {
        ImagePreview,
        MainDetail,
        Description,
        OpeningHours,
        Attributes,
        Contact,
        Reviews,
    },
    data: () => ({
        item: {
            name: "Hôtel Molitor Paris",
            price: "€€€€",
            website: "https://www.mltr.fr",
            phone: "01 56 07 08 50",
            img: [photo1, photo2, photo3, photo4],
            description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent dignissim bibendum eros, nec finibus augue eleifend feugiat. In malesuada eleifend elementum. Fusce laoreet, diam sit amet rhoncus commodo, risus ipsum pellentesque massa, vitae lacinia lectus dolor et ante. Integer feugiat mauris sit amet tempus maximus. ",
            status: "open",
            opening: [
                {
                    days: "Monday - Friday",
                    hours: ["10:30 AM - 2:30 PM", "6:00 PM - 11h30 PM"],
                },
                {
                    days: "Saturday - Sunday",
                    hours: "10:30 AM - 11:30 PM",
                },
            ],
            attributes: [
                "attribute1",
                "attribute2",
                "attribute3",
                "attribute4",
                "attribute5",
                "attribute6",
                "attribute7",
            ],
            social: {
                instagram: "@molitor_paris",
                facebook: "hotle_molitor_paris",
                twitter: "@molitor_paris",
            },
            reviews: [
                {
                    profile: {
                        img: profile,
                        name: "Paul",
                    },
                    title: "Very good place !",
                    content:
                        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent dignissim bibendum eros, nec finibus augue eleifend feugiat. In malesuada eleife.",
                    date: "2021-06-12",
                    note: "Excellent",
                },
                {
                    profile: {
                        img: profile,
                        name: "Karine",
                    },
                    title: "Brillant.",
                    content:
                        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent dignissim bibendum eros, nec finibus augue eleifend feugiat. In malesuada eleife.",
                    date: "2021-03-08",
                    note: "Excellent",
                },
                {
                    profile: {
                        img: profile,
                        name: "Carla",
                    },
                    title: "Beautiful place.",
                    content:
                        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent dignissim bibendum eros, nec finibus augue eleifend feugiat. In malesuada eleife. Integer feugiat mauris sit amet tempus maximus.<br><br>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent dignissim bibendum eros, nec finibus augue eleifend feugiat. In malesuada eleife. Integer feugiat mauris sit amet tempus maximus.",
                    date: "2021-03-01",
                    note: "Excellent",
                },
                {
                    profile: {
                        img: profile,
                        name: "Baptiste",
                    },
                    title: "Very good service.",
                    content:
                        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent dignissim bibendum eros, nec finibus augue eleifend feugiat. In malesuada eleife. Integer feugiat mauris sit amet tempus maximus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent dignissim bibendum eros, nec finibus augue eleifend feugiat. In malesuada eleife. Integer feugiat mauris sit amet tempus maximus.",
                    date: "2021-02-04",
                    note: "Excellent",
                },
            ],
        },
    }),
    mounted() {
        if (this.$route.params.type && this.$route.params.id) {
            const type = this.$route.params.type;
            const item_id = this.$route.params.id;
            switch (type) {
                case "accomodation":
                    accomodationsApi
                        .getAccomodationById(item_id)
                        .then((accomodation) => {
                            this.item = accomodation;
                        });
                    break;
                case "eat":
                    restaurantsApi
                        .getEatById(item_id)
                        .then((restaurant) => {
                            this.item = restaurant;
                        })
                        .catch((e) => {
                            console.log(e);
                        });
                    break;
                case "drink":
                    restaurantsApi.getDrinkById(item_id).then((restaurant) => {
                        this.item = restaurant;
                    });
                    break;
                case "activity":
                    activitiesApi.getActivityById(item_id).then((activity) => {
                        this.item = activity;
                    });
                    break;
            }
        }
    },
};
</script>

<style lang="scss">
.detail {
    .section {
        &.margin-bottom {
            margin-bottom: 100px;
        }
        &.left {
            padding-right: 5% !important;
        }
        &.right {
            padding-left: 5% !important;
        }
        .sub-section {
            margin-bottom: 80px;
        }
    }
}
</style>
