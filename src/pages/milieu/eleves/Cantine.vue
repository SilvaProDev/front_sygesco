<template>
 <div>
   <Loader :isVisible="loadingData"/>
    <div class="container mr-5" id="container-wrapper">
        
            <h3 class="text-center   mb-1">{{ $t("detailPaiementCantine") }}</h3>
         <div class="row">
            <!-- tableau des professeur -->
         
           <div class="col-xl-3 col-md-6 mb-4">
              <div class="card h-100"  style="background-color:yellow;">
                <div class="card-body">
                  <div class="row align-items-center">
                    <div class="col mr-2">
                      <div style="font-size:16px;" class="text-xs font-weight-bold  mb-1">{{ $t("mois_passe") }}</div>
                      <div class="h5 mb-0 font-weight-bold text-gray-800">{{formatageSomme(parseFloat(SommeTotalMoisPasse))}}</div>
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
                      <div style="font-size:16px;" class="text-xs font-weight-bold  mb-1">{{ $t("semaine_passe") }}</div>
                      <div style="font-size:12px;color:#fff;" class="text-xs font-weight-bold  mb-1">
                        Du  {{formaterDate1(compare_day_less_one_week)}}  Au {{formaterDate1(compare_day_to_day)}}
                        </div>
                      <div class="h5 mb-0 font-weight-bold">{{formatageSomme(parseFloat(SommeTotalDuWeekendPasse))}}</div>
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
                      <div style="font-size:16px;" class="text-xs font-weight-bold  mb-1">{{ $t("total_hier") }}</div>
                      <div class="h5 mb-0 font-weight-bold text-gray-800">{{formatageSomme(parseFloat(SommeTotalDUJourMoinsUn))}}</div>
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
              <div class="card h-100"  style="background-color:#FF00FF;">
                <div class="card-body">
                  <div class="row align-items-center">
                    <div class="col mr-2">
                      <div style="font-size:16px;" class="text-xs font-weight-bold  mb-1">{{ $t("total_to_day") }}</div>
                      <div class="h5 mb-0 font-weight-bold ">{{formatageSomme(parseFloat(SommeTotalDUJour))}}</div>
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
        <div class="row">        
        <p class=" text-gray-800 font-weight-bold"> Si vous desirez voir la liste complète de la cantine payée pendant une période précise, Alors  selectionnez uniquement 
          l'intervalle de la <span style="background-color:aqua;">date de début</span> et de la <span style="background-color:aqua;">date de fin</span> 
          </p>
             <div class="row">
             
               <div class="col-6 col-md-3">
                  <div class="form-group">
                      <label for="niveau">{{ $t("ul.niveau") }} </label>                      
                        <select class="form-control" id="niveau" v-model="formData.niveau_id"  
                        :disabled="formData.date_debut != '' && formData.date_fin != ''" >
                          <option value="" selected disabled hidden>Choisir le niveau</option>
                          <option v-for="item in gettersNiveau" :key="item.id" :value="item.id"> {{item.libelle}} </option>
                                              
                      </select>
                  </div>
                </div>
              <div class="col-6 col-md-3">
                  <div class="form-group">
                      <label for="matiere">{{ $t("ul.classe") }} <span style="color:red">*</span> </label>                     
                      <select class="form-control" id="classe" v-model="formData.classe_id"  
                      :disabled="formData.date_debut != '' && formData.date_fin != ''" >
                          <option value="" selected disabled hidden>Choisir la classe</option>
                          <option v-for="item in AfficherClasse" :key="item.id" :value="item.id"> {{item.libelle}} </option>
                                              
                      </select>
                  </div>
              </div>
                 <div class="col-6 col-md-3">
                  <div class="form-group">
                      <label for="code">{{ $t("date_debut") }} <span style="color:red">*</span> </label>   
                      
                      <input type="date" v-model="formData.date_debut"  class="form-control" id="code" aria-describedby="emailHelp"
                      placeholder="Entrer le code"  :disabled="formData.niveau_id != '' && formData.classe_id != ''" >
                  </div>
              </div>
                <div class="col-6 col-md-3">
                  <div class="form-group">
                      <label for="code">{{ $t("date_fin") }} <span style="color:red">*</span> </label>   
                      
                      <input type="date" v-model="formData.date_fin"  class="form-control" id="code" aria-describedby="emailHelp"
                      placeholder="Entrer le code"  :disabled="formData.niveau_id != '' && formData.classe_id != ''">
                  </div>
              </div>
          
             
            </div>
        </div>
         
         <!-- Row -->
          <div class="row"  >
            <!-- Datatables -->
            <div class="col-lg-12">
              <div class="card mb-4">
                <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                  <h6 v-if="formData.niveau_id !='' && formData.classe_id !='' && formData.date_fin != '' " class="m-0 font-weight-bold text-primary">Liste des élèves de la classe de : 
                    <span >{{LibClasse(formData.classe_id)}}</span>
                    ayants payés la cantine </h6>
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
                        <th>Contact Tuteur</th>
                        <th>Date de paiement</th>
                        <th>Montant</th>
                       
                       
                      </tr>
                    </thead>
                   
                    <tbody>

                      <tr v-for="(item, index) in FiltreCantine" :key="item.id" :value="item.id">
                        <td>{{index+1}}</td>
                        <td>{{NomEleve(item.student_id)}}</td>
                        <td>{{PrenomEleve(item.student_id)}}</td>
                        <td>{{MatriculeEleve(item.student_id)}}</td>
                        <td>{{LibelleClasse(item.classe_id)}}</td>
                        <td>{{ContactPrent(item.student_id)}}</td>
                        <td>{{item.date}}</td>
                        <td>{{formatageSomme(parseFloat(item.montant))}}</td>
                       
                      
                      </tr>   
                       <tr>
                            <th v-if="formData.date_fin != ''" colspan="7">Montant Total</th>
                            <td v-if="formData.date_fin != ''" style="background-color:aqua;"> {{formatageSomme(parseFloat(SommeTotal))}}</td>
                            
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
import {mapGetters, mapActions} from "vuex";
import { formatageSommeSansFCFA,formatageSomme } from "@/Repositorie/Repository";

