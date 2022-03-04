<template>
  <div>
       <div>
          <h1 class="text-center">Paiement du transport de l'élève</h1> 
       </div> 
      <div class="d-sm-flex align-items-center justify-content-between mb-2 ml-5">
            <div class="row">         
               <div class="col-6 col-md-3">
                  <div class="form-group">
                      <label for="niveau">{{ $t("ul.niveau") }} </label>
                      
                        <select class="form-control" id="niveau" v-model="formData.niveau_id" >
                          <option value="">Selectionner le niveau</option>
                          <option v-for="item in gettersNiveau" :key="item.id" :value="item.id"> {{item.libelle}} </option>
                                              
                      </select>
                  </div>
                </div>
              <div class="col-6 col-md-3">
                  <div class="form-group">
                      <label for="niveau">{{ $t("ul.classe") }} </label>
                      
                        <select class="form-control" id="classe" v-model="formData.classe_id"  >
                          <option value="">Selectionner la classe</option>
                          <option v-for="item in AfficherClasse" :key="item.id" :value="item.id"> {{item.libelle}} </option>
                                              
                      </select>
                  </div>
                </div>
              <p class=" ml-5 text-gray-800 font-weight-bold" v-if="formData.niveau_id =='' && formData.classe_id ==''"> 
                 Selectionnez le niveau et la classe pour voir la liste des élèves
               </p>
              
            </div>
            <!-- {{gettersAnne}} -->
          </div>
              <!-- Row -->
          <div class="row p-5" v-if="formData.niveau_id !='' && formData.classe_id !=''">
            <!-- Datatables -->
            <div class="col-lg-12">
              <div class="card mb-4">
                <div class="card-header  d-flex flex-row align-items-center justify-content-between">
                  <h6 class="m-0 font-weight-bold text-primary">La liste des élèves  de la {{LibelleClasse(formData.classe_id)}} </h6>
                   <div class="input-group col-sm-3" v-if="!showIsModal">
                        <input type="text" v-model="searchs" class="form-control" placeholder="Recherche par nom, prenom, matricule">
                        <div class="input-group-append">
                        <!-- <button class="btn btn-secondary" type="button">
                            <i class="fa fa-search"></i>
                        </button> -->
                        </div>
                    </div>                
                </div>
                <div class="table-responsive p-3">
                  
                  <table class="table align-items-center table-flush" id="dataTable">
                    <thead class="thead-light">
                      <tr>
                        <th>N°</th>
                        <th>Nom</th>
                        <th>Prénoms</th>
                        <th>Sexe</th>
                        <th>Date Naiss</th>
                        <th>MATRICULE</th>
                        <th>ORIENTE</th>
                        <th>CLASSE</th>
                        <th colspan="3">ACTION</th>
                      </tr>
                    </thead>
                   
                    <tbody>

                      <tr v-for="(item, index) in localisationsFiltre" :key="item.id" :value="item.id">
                        <td>{{index+1}}</td>
                        <td>{{item.nom}}</td>
                        <td>{{item.prenom}}</td>
                        <td>{{item.sexe}}</td>
                        <td>{{item.date_naissance}}</td>
                        <td>{{item.matricule}}</td>
                        <td>{{item.oriente}}</td>
                        <td>{{LibelleClasse(item.classe_id)}}</td>
                        <td> 
                          <a class="btn btn-success" href="" @click.prevent="Modification(item.id)">
                            Payer
                          </a> 
                            &nbsp;
                        
                        </td>
                      </tr>                                                             
                    </tbody>
                  </table>
                </div>
              </div>
           
            </div>
           
          </div>
          <!--Row-->

          <div class="bloc-modale" v-if="showIsModal">
    <div   class="overlay">
      <div class="modale card">
          <!-- <button class="close" @click="fermer">x</button> -->
          
           <h5 class="ml-5" style="color:red;">Paiement du transport </h5>
          
           <div class="card-body">
             <form action="" method="post">
             
              <div class="form-group">
                  <label for="matiere">Toute l'année scolaire</label> 
                    <!-- <span style="color:red; font-style:italic;"
                      v-if="$v.formData.paye_par_annee.$error && !$v.formData.paye_par_annee.required"
                      role="alert">* champs obligatoire!
                  </span>                                  -->
                  <select class="form-control" id="classe" v-model="formData.paye_par_annee" >
                        <option value="" selected disabled hidden> Selectioner </option>
                        <option value="OUI">OUI</option>
                        <option value="NON">NON</option>                                                                           
                    </select>
                  
              </div>
              <div class="form-group" v-if="formData.paye_par_annee =='NON'" >
                  <label for="libelle">Par trimestre/semestre </label>   
                
                   <select class="form-control" id="classe" v-model="formData.trimestre_id">
                        <option value=""></option>
                        <option v-for="item in gettersTrimestre" :key="item.id" :value="item.id">{{item.libelle}}</option>
                                                     
                    </select>
              </div>
              <div class="form-group" v-if="formData.paye_par_annee !='' || formData.trimestre_id != ''">
                  <label for="date_debut">Montant </label>   
                   <span style="color:red; font-style:italic;"
                        v-if="$v.formData.montant.$error && !$v.formData.montant.required"
                        role="alert"> 
                         <span style="color:red; font-weight:bold">*</span>
                        champs obligatoire!
                    </span>                 
                  <input v-model="formData.montant"  type="number"  class="form-control" id="date_debut" aria-describedby="emailHelp"
                     @input="$v.formData.montant.$touch()" placeholder="Entrer le montant">
              </div>
              <!-- <div class="form-group">
                  <label for="date_debut">Date du début </label>   
                   <span style="color:red; font-style:italic;"
                        v-if="$v.formData.date_debut.$error && !$v.formData.date_debut.required"
                        role="alert"> 
                         <span style="color:red; font-weight:bold">*</span>
                        champs obligatoire!
                    </span>       
                    
                  <input v-model="formData.date_debut"  type="date"  class="form-control" id="date_debut" aria-describedby="emailHelp"
                  @input="$v.formData.date_debut.$touch()" placeholder="Entrer le date_debut">
              </div> -->
              <!-- <div class="form-group">
                  <label for="date_fin">Date de fin </label>   
                    <span style="color:red; font-style:italic;"
                        v-if="$v.formData.date_fin.$error && !$v.formData.date_fin.required"
                        role="alert">
                         <span style="color:red; font-weight:bold">*</span>
                         champs obligatoire!
                    </span>   
                  <input v-model="formData.date_fin"  type="date"  class="form-control" id="date_fin" aria-describedby="emailHelp"
                   @input="$v.formData.date_fin.$touch()" placeholder="Entrer le date de fin">
              </div> -->

               <button   @click.prevent="AjouterFonctionLocal" type="submit" class="btn btn-primary ">Enrégistrer</button>
                &nbsp;
                <button @click.prevent="annuler" type="submit" class="btn btn-warning">Annuler</button>
                &nbsp;
                <button @click.prevent="fermer" class="btn btn-danger">Fermer</button>
         </form>
          </div>
       
          
        </div>
      </div>
  </div>
   <notifications  />
  </div>
