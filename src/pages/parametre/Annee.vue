<template>
  <div>
    <Loader :isVisible="loadingData"/>
        <Entete/>
      <div class="container m-5">
        
         <div class="row">
            <div class="col-lg-11 mb-4">
              <!-- Simple Tables -->
              <div class="card">
                <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                  <h6 class="m-0 font-weight-bold text-primary">Liste des années scolaire</h6>
                </div>
                <div class="table-responsive">
                  <table v-if="gettersAnne.length !=0" class="table align-items-center table-flush">
                    <thead class="thead-light">
                      <tr>
                        <th scope="col">N°</th>
                        <th scope="col">Année Scolaire</th>
                        <th scope="col">Date début</th>
                        <th scope="col">Date fin</th>
                        <th scope="col">Etat</th>
                        <th style="ml-5" colspan="3" scope="col">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(tem, index) in gettersAnne" :key="tem.id">
                <td scope="row">{{index +1}}</td>
                <td scope="row">{{tem.debut_annee+" - "+tem.fin_annee}}</td>
                <td> {{formaterDate(tem.date_debut)}} </td>
                <td>{{formaterDate(tem.date_fin)}}</td>
                <td >
                  <span style="color:green;" v-if="tem.encours ==1">En cours</span>
                  <span style="color:#fff;" v-else></span>
                </td>
                <td v-if="tem.encours !=1">
                  <a title="Mettre l'année en cours" @click.prevent="AnneEncours(tem.id, tem.debut_annee,tem.fin_annee,tem.date_debut,tem.date_fin)">                  
                    <i style="color:blue;" class="far fa-clone"></i>
                    </a>
                    &nbsp;
                    <button  @click="showModal(tem.id)" title="Modifier" type="button"  data-toggle="modal" data-target="#exampleModalCenter">
                      <i style="color:green;" class="fas fa-edit"> </i>
                    </button>
                 
                      &nbsp;
                  <a title="Supprimer"  @click.prevent="SupprimerAnnee(tem.id)">
                  
                     <i style="color:red;" class="fas fa-trash"></i>
                    </a>
                  
                      
                </td>
                      
              </tr>
                    </tbody>
                  </table>
            <table v-else class="table">
              <thead>
                <tr >
                <th scope="col">N°</th>
                  <th scope="col">Année Scolaire</th>
                  <th scope="col">Date début</th>
                  <th scope="col">Date fin</th>
                  <th scope="col">Etat</th>
                  <th style="ml-5" colspan="3" scope="col">Action</th>
                </tr>
              </thead>
            
            <tbody  class="text-center" style="color:red; font-style:bold; margin:5px, auto;">
              Aucune donnée saisie
            </tbody>
            </table>
                </div>
              
              </div>
            </div>
          </div>

          


      </div>

<!-- Modal -->
<div v-if="showModals" class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalCenterTitle">Modification de l'année</h5>
      </div>
      <div class="modal-body">
          <span v-if="compare_date_debut_fin ==false" style="color:red; font-style:italic; font-size:12px;">
              La date de debut ne doit pas être supérieure à la date de fin
          </span>
       <form action="" method="post" class="ml-3">
                              <div class="form-group">
                    <label for="nom">Année de debut<span style="color:red; font-weight:bold">*</span> </label>
                     <span style="color:red; font-style:italic;"
                        v-if="$v.editAnneScolaire.debut_annee.$error && !$v.editAnneScolaire.debut_annee.required"
                        role="alert">Ce champs est obligatoire!
                     </span>
                    <input type="text" @input="$v.editAnneScolaire.debut_annee.$touch()" v-model="editAnneScolaire.debut_annee" class="form-control" id="debut_annee" aria-describedby="emailHelp"
                    placeholder="Entrer l'année">

                     <div style="color:red;" v-if="!$v.editAnneScolaire.debut_annee.minLength">Minimum {{$v.editAnneScolaire.debut_annee.$params.minLength.min}} letters.</div>
                    <div style="color:red;" v-if="!$v.editAnneScolaire.debut_annee.maxLength">Maximum {{$v.editAnneScolaire.debut_annee.$params.maxLength.max}} letters.</div>
                    
                    </div>
                    <div class="form-group">
                    <label for="nom">Année de fin<span style="color:red; font-weight:bold">*</span> </label>
                     <span style="color:red; font-style:italic;"
                        v-if="$v.editAnneScolaire.fin_annee.$error && !$v.editAnneScolaire.fin_annee.required"
                        role="alert">Ce champs est obligatoire!
                     </span>
                    <input type="text" @input="$v.editAnneScolaire.fin_annee.$touch()" v-model="editAnneScolaire.fin_annee" class="form-control" id="fin_annee" aria-describedby="emailHelp"
                    placeholder="Entrer l'année">

                     <div style="color:red;" v-if="!$v.editAnneScolaire.fin_annee.minLength">Minimum {{$v.editAnneScolaire.fin_annee.$params.minLength.min}} letters.</div>
                    <div style="color:red;" v-if="!$v.editAnneScolaire.fin_annee.maxLength">Maximum {{$v.editAnneScolaire.fin_annee.$params.maxLength.max}} letters.</div>
    
                    
                    </div>

                    <div class="form-group">
                            <label for="nom">Date debut <span style="color:red; font-weight:bold">*</span> </label>
                        <span style="color:red; font-style:italic;"
                            v-if="$v.editAnneScolaire.date_debut.$error && !$v.editAnneScolaire.date_debut.required"
                            role="alert">Ce champs est obligatoire!
                        </span>
                            <input type="date" @input="$v.editAnneScolaire.date_debut.$touch()" v-model="editAnneScolaire.date_debut" class="form-control" id="nom" aria-describedby="emailHelp"
                            placeholder="Date debut">
                        <span v-if="verifie_date_debut !=1" style="color:red; font-style:italic; font-size:12px;">
                        L'année de la date de debut ne correspont pas à celle de l'année début
                        </span>
                    </div>
                    <div class="form-group">
                        <label for="nom">Date de fin <span style="color:red; font-weight:bold">*</span> </label>
                        <span style="color:red; font-style:italic;"
                            v-if="$v.editAnneScolaire.date_fin.$error && !$v.editAnneScolaire.date_fin.required"
                            role="alert">Ce champs est obligatoire!
                        </span>
                        <input type="date" @input="$v.editAnneScolaire.date_fin.$touch()" v-model="editAnneScolaire.date_fin" class="form-control" id="nom" aria-describedby="emailHelp"
                        placeholder="Date de fin">
                        <span v-if="verifie_date_fin !=1" style="color:red; font-style:italic; font-size:12px;">
                        L'année de la date de fin ne correspont pas à celle de l'année de fin
                    </span>
                    </div>

          <div  class="form-group text-center">
             <button :disabled="active"   @click.prevent="ModifierFonctionLocal(editAnneScolaire)" type="submit" class="btn btn-primary">Modifier</button>
              &nbsp;
              
           <button type="button" class="btn btn-danger" data-dismiss="modal">Fermer</button>
          </div>
         
          
        </form>
      </div>
     
    </div>
  </div>
