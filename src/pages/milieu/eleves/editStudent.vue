<template>
  <div>
      <div class="container-fluid" id="container-wrapper">
        <div class="card mb-4">
            <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                <h6 style="margin-left:40%;" class=" font-weight-bold text-primary text-center">Nouvelle inscription</h6>
            </div>
            <div class="card-body">
                 <form action="" method="post" enctype="multipart/form-data" class="p-3">
               
                    <div class="row">         
                        <div class="col-6 col-md-3">
                            <div class="form-group">
                                <label for="nom">Droit d'inscription <span style="color:red; font-weight:bold">*</span></label>
                                 <span style="color:red; font-style:italic;"
                                    v-if="$v.editText.droit.$error && !$v.editText.droit.required"
                                    role="alert">
                                     champs  obligatoire!
                                </span>
                                <input  @input="$v.editText.droit.$touch()"  type="text" v-model="editText.droit" class="form-control" id="nom" aria-describedby="emailHelp"
                                placeholder="Entrer la somme">
                            </div>
                        </div>
                         <div class="col-6 col-md-3">
                            <div class="form-group">
                                <label for="nom">Nom <span style="color:red; font-weight:bold">*</span></label>
                                 <span style="color:red; font-style:italic;"
                                    v-if="$v.editText.nom.$error && !$v.editText.nom.required"
                                    role="alert">
                                     champs  obligatoire!
                                </span>
                                <input  @input="$v.editText.nom.$touch()"  type="text" v-model="editText.nom" class="form-control" id="nom" aria-describedby="emailHelp"
                                placeholder="Entrer le nom">
                            </div>
                        </div>
                        <div class="col-6 col-md-3">
                            <div class="form-group">
                                <label for="prenom">Prénom <span style="color:red; font-weight:bold">*</span></label>
                                <span style="color:red; font-style:italic;"
                                    v-if="$v.editText.prenom.$error && !$v.editText.prenom.required"
                                    role="alert"> champs  obligatoire!
                                </span>
                                <input type="text"  @input="$v.editText.prenom.$touch()" v-model="editText.prenom" class="form-control" id="prenom" aria-describedby="emailHelp"
                                    placeholder="Entrer le prénom">
                            </div>
                        </div>
                        <div class="col-6 col-md-3">
                            <div class="form-group">
                                <label for="sexe">Sexe <span style="color:red; font-weight:bold">*</span></label>
                                <span style="color:red; font-style:italic;"
                                    v-if="$v.editText.sexe.$error && !$v.editText.sexe.required"
                                    role="alert"> champs obligatoire!
                                </span>
                                <select class="form-control" id="sexe"  @input="$v.editText.sexe.$touch()" v-model="editText.sexe">
                                    <option value="" selected disabled hidden>Choisir le genre</option>
                                    <option value="Masculin">Masculin</option>
                                    <option value="Féminin">Féminin</option>                        
                                </select>
                            </div>
                        </div>
                       
                    </div>
                    <div class="row">     
                         <div class="col-6 col-md-3">
                            <div class="form-group">
                                <label for="date_naissance">Date de naissance <span style="color:red; font-weight:bold">*</span></label>
                                <span style="color:red; font-style:italic;"
                                    v-if="$v.editText.date_naissance.$error && !$v.editText.date_naissance.required"
                                    role="alert">champs obligatoire!
                                </span>
                                <input type="date" @input="$v.editText.date_naissance.$touch()" v-model="editText.date_naissance" class="form-control" id="date_naissance" aria-describedby="emailHelp"
                                placeholder="Entrer la date de naissance">

                            </div>
                        </div>   
                         <div class="col-6 col-md-3">
                            <div class="form-group">
                                <label for="date_naissance">Lieu de naissance <span style="color:red; font-weight:bold">*</span></label>
                                <span style="color:red; font-style:italic;"
                                    v-if="$v.editText.lieu_naissance.$error && !$v.editText.lieu_naissance.required"
                                    role="alert">champs obligatoire!
                                </span>
                                <input type="text" @input="$v.editText.lieu_naissance.$touch()" v-model="editText.lieu_naissance" class="form-control" id="date_naissance" aria-describedby="emailHelp"
                                placeholder="Entrer le lieu de naissance">

                            </div>
                        </div>     
                        
                      <div class="col-6 col-md-3">
                            <div class="form-group">
                                <label for="nationalité">Nationalité <span style="color:red; font-weight:bold">*</span></label>
                                <span style="color:red; font-style:italic;"
                                    v-if="$v.editText.nationalite.$error && !$v.editText.nationalite.required"
                                    role="alert"> champs  obligatoire!
                                </span>
                                <input @input="$v.editText.nationalite.$touch()" v-model="editText.nationalite" type="text" class="form-control" id="nationalité" aria-describedby="nationalité"
                                    placeholder="Entrer la nationalité">
                            </div>
                        </div>
                        
                       <div class="col-6 col-md-3">
                            <div class="form-group">
                                <label for="matricule">N° Matricule <span style="color:red; font-weight:bold">*</span></label>
                                <span style="color:red; font-style:italic;"
                                    v-if="$v.editText.matricule.$error && !$v.editText.matricule.required"
                                    role="alert">Ce champs est obligatoire!
                                </span>
                                <input type="text" @input="$v.editText.matricule.$touch()" v-model="editText.matricule" class="form-control" id="matricule" aria-describedby="matricule"
                                placeholder="Entrer le numéro matricule">
                            </div>
                        </div>
                    </div>
                    <div class="row">   
                         <div class="col-6 col-md-3">
                            <div class="form-group">
                                <label for="classe">Interne </label>
                                <!-- <span style="color:red; font-style:italic;"
                                    v-if="$v.editText.interime.$error && !$v.editText.interime.required"
                                    role="alert"> champs  obligatoire!
                                </span> -->
                                <select class="form-control" id="niveau"  v-model="editText.interime">
                                    <option value="" selected disabled hidden>Choisissez l'interime</option>
                                    <option value="Oui">Oui</option>
                                    <option value="Non">Non</option>                                                           
                                </select>
                            </div>
                        </div>  
                        
                        <div class="col-6 col-md-3">
                            <div class="form-group">
                                <label for="matricule">Redoublant <span style="color:red; font-weight:bold">*</span></label>
                                <span style="color:red; font-style:italic;"
                                    v-if="$v.editText.redoublant.$error && !$v.editText.redoublant.required"
                                    role="alert">Ce champs est obligatoire!
                                </span>
                                <select class="form-control" id="niveau" @input="$v.editText.redoublant.$touch()" v-model="editText.redoublant">
                                    <option value="" selected disabled hidden>Redoublant ?</option>
                                    <option value="Oui">Oui</option>
                                    <option value="Non">Non</option>                                                           
                                </select>
                            </div>
                        </div>
                      <div class="col-6 col-md-3">
                            <div class="form-group">
                                <label for="nationalité">Regime </label>
                                <!-- <span style="color:red; font-style:italic;"
                                    v-if="$v.editText.regime.$error && !$v.editText.regime.required"
                                    role="alert"> champs  obligatoire!
                                </span> -->
                                <select class="form-control" id="niveau" v-model="editText.regime">
                                    <option value="" selected disabled hidden>Choisissez le regime</option>
                                    <option value="1">Boursier</option>
                                    <option value="2">Non Boursier</option>                                                           
                                </select>
                            </div>
                        </div>
                        <div class="col-6 col-md-3">
                            <div class="form-group">
                                <label for="classe">Affecté(é) <span style="color:red; font-weight:bold">*</span></label>
                                <span style="color:red; font-style:italic;"
                                    v-if="$v.editText.oriente.$error && !$v.editText.oriente.required"
                                    role="alert"> champs  obligatoire!
                                </span>
                                <select class="form-control" id="niveau" @input="$v.editText.oriente.$touch()" v-model="editText.oriente">
                                    <option value="" selected disabled hidden>Choisissez l'orientation</option>
                                    <option value="Oui">Oui</option>
                                    <option value="Non">Non</option>                                                           
                                </select>
                            </div>
                        </div>
                       
                       
                    </div>
                    <div class="row">         
                       
                        <div class="col-6 col-md-3">
                            <div class="form-group">
                                <label for="niveau">Niveau <span style="color:red; font-weight:bold">*</span></label>
                                <span style="color:red; font-style:italic;"
                                    v-if="$v.editText.niveau_id.$error && !$v.editText.niveau_id.required"
                                    role="alert">Ce champs est obligatoire!
                                </span>
                                 <select class="form-control" id="sexe" @input="$v.editText.niveau_id.$touch()" v-model="editText.niveau_id">
                                    <option value="" selected disabled hidden>Choisir le niveau</option>
                                    <option v-for="tem in gettersNiveau" :key="tem.id" :value="tem.id">{{tem.libelle}}</option>
                                                        
                                </select>
                            </div>
                            </div>
                        <div class="col-6 col-md-3">
                            <div class="form-group">
                                <label for="classe">Classe <span style="color:red; font-weight:bold">*</span></label>
                                <span style="color:red; font-style:italic;"
                                    v-if="$v.editText.classe_id.$error && !$v.editText.classe_id.required"
                                    role="alert">Ce champs est obligatoire!
                                </span>
                                <select class="form-control" id="niveau" @input="$v.editText.classe_id.$touch()"  v-model="editText.classe_id">
                                    <option value="" selected disabled hidden>Choisissez la classe</option>
                                    <option v-for="item in LibelleClasse" :key="item.id" 
                                    :value="item.id">{{item.libelle}}</option>
                                                        
                                </select>

                             </div>
                        </div>
                        <div class="col-6 col-md-3" v-if="editText.oriente =='Oui'">
                            <div class="form-group">
                                <div class="form-group">
                                    <label for="scolarite">Scolarité <span style="color:red; font-weight:bold">*</span></label>
                                    <input type="number" v-model="editText.scolarite" class="form-control" id="scolarite" aria-describedby="scolarite"
                                    placeholder="Entrer la scolarité">
                                </div>
                            </div>
                        </div>
                        <div class="col-6 col-md-3" v-if="editText.oriente =='Non'">
                            <div class="form-group">
                                <div class="form-group">
                                    <label for="scolarite">Scolarité </label>
                                    <!-- <input :value="formatageSomme(parseFloat(scolarite(editText.niveau_id)))" type="number" disabled class="form-control" id="scolarite" aria-describedby="scolarite"
                                    placeholder="Entrer la scolarité"> -->
                                          <money  :value="scolarite(editText.niveau_id)" 
                                         type="text"   class="form-control" disabled></money> 
                                </div>
                            </div>
                        </div>
                         <div class="col-6 col-md-3">
                            <div class="form-group">
                                <div class="form-group">
                                    <label for="avatar">Photo <span style="color:red; font-weight:bold">*</span></label>
                                     <span>
                                      
                                        <img  :src="editText.photo"  width="60px;" height="40px" alt="">
                                    </span>
                                    <input  type="file" class="form-control" id="avatar" name="avatar" @change="OnchangeFichier"
                                    accept="image/png, image/jpeg, image/jpg">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-6 col-md-3">
                            <div class="form-group">
                                <div class="form-group">
                                    <label for="maladie">Maladie particulière</label>
                                      <select class="form-control" id="niveau" v-model="editText.maladie">
                                        <option value="" selected disabled hidden>Cas de maladie ?</option>
                                        <option value="Oui">Oui</option>
                                        <option value="Non">Non</option>                                                               
                                    </select>
                                    <!-- <input v-model="editText.maladie" type="text" class="form-control" id="maladie" aria-describedby="maladie"
                                    placeholder="Entrer le nom de la maladie"> -->
                                </div>
                            </div>
                        </div>
                         <div class="col-6 col-md-3">
                            <div class="form-group">
                                <div class="form-group">
                                    <label for="transport">Transport de l'élève</label>
                                    <select class="form-control" id="niveau" v-model="editText.transport">
                                        <option value="" selected disabled hidden>Transport</option>
                                        <option value="Oui">Oui</option>
                                        <option value="Non">Non</option>                                                               
                                    </select>
                                </div>

                            </div>
                        </div>
                          <div class="col-6 col-md-3">
                            <div class="form-group">
                                <label for="transport">Cantine</label>
                                <select class="form-control" id="transport" v-model="editText.cantine">
                                    <option value="" selected disabled hidden>Payez la cantine</option>
                                    <option value="Oui">Oui</option>
                                    <option value="Non">Non</option>                                                                
                                </select>
                            </div>
                        </div>
                         <div class="col-6 col-md-3">
                            <div class="form-group">
                                <div class="form-group">
                                    <label for="adresse">Adresse (Quartier) <span style="color:red; font-weight:bold">*</span> </label>
                                     <span style="color:red; font-style:italic;"
                                        v-if="$v.editText.adresse.$error && !$v.editText.adresse.required"
                                        role="alert">champs obligatoire!
                                    </span>
                                    <input @input="$v.editText.adresse.$touch()" v-model="editText.adresse" type="text" class="form-control" id="adresse" aria-describedby="adresse"
                                    placeholder="Entrer l'adresse">
                                </div>
                            </div>
                        </div>               
                    </div>
                   
                    <div class="row">  
                        <div class="col-6 col-md-3">
                            <div class="form-group">
                                <div class="form-group">
                                    <label for="pere">Nom et prénom du père <span style="color:red; font-weight:bold">*</span></label>
                                    <span style="color:red; font-style:italic;"
                                        v-if="$v.editText.nom_pere.$error && !$v.editText.nom_pere.required"
                                        role="alert">champs obligatoire!
                                    </span>
                                    <input @input="$v.editText.nom_pere.$touch()" v-model="editText.nom_pere" type="text" class="form-control" id="pere" aria-describedby="pere"
                                    placeholder="Entrer le nom père">
                                </div>

                            </div>
                        </div>
                        <div class="col-6 col-md-3">
                            <div class="form-group">
                                <div class="form-group">
                                    <label for="contact_pere">Contact du père <span style="color:red; font-weight:bold">*</span></label>
                                    <span style="color:red; font-style:italic;"
                                        v-if="$v.editText.contact_pere.$error && !$v.editText.contact_pere.required"
                                        role="alert">champs obligatoire!
                                    </span>
                                    <input @input="$v.editText.contact_pere.$touch()" v-model="editText.contact_pere" type="tel" class="form-control" id="contact_pere" aria-describedby="contact_pere"
                                    placeholder="Entrer le numéro père">

                                     <div style="color:red;" v-if="!$v.editText.contact_pere.minLength">Minimum {{$v.editText.contact_pere.$params.minLength.min}} chiffres.</div>
                                    <div style="color:red;" v-if="!$v.editText.contact_pere.maxLength">Maximum {{$v.editText.contact_pere.$params.maxLength.max}} chiffres.</div>
    
                                </div>

                            </div>
                        </div>
                        <div class="col-6 col-md-3">
                            <div class="form-group">
                                <div class="form-group">
                                    <label for="email">Email <span style="color:red; font-weight:bold">*</span></label>
                                    <span style="color:red; font-style:italic;"
                                        v-if="$v.editText.email.$error && !$v.editText.email.required"
                                        role="alert"> champs obligatoire!
                                    </span>
                                    <input @input="$v.editText.email.$touch()" v-model="editText.email" type="email" class="form-control" id="email" aria-describedby="email"
                                        placeholder="Entrer l'email de l'élève">
                                </div>
                            </div>
                        </div>

                        <div class="col-6 col-md-3">
                            <div class="form-group">
                                <label for="mere">Nom et prénom de la mère <span style="color:red; font-weight:bold">*</span></label>
                                <span style="color:red; font-style:italic;"
                                        v-if="$v.editText.nom_mere.$error && !$v.editText.nom_mere.required"
                                        role="alert">champs obligatoire!
                                    </span>
                                <input @input="$v.editText.nom_mere.$touch()" v-model="editText.nom_mere" type="text" class="form-control" id="mere" aria-describedby="nationalité"
                                placeholder="Entrer le nom de la mère">
                            </div>
                        </div>


                    </div>
                    <div class="row">         
                        <div class="col-6 col-md-3">
                            <div class="form-group">
                                <div class="form-group">
                                    <label for="contact_mere">Contact de la mère </label>
                                    <input v-model="editText.contact_mere" type="tel" class="form-control" id="contact_mere" aria-describedby="contact_mere"
                                    placeholder="Entrer le numéro de la mère">
                                </div>
                            </div>
                        </div>                                                              
                        <div class="col-6 col-md-3">
                            <div class="form-group">
                                <label for="tuteur">Nom et prénom du tuteur </label>
                                <!-- <span style="color:red; font-style:italic;"
                                        v-if="$v.editText.nom_tuteur.$error && !$v.editText.nom_tuteur.required"
                                        role="alert">champs obligatoire!
                                    </span> -->
                                <input  v-model="editText.nom_tuteur" type="text"  class="form-control" id="tuteur" aria-describedby="tuteur"
                                placeholder="Entrer le nom du tuteur">
                            </div>
                        </div>
                        <div class="col-6 col-md-3">
                            <div class="form-group">
                                <div class="form-group">
                                    <label for="contact_tuteur">Contact du tuteur </label>
                                    <!-- <span style="color:red; font-style:italic;"
                                        v-if="$v.editText.contact_tuteur.$error && !$v.editText.contact_tuteur.required"
                                        role="alert">champs obligatoire!
                                    </span> -->
                                    <input  v-model="editText.contact_tuteur" type="tel" class="form-control" id="contact_tuteur" aria-describedby="contact_tuteur"
                                    placeholder="Entrer le numéro du tuteur">
                                </div>
                            </div>
                        </div>

                        <div class="col-6 col-md-3" v-if="editText.maladie =='Oui'">
                            <div class="form-group">
                                <div class="form-group">
                                    <label for="autre">Autre information sur la maladie</label>
                                    <textarea  v-model="editText.autre" class="form-control" id="autre" rows="1"></textarea>
                                </div>
                            </div>
                        </div>
                    </div>

                    <button   @click.prevent="ModificationFonctionLocal" type="submit" class="btn btn-primary">Enrégistrer</button>
                   
                </form>
             
            </div>
        </div>
    </div>
     <notifications  />
  </div>
