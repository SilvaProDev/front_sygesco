<template>
  <div class="container m-3">
    <h2 class="ml-5">Modification de la Configuration de l'entête de l'école</h2>
 

    <div class="card-body">

        <form action="" method="post" enctype="multipart/form-data">
            
            <div class="row mr-5">  
             
               
                <div class="col-6 col-md-3">
                    
                    <div class="form-group">
                        <label for="pere">Etablissement </label>
                         <span style="color:red; font-style:italic;"
                            v-if="$v.editEntete.nom.$error && !$v.editEntete.nom.required"
                            role="alert">
                            <span style="color:red;">*</span> &nbsp;
                            Ce champs est obligatoire!
                         </span> 
                        <input  type="text" class="form-control" id="pere" aria-describedby="pere"
                        placeholder="Entrer le nom de l'école" @input="$v.editEntete.nom.$touch()" v-model="editEntete.nom">
                    </div>    
                </div>
                <div class="col-6 col-md-3">
                    
                    <div class="form-group">
                        <label for="slogan">Slogan </label>
                        <span style="color:red; font-style:italic;"
                            v-if="$v.editEntete.slogan.$error && !$v.editEntete.slogan.required"
                            role="alert">
                            <span style="color:red;">*</span> &nbsp;
                            Ce champs est obligatoire!
                         </span> 
                        <input  type="text" class="form-control" id="slogan" aria-describedby="slogan"
                        placeholder="Entrer le slogan " @input="$v.editEntete.slogan.$touch()" v-model="editEntete.slogan">
                    </div>

                </div>
                   <div class="col-6 col-md-3">
                    <div class="form-group">
                        
                        <label for="contact">Téléphone</label>
                         <span style="color:red; font-style:italic;"
                            v-if="$v.editEntete.contact.$error && !$v.editEntete.contact.required"
                            role="alert">
                            <span style="color:red;">*</span> &nbsp;
                            Ce champs est obligatoire!
                         </span> 
                            <input  type="text" class="form-control" id="contact" aria-describedby="contact"
                            placeholder="Entrer le contact" @input="$v.editEntete.contact.$touch()" v-model="editEntete.contact">
                        </div>

                    
                </div>
                   <div class="col-6 col-md-3">
                    <div class="form-group">                     
                        <label for="email">Email </label>
                        <span style="color:red; font-style:italic;"
                            v-if="$v.editEntete.email.$error && !$v.editEntete.email.required"
                            role="alert">
                            <span style="color:red;">*</span> &nbsp;
                            Ce champs est obligatoire!
                        </span> 
                            <input  type="text" class="form-control" id="email" aria-describedby="email"
                            placeholder="Entrer email" @input="$v.editEntete.email.$touch()" v-model="editEntete.email">
                        </div>

                    
                </div>
            </div>
            <div class="row mr-5">  
             
             
                <div class="col-6 col-md-3">
                    <div class="form-group">
                        
                        <label for="contact">Localisation</label>
                         <span style="color:red; font-style:italic;"
                            v-if="$v.editEntete.adresse.$error && !$v.editEntete.adresse.required"
                            role="alert">
                            <span style="color:red;">*</span> &nbsp;
                            Ce champs est obligatoire!
                         </span> 
                            <input  type="text" class="form-control" id="adresse" aria-describedby="adresse"
                            placeholder="Entrer le adresse" @input="$v.editEntete.adresse.$touch()" v-model="editEntete.adresse">
                        </div>

                    
                </div>
                
                <div class="col-6 col-md-3">
                    <div class="form-group">
                        <label for="site">Site web</label>                           
                        <input  type="text" class="form-control" id="site" aria-describedby="site"
                        placeholder="Entrer le nom du site"  v-model="editEntete.site">                        
                    </div>
                </div>
                   <div class="col-6 col-md-3">
                    
                    <div class="form-group">
                    <label for="avatar">Logo </label>
                   
                    <input type="file" class="form-control" id="avatar" name="avatar"  @change="OnchangeFichier" 
                    accept="image/png, image/jpeg, image/jpg">
                </div>
                </div>
                 <div class="col-6 col-md-3">
                    <img :src="editEntete.photo" width="150px;" height="120px;" alt="">
                    
                </div>
                
            </div> <br> 

            <button   @click.prevent="AjouterFonctionLocal" type="submit" class="btn btn-primary ml-5">Modifier</button>
                &nbsp;
                <button @click.prevent="annuler" type="submit" class="btn btn-warning">Annuler</button>
                &nbsp;&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                &nbsp;&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                &nbsp;&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                &nbsp;&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                &nbsp;&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                &nbsp;&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                
        </form>

    </div>
    <!-- <table class="table">
        
              <tr >
            <td v-for="item in gettersconfigEntete" :key="item.id">
            <div class="row ml-5">    
                <div class="col-md-4">
                    <img :src="item.photo" alt="" width="300px;"  height="220px;">
                </div> 
                <div class="col-md-4">
                        <h3> {{item.nom}} </h3>
                    <span> <span style="color:#000;font-weight:600; font-size:15px;"> {{item.slogan}}</span>  </span> <br>
                    <span> <span style="color:#000;font-weight:600; font-size:15px;"> Contact: </span>{{item.contact}}</span> <br> 
                    <span> <span style="color:#000;font-weight:600; font-size:15px;"> Email: </span> {{item.email}} </span> <br>
                    <span> <span style="color:#000;font-weight:600; font-size:15px;"> Site web: </span> {{item.site}} </span> 
                   
                </div>
                <div class="col-md-4">
                    <img :src="item.photo"  width="300px;"  height="220px;" alt="" >
                </div>
            </div>
            </td>
        </tr>
   

    </table> -->
    <notifications/>
  </div>
