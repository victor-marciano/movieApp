<template>
  <section class="home">        
        <v-img :src="`https://image.tmdb.org/t/p/original/${getMovies[0].backdrop_path}`" style="opacity: 0.9;">
          <template v-slot.placeholder>
            <div style="width:350px; padding: 15px;">
              <h1 style="padding-bottom: 25px; font-size: 48px;">{{getMovies[0].title}}</h1>
              <p style="font-size:16px;">{{getMovies[0].overview}}</p>            
            </div>
          </template>
        </v-img> 
        <v-container fluid>

          <h2>Todos os filmes</h2>
          <v-row>
            <v-col v-for="(movie, index) in getMovies" :key="index">
              <v-hover v-slot:default="{ hover }">       
                <v-card :to="{ name: `movie`, params: { movie: movie.id } }" class="mx-auto card-movie" shaped :elevation="hover ? 12 : 2" :class="{ 'on-hover': hover }">
                    <v-img class="white--text align-end" height="400px" :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`"></v-img>                        
                    <v-expand-transition>
                      <div v-if="hover" class="d-flextransition-fast-in-fast-out v-card--reveal"
                        style="height: 70%;"
                      >
                        <div class="flex-row mt-3 float-left" style="width: 150px;">
                          <h5>{{ movie.title }}</h5>
                        </div>
                        <v-avatar color="indigo" size="42" class="flex-row mt-3">
                          <span class="white--text headline">{{ movie.vote_average }}</span>
                        </v-avatar>
                        <p style="font-size:12px; clear:both;" class="flex-row mt-5">{{ movie.overview }}</p>
                      </div>
                    </v-expand-transition>
                </v-card>
              </v-hover>
            </v-col>
          </v-row>
        </v-container>
      
      <div class="text-center mt-5">
        <v-container>
          <v-pagination dark v-on:input="updateMovies" v-model="actualPage" :length="pages" prev-icon="mdi-menu-left" next-icon="mdi-menu-right"></v-pagination>
        </v-container>
      </div>
        
  </section>
</template>

<script>

export default {
  name: 'Home',  

  props: {
    sort: {
      type: String,
      default: 'popular'
    },

    data() {
      return {
        actualPage: 1
      }
    },
  },
  
  beforeMount() {
    this.$store.dispatch('getMovies', { page: this.actualPage, sort: this.sort })  
  },

  computed: {    
      getMovies() {
          return this.$store.getters.allMovies.results
      },
      
      pages () {  
        return this.$store.getters.allMovies.total_pages
      }
  },

  methods: {
    updateMovies () {  
      this.$store.dispatch('getMovies', { page: this.actualPage, sort: this.sort })
    }
  },

  watch: { 
    '$route': 'updateMovies'
  }
}
</script>

<style lang="scss" scoped>  
  .home {
    background-color: lighten(black, 3%);
    color: white;    

    padding-top: 110px;
  }

  .v-card--reveal {    
    align-items: baseline;
    bottom: 0;
    justify-content: center;
    opacity: .9;
    position: absolute;
    width: 100%;  
    color: white;
    background-color: black;
    border-bottom-right-radius: 0 !important;
  }

  .card-movie {
    width: 240px;

    @media (max-width: 990px) {
      width: 175px;
    }
  }

  
</style>
