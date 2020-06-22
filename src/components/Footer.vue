<template>
    <v-card height="150" dark>
    <v-footer v-bind="localAttrs" padless dark>
      <v-card flat tile width="100%">        
        <v-card-title class="d-flex justify-space-around">
          <div>
            <h5>Data source by</h5> 
            
            <img src="../assets/tmdb.svg" class="ml-5"> 
          
          </div>
          
          <div>                   
            <v-btn class="mx-4" icon>
              <v-icon size="24px">mdi-github</v-icon>
            </v-btn> 
          
          </div>
        </v-card-title>        

        <v-card-text class="text-center mt-5">
          @{{ new Date().getFullYear() }} — Made with love in Brazil
        </v-card-text>
      </v-card>
    </v-footer>
  </v-card>
</template>

<script>
export default {

}
</script>

<style>

</style>