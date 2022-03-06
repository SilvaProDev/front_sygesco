<template>
  <div>

   <Entete/>
   
       <div class="container ml-5">
          <div class="row">
            <div class="col-lg-11 mb-4">
     
              <div class="card">
                <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                  <h6 class="m-0 font-weight-bold text-primary">La liste des matières</h6>
                </div>
                <div class="table-responsive">
                  <table class="table align-items-center table-flush">
                    <thead class="thead-light">
                      <tr >
                        <th>N°</th>
                        <th>Code</th>
                        <th>Matière</th>
                       
                        
                        <th  colspan="2" >Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(item, index) in gettersNouvelleMatiere" :key="item.id">
                        <td>{{index+1}}</td>
                        <td>{{item.code}}</td>
                        <td>{{item.libelle}}</td>
                       
                       
                        <td>
                           <button  @click="editModale(item.id)" title="Modifier" type="button"  data-toggle="modal" data-target="#exampleModalCenter">
                              <i style="color:green;" class="fas fa-edit"> </i>
                            </button>
                        
                              &nbsp;
                          <a title="Supprimer"  @click.prevent="SupprimerNouvelleMatiere(item.id)">
                          
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
          
          
           <h4>Enrégistrement de la matière </h4>
           
           <div class="card-body">
             <form action="" method="post">
              

             
              <div class="form-group">
                  <label for="libelle">Code </label>   
                   <span v-if="verifie">
                    <code style="color:red; font-style:italic;"> Ce Code existe déjâ</code>
                    </span>
                   <span style="color:red; font-style:italic;"
                      v-if="$v.formData.code.$error && !$v.formData.code.required"
                      role="alert"> 
                      <span style="color:red; font-weight:bold">*</span>
                      Ce champs est obligatoire!
                  </span>  
                  <input @input="$v.formData.code.$touch()" v-model="formData.code"   type="text"  class="form-control" id="code" aria-describedby="emailHelp"
                  placeholder="Entrer le code">
              </div>
              <div class="form-group">
                  <label for="libelle">Libelle </label>   
                   <span v-if="verifcode">
                    <code style="color:red; font-style:italic;">Cette permission existe déjâ</code>
                    </span>
                   <span style="color:red; font-style:italic;"
                      v-if="$v.formData.libelle.$error && !$v.formData.libelle.required"
                      role="alert"> 
                      <span style="color:red; font-weight:bold">*</span>
                      Ce champs est obligatoire!
                  </span>  
                  <input @input="$v.formData.libelle.$touch()" v-model="formData.libelle"   type="text"  class="form-control" id="libelle" aria-describedby="emailHelp"
                  placeholder="nom de la permission">
              </div>
              
               
               <button  :disabled="verifcode || verifie" @click.prevent="AjouterFonctionLocal" type="submit" class="btn btn-primary">Enrégistrer</button>
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
          
          
           <h4>Modification de la matière </h4>
   
            <div class="card-body">
             <form action="" method="post">
              
        
              <div class="form-group">
                  <label for="code">code </label>   
                   <span style="color:red; font-style:italic;"
                      v-if="$v.editText.code.$error && !$v.editText.code.required"
                      role="alert"> 
                      <span style="color:red; font-weight:bold">*</span>
                      Ce champs est obligatoire!
                  </span>  
                  <input @input="$v.editText.code.$touch()" v-model="editText.code"   type="text"  class="form-control" id="libelle" aria-describedby="emailHelp"
                  placeholder="Entrer le code">
              </div>
              
               <div class="form-group">
                  <label for="libelle">Libelle </label>   
                   <span style="color:red; font-style:italic;"
                      v-if="$v.editText.libelle.$error && !$v.editText.libelle.required"
                      role="alert"> 
                      <span style="color:red; font-weight:bold">*</span>
                      Ce champs est obligatoire!
                  </span>  
                  <input @input="$v.editText.libelle.$touch()" v-model="editText.libelle"   type="text"  class="form-control" id="libelle" aria-describedby="emailHelp"
                  placeholder="Nom de la permission">
              </div>

              
             

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

    <notifications/>
  </div>
