<template>
  <div>
       <div class="container-fluid" id="container-wrapper">
          <div class="d-sm-flex align-items-center justify-content-between mb-2 ml-5">
            <div class="row">         

              <div class="col-6 col-md-3">
                  <div class="form-group" v-if="this.getterProfileUsers.role_id == 1">
                      <label for="niveau">{{ $t("ul.niveau") }} </label>
                      
                        <select class="form-control" id="niveau" v-model="formData.niveau_id" >
                          <option value="" >Choisir le niveau</option>
                          <option v-for="item in tester" :key="item.id" :value="item.id"> {{item.libelle}} </option>
                                              
                      </select>
                  </div>
                  <div class="form-group" v-if="this.getterProfileUsers.role_id == 3">
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
                  <div class="form-group"  v-if="this.getterProfileUsers.role_id == 3">
                      <label for="niveau">{{ $t("ul.classe") }} </label>
                      
                        <select class="form-control" id="classe" v-model="formData.classe_id"  >
                          <option value="">Choisir la classe</option>
                          <option v-for="item in reuissite" :key="item.id" :value="item.id"> {{item.libelle}} </option>
                                              
                      </select>
                  </div>
                </div>
              
            </div>
          </div>

          <!-- Row -->
          <div class="row" v-if="formData.niveau_id != '' && formData.classe_id != ''">
            <!-- Datatables -->
            <div class="col-lg-12">
              <div class="card mb-4">
                <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                  <h6 class="m-0 font-weight-bold text-primary">{{ $t("ul.liste") }} : <span v-if="formData.niveau_id !='' && formData.classe_id !='' ">{{LibClasse(formData.classe_id)}}</span> </h6>
                  
                   <!-- <button v-if="formData.niveau_id !='' && formData.classe_id !='' "  @click.prevent="genererEnPdf()"
                   class=" btn btn-danger" style="margin-left:55%" type="submit" >Imprimer pdf</button>
                   <button v-if="formData.niveau_id !='' && formData.classe_id !='' "
                   class=" btn btn-success"    type="submit" >Imprimer Excel</button> -->

                </div>
                <div class="table-responsive p-3" id="printMe">
                  
                  <table class="table align-items-center table-flush bars" id="dataTable">
                    <thead class="thead-light">
                      <tr>
                        <th>N??</th>
                        <th>Nom</th>
                        <th>Pr??noms</th>
                        <th>Sexe</th>
                        <th>Date Naiss</th>
                        <th>MATRICULE</th>
                        <th>ORIENTE</th>
                        <th>CLASSE</th>
                        <th colspan="3">ACTION</th>
                      </tr>
                    </thead>
                   
                    <tbody>

                      <tr v-for="(item, index) in ListeEleveParClasse" :key="item.id" :value="item.id">
                        <td>{{index+1}}</td>
                        <td>{{item.nom}}</td>
                        <td>{{item.prenom}}</td>
                        <td>{{item.sexe}}</td>
                        <td>{{item.date_naissance}}</td>
                        <td>{{item.matricule}}</td>
                        <td>{{item.oriente}}</td>
                        <td>{{LibelleClasse(item.classe_id)}}</td>
                        <td> 
                          <!-- <a title="Modifier" href="" @click.prevent="ModificationEleve(item.id)">
                            <i style="color:green;" class="fas fa-edit"> </i>
                          </a> 
                            &nbsp;
                          <a title="Supprimer" href="" @click.prevent="SupprimerEleve(item.id)">
                            <i style="color:red;" class="fas fa-trash"></i>
                          </a>  -->
                           &nbsp;
                          <a class="btn btn-primary" title="Voir d??tail" href="" @click.prevent="DetailEleves(item.id)">
                            D??tail
                            <!-- <i class="far fa-clone ">Detail</i> -->
                          </a> 
                        </td>
                      </tr>                                                             
                    </tbody>
                  </table>
                </div>
              </div>
           
              <!-- <div v-if="formData.niveau_id !='' && formData.classe_id !='' " class="base-demo m-5" style="width: 900px">
                  <vue-table-dynamic :params="params"  ref="table">
                      <template v-slot:column="{ props }">
                          <span>{{props.row}}</span>
                      </template>
                  </vue-table-dynamic>
              </div> -->
            </div>
           
          </div>
          <!--Row-->
      
        </div>
        <notifications  />
  </div>
</template>

<script>

// import moment from "moment"
import {mapGetters, mapActions} from "vuex";
// import VueTableDynamic from 'vue-table-dynamic'
import xlsx from 'xlsx'

