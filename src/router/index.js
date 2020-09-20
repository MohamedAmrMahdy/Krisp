import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../views/Home.vue'
import Recommended from '../views/Recommendation.vue'
import Watchlist from '../views/Watchlist.vue'
import MovieD from '../views/Movie_Details.vue'
import SearchV from '../views/Search.vue'
import Search from '../views/Search_Visitor.vue'
import AddMovie from '../views/Add_Movie.vue'

import { TokenService } from '../services/storage.service'

Vue.use(VueRouter)
const router = new VueRouter({
  mode: 'history',
  base: '',
  routes : [
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
      path: '/recommended',
      name: 'Recommended',
      component: Recommended
    },
    {
      path: '/search_visitor',
      name: 'Search',
      component: Search,
      meta: {
        public: true,  // Allow access to even if not logged in
        onlyWhenLoggedOut: true
      }
    },
    {
      path: '/search',
      name: 'Search',
      component: SearchV,
    },
    {
      path: '/addmovie',
      name: 'AddMovie',
      component: AddMovie,
    },
    {
      path: '/movie_details/:movietitle/:release_date',
      name: 'MovieDetails',
      component: MovieD
    },
    {
      path: '/watchlist',
      name: 'Watchlist',
      component: Watchlist
    },
    {
      path:'/login',
      name:'Login',
      component: function() {
        return import('../views/Login.vue')
      },
      meta: {
        public: true,  // Allow access to even if not logged in
        onlyWhenLoggedOut: true
      }
    },
    {
      path:'/register',
      name:'Register',
      component: function() {
        return import('../views/Register.vue')
  
      },
      meta: {
        public: true,  // Allow access to even if not logged in
        onlyWhenLoggedOut: true
      }
    },
    
  ]
})

router.beforeEach((to, from, next) => {
  const isPublic = to.matched.some(record => record.meta.public)
  const onlyWhenLoggedOut = to.matched.some(record => record.meta.onlyWhenLoggedOut)
  const loggedIn = !!TokenService.getToken();

  if (!isPublic && !loggedIn) {
    if(to.fullPath == "/register"){
      return next({
        path:'/register'
      });
    }else{
      return next({
        path:'/login',
        query: {redirect: to.fullPath}  // Store the full path to redirect the user to after login
      });
    }
    //console.log(to.fullPath)
    
  }

  // Do not allow user to visit login page or register page if they are logged in
  if (loggedIn && onlyWhenLoggedOut) {
    return next('/')
  }

  next();
})


export default router
