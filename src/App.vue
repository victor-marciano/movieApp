<template>
  <v-app>        
    <navbar></navbar>    
    <keep-alive>
      <router-view></router-view>            
    </keep-alive>    
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
  }

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
