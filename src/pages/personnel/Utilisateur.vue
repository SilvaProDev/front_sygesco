<template>
  <div>
    <!-- <loading :active.sync="isLoading" :opacity="0.7" :loader="'dots'" :color="'#70CD07'" :background-color="'#000'"
                                     :can-cancel="false"
                                     :is-full-page="false"></loading> -->
      <nav aria-label="breadcrumb" class="ml-3">
        <ol class="breadcrumb">
            <li style="font-size:15px;" class="breadcrumb-item"><a >Configuration</a></li>
            <li style="font-size:15px;" class="breadcrumb-item active" aria-current="page">Utilisateurs</li>
        </ol>
        </nav>
           
  <div class="tabset ml-5">
  <!-- Tab 1 -->
  <input type="radio" name="tabset" id="tab1" aria-controls="marzen" checked>
  <label for="tab1">Gestion des personels</label>
  <!-- Tab 2 -->
  <input type="radio" name="tabset" id="tab2" aria-controls="rauchbier">
  <label for="tab2">Gestion des enseignants</label>
  <!-- Tab 3 -->
  <!-- <input type="radio" name="tabset" id="tab3" aria-controls="dunkles">
  <label for="tab3">Gestion des parents</label> -->
  
  <div class="tab-panels">
    <section id="marzen" class="tab-panel" >
         <div class="row">
              <div class="card ml-5">
                <div class="card-header  d-flex flex-row align-items-center justify-content-between">
                  <h6 class="m-0 font-weight-bold text-primary">La liste des personels</h6>
               
                    <div class="input-group col-sm-3" v-if="!showModal && !showIsModal">
                        <input type="text" v-model="search" class="form-control" placeholder="Recherche par nom, email, numéro">
                        <div class="input-group-append">
                        <button class="btn btn-secondary" type="button">
                            <i class="fa fa-search"></i>
                        </button>
                        </div>
                    </div>
               
                </div>
                <div class="table-responsive">
                  <table class="table align-items-center table-flush">
                    <thead class="thead-light">
                      <tr >
                        <th>N°</th>
                        <th>Nom et Prébom</th>
                        <th>Email</th>
                        <th>Téléphone</th>
                        <th>Adresse</th>
                        <!-- <th>Rôle</th> -->
                        <th>Status</th>
                        
                        <th  colspan="2" >Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(item, index) in localisationsFiltre" :key="item.id" :value="item.id">
                          <td  >{{index+1}}</td>
                          <td>{{item.name}}</td>
                          <td>{{item.email}}</td>
                          <td>{{item.phone}}</td>
                            <td>{{item.adresse || 'Non renseigné'}}</td>
                          <!-- <td>{{LibelleRole(item.role_id)}}</td> -->
                          <td >
                              <span v-if="item.actived ==1" style="color:red" class="badge badge-success">Activé</span>
                              <span v-else style="color:red" class="badge badge-danger">suspendu</span>
                            
                              </td>
                         <td >
                     

                        <a title="Modifier"  @click.prevent="ModificationModal(item.id)">
                            <i style="color:green;" class="fas fa-edit"> </i>
                        
                        </a>
                          &nbsp;
                        <a title="Supprimer"  @click.prevent="SupprimerUtilisateur(item.id)">
                            <i style="color:blue;" class="fas fa-lock"></i>
                        
                        </a>
                            &nbsp;
                        <a title="suspendre"  @click.prevent="Suspension(item.id, item.name, item.email, item.role_id, item.phone)">
                            <i style="color:yellow;" class="fas fa-ban"></i>
                           
                         
                        </a>
                            &nbsp;
                        <a title="Affectation" v-if="item.role_id == 3"  @click.prevent="AffectationRoute(item.id)">
                         <i style="color:green;" class="fas fa-eye"></i>
                        </a>
                            &nbsp;
                        <a title="Supprimer"  @click.prevent="SupprimerUtilisateur(item.id)">
                         <i style="color:red;" class="fas fa-trash"></i>
                        </a>
                        
                            
                        </td>
                      </tr>
                                                         
                    </tbody>
                  </table>
                </div>
              
              </div>
           
          </div>
  </section>
    <section id="rauchbier" class="tab-panel">
         <!-- Row -->
          <div class="row"  >
            <!-- Datatables -->
            <div class="col-lg-12">
              <div class="card ml-5">
                <div class="card-header d-flex flex-row align-items-center justify-content-between">
                   <h6 class="m-0 font-weight-bold text-primary">La liste des enseignants</h6>
                    <div class="input-group col-sm-4" v-if="!showModal && !showIsModal">
                        <input  type="text" v-model="search" class="form-control" placeholder="Recherche par nom, email, numéro">
                        <div class="input-group-append">
                        <button class="btn btn-secondary" type="button">
                            <i class="fa fa-search"></i>
                        </button>
                        </div>
                    </div>
                </div>
                <div class="table-responsive " >
                  
                   <table class="table align-items-center table-flush">
                    <thead class="thead-light">
                      <tr >
                        <th>N°</th>
                        <th>Nom et Prébom</th>
                        <th>Email</th>
                        <th>Téléphone</th>
                        <th>Adresse</th>
                        <!-- <th>Rôle</th> -->
                        <th>Status</th>
                        
                        <th  colspan="2" >Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(item, index) in filtreListreProfesseurs" :key="item.id" :value="item.id">
                          <td  >{{index+1}}</td>
                          <td>{{item.name || 'Non renseigné'}}</td>
                          <td>{{item.email || 'Non renseigné'}}</td>
                          <td>{{item.phone || 'Non renseigné'}}</td>
                            <td>{{item.adresse || 'Non renseigné'}}</td>
                          <!-- <td>{{LibelleRole(item.role_id)}}</td> -->
                          <td >
                              <span v-if="item.actived ==1" style="color:red" class="badge badge-success">Activé</span>
                              <span v-else style="color:red" class="badge badge-danger">suspendu</span>
                            
                              </td>
                         <td >
                     

                        <a title="Modifier"  @click.prevent="ModificationModal(item.id)">
                            <i style="color:green;" class="fas fa-edit"> </i>
                        
                        </a>
                      
                            &nbsp;
                        <a title="suspendre"  @click.prevent="Suspension(item.id, item.name, item.email, item.role_id, item.phone)">
                            <i style="color:yellow;" class="fas fa-ban"></i>
                           
                         
                        </a>
                            &nbsp;
                        <a title="Affectation" v-if="item.role_id == 3"  @click.prevent="AffectationRoute(item.id)">
                         <i style="color:green;" class="fas fa-eye"></i>
                        </a>
                            &nbsp;
                        <a title="Supprimer"  @click.prevent="SupprimerUtilisateur(item.id)">
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
          <!--Row-->    
    </section>
     <section id="dunkles" class="tab-panel">
 
      <div class="row">        
             <div class="col-lg-12">
              <div class="card mb-4">
                <div class="card-header d-flex flex-row align-items-center justify-content-between">
                   <h6 class="m-0 font-weight-bold text-primary">La liste des parents</h6>
                    <div v-if="!showModal" class="input-group col-sm-4">
                        <input type="text" v-model="search" class="form-control" placeholder="Recherche par nom,email, numéro">
                        <div class="input-group-append">
                        <button class="btn btn-secondary">
                            <i class="fa fa-search"></i>
                        </button>
                        </div>
                    </div>
                </div>
                <div class="table-responsive p-3" >
                  
                   <table class="table align-items-center table-flush">
                    <thead class="thead-light">
                      <tr >
                        <th>N°</th>
                        <th>Nom et Prébom</th>
                        <th>Email</th>
                        <th>Téléphone</th>
                        <th>Adresse</th>
                        <!-- <th>Rôle</th> -->
                        <!-- <th>Status</th> -->
                        
                        <th  colspan="2" >Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(item, index) in filtreListreParents" :key="item.id" :value="item.id">
                          <td>{{index+1}}</td>
                          <td>{{item.name}}</td>
                          <td>{{item.email}}</td>
                          <td>{{item.phone}}</td>
                          <td>{{item.adresse || 'Non renseigné'}}</td>
                          <!-- <td>{{LibelleRole(item.role_id)}}</td> -->
                          <!-- <td >
                              <span v-if="item.actived ==1" style="color:red" class="badge badge-success">Activé</span>
                              <span v-else style="color:red" class="badge badge-danger">suspendu</span>
                            
                              </td> -->
                         <td >
                     

                        <a title="Modifier"  @click.prevent="ModificationModal(item.id)">
                            <i style="color:green;" class="fas fa-edit"> </i>
                        
                        </a>
                      
                            &nbsp;
                        <a title="suspendre"  @click.prevent="Suspension(item.id, item.name, item.email, item.role_id, item.phone)">
                            <i style="color:yellow;" class="fas fa-ban"></i>
                           
                         
                        </a>
                            &nbsp;
                        <a title="Affectation" v-if="item.role_id == 3"  @click.prevent="AffectationRoute(item.id)">
                         <i style="color:green;" class="fas fa-eye"></i>
                        </a>
                            &nbsp;
                        <a title="Supprimer"  @click.prevent="SupprimerUtilisateur(item.id)">
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
    </section>
  </div>
