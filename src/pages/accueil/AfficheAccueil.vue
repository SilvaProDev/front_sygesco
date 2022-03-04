<template>
  <div>
       <div>
          <h1 class="ml-5">Configuration de l'accueil</h1> 
       </div> 
    <button @click.prevent="Ajouter" style="margin-left:90%"  type="submit" class="btn btn-success">Ajouter</button>
         <div class="col-lg-12">
              <div class="card mb-4">
               
                <div class="table-responsive p-3" >
                  
                  <table class="table align-items-center table-flush" id="dataTable">
                    <thead class="thead-light">
                      <tr>
                        <th>N°</th>
                        <th style="width:100px">Image</th>
                        <th style="width:250px" >Titre</th>
                        <th>Description</th>
                      
                        <th colspan="2">Action</th>
                      

                      </tr>
                    </thead>
                   
                    <tbody>

                    <tr v-for="(item, index) in gettersAccueil" :key="item.id" :value="item.id">
                        <td>{{index +1}}</td>
                        <td>
                          <img class="rounded" :src="item.photo" alt="" height="80px;" width="90px;">
                        </td>
                        <td>{{item.titre}}</td>
                        <td>{{item.texte.substring(0,150)+" ..."}}</td>
                       
                          <td>
                              <a title="Modifier" href="" @click.prevent="ModifierAccueil(item.id)">                         
                          <i style="color:green;" class="fas fa-edit"> </i>
                          </a>
                          &nbsp;
                              <a title="Supprimer" href="" @click.prevent="SupprimerAccueil(item.id)">
                            <i style="color:red;" class="fas fa-trash"> </i></a>
                          </td>
                        
                    </tr>                                                 
                    </tbody>
                  </table>
                </div>
              </div>

              
            </div>

         

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
    this.getAccueil()
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
        "gettersTransport","gettersconfigEntete","gettersAccueil"]),
        ...mapGetters("student",["GetterStudent", "GetterCantine", "GetterScolarite", "GetterAbsence"]),
   

    },

    methods:{
        ...mapActions("parametres",["getNiveau","AjouterNiveau", "ModifierNiveau","SupprimerNiveau","getClasse", 
        "AjouterconfigEntete", "getconfigEntete","AjouterAccueil","getAccueil","SupprimerAccueil"]),
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
        },

        Desactiver(){
          
        },



           annuler(){
           this.$v.formData.$reset();
             this.formData.nom="",  
             this.formData.slogan="",  
             this.formData.email=""
             this.formData.contact=""
             this.formData.site=""
           
          },

          ModifierAccueil(id){
              this.$router.push({
                  name:"ModifierAccueil", params:{id: id}
              })
          },

          Ajouter(){
            return this.$router.push({
              name:"AjouterAccueil"
            })
          }
    }
}
</script>

<style scoped>

a{
  text-decoration:none;
}
</style>