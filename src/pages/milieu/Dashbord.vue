<template>
  <div>
     <!-- <entete></entete> -->
    <div class="container-fluid p-5" id="container-wrapper">
      <h1 style="margin-left:20%;"> {{ $t("SideBar.TableauDeBord") }}</h1>
     
      <div class="row ml-3 mb-3" style="margin-left:20%;">
            <!-- Earnings (Monthly) Card Example -->
           <div id="demo" class="carousel slide" data-ride="carousel">

  <!-- Indicators -->
  <ul class="carousel-indicators">
    <li data-target="#demo" data-slide-to="0" class="active"></li>
    <li data-target="#demo" data-slide-to="1"></li>
    <li data-target="#demo" data-slide-to="2"></li>
  </ul>
  
  <!-- The slideshow -->
  <!-- <div class="carousel-inner">
    <div class="carousel-item active">
      <h1>Help me one</h1>
    </div>
    <div class="carousel-item">
      <h1>Help me two</h1>
    </div>
    <div class="carousel-item">
      <h1>Help me three</h1>
    </div>
  </div> -->
  
  <!-- Left and right controls -->
  <a class="carousel-control-prev" href="#demo" data-slide="prev">
    <span class="carousel-control-prev-icon"></span>
  </a>
  <a class="carousel-control-next" href="#demo" data-slide="next">
    <span class="carousel-control-next-icon"></span>
  </a>
</div>
            <div class="col-xl-3 col-md-4 ">
              <div class="card h-100 p-2" style="background-color:#4A91F1;">
                <div class="card-body">
                  <div class="row align-items-center">
                    <div class="col mr-2">
                      <div class="text-xs font-weight-bold text-uppercase mb-1">Total élèves inscrits  </div>
                      <div class="h5 mb-0 font-weight-bold ">{{NombreTotalEleve}}</div>                   
                    </div>
                    <div class="col-auto">
                      <i class="fas fa-users fa-3x text-info"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-xl-3 col-md-4">
              <div class="card h-100">
                <div class="card-body p-2" style="background-color:#5ED668;">
                  <div class="row align-items-center">
                    <div class="col mr-2">
                      <div class="text-xs font-weight-bold text-uppercase mb-1">Garçons inscrits</div>
                      <div class="h5 mb-0 font-weight-bold">{{NombreTotalGarçcon}}</div>                   
                    </div>
                    <div class="col-auto">
                      <i class="fas fa-users fa-3x text-warning"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="col-xl-3 col-md-4 ">
              <div class="card h-100">
                <div class="card-body p-2" style="background-color:#FF00FF;">
                  <div class="row align-items-center">
                    <div class="col mr-2">
                      <div class="text-xs font-weight-bold text-uppercase mb-1">Filles inscrites</div>
                      <div class="h5 mb-0 font-weight-bold">{{NombreTotalFille}}</div>                   
                    </div>
                    <div class="col-auto">
                      <i class="fas fa-users fa-3x text-dark"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-xl-3 col-md-4 ">
              <div class="card h-100">
                <div class="card-body p-2" style="background-color:#F48415;">
                  <div class="row align-items-center">
                    <div class="col mr-2">
                      <div class="text-xs font-weight-bold text-uppercase mb-1">Nombres de salles</div>
                      <div class="h5 mb-0 font-weight-bold ">85</div>                   
                    </div>
                    <div class="col-auto">
                      <i class="fas fa-school fa-3x text-dark"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          
    </div>
      <div class="row ml-3 mb-3" style="margin-left:20%;">
            <!-- tableau des professeur -->
            <div class="col-xl-3 col-md-4">
              <div class="card h-100 p-2" style="background-color:#008000;">
                <div class="card-body ">
                  <div class="row align-items-center">
                    <div class="col mr-2">
                      <div class="text-xs font-weight-bold text-uppercase mb-1">Total profésseurs</div>
                      <div class="h5 mb-0 font-weight-bold">{{NombreProfesseur}}</div>                   
                    </div>
                    <div class="col-auto">
                      <i class="fas fa-users fa-3x text-info"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-xl-3 col-md-4">
              <div class="card h-100">
                <div class="card-body p-2" style="background-color:#DCDCDC;">
                  <div class="row align-items-center">
                    <div class="col mr-2">
                      <div class="text-xs font-weight-bold text-uppercase mb-1">Hommes</div>
                      <div class="h5 mb-0 font-weight-bold ">{{NombreTotalProfHomme}}</div>                   
                    </div>
                    <div class="col-auto">
                      <i class="fas fa-users fa-3x text-warning"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="col-xl-3 col-md-4">
              <div class="card h-100 p-2" style="background-color:#41EFEB;">
                <div class="card-body ">
                  <div class="row align-items-center">
                    <div class="col mr-2">
                      <div class="text-xs font-weight-bold text-uppercase mb-1">Femmes</div>
                      <div class="h5 mb-0 font-weight-bold ">{{NombreTotalProfFemme}}</div>                   
                    </div>
                    <div class="col-auto">
                      <i class="fas fa-users fa-3x text-dark"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-xl-3 col-md-4">
              <div class="card h-100 ">
                <div class="card-body p-2" style="background-color:#FF0000;">
                  <div class="row align-items-center">
                    <div class="col mr-2">
                      <div class="text-xs font-weight-bold text-uppercase mb-1">Nombre total du personnel</div>
                      <div class="h5 mb-0 font-weight-bold">{{NombreParent}}</div>                   
                    </div>
                    <div class="col-auto">
                      <i class="fas fa-users fa-3x text-dark"></i>
                    </div>
                  </div>
                </div> 
              </div>
            </div>
          
    </div>
    {{dataArrayPourcentage}}
    <span style="color:#fff">
    {{dataPourcentage}}

    </span>
     <apexchart style="margin-left:20%;" type="pie" width="380" :options="chartOptions" :series="dataPourcentage"></apexchart>
  
  </div>
  </div>
