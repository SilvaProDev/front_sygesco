<template>
  <div>

    <Entete/>
   
        <div class="container ">
          <div class="row ml-5">
            <div class="col-lg-11 ">
              <!-- Simple Tables -->
              <div class="card">
                <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                  <h6 class="m-0 font-weight-bold text-primary">Les différents niveaux</h6>
                </div>
                <div class="table-responsive">
                  <table class="table align-items-center table-flush">
                    <thead class="thead-light">
                      <tr >
                        <th>N°</th>
                        <th>Code</th>
                        <th>libelle</th>
                        <th>Scolarité</th>
                        <th  colspan="2" >Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(item, index) in gettersNiveau" :key="item.id">
                        <td>{{index+1}}</td>
                        <td>{{item.code}}</td>
                        <td>{{item.libelle}}</td>
                        <td><span class="badge badge-success">
                            {{formatageSomme(parseFloat(item.scolarite)) }}
                          </span></td>
                        <td>
                          <a title="Modifier" href="" @click.prevent="editModale(item.id)" >
                          
                          <i style="color:green;" class="fas fa-edit"> </i></a>
                        
                                &nbsp;
                          <a title="Supprimer"  @click.prevent="SupprimerNiveau(item.id)">
                          
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
          <button class="close" @click="fermer">x</button>
          
           <h4>Enrégistrement du niveau </h4>
      
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
                  <label for="libelle">libelle </label>   
                   <span style="color:red; font-style:italic;"
                      v-if="$v.formData.libelle.$error && !$v.formData.libelle.required"
                      role="alert"> 
                      <span style="color:red; font-weight:bold">*</span>
                      Ce champs est obligatoire!
                  </span>  
                  <input @input="$v.formData.libelle.$touch()" v-model="formData.libelle"   type="text"  class="form-control" id="libelle" aria-describedby="emailHelp"
                  placeholder="Entrer le libelle">
              </div>
              <div class="form-group">
                  <label for="scolarite">Scolarité </label>   
                   <span style="color:red; font-style:italic;"
                      v-if="$v.formData.scolarite.$error && !$v.formData.scolarite.required"
                      role="alert"> 
                      <span style="color:red; font-weight:bold">*</span>
                      Ce champs est obligatoire!
                  </span>  
                  <!-- <input @input="$v.formData.scolarite.$touch()" v-model="formData.scolarite"   type="text"  class="form-control" id="scolarite" aria-describedby="emailHelp"
                  placeholder="Entrer le scolarite"> -->
                  <money @input="$v.formData.scolarite.$touch()" v-model="formData.scolarite"   type="text"  class="form-control" id="scolarite" aria-describedby="emailHelp"
                  placeholder="Entrer le scolarite"></money>
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
          
           <h4>Enrégistrement du niveau </h4>
      
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
                  <label for="libelle">libelle </label>   
                   <span style="color:red; font-style:italic;"
                      v-if="$v.editText.libelle.$error && !$v.editText.libelle.required"
                      role="alert"> 
                      <span style="color:red; font-weight:bold">*</span>
                      Ce champs est obligatoire!
                  </span>  
                  <input @input="$v.editText.libelle.$touch()" v-model="editText.libelle"   type="text"  class="form-control" id="libelle" aria-describedby="emailHelp"
                  placeholder="Entrer le libelle">
              </div>
              <div class="form-group">
                  <label for="scolarite">Scolarité </label>   
                   <span style="color:red; font-style:italic;"
                      v-if="$v.editText.scolarite.$error && !$v.editText.scolarite.required"
                      role="alert"> 
                      <span style="color:red; font-weight:bold">*</span>
                      Ce champs est obligatoire!
                  </span>  
                  <input @input="$v.editText.scolarite.$touch()" v-model="editText.scolarite"   type="text"  class="form-control" id="scolarite" aria-describedby="emailHelp"
                  placeholder="Entrer le scolarite">
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

    <notifications />
  </div>
</template>

<script>
import Entete from "../milieu/Entete.vue"
  import {Money} from 'v-money'
  import { formatageSommeSansFCFA,formatageSomme } from "@/Repositorie/Repository";


import {mapGetters, mapActions} from "vuex";
import {required} from "vuelidate/lib/validators";
import fab from 'vue-fab'

export default {

  
  components:{
    fab,Entete,
    Money
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
            scolarite:"",
          },
          editText:{
            code:"",
            libelle:"",
            scolarite:"",
          }
    }
  },
    validations:{
        formData:{
             code:{ required,},
            libelle:{required},
            scolarite:{required},
        },
        editText:{
             code:{ required,},
            libelle:{required},
            scolarite:{required},
        }
    },
  created(){
    if(this.gettersNiveau.length == 0){
      this.getNiveau();
    }
  },
  computed:{
     ...mapGetters("parametres",["gettersNiveau"]),
  },
  methods:{
    ...mapActions("parametres",["getNiveau","AjouterNiveau", "ModifierNiveau","SupprimerNiveau",]),
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
              scolarite: "",
            };
        },
        //fermer le modale de modification
       close(){
        this.$v.editText.$reset();
         this.editText = {
              code: "",
              libelle: "",
              scolarite: "",
            };

            this.showIsModal = !this.showIsModal
             this.getNiveau();
        },

      editModale(id){
        this.showIsModal = true
        this.editText = this.gettersNiveau.find(tem =>tem.id == id)
      },
      ModifierFonctionLocal(){
        this.$v.editText.$touch();
            if(this.$v.editText.$error) {
                return
            }
          this.ModifierNiveau(this.editText);
          this.close();
      },
    //Fonction d'ajout
    AjouterFonctionLocal(){
         this.$v.formData.$touch();
            if(this.$v.formData.$error) {
                return
            }
            this.AjouterNiveau(this.formData)
            this.$v.formData.$reset();
         this.formData = {
              code: "",
              libelle: "",
              scolarite: "",
            };
    },
     formatageSomme:formatageSomme,
    formatageSommeSansFCFA:formatageSommeSansFCFA,
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
        left: 40%;
}

 .close{
  position: absolute;
  top: 10px;
  right: 10px;
}


</style>