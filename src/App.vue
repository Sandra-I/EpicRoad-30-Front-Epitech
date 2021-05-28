<template>
    <v-app id="app">
        <Navbar />
        <div class="content gutter">
            <router-view />
        </div>
        <Footer />
    </v-app>
</template>

<script>
import Navbar from "./components/Navbar.vue";
import Footer from "./components/Footer.vue";

export default {
    components: { Navbar, Footer },
};
</script>

<style lang="scss">
@font-face {
    font-family: "Viga";
    src: url(./assets/fonts/Viga-Regular.ttf) format("truetype");
}

#app {
    font-family: Roboto, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    min-height: 100vh;

    .content {
        padding-top: 70px;
        padding-bottom: 350px;
    }

    .gutter {
        padding-left: 10vw;
        padding-right: 10vw;
    }
}

</style>
