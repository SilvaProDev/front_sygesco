<template>
  <div>
       <div class="container-fluid" id="container-wrapper">
              <h3 class="ml-5 mb-5">Modification de l' attribution de classes et matières à l'enseignant </h3>
   <!-- <button class=" btn btn-warning" style="margin-left:95%" @click.prevent="retourSurGestionUser" type="submit" >Retour</button> -->
       <h6 class="ml-5 mt-3 mb-3"> <span style="color:red;">Enseignant</span>: {{ProfName(editText.teacher_id)}} &nbsp;
               <span style="color:red;">Email</span>: {{ProfEmail(editText.teacher_id)}} </h6> 
        <div class="d-sm-flex align-items-center justify-content-between mb-2 ml-5"> 
           
            <div class="row">         
                 <div class="col-6 col-md-3">
                   <div class="form-group">
                  <label for="code">Trimestre </label>   
                    <span style="color:red; font-style:italic;"
                            v-if="$v.editText.trimestre_id.$error && !$v.editText.trimestre_id.required"
                            role="alert"> 
                            <span style="color:red; font-weight:bold">*</span>
                            champs obligatoire!
                        </span> 
                    <select class="form-control" id="niveau" v-model="editText.trimestre_id"  @input="$v.editText.trimestre_id.$touch()">
                          <option value="" >Choisir le niveau</option>
                          <option v-for="item in gettersTrimestre" :key="item.id" :value="item.id"> {{item.libelle}} </option>
                                              
                      </select>
                    </div>
                </div>
              <div class="col-6 col-md-3">
                  <div class="form-group">
                      <label for="niveau">{{ $t("ul.niveau") }} </label>
                         <span style="color:red; font-style:italic;"
                            v-if="$v.editText.niveau_id.$error && !$v.editText.niveau_id.required"
                            role="alert"> 
                            <span style="color:red; font-weight:bold">*</span>
                            champs obligatoire!
                        </span> 
                        <select class="form-control" id="niveau"  v-model="editText.niveau_id" @input="$v.editText.niveau_id.$touch()">
                          <option value="" >Choisir le niveau</option>
                          <option v-for="item in gettersNiveau" :key="item.id" :value="item.id"> {{item.libelle}} </option>
                                              
                      </select>
                  </div>
                </div>
              <div class="col-6 col-md-3">
                  <div class="form-group">
                      <label for="niveau">{{ $t("ul.classe") }} </label>
                         <span style="color:red; font-style:italic;"
                            v-if="$v.editText.classe_id.$error && !$v.editText.classe_id.required"
                            role="alert"> 
                            <span style="color:red; font-weight:bold">*</span>
                            champs obligatoire!
                        </span> 
                        <select class="form-control" id="classe"  v-model="editText.classe_id" @input="$v.editText.classe_id.$touch()">
                          <option value="">Choisir la classe</option>
                          <option v-for="item in AfficherClasse" :key="item.id" :value="item.id"> {{item.libelle}} </option>
                                              
                      </select>
                  </div>
                </div>
              <div class="col-6 col-md-3">
                  <div class="form-group">
                      <label for="exampleFormControlSelect2">Liste des matière</label>
                       <span style="color:red; font-style:italic;"
                            v-if="$v.editText.matiere_id.$error && !$v.editText.matiere_id.required"
                            role="alert"> 
                            <span style="color:red; font-weight:bold">*</span>
                            champs obligatoire!
                        </span> 
                      <select multiple class="form-control" id="exampleFormControlSelect2" 
                      @input="$v.editText.matiere_id.$touch()" v-model="editText.matiere_id">
                       <option v-for="item in AfficherMatiere" :key="item.id" :value="item.id"> {{item.libelle}} </option>
                      
                      </select>
                    </div>
                </div>
              
                
  
              
            </div>
              <button  @click.prevent="ModifierFonctionLocals(editText)" type="submit" class="btn btn-success ml-5">Valider</button>
                        &nbsp;
                
             <button @click.prevent="annuler" type="submit" class="btn btn-danger">Annuler</button>
                    
                      
          </div>


       </div>

       <notifications />
  </div>
</template>

