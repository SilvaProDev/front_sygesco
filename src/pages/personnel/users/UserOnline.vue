<template>
  <div>

    <Entete/>
     <Loader :isVisible="loadingData"/>
        <div class="container ">
          <div class="row ">
            <div class="col-lg-12 ">
              <!-- Simple Tables -->
              <div class="card">
                <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                  <h6 class="m-0 font-weight-bold text-primary">La liste des utilisateurs connectés</h6>
                </div>
               
                <div class="table-responsive" >
                  <table class="table align-items-center table-flush">
                    <thead class="thead-light">
                      <tr >
                        <th>N°</th>
                        <th>Nom Prenom</th>
                        <th>Téléphone</th>
                        <th>Genre</th>
                        <th>Email</th>
                        <th>Adresse</th>
                        <th>Rôle</th>
                        <th>Photo</th>
                        <th>Statut</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(item, index) in gettersUserOnLine" :key="item.id">
                        <td>{{index+1}}</td>
                        <td>{{item.name}}</td>
                        <td>{{item.phone}}</td>
                        <td>{{item.sexe}}</td>
                        <td>{{item.email}}</td>
                        <td>{{item.adresse}}</td>
                        <td>{{ LibelleRole(item.role_id)}}</td>
                        <td v-if="item.image != 'vide' && item.image != null">
                            <!-- <span style="heigth:60px; width:80px;" v-if="item.image != 'vide' || item.image != null">
                            </span> -->
                                <img :src="item.image" alt="" width="60" height="70" class="rounded-circle">
                           
                        </td>
                         <td v-else>
                        <img :src="url" alt="Admin" class="rounded-circle p-1 bg-primary" width="60">
                                    <!-- <span v-if="item.image == 'vide' || item.image == null">

                        </span> -->
                            </td>
                        <td>{{formaterDateTme(item.last_seen) }}</td>
                      </tr>
                                                         
                    </tbody>
                  </table>
                </div>
              
              </div>
            </div>
          </div>
        </div>

 

    <notifications />
  </div>
</template>

<script>
import Entete from "../../milieu/Entete.vue"
//   import {Money} from 'v-money'
import moment from 'moment'
  import { formatageSommeSansFCFA,formatageSomme } from "@/Repositorie/Repository";


import {mapGetters, mapActions} from "vuex";
import {required} from "vuelidate/lib/validators";
// import fab from 'vue-fab'

export default {

  
  components:{
    // fab,
    Entete,
    // Money
    
  },

  data(){
    return {
       url:"/front/img/avatar1.jpg",
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
      this.getUserProfile();
      this.getRole();
      this.getUtilisateur();
      this.getAffectation();
      this.getUserOnLine();
  },
  computed:{
     ...mapGetters("parametres",["gettersNiveau","gettersloadingconfigEntete"]),
      ...mapGetters('personnel', ['getterProfileUsers', "gettersRole", "gettersAffectation", "gettersloadingUser",
          "gettersUtilisateur","gettersUserOnLine",'user']),

             loadingData(){
    return this.gettersloadingconfigEntete
       
    },

           LibelleRole(){
         return (id)=>{
             if(id != ""){
                 let obj = this.gettersRole.find(tem=>tem.id == id)
                    if(obj){
                        return obj.libelle.toUpperCase();
                    }
                 
             }
         }
     },
  },
  methods:{
    ...mapActions("parametres",["getNiveau","AjouterNiveau", "ModifierNiveau","SupprimerNiveau",]),
    ...mapActions('personnel', ['getUserProfile','changePassword',"getRole", "getAffectation","getUtilisateur","getUserOnLine"]),

 formaterDateTme(date) {
      return moment(date).fromNow();
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