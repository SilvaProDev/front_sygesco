<template>
  <div>
      <div class="bloc-modale" v-if="isModaleVisible">
          <div class="overlay">
              <div class="modale card">
                 
                  <h4>Enrégistrement de l'année scolaire</h4>
                   <span v-if="compare_date_debut_fin ==false" style="color:red; font-style:italic; font-size:12px;">
                        La date de debut ne doit pas être supérieure à la date de fin
                    </span>
                <form action="" method="post">
                    <div class="form-group">
                    <label for="nom">Année de debut<span style="color:red; font-weight:bold">*</span> </label>
                     <span style="color:red; font-style:italic;"
                        v-if="$v.formData.debut_annee.$error && !$v.formData.debut_annee.required"
                        role="alert">Ce champs est obligatoire!
                     </span>
                    <input type="text" @input="$v.formData.debut_annee.$touch()" v-model="formData.debut_annee" class="form-control" id="debut_annee" aria-describedby="emailHelp"
                    placeholder="Entrer l'année">

                     <div style="color:red;" v-if="!$v.formData.debut_annee.minLength">Minimum {{$v.formData.debut_annee.$params.minLength.min}} letters.</div>
                    <div style="color:red;" v-if="!$v.formData.debut_annee.maxLength">Maximum {{$v.formData.debut_annee.$params.maxLength.max}} letters.</div>
                    
                    </div>
                    <div class="form-group">
                    <label for="nom">Année de fin<span style="color:red; font-weight:bold">*</span> </label>
                     <span style="color:red; font-style:italic;"
                        v-if="$v.formData.fin_annee.$error && !$v.formData.fin_annee.required"
                        role="alert">Ce champs est obligatoire!
                     </span>
                    <input type="text" @input="$v.formData.fin_annee.$touch()" v-model="formData.fin_annee" class="form-control" id="fin_annee" aria-describedby="emailHelp"
                    placeholder="Entrer l'année">

                     <div style="color:red;" v-if="!$v.formData.fin_annee.minLength">Minimum {{$v.formData.fin_annee.$params.minLength.min}} letters.</div>
                    <div style="color:red;" v-if="!$v.formData.fin_annee.maxLength">Maximum {{$v.formData.fin_annee.$params.maxLength.max}} letters.</div>
    
                    
                    </div>

                    <div class="form-group">
                            <label for="nom">Date debut <span style="color:red; font-weight:bold">*</span> </label>
                        <span style="color:red; font-style:italic;"
                            v-if="$v.formData.date_debut.$error && !$v.formData.date_debut.required"
                            role="alert">Ce champs est obligatoire!
                        </span>
                            <input type="date" @input="$v.formData.date_debut.$touch()" v-model="formData.date_debut" class="form-control" id="nom" aria-describedby="emailHelp"
                            placeholder="Date debut">
                        <span v-if="verifie_date_debut !=1" style="color:red; font-style:italic; font-size:12px;">
                        L'année de la date de debut ne correspont pas à celle de l'année début
                        </span>
                    </div>
                    <div class="form-group">
                        <label for="nom">Date de fin <span style="color:red; font-weight:bold">*</span> </label>
                        <span style="color:red; font-style:italic;"
                            v-if="$v.formData.date_fin.$error && !$v.formData.date_fin.required"
                            role="alert">Ce champs est obligatoire!
                        </span>
                        <input type="date" @input="$v.formData.date_fin.$touch()" v-model="formData.date_fin" class="form-control" id="nom" aria-describedby="emailHelp"
                        placeholder="Date de fin">
                        <span v-if="verifie_date_fin !=1" style="color:red; font-style:italic; font-size:12px;">
                        L'année de la date de fin ne correspont pas à celle de l'année de fin
                    </span>
                    </div>

                    <input type="hidden" v-model="verifie_date_debut">
                    <!-- <input type="hidden" v-model="recupanneefin"> -->
                     <button  :disabled="active" @click.prevent="AjouterFonctionLocal" type="submit" class="btn btn-primary">Enrégistrer</button>
                     &nbsp;
                     <button @click.prevent="annuler" type="submit" class="btn btn-warning">Annuler</button>
                     &nbsp;
                     <button @click.prevent="toggleModale" class="btn btn-danger">Fermer</button>
                </form>
                  
              </div>
          </div>
      </div>
     <notifications  />
  </div>
</template>

<script>
import {mapGetters, mapActions} from "vuex";
import {required, minLength, maxLength} from "vuelidate/lib/validators";
export default {
    name:"Modale",
    props:["isModaleVisible","toggleModale"],
    components:{

    },
    data(){
        return{
            formData:{
                debut_annee:"",
                fin_annee:"",
                date_debut:"",
                date_fin:"",
            }
        }
    },
    validations:{
        formData:{
             debut_annee:{
                 required,
                 minLength: minLength(4),
                 maxLength: maxLength(4),
             },
             fin_annee:{
                 required,
                 minLength: minLength(4),
                 maxLength: maxLength(4),
             },
            date_debut:{required},
            date_fin:{required},
        }
    },
    computed:{
         ...mapGetters("parametres",["gettersAnne"]),

        active(){
            return (this.verifie_date_debut !=1 || this.verifie_date_fin !=1 || this.compare_date_debut_fin == false)
        },
        verifie_date_debut(){
            if(this.formData.debut_annee !="" && this.formData.date_debut != ""){
                let ladate = new Date(this.formData.date_debut)
                if(ladate.getFullYear() == this.formData.debut_annee){
                    return 1
                }
                return 0
            }
            return 1
        },
        verifie_date_fin(){
            if(this.formData.fin_annee !="" && this.formData.date_fin != ""){
                let ladate = new Date(this.formData.date_fin)
                if(ladate.getFullYear() == this.formData.fin_annee){
                    return 1
                }
                return 0
            }
            return 1
        },
        compare_date_debut_fin(){
            let vm = this
            if(!vm.formData.date_debut) return true
            if(!vm.formData.date_fin) return true
            const date1 = new Date(vm.formData.date_debut)
            const date2 = new Date(vm.formData.date_fin)
            if(date1 > date2){
                return false
            }
            return true
        },
    },
    methods:{
         ...mapActions("parametres",["getAnnee","AjouterAnnee"]),
        annuler(){
        this.$v.formData.$reset();
         this.formData = {
            annee: "",
              date_debut: "",
              date_fin: "",
            };
        },
        toggleModales(){
        this.$v.formData.$reset();
         this.formData = {
            annee: "",
              date_debut: "",
              date_fin: "",
            };
            this.toggleModale
        },
        AjouterFonctionLocal(){
             this.$v.formData.$touch();
            if(this.$v.formData.$error) {
                return
            }
            console.log(this.formData)
            this.AjouterAnnee(this.formData);
            this.$v.formData.$reset();
         this.formData = {
            annee: "",
              date_debut: "",
              date_fin: "",
            };
           this.toggleModale()
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
    .overlay{
        background: rgba(0, 0, 0, 0.5);
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;      
    }
    .modale{
        background: #f1f1f1;
        color: #333;
        padding: 30px;
        position: fixed;
        top: 15%;
        left: 40%;
    }
    .btn-modale{
        position:absolute;
        top: 8px;
        right: 8px;
        padding: 0 5px;
    }
</style>

