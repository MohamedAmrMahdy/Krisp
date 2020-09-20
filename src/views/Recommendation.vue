<template>
  <v-container>
    <vue-headful
      title="Movie Theatre | Recommended"
      description="Login To Movie Theatre"
    />
    <v-row justify="start" align-start style="height: 500px;">
      <h1>Recommended Movies</h1>
      <v-col cols="12" sm="12" md="12" lg="12">
        <v-sheet
          class="mx-auto"
          elevation="8"
          max-width="1300"
          color="transparent"
        >
          <v-slide-group
            v-model="model"
            class="pa-4"
            active-class="transparent"
            show-arrows
          >
            <v-slide-item v-for="result in recommended" :key="result.id">
              <v-card
                class="mx-auto pa-5 transition-swing card"
                color="transparent"
                width="200"
                link
                :to="movieDetails + result.title + '/' + result.year"
              >
                <v-img
                  :src="result.image"
                  class="white--text align-end"
                  gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                  height="200px"
                >
                  <v-card-title
                    class="subtitle-1"
                    v-text="result.title"
                  ></v-card-title>
                </v-img>

                <v-divider></v-divider>
                <v-card-text>
                  <v-row>
                    <v-col cols="12">
                      <v-list class="transparent">
                        <!-- <v-list-item>
                          <v-list-item-title class="text-center">{{
                            genres.find((x) => x.id === result.genre_ids[0])
                              .name
                          }}</v-list-item-title>
                        </v-list-item> -->
                        <v-list-item>
                          <v-list-item-title class="text-center">{{
                            result.year
                          }}</v-list-item-title>
                        </v-list-item>
                      </v-list>
                    </v-col>
                  </v-row>
                </v-card-text>
              </v-card>
            </v-slide-item>
          </v-slide-group>
        </v-sheet>
        <!-- <v-carousel
          
          height="400"
          hide-delimiters
          show-arrows-on-hover
          
        >
          <v-carousel-item v-for="result in results" :key="result">
            <v-card  class="mx-auto pa-5 transition-swing card" dark width="250">
              <v-img
                :src="src + result.poster_path"
                class="white--text align-end"
                gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                height="200px"
              >
                <v-card-title v-text="result.title"></v-card-title>
              </v-img>

              <v-divider></v-divider>
              <v-card-text>
                <v-row>
                  <v-col cols="12">
                    <v-list class="transparent">
                      <v-list-item>
                        <v-list-item-title>Release Date :</v-list-item-title>
                        <v-list-item-subtitle class="text-right">{{
                          new Date(result.release_date).getFullYear()
                        }}</v-list-item-subtitle>
                      </v-list-item>
                      <v-list-item>
                        <v-list-item-title>Over View:</v-list-item-title>
                        <v-list-item-subtitle class="text-right">{{
                          result.overview
                        }}</v-list-item-subtitle>
                      </v-list-item>
                    </v-list>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-carousel-item>
        </v-carousel> -->
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import ApiService from "../services/api.service";

export default {
  mounted() {
    this.GetMovie();
  },
  data: () => ({
    searchQuery: [],
    recommended: null,
    movieTitles: [],
    show: false,
    movieDetails: "/movie_details/",
    results: [],
    descriptions: [],
    movie: "",
    ShowForm: false,
    snackbar1: false,
    snackbar2: false,
    snackbar3: false,
    rating: 0.0,
    genres: [
      {
        id: 28,
        name: "Action",
      },
      {
        id: 12,
        name: "Adventure",
      },
      {
        id: 16,
        name: "Animation",
      },
      {
        id: 35,
        name: "Comedy",
      },
      {
        id: 80,
        name: "Crime",
      },
      {
        id: 99,
        name: "Documentary",
      },
      {
        id: 18,
        name: "Drama",
      },
      {
        id: 10751,
        name: "Family",
      },
      {
        id: 14,
        name: "Fantasy",
      },
      {
        id: 36,
        name: "History",
      },
      {
        id: 27,
        name: "Horror",
      },
      {
        id: 10402,
        name: "Music",
      },
      {
        id: 9648,
        name: "Mystery",
      },
      {
        id: 10749,
        name: "Romance",
      },
      {
        id: 878,
        name: "Science Fiction",
      },
      {
        id: 10770,
        name: "TV Movie",
      },
      {
        id: 53,
        name: "Thriller",
      },
      {
        id: 10752,
        name: "War",
      },
      {
        id: 37,
        name: "Western",
      },
    ],
  }),
  methods: {
    GetMovies() {
      if (this.movie) {
        ApiService.get(
          `https://api.themoviedb.org/3/movie/${this.id}?api_key=18ba471261d253fb5c574c6f1de06e76`
        ).then((r) => {
          if (r.status == 200) {
            this.movies = r.data;
            this.results = this.movies.results;
            this.descriptions = this.results.map((s) => ({
              description: s.overview,
            }));
            this.ShowForm = true;
          } else {
            console.log(r);
          }
        });
      }
    },
    GetMovie() {
      let movies = [];
      ApiService.get(
        `http://movierecommendationapi-prod.eu-central-1.elasticbeanstalk.com/api/Recommendations/UserRecommendation`
      ).then((data) => {
        if (data.status == 200) {
          movies = data.data.recommendations;
          for (let i = 0; i < movies.length; i++) {
            ApiService.get(
              `https://api.themoviedb.org/3/search/multi?api_key=18ba471261d253fb5c574c6f1de06e76&query=${movies[i].title}`
            ).then((r) => {
              if (r.status == 200) {
                if (r.data.results[0].poster_path != null) {
                  movies[i].image =
                    "https://image.tmdb.org/t/p/original" +
                    r.data.results[0].poster_path;
                } else if (r.data.results[0].poster_path == null) {
                  movies[i].image =
                    "https://media.comicbook.com/files/img/default-movie.png";
                }
                movies[i].id++;
              } else {
                console.log(r);
              }
              console.log(movies[i].image);
            });
          }
          this.recommended = movies;
          console.log(this.recommended);
        } else {
          console.log(data);
        }
      });
    },
  },
};
</script>

<style></style>
