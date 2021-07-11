<template>
    <v-app id="app">
        <div v-if="hideMobileMenu">
            <Navbar @onHiddenMobileMenu="onHiddenMobileMenu" :isLoggedIn="isLoggedIn" @logout="logout"/>
            <div class="content gutter">
                <router-view @loggedIn="checkIsLoggedIn" :isLoggedIn="isLoggedIn"/>
            </div>
            <Footer :isLoggedIn="isLoggedIn"/>
        </div>
        <MobileMenu v-if="!hideMobileMenu" @onHiddenMobileMenu="onHiddenMobileMenu" :isLoggedIn="isLoggedIn" @logout="logout"/>
    </v-app>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";
import MobileMenu from '@/components/MobileMenu.vue';
import Account from '@/api/account.js';

export default {
    data: () => ({
        hideMobileMenu: true,
        isLoggedIn: false
    }),
    components: { Navbar, Footer, MobileMenu },
    methods: {
        onHiddenMobileMenu (hide) {
            this.hideMobileMenu = hide;
        },
        checkIsLoggedIn () {
            if (localStorage.getItem('jwt')) {
                return this.isLoggedIn = true;
            }
        },
        logout () {
            Account.postLogout({
            }).then(() => {
                this.isLoggedIn = false;
                this.$router.push('/');
            }).catch(error => {
                this.error = error.error;
            });
        }
    },
    mounted () {
        this.checkIsLoggedIn();
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
    color: #2c3e50;
    min-height: 100vh;

    h2 {
        text-align: left;
    }

    h3 {
        font-size: 1.5rem;
        width: 100%;
        margin-bottom: 40px;
    }

    .content {
        padding-top: 20px;
        padding-bottom: 350px;
    }

    .gutter {
        padding-left: 10vw;
        padding-right: 10vw;
    }

    .white {
        color: #ffffff;
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
