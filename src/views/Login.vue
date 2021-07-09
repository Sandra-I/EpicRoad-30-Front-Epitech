<template>
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
                                hint="Password must contains characters"
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
                    href="/signup"
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

            <v-card-title v-if="error" class="error">
                {{ error }}
            </v-card-title>
        </v-form>
    </v-card>
</template>

<script>
import API from '@/api.js';

export default {
    name: "Login",
    data: () => ({
        user: {},
        error: ''
    }),
    methods: {
        login () {
            API.postLogin({
                email: this.user.email,
                password: this.user.password
            }).then(res => {
                if (res.status === 200) {
                    this.error = '';
                    localStorage.setItem('user', JSON.stringify(res.data.user))
                    localStorage.setItem('jwt', res.data.accessToken)
                    if (localStorage.getItem('jwt') != null) {
                        this.$emit('loggedIn')
                        if (this.$route.params.nextUrl != null) {
                            this.$router.push(this.$route.params.nextUrl)
                        } else {
                            this.$router.push('/favorite')
                        }
                    }
                }
            }).catch(error => {
                this.error = error;
            });
        }
    }
}
</script>