</template>

<script>

// import moment from "moment"
import {mapGetters, mapActions} from "vuex";
import {required} from "vuelidate/lib/validators";
//import Entete from "../Entete.vue"


// const random = () => {
//   return parseInt(Date.now() + Math.random() * 10000).toString(20).slice(-6)
// }
export default {
  components: {  },
    data(){
        return{
          search:"",
          searchs:"",
          showIsModal: false,
          formData:{
            paye_par_annee:"",                  
            trimestre_id:"",                  
                    
            niveau_id:"",                  
            montant:"",
            classe_id:"",
            
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
       this.getAnnee();
       this.getScolarite();
      
    },

   validations:{
        formData:{
            // niveau_id:{required},
            // classe_id:{required},
            montant:{required},
          //  date_debut:{required},
          //  date_fin:{required},
          //  paye_par_annee:{required},               
          //   trimestre_id:{required}, 

        }
    },
     computed:{
     ...mapGetters("parametres",["gettersNiveau", "gettersClasse", "gettersTrimestre", "gettersMatiere", "gettersAnne"]),
     ...mapGetters("student",["GetterStudent", "GetterScolarite"]),

       localisationsFiltre() {
      const searchTerm = this.searchs.toLowerCase();

      return this.ListeEleveParClasse.filter((item) => {
        return (
          item.nom.toLowerCase().includes(searchTerm) ||
          item.prenom.toLowerCase().includes(searchTerm) ||
          item.matricule.toLowerCase().includes(searchTerm)
        );
      });
      
    },
        AfficherClasse(){
        return this.gettersClasse.filter(tem =>tem.niveau_id == this.formData.niveau_id)
     },
     AnneeEnCours(){
       if(this.formData.paye_par_annee != ''){
         let objet = this.gettersAnne.find(tem=>tem.encours == 1)
         if(objet){
           return objet.id;
         }
       }
       return ""
     },
  
     trimestreId(){
       if( this.formData.paye_par_annee == 'NON' && this.formData.trimestre_id != ''){
         let objet = this.gettersTrimestre.find(tem=>tem.id == this.formData.trimestre_id)
         if(objet){
           return objet.id;
         }
         return ""
       }
       return ""
     },
     MontantTotalApayer(){
       return this.editText.scolarite;
     },
     ResteaPayer(){
       if(this.sommeTotalPayer != 0){
         return this.editText.scolarite - this.sommeTotalPayer;
       }
       return this.editText.scolarite
     },

       //calculer la somme des notes
    sommeTotalPayer(){
        return this.convertirSommePayer.reduce(function(a, b){
        return a + b;
        }, 0);
    },

       //convertir le tableau string en int
     convertirSommePayer(){
         return this.SommePayerParEleve.map((i) => Number(i))
     },
      //Returne l'ensemble des paiement effectuer par l'élève
       SommePayerParEleve(){
       let collect =[]
       this.GetterScolarite.filter(item =>{
         this.ResteScolarite.forEach(element => {        
           if(item.id == element){
             collect.push(item.montant)
           }
         })
       })
       return collect;
     },

     //Filtre etudiant ayant payer la scolarité
     ResteScolarite(){
       let objet = this.GetterScolarite.filter(tem=>tem.student_id == this.editText.id)
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
      AnneEncours(){
       let obj = this.gettersAnne.find(tem=>tem.encours == 1)
       if(obj){
         return obj.id;
       }
       return ""
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
    watch: {
  
    search:function(value){

      if(value != ""){
      this.getEleveParClasse(value)
      }
    }
  },

  methods:{
     ...mapActions("parametres",["getNiveau","AjouterNiveau", "ModifierNiveau","SupprimerNiveau","getClasse",
                   "getTrimestre","getMatiere", "getAnnee", "AjouterTransport", "ModifierTransport"]),
     ...mapActions("student",["get_all_student","AjouterEleve", "ModifierEleve","SupprimerEleve","AjouterNote", 
                  "ModifierNote", "getEleveParClasse", "AjouterScolarite", "ModifierScolarite", "getScolarite"]),

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
        //  this.formData = {
        //          montant:"",
        //     };
         this.formData.montant="",
         this.formData.trimestre_id="",
         this.formData.paye_par_annee="",
            this.showIsModal = false
            this.getScolarite()
        },
         annuler(){
        this.$v.formData.$reset();
        //  this.formData = {
                this.formData.montant="",
                 this.formData.trimestre_id="",
                 this.formData.paye_par_annee="",
                                     
            // };
            this.getScolarite()
        },
  

        AjouterFonctionLocal(){
             this.$v.formData.$touch();
            if(this.$v.formData.$error) {
                return
            }
          let obj ={
            ...this.formData,
            student_id: this.editText.id,
            annee_id: this.AnneeEnCours,
            // trimestre_id: this.trimestreId
    
            // student_id: this.editText.id,
            // annee_id: this.AnneEncours

          }
          console.log(obj)
           this.AjouterTransport(obj)
          this.$v.formData.$reset();
            this.formData.montant="",
            this.formData.trimestre_id="",
            this.formData.paye_par_annee=""
        }

  },

}
</script>

<style scoped>


 .bloc-modale{
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        display: flex;
        justify-content: center;
        align-items: center;
    }
 .overlay {
   background: rgba(0, 0, 0, 0.5);
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;   
}

 .modale {
  background: #f1f1f1;
        color: #333;
        padding: 30px;
        position: fixed;
        top: 10%;
        left: 35%;
}

 .close{
  position: absolute;
  top: 10px;
  right: 10px;
}
</style>