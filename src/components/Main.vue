<template>
  <div>
  
    <div id="wrapper">
    <!-- Sidebar -->
  <SideBar/>
    <!-- Sidebar -->
    <div id="content-wrapper" class="d-flex flex-column">
      <div id="content">
        <!-- TopBar -->
       <NavBar/>
        <!-- Topbar -->

        <!-- Container Fluid-->
          <Contenu/>
        <!---Container Fluid-->
      </div>
     
    </div>
  </div>

  </div>
</template>

<script>
import NavBar from "../layouts/NavBar"
// import Footer from "../layouts/Footer"
import SideBar from '../layouts/SideBar'
import Contenu from "../pages/Contenu.vue"
export default {
  name: 'HelloWorld',
  components:{
    NavBar,
    SideBar,
    Contenu,
    // Footer,
   
  },
  props: {
    msg: String
  },
  data(){
    return{
      
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
