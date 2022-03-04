<template>
  
  <div class="container">
     <Entete/>
           <h4 class="text-center" style="text-decoration: underline #000;text-transform: uppercase;">
             Enrégistrement du livret de compétence de l'élève
             </h4> <br> <br>
         <div class="row m-3">         
              <div class="col-6 col-md-3">
                  <div class="form-group">
                      <label for="niveau">{{ $t("ul.niveau") }} </label>
                       <span style="color:red; font-style:italic;"
                            v-if="$v.formData.niveau_id.$error && !$v.formData.niveau_id.required"
                            role="alert"> 
                            <span style="color:red; font-weight:bold">*</span>
                            Ce champs est obligatoire!
                        </span> 
                        <select class="form-control" id="niveau" v-model="formData.niveau_id" >
                          <option value="" >Selectionner le niveau</option>
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
                            Ce champs est obligatoire!
                        </span> 
                        <select class="form-control" id="classe" v-model="formData.classe_id"  >
                          <option value="">Selectionner la classe</option>
                          <option v-for="item in AfficherClasse" :key="item.id" :value="item.id"> {{item.libelle}} </option>
                                              
                      </select>
                  </div>
                </div>
              <div class="col-6 col-md-3">
                  <div class="form-group">
                      <label for="niveau">Eleve</label>
                       <span style="color:red; font-style:italic;"
                            v-if="$v.formData.eleve_id.$error && !$v.formData.eleve_id.required"
                            role="alert"> 
                            <span style="color:red; font-weight:bold">*</span>
                            Ce champs est obligatoire!
                        </span> 
                        <select class="form-control" id="classe" v-model="formData.eleve_id"  >
                          <option value="">Selectionner l' elève</option>
                          <option v-for="item in AfficherEleveParClasse" :key="item.id" :value="item.id"> 
                              {{LibEleve(item.id)}} </option>
                                              
                      </select>
                  </div>
                </div>
              <!-- <div class="col-6 col-md-3">
                  <div class="form-group">
                      <label for="niveau">{{ $t("ul.matiere") }} </label>
                          <span style="color:red; font-style:italic;"
                            v-if="$v.formData.matiere_id.$error && !$v.formData.matiere_id.required"
                            role="alert"> 
                            <span style="color:red; font-weight:bold">*</span>
                            Ce champs est obligatoire!
                        </span> 
                        <select class="form-control" id="classe" v-model="formData.matiere_id"  >
                          <option value="">Choisir la classe</option>
                          <option v-for="item in gettersMatiere" :key="item.id" :value="item.id"> {{item.libelle}} </option>
                                              
                      </select>
                  </div>
                </div> -->
                 <div class="col-6 col-md-3">
                  <div class="form-group">
                      <label for="niveau">Date d'enrégistrement </label>
                         <span style="color:red; font-style:italic;"
                            v-if="$v.formData.date.$error && !$v.formData.date.required"
                            role="alert"> 
                            <span style="color:red; font-weight:bold">*</span>
                            Ce champs est obligatoire!
                        </span>  
                        <input  @input="$v.formData.date.$touch()" v-model="formData.date" type="date" class="form-control">
                  </div>
                </div>
             
          </div>
         <div class="row m-3">         

              <div class="col-6 col-md-3">
                  <div class="form-group">
                      <label for="niveau">Choisir le titre </label>
                       <span style="color:red; font-style:italic;"
                            v-if="$v.formData.livret_id.$error && !$v.formData.livret_id.required"
                            role="alert"> 
                            <span style="color:red; font-weight:bold">*</span>
                            Ce champs est obligatoire!
                        </span> 
                       <select class="form-control" id="classe" v-model="formData.livret_id"  >
                          <option value="">Selectionner le titre</option>
                          <option v-for="item in gettersLivret" :key="item.id" :value="item.id"> 
                              {{item.libelle}} </option>
                                              
                      </select>
                  </div>
                </div>
              <div class="col-6 col-md-3">
                  <div class="form-group">
                      <label for="niveau">Selectionner le libelle </label>
                      <span style="color:red; font-style:italic;"
                            v-if="$v.formData.libelle_id.$error && !$v.formData.libelle_id.required"
                            role="alert"> 
                            <span style="color:red; font-weight:bold">*</span>
                            Ce champs est obligatoire!
                        </span> 
                       <select class="form-control" id="classe" v-model="formData.libelle_id"  >
                          <option value="">Selectionner le libelle</option>
                          <option v-for="item in LibelleLivret" :key="item.id" :value="item.id"> 
                              {{item.libelle}} </option>
                                              
                      </select>
                  </div>
                </div>
              <div class="col-6 col-md-3">
                   <div class="form-group">
                      <label for="niveau">Note</label>
                         <span style="color:red; font-style:italic;"
                            v-if="$v.formData.note.$error && !$v.formData.note.required"
                            role="alert"> 
                            <span style="color:red; font-weight:bold">*</span>
                            Ce champs est obligatoire!
                        </span>  
                        <input  @input="$v.formData.note.$touch()" v-model="formData.note" type="number" class="form-control">
                  </div>
                </div>
             
             
             
                 <div class="col-6 col-md-3">
                 <button    @click.prevent="AjouterFonctionLocal" type="submit" class="btn btn-primary ml-5">Valider</button>
              &nbsp;
              <button @click.prevent="annuler" type="submit" class="btn btn-warning">Annuler</button>
                </div>
                 <span v-if="verifcode">
                  <code style="color:#000; font-style:italic;">Cet elève a déjà une note en 
                    <span style="text-decoration: underline #000;text-transform: uppercase;color:red;">

                    {{LibelleTexte(formData.libelle_id)}} 
                    </span>
                    </code>
                  </span>
          </div>
              <!-- Row -->
          <!-- <div class="row m-3">
            <div class="col-lg-12">
              <div class="card mb-5">
               
                <div class="table-responsive p-3">
                  
                  <table class="table align-items-center table-flush" id="dataTable">
                   
                
                    
                
                    <tr style=" background-color:aqua;">
                        <th colspan="1"  style="width:300px; background-color:aqua;">Competence Transversale</th>
                        <td style="padding:5px; text-align:center;" >P1</td>
                        <td style="padding:5px; text-align:center;">P2</td>
                        <td style="padding:5px; text-align:center;">P3</td>
                        
                    </tr>
                    <tr>
                        <td style="padding:0px">Mathématiques</td>
                        <td style="padding:0px; text-align:center;">9</td>   
                        <td style="padding:0px; text-align:center;">1</td>   
                        <td style="padding:0px; text-align:center;">9</td>   
                       
                    </tr>
                    <tr>
                        <td style="padding:0px">Physique-Chimie</td>
                        <td style="padding:0px; text-align:center;">9</td>   
                        <td style="padding:0px; text-align:center;">1</td>   
                        <td style="padding:0px; text-align:center;">9</td>   
                       
                    </tr>
                    <tr>
                        <td style="padding:0px">Svt</td>
                        <td style="padding:0px; text-align:center;">9</td>   
                        <td style="padding:0px; text-align:center;">1</td>   
                        <td style="padding:0px; text-align:center;">9</td>   
                          
                    </tr>
                     <tr style=" background-color:aqua;">
                        <th colspan="1"  style="padding-left:5px;"> ECRITURES</th>
                        <td style="padding:5px; text-align:center;" >8.6</td>
                        <td style="padding:5px; text-align:center;">6</td>
                        <td style="padding:5px; text-align:center;">65</td>
                        
                    </tr>
                     <tr>
                        <td style="padding:0px">EDHC</td>
                        <td style="padding:0px; text-align:center;">9</td>   
                        <td style="padding:0px; text-align:center;">1</td>   
                        <td style="padding:0px; text-align:center;">9</td>   
                        
                    </tr>
                     <tr>
                        <td style="padding:0px">EPS</td>
                        <td style="padding:0px; text-align:center;">9</td>   
                        <td style="padding:0px; text-align:center;">1</td>   
                        <td style="padding:0px; text-align:center;">9</td>   
                       
                    </tr>
                     <tr>
                        <td style="padding:0px">Arts Plqstiaues</td>
                        <td style="padding:0px; text-align:center;">9</td>   
                        <td style="padding:0px; text-align:center;">1</td>   
                        <td style="padding:0px; text-align:center;">9</td>   
                        
                    </tr>
                     <tr>
                        <td style="padding:0px">Musique</td>
                        <td style="padding:0px; text-align:center;">9</td>   
                        <td style="padding:0px; text-align:center;">1</td>   
                        <td style="padding:0px; text-align:center;">9</td>   
                       
                    </tr>
                     <tr>
                        <td style="padding:0px">Conduite</td>
                        <td style="padding:0px; text-align:center;">9</td>   
                        <td style="padding:0px; text-align:center;">1</td>   
                        <td style="padding:0px; text-align:center;">9</td>   
                       
                    </tr>
                     <tr>
                        <td style="padding:0px">Bonus T.M</td>
                        <td style="padding:0px; text-align:center;">9</td>   
                        <td style="padding:0px; text-align:center;">1</td>   
                        <td style="padding:0px; text-align:center;">0</td>   
                       
                    </tr>
                     <tr style=" background-color:aqua;">
                        <th colspan="2"  style="padding-left:5px;">LANGUAGE ORALE</th>
                       
                        <td style="padding:5px; text-align:center;">11</td>
                        <td style="padding:5px; text-align:center;">78.50</td>
                        
                    </tr>
                   <tr>
                        <td style="padding:0px">Bonus T.M</td>
                        <td style="padding:0px; text-align:center;">9</td>   
                        <td style="padding:0px; text-align:center;">1</td>   
                        <td style="padding:0px; text-align:center;">0</td>   
                       
                    </tr>
                    
                  </table>
                </div>
              </div>
            </div>
           
          </div> -->
          <!--Row-->
        <notifications  />
  </div>
