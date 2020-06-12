<template>
    <v-row>
        <swiper class="swiper" :options="swiperOption">
            <swiper-slide v-for="(movie, index) in getMovies" :key="index">
                 <v-col>         
                    <v-card class="mx-auto" max-width="500" width="250px" shaped>
                        <v-img class="white--text align-end" height="400px" :src="movie.url">
                        <v-card-title>{{ movie.title }}</v-card-title>
                        </v-img>            
                    </v-card>          
                </v-col>
            </swiper-slide>
        </swiper>
    </v-row>
</template>

<script>
  import { Swiper, SwiperSlide } from 'vue-awesome-swiper'  
  import 'swiper/css/swiper.css'  

  export default {
    name: 'slider',  
    components: {
      Swiper,
      SwiperSlide  
    },
    data() {
      return {
        movies: [],

        swiperOption: {    
          slidesPerView: 4,
          spaceBetween: 15,  
          autoplay: {
            delay: 3000,
            }
        }
      }
    },

    created() {
        this.$store.dispatch('getMovies')
    },

    computed: {
        getMovies() {    
            return this.$store.getters.allMovies
        }
    },
  }
</script>

<style lang="scss" scoped>

  .swiper {
    height: 100%;
    width: 100%;

    position: relative;
    bottom: 300px;

    .swiper-slide {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 300px;
      height: 600px;
      text-align: center;
      font-weight: 500;
      font-size: 20;
      background-color: transparent;
      background-position: center;
      background-size: cover;
      color: black;
    }
  }
</style>