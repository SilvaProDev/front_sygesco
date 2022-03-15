<template>
  <div>
      <!-- <Entete/> -->
          <!-- <table  class="table">
          <tr>
          
            <td >
                <img src="/front/img/logo/logo.png" width="60px;"  />       
            </td>
            <td >
                <img src="/front/img/tel.jpg" width="60px;"  />
                <span>Téléphone</span>  <br>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <span>(+225) 0746140200 </span>
            </td>
            <td >
            <img src="/front/img/local.jpg"  width="70px;" />
            <span>SITUATION GÉOGRAPHIQUE</span> <br> 
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <span>Plateaux, Avenue Nogues</span>
                
            </td>
            <td>
                <img src="/front/img/Armoiries.png" width="80px;"  />
              
            </td>
          </tr>
        </table> -->
       <div class="container-fluid" id="container-wrapper">
          <div class="d-sm-flex align-items-center justify-content-between mb-2 ml-5">
            <div class="row">         
              
              <div class="col-6 col-md-3">
                  <div class="form-group" v-if="this.getterProfileUsers.role_id == 1">
                      <label for="niveau">{{ $t("ul.niveau") }} </label>
                      
                        <select class="form-control" id="niveau" v-model="formData.niveau_id" >
                          <option value="" selected disabled hidden >Selectionner le niveau</option>
                          <option v-for="item in tester" :key="item.id" :value="item.id"> {{item.libelle}} </option>
                                              
                      </select>
                  </div>
                  <div class="form-group" v-if="this.getterProfileUsers.role_id == 3">
                      <label for="niveau">{{ $t("ul.niveau") }} </label>
                      
                        <select class="form-control" id="niveau" v-model="formData.niveau_id" >
                          <option value="" selected disabled hidden>Selectionner le niveau</option>
                          <option v-for="item in tester" :key="item" :value="item"> {{AfficherNiveau(item)}} </option>
                                              
                      </select>
                  </div>
                </div>
               
              <div class="col-6 col-md-3">
                  <div class="form-group"  v-if="this.getterProfileUsers.role_id == 1">
                      <label for="niveau">{{ $t("ul.classe") }} </label>
                      
                        <select class="form-control" id="classe" v-model="formData.classe_id"  >
                          <option value="" selected disabled hidden>Selectionner la classe</option>
                          <option v-for="item in AfficherClasse" :key="item.id" :value="item.id"> {{(item.libelle)}} </option>
                                              
                      </select>
                  </div>
                  <div class="form-group"  v-if="this.getterProfileUsers.role_id == 3">
                      <label for="niveau">{{ $t("ul.classe") }} </label>
                      
                        <select class="form-control" id="classe" v-model="formData.classe_id"  >
                          <option value="" selected disabled hidden>Selectionner la classe</option>
                          <option v-for="item in reuissite" :key="item.id" :value="item.id"> {{item.libelle}} </option>
                                              
                      </select>
                  </div>
                </div>
              
            </div>
          </div>
        
      <!-- {{reuissite}} -->

          <!-- Row -->
          <div class="row">
            <!-- Datatables -->
            <div class="col-lg-12">
              <div class="card mb-4">
                <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                  <h6 class="m-0 font-weight-bold text-primary">{{ $t("ul.liste") }}  : <span v-if="formData.niveau_id !='' && formData.classe_id !='' ">{{LibClasse(formData.classe_id)}}</span> </h6>
                </div>
                <div class="table-responsive p-3">
                  
                  <table class="table align-items-center table-flush bars" id="dataTable">
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

                      <tr v-for="(item, index) in ListeEleveParClasse" :key="item.id" :value="item.id">
                        <td>{{index +1}}</td>
                        <td>{{item.nom}}</td>
                        <td>{{item.prenom}}</td>
                        <td>{{item.sexe}}</td>
                        <td>{{item.date_naissance}}</td>
                        <td>{{item.matricule}}</td>
                        <td>{{item.oriente}}</td>
                        <td>{{LibelleClasse(item.classe_id)}}</td>
                        <td> 
                          <a class="btn btn-primary" title="Modifier" href="" @click.prevent="Modification(item.id)">
                            Nouvelle note
                          </a> 
                       
                         
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
      <div class="modale card" >
          <button class="close" @click="fermer">x</button>
          
           <h4>Ajout de note: {{editText.nom}} {{editText.prenom}} -- {{LibClasse(editText.classe_id)}} &nbsp;&nbsp; </h4>
         
               
           <div class="card-body">
             <form action="" method="post">
              <div class="form-group">
                  <label for="code">Trimestre </label>   
                   
                  <input :value="TrimestreEncours"  disabled  type="text"  class="form-control" id="code" aria-describedby="emailHelp"
                  placeholder="Entrer le code">
              </div>
              <div class="form-group" v-if="this.getterProfileUsers.role_id == 1">
                  <label for="matiere">Matiere </label>                     
                   <select class="form-control" id="classe" v-model="formData.matiere_id" @input="$v.formData.matiere_id.$touch()">
                   <option value="" selected disabled hidden>Selectionner la matière</option>
                    <option v-for="item in AfficherMatiere" :key="item.id" :value="item.id"> {{LibelleMatiere(item.nouvelle_matiere_id)}} </option>                  
                                          
                  </select>
              </div>
              <div class="form-group" v-if="this.getterProfileUsers.role_id == 3">
                  <label for="matiere">Matiere </label>                     
                   <select class="form-control" id="classe" v-model="formData.matiere_id" @input="$v.formData.matiere_id.$touch()">
                    <option v-for="item in reuissite1" :key="item.id" :value="item.id"> {{LibelleMatiere(MatiereId(item.id))}} </option>                  
                                          
                  </select>
              </div>
              <div class="form-group">
                  <label for="libelle">Note </label>   
                   
                  <input @input="$v.formData.note.$touch()" v-model="formData.note"   type="text"  class="form-control" id="note" aria-describedby="emailHelp"
                  placeholder="Entrer la note">
              </div>
              <div class="form-group">
                  <label for="scolarite">Date d'enrégistrement </label>   
                   
                  <input v-model="formData.date" @input="$v.formData.date.$touch()"  type="date"  class="form-control" id="scolarite" aria-describedby="emailHelp"
                  placeholder="Entrer le scolarite">
              </div>

               <button   @click.prevent="AjouterFonctionLocal" type="submit" class="btn btn-primary ml-5">Enrégistrer</button>
                &nbsp;
                <button @click.prevent="annuler" type="submit" class="btn btn-warning">Annuler</button>
                &nbsp;
                <button @click.prevent="fermer" class="btn btn-danger">Fermer</button>
         </form>
          </div>
       
          
        </div>
      </div>
  </div>
        </div>
         <!-- modal modifier -->
  <!-- modal fin -->


 
        <notifications  />
  </div>