// const random = () => {
//   return parseInt(Date.now() + Math.random() * 10000).toString(20).slice(-6)
// }
export default {
  components: {  },
    data(){
        return{
          selectedFile:"",
           tableData: [],
          tableHeader: [],
          detail:"",
          formData:{
            nom:"ouattara",
            prenom:"silva",
            sexe:"Feminin",
            matricule:"UUYT021",
            date_naissance:"02-03-2013",
            niveau_id:"",
            classe_id:"",
           
          },
            params: {
        data: [
          ['N??', `Nom`, `Prenom`, `Sexe`, `Date naissance`, `matricule`]
          
        ],
        header: 'row',
        sort: [0, 1, 2],
        border: true,
        enableSearch: true,
        stripe: true,
        pagination: true,
        pageSize: 5,
        pageSizes: [5, 10, 20, 50],
        columnWidth: [{column: 0, width: 80}, {column: 1, width: '15%'}],
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
       this.getUserProfile();
      this.getClasse();
       this.getRole();
      this.getAnnee();
      this.get_all_student();
    
      
    },
     mounted () {
    for (let i = 0; i < 100; i++) {
      this.params.data.push([i+1, `${this.formData.nom}`, `${this.formData.prenom}`, `${this.formData.sexe}`, `${this.formData.date_naissance}`, `${this.formData.matricule}`])
    }
  },

     computed:{
     ...mapGetters("parametres",["gettersNiveau", "gettersClasse","gettersAnne"]),
     ...mapGetters("student",["GetterStudent"]),
       ...mapGetters('personnel', ['getterProfileUsers', "gettersRole"]),

     AnneEncours(){
       let obj = this.gettersAnne.find(tem=>tem.encours == 1)
       if(obj){
         return obj.id;
       }
       return ""
     },

        AfficherClasse(){
        return this.gettersClasse.filter(tem =>tem.niveau_id == this.formData.niveau_id)
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

        return this.GetterStudent.filter(tem =>tem.classe_id == this.formData.classe_id && tem.annee_id == this.AnneEncours)
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
        let objet = this.GetterStudent.filter(tem=>tem.classe_id);
        // console.log(objet) 
        // console.log("objet") 
        let array_exercie = [];
        if (objet.length > 0) {
          objet.forEach(function (val) {
            array_exercie.push(val.id);
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
        if(this.getterProfileUsers.role_id == 3){

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
         if(this.formData.niveau_id != '' && this.getterProfileUsers.role_id == 3){

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
         } return []
         
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
   
        AfficherMatiere(){
        return this.gettersMatiere.filter(tem =>tem.classe_id == this.formData.classe_id)
     },
      
    
  },

  methods:{
     ...mapActions("parametres",["getNiveau","AjouterNiveau", "ModifierNiveau","SupprimerNiveau","getClasse",
     "getAnnee"]),
     ...mapActions("student",["get_all_student","AjouterEleve", "ModifierEleve","SupprimerEleve","getEleveParClasse","ImporterEleve"]),
     ...mapActions('personnel', ['getUserProfile','changePassword',"getRole"]),
     ModificationEleve(id){
        this.$router.push({ name:"editStudent", params:{id:id}})
     },
     DetailEleves(id){
        this.$router.push({ name:"DetailEleve", params:{id:id}})
     },
    Annuler(){
      let vm =this
      vm.tableData = []
    },
    EnregistrerFichier(){
   
       
      let obj ={
        dataExcel: this.tableData,
        
      }
      console.log(obj)
      this.ImporterEleve(obj)
          .then((data) => {
          console.log(data);
          this.tableData = [];
        })
        .catch((erro) => {
          console.log(erro);
        });
    },

     importExcel(e) {
      const files = e.target.files;
     // this.selectedFile = event.target.files[0];
      console.log(files);
      if (!files.length) {
        return ;
      } else if (!/\.(xls|xlsx)$/.test(files[0].name.toLowerCase())) {
        return alert("Le format de fichier est incorrect. chager un format xls or xlsx ");
      }
      const fileReader = new FileReader();
      fileReader.onload = ev => {
        try {
          const data = ev.target.result;
          
          const XLSX = xlsx;
          const workbook = XLSX.read(data, {
            type: "binary",
             cellDates: true,
              cellNF: false,
              cellText: false
          });
          const wsname = workbook.SheetNames[0]; // Take the first sheet???wb.SheetNames[0] :Take the name of the first sheet in the sheets
          const ws = XLSX.utils.sheet_to_json(workbook.Sheets[wsname]); // Generate JSON table content???wb.Sheets[Sheet???]    Get the data of the first sheet
         // const excellist = [];  // Clear received data
          // Edit data
       

          for (var i = 0; i < ws.length; i++) {
            this.tableData.push(ws[i]);
            
          }
          console.log("les donn??es de silva", this.tableData); // At this point, you get an array containing objects that need to be processed
        } catch (e) {
          return alert("Read failure!");
        }
      };
      fileReader.readAsBinaryString(files[0]);
      var input = document.getElementById("upload");
      input.value = "";
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
  
  },

}
</script>

<style scoped>
.bars{
    width: 100%;
    height: 2px;
    /* margin-left: 30px; */
     border: 1px solid #000;
    
}
</style>