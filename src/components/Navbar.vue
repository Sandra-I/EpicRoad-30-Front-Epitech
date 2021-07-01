<template>
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

                    <!-- <v-btn depressed large color="primary" class="desktop" @click="openLoginModal(true)">Login</v-btn> -->
                    
                    <v-alert
                        v-model="alert"
                        border="left"
                        color="green"
                        dense
                        icon="mdi-Account"
                        outlined
                        text
                        type="success"
                    >Connexion réussie !</v-alert>

                    <v-dialog
                        transition="dialog-bottom-transition"
                        v-model="showLoginDialog"
                        width="700"
                    >
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn
                                depressed
                                large
                                color="primary"
                                v-bind="attrs"
                                v-on="on"
                            >
                                Login
                            </v-btn>
                        </template>
                        <v-card>
                            <!-- v-model="valid" -->
                            <v-form
                                ref="form"
                                
                                lazy-validation
                            >
                                <v-card-title class="text-h5 grey lighten-2">
                                    Log in
                                </v-card-title>
                        
                                <v-card-text>

                                    <v-container>
                                        <v-row>
                                            <!-- TO ADD: rules + model -->
                                            <v-col cols="12">
                                                <v-text-field
                                                    v-model="user.email"
                                                    label="Email*"
                                                    required
                                                ></v-text-field>
                                            </v-col>
                                            <!-- TO DO: ajouter validator password + update hint -->
                                            <v-col cols="12">
                                                <v-text-field
                                                    v-model="user.password"
                                                    label="Password*"
                                                    type="password"
                                                    hint="Password must contains ... "
                                                    required
                                                ></v-text-field>
                                            </v-col>
                                        </v-row>
                                    </v-container>
                                    <small>*fields required</small>
                                </v-card-text>
                        
                                <v-divider></v-divider>
                        
                                <v-card-actions>
                                    <v-btn
                                        color="primary"
                                        @click="openAndCloseModal"
                                    >
                                        No account yet! Sign me in!
                                    </v-btn>
                                    
                                    <v-spacer></v-spacer>
                                    <!-- TO ADD: disabled bouton si form non valid -->
                                    <v-btn
                                        color="primary"
                                        @click="login"
                                        
                                    >
                                        Log me
                                    </v-btn>
                                </v-card-actions>
                            </v-form>
                        </v-card>
                    </v-dialog>
                    <v-dialog
                        transition="dialog-bottom-transition"
                        v-model="showSignupDialog"
                        width="700"
                    >
                        <v-card>
                            <v-card-title class="text-h5 grey lighten-2">
                                Sign up
                            </v-card-title>
                    
                            <v-card-text>
                                <v-container>
                                    <v-row>
                                        <v-col
                                            cols="12"
                                            sm="6"
                                            md="4"
                                        >
                                            <v-text-field
                                                v-model="user.firstname"
                                                label="First name*"
                                                required
                                            ></v-text-field>
                                        </v-col>
                                        <v-col
                                            cols="12"
                                            sm="6"
                                            md="4"
                                        >
                                            <v-text-field
                                                v-model="user.lastname"
                                                label="Last name*"
                                                required
                                            ></v-text-field>
                                        </v-col>
                                        <v-col cols="12">
                                            <v-text-field
                                                v-model="user.email"
                                                label="Email*"
                                                required
                                            ></v-text-field>
                                        </v-col>
                                        <!-- TO DO: ajouter validator password + update hint -->
                                        <v-col cols="12">
                                            <v-text-field
                                                v-model="user.password"
                                                label="Password*"
                                                type="password"
                                                hint="Password must contains ... "
                                                required
                                            ></v-text-field>
                                        </v-col>
                                    </v-row>
                                </v-container>
                                <small>*fields required</small>
                            </v-card-text>
                    
                            <v-divider></v-divider>
                    
                            <v-card-actions>
                                <v-btn
                                    color="primary"
                                    @click="openAndCloseModal"
                                >
                                Already in! Log in!
                                </v-btn>
                                <v-spacer></v-spacer>
                                <v-btn
                                    color="primary"
                                    @click="signup"
                                >
                                Sign me
                                </v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                </v-row>
            </v-col>
        </v-row> 
    </v-app-bar>
</template>

<script>
import API from '@/api.js';

export default {
    name: "Navbar",
    data: () => ({
		showLoginDialog: false,
        showSignupDialog: false,
        alert: false,
        user: {}
    }),
    methods: {
        hideMobileMenu (isHidden) {
            return this.$emit("onHiddenMobileMenu", isHidden);
        },
        openAndCloseModal () {
            this.showSignupDialog = !this.showSignupDialog;
            this.showLoginDialog = !this.showLoginDialog;
        },
        login () {
            API.postLogin({
                email: this.user.email,
                password: this.user.password
            }).then(res => {
                if (res.status === 200) {
                    // TO ADD
                    // this.alert = true
                    alert('Connexion Okay')
                    this.showLoginDialog = false
                }
            })
        },
        signup () {
            API.postSignup({
                firstname: this.user.firstname,
                lastname: this.user.lastname,
                email: this.user.email,
                password: this.user.password
            }).then(res => {
                if (res.status === 200) {
                    // TO ADD
                    // this.alert = true
                    alert('Inscription Okay')
                    this.showSignupDialog = false
                }
            })
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
