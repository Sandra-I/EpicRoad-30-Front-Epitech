<template>
    <v-dialog
        transition="dialog-bottom-transition"
        width="700"
        v-model="openLoginDialog"
        @onOpenLoginModal="openLoginDialog = true"
    >
        <v-card>
            <v-card-title class="text-h5 grey lighten-2">
                Login
            </v-card-title>
    
            <v-card-text>
                <v-container>
                    <v-row>
                        <v-col cols="12">
                            <v-text-field
                                label="Email*"
                                required
                            ></v-text-field>
                        </v-col>
                        <!-- TO DO: ajouter validator password + update hint -->
                        <v-col cols="12">
                            <v-text-field
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
                    @click="openSignupDialog = false"
                >
                No account yet! Sign me in!
                </v-btn>
                <v-spacer></v-spacer>
                <v-btn
                    color="primary"
                >
                Log me
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
    name: "Login",
    data: () => ({
        openLoginDialog: false,
        openSignupDialog: false
    }),
    methods: {
        openTest () {
            this.openLoginDialog = true;
            console.log("onLogin modal")
            // return this.showModal = val;
        }
    },
    // props: {
    //     openLoginDialog: {
    //         type: Boolean,
    //         default: false
    //     }
    // }
}
</script>
