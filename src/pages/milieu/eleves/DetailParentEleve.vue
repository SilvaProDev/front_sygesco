<template>
  <div>
    <Loader :isVisible="loadingData"/>
      <div class="container ml-3">
        <div class="row">
          <div class="col">

          
        <h2>Detail de l'eleve</h2>
      <hr>
        <button type="button" class="btn btn-primary" @click.prevent="genererEnPdf()"
        v-if="getterProfileUsers.length !=0 && getterProfileUsers.role_id ==1 || getterProfileUsers.role_id ==4">Imprimer
        </button>
        &nbsp;&nbsp;
        <button type="button" class="btn btn-success" @click.prevent="retour()"
        v-if="getterProfileUsers.length !=0 && getterProfileUsers.role_id ==4">Retour
        </button>
        <!-- &nbsp;
        <button type="button" class="btn btn-secondary">Nouvelle Photo</button> -->
        &nbsp;
        <button  @click.prevent="ModificationEleve(editText.id)" type="button" class="btn btn-success"
        v-if="getterProfileUsers.length !=0 && getterProfileUsers.role_id ==1">Modifier les infos</button>
        &nbsp;
        <button type="button" class="btn btn-danger" @click.prevent="ShowModalAbsence(editText.id)"
        v-if="getterProfileUsers.length !=0 && getterProfileUsers.role_id ==1">Notifier une absence</button>
        &nbsp;
        <button type="button" class="btn btn-warning" @click.prevent="ShowModalScolarite(editText.id)"
        v-if="getterProfileUsers.length !=0 && getterProfileUsers.role_id ==1">Payer la scolarité</button> 
        &nbsp;
        <button type="button" class="btn btn-info"  @click.prevent="ShowModalSMS(editText.id)"
        v-if="getterProfileUsers.length !=0 && getterProfileUsers.role_id ==1">Envoi sms</button>
        &nbsp;
        <button @click.prevent="DetailNote(editText.id)" type="button" class="btn btn-success" 
        v-if="getterProfileUsers.length !=0 && getterProfileUsers.role_id ==1">Note </button>
        &nbsp;
        <button type="button" class="btn btn-primary"  @click.prevent="BulletinEleve(editText.id)"
        v-if="getterProfileUsers.length !=0 && getterProfileUsers.role_id ==4">Bulletin</button>
         &nbsp;
        <button type="button" class="btn btn-danger"  @click.prevent="ShowModal(editText.id)"
        v-if="getterProfileUsers.length !=0 && getterProfileUsers.role_id ==1"> Payer la cantine</button> <br><br>
         &nbsp;
        
        <button type="button" class="btn btn-primary" @click.prevent="ShowModalEmail(editText.id)"
        v-if="getterProfileUsers.length !=0 && getterProfileUsers.role_id ==1">Envoi de email</button> &nbsp;
         
        <button type="button" class="btn btn-warning" @click.prevent="ShowModalTransport(editText.id)" 
        v-if="getterProfileUsers.length !=0 && getterProfileUsers.role_id ==1">Payer le transport</button> 
        <hr>
        
        <h5>INFORMATION GENERALE DE L'ELEVE</h5> 
        <div id="printMe" ref="table" style="!important" class="col">
            <div class="row" id="printMe">
              <div class="col-md-6">
                <div class="col-6 col-md-6">
                 <div>
                   <span> <span style="color:#000; font-weight:bold"> Nom:</span> {{editText.nom}} </span> <br>
                   <span> <span style="color:#000; font-weight:bold"> Prénom:</span> {{editText.prenom}} </span> <br>
                   <span> <span style="color:#000; font-weight:bold"> Sexe:</span> {{editText.sexe}} </span> <br>
                   <span> <span style="color:#000; font-weight:bold"> Date de naissance:</span> {{formaterDate3(editText.date_naissance)}} </span> <br>
                   <span> <span style="color:#000; font-weight:bold"> N°Matricule:</span> {{editText.matricule}} </span> <br>
                   <span> <span style="color:#000; font-weight:bold"> Classe:</span> {{LibelleClasse(editText.classe_id)}} </span> <br>
                   <span> <span style="color:#000; font-weight:bold"> Orienté:</span> {{editText.oriente}} </span> <br>
                   <span> <span style="color:#000; font-weight:bold"> Nationalité:</span> {{editText.nationalite}} </span> <br>
                  
                 </div>
              </div>
             
              </div>         
              <div class="col-md-6">
                <span v-if="editText.photo != 'vide'">
                    <img :src="editText.photo" alt="" width="110px;" height="100px;">
                  
                </span> 
                <span v-else>
                    <img :src="url" alt="" width="120px;" height="120px;">
                  
                </span> 
                  
                  <br> <br>
                
               <span> <span style="color:#000; font-weight:bold"> Adresse:</span> {{editText.adresse}} </span> <br>
               <span> <span style="color:#000; font-weight:bold"> Maladie particulière:</span> {{editText.maladie}} </span> <br>
               
              </div>         
              
            </div>
            <hr>
            <div class="row" id="printMe">
              <div class="col-md-6">
                <div class="col-6 col-md-6">
                 <div>
                   <span> <span style="color:#000; font-weight:bold"> Père:</span> {{editText.nom_pere}} </span> <br>
                
                   <span> <span style="color:#000; font-weight:bold"> Mère:</span> {{editText.nom_mere}}  </span> <br>
                  
                   <span> <span style="color:#000; font-weight:bold"> Tuteur (trice):</span> {{editText.nom_tuteur}} </span> <br>
                   <span> <span style="color:#000; font-weight:bold"> Contact du tuteur:</span> {{editText.contact_tuteur}} </span> <br>
                   <span> <span style="color:#000; font-weight:bold"> Email:</span> {{editText.email}} </span> <br>
                   
                 </div>
              </div>
             
              </div>         
              <div class="col-md-6">
                <span style="color:#000; font-weight:bold">Paiement de la scolarité </span> <br> 
                
               <span> <span style="color:#000; font-weight:bold"> Scolarité:   </span> 
                      <span style="color:red; font-weight:bold;"> 
                        {{formatageSomme(parseFloat(editText.scolarite)) }}</span> 
              </span> <br>
               <span> <span style="color:#000; font-weight:bold"> Scolarité payée:</span> 
                  <span style="color:#07EBFC; font-weight:bold;">
                  {{formatageSomme(parseFloat(sommeTotalScolariteParEleve))}}
                  </span>
               </span> <br>
               <span> <span style="color:#000; font-weight:bold"> Reste à payer:</span>
               <span style="color:#FC7207; font-weight:bold">
                {{ formatageSomme(parseFloat(ResteTotalApayerParEleve))}} 

               </span>
                </span> <br> <br>
              

                <h5> {{NbreAbsence}} Absence<span v-if="NbreAbsence > 1">s</span> </h5>
                <span v-for="item in FiltreParAbsence" :key="item.id" :value="item.id">
                <span style="color:#000; font-weight:bold"> {{formaterDate2(item.date)}} =></span>{{LibelleMatiere(MatiereId(item.matiere_id))}} <br>
                 

                </span>
              </div>         
              
            </div>
            <hr>
            <div class="row" id="printMe">
              <div class="col-md-6">
                <div class="col-6 col-md-8">
                 <div>
                  <h5>Cantine journalière</h5>
                    <span v-for="item in CantineParEleve" :key="item.id" :value="item.id">

                 <span style="color:#000; font-weight:bold"> {{formaterDate1(item.date)}} =></span> {{item.montant}} 
                    <a title="Supprimer" href="" @click.prevent="SupprimerCantine(item.id)" >x</a> &nbsp; 
                    </span>
                    <span> 
                  </span> <br>
                  
                  
                  
                 
                   
                 </div>
              </div>
             
              </div>         
              <div class="col-md-6">
                <h5>Transport</h5>
                
               <span v-for="item in FiltreTransportParEleve" :key="item.id" :value="item.id"> 
                <span style="color:#000; font-weight:bold"> {{LibelleTrimestre(item.trimestre_id)}} =></span> {{item.montant}} FCFA &nbsp;
                 <span style="background-color:aqua">Payer</span> <br>
                 <!-- <a title="modifier" href="">x</a>  -->
              </span> <br>
               
              </div>         
              
            </div>
            <p v-if="showMe">Imprimer le <span> date </span> par <span> User</span> </p>
        </div>
        </div>
        </div>
    </div>

      
      <div class="row">
        <div class="col">
      <div class="bloc-modale" v-if="showIsModal">
          <div   class="overlay">
            <div class="modale card" >
                <button class="close" @click="fermer">x</button>
                
                <h5 class="modal-title" id="exampleModalLabel">Paiement de la cantine <span style="color:red;">{{NomPrenom}}</span> </h5>
            
                <div class="modal-body">
              <form>
                <div class="form-group">
        
                  
                </div>
                <div class="form-group">
                        <label for="niveau">Date </label>  
                        <span style="color:red; font-style:italic;"
                              v-if="$v.Cantine.date.$error && !$v.Cantine.date.required"
                              role="alert">
                               &nbsp;
                              Ce champs est obligatoire!
                          </span>                 
                        <input type="date" @input="$v.Cantine.date.$touch()" v-model="Cantine.date" class="form-control" id="recipient-name">
                    </div>
                <div class="form-group">
                  <label for="recipient-name" class="col-form-label">Montant </label> 
                  <span style="color:red; font-style:italic;"
                      v-if="$v.Cantine.montant.$error && !$v.Cantine.montant.required" role="alert">
                      <span style="color:red;">*</span> &nbsp;
                      Ce champs est obligatoire!
                    </span>
                      <money title="Scolarité totale a payer"  v-model="Cantine.montant" @input="$v.Cantine.montant.$touch()" 
                type="text"   class="form-control" ></money> 
                  <!-- <input type="number" @input="$v.Cantine.montant.$touch()" v-model="Cantine.montant" class="form-control" id="recipient-name"> -->
                </div>
              
                <button   @click.prevent="AjoutDeCantine" type="submit" class="btn btn-primary ml-5">Enrégistrer</button>
                      &nbsp;
                      <button @click.prevent="annuler" type="submit" class="btn btn-warning">Annuler</button>
                      &nbsp;
                      <button @click.prevent="fermer" class="btn btn-danger">Fermer</button>

            
              </form>
            </div>
            
                
              </div>
            </div>
        </div>
        </div>
        </div>


      <div class="row">
        <div class="col">
      <div class="bloc-modale" v-if="showIsModalAbsence">
          <div   class="overlay">
            <div class="modale card" >
                <button class="close" @click="fermer">x</button>
                
                <h6 class="modal-title" id="exampleModalLabel">Notification de l'absence de <span style="color:red; font-size:15px;">{{NomPrenom}}</span> </h6>
            
                <div class="modal-body">
              <form>
                 <div class="form-group">
  
              <p><span style="font-weight:bold">Numero tuteur:</span> {{ContactPrent}}</p>
          </div>
           <div class="form-group">
                  <label for="niveau">Matière </label>  
                  <span style="color:red; font-style:italic;"
                        v-if="$v.Absence.matiere_id.$error && !$v.Absence.matiere_id.required"
                        role="alert">
                        <span style="color:red;">*</span> &nbsp;
                        Ce champs est obligatoire!
                     </span>                 
                  <select class="form-control" id="classe" @input="$v.Absence.matiere_id.$touch()" v-model="Absence.matiere_id">
                   <option value="" selected disabled hidden>Choisir la matière</option>
                    <option v-for="item in LibelleMatieres" :key="item.id" :value="item.id">{{LibelleMatiere(item.nouvelle_matiere_id)}}</option>                               
                  </select>
              </div>
          <div class="form-group">
            <label for="recipient-name" class="col-form-label">Date </label> 
            <span style="color:red; font-style:italic;"
                v-if="$v.Absence.date.$error && !$v.Absence.date.required" role="alert">
                <span style="color:red;">*</span> &nbsp;
                Ce champs est obligatoire!
              </span>
            <input type="datetime-local" @input="$v.Absence.date.$touch()" v-model="Absence.date" class="form-control" id="recipient-name">
          </div>
          <div class="form-group">
            <label for="message-text" class="col-form-label">Motif  </label>
            <span style="color:red; font-style:italic;"
              v-if="$v.Absence.motif.$error && !$v.Absence.motif.required" role="alert">
              <span style="color:red;"> *</span> &nbsp;
              Ce champs est obligatoire!
            </span>
            <textarea v-model="Absence.motif" @input="$v.Absence.motif.$touch()" class="form-control" id="message-text"></textarea>
          </div>
              
                <button   @click.prevent="AjouterAbsences" type="submit" class="btn btn-primary ml-5">Enrégistrer</button>
                      &nbsp;
                      <button @click.prevent="annulerAbsence" type="submit" class="btn btn-warning">Annuler</button>
                      &nbsp;
                      <button @click.prevent="fermerAbsence" class="btn btn-danger">Fermer</button>

            
              </form>
            </div>
            
                
              </div>
            </div>
        </div>
        </div>
        </div>
    <!-- debut  Modal envoi de email -->
      <div class="row">
        <div class="col">
      <div class="bloc-modale" v-if="showIsModalEmail">
          <div   class="overlay">
            <div class="modale card" > 
                <h5 class="modal-title" id="exampleModalLabel">Envoi de email </h5>
                  <!-- <span style="color:red;">{{NomPrenom}}</span> </h5>  -->
            
                <div class="modal-body">
              <form enctype="multipart/form-data">
              <div class="form-group">
  
              <p><span style="font-weight:bold">Email tuteur:</span> {{EmailPrent}}</p>
          </div>
          <div class="form-group">
            <label for="recipient-name" class="col-form-label">Date </label>
             <span style="color:red; font-style:italic;"
              v-if="$v.Email.date.$error && !$v.Email.date.required"
              role="alert">
              <span style="color:red;">*</span> &nbsp;
              Ce champs est obligatoire!
            </span>      
            <input type="date" class="form-control" id="recipient-name" 
                @input="$v.Email.date.$touch()" v-model="Email.date">
          </div>
          <div class="form-group">
            <label for="recipient" class="col-form-label">Objet </label>
             <span style="color:red; font-style:italic;"
              v-if="$v.Email.sujet.$error && !$v.Email.sujet.required"
              role="alert">
              <span style="color:red;">*</span> &nbsp;
              Ce champs est obligatoire!
            </span>   
            <input  @input="$v.Email.sujet.$touch()" v-model="Email.sujet" type="text" class="form-control" id="recipient">
          </div>
          <div class="form-group">
             <label for="avatar">Fichier <span style="color:red; font-weight:bold">*</span></label>
            <input  type="file" class="form-control" id="avatar" name="avatar" @change="OnchangeFichier"
                  accept="image/*,pdf">
          </div>
          <div class="form-group">
            <label for="message-text" class="col-form-label">Message  </label>
             <span style="color:red; font-style:italic;"
              v-if="$v.Email.message.$error && !$v.Email.message.required"
              role="alert">
              <span style="color:red;">*</span> &nbsp;
              Ce champs est obligatoire!
            </span>   
            <textarea  @input="$v.Email.message.$touch()" v-model="Email.message" class="form-control" id="message-text"></textarea>
          </div>
              
              <button   @click.prevent="AjouterEmail" type="submit" class="btn btn-primary ml-5">Valider</button>
              &nbsp;
              <button @click.prevent="annulerEmail" type="submit" class="btn btn-warning">Annuler</button>
              &nbsp;
              <button @click.prevent="fermerEmail" class="btn btn-danger">Fermer</button>

            
              </form>
            </div>
            
                
              </div>
            </div>
        </div>
        </div>
        </div>
    <!-- Fin Modal envoi email -->

    <!-- debut  Modal envoi de sms -->
      <div class="row">
        <div class="col">
      <div class="bloc-modale" v-if="showIsModalSMS">
          <div   class="overlay">
            <div class="modale card" >
                <button class="close" @click="fermer">x</button>
                
                <h5 class="modal-title" id="exampleModalLabel">Envoi de sms <span style="color:red;">{{NomPrenom}}</span> </h5>
            
                <div class="modal-body">
              <form>
              <div class="form-group">
  
              <p><span style="font-weight:bold">Numéro tuteur:</span> {{ContactPrent}}</p>
          </div>
     
           
            <div class="form-group">
                      <label for="date">Date d'envoi de sms</label>
                       <span style="color:red; font-style:italic;"
                          v-if="$v.EnvoiSms.date.$error && !$v.EnvoiSms.date.required"
                          role="alert"> 
                          <span style="color:red; font-weight:bold">*</span>
                          Ce champs est obligatoire!
                      </span>
                    <input v-model="EnvoiSms.date" type="datetime-local" class="form-control" id="date">
                    </div>
                            
                    <div class="form-group">
                      <label for="exampleFormControlTextarea1">Message</label>
                       <span style="color:red; font-style:italic;"
                          v-if="$v.EnvoiSms.message.$error && !$v.EnvoiSms.message.required"
                          role="alert"> 
                          <span style="color:red; font-weight:bold">*</span>
                          Ce champs est obligatoire!
                      </span>
                      <textarea v-model="EnvoiSms.message" class="form-control" id="exampleFormControlTextarea1" rows="2"></textarea>
                    </div>
              
              <button   @click.prevent="AjouterSms" type="submit" class="btn btn-primary ml-5">Valider</button>
              &nbsp;
              <button @click.prevent="annulerSms" type="submit" class="btn btn-warning">Annuler</button>
              &nbsp;
              <button @click.prevent="fermerSms" class="btn btn-danger">Fermer</button>

            
              </form>
            </div>
            
                
              </div>
            </div>
        </div>
        </div>
        </div>
    <!-- Fin Modal envoi sms -->

    <!-- debut  Modal de la scolarite -->
      <div class="row">
        <div class="col">
      <div class="bloc-modale" v-if="showIsModalScolarite">
          <div   class="overlay">
            <div class="modale card" >
             
                
                <h5 class="modal-title" id="exampleModalLabel">Paiement de la scolarité </h5>
            
                <div class="modal-body">
              <form>
        
               <div class="form-group">
                  <label for="matiere">Montant total à payer </label> 
                        <!-- <money title="Scolarité totale a payer"  :value="ScolariteEleve"  class="form-control" readonly></money>                  -->
                  <input disabled :value="formatageSomme(parseFloat(editText.scolarite))"   type="text"  class="form-control" id="libelle" aria-describedby="emailHelp">
                  
              </div>
              <!-- <div class="form-group">
                  <label for="libelle">Reste à payer </label>   
                  <input disabled  :value="ResteaPayer"  type="text"  class="form-control" id="libelle" aria-describedby="emailHelp"
                  placeholder="Entrer la note">
              </div> -->
              <div class="form-group">
                  <label for="scolarite">Montant à payer </label>   
                   <span style="color:red; font-style:italic;"
                        v-if="$v.Scolarites.montant.$error && !$v.Scolarites.montant.required"
                        role="alert"> champs obligatoire!
                    </span>
                    
                  <!-- <input v-model="Scolarites.montant" @input="$v.Scolarites.montant.$touch()" type="number"  class="form-control" id="scolarite" aria-describedby="emailHelp"
                  placeholder="Entrer le scolarite"> -->
                <money title="Scolarité totale a payer"  v-model="Scolarites.montant" @input="$v.Scolarites.montant.$touch()" 
                type="text"   class="form-control" ></money> 
              </div>
              <div class="form-group">
                  <label for="scolarite">Date de paiement </label>   
                   <span style="color:red; font-style:italic;"
                        v-if="$v.Scolarites.date.$error && !$v.Scolarites.date.required"
                        role="alert"> champs obligatoire!
                    </span>
                    
                  <input v-model="Scolarites.date" @input="$v.Scolarites.date.$touch()" type="datetime-local"  class="form-control" id="scolarite" aria-describedby="emailHelp"
                  placeholder="Entrer le scolarite">
              </div>
              
              <button   @click.prevent="AjoutScolarite" type="submit" class="btn btn-primary ml-5">Valider</button>
              &nbsp;
              <button @click.prevent="annulerScolarite" type="submit" class="btn btn-warning">Annuler</button>
              &nbsp;
              <button @click.prevent="fermerScolarite" class="btn btn-danger">Fermer</button>

            
              </form>
            </div>
            
                
              </div>
            </div>
        </div>
        </div>
        </div>
    <!-- Fin Modal de la scolarite -->

    <!-- debut  Modal du transport -->
      <div class="row">
        <div class="col">
      <div class="bloc-modale" v-if="showIsModalTransport">
          <div   class="overlay">
            <div class="modale card" >
             
            <h5 class="ml-5" style="color:red;">Paiement du transport </h5>  
           <div class="card-body">
             <form action="" method="post">   
              <div class="form-group">
                  <label for="matiere">Toute l'année scolaire</label> 
                                                  
                  <select class="form-control" id="classe" v-model="Transports.paye_par_annee" >
                        <option value="" selected disabled hidden> Selectioner </option>
                        <option value="OUI">OUI</option>
                        <option value="NON">NON</option>                                                                           
                    </select>
                  
              </div>
              <div class="form-group" v-if="Transports.paye_par_annee =='NON'" >
                  <label for="libelle">Par trimestre/semestre </label>   
                
                   <select class="form-control" id="classe" v-model="Transports.paye_par_mois">
                        <option value=""></option>
                        <option v-for="item in gettersTrimestre" :key="item.id" :value="item.id">{{item.libelle}}</option>
                                                     
                    </select>
              </div>
              <div class="form-group" v-if="Transports.paye_par_annee !='' || Transports.paye_par_mois != ''">
                  <label for="date_debut">Montant </label>   
                   <span style="color:red; font-style:italic;"
                        v-if="$v.Transports.montant.$error && !$v.Transports.montant.required"
                        role="alert"> 
                         <span style="color:red; font-weight:bold">*</span>
                        champs obligatoire!
                    </span>                 
                  <!-- <input v-model="Transports.montant"  type="number"  class="form-control" id="date_debut" aria-describedby="emailHelp"
                     @input="$v.Transports.montant.$touch()" placeholder="Entrer le montant"> -->
                  <money v-model="Transports.montant"   @input="$v.Transports.montant.$touch()"
                type="text"   class="form-control" ></money> 
              </div>
           
               <button   @click.prevent="AjoutDeTransport" type="submit" class="btn btn-primary ">Enrégistrer</button>
                &nbsp;
                <button @click.prevent="annulerTransport" type="submit" class="btn btn-warning">Annuler</button>
                &nbsp;
                <button @click.prevent="fermerTransport" class="btn btn-danger">Fermer</button>
         </form>
          </div>
            
                
              </div>
            </div>
        </div>
        </div>
        </div>
    <!-- Fin Modal dtransport -->
   <!-- {{FiltreTransportParEleve}} -->
 <notifications  />
  </div>
