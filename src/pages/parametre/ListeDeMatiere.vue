<template>
  <div>
    <Entete/>
        <div class="container ml-5">
              <div style="margin-left:100%">
                     <button type="button" class="btn btn-info" @click.prevent="Retour()">Retour</button> &nbsp;
                </div>
          <div class="row">
              <div style="margin-left:80%">
                     <button type="button" class="btn btn-warning" @click.prevent="CallBack()">Nouvelle matière</button> &nbsp;
                </div>
            <div class="col-lg-11 mb-4">
              <div class="card">
                <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                  <h6 class="m-0 font-weight-bold text-primary">La liste des matières de {{LibelleClasses(ParentId)}} </h6>
                 
                </div>
                <div class="table-responsive">
                  <table class="table align-items-center table-flush">
                    <thead class="thead-light">
                      <tr >
                        <th>N°</th>
                        <th>Matière</th>
                       <!-- <th>Serie</th> -->
                      
                        <th>Coefficient</th> 
                        
                        <th  colspan="2" >Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(item, index) in ListeDeMatiere" :key="item.id">
                        <td>{{index+1}}</td>
                        <td>{{LibelleMatiere(item.nouvelle_matiere_id)}}</td>
                        <td>{{item.coefficient}}</td>

                       
                         <!-- <td >{{item.serie}}</td> -->
                       
                        <td>
                           <button  @click="editModale(item.id)" title="Modifier" type="button"  data-toggle="modal" data-target="#exampleModalCenter">
                              <i style="color:green;" class="fas fa-edit"> </i>
                            </button>
                        
                              &nbsp;
                          <a title="Supprimer"  @click.prevent="SupprimerMatiere(item.id)">
                          
                            <i style="color:red;" class="fas fa-trash"></i>
                            </a>
                          </td>
                      </tr>
                                                         
                    </tbody>
                  </table>
                </div>
              
              </div>
            </div>
          </div>
        </div>

  <!-- modal ajout -->
  <div class="bloc-modale" v-if="showModal">
    <div   class="overlay">
      <div class="modale card" >
          
          
           <h4>Enrégistrement des matières </h4>
           
           <div class="card-body">
             <form action="" method="post">
              
               <div class="row">
                    <div class="col-sm-6">
                      <label for="niveau">Niveau </label>
                     <span style="color:red; font-style:italic;"
                      v-if="$v.formData.niveau_id.$error && !$v.formData.niveau_id.required"
                      role="alert"> 
                      <span style="color:red; font-weight:bold">*</span>
                      Ce champs est obligatoire!
                  </span>  
                    <select class="form-control" id="classe" v-model="formData.niveau_id" @input="$v.formData.niveau_id.$touch()" >
                      <option value="">Selectionnez le Niveau</option>
                      <option v-for="item in gettersNiveau" :key="item.id" :value="item.id"> {{item.libelle}} </option>
                                          
                  </select>
                    </div>
                  
                 <div class="col-sm-6">
                      <label for="niveau">{{ $t("ul.classe") }} </label>
                      
                        <select class="form-control" id="classe" v-model="formData.classe_id"  >
                          <option value="">Selectionnez la classe</option>
                          <option v-for="item in AfficherClasse" :key="item.id" :value="item.id"> {{item.libelle}} </option>
                                              
                      </select>
                  </div>

                  </div>

            <div class="row">
               <div class="col-sm-6" v-if="LibelleNiveau(formData.niveau_id) == '1ère'">
                          <label for="niveau">Serie </label>
                              
                            <select class="form-control" id="classe" v-model="formData.serie" >
                              <option value="">Selectionnez la Serie</option>
                              <option value="1èreA">1ère A</option>
                              <option value="1èreC">1ère C</option>
                              <option value="1èreD">1ère D</option>
                              
                                                  
                          </select>
                      </div>
                    <div class="col-sm-6" v-if="LibelleNiveau(formData.niveau_id) == '2nde'">
                          <label for="niveau">Serie </label>
                              
                            <select class="form-control" id="classe" v-model="formData.serie" >
                              <option value="">Selectionnez la Serie</option>
                              <option value="2ndeC">2nde C</option>
                              <option value="2ndeA">2nde A</option>                                                                           
                          </select>
                      </div>
                    <div class="col-sm-6" v-if="LibelleNiveau(formData.niveau_id) == 'Tle'">
                          <label for="niveau">Serie </label>
                            
                            <select class="form-control" id="classe" v-model="formData.serie" >
                              <option value="">Selectionnez la Serie</option>
                              <option value="TleA">Tle A</option>
                              <option value="TleC">Tle C</option>
                              <option value="TleD">Tle D</option>                                                                         
                          </select>
                      </div>
                      <div class="col-sm-6">
                      <label for="niveau">Matière </label>
                         <span style="color:red; font-style:italic;"
                              v-if="$v.formData.nouvelle_matiere_id.$error && !$v.formData.nouvelle_matiere_id.required"
                              role="alert"> 
                              <span style="color:red; font-weight:bold">*</span>
                              Ce champs est obligatoire!
                          </span>
                        <select class="form-control" id="classe" v-model="formData.nouvelle_matiere_id" @input="$v.formData.nouvelle_matiere_id.$touch()" >
                          <option value="">Selectionnez la classe</option>
                          <option v-for="item in gettersNouvelleMatiere" :key="item.id" :value="item.id"> {{item.libelle}} </option>
                                              
                      </select>
                  </div>
                <!-- <div class="col-sm-6">
                  <label for="libelle">Matière </label>   
                <span style="color:red; font-style:italic;"
                    v-if="$v.formData.libelle.$error && !$v.formData.libelle.required"
                    role="alert"> 
                    <span style="color:red; font-weight:bold">*</span>
                    Ce champs est obligatoire!
                </span>  
                <input @input="$v.formData.libelle.$touch()" v-model="formData.libelle"   type="text"  class="form-control" id="libelle" aria-describedby="emailHelp"
                placeholder="Entrer la matière">
            </div> -->
            
            </div>

              <div class="row">
                          
              <div class="col-sm-6">
                  <label for="libelle">Coefficient </label>   
                   <span style="color:red; font-style:italic;"
                      v-if="$v.formData.coefficient.$error && !$v.formData.coefficient.required"
                      role="alert"> 
                      <span style="color:red; font-weight:bold">*</span>
                      Ce champs est obligatoire!
                  </span>  
                  <input @input="$v.formData.coefficient.$touch()" v-model="formData.coefficient"   type="text"  
                  class="form-control" id="libelle" aria-describedby="emailHelp"
                  placeholder="Entrer le coefficient">

              </div>
                   <div class="col-sm-6">
                      <label for="status">Status </label>
                      
                    <select class="form-control" id="status" v-model="formData.statut" >
                      <option value="">Selectionnez le status</option>
                      <option value="1">Literature</option>                                          
                      <option value="2">science</option>                                          
                      <option value="3">Pas defini</option>                                          
                  </select>
                    </div>
              

              </div>
              <br> <br>

               <button   @click.prevent="AjouterFonctionLocal" type="submit" class="btn btn-primary">Enrégistrer</button>
                     &nbsp;
                     <button @click.prevent="annuler" type="submit" class="btn btn-warning">Annuler</button>
                     &nbsp;
                     <button @click.prevent="fermer" class="btn btn-danger">Fermer</button>
         </form>
          </div>
       
          
        </div>
      </div>
  </div>
  <!-- modal fin -->

   <!-- modal modifier -->
  <div class="bloc-modale" v-if="showIsModal">
    <div   class="overlay">
      <div class="modale card" >
          
          
           <h4>Modification du trimestre/semestre </h4>
   
            <div class="card-body">
               <form action="" method="post">
              
               <div class="row">
                    <div class="col-sm-6">
                      <label for="niveau">Niveau </label>
                     <span style="color:red; font-style:italic;"
                      v-if="$v.editText.niveau_id.$error && !$v.editText.niveau_id.required"
                      role="alert"> 
                      <span style="color:red; font-weight:bold">*</span>
                      Ce champs est obligatoire!
                  </span>  
                    <select class="form-control" id="classe" v-model="editText.niveau_id" @input="$v.editText.niveau_id.$touch()" >
                      <option value="">Selectionnez le Niveau</option>
                      <option v-for="item in gettersNiveau" :key="item.id" :value="item.id"> {{item.libelle}} </option>
                                          
                  </select>
                    </div>
                  
                 <div class="col-sm-6">
                      <label for="niveau">{{ $t("ul.classe") }} </label>
                      
                        <select class="form-control" id="classe" v-model="editText.classe_id"  >
                          <option value="">Selectionnez la classe</option>
                          <option v-for="item in EditClasse" :key="item.id" :value="item.id"> {{item.libelle}} </option>
                                              
                      </select>
                  </div>

                  </div>

            <div class="row">
               <div class="col-sm-6" v-if="LibelleNiveau(editText.niveau_id) == '1ère'">
                          <label for="niveau">Serie </label>
                              
                            <select class="form-control" id="classe" v-model="editText.serie" >
                              <option value="">Selectionnez la Serie</option>
                              <option value="1èreA">1ère A</option>
                              <option value="1èreC">1ère C</option>
                              <option value="1èreD">1ère D</option>
                              
                                                  
                          </select>
                      </div>
                    <div class="col-sm-6" v-if="LibelleNiveau(editText.niveau_id) == '2nde'">
                          <label for="niveau">Serie </label>
                              
                            <select class="form-control" id="classe" v-model="editText.serie" >
                              <option value="">Selectionnez la Serie</option>
                              <option value="2ndeC">2nde C</option>
                              <option value="2ndeA">2nde A</option>                                                                           
                          </select>
                      </div>
                    <div class="col-sm-6" v-if="LibelleNiveau(editText.niveau_id) == 'Tle'">
                          <label for="niveau">Serie </label>
                            
                            <select class="form-control" id="classe" v-model="editText.serie" >
                              <option value="">Selectionnez la Serie</option>
                              <option value="TleA">Tle A</option>
                              <option value="TleC">Tle C</option>
                              <option value="TleD">Tle D</option>                                                                         
                          </select>
                      </div>
                       <div class="col-sm-6">
                      <label for="niveau">Matière </label>
                         <span style="color:red; font-style:italic;"
                              v-if="$v.editText.nouvelle_matiere_id.$error && !$v.editText.nouvelle_matiere_id.required"
                              role="alert"> 
                              <span style="color:red; font-weight:bold">*</span>
                              Ce champs est obligatoire!
                          </span>
                        <select class="form-control" id="classe" v-model="editText.nouvelle_matiere_id" @input="$v.editText.nouvelle_matiere_id.$touch()" >
                          <option value="">Selectionnez la classe</option>
                          <option v-for="item in gettersNouvelleMatiere" :key="item.id" :value="item.id"> {{item.libelle}} </option>
                                              
                      </select>
                  </div>
                <!-- <div class="col-sm-6">
                  <label for="libelle">Matière </label>   
                <span style="color:red; font-style:italic;"
                    v-if="$v.editText.libelle.$error && !$v.editText.libelle.required"
                    role="alert"> 
                    <span style="color:red; font-weight:bold">*</span>
                    Ce champs est obligatoire!
                </span>  
                <input @input="$v.editText.libelle.$touch()" v-model="editText.libelle"   type="text"  class="form-control" id="libelle" aria-describedby="emailHelp"
                placeholder="Entrer la matière">
            </div> -->
            
            </div>

              <div class="row">
                          
              <div class="col-sm-6">
                  <label for="libelle">Coefficient </label>   
                   <span style="color:red; font-style:italic;"
                      v-if="$v.editText.coefficient.$error && !$v.editText.coefficient.required"
                      role="alert"> 
                      <span style="color:red; font-weight:bold">*</span>
                      Ce champs est obligatoire!
                  </span>  
                  <input @input="$v.editText.coefficient.$touch()" v-model="editText.coefficient"   type="text"  
                  class="form-control" id="libelle" aria-describedby="emailHelp"
                  placeholder="Entrer le coefficient">

              </div>
                   <div class="col-sm-6">
                      <label for="status">Status </label>
                      
                    <select class="form-control" id="status" v-model="editText.statut" >
                      <option value="">Selectionnez le status</option>
                      <option value="1">Literature</option>                                          
                      <option value="2">science</option>                                          
                      <option value="3">Pas defini</option>                                          
                  </select>
                    </div>
              

              </div>
              <br> <br>

              <button  @click.prevent="ModifierFonctionLocal" type="submit" class="btn btn-success ml-5">Modifier</button>
                     &nbsp;
                     
                <button @click.prevent="close" class="btn btn-danger">Fermer</button>
         </form>
            
          </div>
       
          
        </div>
      </div>
  </div>
  <!-- modal fin -->

      <fab :actions="fabActions"
  
                  main-icon="apps"
            @cache="toggleModale"
          bg-color="blue"

    ></fab>

    <notifications  position="top right"/>
  </div>
