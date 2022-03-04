<template>
  <div>
       <div class="container-fluid" id="container-wrapper">
              <h3 class="text-center mb-3">Détail des notes de {{NomEleve}} </h3>
          <div class="d-sm-flex align-items-center justify-content-between mb-2 ml-5">
            <div class="row">         
            
              <div class="col-6 col-md-3">
                   <div class="form-group">
                  <label for="code">Trimestre </label>   
                   
                  <input :value="TrimestreEncours"  disabled  type="text"  class="form-control" id="code" aria-describedby="emailHelp"
                        placeholder="Entrer le code">
                    </div>
                </div>
              <div class="col-6 col-md-3" v-if="formData.date_debut =='' && formData.date_fin ==''">
                  <div class="form-group">
                      <label for="niveau">Matière </label>
                      
                        <select class="form-control" id="classe" v-model="formData.matiere"  >
                          <option value="">Choisir la matière</option>
                          <option v-for="item in AfficherMatiere" :key="item.id" :value="item.id"> {{item.libelle}} </option>
                                              
                      </select>
                  </div>
                </div>
              
            </div>
            
          </div>
          <div class="d-sm-flex align-items-center justify-content-between mb-2 ml-5" v-if="formData.matiere ==''">
            <div class="row">         
                 <p class=" ml-5 text-gray-800 font-weight-bold">  Veillez selectionner la
           <span style="background-color:aqua;">date de début</span> et de la
            <span style="background-color:aqua;">date de fin</span> ou la
             <span style="background-color:aqua;">matière</span> pour vusualiser les notes
          </p>
            <div class="col-6 col-md-3">
                  <div class="form-group">
                      <label for="code">{{ $t("date_debut") }} <span style="color:red">*</span> </label>   
                      
                      <input type="date" v-model="formData.date_debut"  class="form-control" id="code" aria-describedby="emailHelp"
                      placeholder="Entrer le code">
                  </div>
              </div>
                <div class="col-6 col-md-3">
                  <div class="form-group">
                      <label for="code">{{ $t("date_fin") }} <span style="color:red">*</span> </label>   
                      
                      <input type="date" v-model="formData.date_fin"  class="form-control" id="code" aria-describedby="emailHelp"
                      placeholder="Entrer le code">
                  </div>
              </div>
              
            </div>
            
          </div>

          <!-- Row -->
          <div class="row" v-if="formData.matiere != '' || formData.date_debut != '' && formData.date_fin !=''">
            <!-- Datatables -->
            <div style="margin-left:80%">
                     <button type="button" class="btn btn-warning" @click.prevent="CallBack()">Retour</button> &nbsp;
                     <button type="button" class="btn btn-info" @click.prevent="genererEnPdf()">Imprimer</button>
                </div>
            <div class="col-lg-12" id="printMe">
              <div class="card mb-4">
                <div class="card-header py-3  flex-row align-items-center justify-content-between">
                  <h5 class="m-0 font-weight-bold text-primary" v-if="formData.matiere != ''"> 
                     L<span  v-if="test.length <= 1">'</span><span  v-if="test.length > 1">es</span> intérogation<span v-if="test.length >1">s</span> effectuée<span v-if="test.length > 1">s</span> en 
                     <span style="color:red; font-weight:bold;">{{LibelleMatiere(formData.matiere)}}</span> &nbsp;
                     <span>Elève:</span> &nbsp; <span style="color:red;">{{NomEleve}}</span>   &nbsp;&nbsp;
                        <span>Matricule:</span> &nbsp; <span style="color:red;">{{MatricleEleve}}</span> 
                      </h5>
                     <h5 class="text-gray-800 font-weight-bold" v-if="formData.date_debut != '' && formData.date_fin !=''"> 
                       Les intérogations effectuées du 
                      <span style="background-color:aqua;">{{formData.date_debut}}</span> au
                        <span style="background-color:aqua;">{{formData.date_fin}}</span>  &nbsp;&nbsp;
                        <span>Elève:</span> &nbsp; <span style="color:red;">{{NomEleve}}</span>   &nbsp;&nbsp;
                        <span>Matricule:</span> &nbsp; <span style="color:red;">{{MatricleEleve}}</span> 
                      </h5>
                </div>
                <div class="table-responsive ">
                  
                  <table class="table align-items-center table-flush" id="dataTable">
                    <thead class="thead-light">
                      <tr>
                        <th>N°</th>
                        <th>Matières</th>
                        <th>Notes</th>
                        <th>Date</th>
                        <!-- <th>Total</th> -->
                        
                        
                      </tr>
                      
                    </thead>
                   
                    <tbody v-if="test.length != 0" >

                         <tr v-for="(tem, index) in test" :key="tem.id">
                             <td>{{index+1}}</td>
                             <td>{{LibelleMatiere(tem.matiere_id)}}</td>
                             <td>{{tem.note}}</td>                           
                             <td>{{formaterDate(tem.date)}}</td>
                            
                            
                        </tr>
                        <!-- <tr>
                            <th colspan="4"></th>
                            <td style="background-color:aqua;">{{somm}}</td>
                        </tr>                                                        -->
                                                                             
                    </tbody>
                    <tbody v-else >

                         <tr>
                             <td>Pas de note dans cette matière</td>
                             
                        </tr>                                                       
                    </tbody>
                  </table>
                </div>
              </div>

            
            </div>
           
          </div>
          <!--Row-->
      
        </div>
        <notifications  />
  </div>
