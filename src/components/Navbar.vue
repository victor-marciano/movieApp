<template>
  <v-app-bar absolute dark src="https://i.picsum.photos/id/274/3824/2520.jpg" fade-img-on-scroll>
      <template v-slot:img="{ props }">
        <v-img v-bind="props" gradient="to top right, rgba(0,0,0,.8), rgba(10,10,10,.9)"></v-img>
      </template>

      <v-app-bar-nav-icon></v-app-bar-nav-icon>
      <v-toolbar-title>MOVIE HUB</v-toolbar-title>         

    <v-spacer></v-spacer>
        
    <v-text-field placeholder="Encontre um filme" full-width append-icon="mdi-magnify"></v-text-field>
      
      <v-spacer></v-spacer>

      <form-register></form-register>     

      <template v-slot:extension>
        <v-tabs align-with-title>
          <v-tab to="/populares">Populares</v-tab>
          <v-tab to="/lancamentos">Lançamentos</v-tab>
          <v-tab to="/melhores">Melhores</v-tab>
          <v-tab to="/chegando">Em breve</v-tab>
        </v-tabs>
      </template>
    </v-app-bar>    
</template>

<script>
import FormRegister from './FormRegister.vue'

export default {
    components: {
        FormRegister
    }
}
</script>

<style>

</style>