</template>

<script>
import Entete from "../milieu/Entete.vue"
import {mapGetters, mapActions} from "vuex";
import moment from "moment"
import {required} from "vuelidate/lib/validators";
import fab from 'vue-fab'

export default {

  
  components:{
    fab,Entete
  },

  data(){
    return {
      showModal: false,
      showIsModal: false,
      // showModal: false,
       position: 'bottom-right',
          fabActions: [
              {
                  name: 'cache',
                  icon: 'add'
              },
              {
                  name: 'alertMe',
                  icon: 'add_alert'
              }
          ],
          formData:{
            classe_id:'',
            statut:'',
            libelle:"",
            niveau_id:"",
            serie:"",
            coefficient:"",
            
          },
          search:"",
          editText:{
            
            libelle:"",
            niveau_id:"",
          },
          ParentId:'',
    }
  },
    validations:{
        formData:{
            
            nouvelle_matiere_id:{required},
            niveau_id:{required},
            classe_id:{required},
            statut:{required},
            coefficient:{required},
            // serie:{required},
            
        },
        editText:{
            
            nouvelle_matiere_id:{required},
            coefficient:{required},
            niveau_id:{required},
            // serie:{required},
            
        }
    },
  created(){
      this.ParentId = this.$route.params.id
    if(this.gettersNiveau.length == 0){
      this.getNiveau();
    }
      this.getTrimestre();
      this.getAnnee();
      this.getMatiere();
       this.getNouvelleMatiere();
       if(this.gettersClasse.length == 0){
      this.getClasse();
    }
    
  },
  computed:{
     ...mapGetters("parametres",["gettersNiveau","gettersTrimestre","gettersAnne", "gettersMatiere","gettersNouvelleMatiere"]),
       ...mapGetters("parametres",["gettersNiveau", "gettersClasse"]),

      LibelleNiveaux(){
        return this.gettersNiveau.filter(tem =>tem.id == this.formData.niveau_id)
     },
      AfficherClasse(){
        return this.gettersClasse.filter(tem =>tem.niveau_id == this.formData.niveau_id)
     },
      EditClasse(){
        return this.gettersClasse.filter(tem =>tem.niveau_id == this.editText.niveau_id)
     },
     ListeDeMatiere(){
       return this.gettersMatiere.filter(tem=>tem.classe_id == this.$route.params.id)
     },
     Seri(id){
       
       let obj = this.gettersClasse.filter(tem=>tem.id ==id)
       if(obj.serie != "NULL" && obj.serie !=""){
         return obj.serie
       }
       return "Non"
     },
     AnneEncours(){
       let obj = this.gettersAnne.find(tem=>tem.encours == 1)
       if(obj){
         return obj.debut_annee+"-"+obj.fin_annee;
       }
       return ""
     },
     AnneId(){
       let obj = this.gettersAnne.find(tem=>tem.encours == 1)
       if(obj){
         return obj.id;
       }
       return ""
     },
     LibelleClasses(){
       return (id)=>{
         if(id != ""){
           let obj = this.gettersClasse.find(tem=>tem.id == id)
           if(obj){
             return obj.libelle;
           }
         }
       }
     },
     LibelleNiveau(){
       return (id)=>{
         if(id != ""){
           let obj = this.gettersNiveau.find(tem=>tem.id == id)
           if(obj){
             return obj.libelle;
           }
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
     GroupeParNiveau(){
       let objet = this.gettersMatiere
       let array_exercie = []
        if (objet.length > 0) {
          objet.forEach(function (val) {
            array_exercie.push(val.niveau_id);
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
    filtreListre() {
      // const searchTerm = this.search.toLowerCase();

      //  return (this.gettersMatiere.filter((item) => { 
      //    return  item.niveau_id.toLowerCase().includes(searchTerm)}))
      return this.gettersMatiere
    },
  
  },
  methods:{
    ...mapActions("parametres",["getNiveau","ModifierNiveau","AjouterNiveau", "SupprimerNiveau","getAnnee","getClasse",
                "getTrimestre","AjouterTrimestre","ModifierTrimestre","ModifierTrimestreEncours","SupprimerTrimestre",
                "getMatiere","AjouterMatiere","ModifierMatiere","SupprimerMatiere","getNouvelleMatiere"]),

        voirClasse(index){
          this.$router.push({
            name:'ListeDeMatiere', params:{id: index}
          })
        },
    showModals:function(){
      this.showModal != this.showModal
    },
    //Afficher le modal d'ajout
    toggleModale(){
      this.showModal = !this.showModal
    },
    //fer le modale
    fermer(){
      this.annuler();
      this.showModal = !this.showModal;
    },
    //vider les champs
       annuler(){
        this.$v.formData.$reset();
         this.formData = {
            
            libelle:"",
            niveau_id:"",
            classe_id:"",
            statut:"",
            coefficient:"",
            serie:"",
           
            };
        },
        //fermer le modale de modification
       close(){
        this.$v.editText.$reset();
         this.editText = {
             
              libelle:"",
              niveau_id:"",
              coefficient:"",
              serie:"",
             
            };

            this.showIsModal = !this.showIsModal;
            this.getMatiere()
        },

      editModale(id){
        this.showIsModal = true
        this.editText = this.gettersMatiere.find(tem =>tem.id == id)
      },

     
      ModifierFonctionLocal(){
        this.$v.editText.$touch();
            if(this.$v.editText.$error) {
                return
            }

            let objet ={
              ...this.editText,
             
            }
          this.ModifierMatiere(objet);
          this.close();
      },
    //Fonction d'ajout
    AjouterFonctionLocal(){
         this.$v.formData.$touch();
            if(this.$v.formData.$error) {
                return
            }
          
        this.AjouterMatiere(this.formData)
            this.$v.formData.$reset();
         this.formData = {
            
             nouvelle_matiere_id:"",
            niveau_id:"",
            classe_id:"",
            statut:"",
            coefficient:"",
            serie:"",
             
            };
    },
    CallBack(){
      this.$router.push({
        name:'NouvelleMatiere'
      })
    },
    Retour(){
        this.$router.go(-1)
    },
      formaterDate(date) {
      return moment(date, "YYYY-MM-DD").format("DD-MM-YYYY");
    },
  }
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
        top: 18%;
        left: 38%;
}

 .close{
  position: absolute;
  top: 10px;
  right: 10px;
}


</style>