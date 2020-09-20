<template>
  <v-app id="inspire">
    <!-- <v-navigation-drawer
      v-if="loggedIn"
      v-model="drawer"
      app
      clipped
      temporary
      color="orange darken-3"
    >
      <v-list dense>
        <template v-for="(item, i) in items">
          <v-row v-if="item.heading" :key="i" align="center">
            <v-col cols="6">
              <v-subheader v-if="item.heading">{{ item.heading }}</v-subheader>
            </v-col>
            <v-col cols="6" class="text-right"> -->
              <!-- <v-btn small text>edit</v-btn> -->
            <!-- </v-col>
          </v-row>
          <v-divider v-else-if="item.divider" :key="i" dark class="my-4" />
          <v-list-item v-else :key="i" link :to="item.route">
            <v-list-item-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>{{ item.text }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>
    </v-navigation-drawer> -->

    <v-app-bar app v-if="loggedIn" clipped-left color="black">
      <!-- <v-app-bar-nav-icon @click.stop="drawer = !drawer" color="orange darken-3"/> -->
      <v-toolbar-title id="ff"><v-img link to="/recommended" src="@/assets/Krisp.png"></v-img>
      </v-toolbar-title>
       <v-btn id="ff" v-if="loggedIn" text to="/recommended">
        Home
      </v-btn>
      <v-btn id="ff" v-if="loggedIn" text to="/watchlist">
        Watch List
      </v-btn>
      <v-btn id="ff" v-if="loggedIn" text to="/search">
        Search
      </v-btn>
      <v-btn id="ff" v-if="loggedIn" text to="/addmovie">
        Add Movie
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn id="ff" v-if="loggedIn" text @click="TryLogout">
        LogOut
      </v-btn>
    </v-app-bar>
    <v-app-bar app v-if="!loggedIn" clipped-left color="black">
      <!-- <v-app-bar-nav-icon @click.stop="drawer = !drawer" color="orange darken-3"/> -->
      <v-toolbar-title id="ff"><v-img  src="@/assets/Krisp.png"></v-img>
      </v-toolbar-title>
       <v-btn id="ff" v-if="loggedIn" text to="/recommended">
        Home
      </v-btn>
      <v-btn id="ff" v-if="!loggedIn" text to="/search_visitor">
        Home
      </v-btn>
      <v-btn id="ff" v-if="loggedIn" text to="/watchlist">
        Watch List
      </v-btn>
      <v-btn id="ff" v-if="loggedIn" text to="/search">
        Search
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn id="ff" v-if="!loggedIn" text to="/login">
        Login |
      </v-btn>
      <v-btn id="ff" v-if="!loggedIn" text to="/register">
        Register
      </v-btn>
      <v-btn id="ff" v-if="loggedIn" text @click="TryLogout">
        LogOut
      </v-btn>
    </v-app-bar>

    <v-main id="bg">
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-fade-transition mode="out-in" hide-on-leave>
            <router-view> </router-view>
          </v-fade-transition>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "App",

  mounted() {},

  data: () => ({
    drawer: null,
    user: {},
    items: [
      {
        icon: "mdi-order-bool-descending",
        text: "Home",
        route: "/",
      },
      {
        icon: "mdi-thumb-up",
        text: "Recommended",
        route: "/recommended",
      },
      {
        icon: "mdi-clipboard-list-outline",
        text: "Watch List",
        route: "/watchlist",
      },
      {
        icon: "mdi-clipboard-list-outline",
        text: "Search",
        route: "/search",
      },
    ],
  }),
  methods: {
    ...mapActions("auth", ["logout"]),
    TryLogout() {
      this.logout();
    },
  },
  computed: {
    ...mapGetters("auth", ["loggedIn"]),
  },
  created() {
    this.$vuetify.theme.dark = true;
  },
};
</script>
<style scoped>
#bg {
  background-image: url("././assets/BG.png");
}
#ff {
  font-family: "Courier New", Courier, monospace;
}
</style>
