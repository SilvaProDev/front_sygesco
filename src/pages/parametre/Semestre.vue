<template>
  <div>

   <Entete/>
   
        <div class="container m-5">
          <div class="row">
            <div class="col-lg-11 mb-4">
              <!-- Simple Tables -->
              <div class="card">
                <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                  <h6 class="m-0 font-weight-bold text-primary">Les différents trimeste</h6>
                </div>
                <div class="table-responsive">
                  <table class="table align-items-center table-flush">
                    <thead class="thead-light">
                      <tr >
                        <th>N°</th>
                        <th>Année</th>
                        <th>trimeste/semestre</th>
                        <th>Date début </th>
                        <th>Date fin </th>
                        <th>Etat </th>
                        <th  colspan="2" >Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(item, index) in gettersTrimestre" :key="item.id">
                        <td>{{index+1}}</td>
                        <td>{{AnneeScolaire(item.annee_id)}}</td>
                        <td>{{item.libelle}}</td>
                        <td>{{formaterDate(item.date_debut)}}</td>
                        <td>{{formaterDate(item.date_fin)}}</td>
                        <td >
                          <span style="color:green;" v-if="item.encours ==1">En cours</span>
                          <span style="color:#fff;" v-else></span>
                        </td>
                        <td v-if="item.encours !=1">
                           <a title="Mettre l'année en cours" @click.prevent="AnneEncour(item.id, item.annee_id,item.libelle,item.date_debut,item.date_fin)">                  
                            <i style="color:blue;" class="far fa-clone"></i>
                            </a>
                            &nbsp;
                            <button  @click="editModale(item.id)" title="Modifier" type="button"  data-toggle="modal" data-target="#exampleModalCenter">
                              <i style="color:green;" class="fas fa-edit"> </i>
                            </button>
                        
                              &nbsp;
                          <a title="Supprimer"  @click.prevent="SupprimerTrimestre(item.id)">
                          
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
          
           <h4>Enrégistrement du trimestre/semestre </h4>
             <span v-if="verifie_date_debut !=1" style="color:red; font-style:italic; font-size:12px;">
                L'année de la date de debut ne correspont pas à celle de l'année scolaire {{AnneeDebut}}
              </span>
               <span v-if="verifie_date_fin !=1" style="color:red; font-style:italic; font-size:12px;">
                L'année de la date de fin ne correspont pas à celle de l'année scolaire {{AnneeFin}}
              </span>
           <div class="card-body">
             <form action="" method="post">
              <div class="form-group">
                  <label for="code">Année en cours </label>   
                  
                  <input disabled  :value="AnneEncours"  type="text"  class="form-control" id="code" aria-describedby="emailHelp"
                  placeholder="Entrer l'année">
              </div>
               <div class="form-group">
                  <label for="code">Trimestres/Semestres </label>   
                   <span style="color:red; font-style:italic;"
                      v-if="$v.formData.libelle.$error && !$v.formData.libelle.required"
                      role="alert"> 
                      <span style="color:red; font-weight:bold">*</span>
                      Ce champs est obligatoire!
                  </span> 
                  <input @input="$v.formData.libelle.$touch()" v-model="formData.libelle"   type="text"  class="form-control" id="code" aria-describedby="emailHelp"
                  placeholder="Entrer le code">
              </div>
              <div class="form-group">
                  <label for="libelle">date début </label>   
                   <span style="color:red; font-style:italic;"
                      v-if="$v.formData.date_debut.$error && !$v.formData.date_debut.required"
                      role="alert"> 
                      <span style="color:red; font-weight:bold">*</span>
                      Ce champs est obligatoire!
                  </span>  
                  <input @input="$v.formData.date_debut.$touch()" v-model="formData.date_debut"   type="date"  class="form-control" id="libelle" aria-describedby="emailHelp"
                  placeholder="Entrer le libelle">
              </div>
              <div class="form-group">
                  <label for="scolarite">date fin </label>   
                   <span style="color:red; font-style:italic;"
                      v-if="$v.formData.date_fin.$error && !$v.formData.date_fin.required"
                      role="alert"> 
                      <span style="color:red; font-weight:bold">*</span>
                      Ce champs est obligatoire!
                  </span>  
                  <input @input="$v.formData.date_fin.$touch()" v-model="formData.date_fin"   type="date"  class="form-control" id="scolarite" aria-describedby="emailHelp"
                  placeholder="Entrer le scolarite">
              </div>

               <button :disabled="active"  @click.prevent="AjouterFonctionLocal" type="submit" class="btn btn-primary">Enrégistrer</button>
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
          
           <h4>Modification du trimestre/semestre </h4>
          <span v-if="compare_date_debut_fin_mod ==false" style="color:red; font-style:italic; font-size:12px;">
              La date de debut ne doit pas être supérieure à la date de fin
          </span>
           <span v-if="verifie_date_debut_edit !=1" style="color:red; font-style:italic; font-size:12px;">
              L'année de la date de debut ne correspont pas à celle de l'année scolaire {{AnneeDebut}}
            </span>
           <span v-if="verifie_date_fin_edit !=1" style="color:red; font-style:italic; font-size:12px;">
              L'année de la date de debut ne correspont pas à celle de l'année scolaire {{AnneeFin}}
            </span>
           <div class="card-body">
           <form action="" method="post">
              <div class="form-group">
                  <label for="code">Année en cours </label>   
                  
                  <input disabled  :value="AnneEncours" type="text"  class="form-control" id="code" aria-describedby="emailHelp"
                  placeholder="Entrer le code">
              </div>
               <div class="form-group">
                  <label for="code">Trimestres/Semestres </label>   
                   <span style="color:red; font-style:italic;"
                      v-if="$v.editText.libelle.$error && !$v.editText.libelle.required"
                      role="alert"> 
                      <span style="color:red; font-weight:bold">*</span>
                      Ce champs est obligatoire!
                  </span> 
                  <input @input="$v.editText.libelle.$touch()" v-model="editText.libelle"   type="text"  class="form-control" id="code" aria-describedby="emailHelp"
                  placeholder="Entrer le code">
              </div>
              <div class="form-group">
                  <label for="libelle">date début </label>   
                   <span style="color:red; font-style:italic;"
                      v-if="$v.editText.date_debut.$error && !$v.editText.date_debut.required"
                      role="alert"> 
                      <span style="color:red; font-weight:bold">*</span>
                      Ce champs est obligatoire!
                  </span>  
                  <input @input="$v.editText.date_debut.$touch()" v-model="editText.date_debut"   type="date"  class="form-control" id="libelle" aria-describedby="emailHelp"
                  placeholder="Entrer le date">
              </div>
              <div class="form-group">
                  <label for="scolarite">date fin </label>   
                   <span style="color:red; font-style:italic;"
                      v-if="$v.editText.date_fin.$error && !$v.editText.date_fin.required"
                      role="alert"> 
                      <span style="color:red; font-weight:bold">*</span>
                      Ce champs est obligatoire!
                  </span>  
                  <input @input="$v.editText.date_fin.$touch()" v-model="editText.date_fin"   type="date"  class="form-control" id="scolarite" aria-describedby="emailHelp"
                  placeholder="Entrer le scolarite">
              </div>

               <button :disabled="active1"  @click.prevent="ModifierFonctionLocal" type="submit" class="btn btn-success ml-5">Modifier</button>
                     &nbsp;
                     <!-- <button @click.prevent="annuler" type="submit" class="btn btn-warning">Annuler</button>
                     &nbsp; -->
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
            
            libelle:"",
            date_debut:"",
            date_fin:"",
          },
          editText:{
            
            libelle:"",
            date_debut:"",
            date_fin:"",
          }
    }
  },
    validations:{
        formData:{
            
            libelle:{required},
            date_debut:{required},
            date_fin:{required},
        },
        editText:{
            
            libelle:{required},
            date_debut:{required},
            date_fin:{required},
        }
    },
  created(){
    if(this.gettersNiveau.length == 0){
      this.getNiveau();
    }
      this.getTrimestre();
      this.getAnnee();
  },
  computed:{
     ...mapGetters("parametres",["gettersNiveau","gettersTrimestre","gettersAnne"]),

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
     AnneeScolaire(){
       return (annee_id)=>{

         if(annee_id != null && annee_id !=""){
           let obj = this.gettersAnne.find(tem=>tem.id == annee_id)
           if(obj){
             if(obj.debut_annee == obj.fin_annee){
                return obj.debut_annee
             }
            return obj.debut_annee+"-"+obj.fin_annee;
           }
           return ""
         }
       }
     },
     AnneeDebut(){
      let obj = this.gettersAnne.find(tem=>tem.encours == 1)
       if(obj){
         return obj.debut_annee;
       }
       return ""
     },
     AnneeFin(){
       let obj = this.gettersAnne.find(tem=>tem.encours == 1)
       if(obj){
         return obj.fin_annee;
       }
       return ""
     },
     active(){
        return (this.verifie_date_debut !=1 || this.verifie_date_fin !=1 || this.compare_date_debut_fin == false)
        },
     active1(){
        return ( this.compare_date_debut_fin_mod == false)
        },
      verifie_date_debut(){
        if( this.formData.date_debut != ""){
            let ladate = new Date(this.formData.date_debut)
            if(ladate.getFullYear() >= this.AnneeDebut){
                return 1
            }
            return 0
        }
        return 1
    },
      verifie_date_debut_edit(){
        if( this.editText.date_debut != ""){
            let ladate = new Date(this.editText.date_debut)
            if(ladate.getFullYear() == this.AnneeDebut){
                return 1
            }
            return 0
        }
        return 1
    },
      verifie_date_fin(){
            if( this.formData.date_fin != ""){
            let ladate = new Date(this.formData.date_fin)
            if(ladate.getFullYear() == this.AnneeFin){
                return 1
                  }
                  return 0
              }
              return 1
        },
      verifie_date_fin_edit(){
            if( this.editText.date_fin != ""){
            let ladate = new Date(this.editText.date_fin)
            if(ladate.getFullYear() == this.AnneeFin){
                return 1
                  }
                  return 0
              }
              return 1
        },
         compare_date_debut_fin(){
            let vm = this
            if(!vm.formData.date_debut) return true
            if(!vm.formData.date_fin) return true
            const date1 = new Date(vm.formData.date_debut)
            const date2 = new Date(vm.formData.date_fin)
            if(date1 > date2){
                return false
            }
            return true
        },
         compare_date_debut_fin_mod(){
            let vm = this
            if(!vm.editText.date_debut) return true
            if(!vm.editText.date_fin) return true
            const date1 = new Date(vm.editText.date_debut)
            const date2 = new Date(vm.editText.date_fin)
            if(date1 > date2){
                return false
            }
            return true
        },
  },
  methods:{
    ...mapActions("parametres",["getNiveau","AjouterNiveau", "SupprimerTrimestre","getAnnee",
                "ModifierNiveau","SupprimerNiveau","getTrimestre","AjouterTrimestre","ModifierTrimestre","ModifierTrimestreEncours"]),
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
            date_debut:"",
            date_fin:"",
            };
        },
        //fermer le modale de modification
       close(){
        this.$v.editText.$reset();
         this.editText = {
             
              libelle:"",
              date_debut:"",
              date_fin:"",
            };

            this.showIsModal = !this.showIsModal
             this.getTrimestre();
        },

      editModale(id){
        this.showIsModal = true
        this.editText = this.gettersTrimestre.find(tem =>tem.id == id)
      },

       AnneEncour(id, id1, id2, id3, id4){
        let obj ={
          id:id,
          annee_id:id1,
          libelle:id2,
          date_debut:id3,
          date_fin:id4,
        }
        this.ModifierTrimestreEncours(obj)
      },
      ModifierFonctionLocal(){
        this.$v.editText.$touch();
            if(this.$v.editText.$error) {
                return
            }

            let objet ={
              ...this.editText,
              annee_id:this.AnneId
            }
          this.ModifierTrimestre(objet);
          this.close();
      },
    //Fonction d'ajout
    AjouterFonctionLocal(){
         this.$v.formData.$touch();
            if(this.$v.formData.$error) {
                return
            }
            let objet ={
              ...this.formData,
              annee_id:this.AnneId
            }
            this.AjouterTrimestre(objet)
            this.$v.formData.$reset();
         this.formData = {
            
              libelle:"",
              date_debut:"",
              date_fin:"",
            };
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