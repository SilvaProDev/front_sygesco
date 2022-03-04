<template>
  <div>
       <div>
          <h1 class="ml-5">Envoi des sms au parents</h1> 
       </div> 
      <div class="d-sm-flex align-items-center justify-content-between  mb-2 ml-5">
            <div class="row">         
               <div class="col-6 col-md-3">
                  <div class="form-group">
                      <label for="niveau">{{ $t("ul.niveau") }} </label>
                      
                        <select class="form-control" id="niveau" v-model="formData.niveau_id" >
                          <option value="" >Choisir le niveau</option>
                          <option v-for="item in gettersNiveau" :key="item.id" :value="item.id"> {{item.libelle}} </option>
                                              
                      </select>
                  </div>
                </div>
              <div class="col-6 col-md-3">
                  <div class="form-group">
                      <label for="niveau">{{ $t("ul.classe") }} </label>
                      
                        <select class="form-control" id="classe" v-model="formData.classe_id"  >
                          <option value="">Choisir la classe</option>
                          <option v-for="item in AfficherClasse" :key="item.id" :value="item.id"> {{item.libelle}} </option>
                                              
                      </select>
                  </div>
                </div>
            
              
            </div>
          </div>
        <p v-if="formData.classe_id == '' && formData.niveau_id == ''" class=" ml-5 text-gray-800 font-weight-bold"> Selectionnez  le niveau et la classe pour envoyer le message </p>
          
         

          <div class="row">
           
            <div class="col-lg-12" v-if="formData.classe_id  && formData.niveau_id && NumeroParent.length !=0">
              <!-- General Element -->
              <div class="card mb-4 m-3">
                <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                  <h6 class="m-0 font-weight-bold text-primary">Envoi de message aux parents d'élèves</h6>
                </div>
                <div class="card-body">
                  <form>
                    <div class="form-group">
                      <label for="date">Date d'envoi de sms</label>
                       <span style="color:red; font-style:italic;"
                          v-if="$v.formData.date.$error && !$v.formData.date.required"
                          role="alert"> 
                          <span style="color:red; font-weight:bold">*</span>
                          Ce champs est obligatoire!
                      </span>
                    <input v-model="formData.date" type="datetime-local" class="form-control" id="date">
                    </div>
                    <div class="form-group">
                      <label for="exampleFormControlInput1">Contact Parent</label>
                     <textarea disabled :value="NumeroParent" class="form-control" id="exampleFormControlInput1" rows="1"></textarea>
                    </div>
                            
                    <div class="form-group">
                      <label for="exampleFormControlTextarea1">Message</label>
                       <span style="color:red; font-style:italic;"
                          v-if="$v.formData.message.$error && !$v.formData.message.required"
                          role="alert"> 
                          <span style="color:red; font-weight:bold">*</span>
                          Ce champs est obligatoire!
                      </span>
                      <textarea v-model="formData.message" class="form-control" id="exampleFormControlTextarea1" rows="2"></textarea>
                    </div>
              

                     <button   @click.prevent="AjouterFonctionLocal" type="submit" class="btn btn-primary ">Enrégistrer</button>
                    <!-- &nbsp;
                    <button @click.prevent="annuler" type="submit" class="btn btn-warning">Annuler</button>
                    &nbsp;
                    <button @click.prevent="fermer" class="btn btn-danger">Fermer</button> -->
                    <div class="mt-3">

                    </div>
                  </form>
                </div>
              </div>
              <!-- Input Group -->
            
          </div>
          <div class="col-lg-12" v-if="formData.classe_id  && formData.niveau_id && NumeroParent.length ==0">
              <!-- General Element -->
              <div class="card mb-4 m-3">
                
                <h4 class="ml-5" style="color:red;">Il n y a pas d'élèves enrégistrés dans cette classe</h4>
              </div>
              <!-- Input Group -->
            
          </div>
          </div>
          <!--Row-->

         

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
          showIsModal: false,
          formData:{
            date:"",                  
            niveau_id:"",                  
            
            classe_id:"",
            
            message:"",
            
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
            date:{required},
         //   classe_id:{required},
            message:{required},
          // sujet:{required},

        }
    },
     computed:{
     ...mapGetters("parametres",["gettersNiveau", "gettersClasse", "gettersTrimestre", "gettersMatiere", "gettersAnne"]),
     ...mapGetters("student",["GetterStudent", "GetterScolarite"]),


      
        AfficherClasse(){
        return this.gettersClasse.filter(tem =>tem.niveau_id == this.formData.niveau_id)
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
    test(){
        if(this.formData.niveau_id != null && this.formData.niveau_id != "" && 
        this.formData.classe_id != null && this.formData.classe_id != ""){
      let objet = this.GetterStudent.filter(tem=>tem.classe_id == this.formData.classe_id)
      if(objet){
          return objet.email
      }
      return ""
      }
      return ""
    },

       //La somme de paiement par mois
     NumeroParent(){
     if(this.formData.niveau_id != null && this.formData.niveau_id != "" && 
        this.formData.classe_id != null && this.formData.classe_id != ""){
      let objet = this.GetterStudent.filter(tem=>tem.classe_id == this.formData.classe_id)
       let array_exercie = []
        if (objet.length > 0) {
          objet.forEach(function (val) {
            array_exercie.push(val.contact_pere);
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
                   "getTrimestre","getMatiere", "getAnnee", "AjouterMessageEmail", "AjouterMessageSms"]),
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
         this.formData = {
               date:"",
            //    sujet:"",
                message:"",
            };
            this.showIsModal = false
            this.getScolarite()
        },
         annuler(){
        this.$v.formData.$reset();
         this.formData = {
                date:"",
            //    sujet:"",
                message:"",
                                     
            };
         //   this.getScolarite()
        },
  

        AjouterFonctionLocal(){
             this.$v.formData.$touch();
            if(this.$v.formData.$error) {
                return
            }
          let obj ={
            ...this.formData,
            annee_id: this.AnneEncours,
         //   EmailParent: this.NumeroParent

          }
          console.log(obj)  
         this.AjouterMessageSms(obj)
          // this.$v.formData.$reset();
          //    this.formData={
          //      date:"",
          //       sujet:"",
          //       message:"",
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
        top: 10%;
        left: 35%;
}

 .close{
  position: absolute;
  top: 10px;
  right: 10px;
}
</style>