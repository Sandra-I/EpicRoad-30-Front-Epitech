<template>
    <v-container fluid class="preview-homepage">
        <h2 class="text-left mb-8">{{ cardGroup.title }}</h2>
        <v-row>
            <v-col
                v-for="item in cardGroup.items"
                :key="item.id"
                class="mb-10"
                cols="6" xs="6" sm="6" md="6" lg="3"
            >
                <v-card @click="$router.push('/detail/'+item.type+'/'+item.id)">
                    <v-img
                        :src="item.img"
                        class="align-end"
                        gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                        height="200px"
                    >
                        <v-card-title
                            class="title"
                            v-text="item.name"
                        ></v-card-title>
                    </v-img>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
export default {
    name: "PreviewHomePage",
    props: {
        cardGroup: {
            type: Object,
        },
    },
};
</script>

<style lang="scss">
.preview-homepage {
    .title {
        color: #fff;
        font-weight: 600 !important;
        display: block;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        text-shadow: 0px 0px 10px #2e2e2e
    }
}
</style>