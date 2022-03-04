<template>
  
  <div class="container">
      <h1>Configuration du livret</h1>
       <button @click.prevent="ShowModalText" style="margin-left:90%"  type="submit" class="btn btn-success">Ajouter Titre</button>
         <div class="row ml-5">         

              <div class="col-6 col-md-3">
                  <div class="form-group">
                      <label for="niveau">Choisir le titre </label>
                      
                       <select class="form-control" id="classe" v-model="formData.livret_id"  >
                          <option value="">Selectionner le titre</option>
                          <option v-for="item in gettersLivret" :key="item.id" :value="item.id"> 
                              {{item.libelle}} </option>
                                              
                      </select>
                  </div>
                </div>
              <div class="col-6 col-md-3">
                  <div class="form-group">
                      <label for="niveau">Libelle </label>
                       <span v-if="verifcode">
                        <code style="color:red; font-style:italic;">Ce libelle existe déjâ</code>
                        </span>
                         <span style="color:red; font-style:italic;"
                            v-if="$v.formData.libelle.$error && !$v.formData.libelle.required"
                            role="alert"> 
                            <span style="color:red; font-weight:bold">*</span>
                            Ce champs est obligatoire!
                        </span>  
                        <input  @input="$v.formData.libelle.$touch()" v-model="formData.libelle" type="text" class="form-control"
                        placeholder="Entrer le libellé">
                  </div>
                </div>
              <div class="col-6 col-md-3">
                 <button :disabled="verifcode"   @click.prevent="AjouterFonctionLocal" type="submit" class="btn btn-primary ml-5">Valider</button>
              &nbsp;
              <button @click.prevent="annuler" type="submit" class="btn btn-warning">Annuler</button>
                </div>
            </div>

              <div class="row ml-3">
            <div class="col-lg-12 ">
              <!-- Simple Tables -->
              <div class="card">
                <div class="card-header d-flex flex-row align-items-center ">
                  <!-- <h6 class="m-0 font-weight-bold text-primary">Les différents niveaux</h6> -->
                </div>
                <div class="table-responsive">
                  <table class="table align-items-center table-flush bars">
                    <thead class="thead-light">
                      <tr >
                        <th>N°</th>
                        
                        <th>libelle</th>
                        <th>Titre</th>
                        <th  colspan="2" >Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(item, index) in gettersConfiglivret" :key="item.id">
                        <td>{{index+1}}</td>
                        <td>{{item.libelle}}</td>
                        <td>{{LibLivret(item.livret_id)}}</td>
                      
                        <td>
                          <a title="Modifier" href="" @click.prevent="Modification(item.id)" >
                          
                          <i style="color:green;" class="fas fa-edit"> </i></a>
                        
                                &nbsp;
                          <a title="Supprimer"  @click.prevent="SupprimerConfigLivret(item.id)">
                          
                            <i style="color:red;" class="fas fa-trash"></i>
                            </a>
                          </td>
                      </tr>
                                                         
                    </tbody>
                  </table>
                </div>
              
              </div>
            </div>
          </div>

              <!-- debut  Modal envoi de Text -->
      <div class="row">
        <div class="col">
      <div class="bloc-modale" v-if="showIsModalText">
          <div   class="overlay">
            <div class="modale card" >
            
                <h5 class="modal-title ml-3" id="exampleModalLabel">Enrégistrement du titre </h5>
            
                <div class="modal-body">
              <form>
              <div class="form-group">
  
            
          </div>
          <div class="form-group">
            <label for="recipient-name" class="col-form-label">Libelle </label>
             <span style="color:red; font-style:italic;"
              v-if="$v.Text.libelle.$error && !$v.Text.libelle.required"
              role="alert">
              <span style="color:red;">*</span> &nbsp;
              Ce champs est obligatoire!
            </span>      
            <input type="text" class="form-control" id="recipient-name" placeholder="Entrer le titre"
                @input="$v.Text.libelle.$touch()" v-model="Text.libelle">
          </div>
              
              <button   @click.prevent="AjouterText" type="submit" class="btn btn-primary ml-5">Valider</button>
              &nbsp;
              <button @click.prevent="annulerText" type="submit" class="btn btn-warning">Annuler</button>
              &nbsp;
              <button @click.prevent="fermerText" class="btn btn-danger">Fermer</button>

            
              </form>
            </div>
            
                
              </div>
            </div>
        </div>
        </div>
        </div>
    <!-- Fin Modal envoi Text -->

    <!-- debut  Modal envoi de Text -->
      <div class="row">
        <div class="col">
      <div class="bloc-modale" v-if="showIsModal">
          <div   class="overlay">
            <div class="modale card" >
            
                <h5 class="modal-title ml-3" id="exampleModalLabel">Enrégistrement du titre </h5>
            
                <div class="modal-body">
              <form>
           
                  <div class="form-group">
                      <label for="niveau">Choisir le titre </label>
                       <span style="color:red; font-style:italic;"
                          v-if="$v.editText.livret_id.$error && !$v.editText.livret_id.required"
                          role="alert">
                          <span style="color:red;">*</span> &nbsp;
                          Ce champs est obligatoire!
                        </span> 
                       <select class="form-control" id="classe" 
                       v-model="editText.livret_id" @input="$v.editText.livret_id.$touch()" >
                          <option value="">Choisir la classe</option>
                          <option v-for="item in gettersLivret" :key="item.id" :value="item.id"> 
                              {{item.libelle}} </option>
                                              
                      </select>
                  </div>
       

                <div class="form-group">
                  <label for="recipient-name" class="col-form-label">Libelle </label>
                  <span style="color:red; font-style:italic;"
                    v-if="$v.editText.libelle.$error && !$v.editText.libelle.required"
                    role="alert">
                    <span style="color:red;">*</span> &nbsp;
                    Ce champs est obligatoire!
                  </span>      
                  <input type="editText" class="form-control" id="recipient-name" placeholder="Entrer le titre"
                      @input="$v.editText.libelle.$touch()" v-model="editText.libelle">
                </div>
              
              <button   @click.prevent="ModifierLivret" type="submit" class="btn btn-primary ml-5">Valider</button>
              &nbsp;
              
              <button @click.prevent="fermerLivret" class="btn btn-danger">Fermer</button>

            
              </form>
            </div>
            
                
              </div>
            </div>
        </div>
        </div>
        </div>
    <!-- Fin Modal envoi Text -->
           <notifications  />
  </div>