</div>
           

          <div class="bloc-modale" v-if="showModal">
            <div   class="overlay">
            <div class="modale card" >
                <h5 class="modal-title text-center" id="exampleModalLabel">Enrégistrement du personnel </h5>
                <div class="card-body">
                        <form action="" method="post" enctype="multipart/form-data">
                            <div class="row ">         
                                <div class="col-6 col-md-3">
                                    <div class="form-group">
                                        <label for="nom">Nom prénom</label>
                                        <span style="color:red; font-style:italic;"
                                            v-if="$v.formData.name.$error && !$v.formData.name.required"
                                            role="alert"> 
                                            <span style="color:red; font-weight:bold">*</span>
                                            champs obligatoire!
                                        </span> 
                                        
                                        <input v-model="formData.name" @input="$v.formData.name.$touch()"    type="text"  class="form-control" id="nom" aria-describedby="emailHelp"
                                        placeholder="Entrer le nom et le prénom">
                                    </div>
                                </div>
                                 <div class="col-6 col-md-3">
                                    <div class="form-group">
                                        <label for="sexe">Email  </label>
                                        <span style="color:red; font-style:italic;"
                                            v-if="$v.formData.email.$error && !$v.formData.email.required"
                                            role="alert"> 
                                            <span style="color:red; font-weight:bold">*</span>
                                            champs obligatoire!
                                        </span> &nbsp;
                                        <span style="color:red; font-style:italic;font-weight:bold"
                                            v-if="!$v.formData.email.email"
                                            role="alert"> 
                                            email invalide
                                        </span> 
                                        <input v-model="formData.email" @input="$v.formData.email.$touch()"  type="email"   class="form-control" id="prenom" aria-describedby="emailHelp"
                                            placeholder="Entrer le mail" :class="{'is-invalid':$v.formData.email.$error, 'is-valid':!$v.formData.email.$invalid}">
                                    </div>
                                </div>

                                <div class="col-6 col-md-3">            
                                    <div class="form-group">
                                        <label for="prenom">Rôle </label>
                                        <span style="color:red; font-style:italic;"
                                            v-if="$v.formData.role_id.$error && !$v.formData.role_id.required"
                                            role="alert"> 
                                            <span style="color:red; font-weight:bold">*</span>
                                            champs obligatoire!
                                        </span> 
                                        <select class="form-control" id="sexe" v-model="formData.role_id" @input="$v.formData.role_id.$touch()" >
                                            <option value="" selected disabled hidden>Choisir le rôle</option>
                                            <option v-for="item in gettersRole" :key="item.id" :value="item.id">{{item.libelle}}</option>                                                 
                                        </select>                   
                                    </div>
                                </div>
                                <div class="col-6 col-md-3">            
                                    <div class="form-group">
                                        <label for="sexe">Genre </label>
                                        <span style="color:red; font-style:italic;"
                                            v-if="$v.formData.sexe.$error && !$v.formData.sexe.required"
                                            role="alert"> 
                                            <span style="color:red; font-weight:bold">*</span>
                                            champs obligatoire!
                                        </span> 
                                        <select class="form-control" id="sexe"  @input="$v.formData.sexe.$touch()" v-model="formData.sexe">
                                          <option value="" selected disabled hidden>Choisir le genre</option>
                                          <option value="Masculin">Masculin</option>
                                          <option value="Féminin">Féminin</option>                        
                                      </select>                  
                                    </div>
                                </div>
                                <div class="col-12" v-if="formData.role_id !=''">            
                                      <label for="test"> Choisir les différentes permissions</label>
                                    <div class="form-group">
                                        <div class="form-group form-check" style="display:inline"
                                        v-for="item in LibellePermission" :key="item.id" :value="item.id">
                                        <input type="checkbox" v-model="formData.permissions" :id="item.id" :value="item.id">
                                        <label class="form-check-label" :for="item.id" > 
                                           {{item.libelle}}
                                         </label>
                                    </div>                 
                                    </div>                                  
                                </div>
                                                              
                            </div>
                            <div class="row"> 


                                <div class="col-6 col-md-4">
                                    <div class="form-group">
                                        <label for="telephone">Téléphone </label>
                                        <!-- <span style="color:red; font-style:italic;"
                                            v-if="$v.formData.phone.$error && !$v.formData.phone.required"
                                            role="alert"> 
                                            <span style="color:red; font-weight:bold">*</span>
                                            champs obligatoire!
                                        </span>  -->
                                        <input  type="tel" v-model="formData.phone" class="form-control" id="telephone" aria-describedby="emailHelp"
                                        placeholder="Entrer le numero de téléphone">

                                    </div>
                                    <span style="color:red; font-style:italic;"
                                            v-if="!$v.formData.phone.minLength || !$v.formData.phone.maxLength"
                                            role="alert"> 
                                            <span style="color:red; font-weight:bold">*</span>
                                            Le numero doit être {{$v.formData.phone.$params.minLength.min}} chiffres
                                            <!-- Le numero doit être {{$v.formData.phone.$params.maxLength.max}} chiffres -->
                                        </span> 
                                </div>
                                <div class="col-6 col-md-4">
                                    <div class="form-group">
                                        <label for="password">Mot de passe </label>
                                        <span style="color:red; font-style:italic;"
                                            v-if="$v.formData.password.$error && !$v.formData.password.required"
                                            role="alert"> 
                                            <span style="color:red; font-weight:bold">*</span>
                                            champs obligatoire!
                                        </span> 
                                        <input  v-model="formData.password" @input="$v.formData.password.$touch()" type="password"  class="form-control" id="password" aria-describedby="emailHelp"
                                        placeholder="Entrer le mot de passe"
                                        :class="{'is-invalid':$v.formData.password.$error, 'is-valid':!$v.formData.password.$invalid}">

                                    </div>
                                    <div class="form-group form-check">
                                        <input type="checkbox" checked @click.prevent="toggleShowPassword" id="password" v-model="formData.showPassword" class="form-check-input">
                                        <label class="form-check-label" for="password">
                                            <i class="fa fa-eye"></i>
                                            </label>
                                    </div>
                                
                                    <span style="color:red; font-style:italic;"
                                            v-if="!$v.formData.password.minLength"
                                            role="alert"> 
                                            <span style="color:red; font-weight:bold">*</span>
                                            Au minimum {{$v.formData.password.$params.minLength.min}} caractères
                                        </span> 
                                </div>
                                
                                <div class="col-6 col-md-4">
                                    <div class="form-group">
                                        <label for="confirm-password">Confimer </label>
                                    
                                        <span style="color:red; font-style:italic;"  
                                            v-if="!$v.formData.passwordconfirm.sameAsPassword && formData.passwordconfirm"
                                            role="alert"> Le mot de passe est diférent
                                        </span> 
                                        <input v-model="formData.passwordconfirm" @input="$v.formData.passwordconfirm.$touch()" type="password"  class="form-control" aria-describedby="emailHelp"
                                        placeholder="Entrer la confirmation"
                                        :class="{'is-invalid':$v.formData.passwordconfirm.$error, 'is-valid': formData.password != '' ?
                                        !$v.formData.passwordconfirm.$invalid :''}">

                                    </div>
                                </div>
                            </div>    
                        <button :disabled="!$v.formData.passwordconfirm.sameAsPassword"   @click.prevent="AjouterFonctionLocals" type="submit" class="btn btn-primary ml-5">Enrégistrer</button>
                        &nbsp;
                        <button @click.prevent="annuler" type="submit" class="btn btn-warning">Annuler</button>
                           &nbsp;
                        <button @click.prevent="fermer" type="submit" class="btn btn-danger">Fermer</button>
                    
                            </form>
                    </div>
                
                
                </div>
            </div>
        </div>
          <div class="bloc-modale" v-if="showIsModal">
            <div   class="overlay">
            <div class="modale card" >
                  
                <h5 class="modal-title text-center" id="exampleModalLabel">Modification  du personnel </h5>

                <div class="card-body">
                        <form action="" method="post" enctype="multipart/form-data">
                            <div class="row ">         
                                <div class="col-6 col-md-4">
                                    <div class="form-group">
                                        <label for="nom">Nom prénom</label>
                                        <span style="color:red; font-style:italic;"
                                            v-if="$v.editText.name.$error && !$v.editText.name.required"
                                            role="alert"> 
                                            <span style="color:red; font-weight:bold">*</span>
                                            champs obligatoire!
                                        </span> 
                                        
                                        <input v-model="editText.name" @input="$v.editText.name.$touch()"    type="text"  class="form-control" id="nom" aria-describedby="emailHelp"
                                        placeholder="Entrer le nom et le prénom">
                                    </div>
                                </div>
                                <div class="col-6 col-md-4">
                                    <div class="form-group">
                                        <label for="prenom">Rôle </label>
                                        <span style="color:red; font-style:italic;"
                                            v-if="$v.editText.role_id.$error && !$v.editText.role_id.required"
                                            role="alert"> 
                                            <span style="color:red; font-weight:bold">*</span>
                                            champs obligatoire!
                                        </span> 
                                        <select class="form-control" id="sexe" v-model="editText.role_id" @input="$v.editText.role_id.$touch()" >
                                            <option value="" selected disabled hidden>Choisir le rôle</option>
                                            <option v-for="item in gettersRole" :key="item.id" :value="item.id">{{item.libelle}}</option>
                                                            
                                        </select>
                                    
                                    </div>
                                </div>
                                 <div class="col-6 col-md-4">            
                                    <div class="form-group">
                                        <label for="sexe">Genre </label>
                                        <span style="color:red; font-style:italic;"
                                            v-if="$v.editText.sexe.$error && !$v.editText.sexe.required"
                                            role="alert"> 
                                            <span style="color:red; font-weight:bold">*</span>
                                            champs obligatoire!
                                        </span> 
                                        <select class="form-control" id="sexe"  @input="$v.editText.sexe.$touch()" v-model="editText.sexe">
                                          <option value="" selected disabled hidden>Choisir le genre</option>
                                          <option value="Masculin">Masculin</option>
                                          <option value="Féminin">Féminin</option>                        
                                      </select>                  
                                    </div>
                                </div>

                                <div class="col-12" v-if="editText.role_id !=''">            
                                      <label for="test"> Choisir les différentes permissions</label>
                                    <div class="form-group">
                                        <div class="form-group form-check" style="display:inline"
                                        v-for="item in LibellePermissionEdit" :key="item.id" :value="item.id">
                                        <input type="checkbox" v-model="formData.permissions" :id="item.id" :value="item.id">
                                        <label class="form-check-label" :for="item.id" > 
                                           {{item.libelle}}
                                         </label>
                                    </div>                 
                                    </div>                                  
                                </div>
                                
                            </div>
                            <div class="row"> 

                                <div class="col-6 col-md-6">
                                    <div class="form-group">
                                        <label for="sexe">Email</label>
                                        <span style="color:red; font-style:italic;"
                                            v-if="$v.editText.email.$error && !$v.editText.email.required"
                                            role="alert"> 
                                            <span style="color:red; font-weight:bold">*</span>
                                            champs obligatoire!
                                        </span> &nbsp;
                                        <span style="color:red; font-style:italic;font-weight:bold"
                                            v-if="!$v.editText.email.email"
                                            role="alert"> 
                                            email invalide
                                        </span> 
                                        <input v-model="editText.email" @input="$v.editText.email.$touch()"  type="email"   class="form-control" id="prenom" aria-describedby="emailHelp"
                                            placeholder="Entrer le mail" :class="{'is-invalid':$v.editText.email.$error, 'is-valid':!$v.editText.email.$invalid}">
                                    </div>
                                </div>

                                <div class="col-6 col-md-6">
                                    <div class="form-group">
                                        <label for="telephone">Téléphone </label>
                                        <!-- <span style="color:red; font-style:italic;"
                                            v-if="$v.editText.phone.$error && !$v.editText.phone.required"
                                            role="alert"> 
                                            <span style="color:red; font-weight:bold">*</span>
                                            champs obligatoire!
                                        </span>  -->
                                        <input  type="tel" v-model="editText.phone"  class="form-control" id="telephone" aria-describedby="emailHelp"
                                        placeholder="Entrer le numero de téléphone">

                                    </div>
                                    <span style="color:red; font-style:italic;"
                                            v-if="!$v.editText.phone.minLength || !$v.editText.phone.maxLength"
                                            role="alert"> 
                                            <span style="color:red; font-weight:bold">*</span>
                                            Le numero doit être {{$v.editText.phone.$params.minLength.min}} chiffres
                                        </span> 
                                </div>
                               
                            </div>    
                        <button  @click.prevent="ModifierFonctionLocals(editText)" type="submit" class="btn btn-success ml-5">Enrégistrer</button>
                        &nbsp;
                        <button @click.prevent="annulerMod" type="submit" class="btn btn-danger">Fermer</button>
                    
                            </form>
                    </div>
                
                
                </div>
            </div>
        </div>
           <fab :actions="fabActions"
      
                      main-icon="apps"
                @cache="toggleModale"
              bg-color="blue"

        ></fab>
    <notifications  />
  </div>
