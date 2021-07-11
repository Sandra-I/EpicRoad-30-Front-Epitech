<template>
    <v-app-bar flat color="white" class="navbar gutter">
        <v-row justify="space-between" align="center">
            <v-col cols="1" xs="1" sm="1" md="1" lg="1">
                <img
                    class="logo"
                    alt="epic road trip logo"
                    src="../assets/worldwide.svg"
                    @click="$router.push('/')"
                />
            </v-col>
        
            <v-col cols="4" xs="4" sm="4" md="3" lg="3" class="user-section">
                <v-row align="center" justify="end">
                    <template v-if="isLoggedIn">
                        <v-btn icon large @click="$router.push('favorites')">
                            <img src="../assets/heart.svg" />
                        </v-btn>
                    </template>
                    <v-btn icon large class="mobile" @click="hideMobileMenu(false)">
                        <img src="../assets/menu.svg" />
                    </v-btn>

                    <v-btn v-if="!isLoggedIn" depressed large color="primary" class="desktop" href="/login">Login</v-btn>

                    <v-btn v-if="isLoggedIn" depressed large color="primary" class="desktop" @click="logout">Logout</v-btn>
                     
                </v-row>
            </v-col>
        </v-row> 
    </v-app-bar>
</template>

<script>
export default {
    name: "Navbar",
    data: () => ({
        alert: false
    }),
    props: {
        isLoggedIn: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        hideMobileMenu (isHidden) {
            return this.$emit("onHiddenMobileMenu", isHidden);
        },
        logout () {         
            return this.$emit("logout");
        }
    }
};
</script>

<style lang="scss">
.navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 0;
    height: fit-content !important;
    margin-bottom: 50px;

    button {
        img {
            height: 16px;
            width: 16px;
        }
    }
    
    .logo {
        width: 40px;
        height: 40px;
        cursor: pointer;
    }

    .user-section {
        button {
            margin-left: 30px;
            img {
                width: 25px;
                height: 25px;
            }
        }
    }

    .mobile, .hide {
        display: none;
    }
}

@media screen and (max-width: 960px) {
    .desktop {
        display: none !important;
    }
    .mobile {
        display: block !important;
    }
}
</style>
