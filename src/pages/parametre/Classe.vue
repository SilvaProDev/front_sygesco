<template>
  <div>

   <Entete/>
        <div class="container ">
          <div class="row">
            <div class="col-lg-11 mb-4">
              <!-- Simple Tables -->
              <div class="card">
                <div class="card-header  d-flex  align-items-center justify-content-between">
                  <h6 class="m-0 font-weight-bold text-primary">La liste des des différentes classes</h6>
                   <div class="input-group col-sm-3" v-if="!showModal && !showIsModal">
                        <input  type="text" v-model="search" class="form-control" placeholder="Recherche par classe ...">
                        <div class="input-group-append">
                        <button class="btn btn-secondary" type="button">
                            <i class="fa fa-search"></i>
                        </button>
                        </div>
                    </div>
                </div>
                <div class="table-responsive">
                  <table class="table align-items-center table-flush">
                    <thead class="thead-light">
                      <tr >
                        <th>N°</th>
                        <th>Code</th>
                        <th>Niveau</th>
                        <th>Classe</th>
                        <th  colspan="2" >Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(item, index) in filtreListreProfesseurs" :key="item.id">
                        <td>{{index+1}}</td>
                        <td>{{item.code}}</td>
                        <td>{{libelleNiveau(item.niveau_id) || "Non renseigné"}}</td>
                        <td>{{item.libelle}}</td>
                      
                        <td>
                          <a title="Modifier" href="" @click.prevent="editModale(item.id)">                         
                          <i style="color:green;" class="fas fa-edit"> </i>
                          </a>
                          &nbsp;
                          <a title="Supprimer" href="" @click.prevent="SupprimerClasse(item.id)">
                            <i style="color:red;" class="fas fa-trash"> </i></a>
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
          <button class="close" @click="fermer">x</button>
          
           <h4>Enrégistrement de la classe </h4>
      
           <div class="card-body">
             <form action="" method="post">
              <div class="form-group">
                  <label for="code">Code </label>   
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
                  <label for="code">Niveau </label>   
                   <span style="color:red; font-style:italic;"
                      v-if="$v.formData.niveau_id.$error && !$v.formData.niveau_id.required"
                      role="alert"> 
                      <span style="color:red; font-weight:bold">*</span>
                      Ce champs est obligatoire!
                  </span> 
                   <select class="form-control" id="sexe" @input="$v.formData.niveau_id.$touch()" v-model="formData.niveau_id">
                        <option value="" selected disabled hidden>Choisir le niveau</option>
                        <option v-for="tem in gettersNiveau" :key="tem.id" :value="tem.id">{{tem.libelle}}</option>
                                               
                    </select>
                 
              </div>
              <div class="form-group">
                  <label for="libelle">Classe </label>   
                   <span style="color:red; font-style:italic;"
                      v-if="$v.formData.libelle.$error && !$v.formData.libelle.required"
                      role="alert"> 
                      <span style="color:red; font-weight:bold">*</span>
                      Ce champs est obligatoire!
                  </span>  
                  <div class="row mb-3">
								<div class="col-sm-4">
									<input type="text" class="form-control" disabled :value="AfficherLibelle" >
								</div>
								<div class="col-sm-4 text-secondary">
									<input type="text" class="form-control" placeholder="La classe" 
                  @input="$v.formData.libelle.$touch()" v-model="formData.libelle" >
								</div>
                     
							</div>
             
                 
              </div>
             

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
          <button class="close" @click="close">x</button>
          
           <h4>Modification de la classe </h4>
      
           <div class="card-body">
             <form action="" method="post">
              <div class="form-group">
                  <label for="code">Code </label>   
                   <span style="color:red; font-style:italic;"
                      v-if="$v.editText.code.$error && !$v.editText.code.required"
                      role="alert"> 
                      <span style="color:red; font-weight:bold">*</span>
                      Ce champs est obligatoire!
                  </span> 
                  <input @input="$v.editText.code.$touch()" v-model="editText.code"   type="text"  class="form-control" id="code" aria-describedby="emailHelp"
                  placeholder="Entrer le code">
              </div>
              <div class="form-group">
                  <label for="code">Niveau </label>   
                   <span style="color:red; font-style:italic;"
                      v-if="$v.editText.niveau_id.$error && !$v.editText.niveau_id.required"
                      role="alert"> 
                      <span style="color:red; font-weight:bold">*</span>
                      Ce champs est obligatoire!
                  </span> 
                  <select class="form-control" id="sexe" @input="$v.editText.niveau_id.$touch()" v-model="editText.niveau_id">
                        <option value="" selected disabled hidden>Choisir le niveau</option>
                        <option v-for="tem in gettersNiveau" :key="tem.id" :value="tem.id">{{tem.libelle}}</option>
                                               
                    </select>
              </div>
              <div class="form-group">
                  <label for="libelle">Classe </label>   
                   <span style="color:red; font-style:italic;"
                      v-if="$v.editText.libelle.$error && !$v.editText.libelle.required"
                      role="alert"> 
                      <span style="color:red; font-weight:bold">*</span>
                      Ce champs est obligatoire!
                  </span>  
                  <input @input="$v.editText.libelle.$touch()" v-model="editText.libelle"   type="text"  class="form-control" id="libelle" aria-describedby="emailHelp"
                  placeholder="Entrer le libelle">
              </div>
             

               <button   @click.prevent="ModifierFonctionLocal" type="submit" class="btn btn-success">Modifier</button>
                     &nbsp;
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
       <notifications  />
  </div>
