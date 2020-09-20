<template>
  <v-main>
    <div class="overline">Recommended</div>
  </v-main>
</template>

<script>
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

  }),
  methods: {

  },
};
</script>
<style scoped></style>