</template>

<script>

 import moment from "moment"
import {mapGetters, mapActions} from "vuex";

// const random = () => {
//   return parseInt(Date.now() + Math.random() * 10000).toString(20).slice(-6)
// }
export default {
  components: {  },
    data(){
        return{
        
          formData:{  
             date_debut:"",
            date_fin:"",  
            matiere:"",
            niveau_id:"",
            classe_id:"",
           
          },
     detailNote:"",
        }
    },
     created(){
      // console.log(this.GetterStudent);
      this.getNiveau();
      this.getClasse();
      this.get_note();
        this.getTrimestre();
      this.getMatiere();
      this.get_all_student();
      this.nota = this.GetterNote.find(tem =>tem.student_id == this.$route.params.id)
     
        this.detailNote = this.GetterNote.filter(tem =>tem.student_id == this.$route.params.id)
       
    },

     computed:{
     ...mapGetters("parametres",["gettersNiveau", "gettersClasse", "gettersMatiere", "gettersTrimestre"]),
     ...mapGetters("student",["GetterStudent", "GetterNote"]),

        AfficherMatiere(){
        return this.gettersMatiere.filter(tem =>tem.classe_id == this.MatiereId)
     },
     MatiereId(){
       let objet = this.GetterStudent.find(tem=>tem.id == this.$route.params.id)
       if(objet){
         return objet.classe_id
       }
       return ""
     },
        LibelleMatiere(){
          return (id)=>{
            if(id != ''){
              let obj = this.gettersMatiere.find(tem =>tem.id == id)
              if(obj){
                return obj.libelle
              }
            }
          }
       
     },
        taille(){
            return this.test.length+1
        },
     MatricleEleve(){
         let obj = this.GetterStudent.find(tem =>tem.id == this.$route.params.id)
         if(obj){
            return obj.matricule;
         }
         return ""
     },
     NomEleve(){
         let obj = this.GetterStudent.find(tem =>tem.id == this.$route.params.id)
         if(obj){
            return obj.nom+" "+obj.prenom;
         }
         return ""
     },
     test(){
         if(this.formData.matiere != "" && this.formData.matiere !=null){
             return this.GetterNote.filter(
               tem =>tem.student_id == this.$route.params.id && tem.matiere_id == this.formData.matiere && 
               tem.trimestre_id == this.TrimestreEncoursId)
         } else if(this.formData.date_debut != "" && this.formData.date_fin !=""){
            return this.GetterNote.filter(
               tem =>tem.student_id == this.$route.params.id && tem.date >= this.formData.date_debut  && 
               tem.date <= this.formData.date_fin && tem.trimestre_id == this.TrimestreEncoursId)
         }
         return ""
     },

     //convertir le tableau string en int
     conv(){
         return this.test1.map((i) => Number(i))
     },

     //calculer la somme des notes
    somm(){
        return this.conv.reduce(function(a, b){
        return a + b;
        }, 0);
    },

    //recupère les notes liés à un étudiant
     test1(){
         if(this.formData.matiere != "" && this.formData.matiere !=null){
        let objet = this.GetterNote.filter(tem =>tem.student_id == this.$route.params.id && tem.matiere_id == this.formData.matiere);
        console.log(objet) 
        console.log("objet") 
        let array_exercie = [];
        if (objet.length > 0) {
          objet.forEach(function (val) {
            array_exercie.push(val.note);
          });
          let unique = array_exercie;
          console.log(unique);
         
          if (unique.length == 0) {
            return [];
          }
          return unique;
        }
        return [];
  
         }else if(this.formData.date_debut != "" && this.formData.date_fin !=""){
        let objet = this.GetterNote.filter(tem =>tem.student_id == this.$route.params.id && 
        tem.date >= this.formData.date_debut && tem.date <= this.formData.date_fin);
        console.log(objet) 
        console.log("objet") 
        let array_exercie = [];
        if (objet.length > 0) {
          objet.forEach(function (val) {
            array_exercie.push(val.note);
          });
          let unique = array_exercie;
          console.log(unique);
         
          if (unique.length == 0) {
            return [];
          }
          return unique;
        }
        return [];
  
         }
         return ""
        
     },
     StudenId(){
         if(this.formData.matiere != "" && this.formData.matiere !=null){
        let objet = this.GetterNote.filter(tem=>tem.matiere_id == this.formData.matiere);
        console.log(objet) 
        console.log("objet") 
        let array_exercie = [];
        if (objet.length > 0) {
          objet.forEach(function (val) {
            array_exercie.push(val.student_id);
          });
          let unique = [...new Set(array_exercie)];
          console.log(unique);
         
          if (unique.length == 0) {
            return [];
          }
          return unique;
        }
        return [];
  
         }
         return ""
        
     },
    arrayExerciceDecompteBienServie() {
        let objet = this.GetterNote.filter(tem=>tem.student_id);
        console.log(objet) 
        console.log("objet") 
        let array_exercie = [];
        if (objet.length > 0) {
          objet.forEach(function (val) {
            array_exercie.push(val.student_id);
          });
          let unique = [...new Set(array_exercie)];
          console.log(unique);
         
          if (unique.length == 0) {
            return [];
          }
          return unique;
        }
        return [];
    },

      TrimestreEncoursId(){
       let obj = this.gettersTrimestre.find(tem =>tem.encours == 1)
         if(obj){
           return obj.id
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

             arrayExerciceDecompteBienService() {
        let objet = this.GetterNote.filter(tem=>tem.student_id);
        console.log(objet) 
        console.log("objet") 
        let array_exercie = [];
        if (objet.length > 0) {
          objet.forEach(function (val) {
            array_exercie.push(val.student_id);
          });
          let unique = [...new Set(array_exercie)];
          console.log(unique);
         
          if (unique.length == 0) {
            return [];
          }
          return unique;
        }
        return [];
    },

    
  },

  methods:{
     ...mapActions("parametres",["getNiveau","AjouterNiveau", "ModifierNiveau","SupprimerNiveau","getClasse",
                     "getMatiere", "getTrimestre"]),
     ...mapActions("student",["get_all_student","AjouterEleve", "ModifierEleve","SupprimerEleve","get_note"]),

     ModificationEleve(id){
        this.$router.push({ name:"editStudent", params:{id:id}})
     },
     DetailEleves(id){
        this.$router.push({ name:"DetailEleve", params:{id:id}})
     },

      formaterDate(date) {
      return moment(date, "YYYY-MM-DD").format("DD-MM-YYYY");
    },
    genererEnPdf(){

        const localOptions = {
                    styles: [
                    'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css',
                    'https://unpkg.com/kidlat-css/css/kidlat.css',
                    './landscape.css'
                    ]
                };

        this.$htmlToPaper('printMe', localOptions);
        },
        CallBack(){
        return this.$router.go(-1)
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
</style>