<script>
import {mapGetters, mapActions} from "vuex";
import {required} from "vuelidate/lib/validators";
export default {

    data(){
        return {
            editText:{
                niveau_id:"",
                trimestre_id:"",
                classe_id:"",
                matiere_id:[],
            }
        }
    },
    created(){
         // console.log(this.GetterStudent);
      this.getNiveau();
      this.getClasse();
    //   this.get_note();
        this.getTrimestre();
      this.getMatiere();
      this.get_all_student();
      this.getRole();
     this.getUtilisateur();
     this.getAffectation();

      this.detail = this.gettersUtilisateur.find(tem =>tem.id == this.$route.params.id)
      this.editText = this.gettersAffectation.find(tem =>tem.id == this.$route.params.id)

    },
     validations:{
        editText:{
             niveau_id:{required},
             matiere_id:{required},
             trimestre_id:{required},
             classe_id:{required},
               
               
        },
     
},
    computed:{
     ...mapGetters("parametres",["gettersNiveau", "gettersClasse", "gettersMatiere","gettersTrimestre", "gettersAnne",
     "gettersTransport"]),
     ...mapGetters("student",["GetterStudent", "GetterCantine", "GetterScolarite", "GetterAbsence"]),
     ...mapGetters("personnel",["gettersUtilisateur", "gettersAffectation","gettersRole"]),

     LibelleRole(){
         return (id)=>{
             if(id != ""){
                 let obj = this.gettersRole.find(tem=>tem.id == id)
                    if(obj){
                        return obj.libelle;
                    }
                 
             }
         }
     },
     ProfName(){
         return (id)=>{
             if(id != ""){
                 let obj = this.gettersUtilisateur.find(tem=>tem.id == id)
                 if(obj){
                     return obj.name;
                 }
             }
         }
     },
     ProfEmail(){
         return (id)=>{
             if(id != ""){
                 let obj = this.gettersUtilisateur.find(tem=>tem.id == id)
                 if(obj){
                     return obj.email;
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
      AnneEncours(){
       let obj = this.gettersAnne.find(tem=>tem.encours == 1)
       if(obj){
         return obj.id;
       }
       return ""
     },
        TrimestreEncours(){
       let obj = this.gettersTrimestre.find(tem =>tem.encours == 1)
         if(obj){
           return obj.libelle
         }
         return ""
      
     },
      AfficherClasse(){
        return this.gettersClasse.filter(tem =>tem.niveau_id == this.editText.niveau_id)
     },
      AfficherMatiere(){
        return this.gettersMatiere.filter(tem =>tem.classe_id == this.editText.classe_id)
     },
 },
   methods:{

         ...mapActions("parametres",["getTrimestre","getNiveau","AjouterNiveau", "ModifierNiveau","SupprimerNiveau",
         "getClasse", "getMatiere", "getAnnee", "AjouterMessageEmail", "AjouterMessageSms", "AjouterTransport",
         "getTransport"]),
         ...mapActions("student",["get_all_student","AjouterEleve", "ModifierEleve","SupprimerEleve","get_Liste_Cantine",
         "SupprimerCantine", "getAbsence", "AjouterAbsence", "AjouterCantine", "getScolarite", "AjouterScolarite"]),
        
         ...mapActions("personnel",["getUtilisateur","AjouterUtilisateur","ModifierUtilisateur","SupprimerUtilisateur",
         "AjouterAffectation","getAffectation","SupprimerAffectation", "ModifierAffectation", "getRole"]),
        
         toggleModale(){
      this.showModal = !this.showModal
    },
    retourSurGestionUser(){
        return this.$router.go(-1)
    },
     ModificationModal(id) {
        this.showIsModal = !this.showIsModal;
        this.editText = this.gettersUtilisateur.find(tem =>tem.id == id)

      },
        toggleShowPassword(){
            var show = document.getElementById('password')
            if(this.editText.showPassword == false){
                this.editText.showPassword = true,
                show.type = "text"
            } else{
                this.editText.showPassword = false
                show.type = 'password'
            }
        },
      
        annuler(){
            this.$v.editText.$reset();
             this.editText.niveau_id="",
             this.editText.trimestre_id="",
             this.editText.matiere_id="",
             this.editText.classe_id=""
           
        },
        AjouterFonctionLocals(){
        this.$v.editText.$touch();
            if(this.$v.editText.$error){
                return
            }
         let obj ={
           ...this.editText,
           annee_id: this.AnneEncours,
           teacher_id: this.detail.id
         
         }
          console.log(obj)
          this.AjouterAffectation(obj)
          this.$v.editText.$reset();
          this.editText.niveau_id="",
          this.editText.trimestre_id="",
          this.editText.matiere_id="",
          this.editText.classe_id=""
             
      },
        ModifierFonctionLocals(){
        this.$v.editText.$touch();
            if(this.$v.editText.$error){
                return
            }
         let obj ={
           ...this.editText,
           id:this.editText.id,
            annee_id: this.AnneEncours,
           teacher_id: this.editText.teacher_id
         
         }
          const formData = new FormData();
          formData.append("annee_id", this.AnneEncours);
          formData.append("teacher_id", this.editText.teacher_id);
          formData.append("matiere_id", [this.editText.matiere_id]);
          formData.append("trimestre_id", this.editText.trimestre_id);
          formData.append("classe_id", this.editText.classe_id);
          formData.append("niveau_id", this.editText.niveau_id);
          formData.append('id', this.editText.id);

         this.ModifierAffectation(obj)
          console.log(obj)
          this.$router.go(-1)
             
      },
   }
}
</script>

<style>

</style>