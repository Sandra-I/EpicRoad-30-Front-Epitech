<template>
    <v-container fluid class="searchBloc">
        <v-row no-gutters>
            <v-col cols="12">
                <v-row>
                    <v-col>
                        <v-form ref="form">
                            <v-row>
                                <v-col cols="12" xs="12" sm="12" md="12" lg="12">
                                    <ul>
                                        <li
                                            is="SearchBar"
                                            v-for="(searchBar, index) in searchBars"
                                            v-bind:key="searchBar.created_at"
                                            v-bind:index="index"
                                            @remove="removeSearchBar(index)"
                                            @search-updated="data => onUpdateSearch(index, data)"
                                            :savedSearch="searchBar"
                                            :showDeleteButton="showDeleteButton(index)"
                                            :errors="errors[index]"
                                        ></li>
                                    </ul>
                                </v-col>
                                <v-col cols="12" xs="12" sm="12" md="12" lg="12">
                                    <v-row class="d-flex  justify-space-between">
                                        <v-col cols="3" xs="3" sm="3" md="3" lg="3" class="d-flex">
                                            <v-btn depressed large color="secondary" @click.prevent="addNewSearchBar" class="add-line">
                                                <img
                                                    class="plus-btn"
                                                    alt="add another location to your trip"
                                                    src="../assets/add.svg"
                                                />
                                                Add a destination
                                            </v-btn>
                                        </v-col>
                                        <v-col cols="4" xs="4" sm="4" md="4" lg="4" class="d-flex justify-end">
                                            <v-btn depressed large color="primary" class="search-btn" @click="search">
                                                <img src="../assets/search.svg" />
                                                Search
                                            </v-btn>
                                            <v-btn depressed large color="warning" @click="reset">
                                                Reset All
                                            </v-btn>
                                        </v-col>
                                    </v-row>
                                </v-col>
                            </v-row>
                        </v-form>
                    </v-col>
                </v-row>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import moment from "moment";
import SearchBar from '@/components/SearchBar.vue';

export default {
    name: 'SearchBloc',
    components: {
        SearchBar
    },
    data: () => ({
        valid: false,
        searchBars: [
            { id: 1, created_at: new Date().getTime() }
        ],
        errors: []
    }),
    created () {
        const savedSearch = JSON.parse(localStorage.getItem('search'));
        if (savedSearch) {
            savedSearch.forEach((search, index) => {
                this.searchBars[index] = search;
            });
        }
    },
    methods: {
        addNewSearchBar () {
            this.searchBars.push({
                id: this.searchBars.length + 1,
                created_at: new Date().getTime()
            })
        },
        removeSearchBar (index) {
            this.searchBars.splice(index, 1)
        },
        reset () {
            this.searchBars = [{ id: 1 }];
            localStorage.removeItem("search");
        },
        search () {
            if (this.checkForm()) {
                const savedSearch = JSON.parse(localStorage.getItem('search'));
                if (savedSearch) {
                    this.searchBars.forEach((value, index) => {
                        if (savedSearch[index] && value.location == savedSearch[index].location.formatted_address) {
                            this.searchBars[index].location = savedSearch[index].location
                        }
                    });
                }
                localStorage.setItem('search', JSON.stringify(this.searchBars));
                this.$router.push({ path: '/result' })
            }
        },
        showDeleteButton (index) {
            if (index === 0) {
                return false
            }
            return true
        },
        onUpdateSearch (index, searchData) {
            this.searchBars[index] = {...this.searchBars[index], ...searchData};
        },
        checkForm () {
            var valide = true;
            this.searchBars.forEach((item, index) => {
                var errors = [];
                this.errors[index] = [];
                if (!item.location) {
                    if (errors[index]) {
                        errors[index].push('Location is required.');
                    } else {
                        errors[index] = ['Location is required.'];
                    }
                }
                if(item.dateIn && item.dateOut && moment(item.dateIn).isAfter(item.dateOut)) {
                    if (errors[index]) {
                        errors[index].push('Check out must be after check in.');
                    } else {
                        errors[index] = ['Check out must be after check in.'];
                    }
                }
                if (errors.length) {
                    valide = false;
                    this.$set(this.errors, index, errors)
                }
            })
            return valide;
        }
    }
}
</script>

<style scoped lang="scss">
.searchBloc {
    display: flex;
    padding: 20px 0;
    margin-bottom: 50px;

    ul {
        padding: 0;
    }

    img {
        height: 16px;
        width: 16px;
    }

    .add-line {
        img {
            margin-right: 10px;
        }
    }

    .search-btn {
        margin-right: 20px;
        img {
            margin-right: 10px;
        }
    }


}

</style>