<template>
    <div class="searchBar">
        <v-row justify="space-between"  align="center">
            <v-col cols="12" xs="12" sm="12" md="12" lg="12">
                <v-row justify="center" align="center">
                    <v-col cols="12" xs="12" sm="12" md="5" lg="5">
                        <AddressInput @autocomplete="onUpdateLocation" :savedAddress="formattedAddress"/>
                    </v-col>
                    <v-col cols="6" xs="6" sm="6" md="4" lg="4">
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
                                            flat
                                            background-color="#ececec"
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
                                            flat
                                            background-color="#ececec"
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
                    <v-col cols="6" xs="6" sm="6" md="3" lg="3">
                        <v-row>
                            <v-col cols="10" xs="10" sm="10" md="10" lg="10">
                                <v-text-field
                                    class="input budget-input"
                                    solo
                                    flat
                                    background-color="#ececec"
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
                                    max=1500
                                    v-if="this.showSliderBudget"
                                ></v-slider>
                            </v-col>
                            <v-col v-if="showDeleteButton" cols="2" xs="2" sm="2" md="2" lg="2" class="attached d-flex justify-center align-center">
                                <img class="remove" src="../assets/cancel-black.svg" @click="$emit('remove')">
                            </v-col>
                        </v-row>
                    </v-col>
                </v-row>
            </v-col>
        </v-row>
        <div class="errors" v-if="errors">
            <span v-for="(error, index) in errors" v-bind:key="index">{{ displayError(error) }}</span>
        </div>
    </div>
</template>

<script>
import AddressInput from "@/components/AddressInput.vue";

export default {
    name: "SearchBar",
    components: {AddressInput},
    props: {
        savedSearch: Object,
        showDeleteButton: {
            default: false,
            required: true
        },
        errors: Array,
    },
    data: () => ({
        searchBarInfo: {
            location: '',
            dateIn: '',
            dateOut: '',
            budgetAmount: ''
        },
        formattedAddress: '',
        menuIn: false,
        menuOut: false,
        showSliderBudget: false
    }),
    mounted() {
        if (this.savedSearch.location) {
            this.formattedAddress = this.savedSearch.location.formatted_address;
            this.searchBarInfo.location = this.savedSearch.location.formatted_address;
            this.searchBarInfo.dateIn = this.savedSearch.dateIn;
            this.searchBarInfo.dateOut = this.savedSearch.dateOut;
            this.searchBarInfo.budgetAmount = this.savedSearch.budgetAmount;
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
        },
        onUpdateLocation (value) {
            this.searchBarInfo.location = value;
        },
        displayError (error) {
            if (error) {
                return error.join(" ");
            }
            return "";
        }
    },
    watch: {
        searchBarInfo: {
            handler(value) {
                this.$emit('search-updated', value);
            },
            deep: true
        }
    }
};
</script>

<style scoped lang="scss">
.searchBar {
    padding: 20px 0;

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

    .budget-input {
        border-radius: 20px;
    }

    .remove {
        cursor: pointer;
    }

    .errors {
        margin-top: 20px;
        span {
            display: block;
            color: red;
        }
    }
}

</style>