import {required} from "vuelidate/lib/validators";
import moment from "moment"
export default {
 components: {  },
    data(){
        return{
          NoteGroupe:[],
          showIsModal: false,
          formData:{
            date_debut:"",
            date_fin:"",
            classe_id:"",
            niveau_id:"",
            
            
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
      this.getClasse();
      this.get_all_student();
       this.getTrimestre();
      this.getMatiere();
        this.get_Liste_Cantine();
      
    },

   validations:{
        formData:{
            
            date_debut:{required},
            date_fin:{required},
            classe_id:{required},
        }
    },

       computed:{
     ...mapGetters("parametres",["gettersNiveau", "gettersClasse", "gettersTrimestre", "gettersMatiere"]),
    ...mapGetters("student",["GetterStudent", "GetterNote", "GetterCantine","gettersloadingCantine"]),

       loadingData(){
    return this.gettersloadingCantine
       
    },
        AfficherClasse(){
        return this.gettersClasse.filter(tem =>tem.niveau_id == this.formData.niveau_id)
     },
     TrimestreEncours(){
       let obj = this.gettersTrimestre.find(tem =>tem.encours == 1)
         if(obj){
           return obj.libelle
         }
         return ""
      
     },
      //Récupère la somme des montants de la semaine dernière
       SommeTotalMoisPasse(){
        return this.FiltreCantineLastMonth.map(item => item.montant).reduce((prev, curr) => prev + curr, 0);
    },

     //Renvoi le dernier jour du mois précédent
      LastDayOfPrevMonth(){
       var now = new Date();
           var prevMonthLastDate = new Date(now.getFullYear(), now.getMonth(), 0);
         // var prevMonthFirstDate = new Date(now.getFullYear() - (now.getMonth() > 0 ? 0 : 1), (now.getMonth() - 1 + 12) % 12, 1);
          var formatDateComponent = function(dateComponent) {
            return (dateComponent < 10 ? '0' : '') + dateComponent;
          };
          var formatDate = function(date) {
              return date.getFullYear()+ '-' + formatDateComponent(date.getMonth() + 1) + '-' + formatDateComponent(date.getDate())  ;
            };

         return formatDate(prevMonthLastDate);
        
     },
      //Renvoi le premier jour du mois précédent
     FirstDayOfPrevMonth(){
       var now = new Date();
          // var prevMonthLastDate = new Date(now.getFullYear(), now.getMonth(), 0);
          var prevMonthFirstDate = new Date(now.getFullYear() - (now.getMonth() > 0 ? 0 : 1), (now.getMonth() - 1 + 12) % 12, 1);
          var formatDateComponent = function(dateComponent) {
            return (dateComponent < 10 ? '0' : '') + dateComponent;
          };
          var formatDate = function(date) {
              return date.getFullYear()+ '-' + formatDateComponent(date.getMonth() + 1) + '-' + formatDateComponent(date.getDate())  ;
            };

         return formatDate(prevMonthFirstDate);
        
     },
      //Returne la liste de la cantine manger dans la mois dernier
     FiltreCantineLastMonth(){
       return this.GetterCantine.filter(tem=>tem.date >= this.FirstDayOfPrevMonth && tem.date <= this.LastDayOfPrevMonth)
     },


  
     //Récupère la somme des montants de la semaine dernière
       SommeTotalDuWeekendPasse(){
        return this.FiltreToDayLessOneWeek.map(item => item.montant).reduce((prev, curr) => prev + curr, 0);
    },
       //Returne la liste de la cantine manger dans la semaine dernière
     FiltreToDayLessOneWeek(){
       return this.GetterCantine.filter(tem=>tem.date >= this.compare_day_less_one_week && tem.date <= this.compare_day_to_day)
     },
     //La date de la semaine passée
       compare_day_less_one_week(){
      const d = new Date()
      d.setDate(d.getDate() - 14)
      return this.formaterDate(d)
    },
       compare_day_to_day(){
      const d = new Date()
      d.setDate(d.getDate() - 7)
      return this.formaterDate(d)
    },
    compare_day_less_one(){
      const d = new Date()
      d.setDate(d.getDate() - 1)    
      return this.formaterDate(d)
    },
    //Récupère la somme des montants du jour moins un
       SommeTotalDUJourMoinsUn(){
        return this.FiltreToDayLessOne.map(item => item.montant).reduce((prev, curr) => prev + curr, 0);
    },
     //Returne la liste de la cantine manger du jour
     FiltreToDayLessOne(){
       return this.GetterCantine.filter(tem=>tem.date == this.compare_day_less_one)
     },
     //Récupère le somme des montant du jour
      RecuMontantDuJour() {
        let objet = this.FiltreToDayMontant.filter(tem=>tem.id);    
        let array_exercie = [];
        if (objet.length > 0) {
          objet.forEach(function (val) {
            array_exercie.push(val.montant);
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
  
      SommeTotalDUJour(){
        return this.FiltreToDayMontant.map(item => item.montant).reduce((prev, curr) => prev + curr, 0);
    },

     //Returne la liste de la cantine manger du jour
     FiltreToDayMontant(){
       return this.GetterCantine.filter(tem=>tem.date == this.formaterDate(new Date()))
     },
       RecupereLaSomme(){
         let vm = this
       let collect =[]
       vm.GetterCantine.filter(item =>{
         vm.CalculSomme.forEach(element => {        
           if(item.id == element.id){
             collect.push(item.montant)
           }
         })
       })
       return collect;
     },
         CalculSomme(){
            if(this.formData.classe_id != "" && this.formData.niveau_id != ""){
            let objet = this.GetterCantine.filter(tem=>tem.niveau_id == this.formData.niveau_id &&
            tem.classe_id == this.formData.classe_id)
           let array_exercie = []
             if (objet.length > 0) {
          objet.forEach(function (val) {
            array_exercie.push(val);
          });
          let unique = array_exercie;
          console.log(unique);
         
          if (unique.length == 0) {
            return [];
          }
          return unique;
        }
            return []
          }else if(this.formData.date_debut != "" && this.formData.date_fin != ""){
            let objet = this.GetterCantine.filter(tem=> tem.date >= this.formData.date_debut &&
             tem.date <= this.formData.date_fin)
           let array_exercie = []
             if (objet.length > 0) {
          objet.forEach(function (val) {
            array_exercie.push(val);
          });
          let unique = array_exercie;
          console.log(unique);
         
          if (unique.length == 0) {
            return [];
          }
          return unique;
        }
            return []
          }
          else if(this.formData.date_debut != "" && this.formData.date_fin != "" &&
            this.formData.classe_id != "" && this.formData.niveau_id != "")
            {
            let objet =  this.GetterCantine.filter(tem=>tem.niveau_id == this.formData.niveau_id ||
            tem.classe_id == this.formData.classe_id || tem.date >= this.formData.date_debut || 
                tem.date <= this.formData.date_fin)
           let array_exercie = []
             if (objet.length > 0) {
          objet.forEach(function (val) {
            array_exercie.push(val);
          });
          let unique = array_exercie;
          console.log(unique);
         
          if (unique.length == 0) {
            return [];
          }
          return unique;
        }
            return []
          }
          return "";
     },
       //calculer la somme des notes
    SommeTotal(){
        return this.RecupereLaSomme.reduce(function(a, b){
        return a + b;
        }, 0);
    },
       //convertir le tableau string en int
    //  convertirSomme(){
    //      return this.CalculSomme.map((i) => Number(i))
    //  },
  
     FiltreCantine(){
       if(this.formData.classe_id != "" && this.formData.niveau_id != ""){
            return this.GetterCantine.filter(tem=>tem.niveau_id == this.formData.niveau_id &&
            tem.classe_id == this.formData.classe_id )
          }else if(this.formData.date_debut != "" && this.formData.date_debut != null &&
           this.formData.date_fin != "" && this.formData.date_fin != null
          ){
            return this.GetterCantine.filter(tem=>tem.date >= this.formData.date_debut && 
                tem.date <= this.formData.date_fin)
          }else if( this.formData.niveau_id != "" &&  this.formData.classe_id != "" &&
            this.formData.date_fin != "" && this.formData.date_debut != "" )
            {
            return this.GetterCantine.filter(tem=>tem.niveau_id == this.formData.niveau_id ||
            tem.classe_id == this.formData.classe_id || tem.date >= this.formData.date_debut || 
                tem.date <= this.formData.date_fin)
          }
          return "";
     },

        NomEleve(){
        return (id)=>{
         if(id != "" && id != null){
           let text = this.GetterStudent.find(tem =>tem.id == id)
           if(text){
             return text.nom;
           }
           return "";
         }
       }
     },
      PrenomEleve(){
        return (id)=>{
         if(id != "" && id != null){
           let text = this.GetterStudent.find(tem =>tem.id == id)
           if(text){
             return text.prenom;
           }
           return "";
         }
       }
     },
 
     ContactPrent(){
      return (id)=>{
         if(id != "" && id != null){
           let text = this.GetterStudent.find(tem =>tem.id == id)
           if(text){
             return text.contact_tuteur;
           }
           return "";
         }
       }
     },
     MatriculeEleve(){
      return (id)=>{
         if(id != "" && id != null){
           let text = this.GetterStudent.find(tem =>tem.id == id)
           if(text){
             return text.matricule;
           }
           return "";
         }
       }
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
     //Récupère la liste des élèves selectionné
     reuissite(){
       let collect =[]
       this.ListeEleveParClasse.filter(item =>{
         this.NoteGroupe.forEach(element => {        
           if(item.id == element){
             collect.push(item)
           }
         })
       })
       return collect;
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
                              "ModifierNote", "AjouterCantine", "get_Liste_Cantine"]),
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
                libelle:"",
                matiere:"",
            };
            this.showIsModal = false
        },
         annuler(){
        this.$v.formData.$reset();
         this.formData = {
                date:"",              
                libelle:"",
                matiere:"",
            };
        },
  

        AjouterFonctionLocal(){
             this.$v.formData.$touch();
            if(this.$v.formData.$error) {
                return
            }
          let obj ={
            ...this.formData,
            student_id: this.editText.id,
            trimestre: this.TrimestreEncours,

          }
          this.AjouterNote(obj)
          this.$v.formData.$reset();
             this.formData={
                date:"",
               
                libelle:"",
                matiere:"",
          }
        },
          formatageSomme:formatageSomme,
    formatageSommeSansFCFA:formatageSommeSansFCFA,
      formaterDate1(date) {
      return moment(date, "YYYY-MM-DD").format("DD-MM-YYYY");
    },
      formaterDate(date) {
      return moment(date, "YYYY-MM-DD").format("YYYY-MM-DD");
    },

  },

}
</script>

<style>

</style>