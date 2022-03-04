<template>
  <div>
      <Loader :isVisible="loadingData"/>
       <div class="container mr-5" id="container-wrapper">
        

            <h3 class="text-center   mb-1">Statistique du paiement de la scolarité</h3>
         <div class="row" >
            <!-- tableau des professeur -->
          
           <div class="col-xl-3 col-md-6 mb-4">
              <div class="card h-200"  style="background-color:yellow;">
                <div class="card-body">
                  <div class="row align-items-center">
                    <div class="col mr-2">
                      <div style="font-size:16px;" class="text-xs font-weight-bold  mb-1">Scolarité total à payer selon les inscrits</div>
                      <div class="h5 mb-0 font-weight-bold text-gray-800">{{formatageSomme(parseFloat(sommeTotalDesEleves))}} </div>
                      <div class="mt-2 mb-0 text-muted text-xs">
                        <span class="text-success mr-2"><i class="fa fa-arrow-up"></i></span>
                        <span>Since last month</span> 
                      </div>
                    </div>
                    <div class="col-auto">
                      <i class="fas fa-calendar fa-2x text-dark"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
           <div class="col-xl-3 col-md-6 mb-4">
              <div class="card h-100"  style="background-color:green;">
                <div class="card-body">
                  <div class="row align-items-center">
                    <div class="col mr-2">
                      <div style="font-size:16px;" class="text-xs font-weight-bold  mb-1">Scolarité totale payée selon les paiements</div>
                      <div style="font-size:12px;color:#fff;" class="text-xs font-weight-bold  mb-1">
                      
                        </div>
                      <div class="h5 mb-0 font-weight-bold">{{formatageSomme(parseFloat(sommeTotalScolarite))}}</div>
                      <div class="mt-2 mb-0 text-muted text-xs">
                        <span class="text-success mr-2"><i class="fa fa-arrow-up"></i> 3.48%</span>
                        <span>Since last month</span>
                      </div>
                    </div>
                    <div class="col-auto">
                      <i class="fas fa-calendar fa-2x text-dark"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
           <div class="col-xl-3 col-md-6 mb-4">
              <div class="card h-100"  style="background-color:aqua;">
                <div class="card-body">
                  <div class="row align-items-center">
                    <div class="col mr-2">
                      <div style="font-size:16px;" class="text-xs font-weight-bold  mb-1">Reste totale à payer selon les paiements</div>
                      <div class="h5 mb-0 font-weight-bold text-gray-800">{{formatageSomme(parseFloat(ScolariteTotalResteAPayer))}}</div>
                      <div class="mt-2 mb-0 text-muted text-xs">
                        <span class="text-success mr-2"><i class="fa fa-arrow-up"></i> 3.48%</span>
                        <span>Since last month</span>
                      </div>
                    </div>
                    <div class="col-auto">
                      <i class="fas fa-calendar fa-2x text-dark"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
             
             <div class="col-xl-3 col-md-6 col-lg-3 mb-4">
              <div class="card h-100"  style="background-color:#FF00FF;">
                <div class="card-body">
                  <div class="row align-items-center">
                    <div class="col mr-2">
                      <div style="font-size:15px;" class="text-xs font-weight-bold  mb-1"> Scolarité payée en 
                            <span v-if="formaterDateMois(new Date()) == '12'">Décembre</span>
                            <span v-if="formaterDateMois(new Date()) == '11'">Novembre</span>
                            <span v-if="formaterDateMois(new Date()) == '10'">Octobre</span>
                            <span v-if="formaterDateMois(new Date()) == '09'">Septembre</span>
                            <span v-if="formaterDateMois(new Date()) == '08'">Août</span>
                            <span v-if="formaterDateMois(new Date()) == '07'">Juillet</span>
                            <span v-if="formaterDateMois(new Date()) == '06'">Juin</span>
                            <span v-if="formaterDateMois(new Date()) == '05'">Mai</span>
                            <span v-if="formaterDateMois(new Date()) == '04'">Avril</span>
                            <span v-if="formaterDateMois(new Date()) == '03'">Mars</span>
                            <span v-if="formaterDateMois(new Date()) == '02'">Février</span>
                            <span v-if="formaterDateMois(new Date()) == '01'">Janvier</span>

                      </div>
                      <div class="h5 mb-0 font-weight-bold ">{{formatageSomme(parseFloat(sommeTotalPayerMoisActuel))}}</div>
                      <div class="mt-2 mb-0 text-muted text-xs">
                        <span class="text-success mr-2"><i class="fa fa-arrow-up"></i> 3.48%</span>
                        <span>Since last month</span>
                      </div>
                    </div>
                    <div class="col-auto">
                      <i class="fas fa-calendar fa-2x text-dark"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div> 
        </div>

        <br> <br> <br>

         <h5 class="text-center" style="color:red;font-weight:bold;">STATUT DU PAIEMENT PAR CLASSE OU PAR MOIS</h5>
         <br> 
         <div class="row ml-5">         

            
                   <div class="col-6 col-md-3" >
                  <div class="form-group">
                      <label for="niveau">{{ $t("ul.niveau") }} </label>
                      
                        <select class="form-control" id="niveau" v-model="formData.niveau_id" :disabled="formData.mois != ''">
                          <option value="" >Choisir le niveau</option>
                          <option v-for="item in gettersNiveau" :key="item.id" :value="item.id"> {{item.libelle}} </option>
                                              
                      </select>
                  </div>
                </div>
              <div class="col-6 col-md-3" >
                  <div class="form-group">
                      <label for="niveau">{{ $t("ul.classe") }} </label>
                      
                        <select class="form-control" id="classe" v-model="formData.classe_id" :disabled="formData.mois != ''" >
                          <option value="">Choisir la classe</option>
                          <option v-for="item in AfficherClasse" :key="item.id" :value="item.id"> {{item.libelle}} </option>
                                              
                      </select>
                  </div>
                </div>
                 <div  class="col-6 col-md-3"  v-if="formData.niveau_id != '' && formData.classe_id !=''">
                    <div class="form-group">
                     
                     <button type="button" class="btn btn-warning" @click.prevent="viderChamp()">Vider</button> &nbsp;
                  </div>
                     <!-- <button type="button" class="btn btn-info" @click.prevent="genererEnPdf()">Imprimer</button> -->
                </div>
               
                &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                
                       <!-- <h5 style="font-weight: bold;">Statut du paiement par mois</h5> -->
              <div class="col-6 col-md-3" v-if="formData.niveau_id == '' && formData.classe_id ==''">
                  <div class="form-group">
                      <label for="niveau">Mois </label>
                      
                        <select class="form-control" id="classe" v-model="formData.mois"  >
                         <option value="" selected >Choisir le Mois</option>
                          <option value="01">Janvier</option>
                          <option value="02">Février</option>
                          <option value="03">Mars</option>
                          <option value="04">Avril</option>
                          <option value="05">Mai</option>
                          <option value="06">Juin</option>
                          <option value="07">Juillet</option>
                          <option value="08">Août</option>
                          <option value="09">Septembre</option>
                          <option value="10">Octobre</option>
                          <option value="11">Novembre</option>
                          <option value="12">Décembre</option>
                                          
                      </select>
                  </div>
                </div>
              
            </div>
           
              <!-- Row -->
          <div class="row" v-if="formData.classe_id" >
            <!-- Datatables -->
            <div class="col-lg-12">
              <div class="card mb-4">
                <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                  <h6 class="m-0 font-weight-bold text-primary">Liste des élèves de la classe de : 
                    <span v-if="formData.niveau_id !='' && formData.classe_id !='' ">{{LibClasse(formData.classe_id)}}</span> 
                   
                    </h6>
                </div>
                <div class="table-responsive p-3" >
                  
                  <table class="table align-items-center table-flush" id="dataTable">
                    <thead class="thead-light">
                      <tr>
                        <th>N°</th>
                        <th>Nom</th>
                        <th>Prénoms</th>
                        <th>Matricule</th>
                        <th>Classe</th>
                        <th>Montant</th>
                        <th>Date de paiement</th>  
                      </tr>
                    </thead>
                   
                    <tbody>
                      <tr v-for="(item, index) in ListePaiementParClasse" :key="item.id" :value="item.id">
                        <td>{{index+1}}</td>
                        <td>{{NomEleve(item.student_id)}}</td>
                        <td>{{PrenomEleve(item.student_id)}}</td>
                        <td>{{MatriculeEleve(item.student_id)}}</td>
                        <td>{{LibelleClasse(item.classe_id)}}</td>
                        <td>{{formaterDate(item.date)}}</td>                                   
                        <td>{{formatageSomme(parseFloat(item.montant))}}</td>
                      </tr>
                        <tr>
                            <th colspan="6">Montant Total Par Classe</th>
                            <td style="background-color:aqua;">{{formatageSomme(parseFloat(sommeTotalPayerParClasse))}}</td>
                        </tr>                                                              
                    </tbody>
                  </table>
                </div>
              </div>


            </div>
           
          </div>
          <!--Row-->
              <!-- Row -->
          <div class="row" v-if="formData.mois" >
            <!-- Datatables -->
            <div class="col-lg-12">
              <div class="card mb-4">
                <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                  <h6 class="m-0 font-weight-bold text-primary">Liste des élèves ayant payé la scolarité en  
                      <span v-if="formData.mois == '12'">Décembre</span>
                      <span v-if="formData.mois == '11'">Novembre</span>
                      <span v-if="formData.mois == '10'">Octobre</span>
                      <span v-if="formData.mois == '09'">Septembre</span>
                      <span v-if="formData.mois == '08'">Août</span>
                      <span v-if="formData.mois == '07'">Juillet</span>
                      <span v-if="formData.mois == '06'">Juin</span>
                      <span v-if="formData.mois == '05'">Mai</span>
                      <span v-if="formData.mois == '04'">Avril</span>
                      <span v-if="formData.mois == '03'">Mars</span>
                      <span v-if="formData.mois == '02'">Février</span>
                      <span v-if="formData.mois == '01'">Janvier</span>
                     
                       </h6>
                </div>
                <div class="table-responsive p-3" >
                  
                  <table class="table align-items-center table-flush" id="dataTable">
                    <thead class="thead-light">
                      <tr>
                        <th>N°</th>
                        <th>Nom</th>
                        <th>Prénoms</th>
                        <th>Matricule</th>
                        <th>Classe</th>
                        <th>Date de paiement</th>  
                        <th>Montant</th>
                      
                      </tr>
                    </thead>
                   
                    <tbody>
                      <tr v-for="(item, index) in ListeDePaiementParMois" :key="item.id" :value="item.id">
                        <td>{{index+1}}</td>
                        <td>{{NomEleve(item.student_id)}}</td>
                        <td>{{PrenomEleve(item.student_id)}}</td>
                        <td>{{MatriculeEleve(item.student_id)}}</td>
                        <td>{{LibelleClasse(item.classe_id)}}</td>
                        <td>{{formaterDate(item.date)}}</td>                                   
                        <td>{{formatageSomme(parseFloat(item.montant))}}</td>
                      </tr>  
                        <tr>
                            <th colspan="6">Montant Total par mois</th>
                            <td style="background-color:aqua;">{{formatageSomme(parseFloat(sommeTotalPayerParMois))}}</td>
                        </tr>                                                           
                    </tbody>
                  </table>
                </div>
              </div>


            </div>
           
          </div>
          <!--Row-->
        
      
    </div>
  </div>
