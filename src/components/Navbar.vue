<template>
  <div>    
  
  <v-app-bar dark src="../assets/cinema.jpg" fade-img-on-scroll >
      <template v-slot:img="{ props }">
        <v-img v-bind="props" gradient="to top right, rgba(0,0,0,.7), rgba(10,10,10,.9)"></v-img>
      </template>

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

      <v-btn icon class="d-flex d-md-none">
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