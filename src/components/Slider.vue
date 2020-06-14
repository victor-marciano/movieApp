<template>
    <v-row class="home-movies">
        <swiper class="swiper" :options="getOptions">
            <swiper-slide v-for="(movie, index) in getMovies" :key="index">
                 <v-col>  
                   <v-hover v-slot:default="{ hover }">       
                      <v-card class="mx-auto" max-width="500" width="250px" shaped :elevation="hover ? 12 : 2" :class="{ 'on-hover': hover }">
                          <v-img class="white--text align-end" height="400px" :src="movie.url"></v-img>                        
                          <v-expand-transition>
                            <div v-if="hover" class="d-flextransition-fast-in-fast-out v-card--reveal"
                              style="height: 70%;"
                            >
                              <div class="flex-row mt-5">
                                <h3>{{ movie.title }}</h3>
                              </div>
                              <v-avatar color="indigo" size="64" class="flex-row mt-5">
                                <span class="white--text headline">8.5</span>
                              </v-avatar>
                              <p style="font-size:14px" class="flex-row mt-5">Descrição</p>
                            </div>
                          </v-expand-transition>
                      </v-card>
                    </v-hover>        
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
        },

        mobileOption: {
          slidesPerView: 1,
          spaceBetween: 10,
          autoplay: {
            delay: 2000
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
        },

        getOptions() {
          return screen.width < 991 ? this.mobileOption : this.swiperOption
        }
    },
  }
</script>

<style lang="scss" scoped>  

  .swiper {
    height: 100%;
    width: 100%;

    position: relative;
    bottom: 200px;

    .swiper-slide {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 300px;
      height: 400px;
      text-align: center;
      font-weight: 500;
      font-size: 20;
      background-color: transparent;
      background-position: center;
      background-size: cover;
      color: black;
    }
  }

  .v-card--reveal {
    // align-items: center;
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

</style>