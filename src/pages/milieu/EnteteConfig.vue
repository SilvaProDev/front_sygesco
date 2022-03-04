<template>
  <div class="container m-3">
    <h2 class="ml-5">Configuration de l'entête de l'école</h2>
 

    <div class="card-body">

        <form action="" method="post" enctype="multipart/form-data">
             <div class="col-6 col-md-3">
                    
                    <div class="form-group">
                        <label for="pere">Etablissement </label>
                         <span style="color:red; font-style:italic;"
                            v-if="$v.formData.nom.$error && !$v.formData.nom.required"
                            role="alert">
                            <span style="color:red;">*</span> &nbsp;
                            Ce champs est obligatoire!
                         </span> 
                        <input  type="text" class="form-control" id="pere" aria-describedby="pere"
                        placeholder="Entrer le nom de l'établissement" @input="$v.formData.nom.$touch()" v-model="formData.nom">
                    </div>    
                </div>
            <div class="row mr-5">  
            <div class="col-6 col-md-3">
                    <div class="form-group">
                        <label for="slogan">Slogan </label>
                        <span style="color:red; font-style:italic;"
                            v-if="$v.formData.slogan.$error && !$v.formData.slogan.required"
                            role="alert">
                            <span style="color:red;">*</span> &nbsp;
                            Ce champs est obligatoire!
                         </span> 
                        <input  type="text" class="form-control" id="slogan" aria-describedby="slogan"
                        placeholder="Entrer le slogan " @input="$v.formData.slogan.$touch()" v-model="formData.slogan">
                    </div>

                </div>
               
    
                <div class="col-6 col-md-3">
                    <div class="form-group">
                        
                        <label for="contact">Téléphone</label>
                         <span style="color:red; font-style:italic;"
                            v-if="$v.formData.contact.$error && !$v.formData.contact.required"
                            role="alert">
                            <span style="color:red;">*</span> &nbsp;
                            Ce champs est obligatoire!
                         </span> 
                            <input  type="text" class="form-control" id="contact" aria-describedby="contact"
                            placeholder="Entrer le numéro" @input="$v.formData.contact.$touch()" v-model="formData.contact">
                        </div>

                    
                </div>
                 <div class="col-6 col-md-3">
                    <div class="form-group">                     
                        <label for="email">Email </label>
                        <span style="color:red; font-style:italic;"
                            v-if="$v.formData.email.$error && !$v.formData.email.required"
                            role="alert">
                            <span style="color:red;">*</span> &nbsp;
                            Ce champs est obligatoire!
                        </span> 
                            <input  type="text" class="form-control" id="email" aria-describedby="email"
                            placeholder="Entrer email" @input="$v.formData.email.$touch()" v-model="formData.email">
                        </div>

                    
                </div>
               
               
            </div>
            <div class="row mr-5">  
                <div class="col-6 col-md-3">
                    <div class="form-group">                     
                        <label for="email">Localisation </label>
                        <span style="color:red; font-style:italic;"
                            v-if="$v.formData.adresse.$error && !$v.formData.adresse.required"
                            role="alert">
                            <span style="color:red;">*</span> &nbsp;
                            Ce champs est obligatoire!
                        </span> 
                            <input  type="text" class="form-control" id="adresse" aria-describedby="adresse"
                            placeholder="Entrer la localisation" @input="$v.formData.adresse.$touch()" v-model="formData.adresse">
                        </div>

                    
                </div>
               
                <div class="col-6 col-md-3">
                    <div class="form-group">
                        <label for="site">Site web</label>                           
                        <input  type="text" class="form-control" id="site" aria-describedby="site"
                        placeholder="Entrer le nom du site"  v-model="formData.site">                        
                    </div>
                </div>
                  <div class="col-6 col-md-3">
                    <div class="form-group">
                    <label for="avatar">Logo <span style="color:red; font-weight:bold">*</span></label>
                    <input  type="file" class="form-control" id="avatar" name="avatar"  @change="OnchangeFichier" 
                    accept="image/png, image/jpeg, image/jpg">
                </div>
                </div>
            </div> <br> 

            <button :disabled="gettersconfigEntete.length !=0"   @click.prevent="AjouterFonctionLocal" type="submit" class="btn btn-primary ml-5">Enrégistrer</button>
                &nbsp;
                <button @click.prevent="annuler" type="submit" class="btn btn-warning">Annuler</button>
                &nbsp;&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                &nbsp;&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                &nbsp;&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                &nbsp;&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                &nbsp;&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
              
                <span v-for="item in gettersconfigEntete" :key="item.id">

                <button @click.prevent="FonctionModifier(item.id)" class="btn btn-success">Modifier</button>
                &nbsp;
                <button @click.prevent="SupprimerconfigEntete(item.id)" class="btn btn-danger">Supprimer</button>
                </span>
        </form>
    </div>
             <p class=" ml-5 text-gray-800 font-weight-bold" style="color:red"> 
                 Cette configuration se fait une seule fois. Mais elle peut être modifier ou supprimer et être enrégistrer de nouveau
             </p>
    <table class="table">
        
              <tr >
            <td v-for="item in gettersconfigEntete" :key="item.id">
            <div class="row ml-3">    
                <div class="col-md-4">
                    <img :src="item.photo" alt="" width="300px;"  height="220px;">
                </div> 
                <div class="col-md-4">
                        <h3> {{item.nom}} </h3>
                    <span> <span style="color:#000;font-weight:600; font-size:15px;"> {{item.slogan}}</span>  </span> <br>
                    <span> <span style="color:#000;font-weight:600; font-size:15px;"> Adresse: </span>{{item.adresse}}</span> <br> 
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
   

    </table>
    <notifications/>
  </div>
