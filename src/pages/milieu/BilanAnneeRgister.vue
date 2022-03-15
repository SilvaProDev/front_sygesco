<template>
  <div class="container m-3">
    <h2 class="ml-5">Configuration du bilan de l'année</h2>
    

    <div class="card-body">
                <div class="row">
                          <div class="col-6 col-md-3">
                  <div class="form-group" >
                      <label for="niveau">Année  </label>
                         <span style="color:red; font-style:italic;"
                                v-if="$v.formData.annee.$error && !$v.formData.annee.required"
                                role="alert">
                                <span style="color:red;">*</span> &nbsp;
                                Champ obligatoire!
                        </span>
                        <select class="form-control" id="niveau" @input="$v.formData.annee.$touch()" v-model="formData.annee" >
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
                <div class="form-group">
                    <label for="slogan">Niveau </label>
                    <span style="color:red; font-style:italic;"
                        v-if="$v.formData.niveau.$error && !$v.formData.niveau.required"
                        role="alert">
                        <span style="color:red;">*</span> &nbsp;
                        Champ obligatoire!
                        </span> 
                     <select class="form-control" id="classe" v-model="formData.niveau"  >
                          <option value="">Selectionner le niveau</option>
                          <option value="CEPE"> CEPE </option>
                          <option value="BEPC"> BEPC </option>
                          <option value="BAC"> BAC </option>
                                              
                      </select>
                </div>
            </div>
                <div class="col-sm-4 ">
                    <h6 class="mb-2">Titre</h6> 
                    <span style="color:red; font-style:italic;"
                    v-if="$v.formData.titre.$error && !$v.formData.titre.required"
                    role="alert">
                    <span style="color:red;">*</span> &nbsp;
                    Champ obligatoire!
                    </span> 
                    <input type="text" class="form-control" placeholder="Entrer le libellé de la session"
                    @input="$v.formData.titre.$touch()" v-model="formData.titre">
                </div>
            </div>
            <div class="row mr-5">  
                 <span style="color:red; font-style:italic;" v-if="verifie1 == false"      
                    role="alert">
                    <span style="color:red;">*</span> &nbsp;
                    Les nombres saisis ne sont pas identiques
                 </span> 
            <div class="col-6 col-md-3">
                <div class="form-group">
                    <label for="slogan">Candidats Inscrits </label>
                    <span style="color:red; font-style:italic;"
                        v-if="$v.formData.candidat_inscrit.$error && !$v.formData.candidat_inscrit.required"
                        role="alert">
                        <span style="color:red;">*</span> &nbsp;
                        Champ obligatoire!
                        </span> 
                    <input  type="number" class="form-control" id="candidat_inscrit" aria-describedby="candidat_inscrit"
                    placeholder="Nombre de candidat inscrits" @input="$v.formData.candidat_inscrit.$touch()" v-model="formData.candidat_inscrit">
                </div>
            </div>
                  
            <div class="col-6 col-md-3">
                <div class="form-group"> 
                <label for="contact">Garçons</label>
                    <span style="color:red; font-style:italic;"
                    v-if="$v.formData.garcon_inscrit.$error && !$v.formData.garcon_inscrit.required"
                    role="alert">
                    <span style="color:red;">*</span> &nbsp;
                    Champ obligatoire!
                    </span> 
                    <input  type="number" class="form-control" id="garcon_inscrit" aria-describedby="garcon_inscrit"
                    placeholder="Nombre de garçons" @input="$v.formData.garcon_inscrit.$touch()" v-model="formData.garcon_inscrit">
                </div>
                
            </div>
            <div class="col-6 col-md-3">
            <div class="form-group">                     
                <label for="email">Filles </label>
                <span style="color:red; font-style:italic;"
                    v-if="$v.formData.fille_inscrit.$error && !$v.formData.fille_inscrit.required"
                    role="alert">
                    <span style="color:red;">*</span> &nbsp;
                    Champ obligatoire!
                </span> 
                    <input  type="number" class="form-control" id="fille_inscrit" aria-describedby="fille_inscrit"
                    placeholder="Nombre de filles" @input="$v.formData.fille_inscrit.$touch()" v-model="formData.fille_inscrit">
            </div>                  
             </div>                     
         </div>
         
         <div class="row mr-5"> 
              <span style="color:red; font-style:italic;" v-if="verifie2 == false"      
                    role="alert">
                    <span style="color:red;">*</span> &nbsp;
                    Les nombres saisis ne sont pas identiques
                 </span>  
            <div class="col-6 col-md-3">
                    <div class="form-group">
                        <label for="slogan">Candidats Présents </label>
                        <span style="color:red; font-style:italic;"
                            v-if="$v.formData.candidat_present.$error && !$v.formData.candidat_present.required"
                            role="alert">
                            <span style="color:red;">*</span> &nbsp;
                            Champ obligatoire!
                         </span> 
                        <input  type="number" class="form-control" id="candidat_present" aria-describedby="candidat_present"
                        placeholder="Nombre de candidat présents " @input="$v.formData.candidat_present.$touch()" v-model="formData.candidat_present">
                    </div>

                </div>
                  
            <div class="col-6 col-md-3">
                <div class="form-group"> 
                <label for="contact">Garçons</label>
                    <span style="color:red; font-style:italic;"
                    v-if="$v.formData.garcon_present.$error && !$v.formData.garcon_present.required"
                    role="alert">
                    <span style="color:red;">*</span> &nbsp;
                    Champ obligatoire!
                    </span> 
                    <input  type="number" class="form-control" id="garcon_present" aria-describedby="garcon_present"
                    placeholder="Nombre de garçons présents" @input="$v.formData.garcon_present.$touch()" v-model="formData.garcon_present">
                </div>
                
            </div>
            <div class="col-6 col-md-3">
            <div class="form-group">                     
                <label for="email">Filles </label>
                <span style="color:red; font-style:italic;"
                    v-if="$v.formData.fille_present.$error && !$v.formData.fille_present.required"
                    role="alert">
                    <span style="color:red;">*</span> &nbsp;
                    Champ obligatoire!
                </span> 
                    <input  type="number" class="form-control" id="fille_present" aria-describedby="fille_present"
                    placeholder="Nombre de garçons présentes" @input="$v.formData.fille_present.$touch()" v-model="formData.fille_present">
            </div>                  
             </div>                     
         </div>

         <div class="row mr-5">  
              <span style="color:red; font-style:italic;" v-if="verifie3 == false"      
                    role="alert">
                    <span style="color:red;">*</span> &nbsp;
                    Les nombres saisis ne sont pas identiques
                 </span> 
            <div class="col-6 col-md-3">
                    <div class="form-group">
                        <label for="slogan">Candidats Absents </label>
                        <span style="color:red; font-style:italic;"
                            v-if="$v.formData.candidat_absent.$error && !$v.formData.candidat_absent.required"
                            role="alert">
                            <span style="color:red;">*</span> &nbsp;
                            Champ obligatoire!
                         </span> 
                        <input  type="number" class="form-control" id="candidat_absent" aria-describedby="candidat_absent"
                        placeholder="Nombre de candidat absents" @input="$v.formData.candidat_absent.$touch()" v-model="formData.candidat_absent">
                    </div>

                </div>
                  
            <div class="col-6 col-md-3">
                <div class="form-group"> 
                <label for="contact">Garçons</label>
                    <span style="color:red; font-style:italic;"
                    v-if="$v.formData.garcon_absent.$error && !$v.formData.garcon_absent.required"
                    role="alert">
                    <span style="color:red;">*</span> &nbsp;
                    Champ obligatoire!
                    </span> 
                    <input  type="number" class="form-control" id="garcon_absent" aria-describedby="garcon_absent"
                    placeholder="Nombre de garçons absents" @input="$v.formData.garcon_absent.$touch()" v-model="formData.garcon_absent">
                </div>
                
            </div>
            <div class="col-6 col-md-3">
            <div class="form-group">                     
                <label for="email">Filles </label>
                <span style="color:red; font-style:italic;"
                    v-if="$v.formData.fille_absent.$error && !$v.formData.fille_absent.required"
                    role="alert">
                    <span style="color:red;">*</span> &nbsp;
                    Champ obligatoire!
                </span> 
                    <input  type="number" class="form-control" id="fille_absent" aria-describedby="fille_absent"
                    placeholder="Nombre de filles absentes" @input="$v.formData.fille_absent.$touch()" v-model="formData.fille_absent">
            </div>                  
             </div>                     
         </div>
        <!-- <hr> -->
         <div class="row mr-5">  
              <span style="color:red; font-style:italic;" v-if="verifie4 == false"      
                    role="alert">
                    <span style="color:red;">*</span> &nbsp;
                    Les nombres saisis ne sont pas identiques
                 </span> 
            <div class="col-6 col-md-3">
                    <div class="form-group">
                        <label for="slogan">Candidats Admis </label>
                        <span style="color:red; font-style:italic;"
                            v-if="$v.formData.candidat_admis.$error && !$v.formData.candidat_admis.required"
                            role="alert">
                            <span style="color:red;">*</span> &nbsp;
                            Champ obligatoire!
                         </span> 
                        <input  type="number" class="form-control" id="candidat_admis" aria-describedby="candidat_admis"
                        placeholder="Nombre de candidat admis" @input="$v.formData.candidat_admis.$touch()" v-model="formData.candidat_admis">
                    </div>

                </div>
                  
            <div class="col-6 col-md-3">
                <div class="form-group"> 
                <label for="contact">Garçons</label>
                    <span style="color:red; font-style:italic;"
                    v-if="$v.formData.garcon_admis.$error && !$v.formData.garcon_admis.required"
                    role="alert">
                    <span style="color:red;">*</span> &nbsp;
                    Champ obligatoire!
                    </span> 
                    <input  type="number" class="form-control" id="garcon_admis" aria-describedby="garcon_admis"
                    placeholder="Nombre de garçons admis" @input="$v.formData.garcon_admis.$touch()" v-model="formData.garcon_admis">
                </div>
                
            </div>
            <div class="col-6 col-md-3">
            <div class="form-group">                     
                <label for="email">Filles </label>
                <span style="color:red; font-style:italic;"
                    v-if="$v.formData.fille_admis.$error && !$v.formData.fille_admis.required"
                    role="alert">
                    <span style="color:red;">*</span> &nbsp;
                    Champ obligatoire!
                </span> 
                    <input  type="number" class="form-control" id="fille_admis" aria-describedby="fille_admis"
                    placeholder="Nombre de filles abmises" @input="$v.formData.fille_admis.$touch()" v-model="formData.fille_admis">
            </div>                  
             </div>                     
         </div>
        <!-- <hr> -->
         <div class="row mr-5">  
              <span style="color:red; font-style:italic;" v-if="verifie5 == false"      
                    role="alert">
                    <span style="color:red;">*</span> &nbsp;
                    Les nombres saisis ne sont pas identiques
                 </span> 
            <div class="col-6 col-md-3">
                    <div class="form-group">
                        <label for="slogan">Taux de reussite </label>
                        <span style="color:red; font-style:italic;"
                            v-if="$v.formData.taux_candidat.$error && !$v.formData.taux_candidat.required"
                            role="alert">
                            <span style="color:red;">*</span> &nbsp;
                            Champ obligatoire!
                         </span> 
                        <input  type="number" class="form-control" id="taux_candidat" aria-describedby="taux_candidat"
                        placeholder="Entrer le taux de reuissite " @input="$v.formData.taux_candidat.$touch()" v-model="formData.taux_candidat">
                    </div>

                </div>
                  
            <div class="col-6 col-md-3">
                <div class="form-group"> 
                <label for="contact">Garçons</label>
                    <span style="color:red; font-style:italic;"
                    v-if="$v.formData.taux_garcon.$error && !$v.formData.taux_garcon.required"
                    role="alert">
                    <span style="color:red;">*</span> &nbsp;
                    Champ obligatoire!
                    </span> 
                    <input  type="number" class="form-control" id="taux_garcon" aria-describedby="taux_garcon"
                    placeholder="Entrer le taux de reuissite garçons" @input="$v.formData.taux_garcon.$touch()" v-model="formData.taux_garcon">
                </div>
                
            </div>
            <div class="col-6 col-md-3">
            <div class="form-group">                     
                <label for="email">Filles </label>
                <span style="color:red; font-style:italic;"
                    v-if="$v.formData.taux_fille.$error && !$v.formData.taux_fille.required"
                    role="alert">
                    <span style="color:red;">*</span> &nbsp;
                    Champ obligatoire!
                </span> 
                    <input  type="number" class="form-control" id="taux_fille" aria-describedby="taux_fille"
                    placeholder="Entrer le taux de reuissite filles" @input="$v.formData.taux_fille.$touch()" v-model="formData.taux_fille">
            </div>                  
             </div>                     
         </div>
           
  <div  class="row">
      <div class="col-6 col-md-3">

        <button style="margin-left:55%"  @click.prevent="annuler" type="submit" class="btn btn-warning">Annuler</button>
      </div>
      <div class="col-6 col-md-3">
        <button :disabled="verifie1 == false || verifie2 == false || verifie3 == false || verifie4 == false || verifie5 == false" @click.prevent="AjouterFonctionLocal" class="form-control btn btn-info">Enrégistrer</button>
      </div>


          </div>     
    
    </div>
     
     
    
    <notifications/>
  </div>
