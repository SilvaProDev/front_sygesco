<template>
  <div>
    <Loader :isVisible="loadingData"/>
      <div class="container">
    <div class="main-body">
    
          <!-- Breadcrumb -->
          <nav aria-label="breadcrumb" class="main-breadcrumb">
            <ol class="breadcrumb">
              <li class="breadcrumb-item">
                <router-link to="/" tag="li">
                <a href="">Home</a>
                </router-link>
                </li>
              <li class="breadcrumb-item"><a href="">Utilisateur</a></li>
              <li class="breadcrumb-item active" aria-current="page"> Profile</li>
            </ol>
          </nav>
          <!-- /Breadcrumb -->
    
          <div class="row gutters-sm">
            <div class="col-md-4 mb-3">
              <div class="card">
                <div class="card-body">
                  <div class="d-flex flex-column align-items-center text-center">
                   <span v-if="getterProfileUsers.image !='vide' && getterProfileUsers.image !=null">
									<img :src="getterProfileUsers.image" alt="Admin" class="rounded-circle p-1 bg-primary" width="130">
								</span>
								<span v-else>
								<img src="https://bootdey.com/img/Content/avatar/avatar6.png" alt="Admin" class="rounded-circle p-1 bg-primary" width="110">

								</span>
                    <div class="mt-3">
                      <h4>{{getterProfileUsers.name || 'Non renseigné'}}</h4>
                      <p class="text-secondary mb-1">{{LibelleRole(getterProfileUsers.role_id) || 'Non renseigné'}}</p>
                      <p class="text-muted font-size-sm"> {{getterProfileUsers.adresse || 'Non renseigné'}}</p>
                      
                    <div class="col-sm-12">
                      <a class="btn btn-info "  @click.prevent="toggle" href="" >Plus de détail</a>
                
                     </div>
                    </div>
                  </div>
                </div>
              </div>
             
            </div>
            <div class="col-md-8">
              <div class="card mb-3">
               
             
                <div class="card h-100">
                    <div class="card-body">
                      <h6 class="d-flex align-items-center mb-3 ml-5">
                        <i class="material-icons text-info mr-2"></i>Liste des classe(s) et matière(s) affectée(s)</h6>
                     
                      <div class="progress mb-3 ml-5" style="height: 5px">
                        <div class="progress-bar bg-success" role="progressbar" style="width: 80%" aria-valuenow="80" aria-valuemin="0" aria-valuemax="100"></div>
                      </div>
                      
                <div class="table-responsive ml-3">
                  <table class="table " v-if="ListeAffectation.length !=0">
                    <thead class="thead-light">
                      <tr >
                        <th>N°</th>
                        <th>Trimestre</th>
                        <th>Classe</th>
                        <th>Matières</th>                                        
                        <!-- <th  colspan="2" >Action</th> -->
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(item, index) in ListeAffectation" :key="item.id" :value="item.id">
                          <td>{{index+1}}</td>
                          <td>{{LibelleTrimestre(item.trimestre_id)}}</td>
                          <td>{{classe(item.classe_id)}}</td>
                          <td>{{LibMatiere(item.matiere_id)}}</td>                        
                         <!-- <td >                   
                         <a title="Modifier"  @click.prevent="ModificationModal(item.id)">
                            <i style="color:green;" class="fas fa-edit"> </i>                      
                        </a>
                            &nbsp;
                        <a title="Supprimer"  @click.prevent="SupprimerAffectation(item.id)">
                         <i style="color:red;" class="fas fa-trash"></i>
                        </a>      
                        </td> -->
                      </tr>                                                         
                    </tbody>
                  </table>
                  <table class="table align-items-center table-flush" v-else>
                    <thead class="thead-light">
                      <tr >
                        <th>N°</th>
                        <th>Trimestre</th>
                        <th>Classe</th>
                        <th>Matières</th>                                        
                        <th  colspan="2" >Action</th>
                      </tr>
                    </thead>
                    <tbody>
                        <td colspan="5">
                          
                       <h6 style="color:red">Aucune affectation pour l'instant</h6>
                        </td>
                                                                          
                    </tbody>
                  </table>
                </div>
                    
            
                    </div>
                  </div>
              </div>

            </div>
        <Drawer @close="annuler" align="right" :closeable="true" style="background-color:#fff">
      <div v-if="open" class="ModalStyle">
         
         <div class="card-body" style="width:500px !important;">
                  <div class="row">
                    <div class="col-sm-4">
                      <h6 class="mb-0">Nom et Prenom</h6>
                    </div>
                    <div class="col-sm-8">
                      {{getterProfileUsers.name || "Non renseigné"}}
                    </div>
                  </div>
                  <hr>
                  <div class="row">
                    <div class="col-sm-4">
                      <h6 class="mb-0">Email</h6>
                    </div>
                    <div class="col-sm-8">
                     {{getterProfileUsers.email || "Non renseigné"}}
                    </div>
                  </div>
                  <hr>
                  <div class="row">
                    <div class="col-sm-4">
                      <h6 class="mb-0">Mobile</h6>
                    </div>
                    <div class="col-sm-8">
                      {{getterProfileUsers.phone || "Non renseigné"}}
                    </div>
                  </div>
                  <!-- <hr> -->
                  <!-- <div class="row">
                    <div class="col-sm-4">
                      <h6 class="mb-0">Mobile</h6>
                    </div>
                    <div class="col-sm-8">
                      {{getterProfileUsers.mobile || 'Non renseigné'}}
                    </div>
                  </div> -->
                  <hr>
                  <div class="row">
                    <div class="col-sm-4">
                      <h6 class="mb-0">Addresse</h6>
                    </div>
                    <div class="col-sm-8">
                       {{getterProfileUsers.adresse || 'Non renseigné'}}
                    </div>
                  </div>
                  <hr>
                  <div class="row">
                    <div class="col-sm-12">
                      <a class="btn btn-info " href="" @click.prevent="UpdateProfile(getterProfileUsers.id)">Modifier le profile</a>
                      &nbsp;&nbsp;
                      <a class="btn btn-warning pl-3 pr-3" href="" @click.prevent="annuler">Fermer</a>
                    </div>
                  </div>
                </div> 
      </div>
    </Drawer>
              <!-- <div class="row gutters-sm">
                <div class="col-sm-12 mb-3">
                  <div class="card h-100">
                    <div class="card-body">
                      <h6 class="d-flex align-items-center mb-3 ml-5">
                        <i class="material-icons text-info mr-2"></i>Liste des classe(s) et matière(s) affectée(s)</h6>
                     
                      <div class="progress mb-3 ml-5" style="height: 5px">
                        <div class="progress-bar bg-success" role="progressbar" style="width: 80%" aria-valuenow="80" aria-valuemin="0" aria-valuemax="100"></div>
                      </div>
                      
                <div class="table-responsive ml-3">
                  <table class="table " v-if="ListeAffectation.length !=0">
                    <thead class="thead-light">
                      <tr >
                        <th>N°</th>
                        <th>Trimestre</th>
                        <th>Classe</th>
                        <th>Matières</th>                                        
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(item, index) in ListeAffectation" :key="item.id" :value="item.id">
                          <td>{{index+1}}</td>
                          <td>{{LibelleTrimestre(item.trimestre_id)}}</td>
                          <td>{{classe(item.classe_id)}}</td>
                          <td>{{LibMatiere(item.matiere_id)}}</td>                        
                        
                      </tr>                                                         
                    </tbody>
                  </table>
                  <table class="table align-items-center table-flush" v-else>
                    <thead class="thead-light">
                      <tr >
                        <th>N°</th>
                        <th>Trimestre</th>
                        <th>Classe</th>
                        <th>Matières</th>                                        
                        <th  colspan="2" >Action</th>
                      </tr>
                    </thead>
                    <tbody>
                        <td colspan="5">
                          
                       <h6 style="color:red">Aucune affectation ne vous été atribuée pour l'instant</h6>
                        </td>
                                                                          
                    </tbody>
                  </table>
                </div>
                    
            
                    </div>
                  </div>
                </div>
               
              </div> -->

              <div class="row gutters-sm">
                <div class="col-sm-12 mb-3">
                  <div class="card h-100">
                    <div class="card-body">
                      <h6 class="d-flex align-items-center mb-3">
                        <i class="material-icons text-info " style="margin-left:10%"></i>Modification de mot passe</h6>
                      <!-- {{getterProfileUsers}} -->
                      <!-- <small>Parents children</small> -->
                      <div class="progress mb-3 " style="margin-left:10%; height: 5px">
                        <div class="progress-bar bg-primary" role="progressbar" style="width: 80%" aria-valuenow="80" aria-valuemin="0" aria-valuemax="100"></div>
                      </div>
                       <div class="row pr-5" style="margin-left:25%">
                        <div class="col-sm-4">
                          <h6 class="mb-0">Mot de passe actuel</h6>
                          
                        </div>
                        <div class="col-sm-8 text-secondary">
                        <input v-model="formData.ancien"  type="password" class="form-control" placeholder="XXXXXXX"
                        @input="$v.formData.ancien.$touch()">
                         <span style="color:red; font-style:italic;"
                            v-if="$v.formData.ancien.$error && !$v.formData.ancien.required"
                            role="alert"> 
                            <span style="color:red; font-weight:bold">*</span>
                            champs obligatoire!
                        </span> 
                        </div>
                       </div>
                       <div class="row pr-5" style="margin-left:25%">
                        <div class="col-sm-4">
                          <h6 class="mb-0">Nouveau mot de passe </h6>
                        </div>
                        <div class="col-sm-8 text-secondary">
                        <input v-model="formData.nouveau_mot_de_passe"  type="password" class="form-control" placeholder="XXXXXXX"
                           @input="$v.formData.nouveau_mot_de_passe.$touch()" id="password"
                           :class="{'is-invalid':$v.formData.nouveau_mot_de_passe.$error, 'is-valid':!$v.formData.nouveau_mot_de_passe.$invalid}">
                          
                           <span style="color:red; font-style:italic;"
                            v-if="$v.formData.nouveau_mot_de_passe.$error && !$v.formData.nouveau_mot_de_passe.required"
                            role="alert"> 
                            <span style="color:red; font-weight:bold">*</span>
                            champs obligatoire!
                        </span> 
                         <span style="color:red; font-style:italic;"
                              v-if="!$v.formData.nouveau_mot_de_passe.minLength"
                              role="alert"> 
                              <span style="color:red; font-weight:bold">*</span>
                              Au minimum {{$v.formData.nouveau_mot_de_passe.$params.minLength.min}} caractères
                          </span> 
                        </div>
                       </div>
                       <div class="row pr-5" style="margin-left:25%">
                        <div class="col-sm-4">
                          <h6 class="mb-0">Confirmer mot de passe</h6>
                           <span style="color:red; font-style:italic;"
                            v-if="formData.passwordconfirm =='' && $v.formData.passwordconfirm.$error && !$v.formData.passwordconfirm.required"
                            role="alert"> 
                            <span style="color:red; font-weight:bold">*</span>
                            champs obligatoire!
                        </span> 
                         
                        </div>
                        <div class="col-sm-8 text-secondary">
                        <input v-model="formData.passwordconfirm"  type="password" class="form-control" placeholder="XXXXXXX"
                         @input="$v.formData.passwordconfirm.$touch()" id="password"
                           :class="{'is-invalid':$v.formData.passwordconfirm.$error, 'is-valid': formData.nouveau_mot_de_passe != '' ?
                            !$v.formData.passwordconfirm.$invalid :''}" >

                        <span style="color:red; font-style:italic;"  
                            v-if="!$v.formData.passwordconfirm.sameAsPassword && formData.passwordconfirm"
                            role="alert"> Le mot de passe est diférent
                        </span> 
                        </div>
                       </div>
                     
                      <div class="row" style="margin-left:80%">
                      <div class="col-sm-12" >
                        <a :disabled="!$v.formData.passwordconfirm.sameAsPassword"  class="btn btn-warning " href="" @click.prevent="UpdatePassword" >Modifier le mot passe</a>
                      </div>
                    </div>
                    </div>
                  </div>
                </div>
               
              </div>
          </div>

        </div>
    </div>
     <notifications  />
  </div>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex'
    import {required, sameAs, minLength} from "vuelidate/lib/validators";
     import Drawer from "vue-simple-drawer"
     import axios from "axios"
  
      // const bcrypt = require('bcrypt');
     
