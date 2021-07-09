<template>
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
                href="/login"
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

        <v-card-title v-if="error" class="error">
            {{ error }}
        </v-card-title>
    </v-card>
</template>

<script>
import API from '@/api.js';

export default {
    name: "Signup",
    data: () => ({
        user: {},
        error: ''
    }),
    methods: {
        signup () {
            API.postSignup({
                firstname: this.user.firstname,
                lastname: this.user.lastname,
                email: this.user.email,
                password: this.user.password
            }).then(res => {
                if (res.status === 200) {
                    this.error = '';
                    if (this.$route.params.nextUrl != null) {
                        this.$router.push(this.$route.params.nextUrl)
                    } else {
                        this.$router.push('/login')
                    }
                }
            }).catch(error => {
                this.error = error;
            });
        }
    }
}
</script>