</template>

<script>
import {required} from "vuelidate/lib/validators";
import {mapGetters, mapActions} from "vuex";
export default {

data(){
    return {
        editEntete:{
            
            photo:"",
            nom:"",
            slogan:"",
            email:"",
            site:"",
            adresse:"",
            contact:"",
        },
        
        selectedFile:""
    }
},
created(){
    this.getconfigEntete(),
    this.editEntete = this.gettersconfigEntete.find(tem =>tem.id == this.$route.params.id)
   
},
  validations:{
        editEntete:{
            
            nom:{required},
            slogan:{required},
            contact:{required},
            adresse:{required},
            email:{required},
            // photo:{required},
        }
    },
    computed:{

          ...mapGetters("parametres",["gettersNiveau", "gettersClasse", "gettersMatiere","gettersTrimestre", "gettersAnne",
        "gettersTransport","gettersconfigEntete" ]),
        ...mapGetters("student",["GetterStudent", "GetterCantine", "GetterScolarite", "GetterAbsence"]),
   

    },

    methods:{
        ...mapActions("parametres",["getNiveau","AjouterNiveau", "ModifierNiveau","SupprimerNiveau","getClasse", 
        "AjouterconfigEntete", "getconfigEntete","ModifierconfigEntete"]),
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
                vm.editEntete.photo = e.target.result;
            };

            reader.readAsDataURL(file);
        },

         AjouterFonctionLocal(){

               this.$v.editEntete.$touch();
            if(this.$v.editEntete.$error) {
                return
            }
            console.log(this.editEntete)
            let config = {
                header : {
                'Content-Type' : 'multipart/form-data'
                }
            }


            const editEntete = new FormData();
            // editEntete.append("file", this.selectedFile, this.selectedFile.name);
            editEntete.append("nom", this.editEntete.nom);
            // editEntete.append("photo", this.editEntete.photo);
            editEntete.append("contact", this.editEntete.contact);
            editEntete.append("email", this.editEntete.email);
            editEntete.append("slogan", this.editEntete.slogan);
            editEntete.append("adresse", this.editEntete.adresse);
            editEntete.append("site", this.editEntete.site);
            editEntete.append('id', this.editEntete.id);
             if ( this.selectedFile!==""){
             editEntete.append('fichier', this.selectedFile, this.selectedFile.name);
            }
           
        console.log(editEntete)
        this.ModifierconfigEntete( editEntete, config);
        this.$router.push({
                  name:"EnteteConfig"
              })
        },



           annuler(){
           this.$v.editEntete.$reset();
             this.editEntete.nom="",  
             this.editEntete.slogan="",  
             this.editEntete.email=""
             this.editEntete.contact=""
             this.editEntete.site=""
           
          },
    }
}
</script>

<style>

</style>