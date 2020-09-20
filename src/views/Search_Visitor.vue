<template>
  <v-container>
    <vue-headful title="Movie Theatre | Search" description="Login To Movie Theatre"/>
    <v-row class="mb-4" align-content="center" justify="center">
      <v-col cols="6">
        <v-text-field
          dark
          color="red darken-3" 
          label="Search For Your Favorite Movie"
          v-model="movie"
          filled
          prepend-inner-icon="mdi-magnify"
          single-line
          shaped
          outlined
          hide-details
          solo-inverted
          @keyup="GetMovies"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row justify="center text-center mt-4" v-show="ShowForm">
      <v-col
        cols="12"
        sm="6"
        md="4"
        lg="3"
        v-for="result in results"
        :key="result.id"
      >
      <v-lazy
        v-model="isActive"
        :options="{
          threshold: .5
        }"
        min-height="200"
        transition="fade-transition"
      >
        <v-card class="mx-auto" max-width="344" >
          <v-img :src="src + result.backdrop_path" height="200px"></v-img>

          <div class="overline">{{ new Date(result.release_date).getFullYear() }}</div>
          <v-card-title >
            {{ result.title }}
          </v-card-title>
          <v-card-actions>
            <v-btn v-if="loggedIn" small @click="addToWatchlist(result.title)" color="orange darken-3">
              <v-icon left>mdi-login-variant</v-icon> Watchlist
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn small rounded @click.stop="movieDialog = true;refreshMovieDialog(result)">
             Show More <v-icon>mdi-chevron-up</v-icon>
            </v-btn>
          </v-card-actions>

          <v-expand-transition>
            <div v-show="show">
              <v-divider></v-divider>

              <v-card-text>
                {{ result.overview }}
              </v-card-text>
            </div>
          </v-expand-transition>
        </v-card>
      </v-lazy>
      </v-col>
      <v-dialog
      v-model="movieDialog"
      max-width="450"
      
    >
      <v-card color="grey darken-3" :loading="movieDialogData.movieid==-1">
        <v-img :src="movieDialogData.movieImage" width="450px"></v-img>
        <v-card-title class="headline">{{movieDialogData.movieName}}</v-card-title>
        <v-spacer></v-spacer>
        <v-card-subtitle class="text-left">
          <v-chip
            class="ma-1"
            color="primary"
            v-for="genreid in movieDialogData.movieGenres"
            :key="genreid"
            small
          >
            {{ genres.find(x => x.id === genreid).name }}
          </v-chip>
        </v-card-subtitle>
        <v-card-text>
          {{movieDialogData.movieDescription}}
        </v-card-text>
          
        <v-card-actions>
          <v-rating
          v-if="loggedIn"
            v-model="rating"
            background-color="white"
            color="yellow accent-4"
            dense
            half-increments
            hover
            size="18"
            @input="addRating($event, movieDialogData.movieid)"
          ></v-rating>
          <v-spacer></v-spacer>
          <v-btn
            text
            @click="movieDialog = false"
          >
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    </v-row>
    
    <v-snackbar v-model="snackbar1" timeout = "3000"> Movie Added To Watchlist</v-snackbar>
    <v-snackbar v-model="snackbar2" timeout = "5000"> This Movie Was out of our reach and not added </v-snackbar>
    <v-snackbar v-model="snackbar3" timeout = "1000"> Failure </v-snackbar>
    <v-snackbar v-model="snackbar4" timeout = "3000"> Thanks For Your Rating</v-snackbar>
  </v-container>
</template>

