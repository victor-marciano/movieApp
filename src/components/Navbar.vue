<template>
  <div>
    
  <!-- <v-app-bar absolute dark src="https://i.picsum.photos/id/274/3824/2520.jpg" fade-img-on-scroll> -->
  <v-app-bar absolute dark src="../assets/cinema.jpg" fade-img-on-scroll>
      <template v-slot:img="{ props }">
        <v-img v-bind="props" gradient="to top right, rgba(0,0,0,.7), rgba(10,10,10,.9)"></v-img>
      </template>

      <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>


      <v-toolbar-title>
        <v-img src="../assets/movieHubLogo.png"></v-img>
      </v-toolbar-title>         

    <v-spacer></v-spacer>        
      
      <v-autocomplete
        dark                 
        :items="this.$store.getters.someMovies"
        item-text="title"                      
        hide-details
        hide-selected               
        label="Encontre um filme"
        append-icon="mdi-magnify"        
        clearable              
        solo 
        class="d-none d-sm-flex"              
      >
        <template v-slot:no-data>
          <v-list-item>
            <v-list-item-title>
              Nenhum filme encontrado.
            </v-list-item-title>
          </v-list-item>
        </template>     
        <template v-slot:item="{ item }">         
            <v-list-item-avatar size="64" style="border-radius:5px;">
              <v-img :src="item.url"></v-img>
            </v-list-item-avatar>
            <v-list-item-title v-text="item.title"></v-list-item-title>         
        </template>        
      </v-autocomplete>      
      
      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon size="24">mdi-magnify</v-icon>
      </v-btn>
      
      <form-register></form-register>     

      <template v-slot:extension>
        <v-tabs align-with-title>
          <v-tab to="/">Populares</v-tab>
          <v-tab to="/lancamentos">Lançamentos</v-tab>
          <v-tab to="/melhores">Melhores</v-tab>
          <v-tab to="/chegando">Em breve</v-tab>
        </v-tabs>
      </template>
    </v-app-bar>    
      <v-navigation-drawer dark v-model="drawer" absolute temporary>
        <v-list nav dense>
          <v-list-item-group v-model="group">
            <v-list-item>
              <v-list-item-icon>
                <v-icon>mdi-home</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Início</v-list-item-title>
            </v-list-item>

            <v-list-item>
              <v-list-item-icon>
                <v-icon>mdi-login</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Cadastro/Login</v-list-item-title>
            </v-list-item>

          </v-list-item-group>
        </v-list>
      </v-navigation-drawer>
  </div>
</template>

<script>
import FormRegister from './FormRegister.vue'

export default {
    components: {
        FormRegister
    },

    data() {
      return {
        drawer: false,
      }
    },
}
</script>

<style lang="scss">
  .v-app-bar__nav-icon {
    @media (min-width: 991px) {
      display: none;
    }
  }

  @media (max-width: 991px) {
    .v-slide-group {
      right: 25px;
    }

    .v-slide-group__prev, .v-slide-group__prev--disabled {
      display: none !important;
    }
  }

</style>