</template>

<script>
import {required, minLength, maxLength} from "vuelidate/lib/validators";
import moment from "moment"
import { formatageSommeSansFCFA,formatageSomme } from "@/Repositorie/Repository";
import {mapGetters, mapActions} from "vuex";
  import {Money} from 'v-money'
// import editStudentVue from './editStudent.vue';
export default {
    name:'staudent',
    components:{
        Money,
    },

    data(){
        return {
          showMe:false,
           showIsModal: false,
           showIsModalAbsence: false,
           showIsModalEmail: false,
           showIsModalSMS: false,
           showIsModalScolarite: false,
           showIsModalTransport: false,
          url:"https://cdn.pixabay.com/photo/2017/06/09/23/22/people-2388584_960_720.png",
            selectedFile: "",
            editText:{
                nom:"",
                prenom:"",
                sexe:"",
                date_naissance:"",
                matricule:"",
                nationalite:"",
                niveau_id:"",
                classe_id:"",
                scolarite:"",
                oriente:"",
                email:"",
                adresse:"",
                maladie:"",
                transport:"",
                cantine:"",
                photo:"",
                nom_pere:"",
                contact_pere:"",
                nom_mere:"",
                contact_mere:"",
                nom_tuteur:"",
                contact_tuteur:"",
                autre:"",
               
            },
           
              Absence:{
              matiere_id:"",
              date:"",
              motif:"",
            },
              Cantine:{          
              date:"",
              montant:"",
            },
            Email:{
              date:"",
              sujet:"",
              message:"",
            },
            EnvoiSms:{
              date:"",
              message:"",
            },
            Scolarites:{
              date:"",
              montant:"",
            },
            Transports:{
              paye_par_annee:"",
              paye_par_mois:"",
              montant:"",
            },
            InfoCantine:"",
            selectedFileAccueil:"",
            
        }
    },

    created(){
        this.editText = this.GetterStudent.find(tem =>tem.matricule == this.$route.params.id)
        console.log( this.editText)
    if(this.gettersClasse.length == 0){
      this.getClasse();
    }
     this.getMatiere();
     this.getTransport();
     this.getAbsence();
      this.getNiveau();
      this.getTrimestre();
      this.get_all_student();
      this.get_Liste_Cantine();
       this.getScolarite();
      this.getAnnee();
     this.getNouvelleMatiere();
       this.getUserProfile();
       this.getRole();
    },

     validations:{
        Transports:{
              // paye_par_annee:{required},
              // paye_par_mois:{required},
              montant:{required},
            },
       Scolarites:{
              date:{required},
              montant:{required},
            },
        EnvoiSms:{
              date:{required},
              message:{required},
            },
           Email:{
              date:{required},
              sujet:{required},
              message:{required},
            },
         Cantine:{          
              date:{required},
              montant:{required},
            },
        Absence:{
              matiere_id:{required},
              date:{required},
              motif:{required},
            },
        editText:{
            nom:{required},
                prenom:{required},
                sexe:{required},
                date_naissance:{required},
                matricule:{required},
                nationalite:{required},
                niveau_id:{required},
                classe_id:{required},
                // scolarite:{required},
                oriente:{required},
                email:{required},
                adresse:{required},
                // maladie:{required},
                // transport:{required},
                // cantine:{required},
                // photo:{required},
                nom_pere:{required},
                contact_pere:{required,  minLength: minLength(10), maxLength: maxLength(10),},
                nom_mere:{required},
                // contact_mere:{required,  minLength: minLength(10), maxLength: maxLength(10),},
                nom_tuteur:{required},
                contact_tuteur:{required,  minLength: minLength(10), maxLength: maxLength(10),},
                // autre:{required},
        }
    },
     computed:{
     ...mapGetters("parametres",["gettersNiveau", "gettersClasse", "gettersMatiere","gettersTrimestre", "gettersAnne",
     "gettersTransport","gettersNouvelleMatiere"]),
     ...mapGetters("student",["GetterStudent", "GetterCantine", "GetterScolarite", "GetterAbsence", "gettersloadingStudent"]),
       ...mapGetters('personnel', ['getterProfileUsers', "gettersRole"]),
      
      loadingData(){
    return this.gettersloadingStudent
       
    },
        LibelleMatieres(){
      return this.gettersMatiere.filter(tem=>tem.classe_id == this.editText.classe_id)
     },
      LibelleMatiere(){
       return (id)=>{
         if(id != "" && id != null){
           let obj =this.gettersNouvelleMatiere.find(tem =>tem.id == id)
           if(obj){
             return obj.libelle;
           }
          return ""
         }}
     },
      MatiereId(){
       return (id)=>{
         if(id != "" && id != null){
           let obj =this.gettersMatiere.find(tem =>tem.id == id)
           if(obj){
             return obj.nouvelle_matiere_id;
           }
          return ""
         }}
     },
   ScolariteEleve(){
     return this.editText.scolarite;
   },

  trimestreId(){
       if( this.Transports.paye_par_annee == 'NON' && this.Transports.paye_par_mois != ''){
         let objet = this.gettersTrimestre.find(tem=>tem.id == this.Transports.paye_par_mois)
         if(objet){
           return objet.id;
         }
         return ""
       }
       return ""
     },

    AnneEncours(){
       let obj = this.gettersAnne.find(tem=>tem.encours == 1)
       if(obj){
         return obj.id;
       }
       return ""
     },
     FiltreTransportParEleve(){
       return this.gettersTransport.filter(tem=>tem.student_id == this.$route.params.id)
     },
       NbreAbsence(){
         return this.FiltreParAbsence.length;
       },
     FiltreParAbsence(){
       return this.GetterAbsence.filter(tem=>tem.student_id == this.$route.params.id)
     },
     ResteTotalApayerParEleve(){
       return this.editText.scolarite - this.sommeTotalScolariteParEleve
     },
     //calculer la somme des notes
    sommeTotalScolariteParEleve(){
        return this.convertirSommeScolariteParEleve.reduce(function(a, b){
        return a + b;
        }, 0);
    },

     //convertir le tableau string en int de la somme payée par eleve
     convertirSommeScolariteParEleve(){
         return this.SommeScolariteParEleve.map((i) => Number(i))
     },

       //Returne scolarite par eleve
       SommeScolariteParEleve(){
       let collect =[]
       this.GetterScolarite.filter(item =>{
         this.ScolariteParEleve.forEach(element => {        
           if(item.id == element){
             collect.push(item.montant)
           }
         })
       })
       return collect;
     },

     ScolariteParEleve(){
        let objet = this.GetterScolarite.filter(tem=>tem.student_id == this.editText.id)

        let array_exercie = []
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
      // }
       return []
      },
      CantineParEleve(){
        return this.GetterCantine.filter(tem=>tem.student_id == this.$route.params.id)
      },
         TrimestreEncours(){
       let obj = this.gettersTrimestre.find(tem =>tem.encours == 1)
         if(obj){
           return obj.libelle
         }
         return ""
     },
         TrimestreEncoursId(){
       let obj = this.gettersTrimestre.find(tem =>tem.encours == 1)
         if(obj){
           return obj.id
         }
         return ""
     },
     scolarite(){
         return (id)=>{
             if(id != "" && id != null){
                let scolari = this.gettersNiveau.find(tem =>tem.id == id)
                    if(scolari){
                        return scolari.scolarite
                    }
                    return "" 
             }
         }
     },
     NomPrenom(){
       let obj = this.GetterStudent.find(tem=>tem.id == this.$route.params.id)
       if(obj){
         return obj.nom+" "+obj.prenom;
       }
       return ""
     },
     EmailPrent(){
       let obj = this.GetterStudent.find(tem=>tem.id == this.$route.params.id)
       if(obj){
         return obj.email;
       }
       return ""
     },
     ContactPrent(){
       let obj = this.GetterStudent.find(tem=>tem.id == this.$route.params.id)
       if(obj){
         return obj.contact_tuteur;
       }
       return ""
     },
     LibelleClasse(){
       return (id)=>{
         if(id != "" && id != null){
           let obj =this.gettersClasse.find(tem =>tem.id == id)
           if(obj){
             return obj.libelle;
           }
          return ""
         }} },
    
     LibelleTrimestre(){
       return (id)=>{
         if(id != "" && id != null){
           let obj =this.gettersTrimestre.find(tem =>tem.id == id)
           if(obj){
             return obj.libelle;
           }
          return ""
         }} },
  },
    methods:{

         ...mapActions("parametres",["getTrimestre","getNiveau","AjouterNiveau", "ModifierNiveau","SupprimerNiveau",
         "getClasse", "getMatiere", "getAnnee", "AjouterMessageEmail", "AjouterMessageSms", "AjouterTransport",
         "getTransport","AjouterEmailUnique",'getNouvelleMatiere']),
         ...mapActions("student",["get_all_student","AjouterEleve", "ModifierEleve","SupprimerEleve","get_Liste_Cantine",
         "SupprimerCantine", "getAbsence", "AjouterAbsence", "AjouterCantine", "getScolarite", "AjouterScolarite"]),
             ...mapActions('personnel', ['getUserProfile', "getRole"]),

          annulerTransport(){
           this.$v.Transports.$reset();
             this.Transports.paye_par_annee="",  
             this.Transports.paye_par_mois="",  
             this.Transports.montant=""
           
          },
          fermerTransport(){
           this.$v.Transports.$reset();
             this.Transports.paye_par_annee="",  
             this.Transports.paye_par_mois="", 
             this.Transports.montant=""
             this.showIsModalTransport = false
          },
        annulerScolarite(){
         this.$v.Scolarites.$reset();
           this.Scolarites.date="",  
           this.Scolarites.montant=""
        },
        fermerScolarite(){
         this.$v.Scolarites.$reset();
           this.Scolarites.date="",  
           this.Scolarites.montant=""
           this.showIsModalScolarite = false
        },

        annulerSms(){
         this.$v.EnvoiSms.$reset();
           this.EnvoiSms.date="",  
           this.EnvoiSms.message=""
        },
        fermerSms(){
         this.$v.EnvoiSms.$reset();
           this.EnvoiSms.date="",  
           this.EnvoiSms.message="",
           this.showIsModalSMS = false
        },

        annulerEmail(){
         this.$v.Email.$reset();
           this.Email.date="",
            this.Email.sujet="",   
           this.Email.message=""
        },
        fermerEmail(){
         this.$v.Email.$reset();
           this.Email.date="",
           this.Email.sujet="",   
           this.Email.message=""
           this.showIsModalEmail = false
        },

        annulerAbsence(){
         this.$v.Absence.$reset();
           this.Absence.date="",
            this.Absence.matiere_id="",   
           this.Absence.motif=""
        },
        fermerAbsence(){
        this.$v.Absence.$reset();
           this.Absence.date="",
           this.Absence.matiere_id="",   
           this.Absence.motif="",   
          this.showIsModalAbsence = false
        },
        fermer(){
         this.$v.Cantine.$reset();
           this.Cantine.date="",
           this.Cantine.montant="",   
          this.showIsModal = false
        },
         annuler(){
           this.$v.Cantine.$reset();
           this.Cantine.date="",
           this.Cantine.montant=""
        },

        BulletinEleve(id){
            this.$router.push({ name:"Bulletin", params:{id:id}})
        },
        ModificationEleve(id){
            this.$router.push({ name:"editStudent", params:{id:id}})
        },
        DetailNote(id){
            this.$router.push({ name:"DetailNoteIndividuelle", params:{id:id}})
        },
          ShowModal(id){
        this.showIsModal = true,
        this.editText = this.GetterStudent.find(tem =>tem.id == id)
      },
          ShowModalAbsence(id){
        this.showIsModalAbsence = true,
        this.editText = this.GetterStudent.find(tem =>tem.id == id)
      },
      ShowModalEmail(id){
        this.showIsModalEmail = true,
        this.editText = this.GetterStudent.find(tem =>tem.id == id)
      },
      ShowModalSMS(id){
        this.showIsModalSMS = true,
        this.editText = this.GetterStudent.find(tem =>tem.id == id)
      },

      ShowModalScolarite(id){
        this.showIsModalScolarite = true,
        this.editText = this.GetterStudent.find(tem =>tem.id == id)
      },
      ShowModalTransport(id){
        this.showIsModalTransport = true,
        this.editText = this.GetterStudent.find(tem =>tem.id == id)
      },
          OnchangeFichier(e) {
            const files = e.target.files;
            this.selectedFileAccueil = event.target.files[0];
            console.log(this.selectedFileAccueil)
            Array.from(files).forEach(file => this.addFichierPDFAccueil(file));
          },
      addFichierPDFAccueil(file) {
        let reader = new FileReader();
        let vm = this;
        reader.onload = e => {
          vm.imagePDFAccueil = "pdf.png";
          vm.namePDFPDFAccueil = file.name;
          vm.fichierAccueil = e.target.result;
        };
        reader.readAsDataURL(file);
      } ,

      

    //   addFichierPDF(file) {
    //     if (!file.type.match("application/image")) {
    //         this.info_pdf = true;
    //         console.log(`${file.name} le fichier doit etre un PDF`);
    //         return;
    //     }
    //     this.info_pdf = false;
    //     let reader = new FileReader();
    //     let vm = this;
    //     reader.onload = (e) => {
    //         vm.imagePDF = "pdf.png";
    //         vm.namePDF = file.name;
    //         vm.fichierPDF = e.target.result;
    //     };
    //     reader.readAsDataURL(file);
    //     },

        ModificationFonctionLocal(){

               this.$v.editText.$touch();
            if(this.$v.editText.$error) {
                return
            }
            console.log(this.editText)
           

    let obj ={
        ...this.editText,
        id:this.editText.id
    }
         this.ModifierEleve(obj);
         this.get_all_student();
        this.$router.push({
            name:"ListeDesEleves"
        })
        },

      //Notifier l absence de l'élève
           AjouterAbsences(){
        this.$v.Absence.$touch();
            if(this.$v.Absence.$error) {
                return
            }
         let obj ={
           ...this.Absence,
           date: this.formaterDate((new Date(this.Absence.date))),
           student_id: this.editText.id,
           trimestre_id: this.TrimestreEncoursId
         }
          console.log(obj)
          this.AjouterAbsence(obj)
           this.$v.Absence.$reset();
         this.Absence = {
              date: "",
              matiere_id: "",
              motif: "",
            };       
      },
      //Notifier l absence de l'élève
           AjoutDeCantine(){
        this.$v.Cantine.$touch();
            if(this.$v.Cantine.$error) {
                return
            }
         let obj ={
           ...this.Cantine,
           date: this.formaterDate1(this.Cantine.date),
            tableau:[this.editText.id],
          //  student_id: this.editText.id,
           trimestre: this.TrimestreEncours,
           classe_id:this.editText.classe_id,
           niveau_id:this.editText.niveau_id,
         }
          console.log(obj)
          this.AjouterCantine(obj)
           this.$v.Cantine.$reset();
         this.Cantine = {
              date: "",
              montant: "",
            };       
      },
      //Envoi d'email
       AjouterEmail(){
             this.$v.Email.$touch();
            if(this.$v.Email.$error) {
                return
            }
        //   let obj ={
        //     ...this.Email,
        //     annee_id: this.AnneEncours,
        //  niveau_id: this.editText.niveau_id,
        //  classe_id: this.editText.classe_id,

        //   }
        //   console.log(obj)  
        //   this.AjouterMessageEmail(obj)
          
          let config = {
              header : {
              'Content-Type' : 'multipart/form-data'
              }
          }
         
          const formData = new FormData();
          formData.append("annee_id", this.AnneEncours);
          formData.append("niveau_id", this.editText.niveau_id);
          formData.append("classe_id", this.editText.classe_id);
          formData.append("student_id", this.editText.id);
          formData.append("date", this.Email.date);
          formData.append("sujet", this.Email.sujet);
          formData.append("message", this.Email.message);
           if( this.selectedFileAccueil!==""){
          formData.append('fichier', this.selectedFileAccueil, this.selectedFileAccueil.name);
          }else{
             formData.append('fichier', "");
          }
        console.log(formData)
        this.AjouterEmailUnique(formData, config);
        },

           AjouterSms(){
         this.$v.EnvoiSms.$touch();
            if(this.$v.EnvoiSms.$error) {
                return
            }
          let obj ={
            ...this.EnvoiSms,
            annee_id: this.AnneEncours,
              niveau_id: this.editText.niveau_id,
            classe_id: this.editText.classe_id,

          }
          console.log(obj)  
         this.AjouterMessageSms(obj)
         
      },

      //Ajout de la scolarite
       AjoutScolarite(){
             this.$v.Scolarites.$touch();
            if(this.$v.Scolarites.$error) {
                return
            }
          let obj ={
            ...this.Scolarites,
            student_id: this.editText.id,
            niveau_id: this.editText.niveau_id,
            classe_id: this.editText.classe_id,
            annee_id: this.AnneEncours

          }
          console.log(obj)
          this.AjouterScolarite(obj)
          this.$v.Scolarites.$reset();
           this.Scolarites.montant="";
           this.Scolarites.date="";
       
        },

          AjoutDeTransport(){
             this.$v.Transports.$touch();
            if(this.$v.Transports.$error) {
                return
            }
          let obj ={
            ...this.Transports,
            student_id: this.editText.id,
            niveau_id: this.editText.niveau_id,
            classe_id: this.editText.classe_id,
            annee_id: this.AnneEncours,
            trimestre_id: this.trimestreId
    
            // student_id: this.editText.id,
            // annee_id: this.AnneEncours

          }
          console.log(obj)
           this.AjouterTransport(obj)
          this.$v.Transports.$reset();
            this.Transports.montant="",
            this.Transports.paye_par_mois="",
            this.Transports.paye_par_annee=""
        },

        retour(){
          this.$router.go(-1)
        },

         formaterDate1(date) {
      return moment(date, "YYYY-MM-DD").format("YYYY-MM-DD");
    },
         formaterDate2(date) {
      return moment(date, "YYYY-MM-DD HH:mm").format("DD-MM-YYYY HH:mm");
    },
         formaterDate3(date) {
      return moment(date, "YYYY-MM-DD").format("DD-MM-YYYY");
    },
         formaterDate(date) {
      return moment(date, "YYYY-MM-DD").format("YYYY-MM-DD HH:mm");
    },
     genererEnPdf(){
       this.showMe = true
        const localOptions = {
                    styles: [
                    'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css',
                    'https://unpkg.com/kidlat-css/css/kidlat.css',
                    './landscape.css'
                    ]
                };

        this.$htmlToPaper('printMe', localOptions,  this.showMe = true);
        },
           formatageSomme:formatageSomme,
    formatageSommeSansFCFA:formatageSommeSansFCFA,
    }

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
        padding: 20px;
        position: fixed;
        top: 10%;
        width:30%;
        margin-right: 50%;
        left: 33%;
}

 .close{
  position: absolute;
  top: 10px;
  right: 10px;
}
</style>