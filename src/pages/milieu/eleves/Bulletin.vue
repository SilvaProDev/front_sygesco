<template>
  <div>
    <Loader :isVisible="loadingData"/>
     <div class="ml-5">
        <div class="row ml-5">         
          
          
              <div class="col-6 col-md-3">
                  <div class="form-group">
                      <label for="niveau">Choisir le trimestre </label>
                        <select class="form-control" id="classe" v-model="formData.trimestre_id"  >
                         <option value="" selected >Choisir le trimestre</option>
                         <option v-for="item in gettersTrimestre" :key="item.id" :value="item.id"  >{{item.libelle}}</option>
                      </select>
                  </div>
                </div>
           
                
           <p v-if="formData.trimestre_id == ''" class=" ml-5 text-gray-800 font-weight-bold"> Selectionnez  le trimestre pour voir le bulletin</p>
                <div style="margin-left:80%" v-if="formData.trimestre_id != ''">
                     <button type="button" class="btn btn-warning" @click.prevent="CallBack()">Retour</button> &nbsp;
                     <button type="button" class="btn btn-info" @click.prevent="genererEnPdf()">Imprimer</button>
                </div>

             
            </div>
        
             <!-- Row -->
          <div class="row mr-3" v-if="formData.trimestre_id ==1">
            <!-- Datatables -->
            <div class="col-lg-12">
              <div class="card mb-5"   ref="table" style="!important">
               
                <div class="table-responsive p-3"  id="printMe">
                  
                  <table class="table align-items-center table-flush" id="dataTable" style="border: 1px solid #000 !important">
                   
                     <tr >
                         
                        <th colspan="2" style="border: 1px solid #000 !important">
                            <span>
                                MINISTERE DE L EDUCATION NATIONALE ET <br> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
                                DE L'ALPHABETISATION
                               <div class="bars"></div>  &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;
                              DREN : KORHOGO
                            </span>
                           
                        </th>
                        <th colspan="4" style="border: 1px solid #000 !important">
                            <span>
                                BELLETIN TRIMESTIEL DES NOTES <br> &nbsp;&nbsp; &nbsp;&nbsp;
                                <span>1er Trimestre</span>
                            </span>
                        </th>
                        <th colspan="2" style="border: 1px solid #000 !important">
                            <span>
                                Année Scolaire <br> &nbsp;&nbsp; &nbsp;
                                {{AnneEncoursLibelle}}
                            </span>
                        </th> 
                    </tr>
                    <tr v-for="item in gettersconfigEntete" :key="item.id" >
                        <td colspan="6" style="border: 1px solid #000 !important">
                            
                        <img src="/front/img/Armoiries.png" width="70px;"  />       

                            <span>Etablissement :</span><span >{{item.nom}}</span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
                                <span>Logo:</span> <span >
                                    <img :src="item.photo" alt="" style="width:50px;">
                                    </span> <br>
                    &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;  <span>Situation :</span><span >{{item.adresse}}</span>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                           
                              <span>Téléthone:</span><span >{{item.contact}}</span>
                        </td>
                       
                        <td colspan="2"  style="border: 1px solid #000 !important">
                            <span>Code</span>: <span>{{item.code}}</span> <br>
                            <span>Statut</span>: <span>{{item.statut}}</span>
                        </td>
                    </tr>
                    
                    <tr>
                        <td colspan="7">

                        <div class="row" id="printMe">
                            <h5>
                    <span> {{editText.nom}} </span>   <span>  {{editText.prenom}} </span> <br>
                            </h5>
                            <div class="col">
                                 <div>
                               
                                <span> <span style="color:#000; font-weight:bold"> Matricule:</span> {{editText.matricule}} </span> <br>
                                <span> <span style="color:#000; font-weight:bold">Classe:</span> {{LibelleClasse(editText.classe_id)}}</span> <br>
                                <span> <span style="color:#000; font-weight:bold">Effectif:</span> {{EffectifDeLaClasse}} </span> <br>
                                </div>
                            </div>
                            <div class="col">
                                 <div>
                               
                                <span> <span style="color:#000;font-weight:600"> Sexe:</span> {{editText.sexe}} </span> <br>
                                <span> <span style="color:#000;font-weight:600">Né(e) le:</span> {{formaterDate1(editText.date_naissance)}}</span> <br>
                                <span> <span style="color:#000;font-weight:600">Lieu de Naissance:</span>  {{editText.lieu_naissance}}</span> <br>
                                <span> <span style="color:#000;font-weight:600"> Nationalité:</span> {{editText.nationalite}} </span> <br>
                                </div>
                            </div>
                            <div class="col">
                                 <div>
                               
                                <span> <span style="color:#000;font-weight:600"> Redoublant(e):</span>  {{editText.redoublant}} </span> <br>
                                <span> <span style="color:#000;font-weight:600"> Regime:</span> 
                                <span v-if="editText.regime ==1"> Boursier</span> 
                                <span v-else> Non Boursier</span> 
                                </span> <br>
                                <span> <span style="color:#000;font-weight:600"> Affecté(e):</span> {{editText.oriente}} </span> <br>
                                <span> <span style="color:#000;font-weight:600"> Interne:</span> {{editText.interime}} </span> <br>
                                </div>
                            </div>
                            <div class="col">
                               <span v-if="editText.photo !='vide'">
                                 <img :src="editText.photo" alt="" width="110px;" height="100px;" class="mb-3">
                              </span>
                              <span v-else>
                                 <img :src="url" alt="" width="110px;" height="100px;" class="mb-3">

                              </span>
                            </div>
                        </div>
                        </td>
                    </tr>
                    <tr style="border: 1px solid #000 !important">
                       <th style=" background-color:#FCBE28 ;border: 1px solid #000 !important;" width="200px">Disciplines</th>
                       <th style=" background-color:#FCBE28 ;border: 1px solid #000 !important;" width="30px" >Moy</th>
                       <th style=" background-color:#FCBE28 ;border: 1px solid #000 !important;" width="20px">Coef</th>
                       <th style=" background-color:#FCBE28 ;border: 1px solid #000 !important;" width="20px">Total</th>
                       <th style=" background-color:#FCBE28 ;border: 1px solid #000 !important;" width="20px">Rang</th>
                       <th style=" background-color:#FCBE28 ;border: 1px solid #000 !important;" width="100px">Appreciation</th>
                       <th style=" background-color:#FCBE28 ;border: 1px solid #000 !important;" width="100px">Professeurs</th>  
                    </tr>
                 
                    <tr v-for="item in MatiereLitteraire" :key="item.id" style="border: 1px solid #000 !important"> 
                        <td style="padding:0px; color:#000;border: 1px solid #000 !important;font-weight:bold">{{LibelleMatieres(item.nouvelle_matiere_id)}}</td>
                        <td style="padding:0px; text-align:center;border: 1px solid #000 !important">{{moyenneGeneraleParMatiere(item.id) || 0 }}</td>   
                        <td style="padding:0px; text-align:center;border: 1px solid #000 !important">{{coefficientParMatiere(item.id)}}</td>   
                        <td style="padding:0px; text-align:center;border: 1px solid #000 !important">{{moyenneGeneraleTotalParMatiere(item.id)}}</td>   
                      <td style="padding:0px; text-align:center;border: 1px solid #000 !important" v-if="rangEleve(item.id) == 1"> {{rangEleve(item.id)}}er(e) </td> 
                      <td style="padding:0px; text-align:center;border: 1px solid #000 !important" v-else-if="rangEleve(item.id) > 1"> {{rangEleve(item.id)}}ème </td> 
                      <td style="padding:0px; text-align:center;border: 1px solid #000 !important" v-else> 0 </td> 

                        <td style="padding:0px; text-align:center;border: 1px solid #000 !important">
                          <span v-if="moyenneGeneraleParMatiere(item.id) <=5">Très faible</span>
                          <span v-if="moyenneGeneraleParMatiere(item.id) >=6 && moyenneGeneraleParMatiere(item.id) <10">Faible</span>
                          <span v-if="moyenneGeneraleParMatiere(item.id) >= 10 && moyenneGeneraleParMatiere(item.id) <12">Passable</span>
                          <span v-if="moyenneGeneraleParMatiere(item.id) >= 12 && moyenneGeneraleParMatiere(item.id) <15">Bien</span>
                          <span v-if="moyenneGeneraleParMatiere(item.id) >= 15 && moyenneGeneraleParMatiere(item.id) <17">Très Bien</span>
                          <span v-if="moyenneGeneraleParMatiere(item.id) >= 17 && moyenneGeneraleParMatiere(item.id) <=20">Excellent</span>
                        </td>   
                        <td style="padding:0px 5px;border: 1px solid #000 !important">{{teacherName(teacherId(item.id)) || 'Non renseigné'}}</td>   
                    </tr>
                   
                   
                    <tr style=" background-color:aqua !important;border: 1px solid #000 !important">
                        <th colspan="1"  style="padding-left:5px; background-color:aqua !important;border: 1px solid #000 !important">BILAN LETTRES</th>
                        <td style="padding:5px; text-align:center;background-color:aqua !important;border: 1px solid #000 !important" >
                       
                           {{TotalNoteMoyenne}}
                        </td>
                        <td style="padding:5px; text-align:center;background-color:aqua !important;border: 1px solid #000 !important"> {{TotalNoteCoefficient}} </td>
                        <td style="padding:5px; text-align:center;background-color:aqua !important;border: 1px solid #000 !important">{{TotalSommeMoyenne}}</td>
                        
                    </tr>
                   

                     <tr v-for="item in MatiereScience" :key="item.id" style="border: 1px solid #000 !important">
                        <td style="padding:0px; color:#000 !important;font-weight:bold;border: 1px solid #000 !important">{{LibelleMatieres(item.nouvelle_matiere_id)}}</td>
                        <td style="padding:0px; text-align:center;border: 1px solid #000 !important">{{moyenneGeneraleParMatiere(item.id)}}</td>   
                        <td style="padding:0px; text-align:center;border: 1px solid #000 !important">{{coefficientParMatiere(item.id)}}</td>   
                        <td style="padding:0px; text-align:center;border: 1px solid #000 !important">{{moyenneGeneraleTotalParMatiere(item.id) }}</td>  
                          <td style="padding:0px; text-align:center;border: 1px solid #000 !important" v-if="rangEleve(item.id) == 1"> {{rangEleve(item.id)}}er(e) </td> 
                          <td style="padding:0px; text-align:center;border: 1px solid #000 !important" v-else-if="rangEleve(item.id) > 1"> {{rangEleve(item.id)}}ème </td> 
                          <td style="padding:0px; text-align:center;border: 1px solid #000 !important" v-else> 0 </td> 
                      
                          <td style="padding:0px; text-align:center;border: 1px solid #000 !important">
                          <span v-if="moyenneGeneraleParMatiere(item.id) <=5">Très faible</span>
                          <span v-if="moyenneGeneraleParMatiere(item.id) >=6 && moyenneGeneraleParMatiere(item.id) <10">Faible</span>
                          <span v-if="moyenneGeneraleParMatiere(item.id) >= 10 && moyenneGeneraleParMatiere(item.id) <12">Passable</span>
                          <span v-if="moyenneGeneraleParMatiere(item.id) >= 12 && moyenneGeneraleParMatiere(item.id) <15">Bien</span>
                          <span v-if="moyenneGeneraleParMatiere(item.id) >= 15 && moyenneGeneraleParMatiere(item.id) <17">Très Bien</span>
                          <span v-if="moyenneGeneraleParMatiere(item.id) >= 17 && moyenneGeneraleParMatiere(item.id) <=20">Excellent</span>
                        </td>   
                        <td style="padding:0px 2px;border: 1px solid #000 !important">{{teacherName(teacherId(item.id)) || 'Non renseigné'}}</td>   
                    </tr>
                
                  
                   
                   
                     <tr style=" background-color:aqua !important;border: 1px solid #000 !important">
                        <th colspan="1"  style="padding-left:5px;background-color:aqua !important;border: 1px solid #000 !important">BILAN SCIENCES</th>
                        <td style="padding:5px; text-align:center;background-color:aqua !important;border: 1px solid #000 !important" >
                          
                          {{sommeMoyenneScience}}
                          
                  
                        </td>
                        <td style="padding:5px; text-align:center;background-color:aqua !important;border: 1px solid #000 !important">{{TotalCoefficientScience}}</td>
                        <td style="padding:5px; text-align:center;background-color:aqua !important;border: 1px solid #000 !important"> {{TotalMoyenneScience}} </td>
                        <!-- <td colspan="" style="padding:5px; text-align:center;background-color:aqua !important;">203ex</td> -->
                        
                    </tr>
                     <tr v-for="item in MatiereAutre" :key="item.id">
                        <td style="padding:0px;color:#000 !important;font-weight:bold;border: 1px solid #000 !important">{{LibelleMatieres(item.nouvelle_matiere_id)}}</td>
                        <td style="padding:0px; text-align:center;border: 1px solid #000 !important">{{moyenneGeneraleParMatiere(item.id)}}</td>   
                        <td style="padding:0px; text-align:center;border: 1px solid #000 !important">
                          <span >{{coefficientParMatiere(item.id)}} </span>
                        </td>   
                        <td style="padding:0px; text-align:center;border: 1px solid #000 !important">{{moyenneGeneraleTotalParMatiere(item.id)}}</td>  
                          <td style="padding:0px; text-align:center;border: 1px solid #000 !important" v-if="rangEleve(item.id) == 1"> {{rangEleve(item.id)}}er(e) </td> 
                          <td style="padding:0px; text-align:center;border: 1px solid #000 !important" v-else-if="rangEleve(item.id) > 1"> {{rangEleve(item.id)}}ème </td> 
                          <td style="padding:0px; text-align:center;border: 1px solid #000 !important" v-else> 0 </td>

                     
                        <td style="padding:0px; text-align:center;border: 1px solid #000 !important">
                          <span v-if="moyenneGeneraleParMatiere(item.id) <=5">Très faible</span>
                          <span v-if="moyenneGeneraleParMatiere(item.id) >=6 && moyenneGeneraleParMatiere(item.id) <10">Faible</span>
                          <span v-if="moyenneGeneraleParMatiere(item.id) >= 10 && moyenneGeneraleParMatiere(item.id) <12">Passable</span>
                          <span v-if="moyenneGeneraleParMatiere(item.id) >= 12 && moyenneGeneraleParMatiere(item.id) <15">Bien</span>
                          <span v-if="moyenneGeneraleParMatiere(item.id) >= 15 && moyenneGeneraleParMatiere(item.id) <17">Très Bien</span>
                          <span v-if="moyenneGeneraleParMatiere(item.id) >= 17 && moyenneGeneraleParMatiere(item.id) <=20">Excellent</span>
                        </td>   
                        <td style="padding:0px 2px; border: 1px solid #000 !important">{{teacherName(teacherId(item.id)) || 'Non renseigné'}}</td>   
                    </tr>
                   
                     
                    
                    
                     <tr style=" background-color:aqua !important;">
                        <th colspan="1"  style="padding-left:5px;background-color:aqua !important;border: 1px solid #000 !important">TOTAUX</th>
                       
                        <td style="padding:5px; text-align:center;background-color:aqua !important;border: 1px solid #000 !important">
                           {{moyenneTotaux}}
                        </td>
                        <td style="padding:5px; text-align:center;background-color:aqua !important;border: 1px solid #000 !important">{{coefficientTotaux}}</td>
                        <td style="padding:5px; text-align:center;background-color:aqua !important;border: 1px solid #000 !important">{{cumulTotaux}}</td>
                        <!-- <td colspan="" style="padding:5px; text-align:center;background-color:aqua !important;"></td> -->
                        
                    </tr>
                    <tr style=" background-color:#FCBE28 !important;">
                        <th  style=" background-color:#FCBE28 !important;border: 1px solid #000 !important" colspan="2" width="200px">Assuidité</th>
                        <!-- <th width="200px">1er Trimestre</th> -->
                        <!-- <th width="200px">2er Trimestre</th> -->
                        <th style=" background-color:#FCBE28 !important;border: 1px solid #000 !important" colspan="3" >Moyenne Trimestrielle</th>
                        <th style=" background-color:#FCBE28 !important;border: 1px solid #000 !important" colspan="2">Resultat de classe</th>
                    </tr>
                    <tr>
                       <td colspan="2" style="padding:5px; text-align:center;border: 1px solid #000 !important">
                          <span>Absence: </span> <span style="color:#000;font-weight:600"> {{NbreAbsence}} </span> <br>
                          <span>Jutifié:</span><span style="color:#000;font-weight:600">0</span> 
                        </td> 
                      <!-- <td style="padding:0px; text-align:center;">
                          <span>Moy: </span> <span style="color:#000;font-weight:600">11</span> <br>
                          <span>Rang:</span><span style="color:#000;font-weight:600">50è</span> 
                     </td >    -->
                        <td colspan="3" style="padding:0px; text-align:center;border: 1px solid #000 !important">
                          <span>Moy: </span> <span style="color:#000;font-weight:600">{{moyenneTrimestre}}</span> <br>
                          <span>Rang:</span><span style="color:#000;font-weight:600">4è</span> 
                       </td>   
                        <!-- <td colspan="2" style="padding:0px; text-align:center;">
                            <span>8.6/20</span> <br>
                             <span>Rang:</span><span style="color:#000;font-weight:600">78è sur 80</span> 
                        </td>    -->
                        <td colspan="2" style="padding:0px;border: 1px solid #000 !important">
                          <span>Moyenne: </span> <span style="color:#000;font-weight:600">12</span> <br>
                          <span>Mini  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  :</span>
                          <span style="color:#000;font-weight:600">06</span>    <br> 
                          <span>Max  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;     :</span>
                          <span style="color:#000;font-weight:600">15</span>     
                        </td>   
                         
                    </tr>
                    
                  </table>
                 
                </div>
              </div>
            </div>
          
          </div>
          <!--Row-->
             <!-- Row -->
          <div class="row  mr-3" v-if="formData.trimestre_id ==2">
            <!-- Datatables -->
            <div class="col-lg-12">
              <div class="card mb-5">
               
                <div class="table-responsive p-3">
                  
                  <table class="table align-items-center table-flush" id="dataTable">
                   
                     <tr >
                         
                        <th colspan="2">
                            <span>
                                MINISTERE DE L EDUCATION NATIONALE ET <br> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
                                DE L'ALPHABETISATION
                               <div class="bars"></div>  &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;
                              DREN : KORHOGO
                            </span>
                           
                        </th>
                        <th colspan="3">
                            <span>
                                BELLETIN TRIMESTIEL DES NOTES <br> &nbsp;&nbsp; &nbsp;&nbsp;
                                <span>2è Trimestre</span>
                            </span>
                        </th>
                        <th colspan="2">
                            <span>
                                Année Scolaire <br> &nbsp;&nbsp; &nbsp;
                                {{AnneEncoursLibelle}}
                            </span>
                        </th> 
                    </tr>
                    <tr>
                        <td colspan="4">
                            
                        <img src="/front/img/Armoiries.png" width="70px;"  />       

                            <span>Etablissement :</span> <span>LYCEE MODERNE KORHOGO</span> <br> &nbsp;&nbsp;  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  <span>Adresse :</span> <span> KORHOGO</span>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                           
                              <span>Téléthone:</span><span>+225 07 07 46 16 08</span>
                        </td>
                       
                        <td colspan="3">
                            <span>Code</span>: <span>00985</span> <br>
                            <span>Statut</span>: <span>Public</span>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="7">

                        <div class="row">
                            <h5>
                    <span> {{editText.nom}} </span>   <span>  {{editText.prenom}} </span> <br>
                            </h5>
                            <div class="col">
                                 <div>
                               
                                <span> <span style="color:#000; font-weight:bold"> Matricule:</span> {{editText.matricule}} </span> <br>
                                <span> <span style="color:#000; font-weight:bold">Classe:</span> {{LibelleClasse(editText.classe_id)}}</span> <br>
                                <span> <span style="color:#000; font-weight:bold">Effectif:</span> {{EffectifDeLaClasse}} </span> <br>
                                </div>
                            </div>
                            <div class="col">
                                 <div>
                               
                                <span> <span style="color:#000;font-weight:600"> Sexe:</span> {{editText.sexe}} </span> <br>
                                <span> <span style="color:#000;font-weight:600">Né(e) le:</span> {{formaterDate1(editText.date_naissance)}}</span> <br>
                                <span> <span style="color:#000;font-weight:600">Lieu de Naissance:</span> Lataha/Korhogo</span> <br>
                                <span> <span style="color:#000;font-weight:600"> Nationalité:</span> {{editText.nationalite}} </span> <br>
                                </div>
                            </div>
                            <div class="col">
                                 <div>
                               
                                <span> <span style="color:#000;font-weight:600"> Redoublant(e):</span> Non </span> <br>
                                <span> <span style="color:#000;font-weight:600"> Regime:</span> Non Bousier</span> <br>
                                <span> <span style="color:#000;font-weight:600"> Affecté(e):</span> {{editText.oriente}} </span> <br>
                                <span> <span style="color:#000;font-weight:600"> Interne:</span> Oui </span> <br>
                                </div>
                            </div>
                            <div class="col">
                              <span v-if="editText.photo !='vide'">
                                 <img :src="editText.photo" alt="" width="110px;" height="100px;" class="mb-3">
                              </span>
                              <span v-else>
                                 <img :src="url" alt="" width="110px;" height="100px;" class="mb-3">

                              </span>
                            </div>
                        </div>
                        </td>
                    </tr>
                    <tr>
                       <th width="200px">Disciplines</th>
                       <th width="30px" >Moy</th>
                       <th width="20px">Coef</th>
                       <th width="20px">Total</th>
                       <th width="20px">Rang</th>
                       <th width="100px">Appreciation</th>
                       <th width="100px">Professeurs</th>  
                    </tr>
                    <tr>
                        <td style="padding:0px">Composition française</td>
                        <td style="padding:0px; text-align:center;">9</td>
                        <td rowspan="3" style="padding:18px; text-align:center;">1</td>
                        <td rowspan="3" style="padding:18px; text-align:center;">8.56</td>
                        <td rowspan="3" style="padding:18px; text-align:center;">30è</td>
                        <td rowspan="3" style="padding:18px; text-align:center;">Très bon élève</td>
                        <td rowspan="3" style="padding:18px; text-align:center;">Kouakou Alain</td>
                        
                    </tr>
                    <tr>
                        <td style="padding:0px">Expression orale</td>
                        <td style="padding:0px; text-align:center;">5</td>
                        
                        
                    </tr>
                    <tr>
                        <td style="padding:0px">Orthographe Grammaire</td>
                        <td style="padding:0px; text-align:center;">9</td>   
                    </tr>
                    <tr>
                        <td style="padding:0px">Anglais</td>
                        <td style="padding:0px; text-align:center;">15</td>   
                        <td style="padding:0px; text-align:center;">1</td>   
                        <td style="padding:0px; text-align:center;">15</td>   
                        <td style="padding:0px; text-align:center;">26è</td>   
                        <td style="padding:0px; text-align:center;">Exellent</td>   
                        <td style="padding:0px; text-align:center;">Jean Paul</td>   
                    </tr>
                    <tr>
                        <td style="padding:0px">Allemand</td>
                        <td style="padding:0px; text-align:center;">10</td>   
                        <td style="padding:0px; text-align:center;">1</td>   
                        <td style="padding:0px; text-align:center;">10</td>   
                        <td style="padding:0px; text-align:center;">20è</td>   
                        <td style="padding:0px; text-align:center;">Moyen</td>   
                        <td style="padding:0px; text-align:center;">Jean kouakou</td>   
                    </tr>
                    <tr>
                        <td style="padding:0px">Espagnol</td>
                        <td style="padding:0px; text-align:center;">10</td>   
                        <td style="padding:0px; text-align:center;">1</td>   
                        <td style="padding:0px; text-align:center;">13</td>   
                        <td style="padding:0px; text-align:center;">60è</td>   
                        <td style="padding:0px; text-align:center;">Moyen</td>   
                        <td style="padding:0px; text-align:center;"> kouakou</td>   
                    </tr>
                    <tr>
                        <td style="padding:0px">Histoire-Géographie</td>
                        <td style="padding:0px; text-align:center;">17</td>   
                        <td style="padding:0px; text-align:center;">1</td>   
                        <td style="padding:0px; text-align:center;">10</td>   
                        <td style="padding:0px; text-align:center;">6è</td>   
                        <td style="padding:0px; text-align:center;">Moyen</td>   
                        <td style="padding:0px; text-align:center;">Jean </td>   
                    </tr>
                    <tr style=" background-color:aqua;">
                        <th colspan="1"  style="padding-left:5px; background-color:aqua;">BILAN LETTRES</th>
                        <td style="padding:5px; text-align:center;" >8.6</td>
                        <td style="padding:5px; text-align:center;">6</td>
                        <td style="padding:5px; text-align:center;">65</td>
                        <td colspan="" style="padding:5px; text-align:center;">23ex</td>
                        
                    </tr>
                    <tr>
                        <td style="padding:0px">Mathématiques</td>
                        <td style="padding:0px; text-align:center;">9</td>   
                        <td style="padding:0px; text-align:center;">1</td>   
                        <td style="padding:0px; text-align:center;">9</td>   
                        <td style="padding:0px; text-align:center;">66è</td>   
                        <td style="padding:0px; text-align:center;">Faible</td>   
                        <td style="padding:0px; text-align:center;"> Dolman</td>   
                    </tr>
                    <tr>
                        <td style="padding:0px">Physique-Chimie</td>
                        <td style="padding:0px; text-align:center;">9</td>   
                        <td style="padding:0px; text-align:center;">1</td>   
                        <td style="padding:0px; text-align:center;">9</td>   
                        <td style="padding:0px; text-align:center;">66è</td>   
                        <td style="padding:0px; text-align:center;">Faible</td>   
                        <td style="padding:0px; text-align:center;"> Dolman</td>   
                    </tr>
                    <tr>
                        <td style="padding:0px">Svt</td>
                        <td style="padding:0px; text-align:center;">9</td>   
                        <td style="padding:0px; text-align:center;">1</td>   
                        <td style="padding:0px; text-align:center;">9</td>   
                        <td style="padding:0px; text-align:center;">66è</td>   
                        <td style="padding:0px; text-align:center;">Faible</td>   
                        <td style="padding:0px; text-align:center;"> Dolman</td>   
                    </tr>
                     <tr style=" background-color:aqua;">
                        <th colspan="1"  style="padding-left:5px;">BILAN SCIENCES</th>
                        <td style="padding:5px; text-align:center;" >8.6</td>
                        <td style="padding:5px; text-align:center;">6</td>
                        <td style="padding:5px; text-align:center;">65</td>
                        <td colspan="" style="padding:5px; text-align:center;">23ex</td>
                        
                    </tr>
                     <tr>
                        <td style="padding:0px">EDHC</td>
                        <td style="padding:0px; text-align:center;">9</td>   
                        <td style="padding:0px; text-align:center;">1</td>   
                        <td style="padding:0px; text-align:center;">9</td>   
                        <td style="padding:0px; text-align:center;">66è</td>   
                        <td style="padding:0px; text-align:center;">Faible</td>   
                        <td style="padding:0px; text-align:center;"> Dolman</td>   
                    </tr>
                     <tr>
                        <td style="padding:0px">EPS</td>
                        <td style="padding:0px; text-align:center;">9</td>   
                        <td style="padding:0px; text-align:center;">1</td>   
                        <td style="padding:0px; text-align:center;">9</td>   
                        <td style="padding:0px; text-align:center;">66è</td>   
                        <td style="padding:0px; text-align:center;">Faible</td>   
                        <td style="padding:0px; text-align:center;"> Dolman</td>   
                    </tr>
                     <tr>
                        <td style="padding:0px">Arts Plqstiaues</td>
                        <td style="padding:0px; text-align:center;">9</td>   
                        <td style="padding:0px; text-align:center;">1</td>   
                        <td style="padding:0px; text-align:center;">9</td>   
                        <td style="padding:0px; text-align:center;">66è</td>   
                        <td style="padding:0px; text-align:center;">Faible</td>   
                        <td style="padding:0px; text-align:center;"> Dolman</td>   
                    </tr>
                     <tr>
                        <td style="padding:0px">Musique</td>
                        <td style="padding:0px; text-align:center;">9</td>   
                        <td style="padding:0px; text-align:center;">1</td>   
                        <td style="padding:0px; text-align:center;">9</td>   
                        <td style="padding:0px; text-align:center;">66è</td>   
                        <td style="padding:0px; text-align:center;">Faible</td>   
                        <td style="padding:0px; text-align:center;"> Dolman</td>   
                    </tr>
                     <tr>
                        <td style="padding:0px">Conduite</td>
                        <td style="padding:0px; text-align:center;">9</td>   
                        <td style="padding:0px; text-align:center;">1</td>   
                        <td style="padding:0px; text-align:center;">9</td>   
                        <td style="padding:0px; text-align:center;">66è</td>   
                        <td style="padding:0px; text-align:center;">Faible</td>   
                        <td style="padding:0px; text-align:center;"> Dolman</td>   
                    </tr>
                     <tr>
                        <td style="padding:0px">Bonus T.M</td>
                        <td style="padding:0px; text-align:center;">9</td>   
                        <td style="padding:0px; text-align:center;">1</td>   
                        <td style="padding:0px; text-align:center;">0</td>   
                        <td style="padding:0px; text-align:center;">66è</td>   
                        <td style="padding:0px; text-align:center;">Faible</td>   
                        <td style="padding:0px; text-align:center;"> Dolman</td>   
                    </tr>
                     <tr style=" background-color:aqua;">
                        <th colspan="2"  style="padding-left:5px;">TOTAUX</th>
                       
                        <td style="padding:5px; text-align:center;">11</td>
                        <td style="padding:5px; text-align:center;">78.50</td>
                        <td colspan="" style="padding:5px; text-align:center;"></td>
                        
                    </tr>

                    <tr>
                        <th width="200px">1er Trimestre</th>
                        <!-- <th width="200px">2er Trimestre</th> -->
                        <th colspan="3" >Moyenne Annuelle</th>
                        <th colspan="2">Resultat de classe</th>
                        <th >Assuidité</th>
                    </tr>
                    <tr>
                      <td style="padding:0px; text-align:center;">
                          <span>Moy: </span> <span style="color:#000;font-weight:600">11</span> <br>
                          <span>Rang:</span><span style="color:#000;font-weight:600">50è</span> 
                     </td>   
                        <!-- <td style="padding:0px; text-align:center;">
                          <span>Moy: </span> <span style="color:#000;font-weight:600">09</span> <br>
                          <span>Rang:</span><span style="color:#000;font-weight:600">78è</span> 
                       </td>    -->
                        <td colspan="3" style="padding:0px; text-align:center;">
                            <span>8.6/20</span> <br>
                             <span>Rang:</span><span style="color:#000;font-weight:600">78è sur 80</span> 
                        </td>   
                        <td colspan="2" style="padding:0px;">
                          <span>Moyenne: </span> <span style="color:#000;font-weight:600">12</span> <br>
                          <span>Mini  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  :</span>
                          <span style="color:#000;font-weight:600">06</span>    <br> 
                          <span>Max  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;     :</span>
                          <span style="color:#000;font-weight:600">15</span>     
                        </td>   
                        <td  style="padding:0px; text-align:center;">
                          <span>Absence: </span> <span style="color:#000;font-weight:600"> {{NbreAbsence}} </span> <br>
                          <span>Jutifié:</span><span style="color:#000;font-weight:600">2</span> 
                        </td>   
                    </tr>
                    
                  </table>
                </div>
              </div>
           
            
            </div>
           
          </div>
          <!--Row-->
             <!-- Row -->
          <div class="row  mr-3" v-if="formData.trimestre_id ==3">
            <!-- Datatables -->
            <div class="col-lg-12">
              <div class="card mb-5">
               
                <div class="table-responsive p-3">
                  
                  <table class="table align-items-center table-flush" id="dataTable">
                   
                     <tr >
                         
                        <th colspan="2">
                            <span>
                                MINISTERE DE L EDUCATION NATIONALE ET <br> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
                                DE L'ALPHABETISATION
                               <div class="bars"></div>  &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;
                              DREN : KORHOGO
                            </span>
                           
                        </th>
                        <th colspan="3">
                            <span>
                                BELLETIN TRIMESTIEL DES NOTES <br> &nbsp;&nbsp; &nbsp;&nbsp;
                                <span>3è Trimestre</span>
                            </span>
                        </th>
                        <th colspan="2">
                            <span>
                                Année Scolaire <br> &nbsp;&nbsp; &nbsp;
                                2020-2021
                            </span>
                        </th> 
                    </tr>
                    <tr>
                        <td colspan="4">
                            
                        <img src="/front/img/Armoiries.png" width="70px;"  />       

                            <span>Etablissement :</span> <span>LYCEE MODERNE KORHOGO</span> <br> &nbsp;&nbsp;  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  <span>Adresse :</span> <span> KORHOGO</span>
                             &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                             &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                              <span>Téléthone:</span><span>+225 07 07 46 16 08</span>
                        </td>
                       
                        <td colspan="3">
                            <span>Code</span>: <span>00985</span> <br>
                            <span>Statut</span>: <span>Public</span>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="7">

                        <div class="row">
                            <h5>
                    <span> {{editText.nom}} </span>   <span>  {{editText.prenom}} </span> <br>
                            </h5>
                            <div class="col">
                                 <div>
                               
                                <span> <span style="color:#000; font-weight:bold"> Matricule:</span> {{editText.matricule}} </span> <br>
                                <span> <span style="color:#000; font-weight:bold">Classe:</span> {{LibelleClasse(editText.classe_id)}}</span> <br>
                                <span> <span style="color:#000; font-weight:bold">Effectif:</span> {{EffectifDeLaClasse}} </span> <br>
                                </div>
                            </div>
                            <div class="col">
                                 <div>
                               
                                <span> <span style="color:#000;font-weight:600"> Sexe:</span> {{editText.sexe}} </span> <br>
                                <span> <span style="color:#000;font-weight:600">Né(e) le:</span> {{formaterDate1(editText.date_naissance)}}</span> <br>
                                <span> <span style="color:#000;font-weight:600">Lieu de Naissance:</span> Lataha/Korhogo</span> <br>
                                <span> <span style="color:#000;font-weight:600"> Nationalité:</span> {{editText.nationalite}} </span> <br>
                                </div>
                            </div>
                            <div class="col">
                                 <div>
                               
                                <span> <span style="color:#000;font-weight:600"> Redoublant(e):</span> Non </span> <br>
                                <span> <span style="color:#000;font-weight:600"> Regime:</span> Non Bousier</span> <br>
                                <span> <span style="color:#000;font-weight:600"> Affecté(e):</span> {{editText.oriente}} </span> <br>
                                <span> <span style="color:#000;font-weight:600"> Interne:</span> Oui </span> <br>
                                </div>
                            </div>
                            <div class="col">
                                 <img :src="editText.photo" alt="" width="110px;" height="100px;" class="mb-3">
                            </div>
                        </div>
                        </td>
                    </tr>
                    <tr>
                       <th width="200px">Disciplines</th>
                       <th width="30px" >Moy</th>
                       <th width="20px">Coef</th>
                       <th width="20px">Total</th>
                       <th width="20px">Rang</th>
                       <th width="100px">Appreciation</th>
                       <th width="100px">Professeurs</th>  
                    </tr>
                    <tr>
                        <td style="padding:0px">Composition française</td>
                        <td style="padding:0px; text-align:center;">9</td>
                        <td rowspan="3" style="padding:18px; text-align:center;">1</td>
                        <td rowspan="3" style="padding:18px; text-align:center;">8.56</td>
                        <td rowspan="3" style="padding:18px; text-align:center;">30è</td>
                        <td rowspan="3" style="padding:18px; text-align:center;">Très bon élève</td>
                        <td rowspan="3" style="padding:18px; text-align:center;">Kouakou Alain</td>
                        
                    </tr>
                    <tr>
                        <td style="padding:0px">Expression orale</td>
                        <td style="padding:0px; text-align:center;">5</td>
                        
                        
                    </tr>
                    <tr>
                        <td style="padding:0px">Orthographe Grammaire</td>
                        <td style="padding:0px; text-align:center;">9</td>   
                    </tr>
                    <tr>
                        <td style="padding:0px">Anglais</td>
                        <td style="padding:0px; text-align:center;">15</td>   
                        <td style="padding:0px; text-align:center;">1</td>   
                        <td style="padding:0px; text-align:center;">15</td>   
                        <td style="padding:0px; text-align:center;">26è</td>   
                        <td style="padding:0px; text-align:center;">Exellent</td>   
                        <td style="padding:0px; text-align:center;">Jean Paul</td>   
                    </tr>
                    <tr>
                        <td style="padding:0px">Allemand</td>
                        <td style="padding:0px; text-align:center;">10</td>   
                        <td style="padding:0px; text-align:center;">1</td>   
                        <td style="padding:0px; text-align:center;">10</td>   
                        <td style="padding:0px; text-align:center;">20è</td>   
                        <td style="padding:0px; text-align:center;">Moyen</td>   
                        <td style="padding:0px; text-align:center;">Jean kouakou</td>   
                    </tr>
                    <tr>
                        <td style="padding:0px">Espagnol</td>
                        <td style="padding:0px; text-align:center;">10</td>   
                        <td style="padding:0px; text-align:center;">1</td>   
                        <td style="padding:0px; text-align:center;">13</td>   
                        <td style="padding:0px; text-align:center;">60è</td>   
                        <td style="padding:0px; text-align:center;">Moyen</td>   
                        <td style="padding:0px; text-align:center;"> kouakou</td>   
                    </tr>
                    <tr>
                        <td style="padding:0px">Histoire-Géographie</td>
                        <td style="padding:0px; text-align:center;">17</td>   
                        <td style="padding:0px; text-align:center;">1</td>   
                        <td style="padding:0px; text-align:center;">10</td>   
                        <td style="padding:0px; text-align:center;">6è</td>   
                        <td style="padding:0px; text-align:center;">Moyen</td>   
                        <td style="padding:0px; text-align:center;">Jean </td>   
                    </tr>
                    <tr style=" background-color:aqua;">
                        <th colspan="1"  style="padding-left:5px; background-color:aqua;">BILAN LETTRES</th>
                        <td style="padding:5px; text-align:center;" >8.6</td>
                        <td style="padding:5px; text-align:center;">6</td>
                        <td style="padding:5px; text-align:center;">65</td>
                        <td colspan="" style="padding:5px; text-align:center;">23ex</td>
                        
                    </tr>
                    <tr>
                        <td style="padding:0px">Mathématiques</td>
                        <td style="padding:0px; text-align:center;">9</td>   
                        <td style="padding:0px; text-align:center;">1</td>   
                        <td style="padding:0px; text-align:center;">9</td>   
                        <td style="padding:0px; text-align:center;">66è</td>   
                        <td style="padding:0px; text-align:center;">Faible</td>   
                        <td style="padding:0px; text-align:center;"> Dolman</td>   
                    </tr>
                    <tr>
                        <td style="padding:0px">Physique-Chimie</td>
                        <td style="padding:0px; text-align:center;">9</td>   
                        <td style="padding:0px; text-align:center;">1</td>   
                        <td style="padding:0px; text-align:center;">9</td>   
                        <td style="padding:0px; text-align:center;">66è</td>   
                        <td style="padding:0px; text-align:center;">Faible</td>   
                        <td style="padding:0px; text-align:center;"> Dolman</td>   
                    </tr>
                    <tr>
                        <td style="padding:0px">Svt</td>
                        <td style="padding:0px; text-align:center;">9</td>   
                        <td style="padding:0px; text-align:center;">1</td>   
                        <td style="padding:0px; text-align:center;">9</td>   
                        <td style="padding:0px; text-align:center;">66è</td>   
                        <td style="padding:0px; text-align:center;">Faible</td>   
                        <td style="padding:0px; text-align:center;"> Dolman</td>   
                    </tr>
                     <tr style=" background-color:aqua;">
                        <th colspan="1"  style="padding-left:5px;">BILAN SCIENCES</th>
                        <td style="padding:5px; text-align:center;" >8.6</td>
                        <td style="padding:5px; text-align:center;">6</td>
                        <td style="padding:5px; text-align:center;">65</td>
                        <td colspan="" style="padding:5px; text-align:center;">23ex</td>
                        
                    </tr>
                     <tr>
                        <td style="padding:0px">EDHC</td>
                        <td style="padding:0px; text-align:center;">9</td>   
                        <td style="padding:0px; text-align:center;">1</td>   
                        <td style="padding:0px; text-align:center;">9</td>   
                        <td style="padding:0px; text-align:center;">66è</td>   
                        <td style="padding:0px; text-align:center;">Faible</td>   
                        <td style="padding:0px; text-align:center;"> Dolman</td>   
                    </tr>
                     <tr>
                        <td style="padding:0px">EPS</td>
                        <td style="padding:0px; text-align:center;">9</td>   
                        <td style="padding:0px; text-align:center;">1</td>   
                        <td style="padding:0px; text-align:center;">9</td>   
                        <td style="padding:0px; text-align:center;">66è</td>   
                        <td style="padding:0px; text-align:center;">Faible</td>   
                        <td style="padding:0px; text-align:center;"> Dolman</td>   
                    </tr>
                     <tr>
                        <td style="padding:0px">Arts Plqstiaues</td>
                        <td style="padding:0px; text-align:center;">9</td>   
                        <td style="padding:0px; text-align:center;">1</td>   
                        <td style="padding:0px; text-align:center;">9</td>   
                        <td style="padding:0px; text-align:center;">66è</td>   
                        <td style="padding:0px; text-align:center;">Faible</td>   
                        <td style="padding:0px; text-align:center;"> Dolman</td>   
                    </tr>
                     <tr>
                        <td style="padding:0px">Musique</td>
                        <td style="padding:0px; text-align:center;">9</td>   
                        <td style="padding:0px; text-align:center;">1</td>   
                        <td style="padding:0px; text-align:center;">9</td>   
                        <td style="padding:0px; text-align:center;">66è</td>   
                        <td style="padding:0px; text-align:center;">Faible</td>   
                        <td style="padding:0px; text-align:center;"> Dolman</td>   
                    </tr>
                     <tr>
                        <td style="padding:0px">Conduite</td>
                        <td style="padding:0px; text-align:center;">9</td>   
                        <td style="padding:0px; text-align:center;">1</td>   
                        <td style="padding:0px; text-align:center;">9</td>   
                        <td style="padding:0px; text-align:center;">66è</td>   
                        <td style="padding:0px; text-align:center;">Faible</td>   
                        <td style="padding:0px; text-align:center;"> Dolman</td>   
                    </tr>
                     <tr>
                        <td style="padding:0px">Bonus T.M</td>
                        <td style="padding:0px; text-align:center;">9</td>   
                        <td style="padding:0px; text-align:center;">1</td>   
                        <td style="padding:0px; text-align:center;">0</td>   
                        <td style="padding:0px; text-align:center;">66è</td>   
                        <td style="padding:0px; text-align:center;">Faible</td>   
                        <td style="padding:0px; text-align:center;"> Dolman</td>   
                    </tr>
                     <tr style=" background-color:aqua;">
                        <th colspan="2"  style="padding-left:5px;">TOTAUX</th>
                       
                        <td style="padding:5px; text-align:center;">11</td>
                        <td style="padding:5px; text-align:center;">78.50</td>
                        <td colspan="" style="padding:5px; text-align:center;"></td>
                        
                    </tr>

                    <tr>
                        <th width="200px">1er Trimestre</th>
                        <th width="200px">2er Trimestre</th>
                        <th colspan="2" >Moyenne Annuelle</th>
                        <th colspan="2">Resultat de classe</th>
                        <th >Assuidité</th>
                    </tr>
                    <tr>
                      <td style="padding:0px; text-align:center;">
                          <span>Moy: </span> <span style="color:#000;font-weight:600">11</span> <br>
                          <span>Rang:</span><span style="color:#000;font-weight:600">50è</span> 
                     </td>   
                        <td style="padding:0px; text-align:center;">
                          <span>Moy: </span> <span style="color:#000;font-weight:600">09</span> <br>
                          <span>Rang:</span><span style="color:#000;font-weight:600">78è</span> 
                       </td>   
                        <td colspan="2" style="padding:0px; text-align:center;">
                            <span>8.6/20</span> <br>
                             <span>Rang:</span><span style="color:#000;font-weight:600">78è sur 80</span> 
                        </td>   
                        <td colspan="2" style="padding:0px;">
                          <span>Moyenne: </span> <span style="color:#000;font-weight:600">12</span> <br>
                          <span>Mini  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  :</span>
                          <span style="color:#000;font-weight:600">06</span>    <br> 
                          <span>Max  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;     :</span>
                          <span style="color:#000;font-weight:600">15</span>     
                        </td>   
                        <td  style="padding:0px; text-align:center;">
                          <span>Absence: </span> <span style="color:#000;font-weight:600"> {{NbreAbsence}} </span> <br>
                          <span>Jutifié:</span><span style="color:#000;font-weight:600">0</span> 
                        </td>   
                    </tr>
                    
                  </table>
                </div>
              </div>
           
            
            </div>
           
          </div>
          <!--Row-->
     </div>
  </div>
