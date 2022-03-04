<template>
  <div>
       <div class="container-fluid" id="container-wrapper">
              <h3 class="text-center mb-3">Détail des notes par classes et par matières  </h3>
          <div class="d-sm-flex align-items-center justify-content-between mb-2 ml-5">
            <div class="row">         

              <div class="col-6 col-md-3">
                   <div class="form-group">
                  <label for="code">Trimestre </label>   
                   
                  <input :value="TrimestreEncours"  disabled  type="text"  class="form-control" id="code" aria-describedby="emailHelp"
                        placeholder="Entrer le code">
                    </div>
                </div>
                   <div class="col-6 col-md-3">
                  <div class="form-group" v-if="this.getterProfileUsers.role_id == 1">
                      <label for="niveau">{{ $t("ul.niveau") }} </label>
                      
                        <select class="form-control" id="niveau" v-model="formData.niveau_id" >
                          <option value="" >Choisir le niveau</option>
                          <option v-for="item in tester" :key="item.id" :value="item.id"> {{item.libelle}} </option>
                                              
                      </select>
                  </div>
                  <div class="form-group" v-if="this.getterProfileUsers.role_id == 2">
                      <label for="niveau">{{ $t("ul.niveau") }} </label>
                      
                        <select class="form-control" id="niveau" v-model="formData.niveau_id" >
                          <option value="" >Choisir le niveau</option>
                          <option v-for="item in tester" :key="item" :value="item"> {{AfficherNiveau(item)}} </option>
                                              
                      </select>
                  </div>
                </div>
                 <div class="col-6 col-md-3">
                  <div class="form-group"  v-if="this.getterProfileUsers.role_id == 1">
                      <label for="niveau">{{ $t("ul.classe") }} </label>
                      
                        <select class="form-control" id="classe" v-model="formData.classe_id"  >
                          <option value="">Choisir la classe</option>
                          <option v-for="item in AfficherClasse" :key="item.id" :value="item.id"> {{(item.libelle)}} </option>
                                              
                      </select>
                  </div>
                  <div class="form-group"  v-if="this.getterProfileUsers.role_id == 2">
                      <label for="niveau">{{ $t("ul.classe") }} </label>
                      
                        <select class="form-control" id="classe" v-model="formData.classe_id"  >
                          <option value="">Choisir la classe</option>
                          <option v-for="item in reuissite" :key="item.id" :value="item.id"> {{item.libelle}} </option>
                                              
                      </select>
                  </div>
                </div>
              <div class="col-6 col-md-3">
                 <div class="form-group" v-if="this.getterProfileUsers.role_id == 1">
                 <label for="niveau">{{ $t("ul.matiere") }} </label>               
                   <select class="form-control" id="classe" v-model="formData.matiere_id">
                    <option v-for="item in AfficherMatiere" :key="item.id" :value="item.id"> {{item.libelle}} </option>                  
                                          
                  </select>
              </div>
              <div class="form-group" v-if="this.getterProfileUsers.role_id == 2">
                 <label for="niveau">{{ $t("ul.matiere") }} </label>                   
                   <select class="form-control" id="classe" v-model="formData.matiere_id">
                    <option v-for="item in reuissite1" :key="item.id" :value="item.id"> {{item.libelle}} </option>                  
                                          
                  </select>
              </div>

                 
                </div>
              
            </div>
            
          </div>

          <!-- Row -->
          <div class="row" v-if="formData.matiere_id != ''">
            <!-- Datatables -->
            <div class="col-lg-12">
              <div class="card mb-4">
                <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                  <h6 class="m-0 font-weight-bold text-primary">Classe: 
                    <span v-if="formData.classe_id" style="color:red; font-weight:bold;"> {{LibClasse(formData.classe_id)}} 
                      </span> &nbsp;  &nbsp;  Matière : <span v-if="formData.matiere_id" style="color:red; font-weight:bold;">{{LibMatiere(formData.matiere_id)}}</span> </h6>
                </div>
                <div class="table-responsive ">
                  
                  <table class="table table-flush bars" id="dataTable">
                    <thead class="thead-light">
                      <tr>
                        <th>N°</th>
                        <th>Nom</th>
                        <th>Prenom</th>
                        <th>Sexe</th>
                        <th>Matricule</th>
                        <th>Classe</th>
                        <th>Note Total</th>
                        <th>Moyennes</th>
                        <!-- <th>Rang</th>                         -->
                        
                      </tr>
                      
                    </thead>
                   
                    <tbody v-if="test.length != 0" >

                         <tr v-for="(tes, tem) in test1" :key="tem">
                             <td>{{tem +1}}</td>
                             <td>{{NomEleve(tes)}}</td>
                             <td>{{PrenomEleve(tes)}}</td>                           
                             <td>{{SexeEleve(tes)}}</td>                           
                             <td>{{MatriculeEleve(tes)}}</td>                           
                             <td>{{ClasseEleve(ClasseId(tes))}}</td>                           
                             <td>{{(test10(tes)+"/"+Tailletest10(tes))}}</td>                           
                             <td>{{(test10(tes)/Tailletest10(tes))}}</td>  
                             <!-- <td>{{tem +1+" er(e)"}}</td>                          -->
                                                             
                        </tr>
                                                                        
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
            
            matiere_id:"",
            niveau_id:"",
            classe_id:"",
           
          },
     detailNote:"",
        }
    },
     created(){
      // console.log(this.GetterStudent);
       this.getUserProfile();
       this.getRole();
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
       ...mapGetters('personnel', ['getterProfileUsers', "gettersRole"]),
     
     
    AfficherNiveau(){
    return (id)=>{
        if(id != ''){
            let test = this.gettersNiveau.find(tem=>tem.id == id)
            if(test){
                return test.libelle
            }
        }
    }
},
      tester2(){
       let objet = this.getterProfileUsers.affectations
       let tableau =[]
       if(objet.length >0){
         objet.forEach(elt => {
           tableau.push(elt.matiere_id)
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
      tester1(){
       let objet = this.getterProfileUsers.affectations
       let tableau =[]
       if(objet.length >0){
         objet.forEach(elt => {
           tableau.push(elt.classe_id)
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
     tester(){
        if(this.getterProfileUsers.role_id == 2){

          let objet = this.getterProfileUsers.affectations
          let tableau =[]
          if(objet.length >0){
            objet.forEach(elt => {
              tableau.push(elt.niveau_id)
            });
            let unique = [...new Set(tableau)];
            console.log(unique)
            if(unique.length == 0){
              return []
            }
            return unique
          }
         
        } 
        return this.gettersNiveau
     },
       reuissite(){
         if(this.formData.niveau_id != ''){

           let collect =[]
           this.AfficherClasse.filter(item =>{
             this.tester1.filter(element => {        
               if(item.id == element){
                 collect.push(item)
                //  [...new Set()]
                 
               }
             })
           })
       return collect;
         }
         return []
     },
       reuissite1(){
         if(this.formData.classe_id != ''){

           let collect =[]
           this.AfficherMatiere.filter(item =>{
             this.tester2.filter(element => {        
               if(item.id == element){
                 collect.push(item)
                //  [...new Set()]
                 
               }
             })
           })
       return collect;
         }
         return []
     },
      
        AfficherClasse(){
        return this.gettersClasse.filter(tem =>tem.niveau_id == this.formData.niveau_id)
     },
        AfficherMatiere(){
        return this.gettersMatiere.filter(tem =>tem.classe_id == this.formData.classe_id)
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
        taille(){
            return this.test.length+1
        },
        MatiereId(){
          return (id)=>{
            if(id != "" && id != null){
              let obj = this.GetterNote.find(tem=>tem.student_id == id)
              if(obj){
                return obj.matiere_id
              }
            }
          }
        },
        ClasseEleve(){
          return (id)=>{
            if(id != null && id != ""){
              let obj = this.gettersClasse.find(tem=>tem.id == id)
              if(obj){
                return obj.libelle;
              }
            }
          }
        },
    ClasseId(){
        return (id)=>{
          if(id != "" && id != null){
            let obj = this.GetterStudent.find(tem=>tem.id == id)
            if(obj){
              return obj.classe_id;
            }
            return "";
          }
        }
     },
    MatriculeEleve(){
        return (id)=>{
          if(id != "" && id != null){
            let obj = this.GetterStudent.find(tem=>tem.id == id)
            if(obj){
              return obj.matricule;
            }
            return "";
          }
        }
     },
    SexeEleve(){
        return (id)=>{
          if(id != "" && id != null){
            let obj = this.GetterStudent.find(tem=>tem.id == id)
            if(obj){
              return obj.sexe;
            }
            return "";
          }
        }
     },
    PrenomEleve(){
        return (id)=>{
          if(id != "" && id != null){
            let obj = this.GetterStudent.find(tem=>tem.id == id)
            if(obj){
              return obj.prenom;
            }
            return "";
          }
        }
     },
     NomEleve(){
        return (id)=>{
          if(id != "" && id != null){
            let obj = this.GetterStudent.find(tem=>tem.id == id)
            if(obj){
              return obj.nom;
            }
            return "";
          }
        }
     },
     test(){
         if(this.formData.matiere_id != "" && this.formData.matiere_id !=null){
             return this.GetterNote.filter(tem => tem.matiere_id == this.formData.matiere_id)
         }
         return ""
     },

     //convertir le tableau string en int
     conv(){
         return this.test1.map((Number))
     },

     //calculer la somme des notes
    somm(){
        return this.conv.reduce(function(a, b){
        return a + b;
        }, 0);
    },
  //  ReuissiteSilva(){
  //    return (id)=>{
  //      if(id !=""){

  //      }
  //    }
  //  },
  //recupère les notes liés à un étudiant
     test10(){
       return (id1)=>{
         if(this.formData.matiere_id != "" && this.formData.matiere_id !=null && id1 !="" && id1!=null){
        let objet = this.GetterNote.filter(tem =>tem.student_id == id1 && tem.matiere_id == this.formData.matiere_id);   
        let array_exercie = [];
        if (objet.length > 0) {
          objet.forEach(function (val) {
            array_exercie.push(val.note);
          });
          let unique = array_exercie;
          console.log(unique);         
          if (unique.length == 0) {return [];}
          return unique.map(Number).reduce(function(a,b){
            return a +b;
          }, 0);
        } return [];
         }
         return ""
        
       }
     },
     Tailletest10(){
       return (id1)=>{
         if(this.formData.matiere_id != "" && this.formData.matiere_id !=null && id1 !="" && id1!=null){
        let objet = this.GetterNote.filter(tem =>tem.student_id == id1 && tem.matiere_id == this.formData.matiere_id);   
        let array_exercie = [];
        if (objet.length > 0) {
          objet.forEach(function (val) {
            array_exercie.push(val.note);
          });
          let unique = array_exercie;
          console.log(unique);         
          if (unique.length == 0) {return [];}
          return unique.map(Number).length;
        } 
        return [];
         }
         return ""      
       }
     },
    //recupère les notes liés à un étudiant
     test1(){
         if(this.formData.matiere_id != "" && this.formData.matiere_id !=null && this.formData.classe_id != "" && this.formData.classe_id !=null){
        let objet = this.GetterNote.filter(tem=>tem.matiere_id == this.formData.matiere_id && tem.classe_id == this.formData.classe_id);
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
        return "";
  
         }
         return ""
        
     },
     StudenId(){
         if(this.formData.matiere_id != "" && this.formData.matiere_id !=null){
        let objet = this.GetterNote.filter(tem=>tem.matiere_id == this.formData.matiere_id);
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
           ...mapActions('personnel', ['getUserProfile','logoutUser', "getRole"]),

     ModificationEleve(id){
        this.$router.push({ name:"editStudent", params:{id:id}})
     },
     DetailEleves(id){
        this.$router.push({ name:"DetailEleve", params:{id:id}})
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
    width: 100%;
    height: 2px;
    /* margin-left: 30px; */
     border: 1px solid #000;
    
}
</style>