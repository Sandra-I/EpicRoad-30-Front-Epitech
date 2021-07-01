<template>
    <div class="searchBar">
        <v-row justify="space-between"  align="center">
            <v-col cols="12" xs="12" sm="12" md="12" lg="12">
                <v-row justify="center" align="center">
                    <v-col cols="5" xs="5" sm="5" md="4" lg="4">
                        <!-- TO DO: vérifier couleur de clear-icon-->
                        <v-text-field
                            class="input"
                            solo
                            label="Location"
                            align="center"
                            hide-details="auto"
                            v-model="searchBarInfo.locationName"
                            clearable
                        ></v-text-field>
                    </v-col>
                    <v-col cols="4" xs="4" sm="4" md="5" lg="4">
                        <v-row>
                            <v-col cols="6" xs="6" sm="6" md="6" lg="6" class="attached">
                                <v-menu
                                    ref="menuIn"
                                    v-model="menuIn"
                                    :close-on-content-click="false"
                                    :return-value.sync="searchBarInfo.dateIn"
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
                                        v-model="searchBarInfo.dateIn"
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
                                            @click="$refs.menuIn.save(searchBarInfo.dateIn)"
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
                                    :return-value.sync="searchBarInfo.dateOut"
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
                                        v-model="searchBarInfo.dateOut"
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
                                            @click="$refs.menuOut.save(searchBarInfo.dateOut)"
                                        >
                                            OK
                                        </v-btn>
                                    </v-date-picker>
                                </v-menu>
                            </v-col>
                        </v-row>
                    </v-col>
                    <v-col cols="4" xs="4" sm="4" md="4" lg="4">
                        <v-row>
                            <!-- TO ASK Bastien : avec ou sans pour la place pour le bouton ? -->
                            <!-- cols="6" xs="6" sm="6" md="6" lg="6"  -->
                            <v-col class="attached">
                                <v-text-field
                                    class="input"
                                    solo
                                    label="Budget"
                                    hide-details="auto"
                                    v-model="searchBarInfo.budgetAmount"
                                    clearable
                                    clear-icon
                                    @click="yesShowSliderBudget"
                                    @blur="noShowSliderBudget"
                                ></v-text-field>
                                <v-slider
                                    v-model="searchBarInfo.budgetAmount"
                                    thumb-color="primary"
                                    min=0
                                    max=9999
                                    v-if="this.showSliderBudget"
                                ></v-slider>
                            </v-col>
                            <template v-if="showDeleteButton">
                                <v-col cols="6" xs="6" sm="6" md="6" lg="6" 
                                    class="attached d-flex justify-center align-center">
                                    <v-btn 
                                        color="secondary"
                                        @click="$emit('remove')"
                                    >
                                        Supprimer
                                    </v-btn>
                                </v-col>
                            </template>
                        </v-row>
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
        searchBarInfo: {
            locationName: '',
            dateIn: '',
            dateOut: '',
            budgetAmount: ''
        },
        menuIn: false,
        menuOut: false,
        showSliderBudget: false
    }),
    props: {
        showDeleteButton: {
            default: false,
            required: true
        }
    },
    computed: {
        formatedDateIn () {
            return this.formatDate(this.searchBarInfo.dateIn);
        },
        formatedDateOut () {
            return this.formatDate(this.searchBarInfo.dateOut);
        },
    },
    methods: {
        formatDate (date) {
            if (!date) return null;

            const [year, month, day] = date.split("-");
            return `${day}/${month}/${year}`;
        },
        yesShowSliderBudget () {
            this.showSliderBudget = true;
        },
        noShowSliderBudget () {
            this.showSliderBudget = false;
        }
    }
};
</script>

<style scoped lang="scss">
.searchBar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 0;

    .search-btn {
        width: 45px !important;
        height: 45px !important;
    }

    img {
        height: 16px;
        width: 16px;
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
