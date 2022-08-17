<template>
  <div>
       <Loader :isVisible="loadingData"/>
       <div class="container-fluid" id="container-wrapper">
              <h3 class="text-center mb-3" v-if="formData.anne != '' && formData.niveau != '' && formData.libelle_id != '' ">
                Statistique de l'année {{formData.anne}} du niveau {{formData.niveau}} 
               </h3>
               <br>
          <div class="d-sm-flex align-items-center justify-content-between mb-2 ml-5">
            <div class="row">     
                
                   <div class="col-6 col-md-3">
                  <div class="form-group" >
                      <label for="niveau">Année  </label>
                      
                        <select class="form-control" id="niveau" v-model="formData.anne" >
                          <option value="" selected disabled hidden>Choisir le niveau</option>
                          <option value="2017" >2017</option>
                          <option value="2018" >2018</option>
                          <option value="2020" >2020</option>
                          <option value="2021" >2021</option>
                          <option value="2022" >2022</option>
                                        
                      </select>
                  </div>
                 
                </div>
                 <div class="col-6 col-md-3">
                  <div class="form-group"  >
                      <label for="niveau">{{ $t("ul.niveau") }} </label>
                      
                        <select class="form-control" id="classe" v-model="formData.niveau"  >
                          <option value="" selected disabled hidden>Selectionner le niveau</option>
                           <option value="CEPE" >CEPE</option>
                          <option value="BEPC" >BEPC</option>
                          <option value="BAC" >BAC</option>
                          <!-- <option v-for="item in filtreAnne" :key="item.id" :value="item.niveau"> {{item.niveau}} </option> -->
                                              
                      </select>
                  </div>
                 
                </div>
                 <div class="col-6 col-md-3">
                  <div class="form-group"  >
                      <label for="niveau">Libelle </label>
                      
                        <select class="form-control" id="classe" v-model="formData.libelle_id"  >
                          <option selected disabled hidden value="">Selectionner le niveau</option>
                          <option v-for="item in AfficherLeNiveaus" :key="item.id" :value="item.id"> {{item.titre}} </option>
                                              
                      </select>
                  </div>
                 
                </div>
                 <div class="col-4 col-md-3" v-if="formData.anne != '' || formData.niveau != '' || formData.libelle_id != '' ">
                <button @click.prevent="VideChamp" type="submit" class="form-control btn btn-info">vider les champs</button>
                 
                </div>
        
            </div>
            
          </div>
          <div  style="margin: 0px 2px 0px 82%;" v-if="getterProfileUsers.role_id == 1">
                 <button @click.prevent="BilanAnne" class="form-control btn btn-warning">Configurer le bilan annuel</button>

          </div>
          <div class="row container-fluid" >
            <!-- Datatables -->
            <div class="col-lg-10 " style="margin-left:8%">
              <div class="card mb-5">
               
                <div class="table-responsive p-3">
                  
                  <table class="table align-items-center table-flush" id="dataTable"  border="1">
                            <tr v-for="item in gettersconfigEntete" :key="item.id">
                        <td colspan="4">
                            
                        <img src="/front/img/Armoiries.png" width="70px !important;"  />       

                            <span>Etablissement :</span><span >{{item.nom}}</span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
                                <span>Logo:</span> <span >
                                    <img :src="item.photo" alt="" style="width:50px !important;">
                                    </span> <br>
                    &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;  <span>Situation :</span><span >{{item.adresse}}</span>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                           
                              <span>Téléthone:</span><span >{{item.contact}}</span>
                        </td>
                       
                        <td colspan="3"  >
                            <span>Code</span>: <span>{{item.code}}</span> <br>
                            <span>Statut</span>: <span>{{item.statut}}</span>
                        </td>
                    </tr>
                    
                     <tr >
                         
                        
                        <th colspan="9">
                            <span style="margin-left:18%; background-color:#C6222C;border-radius:10px;text-transform:uppercase;
                            color:#fff;">
                                Enseignement secondaire privé premier/seconde cycle
                            </span> 
                            <br><br><br>
                            <span v-if="AfficherLeDetail" style="margin-left:23%; background-color:#0AAF7D;border-radius:10px;text-transform:uppercase;
                            color:#fff;">
                                {{AfficherLeDetail.titre}}
                            </span>
                             <br> <br>
                        </th>
                        
                    </tr>
              
                   
                    <tr >
                       <th  style="background-color:#FEF604 !important" >Genre</th>
                       <th style="background-color:#FEF604 !important">Candidats Inscrits</th>
                       <th style="background-color:#FEF604 !important">Candidats Présents</th>
                       <th style="background-color:#FEF604 !important">Candidats Absents</th>
                       <th style="background-color:#FEF604 !important">Candidats Admis</th>
                       <th style="background-color:#FEF604 !important">Taux de reussite</th>
                      
                    </tr>
                    <tr>
                        <td style="padding:0px; background-color:#04FEED !important">Filles</td>
                        <td  style="padding:0px;text-align:center;"> {{AfficherLeDetail.fille_inscrit}}</td>
                        <td style="padding:0px;text-align:center">{{AfficherLeDetail.fille_present}}</td>
                        <td style="padding:0px;text-align:center ">{{AfficherLeDetail.fille_absent}}</td>
                        <td style="padding:0px;text-align:center ">{{AfficherLeDetail.fille_admis}}</td>
                        <td  style="padding:0px;text-align:center; background-color:#37D3FB !important ">{{AfficherLeDetail.taux_fille}}%</td>
                        
                    </tr>
                    <tr>
                        <td style="padding:0px; background-color:#04FEED !important">Garçon</td>
                        <td  style="padding:0px;text-align:center">{{AfficherLeDetail.garcon_inscrit}}</td>
                        <td style="padding:0px;text-align:center">{{AfficherLeDetail.garcon_present}}</td>
                        <td style="padding:0px;text-align:center ">{{AfficherLeDetail.garcon_absent}}</td>
                        <td style="padding:0px;text-align:center ">{{AfficherLeDetail.garcon_admis}}</td>
                        <td  style="padding:0px;text-align:center; background-color:#37D3FB  !important">{{AfficherLeDetail.taux_garcon}}%</td>
                        
                    </tr>
                    <tr>
                        <td  style="padding:0px; background-color:#04FEED !important">Total</td>
                        <td style="padding:0px;text-align:center">{{AfficherLeDetail.candidat_inscrit}}</td>
                        <td style="padding:0px;text-align:center ">{{AfficherLeDetail.candidat_present}}</td>
                        <td  style="padding:0px;text-align:center ">{{AfficherLeDetail.candidat_absent}}</td>
                        <td  style="padding:0px;text-align:center ">{{AfficherLeDetail.candidat_admis}}</td>
                        <td  style="padding:0px;text-align:center; background-color:#37D3FB  !important">{{AfficherLeDetail.taux_candidat}}%</td>
                        
                    </tr>
                   
                  </table>
                </div>
              </div>
           
            
            </div>
           
          </div>
          
         
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
            anne:"",
            niveau:"",
            libelle_id:"",
           
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
       this.getconfigEntete()
        this.getTrimestre();
        this.getBilan();
      this.getMatiere();
      this.get_all_student();
      this.nota = this.GetterNote.find(tem =>tem.student_id == this.$route.params.id)
     
        this.detailNote = this.GetterNote.filter(tem =>tem.student_id == this.$route.params.id)
       
    },

     computed:{
     ...mapGetters("parametres",["gettersNiveau", "gettersClasse", "gettersMatiere", "gettersTrimestre",
                    "gettersNouvelleMatiere","gettersconfigEntete","gettersloadingconfigEntete","gettersBilan"]),
     ...mapGetters("student",["GetterStudent", "GetterNote"]),
       ...mapGetters('personnel', ['getterProfileUsers', "gettersRole"]),
     
     
        loadingData(){
    return this.gettersloadingconfigEntete
       
    },
      AfficherLeNiveaus(){
        if(this.formData.niveau != "" && this.formData.anne != ""){
              return this.gettersBilan.filter(tem =>tem.niveau == this.formData.niveau && tem.annee == this.formData.anne)
          }
          return ""     
        },
      AfficherLeDetail(){
          if(this.formData.libelle_id != ""){

              return this.gettersBilan.find(tem =>tem.id == this.formData.libelle_id)
          }
          return 0
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
      filtreAnne(){
     if(this.formData.anne != null && this.formData.anne != ""){
      let objet = this.gettersBilan.filter(tem=>tem.annee == this.formData.anne)
       let array_exercie = []
        if (objet.length > 0) {
          objet.forEach(function (val) {
            array_exercie.push(val);
          });
          let unique = [...new Set(array_exercie)];
          console.log(unique);
         
          if (unique.length == 0) {
            return [];
          }
          return unique;
        }
      }
       return []
     },
 
    
  },

  methods:{
     ...mapActions("parametres",["getNiveau","AjouterNiveau", "ModifierNiveau","SupprimerNiveau","getClasse",
                     "getMatiere", "getTrimestre","getconfigEntete","getBilan"]),
     ...mapActions("student",["get_all_student","AjouterEleve", "ModifierEleve","SupprimerEleve","get_note"]),
           ...mapActions('personnel', ['getUserProfile','logoutUser', "getRole"]),

     BilanAnne(){
        this.$router.push({ name:"BilanAnneeRgister"})
     },
     VideChamp(){
        this.formData.anne = ""
        this.formData.niveau = ""
        this.formData.libelle_id = ""
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