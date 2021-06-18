<template>
    <!-- <div class="navbar gutter"> -->
        <v-app-bar class="navbar gutter">
            <v-row justify="space-between"  align="center">
                <v-col cols="1" xs="1" sm="1" md="1" lg="1">
                    <img
                        class="logo"
                        alt="epic road trip logo"
                        src="../assets/worldwide.svg"
                    />
                </v-col>
            
                <v-col cols="3" xs="3" sm="3" md="2" lg="2" class="user-section">
                    <v-row align="center" justify="end">
                        <v-btn icon large>
                            <img src="../assets/heart.svg" />
                        </v-btn>
                        <v-btn icon large class="mobile" @click="hideMobileMenu(false)">
                            <img src="../assets/menu.svg" />
                        </v-btn>
                        <v-btn depressed large color="primary" class="desktop">Login</v-btn>
                    </v-row>
                </v-col>
            </v-row> 
        </v-app-bar>
    <!-- </div> -->
</template>

<script>
export default {
    name: "Navbar",
    data: () => ({
    
    }),
    methods: {
        hideMobileMenu (isHidden) {
            return this.$emit("onHiddenMobileMenu", isHidden);
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
    // margin-bottom: 50px;

    button {
        img {
            height: 16px;
            width: 16px;
        }
    }
    
    .logo {
        width: 40px;
        height: 40px;
    }

    .user-section {
        text-align: right;
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
