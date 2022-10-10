<template>
  <div>
  
    <div id="wrapper">
    <!-- Sidebar -->
<div  >

  <SideBar/>
</div>
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
.tailMenu { width: 30%; }
.tailMenu2 { width: 24%; margin-left: 24%; left: 0px; opacity: 1; }


@media screen and (max-width: 600px){ 

}

@media screen and (min-width: 768px){ 

	.tailMenu { width: 10%; }
	.tailMenu2 { width: 35%; margin-left: 35%; left: 0px; opacity: 1; }

}

@media screen and (min-width: 992px){

	.tailMenu { width: 10%; }
	.tailMenu2 { width: 35%; margin-left: 0; left: 0px; opacity: 1; }
	
}

@media screen and (min-width: 1240px){

	.tailMenu { width: 10%; }
	.tailMenu2 { width: 19%; margin-left: 19%; left: 0px; opacity: 1; }

}

@media screen and (min-width: 1400px){

	.tailMenu { width: 10%; }
	.tailMenu2 { width: 19%; margin-left: 19%; left: 0px; opacity: 1; }

}

@media screen and (min-width: 1600px){

	.tailMenu { width: 30%; }
	.tailMenu2 { width: 18%; margin-left: 18%; left: 0px; opacity: 1; }

}

@media screen and (min-width: 1800px){

	.tailMenu { width: 30%; }
	.tailMenu2 { width: 16%; margin-left: 16%; left: 0px; opacity: 1; }

}

@media screen and (min-width: 2000px){
	.tailMenu { width: 30%; }
	.tailMenu2 { width: 15%; margin-left: 15%; left: 0px; opacity: 1; }
}


</style>