</template>

<script>
import Entete from "../milieu/Entete.vue"
import {mapGetters, mapActions} from "vuex";
import {required} from "vuelidate/lib/validators";
import fab from 'vue-fab'

export default {

  
  components:{
    fab,Entete
  },

  data(){
    return {
      search:"",
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
            niveau_id:"",
          },
          editText:{
            code:"",
            libelle:"",
            niveau_id:"",
          }
    }
  },
    validations:{
        formData:{
             code:{ required,},
            libelle:{required},
            niveau_id:{required},
        },
        editText:{
             code:{ required,},
            libelle:{required},
            niveau_id:{required},
        }
    },
  created(){
    if(this.gettersClasse.length == 0){
      this.getClasse();
    }
      this.getNiveau();
  },
  computed:{
     ...mapGetters("parametres",["gettersClasse", "gettersNiveau"]),

     libelleNiveau(){
         return (id)=>{
             if(id != null && id != ""){
                 let text = this.gettersNiveau.find(tem =>tem.id == id)
                 if(text){
                     return text.libelle;
                 }
                 return ""
             }
         }
     },

     AfficherLibelle(){
       if(this.formData.niveau_id != ''){
         let objet = this.gettersNiveau.find(tem=>tem.id == this.formData.niveau_id)
         if(objet){
           return objet.libelle
         }
       }
       return ""
     },

     LibelleDeClasse(){
       if(this.formData.libelle != ''){

         return this.AfficherLibelle+' '+this.formData.libelle
       }
       return ""
     },
       filtreListreProfesseurs() {
      const searchTerm = this.search.toLowerCase();

      return (this.gettersClasse.filter((item) => {
        return ( item.libelle.toLowerCase().includes(searchTerm)) }) ||
          this.gettersNiveau.filter((item) => {
             return ( item.libelle.toLowerCase().includes(searchTerm) );}))
      
    },
  },
  methods:{
    ...mapActions("parametres",["getClasse","AjouterClasse", "ModifierClasse","SupprimerClasse","getNiveau"]),
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
              code: "",
              libelle: "",
              niveau_id: "",
            };
        },
        //fermer le modale de modification
       close(){
        this.$v.editText.$reset();
         this.editText = {
              code: "",
              libelle: "",
              niveau_id: "",
            };

            this.showIsModal = !this.showIsModal
            this.getClasse()
        },

      editModale(id){
        this.showIsModal = true
        this.editText = this.gettersClasse.find(tem =>tem.id == id)
      },
      ModifierFonctionLocal(){
        this.$v.editText.$touch();
            if(this.$v.editText.$error) {
                return
            }
          this.ModifierClasse(this.editText);
          this.close();
      },
    //Fonction d'ajout
    AjouterFonctionLocal(){
         this.$v.formData.$touch();
            if(this.$v.formData.$error) {
                return
            }
            let obj ={
              ...this.formData,
              libelle: this.LibelleDeClasse
            }
            this.AjouterClasse(obj)
            this.$v.formData.$reset();
         this.formData = {
              code: "",
              libelle: "",
              niveau_id: "",
            };
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
        top: 20%;
        left: 35%;
}

 .close{
  position: absolute;
  top: 10px;
  right: 10px;
}


</style>