<template>
  <div class="container ml-3 mr-2">
    <!-- <h2 class="ml-5">Configuration de l'entête</h2> -->
  <table  class="table">
  <tr v-for="item in gettersconfigEntete" :key="item.id">
   
    <td style="margin-left:50%">
        <img :src="item.photo" width="70px;"  />       
    </td>
    <td >
        <img src="/front/img/tel.jpg" width="60px;"  />
        <span>Téléphone</span>
         <span>{{item.contact}} </span>
    </td>
    <td >
    <img src="/front/img/local.jpg"  width="70px;" />
    <span>SITUATION </span> 
    <span>{{item.adresse}}</span>
        
    </td>
     <td>
        <img src="/front/img/Armoiries.png" width="80px;"  />
       
    </td>
  </tr>
</table>
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

<style>

</style>