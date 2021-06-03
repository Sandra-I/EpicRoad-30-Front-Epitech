<template>
    <v-app id="app">
        <div v-if="hideMobileMenu">
            <Navbar @onHiddenMobileMenu="onHiddenMobileMenu"/>
            <div class="content gutter">
                <router-view />
            </div>
            <Footer />
        </div>
        <MobileMenu v-if="!hideMobileMenu" @onHiddenMobileMenu="onHiddenMobileMenu"/>
    </v-app>
</template>

<script>
import Navbar from "./components/Navbar.vue";
import Footer from "./components/Footer.vue";
import MobileMenu from '@/components/MobileMenu.vue'

export default {
    data: () => ({
        hideMobileMenu: true
    }),
    components: { Navbar, Footer, MobileMenu },
    methods: {
        onHiddenMobileMenu (hide) {
            this.hideMobileMenu = hide;
        }
    }
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

    h2 {
        text-align: left;
    }

    .content {
        padding-top: 20px;
        padding-bottom: 350px;
    }

    .gutter {
        padding-left: 10vw;
        padding-right: 10vw;
    }
}

@media screen and (max-width: 960px) {
    #app {
        .content {
            padding-bottom: 150px;
        }
    }
}
</style>
