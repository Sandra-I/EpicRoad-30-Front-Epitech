<template>
    <v-app id="app">
        <Navbar />
        <router-view />
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
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    padding: 0 10vw;
    min-height: 100vh;
}

#nav {
    padding: 30px;

    a {
        font-weight: bold;
        color: #2c3e50;

        &.router-link-exact-active {
            color: #42b983;
        }
    }
}
</style>
