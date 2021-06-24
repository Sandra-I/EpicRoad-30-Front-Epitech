<template>
    <div class="contact">
        <h3>Contact</h3>
        <v-row>
            <v-col cols="12" xs="12" sm="12" md="6" lg="6">
                <div class="field">
                    <img src="../../assets/phone.svg" />
                    <span>{{ item.phone }}</span>
                </div>
                <a class="field" :href="item.website">{{ item.website }}</a>
            </v-col>
            <v-col cols="12" xs="12" sm="12" md="6" lg="6">
                <div class="field" v-if="item.social && item.social.instagram">
                    <img src="../../assets/instagram.svg" />
                    <span>{{ item.social.instagram }}</span>
                </div>
                <div class="field" v-if="item.social && item.social.twitter">
                    <img src="../../assets/twitter.svg" />
                    <span>{{ item.social.twitter }}</span>
                </div>
                <div class="field" v-if="item.social && item.social.facebook">
                    <img src="../../assets/facebook.svg" />
                    <span>{{ item.social.facebook }}</span>
                </div>
            </v-col>
        </v-row>
    </div>
</template>

<script>
export default {
    name: "Contact",
    props: ["item"],
};
</script>

<style lang="scss">
.contact {
    .field {
        display: flex;
        img {
            width: 25px;
            height: 25px;
            margin-right: 20px;
        }
    }
    .field {
        margin-bottom: 30px;
    }
}
</style>