</template>

<script>
import {required} from "vuelidate/lib/validators";
import {mapGetters, mapActions} from "vuex";
export default {

data(){
    return {
        formData:{
            photo:"",
            nom:"",
            slogan:"",
            email:"",
            adresse:"",
            site:"",
            contact:"",
        },
        selectedFile:""
    }
},
created(){
    this.getconfigEntete()
},
  validations:{
        formData:{
            
            nom:{required},
            slogan:{required},
            adresse:{required},
            contact:{required},
            email:{required},
        }
    },
    computed:{

          ...mapGetters("parametres",["gettersNiveau", "gettersClasse", "gettersMatiere","gettersTrimestre", "gettersAnne",
        "gettersTransport","gettersconfigEntete" ]),
        ...mapGetters("student",["GetterStudent", "GetterCantine", "GetterScolarite", "GetterAbsence"]),
   

    },

    methods:{
        ...mapActions("parametres",["getNiveau","AjouterNiveau", "ModifierNiveau","SupprimerNiveau","getClasse", 
        "AjouterconfigEntete", "getconfigEntete", "SupprimerconfigEntete"]),
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
       const formData = new FormData();
        formData.append("file", this.selectedFile, this.selectedFile.name);
        formData.append("nom", this.formData.nom);
        formData.append("contact", this.formData.contact);
        formData.append("email", this.formData.email);
        formData.append("adresse", this.formData.adresse);
        formData.append("slogan", this.formData.slogan);
        formData.append("site", this.formData.site);
        console.log(formData)
        this.AjouterconfigEntete(formData, config);
        },



           annuler(){
           this.$v.formData.$reset();
             this.formData.nom="",  
             this.formData.slogan="",  
             this.formData.email=""
             this.formData.contact=""
             this.formData.site=""
           
          },

          FonctionModifier(id){
              this.$router.push({
                  name:"EnteteConfigMod", params:{id: id}
              })
          }
    }
}
</script>

<style scoped>

    .flashit{
    background-color:rgb(245, 77, 11);
	-webkit-animation: flash linear 1s infinite;
	animation: flash linear 1s infinite;
}
</style>