<script>
import { mapGetters} from "vuex";
import ApiService from "../services/api.service";
export default {
  name: "Home",

  mounted() {
    //   ApiService.get(
    //   `https://api.themoviedb.org/3/search/movie?api_key=18ba471261d253fb5c574c6f1de06e76&query="+${this.movie}"`
    // ).then((r) => {
    //   if (r.status == 200) {
    //     this.movies = r.data;
    //     this.results = this.movies.results;
    //     this.descriptions = this.results.map((s) => ({
    //       description: s.overview,
    //     }));
    //     this.ShowTime = false;
    //   } else {
    //     console.log(r);
    //   }
    //   console.log(this.results);
    // });
  },
  data: () => ({
    rating: 4.3,
    movieDialog: false,
    movieDialogData : {
      movieid: -1,
      movieName: '',
      movieRating: 0,
      movieDescription: "",
      movieGenres: [],
      movieImage: "",
    },
    show: false,
    movies: [],
    results: [],
    descriptions: [],
    movie: "",
    ShowForm: false,
    snackbar1:false,
    snackbar2:false,
    snackbar3:false,
    snackbar4:false,
    src: "https://image.tmdb.org/t/p/original",
    genres: [
      {
        id: 28,
        name: "Action"
      },
      {
        id: 12,
        name: "Adventure"
      },
      {
        id: 16,
        name: "Animation"
      },
      {
        id: 35,
        name: "Comedy"
      },
      {
        id: 80,
        name: "Crime"
      },
      {
        id: 99,
        name: "Documentary"
      },
      {
        id: 18,
        name: "Drama"
      },
      {
        id: 10751,
        name: "Family"
      },
      {
        id: 14,
        name: "Fantasy"
      },
      {
        id: 36,
        name: "History"
      },
      {
        id: 27,
        name: "Horror"
      },
      {
        id: 10402,
        name: "Music"
      },
      {
        id: 9648,
        name: "Mystery"
      },
      {
        id: 10749,
        name: "Romance"
      },
      {
        id: 878,
        name: "Science Fiction"
      },
      {
        id: 10770,
        name: "TV Movie"
      },
      {
        id: 53,
        name: "Thriller"
      },
      {
        id: 10752,
        name: "War"
      },
      {
        id: 37,
        name: "Western"
      }
    ]
  }),
  methods: {
    GetMovies() {
      if (this.movie) {
        ApiService.get(
          `https://api.themoviedb.org/3/search/movie?api_key=18ba471261d253fb5c574c6f1de06e76&query=${this.movie}`
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
    addToWatchlist(name){
      ApiService.get(
        `http://movierecommendationapi-prod.eu-central-1.elasticbeanstalk.com/api/Movies/SearchMovie/${name}`
      ).then((r) => {
        if (r.status == 200) {
          console.log(r.data[0].id);
          ApiService.post(
            `http://movierecommendationapi-prod.eu-central-1.elasticbeanstalk.com/api/WatchList`
          ,{movieId: r.data[0].id,userId: 283229}).then(() => {
              this.snackbar1 = true
          }).catch(function (error) {
            console.log(error);
          });
        } else {
          this.snackbar2 = true;
          console.log(r);
        }
      });
    },
    refreshMovieDialog(result){
      this.movieDialogData.movieid = -1
      ApiService.get(
        `http://movierecommendationapi-prod.eu-central-1.elasticbeanstalk.com/api/Movies/SearchMovie/${result.title}`
      ).then((r) => {
        if (r.status == 200) {
          this.movieDialogData.movieid = r.data[0].id
          this.movieDialogData.movieName = result.title
          this.movieDialogData.movieRating = 0
          this.movieDialogData.movieDescription = result.overview
          this.movieDialogData.movieGenres = result.genre_ids
          this.movieDialogData.movieImage = this.src + result.backdrop_path
        } else {
          this.snackbar3 = true;
          console.log(r);
        }
      });
    },
    addRating(value, id) {
      ApiService.post(
        `http://movierecommendationapi-prod.eu-central-1.elasticbeanstalk.com/api/Ratings/RateMovie/`
      ,{movieId: id,userId: value}).then(() => {
          this.snackbar4 = true
      }).catch(function (error) {
          this.snackbar2 = true;
        console.log(error);
      });
    }
  },
  computed: {
    ...mapGetters("auth", ["loggedIn"]),
  },
};
</script>
<style scoped></style>
