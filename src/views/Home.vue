<template>
  <div class="home">
    <v-container fluid class="grey lighten-5">
      <v-row v-for="cardTitle in cardTitles" :key="cardTitle">
        <v-col>
          <PreviewHomePage :titlePreviewBloc="cardTitle.title" :cardInformationArray="cards"/>
        </v-col>
      </v-row>
    </v-container>
    

  </div>
</template>

<script>
import PreviewHomePage from '@/components/PreviewHomePage.vue';

export default {
  name: 'Home',
  components: {
    PreviewHomePage
  },
  data () {
    return {
      cardTitles: [
        { title: 'Enjoy your life' },
        { title: 'Sleep like a dog' },
        { title: 'Travel like a bird' },
        { title: 'Eat enough' },
        { title: 'Drink like a templar' }
      ],
      cards: [
        { title: 'Favorite road trips', src: 'https://cdn.vuetifyjs.com/images/cards/road.jpg' },
        { title: 'Best', src: 'https://cdn.vuetifyjs.com/images/cards/road.jpg' },
        { title: 'Best air', src: 'https://cdn.vuetifyjs.com/images/cards/road.jpg' },
        { title: 'Best airlines', src: 'https://cdn.vuetifyjs.com/images/cards/road.jpg' }
      ],
    }
  }
}
</script>