</template>

<script>

// import moment from "moment"
import {mapGetters, mapActions} from "vuex";
import {required} from "vuelidate/lib/validators";
import moment from "moment"
import { formatageSommeSansFCFA,formatageSomme } from "@/Repositorie/Repository";


// const random = () => {
//   return parseInt(Date.now() + Math.random() * 10000).toString(20).slice(-6)
// }
export default {
  components: {  },
    data(){
        return{
          NoteGroupes:[],
          showIsModal: false,
          formData:{
            mois:"",
            date:"",
            niveau_id:"",
            classe_id:"",
            trimestre:"",
            montant:"",
          
            
          },
        
        
          // formData:{
          //   niveau_id:"",
          //   classe_id:"",
          // }
        }
    },
     created(){
      // console.log(this.GetterStudent);
      this.getNiveau();
      this.get_Liste_Cantine();
      this.getClasse();
      this.get_all_student();
       this.getTrimestre();
      this.getMatiere();
        this.getScolarite();
      
    },

   validations:{
        formData:{
            
            date:{required},
            // matiere:{required},
            montant:{required},
        }
    },
    watch:{
     test(){
       if(this.formData.mois != ""){
         this.formData.niveau_id == "",
         this.formData.classe_id == ""
       }
      
     }
    },
     computed:{
     ...mapGetters("parametres",["gettersNiveau", "gettersClasse", "gettersTrimestre", "gettersMatiere"]),
     ...mapGetters("student",["GetterStudent", "GetterNote", "GetterCantine", "GetterScolarite","gettersloadingScolarite"]),

     loadingData(){
    return this.gettersloadingScolarite
       
    },
        AfficherClasse(){
        return this.gettersClasse.filter(tem =>tem.niveau_id == this.formData.niveau_id)
     },
     ListePaiementParClasse(){
       if(this.formData.niveau_id != "" && this.formData.niveau_id != null && this.formData.classe_id != "" && this.formData.classe_id != null){
         return this.GetterScolarite.filter(tem=>tem.classe_id == this.formData.classe_id)
       }
       return ""
     },
     NomEleve(){
       return (studentId)=>{
         if(studentId != "" && studentId != null){
           let objet = this.GetterStudent.find(tem=>tem.id == studentId)
           if(objet){
             return objet.nom;
           }
         }
       }
     },
     PrenomEleve(){
       return (studentId)=>{
         if(studentId != "" && studentId != null){
           let objet = this.GetterStudent.find(tem=>tem.id == studentId)
           if(objet){
             return objet.prenom;
           }
         }
       }
     },
     DateNaissance(){
       return (studentId)=>{
         if(studentId != "" && studentId != null){
           let objet = this.GetterStudent.find(tem=>tem.id == studentId)
           if(objet){
             return objet.date_naissance;
           }
         }
       }
     },
     SexeEleve(){
       return (studentId)=>{
         if(studentId != "" && studentId != null){
           let objet = this.GetterStudent.find(tem=>tem.id == studentId)
           if(objet){
             return objet.sexe;
           }
         }
       }
     },
     MatriculeEleve(){
       return (studentId)=>{
         if(studentId != "" && studentId != null){
           let objet = this.GetterStudent.find(tem=>tem.id == studentId)
           if(objet){
             return objet.matricule;
           }
         }
       }
     },
     TrimestreEncours(){
       let obj = this.gettersTrimestre.find(tem =>tem.encours == 1)
         if(obj){
           return obj.libelle
         }
         return ""
      
     },
     LibClasse(){
       return (id)=>{
         if(id != "" && id != null){
           let text = this.gettersClasse.find(tem =>tem.id == id)
           if(text){
             return text.libelle;
           }
           return "";
         }
       }
     },

  ScolariteTotalResteAPayer(){
    return this.sommeTotalDesEleves - this.sommeTotalScolarite
  },

//calculer la de la scolarite
    sommeTotalScolarite(){
        return this.convertirTotalSommeScolarite.reduce(function(a, b){
        return a + b;
        }, 0);
    },



  //convertir le tableau string en int de la somme totale des eleves
     convertirTotalSommeScolarite(){
         return this.SommeTotalDeLaScolarite.map((i) => Number(i))
     },

//Returne l'ensemble de sommes des elèves
       SommeTotalDeLaScolarite(){
       let collect =[]
       this.GetterScolarite.filter(item =>{
         this.ScolariteTotale.forEach(element => {        
           if(item.id == element){
             collect.push(item.montant)
           }
         })
       })
       return collect;
     },


//Récupère l ensemble des elèves
ScolariteTotale(){
  let objet = this.GetterScolarite.filter(tem=>tem.classe_id)
  let array_exercie = []
        if (objet.length > 0) {
          objet.forEach(function (val) {
            array_exercie.push(val.id);
          });
          let unique = [...new Set(array_exercie)];
          console.log(unique);
         
          if (unique.length == 0) {
            return [];
          }
          return unique;
        }
        return []
    },

//calculer la somme des notes
    sommeTotalDesEleves(){
        return this.convertirTotalSommeDesEleves.reduce(function(a, b){
        return a + b;
        }, 0);
    },


    //convertir le tableau string en int de la somme totale des eleves
     convertirTotalSommeDesEleves(){
         return this.SommeTotalDesEleve.map((i) => Number(i))
     },

//Returne l'ensemble de sommes des elèves
       SommeTotalDesEleve(){
       let collect =[]
       this.GetterStudent.filter(item =>{
         this.listeDesEleve.forEach(element => {        
           if(item.id == element){
             collect.push(item.scolarite)
           }
         })
       })
       return collect;
     },

//Récupère l ensemble des elèves
listeDesEleve(){
  let objet = this.GetterStudent.filter(tem=>tem.classe_id)
  let array_exercie = []
        if (objet.length > 0) {
          objet.forEach(function (val) {
            array_exercie.push(val.id);
          });
          let unique = [...new Set(array_exercie)];
          console.log(unique);
         
          if (unique.length == 0) {
            return [];
          }
          return unique;
        }
        return []
    },

  ListeDePaiementParMois(){
    if(this.formData.mois != null && this.formData.mois != ""){
      return this.GetterScolarite.filter(tem=>this.formaterDateMois(tem.date) == this.formData.mois)
    }
    return "";
  },


  //calculer la somme des notes
    sommeTotalPayerParClasse(){
        return this.convertirSommePayerParClasses.reduce(function(a, b){
        return a + b;
        }, 0);
    },

     //convertir le tableau string en int de la somme payée par mois
     convertirSommePayerParClasses(){
         return this.SommePayerParClasse.map((i) => Number(i))
     },

   //Returne l'ensemble des paiement effectuer par mois
       SommePayerParClasse(){
       let collect =[]
       this.GetterScolarite.filter(item =>{
         this.SommePayerEleveParClasse.forEach(element => {        
           if(item.id == element){
             collect.push(item.montant)
           }
         })
       })
       return collect;
     },



  //La somme de paiement des élèves par classe
     SommePayerEleveParClasse(){
     if(this.formData.niveau_id != "" && this.formData.niveau_id != null && this.formData.classe_id != "" && this.formData.classe_id != null){
      let objet = this.GetterScolarite.filter(tem=>tem.classe_id == this.formData.classe_id)
       let array_exercie = []
        if (objet.length > 0) {
          objet.forEach(function (val) {
            array_exercie.push(val.id);
          });
          let unique = [...new Set(array_exercie)];
          console.log(unique);
         
          if (unique.length == 0) {
            return [];
          }
          return unique;
        }
      }
       return []
     },

 //calculer la somme des notes
    sommeTotalPayerMoisActuel(){
        return this.convertirSommePayerMoisActuel.reduce(function(a, b){
        return a + b;
        }, 0);
    },

   //convertir le tableau string en int de la somme payée du mois actuel
     convertirSommePayerMoisActuel(){
         return this.SommePayerEleveMoisCourrant.map((i) => Number(i))
     },


  //Returne l'ensemble des paiement effectuer par mois
       SommePayerEleveMoisCourrant(){
       let collect =[]
       this.GetterScolarite.filter(item =>{
         this.SommePaiementMoisActuel.forEach(element => {        
           if(item.id == element){
             collect.push(item.montant)
           }
         })
       })
       return collect;
     },

 //La somme de paiement du mois courrant
     SommePaiementMoisActuel(){
    //  if(this.formData.mois != null && this.formData.mois != ""){
      let objet = this.GetterScolarite.filter(tem=>this.formaterDateMois(tem.date) == this.formaterDateMois(new Date()))
       let array_exercie = []
        if (objet.length > 0) {
          objet.forEach(function (val) {
            array_exercie.push(val.id);
          });
          let unique = [...new Set(array_exercie)];
          console.log(unique);
         
          if (unique.length == 0) {
            return [];
          }
          return unique;
        }
      // }
       return []
     },


   //calculer la somme des notes
    sommeTotalPayerParMois(){
        return this.convertirSommePayerParMois.reduce(function(a, b){
        return a + b;
        }, 0);
    },

     //convertir le tableau string en int de la somme payée par mois
     convertirSommePayerParMois(){
         return this.SommePayerEleveParMois.map((i) => Number(i))
     },

  //Returne l'ensemble des paiement effectuer par mois
       SommePayerEleveParMois(){
       let collect =[]
       this.GetterScolarite.filter(item =>{
         this.SommePaiementParMois.forEach(element => {        
           if(item.id == element){
             collect.push(item.montant)
           }
         })
       })
       return collect;
     },
    
       //La somme de paiement par mois
     SommePaiementParMois(){
     if(this.formData.mois != null && this.formData.mois != ""){
      let objet = this.GetterScolarite.filter(tem=>this.formaterDateMois(tem.date) == this.formData.mois)
       let array_exercie = []
        if (objet.length > 0) {
          objet.forEach(function (val) {
            array_exercie.push(val.id);
          });
          let unique = [...new Set(array_exercie)];
          console.log(unique);
         
          if (unique.length == 0) {
            return [];
          }
          return unique;
        }
      }
       return []
     },

     //Récupère la liste des élèves selectionné
     reuissite(){
       let collect =[]
       this.ListeEleveParClasse.filter(item =>{
         this.NoteGroupes.forEach(element => {        
           if(item.id == element){
             collect.push(item)
           }
         })
       })
       return collect;
     },
       arrayExerciceDecompteBienService() {
        let objet = this.reuissite.filter(tem=>tem.id);
       
        let array_exercie = [];
        if (objet.length > 0) {
          objet.forEach(function (val) {
            array_exercie.push(val.id);
          });
          let unique = [...new Set(array_exercie)];
          console.log(unique);
         
          if (unique.length == 0) {
            return [];
          }
          return unique;
        }
        return [];
    },
     ListeEleveParClasse(){
       
       if(this.formData.niveau_id != "" && this.formData.classe_id != ""){

        return this.GetterStudent.filter(tem =>tem.classe_id == this.formData.classe_id)
       }
       return "";
     },
       LibelleClasse(){
         return (id)=>{
             if(id != "" && id != null){
                let lib = this.gettersClasse.find(tem =>tem.id == id)
                    if(lib){
                        return lib.libelle
                    }
                    return "" 
             }
         }
     },

    
  },

  methods:{
     ...mapActions("parametres",["getNiveau","AjouterNiveau", "ModifierNiveau","SupprimerNiveau","getClasse",
                   "getTrimestre","getMatiere"]),
     ...mapActions("student",["get_all_student","AjouterEleve", "ModifierEleve","SupprimerEleve","AjouterNote", 
                              "ModifierNote", "AjouterCantine", "get_Liste_Cantine", "getScolarite"]),

     ModificationEleve(id){
        this.$router.push({ name:"editStudent", params:{id:id}})
     },
     DetailEleves(id){
        this.$router.push({ name:"DetailEleve", params:{id:id}})
     },

      Modification(id){
        this.showIsModal = true,
        this.editText = this.GetterStudent.find(tem =>tem.id == id)
      },
       fermer(){
        this.$v.formData.$reset();
         this.formData = {
                date:"",              
                montant:"",
                semestre:"",
            };
            this.showIsModal = false
        },
         annuler(){
        this.$v.formData.$reset();
         this.formData = {
                date:"",              
                 montant:"",
                semestre:"",
            };
        },
         viderChamp(){
       
         this.formData.niveau_id="",
         this.formData.classe_id=""
        },
  

        AjouterFonctionLocal(){
             this.$v.formData.$touch();
            if(this.$v.formData.$error) {
                return
            }
          let obj ={
            ...this.formData,
            tableau:this.arrayExerciceDecompteBienService,
            trimestre: this.TrimestreEncours,

          }
          console.log(obj)
          this.AjouterCantine(obj)
          this.$v.formData.$reset();
          this.NoteGroupes=[]
             this.formData={
                date:"",
                montant:"",
                semestre:"",
          }
        },
        formatageSomme:formatageSomme,
    formatageSommeSansFCFA:formatageSommeSansFCFA,
     formaterDate(date) {
      return moment(date, "YYYY-MM-DD HH:mm").format("DD-MM-YYYY HH:mm");
    },
     formaterDateMois(date) {
      return moment(date, "YYYY-MM-DD HH:mm").format("MM");
    },

  },

}
</script>

<style>

</style>