<template>
  <div class="preview-homepage">
    <h1>{{ titlePreviewBloc }}</h1>
    <div id="app">
      <v-row>
        <v-col
          v-for="card in cardInformationArray"
          :key="card.title"
          :cols=3
        >
          <v-card>
            <v-img
              :src="card.src"
              class="white--text align-end"
              gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
              height="200px"
            >
              <v-card-title v-text="card.title"></v-card-title>
            </v-img>
          </v-card>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PreviewHomePage',
  props: {
    titlePreviewBloc: {
      type: String,
      default: 'Le titre'
    },
    cardInformationArray: {
      type: Array
    }
  }
}
</script>