</template>

<script>
import {mapGetters, mapActions} from "vuex";
import moment from "moment"
import Entete from "../milieu/Entete.vue"
import {required} from "vuelidate/lib/validators";
import fab from 'vue-fab'

export default {

  
  components:{
    fab, Entete
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
            
            code:"",
            libelle:"",
           
            
          },
          editText:{ 
            code:"",
            libelle:"",
          }
    }
  },
    validations:{
        formData:{
            
            code:{required},
            libelle:{required},
            // coefficient:{required},
            // serie:{required},
            
        },
        editText:{
            
            code:{required},
            // coefficient:{required},
            libelle:{required},
            // serie:{required},
            
        }
    },
  created(){
    if(this.gettersNiveau.length == 0){
      this.getNiveau();
    }
      this.getTrimestre();
      this.getAnnee();
      this.getNouvelleMatiere();
      this.getRole();
      this.getPermission();
      this.getMatiere();
       if(this.gettersClasse.length == 0){
      this.getClasse();
    }
    
  },
  computed:{
     ...mapGetters("parametres",["gettersNiveau","gettersTrimestre","gettersAnne", "gettersMatiere",
     "gettersClasse","gettersNouvelleMatiere"]),
       ...mapGetters("personnel",["gettersPermission","gettersRole"]),
       

    verifie(){
        if(this.formData.code =="")
        {return false}
        else{
            let obj = this.gettersRole.filter(tem=>tem.code == this.formData.code);
            if(obj.length != 0 && obj != undefined){return obj.length;}
            return false
        }
    },
       verifcode() {
      if (this.formData.libelle == "") {
        return false;
      } else {
        let Objet = this.gettersRole.filter(
          (element) => element.libelle == this.formData.libelle
        );
        if (Objet.length != 0 && Objet != undefined) {
          return Objet.length;
        } else {
          return false;
        }
      }
    },

           AfficherClasse(){
        return this.gettersClasse
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
  
  
  },
  methods:{
    ...mapActions("parametres",["getNiveau","ModifierNiveau","AjouterNiveau", "SupprimerNiveau","getAnnee","getClasse",
                "getTrimestre","AjouterTrimestre","ModifierTrimestre","ModifierTrimestreEncours","SupprimerTrimestre",
                "getMatiere","AjouterMatiere","ModifierMatiere","SupprimerMatiere","AjouterRole","SupprimerRole",
                "ModifierRole","AjouteNouvellerMatiere","getNouvelleMatiere","ModifierNouvelleMatiere","SupprimerNouvelleMatiere"]),
    ...mapActions("personnel",["getPermission","AjouterPermission","ModifierPermission","SupprimerPermission","getRole" ]),
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
            code:"",
           
           
            };
        },
        //fermer le modale de modification
       close(){
        this.$v.editText.$reset();
         this.editText = {
             
              libelle:"",
              code:"",
             
             
            };

            this.showIsModal = !this.showIsModal;
            this.getPermission()
        },

      editModale(id){
        this.showIsModal = true
        this.editText = this.gettersNouvelleMatiere.find(tem =>tem.id == id)
      },

     
      ModifierFonctionLocal(){
        this.$v.editText.$touch();
            if(this.$v.editText.$error) {
                return
            }

            let objet ={
              ...this.editText,
             
            }
          this.ModifierNouvelleMatiere(objet);
          this.close();
      },
    //Fonction d'ajout
    AjouterFonctionLocal(){
         this.$v.formData.$touch();
            if(this.$v.formData.$error) {
                return
            }
          console.log(this.formData)
        this.AjouteNouvellerMatiere(this.formData)
            this.$v.formData.$reset();
         this.formData.code="";
         this.formData.libelle="";
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