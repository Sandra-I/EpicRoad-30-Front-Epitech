<template>
	<v-container fluid>
		<v-row>
			<v-col class="d-flex justify-center">
				<h1>{{ homePageTitle | capitalize }}</h1>
			</v-col>
		</v-row>
		<v-row>
			<v-col>
				<SearchBloc/>
			</v-col>
		</v-row>
		<v-row v-for="(cardTitle, index) in cardTitles" :key="index">
			<v-col>
				<PreviewHomePage :titlePreviewBloc="cardTitle.title" :cardInformationArray="cards"/>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
import SearchBloc from '@/components/SearchBloc.vue';
import PreviewHomePage from '@/components/PreviewHomePage.vue';

export default {
	name: 'Home',
	components: {
		SearchBloc,
		PreviewHomePage
	},
	data () {
		return {
			homePageTitle: 'Epic Road Trip',
			cardTitles: [
				{ title: 'Enjoy your life' },
				{ title: 'Sleep like a dog' },
				{ title: 'Travel like a bird' },
				{ title: 'Eat enough' },
				{ title: 'Drink like a templar' }
			],
			cards: [
				{ title: 'Favorite road', src: 'https://cdn.vuetifyjs.com/images/cards/road.jpg' },
				{ title: 'Best', src: 'https://cdn.vuetifyjs.com/images/cards/road.jpg' },
				{ title: 'Best air', src: 'https://cdn.vuetifyjs.com/images/cards/road.jpg' },
				{ title: 'Best airlines', src: 'https://cdn.vuetifyjs.com/images/cards/road.jpg' }
			],
		}
	},
	filters: {
		capitalize: function (value) {
			if (!value) return '';
			value = value.toString();
			return value.toUpperCase();
		}
	}
}
</script>