</template>

<script>
import {required, email, sameAs, minLength, maxLength} from "vuelidate/lib/validators";
import {mapGetters, mapActions} from "vuex";
//  import Loading from 'vue-loading-overlay';
// import 'vue-loading-overlay/dist/vue-loading.css';
//  import axios from "axios"
import fab from 'vue-fab'

export default {
    components:{fab, },

    data(){

        return {
            search:"",
            // isLoading:true,
             showModal: false,
             showIsModal: false,
                position: 'bottom-right',
                fabActions: [
                    {
                        name: 'cache',
                        icon: 'add'
                    },
                    {
                        name: 'alertMe',
                        icon: 'add_alert'
                    }
                ],
            formData:{
                permissions:[],
                name:"",
                sexe:"",
                role_id:"",
                email:"",
                phone:"",
                password:"",
                passwordconfirm:"",
                showPassword:false,
            },
            editText:{
                permissions:[],
                name:"",
                sexe:"",
                role_id:"",
                email:"",
                phone:"",
                password:"",
                passwordconfirm:"",
                showPassword:false,
            },
        }
    },

  
    validations:{
        formData:{
             name:{required},
             sexe:{required},
                role_id:{required},
                phone:{
                //required,
                 minLength:minLength(10),
                 maxLength:maxLength(10),
                 },
                email:{
                    required,
                    email, 
                },
                password:{
                required,
                minLength:minLength(5)},
                passwordconfirm:{
                    sameAsPassword: sameAs('password'),
                }
        },
        editText:{
             name:{required},
             sexe:{required},
                role_id:{required},
                phone:{
                  //required,
                 minLength:minLength(10),
                 maxLength:maxLength(10),
                 },
                email:{
                    required,
                    email, 
                },
                // password:{
                // required,
                // minLength:minLength(5)},
                // passwordconfirm:{
                //     sameAsPassword: sameAs('password'),
                // }
        }
},
created(){
    this.getRole();
     this.getUtilisateur()
     
},
 computed:{
     ...mapGetters("parametres",["gettersNiveau", "gettersClasse", "gettersMatiere","gettersTrimestre", "gettersAnne",
     "gettersTransport"]),
     ...mapGetters("student",["GetterStudent", "GetterCantine", "GetterScolarite", "GetterAbsence"]),
     ...mapGetters("personnel",["gettersUtilisateur","gettersRole" ]),

    LibellePermission(){
      if(this.formData.role_id !=''){
        let objet = this.gettersRole.find(tem=>tem.id == this.formData.role_id)
        if(objet){
          return objet.permissions
        }
      }
      return ""
    },
    LibellePermissionEdit(){
      if(this.editText.role_id !=''){
        let objet = this.gettersRole.find(tem=>tem.id == this.editText.role_id)
        if(objet){
          return objet.permissions
        }
      }
      return ""
    },

     LibelleRole(){
         return (id)=>{
             if(id != ""){
                 let obj = this.gettersRole.find(tem=>tem.id == id)
                    if(obj){
                        return obj.libelle.toUpperCase();
                    }
                 
             }
         }
     },
     ListeDesUtilisateurs(){
        let objet = this.gettersUtilisateur.filter(tem=>tem.role_id != 2);    
        let array_exercie = [];
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
    return [];
   
     },
     ListeDesProfesseurs(){
        let objet = this.gettersUtilisateur.filter(tem=>tem.role_id == 3);    
        let array_exercie = [];
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
    return [];
   
     },
     ListeDesParents(){
        let objet = this.gettersUtilisateur.filter(tem=>tem.role_id == 4);    
        let array_exercie = [];
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
    return [];
   
     },
       AnneEncours(){
       let obj = this.gettersAnne.find(tem=>tem.encours == 1)
       if(obj){
         return obj.id;
       }
       return ""
     },

       localisationsFiltre() {
      const searchTerm = this.search.toLowerCase();

      return this.ListeDesUtilisateurs.filter((item) => {
        return (
          item.name.toLowerCase().includes(searchTerm) ||
          item.email.toLowerCase().includes(searchTerm) ||
          item.phone.toLowerCase().includes(searchTerm)
        );
      });
      
    },
       filtreListreProfesseurs() {
      const searchTerm = this.search.toLowerCase();

      return this.ListeDesProfesseurs.filter((item) => {
        return (
          item.name.toLowerCase().includes(searchTerm) ||
          item.email.toLowerCase().includes(searchTerm)
        );
      });
      
    },
       filtreListreParents() {
      const searchTerm = this.search.toLowerCase();

      return this.ListeDesParents.filter((item) => {
        return (
          item.name.toLowerCase().includes(searchTerm) ||
          item.email.toLowerCase().includes(searchTerm)
        );
      });
      
    },
 },

   methods:{

         ...mapActions("parametres",["getTrimestre","getNiveau","AjouterNiveau", "ModifierNiveau","SupprimerNiveau",
         "getClasse", "getMatiere", "getAnnee", "AjouterMessageEmail", "AjouterMessageSms", "AjouterTransport",
         "getTransport"]),
         ...mapActions("student",["get_all_student","AjouterEleve", "ModifierEleve","SupprimerEleve","get_Liste_Cantine",
         "SupprimerCantine", "getAbsence", "AjouterAbsence", "AjouterCantine", "getScolarite", "AjouterScolarite"]),
        
         ...mapActions("personnel",["getUtilisateur","AjouterUtilisateur","ModifierUtilisateur","SupprimerUtilisateur",
         "suspendreUtilisateur","SearchUser", "getRole"]),
        
        AffectationRoute(index){
         return this.$router.push({
            name:"Affectation", params:{id : index}
        })


        },
       
         toggleModale(){
      this.showModal = !this.showModal
    },
     ModificationModal(id) {
        this.showIsModal = !this.showIsModal;
        this.editText = this.gettersUtilisateur.find(tem =>tem.id == id)

      },
        toggleShowPassword(){
            var show = document.getElementById('password')
            if(this.formData.showPassword == false){
                this.formData.showPassword = true,
                show.type = "text"
            } else{
                this.formData.showPassword = false
                show.type = 'password'
            }
        },
        annulerMod(){
            this.$v.editText.$reset();
             this.editText.name="",
             this.editText.email="",
             this.editText.phone="",
             this.editText.role_id="",
             this.editText.password="",
             this.editText.passwordconfirm=""
            this.showIsModal = !this.showIsModal;
            this.getUtilisateur()
        },
        annuler(){
            this.$v.formData.$reset();
             this.formData.name="",
             this.formData.email="",
             this.formData.phone="",
             this.formData.role_id="",
             this.formData.password="",
             this.formData.passwordconfirm=""
        },
        fermer(){
            this.$v.formData.$reset();
             this.formData.name="",
             this.formData.email="",
             this.formData.phone="",
             this.formData.role_id="",
             this.formData.password="",
             this.formData.passwordconfirm="",
             this.showModal = false
        },
        AjouterFonctionLocals(){
        this.$v.formData.$touch();
            if(this.$v.formData.$error){
                return
            }
         let obj ={
           ...this.formData,
           annee_id: 1
          //  annee_id: this.AnneEncours
         
         }
         this.AjouterUtilisateur(obj)
          console.log(obj)
          this.annuler()
             
      },
        ModifierFonctionLocals(){
        this.$v.editText.$touch();
            if(this.$v.editText.$error){
                return
            }
         let obj ={
           ...this.editText,
           permissions: this.formData.permissions,
         
         }
         this.ModifierUtilisateur(obj)
         this.annulerMod()  
         console.log(obj)
             
      },
      Suspension(index, id1, id2, id3, id4){
          let obj={
              id: index,
              name: id1,
              email:id2,
              role_id:id3,
              phone:id4,
              annee_id: this.AnneEncours

          }
          console.log(obj)
          this.suspendreUtilisateur(obj)
      }
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
        padding: 10px;
        position: fixed;
        top: 15%;
        width:50%;
        margin-right: 40%;
        left: 30%;
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
  width: 60px;
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