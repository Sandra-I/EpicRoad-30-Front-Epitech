<template>
    <div class="navbar gutter">
        <img
            class="logo"
            alt="epic road trip logo"
            src="../assets/worldwide.svg"
        />
        <div>
            <v-row>
                <v-col cols="12" sm="6" md="6">
                    <v-text-field
                        class="input"
                        solo
                        label="Address"
                        align="center"
                        hide-details="auto"
                    ></v-text-field>
                </v-col>
                <v-col cols="12" sm="4" md="4">
                    <v-row>
                        <v-col cols="6" class="attached">
                            <v-menu
                                ref="menuIn"
                                v-model="menuIn"
                                :close-on-content-click="false"
                                :return-value.sync="dateIn"
                                transition="scale-transition"
                                offset-y
                                min-width="auto"
                            >
                                <template v-slot:activator="{ on, attrs }">
                                    <v-text-field
                                        v-model="formatedDateIn"
                                        label="Check-in"
                                        readonly
                                        v-bind="attrs"
                                        v-on="on"
                                        solo
                                        hide-details="auto"
                                    ></v-text-field>
                                </template>
                                <v-date-picker
                                    v-model="dateIn"
                                    no-title
                                    scrollable
                                    locale="fr-FR"
                                    :first-day-of-week="1"
                                >
                                    <v-spacer></v-spacer>
                                    <v-btn
                                        text
                                        color="primary"
                                        @click="menuIn = false"
                                    >
                                        Cancel
                                    </v-btn>
                                    <v-btn
                                        text
                                        color="primary"
                                        @click="$refs.menuIn.save(dateIn)"
                                    >
                                        OK
                                    </v-btn>
                                </v-date-picker>
                            </v-menu>
                        </v-col>
                        <v-col cols="6" class="attached">
                            <v-menu
                                ref="menuOut"
                                v-model="menuOut"
                                :close-on-content-click="false"
                                :return-value.sync="dateOut"
                                transition="scale-transition"
                                offset-y
                                min-width="auto"
                            >
                                <template v-slot:activator="{ on, attrs }">
                                    <v-text-field
                                        v-model="formatedDateOut"
                                        label="Check-out"
                                        readonly
                                        v-bind="attrs"
                                        v-on="on"
                                        solo
                                        hide-details="auto"
                                    ></v-text-field>
                                </template>
                                <v-date-picker
                                    v-model="dateOut"
                                    no-title
                                    scrollable
                                    locale="fr-FR"
                                    :first-day-of-week="1"
                                >
                                    <v-spacer></v-spacer>
                                    <v-btn
                                        text
                                        color="primary"
                                        @click="menuOut = false"
                                    >
                                        Cancel
                                    </v-btn>
                                    <v-btn
                                        text
                                        color="primary"
                                        @click="$refs.menuOut.save(dateOut)"
                                    >
                                        OK
                                    </v-btn>
                                </v-date-picker>
                            </v-menu>
                        </v-col>
                    </v-row>
                </v-col>
                <v-col cols="12" sm="2" md="2">
                    <v-text-field
                        class="input"
                        solo
                        label="Budget"
                        hide-details="auto"
                    ></v-text-field>
                </v-col>
            </v-row>
        </div>
        <div class="user-section">
            <v-row>
                <v-col cols="6" sm="6" md="6">
                    <v-btn depressed large>
                        My trips
                        <img src="../assets/heart.svg" />
                    </v-btn>
                </v-col>
                <v-col cols="6" sm="6" md="6">
                    <v-btn depressed large color="primary">Connexion</v-btn>
                </v-col>
            </v-row>
        </div>
    </div>
</template>

<script>
export default {
    name: "Navbar",
    data: () => ({
        dateIn: new Date().toISOString().substr(0, 10),
        dateOut: new Date().toISOString().substr(0, 10),
        menuIn: false,
        menuOut: false,
    }),
    computed: {
        formatedDateIn () {
            return this.formatDate(this.dateIn)
        },
        formatedDateOut () {
            return this.formatDate(this.dateOut)
        },
    },
    methods: {
        formatDate (date) {
            if (!date) return null;

            const [year, month, day] = date.split("-");
            return `${day}/${month}/${year}`;
        }
    },
};
</script>

<style lang="scss">
.navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 0;
    margin-bottom: 50px;

    .logo {
        width: 40px;
        height: 40px;
    }

    .v-input {
        border-radius: 30px;
        .v-input__slot {
            background: #f5f5f5 !important;
            -webkit-box-shadow: none !important;
            -moz-box-shadow: none !important;
            box-shadow: none !important;
            padding: 0 20px !important;
        }
    }

    .user-section {
        button {
            img {
                height: 16px;
                width: 16px;
                margin-left: 10px;
            }
        }
    }

    .attached {
        &:first-child {
            padding-right: 2px;
            .v-input {
                border-radius: 20px 0 0 20px;
            }
        }
        &:last-child {
            padding-left: 2px;
            .v-input {
                border-radius: 0 20px 20px 0;
            }
        }
    }
}
</style>