</template>

<script>

// import moment from "moment"
import {mapGetters, mapActions} from "vuex";
import {required} from "vuelidate/lib/validators";
// import Entete from "../Entete.vue"


// const random = () => {
//   return parseInt(Date.now() + Math.random() * 10000).toString(20).slice(-6)
// }
export default {
  components: {  },
    data(){
        return{
         
          showIsModal: false,
          formData:{
            date:"",
            trimestre_id:"",
            note:"",
            matiere_id:"",
            classe_id:"",
            niveau_id:""
            
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
      this.getNouvelleMatiere();
      this.get_all_student();
       this.getTrimestre();
      this.getMatiere();
          this.getUserProfile();
        //    this.login();
             this.getRole();
      
    },

   validations:{
        formData:{
            
            date:{required},
            matiere_id:{required},
            note:{required},
            classe_id:{required},
        }
    },
     computed:{
     ...mapGetters("parametres",["gettersNiveau", "gettersClasse", "gettersTrimestre", "gettersMatiere","gettersNouvelleMatiere"]),
     ...mapGetters("student",["GetterStudent"]),
     ...mapGetters('personnel', ['getterProfileUsers', "gettersRole"]),

    AfficherNiveau(){
    return (id)=>{
        if(id != ''){
            let test = this.gettersNiveau.find(tem=>tem.id == id)
            if(test){
                return test.libelle
            }
        }
    }
},
      tester2(){
       let objet = this.getterProfileUsers.affectations
       let tableau =[]
       if(objet.length >0){
         objet.forEach(elt => {
           tableau.push(elt.matiere_id)
         });
         let unique = [...new Set(tableau)];
         console.log(unique)
         if(unique.length == 0){
           return []
         }
         return unique
       }
       return []
     },
      tester1(){
       let objet = this.getterProfileUsers.affectations
       let tableau =[]
       if(objet.length >0){
         objet.forEach(elt => {
           tableau.push(elt.classe_id)
         });
         let unique = [...new Set(tableau)];
         console.log(unique)
         if(unique.length == 0){
           return []
         }
         return unique
       }
       return []
     },
      tester(){
        if(this.getterProfileUsers.role_id == 3){

          let objet = this.getterProfileUsers.affectations
          let tableau =[]
          if(objet.length >0){
            objet.forEach(elt => {
              tableau.push(elt.niveau_id)
            });
            let unique = [...new Set(tableau)];
            console.log(unique)
            if(unique.length == 0){
              return []
            }
            return unique
          }
         
        } 
        return this.gettersNiveau
     },
       reuissite(){
         if(this.formData.niveau_id != '' && this.getterProfileUsers.role_id == 3){

           let collect =[]
           this.AfficherClasse.filter(item =>{
             this.tester1.filter(element => {        
               if(item.id == element){
                 collect.push(item)
                //  [...new Set()]
                 
               }
             })
           })
         return collect;
         } return []
         
     },
    //       LibelleMatiere(){
    //    return (id)=>{
    //      if(id != ""){
    //        let obj = this.gettersNouvelleMatiere.find(tem=>tem.id == id)
    //        if(obj){
    //          return obj.libelle;
    //        }
    //      }
    //    }
    //  },
     MatiereId(){
       return (id)=>{
         if(id != ""){
           let obj = this.gettersMatiere.find(tem=>tem.id == id)
           if(obj){
             return obj.nouvelle_matiere_id;
           }
         }
       }
     },
       reuissite1(){
         if(this.formData.classe_id != ''){

           let collect =[]
           this.AfficherMatiere.filter(item =>{
             this.tester2.filter(element => {        
               if(item.id == element){
                 collect.push(item)
                //  [...new Set()]
                 
               }
             })
           })
       return collect;
         }
         return []
     },

     StatutMatiere(){
       if(this.formData.matiere_id !=""){
         let objet = this.gettersMatiere.find(tem=>tem.id == this.formData.matiere_id)
         if(objet){
           return objet.statut
         }
       }
       return ""

     },
        AfficherMatiere(){
        return this.gettersMatiere.filter(tem =>tem.classe_id == this.formData.classe_id)
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
     TrimestreEncoursId(){
       let obj = this.gettersTrimestre.find(tem =>tem.encours == 1)
         if(obj){
           return obj.id
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
        LibelleMatiere(){
       return (id)=>{
         if(id != ""){
           let obj = this.gettersNouvelleMatiere.find(tem=>tem.id == id)
           if(obj){
             return obj.libelle;
           }
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

  methods:{
     ...mapActions("parametres",["getNiveau","AjouterNiveau", "ModifierNiveau","SupprimerNiveau","getClasse",
                   "getTrimestre","getMatiere","getNouvelleMatiere"]),
     ...mapActions("student",["get_all_student","AjouterEleve", "ModifierEleve","SupprimerEleve","AjouterNote", "ModifierNote"]),
     ...mapActions('personnel', ['getUserProfile','changePassword',"getRole"]),
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
         this.formData.date =""
         this.formData.note =""
         this.formData.matiere_id =""
            this.showIsModal = false
        },
         annuler(){
        this.$v.formData.$reset();
         this.formData.date =""
         this.formData.note =""
         this.formData.matiere_id =""
        
        },
  

        AjouterFonctionLocal(){
             this.$v.formData.$touch();
            if(this.$v.formData.$error) {
                return
            }
          let obj ={
            ...this.formData,
            student_id: this.editText.id,
           
            trimestre_id: this.TrimestreEncoursId,
            statut: this.StatutMatiere,

          }
          // console.log(obj)
          this.AjouterNote(obj)
          this.$v.formData.$reset();
          this.formData.date ="";
          this.formData.matiere_id ="";
          this.formData.note ="";
          //    this.formData={
          //       date:"",
               
          //       libelle:"",
          //       classe_id:"",
          //       matiere_id:"",
          // }
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
        top: 20%;
        left: 35%;
}

 .close{
  position: absolute;
  top: 10px;
  right: 10px;
}
.bars{
    width: 100%;
    height: 1 px;
    /* margin-left: 30px; */
     border: 1px solid #000;
    
}
</style>