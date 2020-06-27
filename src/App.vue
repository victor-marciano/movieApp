<template>
  <v-app>        
    <navbar></navbar>   
    <router-view></router-view>      
    <Footer></Footer>    
  </v-app>
</template>

<script>
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'

export default {
  name: 'App',
  components: {
    Navbar,    
    Footer
  }, 

  beforeCreate() {
    this.$store.dispatch('checkUser')
  },
};
</script>

<style lang="scss"> 

::-webkit-scrollbar {
  width: 10px !important;
}

/* Track */
::-webkit-scrollbar-track {
  background: #f1f1f1 !important; 
}
 
/* Handle */
::-webkit-scrollbar-thumb {
  background: black !important; 
  opacity: 0.8;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555 !important; 
}

</style>
