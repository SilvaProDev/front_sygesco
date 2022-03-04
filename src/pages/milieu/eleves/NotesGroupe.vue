<template>
  <div>
  
   <div class="d-sm-flex align-items-center justify-content-between mb-2 ml-5">
            <div class="row">         

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
              
            </div>
            
          </div>
          <br> <br>
  <div class="tabset ml-5">
  <!-- Tab 1 -->
  <input type="radio" name="tabset" id="tab1" aria-controls="marzen" checked>
  <label for="tab1">Liste des élèves</label>
  <!-- Tab 2 -->
  <input type="radio" name="tabset" id="tab2" aria-controls="rauchbier">
  <label for="tab2">Ajout de notes groupées</label>
  
  <div class="tab-panels">
    <section id="marzen" class="tab-panel" >
         <!-- Row -->
          <div class="row"  >
            <!-- Datatables -->
            <div class="col-lg-12">
              <div class="card mb-4">
                <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                  <h6 class="m-0 font-weight-bold text-primary">Liste des élèves de la classe de : <span v-if="formData.niveau_id !='' && formData.classe_id !='' ">{{LibClasse(formData.classe_id)}}</span> </h6>
                </div>
                <div class="table-responsive p-3" >
                  
                  <table class="table align-items-center table-flush" id="dataTable">
                    <thead class="thead-light">
                      <tr>
                        <th>N°</th>
                        <th>Nom</th>
                        <th>Prénoms</th>
                        <th>Sexe</th>
                        <th>Date Naiss</th>
                        <th>MATRICULE</th>
                        <!-- <th>ORIENTE</th> -->
                        <th>CLASSE</th>
                        <!-- <th>Test</th> -->
                        <th>selectionné</th>
                        <!-- <th colspan="3">ACTION</th> -->
                      </tr>
                    </thead>
                   
                    <tbody>

                      <tr v-for="item in ListeEleveParClasse" :key="item.id" :value="item.id">
                        <td>{{item.id}}</td>
                        <td>{{item.nom}}</td>
                        <td>{{item.prenom}}</td>
                        <td>{{item.sexe}}</td>
                        <td>{{formaterDate(item.date_naissance)}}</td>
                        <td>{{item.matricule}}</td>
                        <!-- <td>{{item.oriente}}</td> -->
                        <td>{{LibelleClasse(item.classe_id)}}</td>
                        <!-- <td>
                          <div class="form-group">     
                             <label class="form-label"></label>                       
                           <input v-model="formData.libelle" 
                           type="text"  class="form-control p-3"  aria-describedby="emailHelp"
                            placeholder="Entrer la note">
                        </div>
                        </td> -->
                        <td>
                          <div class="form-group form-check">
                            <label class="form-check-label" :for="item.id"></label>
                            <input type="checkbox" v-model="NoteGroupe" :id="item.id" :value="item.id">
                        </div>
                        </td>
                        <!-- <td> 
                          <a class="btn btn-primary" title="Modifier" href="" @click.prevent="Modification(item.id)">
                            Nouvelle note
                          </a> 
                       
                         
                        </td> -->
                      </tr>                                                             
                    </tbody>
                  </table>
                </div>
              </div>


            </div>
           
          </div>
          <!--Row-->
  </section>
    <section id="rauchbier" class="tab-panel">
       
             <div class="row">        
             <form action="" method="post">
                <div class="col-6 col-md-3">
                  <div class="form-group">
                      <label for="code">Trimestre </label>   
                      
                      <input :value="TrimestreEncours"  disabled  type="text"  class="form-control" id="code" aria-describedby="emailHelp"
                      placeholder="Entrer le code">
                  </div>
              </div>
              <div class="col-6 col-md-3">
                  <div class="form-group">
                      <label for="matiere">Matiere </label>                     
                      <select class="form-control" id="classe" v-model="formData.matiere" @input="$v.formData.matiere.$touch()">
                        <option v-for="item in AfficherMatiere" :key="item.id" :value="item.libelle"> {{item.libelle}} </option>                  
                                              
                      </select>
                  </div>
              </div>
              
          
              <div class="col-6 col-md-3">
                <div class="form-group">
                    <label for="scolarite">Date d'enrégistrement </label>   
                      <span style="color:red; font-style:italic;"
                          v-if="$v.formData.date.$error && !$v.formData.date.required"
                          role="alert"> champs obligatoire!
                      </span>
                    <input v-model="formData.date" @input="$v.formData.date.$touch()"  type="date"  class="form-control" id="scolarite" aria-describedby="emailHelp"
                    placeholder="Entrer le scolarite">
                </div>
              </div>
              <div class="col-6 col-md-3">
              </div>
             
            </form>

             <div class="col-lg-12">
              <div class="card mb-4">
                <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                  <h6 class="m-0 font-weight-bold text-primary"> <span style="color:red;"> Liste des élèves selectionnés</span>  &nbsp; 
                      Classe:  <span style="color:red;" v-if="formData.niveau_id !='' && formData.classe_id !='' ">
                            {{LibClasse(formData.classe_id)}}</span> &nbsp;
                       Matière:  <span style="color:red;"> {{formData.matiere}}</span></h6>
                </div>
                <div class="table-responsive p-3" >
                  
                  <table class="table align-items-center table-flush" id="dataTable">
                    <thead class="thead-light">
                      <tr>
                        <th>N°</th>
                        <th>Nom</th>
                        <th>Prénoms</th>
                        <th>Sexe</th>
                        <th>Date Naiss</th>
                        <th>MATRICULE</th>
                        <th>Note</th>

                      </tr>
                    </thead>
                   
                    <tbody>

                      <tr v-for="(item, index) in reuissite" :key="item.id" :value="item.id">
                        <td>{{index+1}}</td>
                        <td>{{item.nom}}</td>
                        <td>{{item.prenom}}</td>
                        <td>{{item.sexe}}</td>
                        <td>{{formaterDate(item.date_naissance)}}</td>
                        <td>{{item.matricule}}</td>
                                     
                        <td>
                          <div class="form-group">                            
                           <input v-model="formData.teste1"  type="text"  class="form-control p-3" aria-describedby="emailHelp"
                            placeholder="Entrer la note">
                        </div>
                        </td>
                        
                      </tr>   
                      <!-- <tr>
                        <td>

                        </td>
                        </tr>                                                           -->
                    </tbody>
                  </table>
                   <button v-if="NoteGroupe.length != 0"  @click.prevent="AjouterFonctionLocal" type="submit" class="btn btn-danger ml-5">Enrégistrer</button>
                </div>
              </div>

              
            </div>
            </div>
        
    
    </section>
    <section id="dunkles" class="tab-panel">
 
    
    </section>
  </div>
  
