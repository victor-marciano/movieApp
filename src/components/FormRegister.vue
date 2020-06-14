<template>
    <v-row justify="center">
        <v-dialog v-model="dialog" dark persistent max-width="500px">
        <template v-slot:activator="{ on, attrs }">
            <v-btn dark v-bind="attrs" v-on="on">Cadastro/Login</v-btn>
        </template>     

        <v-snackbar app top v-model="success" color="success" icon="mdi-material-design" :timeout="4000">
            Registrado com sucesso                        
        </v-snackbar>   
                                    
        <v-tabs vertical dark>
            <v-tab>Cadastro</v-tab>
            <v-tab>Login</v-tab>

            <v-tab-item> 
                <v-card flat dark class="authCard">
                    <v-container>
                        <v-form @submit.prevent="register" v-model="valid" lazy-validation>
                            <v-row>   
                                <v-col cols="8">
                                    <v-text-field :rules="emailRules" v-model="email" label="Email*" required></v-text-field>
                                </v-col>
                                <v-col cols="8">
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
                                    <v-text-field label="Email*" required></v-text-field>
                                </v-col>
                                <v-col cols="8">
                                    <v-text-field label="Senha*" type="password" required></v-text-field>
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
</template>

<script>
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
      register () {    
          console.log(this.valid)
        this.loading = true
        setTimeout(() => {
            this.loading = false
        }, 3000)
        this.success = true
      },
      
      auth () {    
        this.loading = true
        setTimeout(() => {
            this.loading = false
        }, 3000)
        this.success = true
      },
    },

    computed: {
        isLoading() {
            return this.loading
        },

        isValid() {
            return this.valid
        }
    },
}
</script>

<style lang="scss" scoped>
    .authCard {
        border-radius: 0 !important;
    }
</style>