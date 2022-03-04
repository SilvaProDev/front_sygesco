<template>
  <div>
      <div class="container-fluid" id="container-wrapper">
        <div class="card mb-4">
            <div class="card-header py-3">
                <div class="row">         
                        <div class="col-6 col-md-3">
                           
                                <span>{{ $t("ul.importation") }}</span> <br>
                                <a href="javascript:;"
                                    class="btn btn-warning btn-sm" >
                                    <input ref="excel-upload-input" class="excel-upload-input" type="file" accept=".xlsx, .xls" @change="importExcel">                   
                                </a>
                                <div  v-if="tableData.length !=0">
                                    <br> &nbsp;
                                <button type="button" class="btn btn-success" @click.prevent="EnregistrerFichier()">Enrégistrer</button> &nbsp;
                                <button type="button" class="btn btn-danger" @click.prevent="Annuler()">Annuler</button>
                                </div>        
                         
                         </div>
                        <div class="col-6 col-md-3">
                            <h6 style="margin-left:5%;" class=" font-weight-bold text-primary text-center">{{ $t("SideBarli.nouvelleInscription") }}</h6>
                         </div>
                     
                </div>
                
            </div>
                                
           
           
            <div class="card-body">
          
                <form action="" method="post" enctype="multipart/form-data" class="p-3">
               
                    <div class="row">         
                        <div class="col-6 col-md-3">
                            <div class="form-group">
                                <label for="nom">Droit d'inscription <span style="color:red; font-weight:bold">*</span></label>
                                 <span style="color:red; font-style:italic;"
                                    v-if="$v.formData.droit.$error && !$v.formData.droit.required"
                                    role="alert">
                                     champs  obligatoire!
                                </span>
                                <input  @input="$v.formData.droit.$touch()"  type="text" v-model="formData.droit" class="form-control" id="nom" aria-describedby="emailHelp"
                                placeholder="Entrer la somme">
                            </div>
                        </div>
                         <div class="col-6 col-md-3">
                            <div class="form-group">
                                <label for="nom">Nom <span style="color:red; font-weight:bold">*</span></label>
                                 <span style="color:red; font-style:italic;"
                                    v-if="$v.formData.nom.$error && !$v.formData.nom.required"
                                    role="alert">
                                     champs  obligatoire!
                                </span>
                                <input  @input="$v.formData.nom.$touch()"  type="text" v-model="formData.nom" class="form-control" id="nom" aria-describedby="emailHelp"
                                placeholder="Entrer le nom">
                            </div>
                        </div>
                        <div class="col-6 col-md-3">
                            <div class="form-group">
                                <label for="prenom">Prénom <span style="color:red; font-weight:bold">*</span></label>
                                <span style="color:red; font-style:italic;"
                                    v-if="$v.formData.prenom.$error && !$v.formData.prenom.required"
                                    role="alert"> champs  obligatoire!
                                </span>
                                <input type="text"  @input="$v.formData.prenom.$touch()" v-model="formData.prenom" class="form-control" id="prenom" aria-describedby="emailHelp"
                                    placeholder="Entrer le prénom">
                            </div>
                        </div>
                        <div class="col-6 col-md-3">
                            <div class="form-group">
                                <label for="sexe">Sexe <span style="color:red; font-weight:bold">*</span></label>
                                <span style="color:red; font-style:italic;"
                                    v-if="$v.formData.sexe.$error && !$v.formData.sexe.required"
                                    role="alert"> champs obligatoire!
                                </span>
                                <select class="form-control" id="sexe"  @input="$v.formData.sexe.$touch()" v-model="formData.sexe">
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
                                    v-if="$v.formData.date_naissance.$error && !$v.formData.date_naissance.required"
                                    role="alert">champs obligatoire!
                                </span>
                                <input type="date" @input="$v.formData.date_naissance.$touch()" v-model="formData.date_naissance" class="form-control" id="date_naissance" aria-describedby="emailHelp"
                                placeholder="Entrer la date de naissance">

                            </div>
                        </div>   
                         <div class="col-6 col-md-3">
                            <div class="form-group">
                                <label for="date_naissance">Lieu de naissance <span style="color:red; font-weight:bold">*</span></label>
                                <span style="color:red; font-style:italic;"
                                    v-if="$v.formData.lieu_naissance.$error && !$v.formData.lieu_naissance.required"
                                    role="alert">champs obligatoire!
                                </span>
                                <input type="text" @input="$v.formData.lieu_naissance.$touch()" v-model="formData.lieu_naissance" class="form-control" id="date_naissance" aria-describedby="emailHelp"
                                placeholder="Entrer le lieu de naissance">

                            </div>
                        </div>     
                        
                      <div class="col-6 col-md-3">
                            <div class="form-group">
                                <label for="nationalité">Nationalité <span style="color:red; font-weight:bold">*</span></label>
                                <span style="color:red; font-style:italic;"
                                    v-if="$v.formData.nationalite.$error && !$v.formData.nationalite.required"
                                    role="alert"> champs  obligatoire!
                                </span>
                                <input @input="$v.formData.nationalite.$touch()" v-model="formData.nationalite" type="text" class="form-control" id="nationalité" aria-describedby="nationalité"
                                    placeholder="Entrer la nationalité">
                            </div>
                        </div>
                        
                       <div class="col-6 col-md-3">
                            <div class="form-group">
                                <label for="matricule">N° Matricule <span style="color:red; font-weight:bold">*</span></label>
                                <span style="color:red; font-style:italic;"
                                    v-if="$v.formData.matricule.$error && !$v.formData.matricule.required"
                                    role="alert">Ce champs est obligatoire!
                                </span>
                                <input type="text" @input="$v.formData.matricule.$touch()" v-model="formData.matricule" class="form-control" id="matricule" aria-describedby="matricule"
                                placeholder="Entrer le numéro matricule">
                            </div>
                        </div>
                    </div>
                    <div class="row">   
                         <div class="col-6 col-md-3">
                            <div class="form-group">
                                <label for="classe">Interne </label>
                                <!-- <span style="color:red; font-style:italic;"
                                    v-if="$v.formData.interime.$error && !$v.formData.interime.required"
                                    role="alert"> champs  obligatoire!
                                </span> -->
                                <select class="form-control" id="niveau"  v-model="formData.interime">
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
                                    v-if="$v.formData.redoublant.$error && !$v.formData.redoublant.required"
                                    role="alert">Ce champs est obligatoire!
                                </span>
                                <select class="form-control" id="niveau" @input="$v.formData.redoublant.$touch()" v-model="formData.redoublant">
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
                                    v-if="$v.formData.regime.$error && !$v.formData.regime.required"
                                    role="alert"> champs  obligatoire!
                                </span> -->
                                <select class="form-control" id="niveau"  v-model="formData.regime">
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
                                    v-if="$v.formData.oriente.$error && !$v.formData.oriente.required"
                                    role="alert"> champs  obligatoire!
                                </span>
                                <select class="form-control" id="niveau" @input="$v.formData.oriente.$touch()" v-model="formData.oriente">
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
                                    v-if="$v.formData.niveau_id.$error && !$v.formData.niveau_id.required"
                                    role="alert">Ce champs est obligatoire!
                                </span>
                                 <select class="form-control" id="sexe" @input="$v.formData.niveau_id.$touch()" v-model="formData.niveau_id">
                                    <option value="" selected disabled hidden>Choisir le niveau</option>
                                    <option v-for="tem in gettersNiveau" :key="tem.id" :value="tem.id">{{tem.libelle}}</option>
                                                        
                                </select>
                            </div>
                            </div>
                        <div class="col-6 col-md-3">
                            <div class="form-group">
                                <label for="classe">Classe <span style="color:red; font-weight:bold">*</span></label>
                                <span style="color:red; font-style:italic;"
                                    v-if="$v.formData.classe_id.$error && !$v.formData.classe_id.required"
                                    role="alert">Ce champs est obligatoire!
                                </span>
                                <select class="form-control" id="niveau" @input="$v.formData.classe_id.$touch()"  v-model="formData.classe_id">
                                    <option value="" selected disabled hidden>Choisissez la classe</option>
                                    <option v-for="item in LibelleClasse" :key="item.id" 
                                    :value="item.id">{{item.libelle}}</option>
                                                        
                                </select>

                             </div>
                        </div>
                        <div class="col-6 col-md-3" v-if="formData.oriente =='Oui'">
                            <div class="form-group">
                                <div class="form-group">
                                    <label for="scolarite">Scolarité <span style="color:red; font-weight:bold">*</span></label>
                                    <input type="number" v-model="formData.scolarite" class="form-control" id="scolarite" aria-describedby="scolarite"
                                    placeholder="Entrer la scolarité">
                                </div>
                            </div>
                        </div>
                        <div class="col-6 col-md-3" v-if="formData.oriente =='Non'">
                            <div class="form-group">
                                <div class="form-group">
                                    <label for="scolarite">Scolarité </label>
                                    <!-- <money :value="scolarite(formatageSomme(parseFloat(editText.scolarite)))" type="number" disabled class="form-control" id="scolarite" aria-describedby="scolarite"
                                    placeholder="Entrer la scolarité"></money> -->
                                    <input :value="scolarite(formData.niveau_id)" type="number" disabled class="form-control" id="scolarite" aria-describedby="scolarite"
                                    placeholder="Entrer la scolarité">
                                </div>
                            </div>
                        </div>
                         <div class="col-6 col-md-3">
                            <div class="form-group">
                                <div class="form-group">
                                    <label for="avatar">Photo </label>
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
                                      <select class="form-control" id="niveau" v-model="formData.maladie">
                                        <option value="" selected disabled hidden>Cas de maladie ?</option>
                                        <option value="Oui">Oui</option>
                                        <option value="Non">Non</option>                                                               
                                    </select>
                                    <!-- <input v-model="formData.maladie" type="text" class="form-control" id="maladie" aria-describedby="maladie"
                                    placeholder="Entrer le nom de la maladie"> -->
                                </div>
                            </div>
                        </div>
                         <div class="col-6 col-md-3">
                            <div class="form-group">
                                <div class="form-group">
                                    <label for="transport">Transport de l'élève</label>
                                    <select class="form-control" id="niveau" v-model="formData.transport">
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
                                <select class="form-control" id="transport" v-model="formData.cantine">
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
                                        v-if="$v.formData.adresse.$error && !$v.formData.adresse.required"
                                        role="alert">champs obligatoire!
                                    </span>
                                    <input @input="$v.formData.adresse.$touch()" v-model="formData.adresse" type="text" class="form-control" id="adresse" aria-describedby="adresse"
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
                                        v-if="$v.formData.nom_pere.$error && !$v.formData.nom_pere.required"
                                        role="alert">champs obligatoire!
                                    </span>
                                    <input @input="$v.formData.nom_pere.$touch()" v-model="formData.nom_pere" type="text" class="form-control" id="pere" aria-describedby="pere"
                                    placeholder="Entrer le nom père">
                                </div>

                            </div>
                        </div>
                        <div class="col-6 col-md-3">
                            <div class="form-group">
                                <div class="form-group">
                                    <label for="contact_pere">Contact du père <span style="color:red; font-weight:bold">*</span></label>
                                    <span style="color:red; font-style:italic;"
                                        v-if="$v.formData.contact_pere.$error && !$v.formData.contact_pere.required"
                                        role="alert">champs obligatoire!
                                    </span>
                                    <input @input="$v.formData.contact_pere.$touch()" v-model="formData.contact_pere" type="tel" class="form-control" id="contact_pere" aria-describedby="contact_pere"
                                    placeholder="Entrer le numéro père">

                                     <div style="color:red;" v-if="!$v.formData.contact_pere.minLength">Minimum {{$v.formData.contact_pere.$params.minLength.min}} chiffres.</div>
                                    <div style="color:red;" v-if="!$v.formData.contact_pere.maxLength">Maximum {{$v.formData.contact_pere.$params.maxLength.max}} chiffres.</div>
    
                                </div>

                            </div>
                        </div>
                        <div class="col-6 col-md-3">
                            <div class="form-group">
                                <div class="form-group">
                                    <label for="email">Email <span style="color:red; font-weight:bold">*</span></label>
                                    <span style="color:red; font-style:italic;"
                                        v-if="$v.formData.email.$error && !$v.formData.email.required"
                                        role="alert"> champs obligatoire!
                                    </span>
                                    <input @input="$v.formData.email.$touch()" v-model="formData.email" type="email" class="form-control" id="email" aria-describedby="email"
                                        placeholder="Entrer l'email de l'élève">
                                </div>
                            </div>
                        </div>

                        <div class="col-6 col-md-3">
                            <div class="form-group">
                                <label for="mere">Nom et prénom de la mère <span style="color:red; font-weight:bold">*</span></label>
                                <span style="color:red; font-style:italic;"
                                        v-if="$v.formData.nom_mere.$error && !$v.formData.nom_mere.required"
                                        role="alert">champs obligatoire!
                                    </span>
                                <input @input="$v.formData.nom_mere.$touch()" v-model="formData.nom_mere" type="text" class="form-control" id="mere" aria-describedby="nationalité"
                                placeholder="Entrer le nom de la mère">
                            </div>
                        </div>


                    </div>
                    <div class="row">         
                        <div class="col-6 col-md-3">
                            <div class="form-group">
                                <div class="form-group">
                                    <label for="contact_mere">Contact de la mère </label>
                                    <input v-model="formData.contact_mere" type="tel" class="form-control" id="contact_mere" aria-describedby="contact_mere"
                                    placeholder="Entrer le numéro de la mère">
                                </div>
                            </div>
                        </div>                                                              
                        <div class="col-6 col-md-3">
                            <div class="form-group">
                                <label for="tuteur">Nom et prénom du tuteur </label>
                                <!-- <span style="color:red; font-style:italic;"
                                        v-if="$v.formData.nom_tuteur.$error && !$v.formData.nom_tuteur.required"
                                        role="alert">champs obligatoire!
                                    </span> -->
                                <input  v-model="formData.nom_tuteur" type="text"  class="form-control" id="tuteur" aria-describedby="tuteur"
                                placeholder="Entrer le nom du tuteur">
                            </div>
                        </div>
                        <div class="col-6 col-md-3">
                            <div class="form-group">
                                <div class="form-group">
                                    <label for="contact_tuteur">Contact du tuteur </label>
                                    <!-- <span style="color:red; font-style:italic;"
                                        v-if="$v.formData.contact_tuteur.$error && !$v.formData.contact_tuteur.required"
                                        role="alert">champs obligatoire!
                                    </span> -->
                                    <input  v-model="formData.contact_tuteur" type="tel" class="form-control" id="contact_tuteur" aria-describedby="contact_tuteur"
                                    placeholder="Entrer le numéro du tuteur">
                                </div>
                            </div>
                        </div>

                        <div class="col-6 col-md-3" v-if="formData.maladie =='Oui'">
                            <div class="form-group">
                                <div class="form-group">
                                    <label for="autre">Autre information sur la maladie</label>
                                    <textarea  v-model="formData.autre" class="form-control" id="autre" rows="1"></textarea>
                                </div>
                            </div>
                        </div>
                    </div>

                    <button   @click.prevent="AjouterFonctionLocal" type="submit" class="btn btn-primary">Enrégistrer</button>
                     <!-- &nbsp;
                     <button @click.prevent="annuler" type="submit" class="btn btn-warning">Annuler</button>
                     &nbsp;
                     <button @click.prevent="fermer" class="btn btn-danger">Fermer</button> -->
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
//   import {Money} from 'v-money'
import { formatageSommeSansFCFA,formatageSomme } from "@/Repositorie/Repository";
import {mapGetters, mapActions} from "vuex";
import xlsx from 'xlsx'
export default {
    name:'staudent',
    components:{
        // Money
    },

    data(){
        return {
           
           tableData: [],
          tableHeader: [],
            selectedFile: "",
            formData:{
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
               
            }
        }
    },

    created(){
    if(this.gettersClasse.length == 0){
      this.getClasse();
    }
      this.getNiveau();
      this.get_all_student();
       this.getAnnee();
    },

     validations:{
        formData:{
            droit:{required},
            redoublant:{required},
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
     ...mapGetters("parametres",["gettersNiveau", "gettersClasse", "gettersAnne"]),
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
         if(this.formData.oriente =='Oui' && this.formData.scolarite !=''){
             return this.formData.scolarite
         }
         return this.scolarite(this.formData.niveau_id)
     },
      AnneEncours(){
       let obj = this.gettersAnne.find(tem=>tem.encours == 1)
       if(obj){
         return obj.id;
       }
       return ""
     },
     LibelleClasse(){
        return this.gettersClasse.filter(tem =>tem.niveau_id == this.formData.niveau_id)
     },
  },
    methods:{

         ...mapActions("parametres",["getNiveau","AjouterNiveau", "ModifierNiveau","SupprimerNiveau","getClasse","getAnnee"]),
         ...mapActions("student",["get_all_student","AjouterEleve", "ModifierEleve","SupprimerEleve","ImporterEleve"]),

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
                vm.formData.photo = e.target.result;
            };

            reader.readAsDataURL(file);
        },

    //   addFichierPDF(file) {
    //     if (!file.type.match("application/image")) {
    //         this.info_pdf = true;
    //         console.log(`${file.name} le fichier doit etre un PDF`);
    //         return;
    //     }
    //     this.info_pdf = false;
    //     let reader = new FileReader();
    //     let vm = this;
    //     reader.onload = (e) => {
    //         vm.imagePDF = "pdf.png";
    //         vm.namePDF = file.name;
    //         vm.fichierPDF = e.target.result;
    //     };
    //     reader.readAsDataURL(file);
    //     },

        AjouterFonctionLocal(){

               this.$v.formData.$touch();
            if(this.$v.formData.$error) {
                return
            }
            console.log(this.formData)
            let config = {
                header : {
                'Content-Type' : 'multipart/form-data'
                }
            }
            console.log(config)
       const formData = new FormData();
        // formData.append("file", this.selectedFile, this.selectedFile.name);
        formData.append("droit", this.formData.droit);         
        formData.append("interime", this.formData.interime);
        formData.append("regime", this.formData.regime);
        formData.append("redoublant", this.formData.redoublant);
        formData.append("lieu_naissance", this.formData.lieu_naissance);
        formData.append("nom", this.formData.nom);
        formData.append("prenom", this.formData.prenom);
        formData.append("sexe", this.formData.sexe);
        formData.append("date_naissance", this.formData.date_naissance);
        formData.append("matricule", this.formData.matricule);
        formData.append("nationalite", this.formData.nationalite);
        formData.append("niveau_id", this.formData.niveau_id);
        formData.append("classe_id", this.formData.classe_id);
        formData.append("scolarite", this.SommeScolarite);
        formData.append("oriente", this.formData.oriente);
        formData.append("email", this.formData.email);
        formData.append("adresse", this.formData.adresse);
        formData.append("maladie", this.formData.maladie);
        formData.append("transport", this.formData.transport);
        formData.append("cantine", this.formData.cantine);
        formData.append("nom_pere", this.formData.nom_pere);
        formData.append("contact_pere", this.formData.contact_pere);
        formData.append("nom_mere", this.formData.nom_mere);
        formData.append("contact_mere", this.formData.contact_mere);
        formData.append("nom_tuteur", this.formData.nom_tuteur);
        formData.append("contact_tuteur", this.formData.contact_tuteur);
        formData.append("autre", this.formData.autre);
        formData.append("annee_id", this.AnneEncours);
         if ( this.selectedFile!==""){
             formData.append('file', this.selectedFile, this.selectedFile.name);
            }
            else{
                formData.append('file', "vide");

            }
    this.AjouterEleve(formData, config);
      this.$v.formData.$reset();
        this.formData.droit="";
        this.formData.regime="";
        this.formData.interime="";
        this.formData.redoublant="";
        this.formData.lieu_naissance="";
        this.formData.nom="";
        this.formData.sexe="";
        this.formData.prenom="";
        this.formData.date_naissance="";
        this.formData.matricule="";
        this.formData.nationalite="";
        this.formData.niveau_id="";
        this.formData.classe_id="";
        this.formData.scolarite="";
        this.formData.oriente="";
        this.formData.email="";
        this.formData.adresse="";
        this.formData.maladie="";
        this.formData.transport="";
        this.formData.nom_pere="";
        this.formData.contact_pere="";
        this.formData.nom_mere="";
        this.formData.contact_mere="";
        this.formData.nom_tuteur="";
        this.formData.contact_tuteur="";
        this.formData.autre="";
        },

 Annuler(){
      let vm =this
      vm.tableData = []
    },
     EnregistrerFichier(){
   
       
      let obj ={
        dataExcel: this.tableData,
        
      }
      console.log(obj)
      this.ImporterEleve(obj)
          .then((data) => {
          console.log(data);
          this.tableData = [];
        })
        .catch((erro) => {
          console.log(erro);
        });
    },
    importExcel(e) {
      const files = e.target.files;
     // this.selectedFile = event.target.files[0];
      console.log(files);
      if (!files.length) {
        return ;
      } else if (!/\.(xls|xlsx)$/.test(files[0].name.toLowerCase())) {
        return alert("Le format de fichier est incorrect. chager un format xls or xlsx ");
      }
      const fileReader = new FileReader();
      fileReader.onload = ev => {
        try {
          const data = ev.target.result;
          
          const XLSX = xlsx;
          const workbook = XLSX.read(data, {
            type: "binary",
             cellDates: true,
              cellNF: false,
              cellText: false
          });
          const wsname = workbook.SheetNames[0]; // Take the first sheet，wb.SheetNames[0] :Take the name of the first sheet in the sheets
          const ws = XLSX.utils.sheet_to_json(workbook.Sheets[wsname]); // Generate JSON table content，wb.Sheets[Sheet名]    Get the data of the first sheet
         // const excellist = [];  // Clear received data
          // Edit data
       

          for (var i = 0; i < ws.length; i++) {
            this.tableData.push(ws[i]);
            
          }
          console.log("les données de silva", this.tableData); // At this point, you get an array containing objects that need to be processed
        } catch (e) {
          return alert("Read failure!");
        }
      };
      fileReader.readAsBinaryString(files[0]);
      var input = document.getElementById("upload");
      input.value = "";
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