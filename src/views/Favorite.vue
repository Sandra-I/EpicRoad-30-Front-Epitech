<template>
    <div class="favorite">
        <h2>Your trips saved</h2>
        <div class="trips">
            <Trip v-for="(trip, index) in trips" :key="index" :trip="trip" :active="index == activeTrip"/>
        </div>
        <div class="detail-trips">
            <DetailTrip v-for="trip in trips" :key="trip.key" :trip="trip" class="detail"/>
        </div>
    </div>
</template>

<script>
import Trip from "@/components/Trip.vue";
import DetailTrip from "@/components/DetailTrip.vue";

export default {
    name: "Favorite",
    components: {
        Trip,
        DetailTrip
    },
    data: () => ({
        trips: [{
            name: "Trip 1",
            destinations: [{
                address: "Grote Markt, 1000 Brussel, Belgique",
                dateIn: "2021-04-22",
                dateOut: "2021-04-23",
                budgetStart: 200,
                budgetEnd: 250,
                resultLink: "/result",
                favorites: []
            },
            {
                address: "Avenue des Champs Elysées, 75008 Paris",
                dateIn: "2021-04-23",
                dateOut: "2021-04-25",
                budgetStart: 800,
                budgetEnd: 900,
                resultLink: "/result",
                favorites: [
                    {
                        img: "accomodation1.png",
                        name: "Palaça",
                        address: "15 Bis Rue de Marignan, 75008 Paris",
                        equipment: "1 room for 2 persons with queen size bed",
                        price_detail: "2 x 163 € / night",
                        total: 276
                    },
                    {
                        img: "burger.png",
                        name: "Le Ruisseau Burger Joint",
                        address: "22 Rue Rambuteau, 75003 Paris",
                        equipment: "Ce restaurant au cadre sobre sert en salle ou en terrasse des hamburgers, frites, bières et desserts.",
                        price_detail: "Menu starting at 17 €"
                    },
                    {
                        img: "activity2.png",
                        name: "Eiffel Tower",
                        address: "Champs de Mars, 75008 Paris",
                        equipment: "Panoramic view on all Paris.",
                        price_detail: "Starting at 75 €"
                    },
                    {
                        img: "molitor.png",
                        name: "Molitor Resort",
                        address: "42 Avenue George V, 75008 Paris",
                        equipment: "1 room for 2 persons with king size bed",
                        price_detail: "2 x 163 € / night",
                        total: 276
                    },
                    {
                        img: "restaurant1.png",
                        name: "Epicure",
                        address: "112 Rue du Faubourg Saint-Honoré, 75008 Paris",
                        equipment: "High-end French specialties served in the select decor of a large industrial warehouse.",
                        price_detail: "Menu starting at 40€"
                    },
                    {
                        img: "accomodation2.png",
                        name: "The Bargees of Paris",
                        address: "Port de Grenelle, 75015 Paris",
                        equipment: "Houseboat travel in Paris.",
                        price_detail: "Starting at 25 €"
                    },
                    {
                        img: "louvre.png",
                        name: "Louvre Museum",
                        address: "Place du Louvre, 75008 Paris",
                        equipment: "The Louvre Museum is a museum located in the 1ᵉʳ arrondissement of Paris, France. ",
                        price_detail: "Starting at 42 €"
                    }
                ]
            },
            {
                address: "Monplaisir, 69008 Lyon ",
                dateIn: "2021-04-25",
                dateOut: "2021-04-26",
                budgetStart: 100,
                budgetEnd: 150,
                resultLink: "/result",
                favorites: []
            }]
        },
        {
            name: "Trip 2",
            destinations: [{
                address: "Grote Markt, 1000 Brussel, Belgique",
                dateIn: "2021-04-22",
                dateOut: "2021-04-23",
                budgetStart: 200,
                budgetEnd: 250,
                resultLink: "/result",
                favorites: []
            }]
        }],
        activeTrip: 0
    })
};
</script>

<style lang="scss">
.favorite {
    .trips {
        display: flex;
        margin-bottom: 50px;
    }
    .detail-trips {
        .detail {
            margin-bottom: 100px;
        }
    }
}
</style>
