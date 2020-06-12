<template>
  <section class="home"> 
    <v-container>       
      <slider></slider>
      <div>          
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
  }  
}
</script>

<style lang="scss" scoped>  
  .home {
    background-color: lighten(black, 3%);
    color: white;   
  }
</style>