</template>

<script>
import {required} from "vuelidate/lib/validators";
import {mapGetters, mapActions} from "vuex";
export default {

data(){
    return {
        formData:{
            titre:"",
            annee:"",
            niveau:"",

            candidat_inscrit:"",
            garcon_inscrit:"",
            fille_inscrit:"",

            candidat_present:"",
            garcon_present:"",
            fille_present:"",

            candidat_absent:"",
            garcon_absent:"",
            fille_absent:"",

            candidat_admis:"",
            garcon_admis:"",
            fille_admis:"",

            taux_candidat:"",
            taux_garcon:"",
            taux_fille:"",
            
        },
        selectedFile:""
    }
},
created(){
    this.getconfigEntete();
    this.getBilan();
},
  validations:{
        formData:{
            
            titre:{required},
            annee:{required},
            niveau:{required},
            
             candidat_inscrit:{required},
            garcon_inscrit:{required},
            fille_inscrit:{required},

            candidat_present:{required},
            garcon_present:{required},
            fille_present:{required},

            candidat_absent:{required},
            garcon_absent:{required},
            fille_absent:{required},

            candidat_admis:{required},
            garcon_admis:{required},
            fille_admis:{required},

            taux_candidat:{required},
            taux_garcon:{required},
            taux_fille:{required},
        }
    },
    computed:{

          ...mapGetters("parametres",["gettersNiveau", "gettersClasse", "gettersMatiere","gettersTrimestre", "gettersAnne",
        "gettersTransport","gettersconfigEntete","gettersBilan" ]),
        ...mapGetters("student",["GetterStudent", "GetterCantine", "GetterScolarite", "GetterAbsence"]),
    
        verifie1(){
            if(this.formData.candidat_inscrit != "" && this.formData.garcon_inscrit != "" && this.formData.fille_inscrit != "")
            {
                let som1 = parseInt(this.formData.garcon_inscrit) + parseInt(this.formData.fille_inscrit)
                if(som1 < parseInt(this.formData.candidat_inscrit)){
                    return false
                }else if(som1 > parseInt(this.formData.candidat_inscrit)){
                    return false
                }
            }
            return true
        },
        verifie2(){
            if(this.formData.candidat_present != "" && this.formData.garcon_present != "" && this.formData.fille_present != "")
            {
                let som1 = parseInt(this.formData.garcon_present) + parseInt(this.formData.fille_present)
                if(som1 < parseInt(this.formData.candidat_present)){
                    return false
                }else if(som1 > parseInt(this.formData.candidat_present)){
                    return false
                }
            }
            return true
        },
        verifie3(){
            if(this.formData.candidat_absent != "" && this.formData.garcon_absent != "" && this.formData.fille_absent != "")
            {
                let som1 = parseInt(this.formData.garcon_absent) + parseInt(this.formData.fille_absent)
                if(som1 < parseInt(this.formData.candidat_absent)){
                    return false
                }else if(som1 > parseInt(this.formData.candidat_absent)){
                    return false
                }
            }
            return true
        },
        verifie4(){
            if(this.formData.candidat_admis != "" && this.formData.garcon_admis != "" && this.formData.fille_admis != "")
            {
                let som1 = parseInt(this.formData.garcon_admis) + parseInt(this.formData.fille_admis)
                if(som1 < parseInt(this.formData.candidat_admis)){
                    return false
                }else if(som1 > parseInt(this.formData.candidat_admis)){
                    return false
                }
            }
            return true
        },
        verifie5(){
            if(this.formData.taux_candidat != "" && this.formData.taux_garcon != "" && this.formData.taux_fille != "")
            {
                let som1 = parseInt(this.formData.taux_garcon) + parseInt(this.formData.taux_fille)
                if(som1 < parseInt(this.formData.taux_candidat)){
                    return false
                }else if(som1 > parseInt(this.formData.taux_candidat)){
                    return false
                }
            }
            return true
        },

    },

    methods:{
        ...mapActions("parametres",["getNiveau","AjouterNiveau", "ModifierNiveau","SupprimerNiveau","getClasse", 
        "AjouterconfigEntete", "getconfigEntete", "SupprimerconfigEntete","AjouterBilan","getBilan"]),
         ...mapActions("student",["get_all_student","AjouterEleve", "ModifierEleve","SupprimerEleve","ImporterEleve"]),

       

   

        AjouterFonctionLocal(){
         this.$v.formData.$touch();
            if(this.$v.formData.$error) {
                return
            }
            let obj ={
              ...this.formData,
            }
            this.AjouterBilan(obj)
            this.$v.formData.$reset();
           this.annuler()
    },



           annuler(){
           this.$v.formData.$reset();

             this.formData.titre="",  
             this.formData.niveau="",  
             this.formData.annee="",  
             this.formData.candidat_inscrit="",  
             this.formData.garcon_inscrit="",  
             this.formData.fille_inscrit=""

             this.formData.candidat_present="",  
             this.formData.garcon_present="",  
             this.formData.fille_present=""

             this.formData.candidat_absent="",  
             this.formData.garcon_absent="",  
             this.formData.fille_absent=""

             this.formData.candidat_admis="",  
             this.formData.garcon_admis="",  
             this.formData.fille_admis=""

             this.formData.taux_candidat="",  
             this.formData.taux_garcon="",  
             this.formData.taux_fille=""
            
           
          },

          FonctionModifier(id){
              this.$router.push({
                  name:"EnteteConfigMod", params:{id: id}
              })
          }
    }
}
</script>

<style scoped>
/* table{
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
     border: 1px solid #000;
    
} */
    .flashit{
    background-color:rgb(245, 77, 11);
	-webkit-animation: flash linear 1s infinite;
	animation: flash linear 1s infinite;
}
</style>