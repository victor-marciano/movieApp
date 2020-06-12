<template>
  <section class="home"> 
    <v-container>       
      <slider></slider>
      <div>          
        <h2>Todos os filmes</h2>
        <v-row>
          <v-col v-for="(movie, index) in someMovies" :key="index">
            <v-card class="mx-auto" max-width="200" width="150px" shaped>
                <v-img class="white--text align-end" height="300px" :src="movie.url">
                <v-card-title>{{ movie.title }}</v-card-title>
                </v-img>            
            </v-card>
          </v-col>
        </v-row>
      </div> 
      <div class="text-center mt-5">
        <v-pagination dark v-model="page" :length="4" prev-icon="mdi-menu-left" next-icon="mdi-menu-right"></v-pagination>
      </div>
    </v-container>    
  </section>
</template>

<script>
import Slider from '@/components/Slider.vue'

export default {
  name: 'Home',
  components: {
    Slider    
  },
  
  computed: {    
      someMovies() {
          return this.$store.getters.someMovies
      }    
  },
}
</script>

<style lang="scss" scoped>  
  .home {
    background-color: lighten(black, 3%);
    color: white;   
  }
</style>
