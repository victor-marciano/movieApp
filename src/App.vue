<template>
  <v-app>    
    <navbar></navbar>
    <banner></banner>    
    <router-view></router-view>    
    <Footer></Footer>
  </v-app>
</template>

<script>
import Navbar from './components/Navbar.vue'
import Banner from './components/Banner.vue'
import Footer from './components/Footer.vue'

export default {
  name: 'App',
  components: {
    Navbar,
    Banner,
    Footer
  }

};
</script>

<style lang="scss">  
</style>
