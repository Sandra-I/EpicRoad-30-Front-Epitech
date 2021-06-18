<template>
    <div class="navbar gutter">
        <v-row justify="space-between"  align="center">
            <v-col class="desktop" cols="12" xs="12" sm="12" md="11" lg="11">
                <v-row justify="center" align="center">
                    <v-col cols="5" xs="5" sm="5" md="4" lg="5">
                        <v-text-field
                            class="input"
                            solo
                            label="Location"
                            align="center"
                            hide-details="auto"
                        ></v-text-field>
                    </v-col>
                    <v-col cols="4" xs="4" sm="4" md="5" lg="4">
                        <v-row>
                            <v-col cols="6" xs="6" sm="6" md="6" lg="6" class="attached">
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
                            <v-col cols="6" xs="6" sm="6" md="6" lg="6" class="attached">
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
                    <v-col cols="2" xs="2" sm="2" md="2" lg="2">
                        <v-text-field
                            class="input"
                            solo
                            label="Budget"
                            hide-details="auto"
                        ></v-text-field>
                    </v-col>
                    <v-col cols="1" xs="1" sm="1" md="1" lg="1">
                        <v-btn fab depressed color="secondary" class="search-btn">
                            <img src="../assets/search.svg" />
                        </v-btn>
                    </v-col>
                </v-row>
            </v-col>
        </v-row>
    </div>
</template>

<script>
export default {
    name: "SearchBar",
    data: () => ({
        dateIn: "",
        dateOut: "",
        menuIn: false,
        menuOut: false,
    }),
    computed: {
        formatedDateIn () {
            return this.formatDate(this.dateIn);
        },
        formatedDateOut () {
            return this.formatDate(this.dateOut);
        },
    },
    methods: {
        formatDate (date) {
            if (!date) return null;

            const [year, month, day] = date.split("-");
            return `${day}/${month}/${year}`;
        },
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
    margin-bottom: 50px;

    // .v-input {
    //     border-radius: 30px;
    //     .v-input__slot {
    //         background: #f5f5f5 !important;
    //         -webkit-box-shadow: none !important;
    //         -moz-box-shadow: none !important;
    //         box-shadow: none !important;
    //         padding: 0 20px !important;
    //     }
    // }

    .search-btn {
        width: 45px !important;
        height: 45px !important;
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