</template>

<script>
import {required, minLength, maxLength} from "vuelidate/lib/validators";
import moment from "moment"
 import {Money} from 'v-money'
 import { formatageSommeSansFCFA,formatageSomme } from "@/Repositorie/Repository";
import {mapGetters, mapActions} from "vuex";
export default {
    name:'staudent',
    components:{
        Money,
    },

    data(){
        return {
            selectedFile: "",
            editText:{
                 droit:"",
                nom:"",
                prenom:"",
                sexe:"",
                date_naissance:"",
                lieu_naissance:"",
                matricule:"",
                nationalite:"",
                niveau_id:"",
                classe_id:"",
                scolarite:"",
                oriente:"",
                email:"",
                adresse:"",
                maladie:"",
                transport:"",
                cantine:"",
                photo:"",
                nom_pere:"",
                contact_pere:"",
                nom_mere:"",
                contact_mere:"",
                nom_tuteur:"",
                contact_tuteur:"",
                autre:"",
                regime:"",
                interime:"",
                redoublant:"",
               
            },
            
        }
    },

    created(){
        this.editText = this.GetterStudent.find(tem =>tem.id == this.$route.params.id)
        console.log(this.editText)
    if(this.gettersClasse.length == 0){
      this.getClasse();
    }
      this.getNiveau();
      this.get_all_student();
      this.getAnnee();
    },

     validations:{
        editText:{
           droit:{required},
            // regime:{required},
            redoublant:{required},
            // interime:{required},
            nom:{required},
                prenom:{required},
                sexe:{required},
                date_naissance:{required},
                lieu_naissance:{required},
                matricule:{required},
                nationalite:{required},
                niveau_id:{required},
                classe_id:{required},
                // scolarite:{required},
                oriente:{required},
                email:{required},
                adresse:{required},
                // maladie:{required},
                // transport:{required},
                // cantine:{required},
                // photo:{required},
                nom_pere:{required},
                contact_pere:{required,  minLength: minLength(10), maxLength: maxLength(10),},
                nom_mere:{required},
                // contact_mere:{required,  minLength: minLength(10), maxLength: maxLength(10),},
                // nom_tuteur:{required},
                // contact_tuteur:{required,  minLength: minLength(10), maxLength: maxLength(10),},
                // autre:{required},
        }
    },
     computed:{
     ...mapGetters("parametres",["gettersNiveau", "gettersClasse","gettersAnne"]),
     ...mapGetters("student",["GetterStudent"]),

     scolarite(){
         return (id)=>{
             if(id != "" && id != null){
                let scolari = this.gettersNiveau.find(tem =>tem.id == id)
                    if(scolari){
                        return scolari.scolarite
                    }
                    return "" 
             }
         }
     },
         SommeScolarite(){
         if(this.editText.oriente =='Oui' && this.editText.scolarite !=''){
             return this.editText.scolarite
         }
         return this.scolarite(this.editText.niveau_id)
     },
        AnneEncours(){
       let obj = this.gettersAnne.find(tem=>tem.encours == 1)
       if(obj){
         return obj.id;
       }
       return ""
     },
     LibelleClasse(){
        return this.gettersClasse.filter(tem =>tem.niveau_id == this.editText.niveau_id)
     },
  },
    methods:{

         ...mapActions("parametres",["getNiveau","AjouterNiveau", "ModifierNiveau","SupprimerNiveau","getClasse",
         "getAnnee"]),
         ...mapActions("student",["get_all_student","AjouterEleve", "ModifierEleve","SupprimerEleve",]),

         OnchangeFichier(e) {
        const files = e.target.files;
        if(!files.length){return;}

        this.selectedFile = event.target.files[0];
        Array.from(files).forEach((file) => this.createImage(file));
        },

        createImage(file){

            let reader = new FileReader();
            let vm =this;

            reader.onload = (e)=>{
                vm.editText.photo = e.target.result;
            };

            reader.readAsDataURL(file);
        },

   

        ModificationFonctionLocal(){

               this.$v.editText.$touch();
            if(this.$v.editText.$error) {
                return
            }
            console.log(this.editText)
            let config = {
                header : {
                'Content-Type' : 'multipart/form-data'
                }
            }
       const formData =  new FormData();
        //  formData.append("file", this.selectedFile, this.selectedFile.name);
        formData.append("droit", this.editText.droit);
        formData.append("regime", this.editText.regime);
        formData.append("interime", this.editText.interime);
        formData.append("redoublant", this.editText.redoublant);
        formData.append("lieu_naissance", this.editText.lieu_naissance);
        formData.append("nom", this.editText.nom);
        formData.append("prenom", this.editText.prenom);
        formData.append("sexe", this.editText.sexe);
        formData.append("date_naissance", this.editText.date_naissance);
        formData.append("matricule", this.editText.matricule);
        formData.append("nationalite", this.editText.nationalite);
        formData.append("niveau_id", this.editText.niveau_id);
        formData.append("classe_id", this.editText.classe_id);
        formData.append("scolarite", this.SommeScolarite);
        formData.append("oriente", this.editText.oriente);
        formData.append("email", this.editText.email);
        formData.append("adresse", this.editText.adresse);
        formData.append("maladie", this.editText.maladie);
        formData.append("transport", this.editText.transport);
        formData.append("cantine", this.editText.cantine);
        formData.append("nom_pere", this.editText.nom_pere);
        formData.append("contact_pere", this.editText.contact_pere);
        formData.append("nom_mere", this.editText.nom_mere);
        formData.append("contact_mere", this.editText.contact_mere);
        formData.append("nom_tuteur", this.editText.nom_tuteur);
        formData.append("contact_tuteur", this.editText.contact_tuteur);
        formData.append("autre", this.editText.autre);
        formData.append("annee_id", this.AnneEncours);
        formData.append('id', this.editText.id);
          if ( this.selectedFile!==""){
             formData.append('fichier', this.selectedFile, this.selectedFile.name);
            }
           
    // let obj ={
    //   ...this.editText,
    //     id:this.editText.id
    // }
         this.ModifierEleve(formData, config);
         this.get_all_student();
        this.$router.go(-1)
        },

         formaterDate(date) {
      return moment(date, "YYYY-MM-DD");
    },
       formatageSomme:formatageSomme,
    formatageSommeSansFCFA:formatageSommeSansFCFA,
    }

}
</script>

<style>

</style>