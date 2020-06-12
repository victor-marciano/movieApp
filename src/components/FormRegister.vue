<template>
    <v-row justify="center">
        <v-dialog v-model="dialog" dark persistent max-width="500px">
        <template v-slot:activator="{ on, attrs }">
            <v-btn dark v-bind="attrs" v-on="on">Cadastro/Login</v-btn>
        </template>        
                                    
        <v-tabs vertical dark>
            <v-tab>Cadastro</v-tab>
            <v-tab>Login</v-tab>

            <v-tab-item> 
                <v-card flat dark class="authCard">
                    <v-container>
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
                    <v-btn dark>Enviar</v-btn>              
                    </v-container>
                </v-card>              
            </v-tab-item>
            <v-tab-item>  
                <v-card flat dark class="authCard">
                    <v-container>
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
                        <v-btn dark>Enviar</v-btn>              
                    </v-container>                
                </v-card>        
                                                        
            </v-tab-item>
        </v-tabs>                                    
        
    </v-dialog>
  </v-row>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
    .authCard {
        border-radius: 0 !important;
    }
</style>