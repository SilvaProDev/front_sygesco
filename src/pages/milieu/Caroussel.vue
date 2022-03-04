<template>
  <div>
<div class="container">
    <Entete/> <br>
    
  

      <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
    <ol class="carousel-indicators">
      <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
      <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
      <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
    </ol>
    <div class="carousel-inner" role="listbox">
       <!-- <transition-group name="fade" tag="div">
      <div v-for="i in [currentIndex]" :key="i">
        <img :src="currentImg.photo" />
      </div>
    </transition-group> -->
    
      <div >
      <div v-for="i in [currentIndex]" :key="i" 
          class="carousel-item active" :style='{backgroundImage: "url("+currentImg.photo+")"}'>
        <div class="carousel-caption d-none d-md-block">
          <h2 style="color:#000" class="display-4 font-weight-bold text-gray-5000">{{currentImg.titre}}</h2>
          <p style="color:#000" class="lead font-weight-bold text-gray-5000">{{currentImg.texte}}</p>
        
        </div>
      </div>

      </div>
     
    
    </div>
    <a class="prev" @click="prev" href="#">&#10094; </a>
    <a class="next" @click="next" href="#">&#10095; </a>
   
  </div>
  <!-- {{gettersAccueil}} -->
</div>

  </div>
</template>

<script>
import Entete from "./Entete"
import {mapGetters, mapActions} from "vuex";
export default {
components:{Entete},

data(){
  return {
    currentIndex:0,
    timer: null,
  }
},
created(){
  this.getAccueil()
},
 mounted: function() {
    this.startSlide();
  },
 computed:{

          ...mapGetters("parametres",["gettersNiveau", "gettersClasse", "gettersMatiere","gettersTrimestre", "gettersAnne",
        "gettersTransport","gettersconfigEntete","gettersAccueil"]),
        ...mapGetters("student",["GetterStudent", "GetterCantine", "GetterScolarite", "GetterAbsence"]),
        ...mapGetters("personnel",["user",]),
   

     currentImg: function() {
      return this.gettersAccueil[Math.abs(this.currentIndex) % this.gettersAccueil.length];
    }
    },

     methods:{
        ...mapActions("parametres",["getNiveau","AjouterNiveau", "ModifierNiveau","SupprimerNiveau","getClasse", 
        "AjouterconfigEntete", "getconfigEntete","AjouterAccueil","SupprimerAccueil","getAccueil"]),
         ...mapActions("student",["get_all_student","AjouterEleve", "ModifierEleve","SupprimerEleve","ImporterEleve"]),


    startSlide: function() {
      this.timer = setInterval(this.next, 8000);
    },

    next: function() {
      this.currentIndex += 1;
    },
    prev: function() {
      this.currentIndex -= 1;
    }
  },
     


}
</script>

<style scoped>

.carousel-item{
    width: 100%;
}
.item img {
    position: absolute;
    object-fit:cover;
    width: 100%;
    top: 0;
    left: 0;
    min-height: 572px;
    background:rgba(0,0,0,0.7);
}
.carousel-item {
  /* height: 80vh; */
  min-height: 350px;
  background: no-repeat center center scroll;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
}


.fade-enter-active,
.fade-leave-active {
  transition: all 0.9s ease;
  overflow: hidden;
  visibility: visible;
  position: absolute;
  width:100%;
  opacity: 1;
}

.fade-enter,
.fade-leave-to {
  visibility: hidden;
  width:100%;
  opacity: 0;
}

img {
  height:600px;
  width:100%
}

.prev, .next {
  cursor: pointer;
  position: absolute;
  top: 40%;
  width: auto;
  padding: 16px;
  color: white;
  font-weight: bold;
  font-size: 18px;
  transition: 0.7s ease;
  border-radius: 0 4px 4px 0;
  text-decoration: none;
  user-select: none;
}

.next {
  right: 0;
}

.prev {
  left: 0;
}

.prev:hover, .next:hover {
  background-color: rgba(0,0,0,0.9);
}

</style>