</div>


     
         <!-- modal modifier -->
  <!-- modal fin -->


 
        <notifications  />
  </div>
</template>

<script>

// import moment from "moment"
import {mapGetters, mapActions} from "vuex";
import {required} from "vuelidate/lib/validators";
import moment from "moment"

// const random = () => {
//   return parseInt(Date.now() + Math.random() * 10000).toString(20).slice(-6)
// }
export default {
  components: {  },
    data(){
        return{
          NoteGroupe:[],
          showIsModal: false,
          formData:{
            testemoi:"",
            date:"",
            teste1:"",
            trimestre:"",
            libelle:"",
            matiere:"",
            
            
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
      
    },

   validations:{
        formData:{
            
            date:{required},
            matiere:{required},
            libelle:{required},
        }
    },
     computed:{
     ...mapGetters("parametres",["gettersNiveau", "gettersClasse", "gettersTrimestre", "gettersMatiere"]),
     ...mapGetters("student",["GetterStudent"]),

     AfficherClasse(){
        return this.gettersClasse.filter(tem =>tem.niveau_id == this.formData.niveau_id)
     },
     AfficherMatiere(){
        return this.gettersMatiere.filter(tem =>tem.classe_id == this.formData.classe_id)
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

    
  },

  methods:{
     ...mapActions("parametres",["getNiveau","AjouterNiveau", "ModifierNiveau","SupprimerNiveau","getClasse",
                   "getTrimestre","getMatiere"]),
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
            student_id: this.editText.id,
            trimestre: this.TrimestreEncours,

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


 .bloc-modale{
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        display: flex;
        justify-content: center;
        align-items: center;
    }
 .overlay {
   background: rgba(0, 0, 0, 0.5);
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;   
}

 .modale {
  background: #f1f1f1;
        color: #333;
        padding: 30px;
        position: fixed;
        top: 20%;
        left: 40%;
}

 .close{
  position: absolute;
  top: 10px;
  right: 10px;
}

/*
 CSS for the main interaction
*/
.tabset > input[type="radio"] {
  position: absolute;
  left: -200vw;
}

.tabset .tab-panel {
  display: none;
}

.tabset > input:first-child:checked ~ .tab-panels > .tab-panel:first-child,
.tabset > input:nth-child(3):checked ~ .tab-panels > .tab-panel:nth-child(2),
.tabset > input:nth-child(5):checked ~ .tab-panels > .tab-panel:nth-child(3),
.tabset > input:nth-child(7):checked ~ .tab-panels > .tab-panel:nth-child(4),
.tabset > input:nth-child(9):checked ~ .tab-panels > .tab-panel:nth-child(5),
.tabset > input:nth-child(11):checked ~ .tab-panels > .tab-panel:nth-child(6) {
  display: block;
}

/*
 Styling
*/
body {
  font: 16px/1.5em "Overpass", "Open Sans", Helvetica, sans-serif;
  color: #333;
  font-weight: 300;
}

.tabset > label {
  position: relative;
  display: inline-block;
  padding: 15px 15px 25px;
  border: 1px solid transparent;
  border-bottom: 0;
  cursor: pointer;
  font-weight: 600;
}

.tabset > label::after {
  content: "";
  position: absolute;
  left: 15px;
  bottom: 10px;
  width: 50px;
  height: 4px;
  background: #8d8d8d;
}

.tabset > label:hover,
.tabset > input:focus + label {
  color: #06c;
}

.tabset > label:hover::after,
.tabset > input:focus + label::after,
.tabset > input:checked + label::after {
  background: #06c;
}

.tabset > input:checked + label {
  border-color: #ccc;
  border-bottom: 1px solid #fff;
  margin-bottom: -1px;
}

.tab-panel {
  padding: 30px 0;
  border-top: 1px solid #ccc;
}

/*
 Demo purposes only
*/
*,
*:before,
*:after {
  box-sizing: border-box;
}

body {
  padding: 30px;
}

.tabset {
  max-width: 65em;
}
</style>