<template>
	<v-container fluid>
		<v-row>
			<v-col>
				<SearchBloc/>
			</v-col>
		</v-row>
		<v-row v-for="(group, index) in cards" :key="index">
			<v-col>
				<PreviewHomePage :cardGroup="group"/>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
import SearchBloc from '@/components/SearchBloc.vue';
import PreviewHomePage from '@/components/PreviewHomePage.vue';
import AccomodationsApi from "@/api/accomodations";
import RestaurantsApi from "@/api/restaurants";
import ActivitiesApi from "@/api/activities";

export default {
	name: 'Home',
	components: {
		SearchBloc,
		PreviewHomePage
	},
	data () {
		return {
            cards: {
                activities: {
                    title: "Enjoy your life",
                    items: []
                },
                accomodations: {
                    title: "Sleep like a dog",
                    items: []
                },
                eats: {
                    title: "Eat enough",
                    items: []
                },
                drinks: {
                    title: "Drink like a templar",
                    items: []
                }
            }
		}
	},
    mounted () {
        const paris_lat = 48.8558658;
        const paris_lng = 2.3328733;
        ActivitiesApi.getActivities(paris_lat, paris_lng).then(activities => {
            if (activities.length) {
                this.cards.activities.items = activities.slice(0, 4);
            }
        });
        AccomodationsApi.getAccomodations(paris_lat, paris_lng).then(accomodations => {
            if (accomodations.length) {
                this.cards.accomodations.items = accomodations.slice(0, 4);
            }
        });
        RestaurantsApi.getEats("Paris").then(eats => {
            if (eats.length) {
                this.cards.eats.items = eats.slice(0, 4);
            }
        });
        RestaurantsApi.getDrinks("Paris").then(drinks => {
            if (drinks.length) {
                this.cards.drinks.items = drinks.slice(0, 4);
            }
        });
    }
}
</script>
