<template>
    <v-card height="150" dark>
    <v-footer padless dark>
      <v-card flat tile width="100%">        
        <v-card-title class="d-flex justify-space-around">
          <div>
            <p style="font-size: 16px;">Data source by</p>             
            <img src="../assets/tmdb.svg" class="ml-5">           
          </div>
          
          <div>                   
            <v-btn class="mx-4" icon>
              <v-icon size="24px">mdi-github</v-icon>
            </v-btn>           
          </div>
        </v-card-title>        
        <div class="d-flex justify-center text-center mt-5">
          <p>@{{ new Date().getFullYear() }} — Made with love in <v-img id="flag-icon" width="25" height="25" src="../assets/brazil.png"></v-img></p>
        
        </div>
      </v-card>
      
    </v-footer>
  </v-card>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
  #flag-icon {
    float: right;
    margin-left: 10px;
  }
</style>