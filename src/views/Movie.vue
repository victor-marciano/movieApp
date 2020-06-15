<template>
  <section class="movie-data"> 
    <v-container>       
     <v-row>
         <v-col cols="12" md="6">
             {{ getMovie.title }} 
         </v-col>
         <v-col cols="12" md="6">
             Dados
         </v-col>
     </v-row>
    </v-container>    
  </section>
</template>

<script>

export default {
  name: 'Movie', 
  props: {
      movie: {
          type: Object,
          required: true
      }
  }, 

  computed: {
      getMovie(){         
          return this.movie
      }
  },
  
  
}
</script>

<style lang="scss" scoped>  
  
</style>
