<template>
  <div>
     <Loader :isVisible="loadingData"/>
       <div class="container-fluid" id="container-wrapper">
              <h3 class="ml-5 mb-3" style="text-align:center">Affectation des classes et matières à l'enseignant </h3>
   <button class=" btn btn-warning" style="margin-left:95%" @click.prevent="retourSurGestionUser" type="submit" >Retour</button>
              <h6 class="ml-5"> <span style="color:red;">Enseignant</span>: {{detail.name}} &nbsp; <span style="color:red;">Email</span>: {{detail.email}} </h6>
        <div class="d-sm-flex align-items-center justify-content-between mb-2 ml-5">
           
            <div class="row">         
                 <div class="col-6 col-md-3">
                   <div class="form-group">
                  <label for="code">Trimestre </label>   
                    <span style="color:red; font-style:italic;"
                            v-if="$v.formData.trimestre_id.$error && !$v.formData.trimestre_id.required"
                            role="alert"> 
                            <span style="color:red; font-weight:bold">*</span>
                            champs obligatoire!
                        </span> 
                    <select class="form-control" id="niveau" v-model="formData.trimestre_id"  @input="$v.formData.trimestre_id.$touch()">
                          <option value="" >Choisir le niveau</option>
                          <option v-for="item in gettersTrimestre" :key="item.id" :value="item.id"> {{item.libelle}} </option>
                                              
                      </select>
                    </div>
                </div>
              <div class="col-6 col-md-3">
                  <div class="form-group">
                      <label for="niveau">{{ $t("ul.niveau") }} </label>
                         <span style="color:red; font-style:italic;"
                            v-if="$v.formData.niveau_id.$error && !$v.formData.niveau_id.required"
                            role="alert"> 
                            <span style="color:red; font-weight:bold">*</span>
                            champs obligatoire!
                        </span> 
                        <select class="form-control" id="niveau"  v-model="formData.niveau_id" @input="$v.formData.niveau_id.$touch()">
                          <option value="" >Choisir le niveau</option>
                          <option v-for="item in gettersNiveau" :key="item.id" :value="item.id"> {{item.libelle}} </option>
                                              
                      </select>
                  </div>
                </div>
              <div class="col-6 col-md-3">
                  <div class="form-group">
                      <label for="niveau">{{ $t("ul.classe") }} </label>
                         <span style="color:red; font-style:italic;"
                            v-if="$v.formData.classe_id.$error && !$v.formData.classe_id.required"
                            role="alert"> 
                            <span style="color:red; font-weight:bold">*</span>
                            champs obligatoire!
                        </span> 
                        <select class="form-control" id="classe"  v-model="formData.classe_id" @input="$v.formData.classe_id.$touch()">
                          <option value="">Choisir la classe</option>
                          <option v-for="item in AfficherClasse" :key="item.id" :value="item.id"> {{item.libelle}} </option>
                                              
                      </select>
                  </div>
                </div>
              <div class="col-6 col-md-3">
                  <div class="form-group">
                      <label for="exampleFormControlSelect2">Liste des matière</label>
                       <span style="color:red; font-style:italic;"
                            v-if="$v.formData.matiere_id.$error && !$v.formData.matiere_id.required"
                            role="alert"> 
                            <span style="color:red; font-weight:bold">*</span>
                            champs obligatoire!
                        </span> 
                      <select multiple class="form-control" id="exampleFormControlSelect2" 
                      @input="$v.formData.matiere_id.$touch()" v-model="formData.matiere_id">
                       <option v-for="item in AfficherMatiere" :key="item.id" :value="item.id"> {{LibelleMatiere(item.nouvelle_matiere_id)}} </option>
                      
                      </select>
                    </div>
                </div>
              
                
  
              
            </div>
              <button  @click.prevent="AjouterFonctionLocals" type="submit" class="btn btn-success ml-5">Valider</button>
                        &nbsp;
                
             <button @click.prevent="annuler" type="submit" class="btn btn-danger">Annuler</button>
                    
                      
          </div>

              <div class="row p-5">
              <div class="card">
                <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                 <h6 class="ml-2"> 
                     <span style="color:red;">Enseignant</span>: {{detail.name}} &nbsp; 
                     <span style="color:red;">Email</span>: {{detail.email}} &nbsp; 
                     <span style="color:red;">Contact</span>: {{detail.phone}} 
                     </h6>
                </div>
                <div class="table-responsive">
                  <table class="table align-items-center table-flush" v-if="ListeAffectation.length !=0">
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
                      <tr v-for="(item, index) in ListeAffectation" :key="item.id" :value="item.id">
                          <td>{{index+1}}</td>
                          <td>{{LibelleTrimestre(item.trimestre_id)}}</td>
                          <td>{{classe(item.classe_id)}}</td>
                          <td>{{LibelleMatiere(MatiereId(item.matiere_id))}}</td>                        
                         <td >                   
                         <a title="Modifier"  @click.prevent="ModificationModal(item.id)">
                            <i style="color:green;" class="fas fa-edit"> </i>                      
                        </a>
                            &nbsp;
                        <a title="Supprimer"  @click.prevent="SupprimerAffectation(item.id)">
                         <i style="color:red;" class="fas fa-trash"></i>
                        </a>      
                        </td>
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
                          
                       <h6 style="color:red">Aucune affectation pour cet enseignant</h6>
                        </td>
                                                                          
                    </tbody>
                  </table>
                </div>
              
              </div>
           
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
            formData:{
                niveau_id:"",
                trimestre_id:"",
                classe_id:"",
                matiere_id:[],
            }
        }
    },
    created(){
         console.log(this.$route.params.id);
      this.getNiveau();
      this.getClasse();
    //   this.get_note();
        this.getTrimestre();
      this.getMatiere();
      this.get_all_student();
      this.getRole();
       this.getNouvelleMatiere();
     this.getUtilisateur();
     this.getAffectation();

      this.detail = this.gettersUtilisateur.find(tem =>tem.id == this.$route.params.id)

    },
     validations:{
        formData:{
             niveau_id:{required},
             matiere_id:{required},
             trimestre_id:{required},
             classe_id:{required},
               
               
        },
     
},
    computed:{
     ...mapGetters("parametres",["gettersNiveau", "gettersClasse", "gettersMatiere","gettersTrimestre", "gettersAnne",
     "gettersTransport","gettersNouvelleMatiere"]),
     ...mapGetters("student",["GetterStudent", "GetterCantine", "GetterScolarite", "GetterAbsence"]),
     ...mapGetters("personnel",["gettersUtilisateur", "gettersAffectation","gettersloadingAffectation","gettersRole"]),

   loadingData(){
    return this.gettersloadingAffectation
       
    },
     LibelleMatiere(){
       return (id)=>{
         if(id != ""){
           let obj = this.gettersNouvelleMatiere.find(tem=>tem.id == id)
           if(obj){
             return obj.libelle;
           }
         }
       }
     },
     MatiereId(){
       return (id)=>{
         if(id != ""){
           let obj = this.gettersMatiere.find(tem=>tem.id == id)
           if(obj){
             return obj.nouvelle_matiere_id;
           }
         }
       }
     },
      ListeAffectation(){
        return this.gettersAffectation.filter(tem=>tem.teacher_id == this.$route.params.id)
      },
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
        return this.gettersClasse.filter(tem =>tem.niveau_id == this.formData.niveau_id)
     },
      AfficherMatiere(){
        return this.gettersMatiere.filter(tem =>tem.classe_id == this.formData.classe_id)
     },
 },
   methods:{

         ...mapActions("parametres",["getTrimestre","getNiveau","AjouterNiveau", "ModifierNiveau","SupprimerNiveau",
         "getClasse", "getMatiere", "getAnnee", "AjouterMessageEmail", "AjouterMessageSms", "AjouterTransport",
         "getTransport","getNouvelleMatiere"]),
         ...mapActions("student",["get_all_student","AjouterEleve", "ModifierEleve","SupprimerEleve","get_Liste_Cantine",
         "SupprimerCantine", "getAbsence", "AjouterAbsence", "AjouterCantine", "getScolarite", "AjouterScolarite"]),
        
         ...mapActions("personnel",["getUtilisateur","AjouterUtilisateur","ModifierUtilisateur","SupprimerUtilisateur",
         "AjouterAffectation","getAffectation","SupprimerAffectation", "getRole"]),
        
         toggleModale(){
      this.showModal = !this.showModal
    },
    retourSurGestionUser(){
        return this.$router.go(-1)
    },
    ModificationModal(index){
        return this.$router.push({
            name:'AffectationModification', params:{id: index}
        })
    },
     ModificationModals(id) {
        this.showIsModal = !this.showIsModal;
        this.editText = this.gettersUtilisateur.find(tem =>tem.id == id)

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
        annulerMod(){
            this.$v.editText.$reset();
             this.editText.name="",
             this.editText.email="",
             this.editText.phone="",
             this.editText.role_id="",
             this.editText.password="",
             this.editText.passwordconfirm=""
            this.showIsModal = !this.showIsModal;
            this.getUtilisateur()
        },
        annuler(){
            this.$v.formData.$reset();
             this.formData.niveau_id="",
             this.formData.trimestre_id="",
             this.formData.matiere_id="",
             this.formData.classe_id=""
           
        },
        AjouterFonctionLocals(){
        this.$v.formData.$touch();
            if(this.$v.formData.$error){
                return
            }
         let obj ={
           ...this.formData,
           annee_id: this.AnneEncours,
           teacher_id: this.detail.id
         
         }
          console.log(obj)
          this.AjouterAffectation(obj)
          this.$v.formData.$reset();
          this.formData.niveau_id="",
          this.formData.trimestre_id="",
          this.formData.matiere_id="",
          this.formData.classe_id=""
             
      },
        ModifierFonctionLocals(){
        this.$v.editText.$touch();
            if(this.$v.editText.$error){
                return
            }
         let obj ={
           ...this.editText,
         
         }
         this.ModifierUtilisateur(obj)
          console.log(obj)
             
      },
   }
}
</script>

<style>

</style>