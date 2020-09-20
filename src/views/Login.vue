<template>
  <div>
    <vue-headful title="Movie Theatre | Login" description="Login To Movie Theatre"/>
    <v-slide-y-transition>
      <v-card dark class="mx-auto card elevation-12" min-width="600px" >
        <v-toolbar color="orange darken-3" dark flat>
          <v-toolbar-title>Login To Movie Theatre</v-toolbar-title>
          <v-spacer />
          <v-icon>mdi-movie-filter</v-icon>
        </v-toolbar>
        <v-card-text>
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-text-field dark label="Username" name="Username" prepend-icon="mdi-account" type="text" v-model="username" :rules="requiredRules" required/>
            <v-text-field dark label="Password" name="password" prepend-icon="mdi-lock" type="password" v-model="password" :rules="requiredRules" required/>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn text color="grey lighten-4" to="register">Register</v-btn>
          <v-btn color="orange darken-3" @click="tryLogin" :loading="loading">Login  <v-icon right>mdi-login-variant</v-icon></v-btn>
        </v-card-actions>
      </v-card>
    </v-slide-y-transition>
    <v-snackbar v-model="snackbar1" timeout = "3000"> Fill Required Fields</v-snackbar>
    <v-snackbar v-model="snackbar2" timeout = "5000"> Wrong Username or Password </v-snackbar>
    <v-snackbar v-model="snackbar3" timeout = "1000"> Signed In </v-snackbar>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
  export default {
    name: "login",
    data: () => ({
      username: '',
      password: '',
      loading:false,
      snackbar1:false,
      snackbar2:false,
      snackbar3:false,
      timeout:1000,
      valid: true,
      requiredRules: [
        v => !!v || 'This Field Required',
      ],
    }),
    mounted(){
      
    },
    methods:{
      ...mapActions('auth', ['login']),
        tryLogin() {
          this.loading = true
            // Perform a simple validation that email and password have been typed in
            if (this.$refs.form.validate()) {
                this.login({username: this.username, password: this.password}).then(r => {
                  if(!r){
                    this.snackbar2 = true
                    this.loading = false
                  }
                })
            }else{
              this.snackbar1 = true
              this.loading = false
            }
        }
    },
    computed: {
        ...mapGetters('auth', [
            'authenticating',
            'authenticationError',
            'authenticationErrorCode',
            'authenticationSuccess'
        ])
    },
  };
</script>

<style>
</style>