</template>

<script>

// import moment from "moment"
import {mapGetters, mapActions} from "vuex";
import {required} from "vuelidate/lib/validators";
import moment from "moment"
import Entete from "../Entete.vue"

// const random = () => {
//   return parseInt(Date.now() + Math.random() * 10000).toString(20).slice(-6)
// }
export default {
  components: { Entete },
    data(){
        return{
          NoteGroupe:[],
          showIsModal: false,
          formData:{
            
            libelle_id:"",
            livret_id:"",
            note:"",
            matiere_id:"",
            date:"",
            niveau_id:"",
            classe_id:"",
            eleve_id:"",
            
          },
        
          // formData:{
          //   niveau_id:"",
          //   classe_id:"",
          // }
        }
    },
     created(){
      // console.log(this.GetterStudent);
      this.getNiveau();
      this.getClasse();
      this.get_all_student();
       this.getTrimestre();
      this.getMatiere();
       this.getLivret();
       this.getConfigLivret();
       this.getAnnee();
       this.getCompentenceLivret();
      
    },

   validations:{
        formData:{
            libelle_id:{required},
            livret_id:{required},
            note:{required},
            // matiere_id:{required},
            date:{required},
            niveau_id:{required},
            classe_id:{required},
            eleve_id:{required},
            
        }
    },
     computed:{
     ...mapGetters("parametres",["gettersNiveau", "gettersClasse", "gettersTrimestre", "gettersMatiere",
     "gettersLivret", "gettersConfiglivret","gettersAnne","gettersCompetencelivret"]),
     ...mapGetters("student",["GetterStudent"]),

 verifcode() {
      if (this.formData.niveau_id == "" && this.formData.classe_id == "" && this.formData.eleve_id == "" &&
      this.formData.livret_id == "" && this.formData.libelle_id == "") {
        return false;
      } else {
        let Objet = this.gettersCompetencelivret.filter(
          (element) => element.niveau_id == this.formData.niveau_id && element.eleve_id == this.formData.eleve_id && 
          element.livret_id == this.formData.livret_id &&  element.libelle_id == this.formData.libelle_id);
        if (Objet.length != 0 && Objet != undefined) {
          return Objet.length;
        } else {
          return false;
        }
      }
    },

LibelleTexte(){
    return (id)=>{
        if(id != ''){
            let test = this.LibelleLivret.find(tem=>tem.id == id)
            if(test){
                return test.libelle
            }
        }
    }
},
LibEleve(){
    return (id)=>{
        if(id != ''){
            let test = this.GetterStudent.find(tem=>tem.id == id)
            if(test){
                return test.nom+" "+test.prenom
            }
        }
    }
},

    LibelleLivret(){
      return this.gettersConfiglivret.filter(tem =>tem.livret_id == this.formData.livret_id)
    },
        AfficherEleveParClasse(){
        return this.GetterStudent.filter(tem =>tem.classe_id == this.formData.classe_id)
     },
        AfficherClasse(){
        return this.gettersClasse.filter(tem =>tem.niveau_id == this.formData.niveau_id)
     },
     TrimestreEncours(){
       let obj = this.gettersTrimestre.find(tem =>tem.encours == 1)
         if(obj){
           return obj.id
         }
         return ""
      
     },
     LibClasse(){
       return (id)=>{
         if(id != "" && id != null){
           let text = this.gettersClasse.find(tem =>tem.id == id)
           if(text){
             return text.libelle;
           }
           return "";
         }
       }
     },
     //Récupère la liste des élèves selectionné
     reuissite(){
       let collect =[]
       this.ListeEleveParClasse.filter(item =>{
         this.NoteGroupe.forEach(element => {        
           if(item.id == element){
             collect.push(item)
           }
         })
       })
       return collect;
     },
     ListeEleveParClasse(){
       
       if(this.formData.niveau_id != "" && this.formData.classe_id != ""){

        return this.GetterStudent.filter(tem =>tem.classe_id == this.formData.classe_id)
       }
       return "";
     },
       LibelleClasse(){
         return (id)=>{
             if(id != "" && id != null){
                let lib = this.gettersClasse.find(tem =>tem.id == id)
                    if(lib){
                        return lib.libelle
                    }
                    return "" 
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

    
  },

  methods:{
     ...mapActions("parametres",["getNiveau","AjouterNiveau", "ModifierNiveau","SupprimerNiveau","getClasse",
                   "getTrimestre","getMatiere","getConfigLivret", "getLivret", "AjouterCompentenceLivret",
                   "getAnnee", "getCompentenceLivret"]),
     ...mapActions("student",["get_all_student","AjouterEleve", "ModifierEleve","SupprimerEleve","AjouterNote", "ModifierNote"]),

     ModificationEleve(id){
        this.$router.push({ name:"editStudent", params:{id:id}})
     },
     DetailEleves(id){
        this.$router.push({ name:"DetailEleve", params:{id:id}})
     },

      Modification(id){
        this.showIsModal = true,
        this.editText = this.GetterStudent.find(tem =>tem.id == id)
      },
       fermer(){
        this.$v.formData.$reset();
         this.formData = {
                date:"",              
                libelle:"",
                matiere:"",
            };
            this.showIsModal = false
        },
         annuler(){
        this.$v.formData.$reset();
          this.formData.niveau_id="",           
          this.formData.classe_id="",           
          this.formData.eleve_id="",           
          this.formData.matiere_id="",           
          this.formData.livret_id="",           
          this.formData.libelle_id="",           
          this.formData.date="",           
         this.formData.note=""      
        },
  

        AjouterFonctionLocal(){
             this.$v.formData.$touch();
            if(this.$v.formData.$error) {
                return
            }
          let obj ={
            ...this.formData,
             trimestre_id: this.TrimestreEncours,
            annee_id: this.AnneEncours,

          }
          this.AjouterCompentenceLivret(obj)
          this.$v.formData.$reset();
             this.formData.niveau_id="",           
            this.formData.classe_id="",           
            this.formData.eleve_id="",           
            this.formData.matiere_id="",           
            this.formData.livret_id="",           
            this.formData.libelle_id="",           
            this.formData.date="",           
          this.formData.note=""  
        },
           formaterDate(date) {
      return moment(date, "YYYY-MM-DD").format("DD-MM-YYYY");
    },

  },

}
</script>

<style scoped>
table{
  border-collapse: collapse;
}

th, td{
  border: 1px solid black;
  padding: 10px;
  border-width: none;
}
.bars{
    width: 170px;
    height: 2px;
    margin-left: 30px;
     border: 1px solid #000;
    
}
</style>