</template>

<script>
import {required} from "vuelidate/lib/validators";
import moment from "moment"
import {mapGetters, mapActions} from "vuex";
// import editStudentVue from './editStudent.vue';
export default {
    name:'staudent',
    components:{
        
        },

    data(){
        return {
          tableau:[],
          formData:{
            trimestre_id:"",
          },
        urlImg:"https://cdn.pixabay.com/photo/2017/06/09/23/22/people-2388584_960_720.png",
           showIsModal: false,
           showIsModalAbsence: false,
           showIsModalEmail: false,
           showIsModalSMS: false,
           showIsModalScolarite: false,
           showIsModalTransport: false,
          url:"/front/img/url1.jpg",
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
            
        }
    },

    created(){
        this.editText = this.GetterStudent.find(tem =>tem.id == this.$route.params.id)
        console.log( this.editText)
    if(this.gettersClasse.length == 0){
      this.getClasse();
    }
    this.get_note();
    this.getRole();
    this.getUtilisateur();
    this.getAffectation();
     this.getMatiere();
      this.getNouvelleMatiere();
     this.getTransport();
     this.getAbsence();
      this.getNiveau();
      this.getTrimestre();
      this.get_all_student();
      this.getMoyenne();
      this.get_Liste_Cantine();
       this.getScolarite()
         this.getconfigEntete();
      this.getAnnee();
    },

     validations:{
        Transports:{
              // paye_par_annee:{required},
              // paye_par_mois:{required},
              montant:{required},
     
    }
     },
     computed:{
     ...mapGetters("parametres",["gettersNiveau", "gettersClasse", "gettersMatiere","gettersTrimestre", "gettersAnne",
     "gettersTransport","gettersNouvelleMatiere","gettersconfigEntete","gettersloadingconfigEntete"]),
     ...mapGetters("student",["GetterStudent","groupeNoteEtudiant", "GetterCantine", "GetterScolarite", "GetterAbsence","GetterNote",
     "GetterMoyenne"]),
         ...mapGetters("personnel",["gettersUtilisateur", "gettersAffectation","gettersloadingAffectation","gettersRole"]),
   
     loadingData(){
    return this.gettersloadingconfigEntete
       
    },

    filtremoyenneParClasse(){
      return this.GetterMoyenne.filter(item=>item.classe_id == this.editText.classe_id)
    },
    moyenneParClasseEtudiant(){
      return this.GetterMoyenne.filter(item=>item.classe_id == this.editText.classe_id && item.student_id == this.$route.params.id)
    },

    moyenneGeneraleParMatiere(){
      return (id)=>{
        if(id != '' && id != null){
          let moy = this.moyenneParClasseEtudiant.find(item=>item.matiere_id == id)
          if(moy){
            return moy.moyenne
          }
        }
        return 0
      }
    },
    coefficientParMatiere(){
      return (id)=>{
        if(id != '' && id != null){
          let moy = this.moyenneParClasseEtudiant.find(item=>item.matiere_id == id)
          if(moy){
            return moy.coefficient
          }
        }
        return 0
      }
    },
    moyenneGeneraleTotalParMatiere(){
      return (id)=>{
        if(id != '' && id != null){
          let moy = this.moyenneParClasseEtudiant.find(item=>item.matiere_id == id)
          if(moy){
            return (moy.moyenne)*(moy.coefficient)
          }
        }
        return 0
      }
    },

/* Information sur le calcul des matières de la litterature*/

       TotalNoteMoyenne(){
       let collect =[]
       this.moyenneParClasseEtudiant.filter(item =>{
         this.calculCoefficient.filter(element => {        
           if(item.matiere_id == element){
             collect.push(item.moyenne)
             
           }
         })
       })
        return collect.map(Number).reduce(function(a,b){
            return a +b;
          }, 0);
     },

       TotalSommeMoyenne(){
       let collect =[]
       this.moyenneParClasseEtudiant.filter(item =>{
         this.calculCoefficient.filter(element => {        
           if(item.matiere_id == element){
             collect.push(item.moyenne * item.coefficient)
             
           }
         })
       })
        return collect.map(Number).reduce(function(a,b){
            return a +b;
          }, 0);
     },

       TotalNoteCoefficient(){
       let collect =[]
       this.MatiereLitteraire.filter(item =>{
         this.calculCoefficient.filter(element => {        
           if(item.id == element){
             collect.push(item.coefficient)
             
           }
         })
       })
        return collect.map(Number).reduce(function(a,b){
            return a +b;
          }, 0);
     },
     
     calculCoefficient(){
      let collect =[]
       this.moyenneParClasseEtudiant.find(item =>{
         this.MatiereLitteraire.filter(element => {        
           if(item.matiere_id == element.id){
             collect.push(item.matiere_id)
             
           }
         })
       })
        return [...new Set(collect)]
     },

/* Information sur le calcul des matières de la science*/

     CoefficientScience(){
      let collect =[]
       this.moyenneParClasseEtudiant.find(item =>{
         this.MatiereScience.filter(element => {        
           if(item.matiere_id == element.id){
             collect.push(item.matiere_id)
             
           }
         })
       })
        return [...new Set(collect)]
     },

  //la somme des coefficient
       TotalCoefficientScience(){
       let collect =[]
       this.MatiereScience.filter(item =>{
         this.CoefficientScience.filter(element => {        
           if(item.id == element){
             collect.push(item.coefficient)
             
           }
         })
       })
        return collect.map(Number).reduce(function(a,b){
            return a +b;
          }, 0);
     },

//La somme de la moyenne
        sommeMoyenneScience(){
       let collect =[]
       this.moyenneParClasseEtudiant.filter(item =>{
         this.CoefficientScience.filter(element => {        
           if(item.matiere_id == element){
             collect.push(item.moyenne)
             
           }
         })
       })
        return collect.map(Number).reduce(function(a,b){
            return a +b;
          }, 0);
     },
//Le total des moyennes
        TotalMoyenneScience(){
       let collect =[]
       this.moyenneParClasseEtudiant.filter(item =>{
         this.CoefficientScience.filter(element => {        
           if(item.matiere_id == element){
             collect.push(item.moyenne * item.coefficient)
             
           }
         })
       })
        return collect.map(Number).reduce(function(a,b){
            return a +b;
          }, 0);
     },


/* Information sur le calcul des autres matières*/

     CoefficientAutre(){
      let collect =[]
       this.moyenneParClasseEtudiant.find(item =>{
         this.MatiereAutre.filter(element => {        
           if(item.matiere_id == element.id){
             collect.push(item.matiere_id)
             
           }
         })
       })
        return [...new Set(collect)]
     },

  //la somme des coefficient
       TotalCoefficientAutre(){
       let collect =[]
       this.MatiereAutre.filter(item =>{
         this.CoefficientAutre.filter(element => {        
           if(item.id == element){
             collect.push(item.coefficient)
             
           }
         })
       })
        return collect.map(Number).reduce(function(a,b){
            return a +b;
          }, 0);
     },

//La somme de la moyenne
        sommeMoyenneAutre(){
       let collect =[]
       this.moyenneParClasseEtudiant.filter(item =>{
         this.CoefficientAutre.filter(element => {        
           if(item.matiere_id == element){
             collect.push(item.moyenne)
             
           }
         })
       })
        return collect.map(Number).reduce(function(a,b){
            return a +b;
          }, 0);
     },
//Le total des moyennes
        TotalMoyenneAutre(){
       let collect =[]
       this.moyenneParClasseEtudiant.filter(item =>{
         this.CoefficientAutre.filter(element => {        
           if(item.matiere_id == element){
             collect.push(item.moyenne * item.coefficient)
             
           }
         })
       })
        return collect.map(Number).reduce(function(a,b){
            return a +b;
          }, 0);
     },
     

     /* calcul de rang */
     groupeParMoyenne(){
        return (id)=>{
          if(id != "" && id != null){
            let moyenne =[]
            let objet = this.GetterMoyenne.filter(item=>item.classe_id == this.editText.classe_id && item.matiere_id == id)
            if(objet.length >0){
              objet.forEach(function(elmnt){
                moyenne.push(elmnt.moyenne)
              })
              let unique = moyenne;
              console.log(unique);
            
              if (unique.length == 0) {
                return [];
              }
               unique.sort(function(a, b) {
                return a-b;
                });
                return unique.reverse();
              }
          }
          return []
        }
     },

    rangEleve(){
      return (id)=>{
        if(id != "" && id != null){
          let objet = this.groupeParMoyenne(id).indexOf(this.moyenneGeneraleParMatiere(id))
          if(objet != -1){
            return objet+1
          }
          return 0
        }
      }
    },
  
    //Calcul du total
    moyenneTotaux(){
        return (this.sommeMoyenneAutre) + (this.sommeMoyenneScience) + (this.TotalNoteMoyenne)
    },

    coefficientTotaux(){
        return (this.TotalCoefficientAutre) + (this.TotalCoefficientScience) + (this.TotalNoteCoefficient)
    },

    cumulTotaux(){
        return (this.sommeMoyenneAutre) + (this.TotalSommeMoyenne) + (this.TotalMoyenneScience)
    },
    moyenneTrimestre(){
        return (this.cumulTotaux/this.coefficientTotaux).toFixed(2)
    },
    
  MatiereLitteraire(){
    return this.gettersMatiere.filter(tem=>tem.statut == 1 && tem.classe_id == this.editText.classe_id)
  },
  MatiereScience(){
    return this.gettersMatiere.filter(tem=>tem.statut == 2 && tem.classe_id == this.editText.classe_id)
  },
  MatiereAutre(){
    return this.gettersMatiere.filter(tem=>tem.statut == 3 && tem.classe_id == this.editText.classe_id)
  },
      LibelleMatieres(){
       return (id)=>{
         if(id != "" && id != null){
           let obj =this.gettersNouvelleMatiere.find(tem =>tem.id == id)
           if(obj){
             return obj.libelle;
           }
          return ""
         }}
     },

  teacherId(){
    return (id)=>{
      if(id != ""){
        let objet = this.gettersAffectation.find(tem=>tem.matiere_id == id)
        if(objet){
          return objet.teacher_id
        }
      }
    }
  },
  teacherName(){
    return (id)=>{
      if(id != ""){
        let objet = this.gettersUtilisateur.find(tem=>tem.id == id)
        if(objet){
          return objet.name
        }
      }
    }
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
     EffectifDeLaClasse(){
       return this.GetterStudent.filter(tem=>tem.classe_id == this.editText.classe_id).length;
     },
      AnneEncoursLibelle(){
       let obj = this.gettersAnne.find(tem=>tem.encours == 1)
       if(obj){
         return obj.debut_annee+"-"+obj.fin_annee;
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
    NbreAbsence(){
      return this.FiltreParAbsence.length;
    },
     FiltreTransportParEleve(){
       return this.gettersTransport.filter(tem=>tem.student_id == this.$route.params.id)
     },
     FiltreParAbsence(){
       if(this.formData.trimestre_id != ''){
         return this.GetterAbsence.filter(tem=>tem.student_id == this.$route.params.id && 
         tem.trimestre_id == this.formData.trimestre_id)
       }
       return ""
     },
   
  
         TrimestreEncours(){
       let obj = this.gettersTrimestre.find(tem =>tem.encours == 1)
         if(obj){
           return obj.libelle
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
    

     LibelleClasse(){
       return (id)=>{
         if(id != "" && id != null){
           let obj =this.gettersClasse.find(tem =>tem.id == id)
           if(obj){
             return obj.libelle;
           }
          return ""
         }} },
     LibelleMatiere(){
       return (id)=>{
         if(id != "" && id != null){
           let obj =this.gettersMatiere.find(tem =>tem.id == id)
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
         "getTransport", 'getNouvelleMatiere',"getconfigEntete"]),
         ...mapActions("student",["get_all_student","AjouterEleve", "ModifierEleve","SupprimerEleve","get_Liste_Cantine",
         "SupprimerCantine", "getAbsence", "AjouterAbsence", "AjouterCantine", "getScolarite", 
         "get_note","getMoyenne"]),
           ...mapActions("personnel",["getUtilisateur","AjouterUtilisateur","ModifierUtilisateur","SupprimerUtilisateur",
         "AjouterAffectation","getAffectation","SupprimerAffectation", "getRole"]),


    



      
         formaterDate1(date) {
      return moment(date, "YYYY-MM-DD").format("YYYY-MM-DD");
    },
         formaterDate2(date) {
      return moment(date, "YYYY-MM-DD HH:mm").format("DD-MM-YYYY HH:mm");
    },
         formaterDate(date) {
      return moment(date, "YYYY-MM-DD").format("YYYY-MM-DD HH:mm");
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
        CallBack(){
        return this.$router.go(-1)
         },
    }

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
    width: 170px;
    height: 2px;
    margin-left: 30px;
     border: 1px solid #000;
    
}
</style>