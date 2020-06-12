<template>
  <v-app-bar absolute dark src="https://i.picsum.photos/id/274/3824/2520.jpg" fade-img-on-scroll>
      <template v-slot:img="{ props }">
        <v-img v-bind="props" gradient="to top right, rgba(0,0,0,.8), rgba(10,10,10,.9)"></v-img>
      </template>

      <v-app-bar-nav-icon></v-app-bar-nav-icon>
      <v-toolbar-title>
        <v-img src="../assets/movieHubLogo.png"></v-img>
      </v-toolbar-title>         

    <v-spacer></v-spacer>
        
      <v-text-field v-model="search" placeholder="Encontre um filme" full-width append-icon="mdi-magnify"></v-text-field>          
      <v-menu dark absolute max-height="500px" max-width="300px" v-model="menu" :z-index="999">        
        <v-list v-for="(movie, index) in finded" :key="index">
          <v-list-item to="/teste">
            <v-list-item-title>{{ movie.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>  
      <v-spacer></v-spacer>

      <form-register></form-register>     

      <template v-slot:extension>
        <v-tabs align-with-title>
          <v-tab to="/populares">Populares</v-tab>
          <v-tab to="/lancamentos">Lançamentos</v-tab>
          <v-tab to="/melhores">Melhores</v-tab>
          <v-tab to="/chegando">Em breve</v-tab>
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
        search: '',
        finded: [],
        movies: [],
        menu: false
      }
    },

    created() {
      this.movies = this.$store.getters.someMovies
    },

    watch: {
      search: {
        handler (input) { 
          this.finded = this.movies.filter(movie =>  movie.title.includes(input))  
          this.menu = input ? true : false  
          console.log(this.menu)
        },
        deep: true
      }
    },

    computed: {
      getFinded() {
        return this.finded
      },
      showMenu () {
        return this.menu
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
</style>