</template>

<script>

// import Entete from './Entete.vue'
import {mapGetters, mapActions} from "vuex";
import VueApexCharts from 'vue-apexcharts'
export default {
  components:{
     apexchart: VueApexCharts,
    // Entete
  },
  data(){
    return {
       series: [44, 55, 41, 17, 15],
       dataPourcentage:[],
      chartOptions: {
            chart: {
                width: 390,
                type: 'pie',
            },
            labels: ['Total élèves inscrits', 'Total garçons inscrits', 'Total filles inscrites', 'Total profésseurs', 'Totals Professeur homme', 'Totals Professeur femme'],
            colors:['#4A91F1', '#5ED668', '#FF00FF',"#008000","#FF0000", "#DCDCDC", "#41EFEB"],
            responsive: [{
                breakpoint: 480,
                options: {
                    chart: {
                        width: 200
                    },
                    legend: {
                        position: 'bottom'
                    }
                }
            }]
        },
    }
  },
    created(){
         // console.log(this.GetterStudent);
      this.getNiveau();
      this.getClasse();
    //   this.get_note();
        this.getTrimestre();
  //    this.getMatiere();
      this.get_all_student();
      this.getAnnee();
       this.getRole();
     this.getUtilisateur()
  //   this.getUtilisateur();
   //  this.getAffectation();


    },

   computed:{
     ...mapGetters("parametres",["gettersNiveau", "gettersClasse","gettersAnne"]),
     ...mapGetters("student",["GetterStudent"]),
      ...mapGetters("personnel",["gettersUtilisateur", "gettersAffectation"]),

    dataArrayPourcentage(){
      let vm = this
      if(vm.dataPourcentage.length >0){
        vm.dataPourcentage =[];
        }
        vm.dataPourcentage.push(this.NombreTotalEleve);
      vm.dataPourcentage.push(this.NombreTotalGarçcon);
      vm.dataPourcentage.push(this.NombreTotalFille);
      vm.dataPourcentage.push(this.NombreProfesseur);
      vm.dataPourcentage.push(this.NombreTotalProfHomme);
      vm.dataPourcentage.push(this.NombreTotalProfFemme);
      
      return ""
    },
    NombreTotalEleve(){
      return this.GetterStudent.filter(tem=>tem.annee_id == this.AnneEncours).length
    },
    NombreTotalGarçcon(){
      return this.GetterStudent.filter(tem=>tem.annee_id == this.AnneEncours && tem.sexe == 'Masculin').length
    },
    NombreTotalFille(){
      return this.GetterStudent.filter(tem=>tem.annee_id == this.AnneEncours && tem.sexe == 'Féminin').length
    },
    NombreProfesseur(){
      return this.gettersUtilisateur.filter(tem=>tem.annee_id == this.AnneEncours && tem.role_id == 2).length
    },
      NombreTotalProfHomme(){
      return this.gettersUtilisateur.filter(tem=>tem.annee_id == this.AnneEncours && tem.sexe == 'Masculin' && tem.role_id ==2).length
    },
    NombreTotalProfFemme(){
      return this.gettersUtilisateur.filter(tem=>tem.annee_id == this.AnneEncours && tem.sexe == 'Féminin' && tem.role_id ==2).length
    },
    NombreParent(){
      return this.gettersUtilisateur.filter(tem=>tem.annee_id == this.AnneEncours).length
    },
     AnneEncours(){
       let obj = this.gettersAnne.find(tem=>tem.encours == 1)
       if(obj){
         return obj.id;
       }
       return ""
     },
   },
    methods:{

       ...mapActions("parametres",["getNiveau","AjouterNiveau", "ModifierNiveau","SupprimerNiveau","getClasse",
        "getTrimestre","getAnnee", "getRole"]),
     ...mapActions("student",["get_all_student","AjouterEleve", "ModifierEleve","SupprimerEleve","getEleveParClasse","ImporterEleve"]),
      ...mapActions("personnel",["getUtilisateur","AjouterUtilisateur","ModifierUtilisateur","SupprimerUtilisateur",
         "AjouterAffectation","getAffectation","SupprimerAffectation"]),
     ModificationEleve(id){
        this.$router.push({ name:"editStudent", params:{id:id}})
     },
       }

}
</script>

<style scoped>


.carousel-inner img {
    width: 100%;
    height: 100%;
  }
</style>