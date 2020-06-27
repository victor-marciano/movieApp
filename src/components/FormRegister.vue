<template>
    <div>        
        <v-row justify="center">
            <v-dialog v-model="dialog" dark max-width="500px">
            <template v-slot:activator="{ on, attrs }">
                <v-btn dark v-bind="attrs" v-on="on" class="d-none d-sm-flex">Cadastro/Login</v-btn>                
                <v-btn dark v-bind="attrs" v-on="on" class="d-flex d-sm-none" icon>
                    <v-icon>mdi-login</v-icon>    
                </v-btn>                
            </template>     

            <v-snackbar app top v-model="success" color="success" icon="mdi-material-design" :timeout="4000">
                Registrado com sucesso                        
            </v-snackbar>   
                                        
            <v-tabs :vertical="!isMobile" dark centered>
                <v-tab>Cadastro</v-tab>
                <v-tab>Login</v-tab>

                <v-tab-item> 
                    <v-card flat dark class="authCard">
                        <v-container>
                            <v-form @submit.prevent="register" v-model="valid" lazy-validation>
                                <v-row>   
                                    <v-col cols="12" md="8">
                                        <v-text-field :rules="emailRules" v-model="email" label="Email*" required></v-text-field>
                                    </v-col>
                                    <v-col cols="12" md="8">
                                        <v-text-field :rules="passwordRules" v-model="password" label="Senha*" type="password" required></v-text-field>
                                    </v-col>                           
                                </v-row>                    
                                <small>*Campos obrigatórios</small> 
                                <br><br><br>
                                <v-btn dark type="submit" :disabled="!isValid">
                                    <v-progress-circular v-show="isLoading" :size="15" indeterminate></v-progress-circular>
                                    Enviar
                                </v-btn>             
                            </v-form>                                   
                        </v-container>
                    </v-card>              
                </v-tab-item>
                <v-tab-item>  
                    <v-card flat dark class="authCard">
                        <v-container>
                            <v-form @submit.prevent="auth">
                                <v-row>     
                                    <v-col cols="8">
                                        <v-text-field v-model="email" label="Email*" required></v-text-field>
                                    </v-col>
                                    <v-col cols="8">
                                        <v-text-field v-model="password" label="Senha*" type="password" required></v-text-field>
                                    </v-col>
                                </v-row>
                                <small>*Campos obrigatórios</small>
                                <br><br><br>
                                <v-btn dark type="submit" :disabled="!isValid">
                                    <v-progress-circular v-show="isLoading" :size="15" indeterminate></v-progress-circular>
                                    Enviar
                                </v-btn>              
                            </v-form>                                     
                        </v-container>                
                    </v-card>                                                       
                </v-tab-item>
            </v-tabs>       
        </v-dialog>
    </v-row>
    </div>
</template>

<script>

import firebase from 'firebase'
import { db } from '../config/firebase'
import axios from 'axios'

export default {
    name: 'form-register',
    data() {
        return {
            valid: true,
            email: '',
            password: '',
            emailRules: [
                v => !!v || 'E-mail é obrigatório',
                v => /.+@.+/.test(v) || 'E-mail inválido',
            ],
            passwordRules: [
                v => !!v || 'Senha é obrigatória'    
            ],
            loading: false,
            success: false
        }
    },

    methods: {
      async register () {    
        try {    
            this.loading = true  
            
            const result = await firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
            const response = await axios.get(`https://api.themoviedb.org/3/authentication/guest_session/new?api_key=${process.env.VUE_APP_MOVIEDB_API_KEY}`)            
            await db.ref('users/' + result.user.uid).set({
                email: result.user.email,
                guest_token: response.data.guest_session_id
            })

            this.success = true
        } catch (error) {
            console.log(error.message)
        } finally {
            this.loading = false
        }  
      }, 

      async auth () {  
        try {
            this.loading = true    
            await this.$store.dispatch('login', { email: this.email, password: this.password })
            this.success = true
        } catch (error) {
            console.log(error.message)
        } finally {
            this.loading = false
        }
        
      },
    },

    computed: {
        isLoading() {
            return this.loading
        },

        isValid() {
            return this.valid
        },

        isMobile () {
          return screen.width < 991 ? true : false
        }
    },
}
</script>

<style lang="scss" scoped>
    .authCard {
        border-radius: 0 !important;
    }
</style>