<template>
    <div class="mobile-menu">
        <v-row justify="space-between">
            <v-col cols="1" xs="1" sm="1" md="1" lg="1">
                <img
                    class="logo"
                    alt="epic road trip logo"
                    src="../assets/worldwide-light.svg"
                />
            </v-col>
            <v-col cols="1" xs="1" sm="1" md="1" lg="1">
                <v-btn icon large class="mobile" @click="hideMobileMenu()">
                    <img
                        class="close"
                        alt="close button"
                        src="../assets/cancel.svg"
                    />
                </v-btn>
            </v-col>
        </v-row>
        <LocationRoute :inMenu="true"/>
        <ul class="footer-mobile">
            <li v-if="!isLoggedIn" @click="redirectFooter('/login')">Login</li>
            <li v-if="!isLoggedIn" @click="redirectFooter('/signup')">Register</li>
            <li v-if="isLoggedIn" @click="redirectFooter('/favorites')">Favorites</li>
            <li v-if="isLoggedIn" @click="logout()">Logout</li>
        </ul>
    </div>
</template>

<script>
import LocationRoute from "@/components/LocationRoute.vue";

export default {
    name: "MobileMenu",
    props: {
        isLoggedIn: Boolean
    },
    components: {
        LocationRoute,
    },
    methods: {
        hideMobileMenu: function () {
            return this.$emit("onHiddenMobileMenu", true);
        },
        redirectFooter: function (page) {
            this.$router.push(page);
            this.hideMobileMenu();
        },
        logout: function () {
            this.$emit('logout');
            this.hideMobileMenu();
        }
    }
};
</script>

<style lang="scss">
.mobile-menu {
    background-color: var(--v-primary-base);
    padding: 20px 10vw;
    min-height: 100vh;
    color: #FFF;

    ul {
        list-style-type: none;
        text-align: left;

        &:before {
            border-left: dashed 2px #FFF;
        }

        li {
            font-size: 20px;
            &:before {
                background: #FFF;
            }

            label {
                font-weight: 600;
            }

            .route-container {
                &.active {
                    background-color: #4380cf;
                }
            }
        }
    }

    a {
        color: #FFF !important;
    }

    .logo {
        width: 40px;
        height: 40px;
    }

    .close {
        width: 20px;
        height: 20px;
    }

    .route {
        margin-top: 60px;
        margin-bottom: 230px !important;
    }

    .footer-mobile {
        position: absolute;
        border-top: 1px solid #FFF;
        padding-top: 30px;
        padding-left: 0 !important;
        bottom: 50px;
        width: 80vw;
        
        li {
            font-weight: normal;
            font-size: 18px;
            margin-top: 10px;
            cursor: pointer;
        }
    }
}
</style>