// hashIt(password);
// async function compareIt(password){
//   const validPassword = await bcrypt.compare(password, hashedPassword);
// }
// compareIt(password);

    export default {
 
      components:{
        Drawer,
        
      },
        data() {
            
          return {   
            formData:{
              ancien:"",
              nouveau_mot_de_passe:"",
              passwordconfirm:"",
               showPassword:false,
            },
        wholename: '',
        email: '',

          innerOpen: false,
          align: "right",
           open: false,
      }

      // this.getUser().then(res => {
      // this.wholename = res.name
      // this.email = res.email
      // return res
      // })
      
    },
     validations:{
       formData:{

         ancien:{required},
         
              nouveau_mot_de_passe:{
                required,
                minLength:minLength(5)},
                passwordconfirm:{
                    sameAsPassword: sameAs('nouveau_mot_de_passe'),
                }
       }
       
},
        created(){
           this.getUserProfile();
        //    this.login();
             this.getRole();
              this.getAnnee();
              this.getAffectation();
               this.getNiveau();
      this.getClasse();
        this.getTrimestre();
      this.getMatiere();
          
          
        },

    computed: {
          ...mapGetters("parametres",["gettersNiveau", "gettersClasse", "gettersMatiere","gettersTrimestre", "gettersAnne",
     "gettersTransport"]),
      
          ...mapGetters('personnel', ['getterProfileUsers', "gettersRole", "gettersAffectation", "gettersloadingUser"]),

   loadingData(){
    return this.gettersloadingUser
       
    },

   ListeAffectation(){
        return this.gettersAffectation.filter(tem=>tem.teacher_id == this.getterProfileUsers.id)
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

          classe(){
       return (id)=>{
         if(id != null && id != ""){
           let obj = this.gettersClasse.find(tem=>tem.id == id)
           if(obj){
             return obj.libelle;
           }
         }
       }
     },
      LibelleTrimestre(){
       return (id)=>{
         if(id != "" && id != null){
           let text = this.gettersTrimestre.find(tem =>tem.id == id)
           if(text){
             return text.libelle;
           }
           return "";
         }
       }
     },
      LibMatiere(){
       return (id)=>{
         if(id != "" && id != null){
           let text = this.gettersMatiere.find(tem =>tem.id == id)
           if(text){
             return text.libelle;
           }
           return "";
         }
       }
     },

 
        },

        methods: {
                 ...mapActions("parametres",["getTrimestre","getNiveau","AjouterNiveau", "ModifierNiveau","SupprimerNiveau",
         "getClasse", "getMatiere", "getAnnee", "AjouterMessageEmail", "AjouterMessageSms", "AjouterTransport",
         "getTransport"]),
        
              ...mapActions('personnel', ['getUserProfile','changePassword',"getRole", "getAffectation"]),

                 toggle(){
                    this.open = !this.open
                  },
                  annuler(){
                    this.open =false
                  },
               getUser() {
              return axios.get('auth/profile_user', {
                  // headers:{
                  //     Authorization: 'Bearer' `${localStorage.token}`
                  // }
              }).then(res => {
                   console.log("silva reuissite")
                      return res.data
                  })
                  .catch(err =>{
                      console.log(err)
                  });
        },

         toggleShowPassword(){
            var show = document.getElementById('password')
            if(this.formData.showPassword == false){
                this.formData.showPassword = true,
                show.type = "text"
            } else{
                this.formData.showPassword = false
                show.type = 'password'
            }
        },
        

 OnchangeImage(e) {
                const files = e.target.files;
                this.selectedImage = event.target.files[0];
                Array.from(files).forEach(file => this.addImage(file));
            },
            
             addImage(file) {
                if (!file.type.match("image.*")) {
                    this.info_img=true;
                    console.log(`${file.name} le fichier doit etre une image`);
                    return;
                }
                this.info_img=false;
                let reader = new FileReader();
                let vm = this;
                reader.onload = e => {
                    vm.image = e.target.result;
                };
                reader.readAsDataURL(file);
            },
addFichierPDF(file) {
                let reader = new FileReader();
                let vm = this;
                reader.onload = e => {
                    vm.imagePDF = "pdf.png";
                    vm.namePDF = file.name;
                    vm.fichierPDF = e.target.result;
                };
                reader.readAsDataURL(file);
            },
           

            UpdateProfile(index){
             this.$router.push({
                name:'UpdateProfile', params:{id: index}
              })
            },
            UpdatePassword(){
              this.$v.formData.$touch();
            if(this.$v.formData.$error){
                return
            }
              let obj ={
               id:this.getterProfileUsers.id,
               nouveau_mot_de_passe:this.formData.nouveau_mot_de_passe,
               password:this.formData.ancien,
               email:this.getterProfileUsers.email


                
              }
              //  const formData = new FormData();
              //   formData.append("ancien", this.formData.ancien);
              //   formData.append("password", this.formData.nouveau_mot_de_passe);
              //   formData.append("id", this.getterProfileUsers.id);
                
              this.changePassword(obj)
              console.log(obj)
            }
        }
    }
</script>

<style scoped>
body{
    margin-top:20px;
    color: #1a202c;
    text-align: left;
    background-color: #e2e8f0;    
}
.main-body {
    padding: 15px;
}
.card {
    box-shadow: 0 1px 3px 0 rgba(0,0,0,.1), 0 1px 2px 0 rgba(0,0,0,.06);
}

.card {
    position: relative;
    display: flex;
    flex-direction: column;
    min-width: 0;
    word-wrap: break-word;
    background-color: #fff;
    background-clip: border-box;
    border: 0 solid rgba(0,0,0,.125);
    border-radius: .25rem;
}

.card-body {
    flex: 1 1 auto;
    min-height: 1px;
    padding: 1rem;
}

.gutters-sm {
    margin-right: -8px;
    margin-left: -8px;
}

.gutters-sm>.col, .gutters-sm>[class*=col-] {
    padding-right: 8px;
    padding-left: 8px;
}
.mb-3, .my-3 {
    margin-bottom: 1rem!important;
}

.bg-gray-300 {
    background-color: #e2e8f0;
}
.h-100 {
    height: 100%!important;
}
.shadow-none {
    box-shadow: none!important;
}
.ModalStyle {
    width: 94%;
    height: auto;
    float: left;
    padding: 0 3% 0 3%;
    margin-bottom: 0;
    color: #fff;
    background-color: rgba(235, 14, 51, 0);

}
</style>