<template>
    <div class="result">
        <div class="section">
            <h2>Location on your trip</h2>
            <img class="favorite" :src="favoriteIcon">
            <LocationRoute />
        </div>
        <div class="section">
            <h2>
                Everything you want in <strong>Paris</strong> for
                <strong>885 €</strong>
            </h2>
            <div class="selection">
                <div class="item">
                    <div class="square">
                        <img alt="molitor resort" src="../assets/molitor.png" />
                    </div>
                    <div class="details">
                        <label class="place">Molitor Resort</label>
                        <span class="price">526 €</span>
                    </div>
                </div>
                <div class="item">
                    <div class="square">
                        <img alt="burger nation" src="../assets/burger.png" />
                    </div>
                    <div class="details">
                        <label class="place">Burger Nation</label>
                        <span class="price">17 €</span>
                    </div>
                </div>
                <div class="item">
                    <div class="square">
                        <img alt="louvre museum" src="../assets/louvre.png" />
                    </div>
                    <div class="details">
                        <label class="place">Louvre Museum</label>
                        <span class="price">42 €</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="section d-flex">
            <div class="results">
                <div class="result">
                    <div class="header">
                        <h3>Accomodations</h3>
                        <v-btn text class="filter">
                            Filters
                            <img alt="filter icon" src="../assets/filter.svg" />
                        </v-btn>
                    </div>
                    <ResultPreview :result="accomodations[0]" />
                    <ResultPreview :result="accomodations[1]" />
                    <ResultPreview :result="accomodations[2]" />
                    <a href="">See 42 additional accommodations ...</a>
                </div>
                <div class="result">
                    <div class="header">
                        <h3>Restaurants</h3>
                        <v-btn text class="filter">
                            Filters
                            <img alt="filter icon" src="../assets/filter.svg" />
                        </v-btn>
                    </div>
                    <ResultPreview :result="restaurants[0]" />
                    <ResultPreview :result="restaurants[1]" />
                    <ResultPreview :result="restaurants[2]" />
                    <a href="">See 65 additional restaurants ...</a>
                </div>
                <div class="result">
                    <div class="header">
                        <h3>Activities</h3>
                        <v-btn text class="filter">
                            Filters
                            <img alt="filter icon" src="../assets/filter.svg" />
                        </v-btn>
                    </div>
                    <ResultPreview :result="activities[0]" />
                    <ResultPreview :result="activities[1]" />
                    <ResultPreview :result="activities[2]" />
                    <a href="">See 18 additional activities ...</a>
                </div>
            </div>
            <div class="map">
                <GoogleMap />
            </div>
        </div>
    </div>
</template>

<script>
import LocationRoute from "@/components/LocationRoute.vue";
import ResultPreview from "@/components/ResultPreview.vue";
import GoogleMap from '@/components/GoogleMap.vue'

export default {
    name: "Result",
    components: {
        LocationRoute,
        ResultPreview,
        GoogleMap
    },
    data: () => ({
        favoriteIcon: require('../assets/heart.svg'),
        accomodations: [
            {
                img: "accomodation1.png",
                name: "Palaça",
                address: "15 Bis Rue de Marignan, 75008 Paris",
                equipment: "1 room for 2 persons with queen size bed",
                price_detail: "2 x 163 € / night",
                total: "276",
            },
            {
                img: "molitor.png",
                name: "Molitor Resort",
                address: "42 Avenue George V, 75008 Paris",
                equipment: "1 room for 2 persons with king size bed",
                price_detail: "2 x 263 € / night",
                total: "526",
            },
            {
                img: "accomodation2.png",
                name: "Ritz Paris",
                address: "15 Place Vendôme, 75001 Paris",
                equipment: "1 room for 2 persons with double king size bed",
                price_detail: "2 x 413 € / night",
                total: "826",
            },
        ],
        restaurants: [
            {
                img: "restaurant1.png",
                name: "Ciel de Paris",
                address:
                    "Tour Maine Montparnasse, 56ème, Avenue du Maine, 75015 Paris",
                equipment:
                    "Panoramic view from the top of the Montparnasse tower.",
                total: "Menu starting at 25€",
            },
            {
                img: "restaurant2.png",
                name: "Molitor Resort",
                address: "112 Rue du Faubourg Saint-Honoré, 75008 Paris",
                equipment:
                    "High-end French specialties served in the select decor of a large industrial warehouse.",
                total: "Menu starting at 40€",
            },
            {
                img: "accomodation2.png",
                name: "Le Ruisseau Burger Joint",
                address: "22 Rue Rambuteau, 75003 Paris",
                equipment:
                    "This restaurant with a sober setting serves burgers, fries, beers and desserts in the dining room or on the terrace.",
                total: "Menu starting at 17 €",
            },
        ],
        activities: [
            {
                img: "louvre.png",
                name: "Louvre Museum",
                address: "Place du Louvre, 75008 Paris",
                equipment:
                    "The Louvre Museum is a museum located in the 1er arrondissement of Paris, France.",
                total: "Starting at 42 €",
            },
            {
                img: "activity1.png",
                name: "The Bargees of Paris",
                address: "Port de Grenelle, 75015 Paris",
                equipment: "Houseboat travel in Paris.",
                total: "Starting at 25 €",
            },
            {
                img: "activity2.png",
                name: "Eiffel Tower",
                address: "Champs de Mars, 75008 Paris",
                equipment: "Panoramic view on all Paris.",
                total: "Starting at 75 €",
            },
        ],
    }),
};
</script>

<style lang="scss">
.result {    
    a {
        text-decoration: none;
        font-weight: bold;
    }

    .section {
        text-align: left;
        margin-bottom: 100px;
        position: relative;
        h2 {
            margin-bottom: 40px;
        }
        .favorite {
            width: 20px;
            height: 20px;
            position: absolute;
            right: 0;
            top: 10px;
        }
    }

    .selection {
        display: flex;
        justify-content: space-between;
        width: 100%;
        .item {
            width: 20%;
            &:hover {
                opacity: 0.6;
                cursor: pointer;
            }
            .square {
                position: relative;
                display: block;
                margin: auto;
                &::before {
                    content: "";
                    padding-top: 100%;
                    display: block;
                }
                img {
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    top: 0;
                    left: 0;
                    bottom: 0;
                    margin: auto;
                    border-radius: 5%;
                }
            }
            .details {
                display: flex;
                padding-top: 20px;
                justify-content: space-between;
                .place {
                    font-weight: bold;
                    text-transform: uppercase;
                }
            }
        }
    }

    .results {
        width: 50%;
        padding-right: 50px;
        .result {
            &:not(:first-child) {
                margin-top: 100px;
            }
            .header {
                display: flex;
                align-items: center;
                justify-content: space-between;
                margin-bottom: 50px;
                h3 {
                    text-align: left;
                    font-size: 24px;
                }
                .filter {
                    display: flex;
                    text-transform: none;
                    color: #6e6e6e;
                    letter-spacing: 0;
                    font-size: 16px;
                    img {
                        margin-left: 15px;
                        width: 15px;
                        height: 15px;
                    }
                }
            }
            .result-preview {
                &:hover {
                    cursor: pointer;
                }
            }
        }
    }

    .map {
        padding-left: 50px;
        width: calc(50% + 10vw);
        margin-right: -10vw;
        margin-bottom: -250px;
        .vue-map {
            border-radius: 20px 0 0 0;
        }
    }
}
</style>
