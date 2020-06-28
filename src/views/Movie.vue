<template>
    <div>
        <section class="movie-data" :style="{'background': `url(https://image.tmdb.org/t/p/original${getMovie.backdrop_path})`, 'background-size': 'contain'}"> 
            <v-container>    
                <v-card dark style="opacity: 0.9; padding: 25px;">
                    <template v-slot.default>
                        <v-row>
                            <v-col cols="12" md="6">
                                <h1 style="font-size: 48px;">{{ getMovie.title }}</h1>
                                <small style="position: relative; bottom: 10px">{{ getMovie.tagline }}</small>
                                <p style="font-size: 20px; margin-top: 10px;">{{ getMovie.overview }}</p>
                                <br>
                                <div class="d-flex justify-space-around">
                                    <v-img v-for="(company, index) in getMovie.production_companies.slice(0,5)" :key="index"
                                         contain
                                         height="40" width="50"
                                         :src="`https://image.tmdb.org/t/p/original${company.logo_path}`"                                         
                                    ></v-img>
                                </div><br><br>
                                <div>                                    
                                    <v-chip label class="mr-3">
                                    <v-avatar left>
                                        <v-icon>mdi-calendar-range</v-icon>
                                    </v-avatar>
                                        {{ new Date(getMovie.release_date).toLocaleDateString() }}
                                    </v-chip>
                                    <v-chip label class="mr-3">
                                    <v-avatar left>
                                        <v-icon>mdi-update</v-icon>
                                    </v-avatar>
                                        {{ getMovie.runtime }}min
                                    </v-chip>
                                    <v-chip label class="mr-3">
                                    <v-avatar left>
                                        <v-icon>mdi-cash-usd-outline</v-icon>
                                    </v-avatar>
                                        {{ getMovie.revenue.toLocaleString('us', {style: 'currency', currency: 'USD'}) }}
                                    </v-chip>
                                </div>
                                <br>
                                <div>
                                    <h3>Categorias</h3><br>
                                    <v-chip v-for="(genre, index) in getMovie.genres" :key="index" label class="mr-3">
                                        {{ genre.name }}
                                    </v-chip>
                                </div>                                
                                <br>
                                <div class="text-center">
                                    <h3>Avaliação média</h3><br>
                                    <v-avatar size="100" color="indigo" style="font-size: 50px;">
                                        {{ getMovie.vote_average }}
                                    </v-avatar><br><br>
                                    <small>Em um total de {{ getMovie.vote_count }} votos</small>
                                </div>
                                <br>
                                <div class="ratingSection">
                                    <h3>Avalie este filme</h3>
                                    <v-rating
                                        v-model="rating"
                                        :length="10"
                                        empty-icon="mdi-heart-outline"
                                        full-icon="mdi-heart"
                                        half-icon="mdi-heart-half-full"
                                        half-increments
                                        hover                                        
                                        :size="46"
                                        dense
                                        color="red"
                                        background-color="red lighten-2"                                                
                                        :readonly="!logged"                                        
                                    ></v-rating>
                                    <br>
                                    <v-btn :disabled="!logged" @click="rateMovie">Avaliar</v-btn>
                                </div>
                                <v-tooltip left :disabled="logged" activator=".ratingSection">                                  
                                    <span>Faça o login para avaliar o filme</span>
                                </v-tooltip>
                            </v-col>
                            <v-col cols="12" md="6">                                
                                <div class="images-section" v-viewer>
                                    <h3>Galeria</h3><br>
                                    <template v-for="(image, index) in getMovie.images.backdrops.slice(0, 9)" v-show="getMovie.images.backdrops">
                                        <img style="margin-right: 5px; cursor: pointer;"
                                            :src="`https://image.tmdb.org/t/p/original${image.file_path}`" width="176" height="125" :key="index"
                                            :data-src="`https://image.tmdb.org/t/p/original${image.file_path}`"
                                        >
                                    </template> 
                                </div>
                                <br>                                  
                                <div class="video-section">
                                    <h3>Trailer</h3><br>
                                    <vue-plyr v-for="(video, index) in getMovie.videos.results.slice(0,1)" :key="index" v-show="video.type === 'Trailer'">
                                        <div data-plyr-provider="youtube" :data-plyr-embed-id="video.key"></div>
                                    </vue-plyr> 
                                    
                                </div>
                            </v-col>        
                        </v-row>
                    </template>
                </v-card>
            
            </v-container>    
        </section>
        <section class="recommendations white--text" style="background-color: #121212;">
            <v-container>
                <h1>Quem gostou deste filme também gostou desses:</h1>
                <v-row>
                    <v-col cols="6" md="2" v-for="(movie, index) in getMovie.recommendations.results.slice(0, 6)" :key="index">
                        <v-card dark shaped :to="{ name: `movie`, params: { movie: movie.id } }">
                            <v-img
                                class="white--text align-end"                                
                                :src="`https://image.tmdb.org/t/p/original${movie.poster_path}`"
                            ></v-img>
                        </v-card>
                    </v-col>
                </v-row>
            </v-container>
        </section>
        <section class="actors">
            <v-container>
                <h1>Elenco</h1>
                <v-row>
                    <v-col cols="6" md="3" v-for="(actor, index) in getMovie.credits.cast" :key="index">
                        <v-card dark shaped>
                            <v-img
                                class="white--text align-end"                                
                                :src="actor.profile_path ? `https://image.tmdb.org/t/p/original${actor.profile_path}` : noImage"
                            ></v-img>

                            <v-card-subtitle class="pb-0">{{ actor.name }}</v-card-subtitle>

                            <v-card-text class="text--primary">
                                <div>{{ actor.character }}</div>                                
                            </v-card-text>
                        </v-card>
                    </v-col>
                </v-row>
            </v-container>
        </section>
    </div>
</template>

<script>

import axios from 'axios'
import { db } from '../config/firebase'
import firebase from 'firebase'

export default {
  name: 'Movie',  

  data() {
      return {
          rating: 0,
          movie: 0
      }
  },
  
  beforeMount() {   
      this.movie = this.$route.params.movie; 
      this.$store.dispatch('getMovieDetails', { movie: this.movie })
  },

  computed: {
      getMovie(){
          console.log(this.$store.getters.movieDetails)
          return this.$store.getters.movieDetails
      },

      logged() {
          return this.$store.getters.isLogged
      },

      noImage() {
          return require('@/assets/no-image-icon.png')
      }
  },

  watch: {      
      '$route.params.movie': {
        deep: true,
        handler (movie) {
          this.$store.dispatch('getMovieDetails', { movie: movie })
        }
      } 
  },
  
  methods: {
      async rateMovie() {
          try {  
            const snapshot = await db.ref('users/' + firebase.auth().currentUser.uid).once('value')
            const user = snapshot.val()
                        
            await axios.post(`https://api.themoviedb.org/3/movie/${this.movie}/rating?api_key=${process.env.VUE_APP_MOVIEDB_API_KEY}`, {
                value: this.rating,
                guest_session_id: user.guest_token
            })
          } catch (error) {
              console.log(error.response)
          }
      }
  }
  
}
</script>

<style lang="scss" scoped>  
  .movie-data {
      padding-top: 110px;
      background-color: black;
      color: white;
  }

  .actors {
      background-color: black;
  }

  .images-section {
      img {
          transition: all .2s ease-in-out;
          &:hover {
              transform: scale(1.1);
          }
      }
  }  
</style>
