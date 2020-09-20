<template>
    <div>
        <vue-headful title="Movie Theatre | Register" description="Register To Movie Theatre"/>
        <v-card dark class="mx-auto card elevation-12" min-width="600px" >
            <v-toolbar color="orange darken-3" dark flat>
                <v-toolbar-title>Register To Movie Theatre</v-toolbar-title>
                <v-spacer />
                <v-icon>mdi-movie-filter</v-icon>
            </v-toolbar>
            <v-card-text>
                <v-form ref="form" v-model="valid" lazy-validation>
                    <v-row>
                        <v-col cols="12" md="4" >
                            <v-text-field dark label="First Name" name="firstName" type="text" v-model="firstName" :rules="nameRules" required/>
                        </v-col>

                        <v-col cols="12" md="4">
                            <v-text-field dark label="Last Name" name="lastName" type="text" v-model="lastName" :rules="nameRules" required/>
                        </v-col>
                        <v-col cols="12" md="4">
                            <v-text-field dark label="Username" name="Username" type="text" v-model="username" :rules="usernameRules" required/>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12" md="12">
                            <v-text-field dark label="E-mail"  name="email" type="text" v-model="email" :rules="emailRules" required/>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12" md="7">
                            <v-text-field dark label="Phone Number" name="phonenumber" type="text" v-model="phonenumber" :rules="phonenumRules" required/>
                        </v-col>
                        <v-col cols="12" md="5  ">
                            <v-text-field dark label="Password" name="password" type="password" v-model="password" :rules="passwordRules" required/>
                        </v-col>
                    </v-row>
                </v-form>
            </v-card-text>
            <v-card-actions>
                <v-spacer />
                    <v-btn text color="grey lighten-4" to="login">Login </v-btn>
                <v-btn color="orange darken-3" @click="tryRegister">Register NOW <v-icon right>mdi-account-plus</v-icon></v-btn>
            </v-card-actions>

        </v-card>
        <v-snackbar v-model="snackbar1" timeout = "3000"> Complete You Information as needed </v-snackbar>
        <v-snackbar v-model="snackbar2" timeout = "1000"> Registered </v-snackbar>
    </div>
</template>

<script>
    import { mapGetters, mapActions } from "vuex";
    export default {
        name: "register",
        data: () => ({
            firstName: '',
            lastName: '',
            email: '',
            username: '',
            password: '',
            phonenumber:'',
            snackbar1:false,
            snackbar2:false,
            valid: true,
            nameRules: [
                v => !!v || 'Your Full Name is Required',
                v => (v || '').length >= 2 || 'Min 2 characters',
                v => (v || '').length <= 26 || 'Max 26 characters',
            ],
            emailRules: [
                v => !!v || 'E-mail is required',
                v => /.+@.+/.test(v) || 'E-mail must be valid',
            ],
            usernameRules: [
                v => !!v || 'Username is required',
                v => (v || '').length >= 2 || 'Min 8 characters',
                v => (v || '').length <= 15 || 'Max 15 characters',
            ],
            passwordRules: [
                v => (v || '').length >= 6 || 'Min 6 characters',
            ],
        }),
        mounted() {
            console.log(this)
        },
        methods: {
            ...mapActions('auth', ['register']),
            tryRegister(){
                if (this.$refs.form.validate()) {
                    //Success
                    this.snackbar2 = true
                    this.register({username: this.username, password: this.password, firstname: this.firstName, lastname: this.lastName, email: this.email, phonenumber: this.phonenumber}).then(r => {
                        if(!r){
                            this.snackbar = true
                            this.loading = false
                        }
                    })
                }else{
                    //Validation Error
                    this.snackbar1 = true
                }
            },
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