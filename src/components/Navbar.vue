<template>  
  <v-app-bar dark src="../assets/cinema.jpg" fixed
      >
      <template v-slot:img="{ props }">
        <v-img v-bind="props" gradient="to top right, rgba(0,0,0,.7), rgba(10,10,10,.9)"></v-img>
      </template>

      <v-toolbar-title>
        <v-img src="../assets/movieHubLogo.png"></v-img>
      </v-toolbar-title>         

    <v-spacer></v-spacer>        
      
      <v-autocomplete
        :search-input.sync="search"
        dark                 
        :items="this.$store.getters.searchResults.results"
        item-text="title"                      
        hide-details
        hide-selected               
        label="Encontre um filme"
        append-icon="mdi-magnify"                     
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
            
            <v-list-item-avatar size="64" style="border-radius:5px;" @click="goToMovie(item)">
              <v-img :src="`https://image.tmdb.org/t/p/original${item.poster_path}`"></v-img>
            </v-list-item-avatar>
            <v-list-item-title v-text="item.title" @click="goToMovie(item)"></v-list-item-title>
                    
        </template>        
      </v-autocomplete>      
      
      <v-spacer></v-spacer>

      <v-btn icon class="d-flex d-md-none">
        <v-icon size="24">mdi-magnify</v-icon>
      </v-btn>


      <form-register v-if="!this.$store.getters.isLogged"></form-register>
      <v-btn v-else @click="logout">Logout</v-btn>   

      <template v-slot:extension>
        <v-tabs style="position: absolute; left: 30px; top:5px;">
          <v-tab :to="{ name: `popular`, params: { sort: 'popular' } }">Populares</v-tab>
          <v-tab :to="{ name: `now`, params: { sort: 'now_playing' } }">Lançamentos</v-tab>
          <v-tab :to="{ name: `top`, params: { sort: 'top_rated' } }">Melhores</v-tab>
          <v-tab :to="{ name: `upcoming`, params: { sort: 'upcoming' } }">Em breve</v-tab>
        </v-tabs>
      </template>
    </v-app-bar>     
  
</template>

<script>
import FormRegister from './FormRegister.vue'

export default {
    components: {
        FormRegister
    },

    data() {
      return {
        search: ''
      }
    },

    watch: {
      search: {
        deep: true,
        handler (input) {
          if (!input) {            
            return ;
          }
          this.$store.dispatch('searchMovie', { query: input })
        }
      }      
    },

    methods: {
      goToMovie(movie) {
        if (!movie) {  
          return;
        } 
        
        this.$router.push({ name: 'movie', params: { movie: movie.id } })  
      },

      logout() {
        this.$store.dispatch('logout')
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