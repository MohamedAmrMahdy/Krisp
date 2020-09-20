<template>
  <v-main>
     <vue-headful title="Movie Theatre | Watch List" description="Login To Movie Theatre"/>
      <div class="overline text-center">Your Watch List Movies</div>
      <v-carousel>
        <v-carousel-item
          v-for="(slide,i) in slides"
          :key="i"
          :src="src + slide.image"
          reverse-transition="fade-transition"
          transition="fade-transition"
          gradient="to bottom, rgba(0,0,0,.5), rgba(0,0,0,.3)"
        >
        <v-col>
          <v-row  class="fill-height ma-15"
          align="center"
          justify="center">
            <div class="display-3 text-center">{{slide.name}}</div>
          </v-row>
          <v-row  class="fill-height ma-15"
          align="center"
          justify="center" >
            <v-btn small color="red" rounded class='ma-2' @click="removeFromWatchlist(slide.id,i)">
              Remove From WatchList
            </v-btn>
          </v-row>
        </v-col>
      </v-carousel-item>
    </v-carousel>
  </v-main>
</template>

<script>
import ApiService from "../services/api.service";

import { TokenService } from '../services/storage.service';

export default {
  name: "Home",

  mounted() {
    let userId = TokenService.getUserId()
    ApiService.get(
      `http://movierecommendationapi-prod.eu-central-1.elasticbeanstalk.com/api/WatchList/UserWatchList/${userId}`
    ).then((r) => {
      if (r.status == 200) {
        r.data.watchList.forEach(watchListItem => {
          ApiService.get(
          `https://api.themoviedb.org/3/search/movie?api_key=18ba471261d253fb5c574c6f1de06e76&query=${watchListItem.title}`
          ).then((r) => {
            if (r.status == 200) {
              this.movies = r.data.results[0]
              let image = ''
              if (r.data.results[0]){
                image = r.data.results[0].backdrop_path
              }else{
                image = null
              }
             
              this.slides.push({id:watchListItem.id,movieId:watchListItem.movieId,name:watchListItem.title,image:image})
            } else {
              console.log(r);
            }
            
          });
        });
        console.log(this.slides);
      } else {
        console.log(r);
      }
    });
  },
  data: () => ({
    slides: [],
    src: "https://image.tmdb.org/t/p/original",
  }),
  methods: {
    removeFromWatchlist(watchlistID, index){
      ApiService.delete(
      `http://movierecommendationapi-prod.eu-central-1.elasticbeanstalk.com/api/WatchList/${watchlistID}`
      ).then((r) => {
        if (r.status == 200) {
          this.slides.splice(index, index+1);
          console.log(r);
        } else {
          console.log(r);
        }
      });
    },
  },
};
</script>
<style scoped></style>
