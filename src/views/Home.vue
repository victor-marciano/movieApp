<template>
  <section class="home">
    <v-container fluid> 

      <div>          
        <h2>Lançamento</h2>
        <v-row>
          <v-col cols="12" md="7">
            <v-parallax
              dark
              :src="`https://image.tmdb.org/t/p/w500${getLatest.poster_path}`"
              alt="No image available for this movie yet"
              height="425"
            >
            </v-parallax>
          </v-col>
          <v-col cols="12" md="5">
            <h1>{{ getLatest.title }}</h1>
            <div>
              <p>{{ getLatest.overview }}</p>
            </div>
            <div>
              <v-chip v-show="getLatest.genres" class="ma-2" dark label text-color="white">{{ getLatest.genres.name }}</v-chip>
              <v-chip v-show="getLatest.release_date" class="ma-2" dark label text-color="white">{{ getLatest.release_date }}</v-chip>
              <v-chip v-show="getLatest.status" class="ma-2" dark label text-color="white">{{ getLatest.status }}</v-chip>              
            </div>
          </v-col>
        </v-row>
        <h2>Todos os filmes</h2>
        <v-row>
          <v-col v-for="(movie, index) in getMovies" :key="index">
            <v-hover v-slot:default="{ hover }">       
              <v-card :to="{ name: `movie`, params: { movie: movie } }" class="mx-auto card-movie" shaped :elevation="hover ? 12 : 2" :class="{ 'on-hover': hover }">
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
      </div> 
      <div class="text-center mt-5">
        <v-container>
          <v-pagination dark :length="pages" prev-icon="mdi-menu-left" next-icon="mdi-menu-right"></v-pagination>
        </v-container>
      </div>
    </v-container>    
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

    page: {
      type: Number,
      default: 1
    }
  },

  data() {
    return {       
      movies: []  
    }
  },
  
  created() {
    this.movies = this.$store.dispatch('getMovies', { page: this.page, sort: this.sort })
    this.$store.dispatch('getLatest')
  },

  computed: {    
      getMovies() {
          return this.$store.getters.allMovies.results
      },
      
      pages () {  
        return this.$store.getters.allMovies.total_pages
      },

      getLatest() {  
        return this.$store.getters.latestMovie
      }
  },
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
