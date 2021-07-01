<template>
    <v-row class="image-preview">
        <v-col class="mainPhoto" cols="12" xs="12" sm="8" md="8" lg="8">
            <img :src="item.img[0]" />
        </v-col>
        <v-col class="optPhotos" cols="12" xs="12" sm="4" md="4" lg="4">
            <img :src="item.img[1]"/>
            <img :src="item.img[2]"/>
            <img :src="item.img[3]"/>
        </v-col>
    </v-row>
</template>

<script>
export default {
    name: "ImagePreview",
    props: ["item"],
};
</script>

<style lang="scss">
.image-preview {
    .mainPhoto {
        position: relative;
        display: block;
        margin: auto;
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
            border-radius: 2%;
        }
    }

    .optPhotos {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding: 0 !important;
        padding-left: 10px !important;
        img {
            border-radius: 5px;
            cursor: pointer;
        }
    }

    @media screen and (max-width: 600px) {
        .optPhotos {
            padding-left: 0 !important;
            img {
                margin-top: 20px;
            }
        }
    }
}
</style>
