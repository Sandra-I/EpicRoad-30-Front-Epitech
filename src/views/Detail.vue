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
                <ImagePreview v-if="item.img && item.img.length" :item="item" />
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
                v-if="item.opening || item.social || item.phone"
                class="right section"
                cols="12"
                xs="12"
                sm="12"
                md="6"
                lg="6"
            >
                <OpeningHours
                    v-if="item.opening"
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
        <div class="map">
            <GoogleMap :markers="markers" :center="centerGoogleMap" :mapStyleId="mapStyleId"/>
        </div>
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
import GoogleMap from '@/components/GoogleMap.vue';

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
        GoogleMap
    },
    data: () => ({
        item: [],
        markers: [],
        centerGoogleMap: { lat: 48.854, lng: 2.347 },
        mapStyleId: "aec396dc89a6c7f1"
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
                            this.loadGoogleMap();

                        });
                    break;
                case "eat":
                    restaurantsApi
                        .getEatById(item_id)
                        .then((restaurant) => {
                            this.item = restaurant;
                            this.loadGoogleMap();
                        })
                        .catch((e) => {
                            console.log(e);
                        });
                    break;
                case "drink":
                    restaurantsApi.getDrinkById(item_id).then((restaurant) => {
                        this.item = restaurant;
                        this.loadGoogleMap();
                    });
                    break;
                case "activity":
                    activitiesApi.getActivityById(item_id).then((activity) => {
                        this.item = activity;
                        this.loadGoogleMap();
                    });
                    break;
            }
        }
    },
    methods: {
        loadGoogleMap() {
            this.markers["single"] = { lat: this.item.lat, lng: this.item.lng };
            this.centerGoogleMap = { lat: this.item.lat, lng: this.item.lng };
        }
    }
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

    .map {
        height: 70vh;
        .vue-map {
            border-radius: 20px 0 0 0;
        }
    }
}
</style>
