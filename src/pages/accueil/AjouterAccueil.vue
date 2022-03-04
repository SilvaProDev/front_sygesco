<template>
  <div>
       <div>
          <h1 class="ml-5">Configuration de l'accueil</h1> 
       </div> 

          <div class="row">
           
            <div class="col-lg-10 offset-1">
              <!-- General Element -->
              <div class="card mb-4 m-3">
                <!-- <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                  <h6 class="m-0 font-weight-bold text-primary">Envoi de message aux parents d'élèves</h6>
                </div> -->
                <div class="card-body">
                  <form action="" method="post" enctype="multipart/form-data">
                    <div class="form-group">
                      <label for="titre">Titre</label>
                       <span style="color:red; font-style:italic;"
                          v-if="$v.formData.titre.$error && !$v.formData.titre.required"
                          role="alert"> 
                          <span style="color:red; font-weight:bold">*</span>
                          Ce champs est obligatoire!
                      </span> 
                    <input v-model="formData.titre" type="text" class="form-control" id="titre">
                    </div>
                   
                  
                       <div class="form-group">
                            <label for="avatar">Image </label>
                             <span style="color:red; font-style:italic;"
                                v-if="$v.formData.photo.$error && !$v.formData.photo.required"
                                role="alert"> 
                                <span style="color:red; font-weight:bold">*</span>
                                Ce champs est obligatoire!
                            </span> 
                            <input  type="file" class="form-control" id="avatar" name="avatar" @change="OnchangeFichier"
                            accept="image/png, image/jpeg, image/jpg">
                        </div>
               
                   
                  
                    <div class="form-group">
                      <label for="exampleFormControlTextarea1">Description</label>
                       <span style="color:red; font-style:italic;"
                          v-if="$v.formData.texte.$error && !$v.formData.texte.required"
                          role="alert"> 
                          <span style="color:red; font-weight:bold">*</span>
                          Ce champs est obligatoire!
                      </span>
                      <textarea v-model="formData.texte" class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                    </div>
              

                     <button   @click.prevent="AjouterFonctionLocal" type="submit" class="btn btn-primary ">Enrégistrer</button>
                    <!-- &nbsp;
                    <button @click.prevent="annuler" type="submit" class="btn btn-warning">Annuler</button>
                    &nbsp;
                    <button @click.prevent="fermer" class="btn btn-danger">Fermer</button> -->
                    <div class="mt-3">

                    </div>
                  </form>
                </div>
              </div>
              <!-- Input Group -->
            
          </div>
          </div>
          <!--Row-->

         

   <notifications  />
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
            titre:"",
            texte:"",
          
        },
        selectedFile:""
    }
},
created(){
    this.getconfigEntete()
},
  validations:{
        formData:{
            
            titre:{required},
            photo:{required},
            texte:{required},
          
        }
    },
    computed:{

          ...mapGetters("parametres",["gettersNiveau", "gettersClasse", "gettersMatiere","gettersTrimestre", "gettersAnne",
        "gettersTransport","gettersconfigEntete" ]),
        ...mapGetters("student",["GetterStudent", "GetterCantine", "GetterScolarite", "GetterAbsence"]),
   

    },

    methods:{
        ...mapActions("parametres",["getNiveau","AjouterNiveau", "ModifierNiveau","SupprimerNiveau","getClasse", 
        "AjouterconfigEntete", "getconfigEntete","AjouterAccueil","SupprimerAccueil"]),
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
        formData.append("titre", this.formData.titre);
        formData.append("texte", this.formData.texte);
       
        console.log(formData)
        this.AjouterAccueil(formData, config);
             this.$router.push({
                  name:"AfficheAccueil",
              })
        },



           annuler(){
           this.$v.formData.$reset();
             this.formData.titre="",  
             this.formData.texte="",  
             this.formData.photo=""    
          },

          FonctionModifier(id){
              this.$router.push({
                  name:"EnteteConfigMod", params:{id: id}
              })
          }
    }
}
</script>

<style>

</style>