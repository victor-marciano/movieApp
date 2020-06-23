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
                                <div>
                                    <h3>Categorias</h3>
                                    <v-chip v-for="(genre, index) in getMovie.genres" :key="index" label class="mr-3">
                                        {{ genre.name }}
                                    </v-chip>
                                </div>
                                <div>
                                    <h3>Avaliação média</h3>
                                    <v-avatar size="48" color="indigo">
                                        {{ getMovie.vote_average }}
                                    </v-avatar>
                                </div>
                                <small>Em um total de {{ getMovie.vote_count }} votos</small>

                                <div>
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
                                    ></v-rating>
                                    <small>Somente usuários logados podem avaliar!</small>
                                </div>
                            </v-col>
                            <v-col cols="12" md="6">                                
                                <div class="images-section" v-viewer>
                                    <h3>Galeria</h3>
                                    <template v-for="(image, index) in getMovie.images.backdrops">
                                        <img class="image"
                                            :src="`https://image.tmdb.org/t/p/original${image.file_path}`" width="150" height="100" :key="index"
                                            :data-src="`https://image.tmdb.org/t/p/original${image.file_path}`"
                                        >
                                    </template> 
                                </div>
                                <small>Clique para ampliar as imagens</small>                                   
                                <div class="video-section">
                                    <h3>Mídia</h3>
                                </div>
                            </v-col>        
                        </v-row>
                    </template>
                </v-card>
            
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
                                :src="`https://image.tmdb.org/t/p/original${actor.profile_path}`"
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
          return this.$store.getters.movieDetails
      }
  },
  
  
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

  .image-section {
      .image {
          cursor: pointer !important;
      }
  }
</style>