</template>

<script>

// import moment from "moment"
import {mapGetters, mapActions} from "vuex";
import {required} from "vuelidate/lib/validators";
import moment from "moment"
// import Entete from "../Entete.vue"

// const random = () => {
//   return parseInt(Date.now() + Math.random() * 10000).toString(20).slice(-6)
// }
export default {
  components: {  },
    data(){
        return{
          showIsModalText: false,
          NoteGroupe:[],
          showIsModal: false,
          formData:{
           
            libelle:"",
            livret_id:""
            
          },
          Text:{
            libelle:""
          }
        
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
      
    },

   validations:{
        formData:{
            
          
            livret_id:{required},
            libelle:{required},
        },
        Text:{
            libelle:{required},
        },
        editText:{
            libelle:{required},
            livret_id:{required}
        }
    },
     computed:{
     ...mapGetters("parametres",["gettersNiveau", "gettersClasse", "gettersTrimestre", "gettersMatiere",
     "gettersLivret", "gettersConfiglivret"]),
     ...mapGetters("student",["GetterStudent"]),

       verifcode() {
      if (this.formData.libelle == "") {
        return false;
      } else {
        let Objet = this.gettersConfiglivret.filter(
          (element) => element.libelle == this.formData.libelle
        );
        if (Objet.length != 0 && Objet != undefined) {
          return Objet.length;
        } else {
          return false;
        }
      }
    },

LibLivret(){
    return (id)=>{
        if(id != ''){
            let test = this.gettersLivret.find(tem=>tem.id == id)
            if(test){
                return test.libelle.toUpperCase()
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
                   "getTrimestre","getMatiere","AjouterLivret","getLivret","getConfigLivret", "AjouterConfigLivret",
                   "SupprimerConfigLivret", "ModifierConfigLivret"]),
     ...mapActions("student",["get_all_student","AjouterEleve", "ModifierEleve","SupprimerEleve","AjouterNote", "ModifierNote"]),

     ModificationEleve(id){
        this.$router.push({ name:"editStudent", params:{id:id}})
     },
     DetailEleves(id){
        this.$router.push({ name:"DetailEleve", params:{id:id}})
     },

      Modification(id){
        this.showIsModal = true,
        this.editText = this.gettersConfiglivret.find(tem =>tem.id == id)
      },
       annulerText(){
         this.$v.Text.$reset();
           this.libelle.date=""
           
        },
        fermerText(){
         this.$v.Text.$reset();
           this.Text.libelle="",
          
           this.showIsModalText = false
        },
        ShowModalText(){
        this.showIsModalText = true
      },
       fermerLivret(){
        this.$v.editText.$reset();
                  
          this.showIsModal = false,
          this.getConfigLivret()
        },
         annuler(){
        this.$v.formData.$reset();
         this.formData.libelle="",           
         this.formData.livret_id=""           
               
           
        },
  

        AjouterFonctionLocal(){
             this.$v.formData.$touch();
            if(this.$v.formData.$error) {
                return
            }
       
          this.AjouterConfigLivret(this.formData)
          this.$v.formData.$reset();
             this.formData={
                livret_id:"",
               
                libelle:"",
               
          }
        },
        ModifierLivret(){
             this.$v.editText.$touch();
            if(this.$v.editText.$error) {
                return
            }
       
          this.ModifierConfigLivret(this.editText)
          this.$v.editText.$reset();
           this.showIsModal = false
            
        },
        AjouterText(){
             this.$v.Text.$touch();
            if(this.$v.Text.$error) {
                return
            }
         
          this.AjouterLivret(this.Text)
          this.$v.Text.$reset();
             this.Text.date=""
          
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
        padding: 40px;
        position: fixed;
        top: 15%;
        width:30%;
        margin-right: 50%;
        left: 33%;
}

 .close{
  position: absolute;
  top: 10px;
  right: 10px;
}
.bars{
    width: 100%;
    height: 2px;
    /* margin-left: 30px; */
     border: 1px solid #000;
    
}
</style>