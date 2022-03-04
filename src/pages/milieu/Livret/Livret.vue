<template>
  
  <div class="container">
      <Entete/>
         <div class="row m-3">         

              <div class="col-6 col-md-3">
                  <div class="form-group">
                      <label for="niveau">{{ $t("ul.niveau") }} </label>
                      
                        <select class="form-control" id="niveau" v-model="formData.niveau_id" >
                          <option value="" >Choisir le niveau</option>
                          <option v-for="item in gettersNiveau" :key="item.id" :value="item.id"> {{item.libelle}} </option>
                                              
                      </select>
                  </div>
                </div>
              <div class="col-6 col-md-3">
                  <div class="form-group">
                      <label for="niveau">{{ $t("ul.classe") }} </label>
                      
                        <select class="form-control" id="classe" v-model="formData.classe_id"  >
                          <option value="">Choisir la classe</option>
                          <option v-for="item in AfficherClasse" :key="item.id" :value="item.id"> {{item.libelle}} </option>
                                              
                      </select>
                  </div>
                </div>
              <div class="col-6 col-md-3">
                  <div class="form-group">
                      <label for="niveau">Eleve</label>
                      
                         <select class="form-control" id="classe" v-model="formData.eleve_id"  >
                          <option value="">Choisir la classe</option>
                          <option v-for="item in AfficherEleveParClasse" :key="item.id" :value="item.id"> 
                              {{LibEleve(item.id)}} </option>
                                              
                      </select>
                  </div>
                </div>
              <!-- <div class="col-6 col-md-3">
                  <div class="form-group">
                      <label for="niveau">Mois</label>
                      
                        <select class="form-control" id="classe" v-model="formData.mois"  >
                         <option value="" selected >Choisir le Mois</option>
                          <option value="01">Janvier</option>
                          <option value="02">Février</option>
                          <option value="03">Mars</option>
                          <option value="04">Avril</option>
                          <option value="05">Mai</option>
                          <option value="06">Juin</option>
                          <option value="07">Juillet</option>
                          <option value="08">Août</option>
                          <option value="09">Septembre</option>
                          <option value="10">Octobre</option>
                          <option value="11">Novembre</option>
                          <option value="12">Décembre</option>
                                          
                      </select>
                  </div>
                </div> -->
             
            </div>
              <!-- Row -->
          <div class="row m-3">
            <!-- Datatables -->
            <div class="col-lg-12" v-if="formData.niveau_id !='' && formData.classe_id !='' && formData.eleve_id !=''">
              <div class="card mb-5" >              
                <div class="table-responsive p-3">
                  
                  <table class="table align-items-center table-flush" id="dataTable" 
                  v-for="item in JeSuisBon" :key="item">
                    <tr style=" background-color:aqua;" >
                        <th colspan="1"  style="width:300px; background-color:aqua;">{{LibelleLivret(item)}}</th>
                        <td style="padding:5px; text-align:center;" >T/S(1)</td>
                        <td style="padding:5px; text-align:center;">T/S(2)</td>
                        <td style="padding:5px; text-align:center;">T/S(3)</td>
                        
                    </tr>
                    <tr v-for="item in courage(item)" :key="item">
                        <td colspan="" style="padding:0px">{{LibelleTexte(item)}}</td>
                        <td style="padding:0px; text-align:center;"> {{LibelleNote(item)}} </td>                
                        <td style="padding:0px; text-align:center;">0</td>   
                        <td style="padding:0px; text-align:center;"> 0 </td>                         
                    </tr>                               
                  </table>
                </div>
              </div>
            </div>
           <div class="col-lg-12" v-else>
              <div class="card ml-5 mb-5" >              
                <p class="ml-5" style="color:red;">Selectionnez la classe et l'elève pour voir son livret de compétence</p>
              </div>

           </div>
          </div>
          <!--Row-->
         
         
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
  components: {  Entete},
    data(){
        return{
          NoteGroupe:[],
          showIsModal: false,
          formData:{
            mois:"",
            testemoi:"",
            date:"",
            teste1:"",
            trimestre:"",
            libelle:"",
            matiere:"",
            eleve_id:"",
            livret_id:'',
            niveau_id:'',
            classe:""
            
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
      this.getAnnee();
      this.getCompentenceLivret();
       this.getConfigLivret();
      
    },

   validations:{
        formData:{
            
            date:{required},
            matiere:{required},
            libelle:{required},
        }
    },
     computed:{
     ...mapGetters("parametres",["gettersNiveau", "gettersClasse", "gettersTrimestre", "gettersMatiere",
     "gettersLivret","gettersCompetencelivret", "gettersConfiglivret"]),
     ...mapGetters("student",["GetterStudent"]),

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
    LibelleEleve(){
       if(this.formData.classe_id != ''){
           let test = this.GetterStudent.filter(tem=>tem.classe_id == this.formData.classe_id)
           if(test){
               return test.nom;
           }
       }
       return ""
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
           return obj.libelle
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
     LibelleLivret(){
       return (id)=>{
         if(id != "" && id != null){
           let text = this.gettersLivret.find(tem =>tem.id == id)
           if(text){
             return text.libelle;
           }
           return "";
         }
       }
     },
     LibelleMatiere(){
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
     LibelleConfigLivret(){
       return (id)=>{
         if(id != "" && id != null){
           let text = this.gettersConfiglivret.find(tem =>tem.id == id)
           if(text){
             return text.libelle;
           }
           return "";
         }
       }
     },
     LibelleNote(){
       return (id)=>{
         if(id != ''){
           let obj = this.gettersCompetencelivret.find(tem=>tem.libelle_id == id)
             if(obj){
               return obj.note
             }
           
         }
       }
     },
     LibelleTexte(){
       return (id)=>{
         if(id != ''){
           let obj = this.gettersConfiglivret.find(tem=>tem.id == id)
             if(obj){
               return obj.libelle
             }
           
         }
       }
     },
    BomBom(){
      if(this.formData.niveau_id !='' && this.formData.classe_id  !='' && this.formData.eleve_id  !=''){
      this.gettersConfiglivret.filter(tem=>{
        this.courage.foreach(element => {
          if(tem.id == element){
            return tem.libelle
          }
          return ""
        });
      })
      }
      return ""
    },
     courage(){
       return (id)=>{
         if(this.formData.niveau_id !='' && this.formData.classe_id  !='' && this.formData.eleve_id  !=''){
         let objet = this.gettersCompetencelivret.filter(tem=>tem.classe_id == this.formData.classe_id && 
         tem.eleve_id == this.formData.eleve_id && tem.livret_id ==id)
         let tableau =[]
       if(objet.length >0){
         objet.forEach(element => {
           tableau.push(element.libelle_id)
         });
         let unique = [...new Set(tableau)];
         console.log(unique)
         if(unique.length == 0){
           return []
         }
         return unique
       }}
       
       }
     },
     tester11(){
       if(this.formData.niveau_id !='' && this.formData.classe_id  !='' && this.formData.eleve_id  !=''){
         return this.gettersCompetencelivret.filter(tem=>tem.classe_id == this.formData.classe_id && 
         tem.eleve_id == this.formData.eleve_id)
       }
       return "55"
     },
     JeSuisExcellent(){
        if(this.formData.niveau_id !='' && this.formData.classe_id  !='' && this.formData.eleve_id  !=''){
         let objet = this.gettersCompetencelivret.filter(tem=>tem.classe_id == this.formData.classe_id && 
         tem.eleve_id == this.formData.eleve_id)
         let tableau =[]
       if(objet.length >0){
         objet.forEach(element => {
           tableau.push(element.libelle_id)
         });
         let unique = [...new Set(tableau)];
         console.log(unique)
         if(unique.length == 0){
           return []
         }
         return unique
       }
       }
       return []
     },
     JeSuisBon(){
        if(this.formData.niveau_id !='' && this.formData.classe_id  !='' && this.formData.eleve_id  !=''){
         let objet = this.gettersCompetencelivret.filter(tem=>tem.classe_id == this.formData.classe_id && 
         tem.eleve_id == this.formData.eleve_id)
         let tableau =[]
       if(objet.length >0){
         objet.forEach(element => {
           tableau.push(element.livret_id)
         });
         let unique = [...new Set(tableau)];
         console.log(unique)
         if(unique.length == 0){
           return []
         }
         return unique
       }
       }
       return []
     },
     tester(){
       let objet = this.gettersCompetencelivret.filter(tem=>tem.livret_id)
       let tableau =[]
       if(objet.length >0){
         objet.forEach(element => {
           tableau.push(element.livret_id)
         });
         let unique = [...new Set(tableau)];
         console.log(unique)
         if(unique.length == 0){
           return []
         }
         return unique
       }
       return []
     },
     //Récupère la liste des élèves selectionné
     reuissite1(){
       let collect =[]
       this.gettersConfiglivret.filter(item =>{
         this.gettersCompetencelivret.filter(element => {        
           if(item.id == element.libelle_id){
             collect.push(item.livret_id)
            //  [...new Set()]
             
           }
         })
       })
       return [...new Set(collect)] ;
     },
     reuissite2(){
       let collect =[]
       this.gettersConfiglivret.filter(item =>{
         this.gettersCompetencelivret.filter(element => {        
           if(item.id == element.libelle_id){
             collect.push(item.id)
            //  [...new Set()]
             
           }
         })
       })
       return [...new Set(collect)] ;
     },
     reuissite(){
       let collect =[]
       this.gettersConfiglivret.filter(item =>{
         this.gettersCompetencelivret.filter(element => {        
           if(item.id == element.libelle_id){
             collect.push(item)
            //  [...new Set()]
             
           }
         })
       })
       return collect;
     },
     daou(){
       return (id)=>{
         if(id != "" && id != null){
           let obj = this.reuissite.find(tem=>tem.livret_id == id)
           if(obj){
             return obj.libelle
           }
         }

       }
     },
     silva(){
       let collect =[]
      return (id)=>{
        if(id !=""){
       let test = this.gettersCompetencelivret.find(tem=>tem.livret_id == id)
       if(test.length>0){
         test.forEach(element => {
           collect.push(element.id)
         });
         let unique = [...new Set(collect)];
         if(unique.length == 0){
           return []
         }
         return unique
       }
     }
      }
    
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

    
  },

  methods:{
     ...mapActions("parametres",["getNiveau","AjouterNiveau", "ModifierNiveau","SupprimerNiveau","getClasse",
                   "getTrimestre","getMatiere","getLivret", "getAnnee", "getCompentenceLivret",
                   "getConfigLivret"]),
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
         this.formData = {
                date:"",              
                libelle:"",
                matiere:"",
            };
        },
  

        AjouterFonctionLocal(){
             this.$v.formData.$touch();
            if(this.$v.formData.$error) {
                return
            }
          let obj ={
            ...this.formData,
         
            trimestre_id: this.TrimestreEncours,
            annee_id: this.TrimestreEncours,

          }
          this.AjouterNote(obj)
          this.$v.formData.$reset();
             this.formData={
                date:"",
               
                libelle:"",
                matiere:"",
          }
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