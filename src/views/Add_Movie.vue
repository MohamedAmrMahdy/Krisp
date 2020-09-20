<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" sm="6" md="4" lg="8">
        <v-card dark class="mx-auto card elevation-12" min-width="600px">
          <v-toolbar color="orange darken-3" dark flat>
            <v-toolbar-title>Add New Movie to Movie Theatre</v-toolbar-title>
            <v-spacer />
            <v-icon>mdi-add</v-icon>
          </v-toolbar>
          <v-card-text>
            <v-form ref="form" v-model="valid" lazy-validation>
              <v-text-field
                dark
                label="Movie Name"
                name="Movie Name"
                prepend-icon="mdi-movie"
                type="text"
                v-model="moviename"
                required
              />
              <v-text-field
                dark
                label="Year"
                name="Year"
                prepend-icon="mdi-numeric"
                type="text"
                v-model="year"
                required
              />
              <v-autocomplete
                v-model="values"
                :items="items"
                dense
                chips
                small-chips
                label="Geners"
                prepend-icon="mdi-shape"
                multiple
                solo
              ></v-autocomplete>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn text color="grey lighten-4" @click="AddMovie"
              >Add Movie</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <v-snackbar v-model="snackbar4" timeout="3000">
      Movie Added Thanks</v-snackbar
    >
  </v-container>
</template>

<script>
import ApiService from "../services/api.service";
export default {
  mounted() {},
  data: () => ({
    moviename: null,
    year: null,
    items: [
      "Action",
      "Adventure",
      "Animation",
      "Comedy",
      "Crime",
      "Documentary",
      "Drama",
      "Family",
      "Fantasy",
      "History",
      "Horror",
      "Music",
      "Mystery",
      "Romance",
      "Science Fiction",
      "TV Movie",
      "Thriller",
      "War",
      "Western",
    ],
    values: [],
    snackbar4: false
  }),

  methods: {
    AddMovie() {
      ApiService.post(
        `http://movierecommendationapi-prod.eu-central-1.elasticbeanstalk.com/api/Movies/AddMovie`,
        { title: this.moviename, genres: this.values, year: this.year }
      ).then(() => {
          this.moviename = null;
          this.year = null;
          this.values = null;
          this.snackbar4 = true;
      });
    },
  },
};
</script>

<style></style>