</div>


    <ModaleAnnee :isModaleVisible="isModaleVisible" :toggleModale="toggleModale"/>

     <button style="display:none;" v-shortkey.once="['ctrl', 'f']" @shortkey="toggleModale()">Open</button>

      <fab :actions="fabActions"
      
                      main-icon="apps"
                @cache="toggleModale"
              bg-color="blue"

        ></fab>
    <notifications  />
  </div>
</template>

<script>
import {mapGetters, mapActions} from "vuex";
import fab from 'vue-fab'
import moment from "moment"
import {required, minLength, maxLength} from "vuelidate/lib/validators";
import ModaleAnnee from './ModalAnnee.vue'
import Entete from "../milieu/Entete.vue"
export default {
  components: {
    fab,
    ModaleAnnee,
    Entete
  },
    name:"annee",
    
    data(){
      return{
        count:0,
        bgColor: '#778899',
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
            isModaleVisible:false,
            isModalVisible:false,
            showModals:false,
            editAnneScolaire:{
              debut_annee:"",
                fin_annee:"",
                date_debut:"",
                date_fin:"",
            },
      }
    },
    created(){
      if(this.gettersAnne.length ==0){
        this.getAnnee();
      }
    },

    validations:{
        editAnneScolaire:{
             debut_annee:{
                 required,
                 minLength: minLength(4),
                 maxLength: maxLength(4),
             },
             fin_annee:{
                 required,
                 minLength: minLength(4),
                 maxLength: maxLength(4),
             },
            date_debut:{required},
            date_fin:{required},
        }
    },
    computed:{
      ...mapGetters("parametres",["gettersAnne","gettersloadingYear"]),

       loadingData(){
    return this.gettersloadingYear
       
    },

      taille(){
        let taille = this.gettersAnne.length
        return taille + 1
      },

                    active(){
            return (this.verifie_date_debut !=1 || this.verifie_date_fin !=1 || this.compare_date_debut_fin == false)
        },
         verifie_date_debut(){
            if(this.editAnneScolaire.debut_annee !="" && this.editAnneScolaire.date_debut != ""){
                let ladate = new Date(this.editAnneScolaire.date_debut)
                if(ladate.getFullYear() == this.editAnneScolaire.debut_annee){
                    return 1
                }
                return 0
            }
            return 1
        },
       verifie_date_fin(){
            if(this.editAnneScolaire.fin_annee !="" && this.editAnneScolaire.date_fin != ""){
                let ladate = new Date(this.editAnneScolaire.date_fin)
                if(ladate.getFullYear() == this.editAnneScolaire.fin_annee){
                    return 1
                }
                return 0
            }
            return 1
        },
         compare_date_debut_fin(){
            let vm = this
            if(!vm.editAnneScolaire.date_debut) return true
            if(!vm.editAnneScolaire.date_fin) return true
            const date1 = new Date(vm.editAnneScolaire.date_debut)
            const date2 = new Date(vm.editAnneScolaire.date_fin)
            if(date1 > date2){
                return false
            }
            return true
        },
    },

    methods:{

       toggleModale(){
          this.isModaleVisible = !this.isModaleVisible
      },
      
      ...mapActions("parametres",["getAnnee","AjouterAnnee", "SupprimerAnnee","ModifierAnnee", "ModifierAnneeEncours"]),

      showModal(id) {
        this.showModals = !this.showModals;
        this.editAnneScolaire = this.gettersAnne.find(tem =>tem.id == id)

      }, 
      AnneEncours(id, id1, id2, id3, id4){
        let obj ={
          id:id,
          debut_annee:id1,
          fin_annee:id2,
          date_debut:id3,
          date_fin:id4,
        }
        this.ModifierAnneeEncours(obj)
      },

      formaterDate(date) {
      return moment(date, "YYYY-MM-DD").format("DD-MM-YYYY");
    },

      ModifierFonctionLocal(){
        this.$v.editAnneScolaire.$touch();
                      if(this.$v.editAnneScolaire.$error) {
                          return
                      }
         
          console.log(this.editAnneScolaire)
        this.ModifierAnnee(this.editAnneScolaire)
        this.$v.editAnneScolaire.$reset();
         
},
    },

    
    }

</script>

<style>

</style>