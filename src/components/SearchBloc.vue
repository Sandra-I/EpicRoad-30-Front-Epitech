<template>
    <v-container fluid class="searchBloc">
        <v-row no-gutters>
            <v-col cols="12">
                <v-row>
                    <v-col>
                        <!-- v-model="valid" -->
                        <v-form ref="form">
                            <v-row>
                                <v-col cols="10" xs="10" sm="10" md="10" lg="10">
                                    <ul>
                                        <li
                                            is="SearchBar"
                                            v-for="(searchBar, index) in searchBars"
                                            v-bind:key="searchBar.id"
                                            v-bind:index="index"
                                            @remove="removeSearchBar(index)"
                                            @search-updated="data => onUpdateSearch(index, data)"
                                            :showDeleteButton="showDeleteButton(index)"
                                            :errors="errors[index]"
                                        ></li>
                                    </ul>
                                </v-col>
                                <v-col cols="2" xs="2" sm="2" md="2" lg="2" class="d-flex align-end">
                                    <v-row>
                                        <v-col cols="6" xs="6" sm="6" md="6" lg="6" class="d-flex justify-center">
                                            <v-btn icon color="secondary" @click.prevent="addNewSearchBar">
                                                <img
                                                    class="plus-btn"
                                                    alt="add another location to your trip"
                                                    src="../assets/plus.svg"
                                                />
                                            </v-btn>
                                        </v-col>
                                        <v-col cols="6" xs="6" sm="6" md="6" lg="6" class="d-flex justify-center">
                                            <v-btn fab depressed color="secondary" class="search-btn" @click="search">
                                                <img src="../assets/search.svg" />
                                            </v-btn>
                                        </v-col>
                                        <v-col class="d-flex justify-center">
                                            <v-btn depressed color="warning" @click="reset">
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
import SearchBar from '@/components/SearchBar.vue';

export default {
    name: 'SearchBloc',
    components: {
        SearchBar
    },
    data: () => ({
        valid: false,
        searchBars: [
            { id: 1 }
        ],
        nextSearchBarId: 2,
        errors: []
    }),
    methods: {
        addNewSearchBar () {
            let toInsert

            if (this.nextSearchBarId === 1) {
                toInsert = this.nextSearchBarId
            } else {
                toInsert = this.nextSearchBarId++
            }
            this.searchBars.push({
                id: toInsert
            })
            this.nextSearchBarId++
        },
        removeSearchBar (index) {
            this.searchBars.splice(index, 1)
        },
        reset () {
            this.$refs.form.reset()
        },
        search () {
            if (this.checkForm()) {
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
            searchData.id = this.searchBars[index].id;
            this.searchBars[index] = searchData;
        },
        checkForm () {
            var valide = true;
            this.searchBars.forEach((item, index) => {
                if (!item.location) {
                    valide = false;
                    var errors = this.errors[index] ? this.errors[index].push('Location is required.') : this.errors[index] = ['Location is required.'];
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

    .search-btn {
        width: 45px !important;
        height: 45px !important;
    }

    img {
        height: 16px;
        width: 16px;
    }
}

</style>