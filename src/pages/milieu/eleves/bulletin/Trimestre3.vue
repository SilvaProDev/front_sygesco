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
              
               <!-- {{testMoiAussi(8, 10)}} 
                {{SomParMatiere(3)}}
               {{MatiereParStudent(1)}}  -->
               {{M01atiereParStudent(3)}} 
               <!-- {{reuissite}}  -->
                
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
              <div class="card mb-5"  id="printMe" ref="table" style="!important">
               
                <div class="table-responsive p-3"  id="printMe">
                  
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
                                <span>1er Trimestre</span>
                            </span>
                        </th>
                        <th colspan="2">
                            <span>
                                Année Scolaire <br> &nbsp;&nbsp; &nbsp;
                                {{AnneEncoursLibelle}}
                            </span>
                        </th> 
                    </tr>
                    <tr v-for="item in gettersconfigEntete" :key="item.id">
                        <td colspan="4">
                            
                        <img src="/front/img/Armoiries.png" width="70px;"  />       

                            <span>Etablissement :</span><span >{{item.nom}}</span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
                                <span>Logo:</span> <span >
                                    <img :src="item.photo" alt="" style="width:50px;">
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
                    <tr>
                       <th style=" background-color:#FCBE28 !important;" width="200px">Disciplines</th>
                       <th style=" background-color:#FCBE28 !important;" width="30px" >Moy</th>
                       <th style=" background-color:#FCBE28 !important;" width="20px">Coef</th>
                       <th style=" background-color:#FCBE28 !important;" width="20px">Total</th>
                       <th style=" background-color:#FCBE28 !important;" width="20px">Rang</th>
                       <th style=" background-color:#FCBE28 !important;" width="100px">Appreciation</th>
                       <th style=" background-color:#FCBE28 !important;" width="100px">Professeurs</th>  
                    </tr>
                    <!-- <tr>
                        <td style="padding:0px">Composition française</td>
                        <td style="padding:0px; text-align:center;">9</td>
                        <td rowspan="3" style="padding:18px; text-align:center;">1</td>
                        <td rowspan="3" style="padding:18px; text-align:center;">8.56</td>
                        <td rowspan="3" style="padding:18px; text-align:center;">30è</td>
                        <td rowspan="3" style="padding:18px; text-align:center;">Très bon élève</td>
                        <td rowspan="3" style="padding:18px; text-align:center;">Kouakou Alain</td>
                        
                    </tr> -->
                    <!-- <tr>
                        <td style="padding:0px">Expression orale</td>
                        <td style="padding:0px; text-align:center;">5</td>
                        
                        
                    </tr> -->
                    <!-- <tr>
                        <td style="padding:0px">Orthographe Grammaire</td>
                        <td style="padding:0px; text-align:center;">9</td>   
                    </tr> -->
                    <tr v-for="item in MatiereLitteraire" :key="item.id"> 
                        <td style="padding:0px; color:#000 !important;font-weight:bold">{{LibelleMatieres(item.nouvelle_matiere_id)}}</td>
                        <td style="padding:0px; text-align:center;">{{SomParMatiere(item.id) || 0 }}</td>   
                        <td style="padding:0px; text-align:center;">{{item.coefficient}}</td>   
                        <td style="padding:0px; text-align:center;">{{SomParMatiere(item.id) * (item.coefficient)}}</td>   
                         <td style="padding:0px; text-align:center;" >
                           <!-- {{MatiereParStudent001(item.id)}} -->
                           </td>   
                         <!-- <td style="padding:0px; text-align:center;" >
                           {{testMoiAussi(item.id, SomParMatiere(item.id))}}
                           </td>    -->
                        <!--<td style="padding:0px;" v-else-if="testMoiAussi(item.id, SomParMatiere(item.id)) == -1">
                           {{"Non classé"}}
                           </td>   
                        <td style="padding:0px; text-align:center;" v-else>
                           {{testMoiAussi(item.id, SomParMatiere(item.id))+"ème"}}
                           </td>    -->
                        <td style="padding:0px; text-align:center;">
                          <span v-if="SomParMatiere(item.id) <=5">Très faible</span>
                          <span v-if="SomParMatiere(item.id) >=6 && SomParMatiere(item.id) <10">Faible</span>
                          <span v-if="SomParMatiere(item.id) >= 10 && SomParMatiere(item.id) <12">Passable</span>
                          <span v-if="SomParMatiere(item.id) >= 12 && SomParMatiere(item.id) <15">Bien</span>
                          <span v-if="SomParMatiere(item.id) >= 15 && SomParMatiere(item.id) <17">Très Bien</span>
                          <span v-if="SomParMatiere(item.id) >= 17 && SomParMatiere(item.id) <=20">Excellent</span>
                        </td>   
                        <td style="padding:0px 5px;">{{teacherName(teacherId(item.id)) || 'Non renseigné'}}</td>   
                    </tr>
                   
                   
                    <tr style=" background-color:aqua !important;">
                        <th colspan="1"  style="padding-left:5px; background-color:aqua !important;">BILAN LETTRES</th>
                        <td style="padding:5px; text-align:center;background-color:aqua !important;" >
                          <!-- <span v-for="item in MatiereLitteraire" :key="item.id">
                        
                            {{TotalMoyDesMatiere(item.id)}}
                          </span> -->
                           {{MoyenneTotalLiterraire}}
                        </td>
                        <td style="padding:5px; text-align:center;background-color:aqua !important;"> {{CoeffTotalLitteraire}} </td>
                        <td style="padding:5px; text-align:center;background-color:aqua !important;">{{SommeMoyenneTotalLiterraire}}</td>
                        <!-- <td colspan="" style="padding:5px; text-align:center;background-color:aqua !important;">23ex</td> -->
                        
                    </tr>
                   

                     <tr v-for="item in MatiereScience" :key="item.id">
                        <td style="padding:0px; color:#000 !important;font-weight:bold">{{LibelleMatieres(item.nouvelle_matiere_id)}}</td>
                        <td style="padding:0px; text-align:center;">{{SomParMatiere(item.id)}}</td>   
                        <td style="padding:0px; text-align:center;">{{item.coefficient}}</td>   
                        <td style="padding:0px; text-align:center;">{{SomParMatiere(item.id) * (item.coefficient)}}</td>  
                         <td style="padding:0px; text-align:center;" >
                           <!-- {{MatiereParStudent001(item.id)}} -->
                           </td> 
                         <!-- <td style="padding:0px; text-align:center;" >
                           {{testMoiAussi(item.id, SomParMatiere(item.id))}}
                           </td>   -->
                        <!-- <td style="padding:0px; text-align:center;" v-if="testMoiAussi(item.id, SomParMatiere(item.id))==1">
                           {{testMoiAussi(item.id, SomParMatiere(item.id))+"er(ère)"}}
                           </td>   
                            <td style="padding:0px;" v-else-if="testMoiAussi(item.id, SomParMatiere(item.id))== -1">
                           {{"Non classé"}}
                           </td>
                        <td style="padding:0px; text-align:center;" v-else>
                           {{testMoiAussi(item.id, SomParMatiere(item.id))+"ème"}}
                           </td>          -->
                          <td style="padding:0px; text-align:center;">
                          <span v-if="SomParMatiere(item.id) <=5">Très faible</span>
                          <span v-if="SomParMatiere(item.id) >=6 && SomParMatiere(item.id) <10">Faible</span>
                          <span v-if="SomParMatiere(item.id) >= 10 && SomParMatiere(item.id) <12">Passable</span>
                          <span v-if="SomParMatiere(item.id) >= 12 && SomParMatiere(item.id) <15">Bien</span>
                          <span v-if="SomParMatiere(item.id) >= 15 && SomParMatiere(item.id) <17">Très Bien</span>
                          <span v-if="SomParMatiere(item.id) >= 17 && SomParMatiere(item.id) <=20">Excellent</span>
                        </td>   
                        <td style="padding:0px 2px;">{{teacherName(teacherId(item.id)) || 'Non renseigné'}}</td>   
                    </tr>
                
                  
                   
                   
                     <tr style=" background-color:aqua !important;">
                        <th colspan="1"  style="padding-left:5px;background-color:aqua !important;">BILAN SCIENCES</th>
                        <td style="padding:5px; text-align:center;background-color:aqua !important;" >
                          
                          {{MoyenneTotalScientifique}}
                          
                  
                        </td>
                        <td style="padding:5px; text-align:center;background-color:aqua !important;">{{CoeffTotalScience}}</td>
                        <td style="padding:5px; text-align:center;background-color:aqua !important;"> {{SommeMoyenneTotalScientifique}} </td>
                        <!-- <td colspan="" style="padding:5px; text-align:center;background-color:aqua !important;">203ex</td> -->
                        
                    </tr>
                     <tr v-for="item in MatiereAutre" :key="item.id">
                        <td style="padding:0px;color:#000 !important;font-weight:bold">{{LibelleMatieres(item.nouvelle_matiere_id)}}</td>
                        <td style="padding:0px; text-align:center;">{{SomParMatiere(item.id)}}</td>   
                        <td style="padding:0px; text-align:center;">
                          <span >{{item.coefficient}} </span>
                        </td>   
                        <td style="padding:0px; text-align:center;">{{SomParMatiere(item.id) * (item.coefficient)}}</td>  
                         <td style="padding:0px; text-align:center;" >
                           <!-- {{MatiereParStudent001(item.id)}} -->
                           </td> 
                         <!-- <td style="padding:0px; text-align:center;" >
                           {{testMoiAussi(item.id, SomParMatiere(item.id))}}
                           </td>   -->
                         <!-- <td style="padding:0px; text-align:center;" v-if="testMoiAussi(item.id, SomParMatiere(item.id))==1">
                           {{testMoiAussi(item.id, SomParMatiere(item.id))+"er(ère)"}}
                           </td>   
                            <td style="padding:0px;" v-else-if="testMoiAussi(item.id, SomParMatiere(item.id))== -1">
                           {{"Non classé"}}
                           </td>
                        <td style="padding:0px; text-align:center;" v-else>
                           {{testMoiAussi(item.id, SomParMatiere(item.id))+"ème"}}
                           </td>  -->
                        <td style="padding:0px; text-align:center;">
                          <span v-if="SomParMatiere(item.id) <=5">Très faible</span>
                          <span v-if="SomParMatiere(item.id) >=6 && SomParMatiere(item.id) <10">Faible</span>
                          <span v-if="SomParMatiere(item.id) >= 10 && SomParMatiere(item.id) <12">Passable</span>
                          <span v-if="SomParMatiere(item.id) >= 12 && SomParMatiere(item.id) <15">Bien</span>
                          <span v-if="SomParMatiere(item.id) >= 15 && SomParMatiere(item.id) <17">Très Bien</span>
                          <span v-if="SomParMatiere(item.id) >= 17 && SomParMatiere(item.id) <=20">Excellent</span>
                        </td>   
                        <td style="padding:0px 2px; ">{{teacherName(teacherId(item.id)) || 'Non renseigné'}}</td>   
                    </tr>
                   
                     
                    
                    
                     <tr style=" background-color:aqua !important;">
                        <th colspan="1"  style="padding-left:5px;background-color:aqua !important;">TOTAUX</th>
                       
                        <td style="padding:5px; text-align:center;background-color:aqua !important;">
                           {{MoyenneTotal}}
                        </td>
                        <td style="padding:5px; text-align:center;background-color:aqua !important;">{{CoeffecientTotal}}</td>
                        <td style="padding:5px; text-align:center;background-color:aqua !important;">{{SommeMoyenneTotaux}}</td>
                        <!-- <td colspan="" style="padding:5px; text-align:center;background-color:aqua !important;"></td> -->
                        
                    </tr>
                    <tr style=" background-color:#FCBE28 !important;">
                        <th  style=" background-color:#FCBE28 !important;" colspan="2" width="200px">Assuidité</th>
                        <!-- <th width="200px">1er Trimestre</th> -->
                        <!-- <th width="200px">2er Trimestre</th> -->
                        <th style=" background-color:#FCBE28 !important;" colspan="3" >Moyenne Trimestrielle</th>
                        <th style=" background-color:#FCBE28 !important;" colspan="2">Resultat de classe</th>
                    </tr>
                    <tr>
                       <td colspan="2" style="padding:5px; text-align:center;">
                          <span>Absence: </span> <span style="color:#000;font-weight:600"> {{NbreAbsence}} </span> <br>
                          <span>Jutifié:</span><span style="color:#000;font-weight:600">0</span> 
                        </td> 
                      <!-- <td style="padding:0px; text-align:center;">
                          <span>Moy: </span> <span style="color:#000;font-weight:600">11</span> <br>
                          <span>Rang:</span><span style="color:#000;font-weight:600">50è</span> 
                     </td >    -->
                        <td colspan="3" style="padding:0px; text-align:center;">
                          <span>Moy: </span> <span style="color:#000;font-weight:600">{{MoyenneTrimestre1}}</span> <br>
                          <span>Rang:</span><span style="color:#000;font-weight:600">4è</span> 
                       </td>   
                        <!-- <td colspan="2" style="padding:0px; text-align:center;">
                            <span>8.6/20</span> <br>
                             <span>Rang:</span><span style="color:#000;font-weight:600">78è sur 80</span> 
                        </td>    -->
                        <td colspan="2" style="padding:0px;">
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
     ...mapGetters("student",["GetterStudent","groupeNoteEtudiant", "GetterCantine", "GetterScolarite", "GetterAbsence","GetterNote"]),
         ...mapGetters("personnel",["gettersUtilisateur", "gettersAffectation","gettersloadingAffectation","gettersRole"]),
   
     loadingData(){
    return this.gettersloadingconfigEntete
       
    },
    testEtudiant(){
      // return (id =this.editText.classe_id)=>{
      //   if(id != ""){
      //     let collect = []
      //     let objet = this.GetterNote.filter(item=>item.classe_id == id)
      //     if(objet.length>0){
      //       objet.forEach(element => {
      //         collect.push(element)
      //       });
      //     }
      //     return collect
      //   }
      // }
      return this.GetterNote.filter(item=>item.classe_id == this.editText.classe_id)
    },

     reuissite(){
       let collect =[]
       this.testEtudiant.filter(item =>{
         this.AfficheActivite.forEach(element => {        
           if(item.student_id == element[0].student_id){
             collect.push(item)
           }
           
         })
       })
       return collect;
     },
          M01atiereParStudent(){    
       return (id) =>{
         if(id != ""){
            var note1 =[]
        let objet = this.reuissite.filter(tem => tem.matiere_id == id);   
        if (objet.length > 0) {
          let array1 = [];
          let array2 = [];
          let array3 = [];
          // let array4 = [];
          objet.forEach(function (val) {
            if(val.student_id ==1){
              array1.push(val.note); 
            }
            if(val.student_id ==2){
              array2.push(val.note); 
            }
            if(val.student_id ==3){
              array3.push(val.note); 
            }
            // if(val.student_id ==4){
            //   array4.push(val.note); 
            // }
          });
          let unique1 = array1;      
          let unique2 = array2;      
          let unique3 = array3;      
          // let unique4 = array4;      
         if (unique1.length == 0) {return [];}
         else{
           let test1 = unique1.map(Number).reduce(function(a,b){
             return (a +b);
           }, 0);
            note1.push(Math.round(test1/unique1.length))
          //  return note1
         }
         if (unique2.length == 0) {return [];}
         else{
           let test2 = unique2.map(Number).reduce(function(a,b){
             return (a +b);
           }, 0);

            note1.push(Math.round(test2/unique2.length))
            // note1 = note1.sort(function(a,b){
            //   return a-b
            // })

            // return note1
         }
         if (unique3.length == 0) {return [];}
         else{
           let test3 = unique3.map(Number).reduce(function(a,b){
             return (a +b);
           }, 0);

            note1.push(Math.round(test3/unique3.length))
            note1 = note1.sort(function(a,b){
              return a-b
            })

         }
            return note1
        //  if (unique4.length == 0) {return [];}
        //  else{
        //    let test4 = unique4.map(Number).reduce(function(a,b){
        //      return (a +b);
        //    }, 0);

        //     note1.push(Math.round(test4/unique4.length))
        //     note1 = note1.sort(function(a,b){
        //       return a-b
        //     })

        //     return note1
        //  }
        } 
        return 0;
             
         }
       }
       
     //  } 
     },
      AfficheActivite() {
      
         
           let  collet=[];
         this.groupeNoteEtudiant.filter(item=>{
          //  {
          //       let data={
          //           item,
                   
          //       }
          //   }
                collet.push(item)
        })
        return collet
       
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

  
       SommeScolariteParElev(){
       let collect =[]
       this.MatiereLitteraire.filter(item =>{
         this.GetterNote.filter(element => {        
           if(item.id == element.matiere_id){
             collect.push(element.note)
           }
         })
       })
       return collect;
     },

      NombreDeNote(){
       let collect =[]
       this.GetterNote.find(item =>{
         this.MatiereLitteraire.filter(element => {        
           if(item.matiere_id == element.id){
             collect.push(item.note)
           }
         })
       })
       return collect.map(Number).length;
     },

      SommeTotalNoteParStatus(){
       let collect =[]
       this.GetterNote.find(item =>{
         this.MatiereLitteraire.filter(element => {        
           if(item.matiere_id == element.id){
             collect.push(item)
           }
         })
       })
       return collect
     },

  SomParMatiere(){
    return (test)=>{
      if(test !=''){
         if(isNaN(this.MoyennePArMatiere(test)/this.TaillePArMatiere(test))){
         return 0
       }
        return Math.round(this.MoyennePArMatiere(test)/this.TaillePArMatiere(test))
      }
    }
  },
 


     MoyennePArMatiere(){
       return (id1)=>{
         if(this.formData.trimestre_id != "" && id1 !="" ){
        let objet = this.GetterNote.filter(tem =>tem.student_id == this.editText.id && 
        tem.trimestre_id == this.formData.trimestre_id && tem.matiere_id == id1);   
        let array_exercie = [];
        if (objet.length > 0) {
          objet.forEach(function (val) {
            array_exercie.push(val.note); 
          });
          let unique = array_exercie;
          console.log(unique);         
         if (unique.length == 0) {return [];}
          return unique.map(Number).reduce(function(a,b){
            return a +b;
          }, 0);
        } 
        return 0;
         }
         return 0      
       }
     },

  //Moyenne globale matière litteraire
   MoyenneTotalLiterraire(){
       return Math.round(this.Moyenne1+this.Moyenne2+this.Moyenne3+this.Moyenne4+this.Moyenne5+this.Moyenne6+
       this.Moyenne7+this.Moyenne8+this.Moyenne9+this.Moyenne10+this.Moyenne11+this.Moyenne12+
       this.Moyenne13+this.Moyenne14+this.Moyenne15+this.Moyenne16+this.Moyenne17+this.Moyenne18+
       this.Moyenne19+this.Moyenne20+this.Moyenne21+this.Moyenne22)
     },

   SommeMoyenneTotalLiterraire(){
       return Math.round(this.MoyenneCoefficient1+this.MoyenneCoefficient2+this.MoyenneCoefficient3+this.MoyenneCoefficient4+this.MoyenneCoefficient5+this.MoyenneCoefficient6+
       this.MoyenneCoefficient7+this.MoyenneCoefficient8+this.MoyenneCoefficient9+this.MoyenneCoefficient10+this.MoyenneCoefficient11+this.MoyenneCoefficient12+
       this.MoyenneCoefficient13+this.MoyenneCoefficient14+this.MoyenneCoefficient15+this.MoyenneCoefficient16+this.MoyenneCoefficient17+this.MoyenneCoefficient18+
       this.MoyenneCoefficient19+this.MoyenneCoefficient20+this.MoyenneCoefficient21+this.MoyenneCoefficient22)
     },



     // Debut Calcul de moyenne matiere_id = 1
      ResteMoi110(){
       let collect =[]
        this.ResteMoi1.forEach(element => {
         if(element.matiere_id == 1){
           collect.push(element.note)
         }
        
       });
    //    if(collect.length == 0){return []}
       return collect;
     },
    ResteMoiTaille1(){
       let collect =[]
        this.ResteMoi1.forEach(element => {
         if(element.matiere_id == 1){
           collect.push(element.note)
         }
       });
    
       return collect.length;
     },
        Coefficient1(){
        let objet = this.MatiereLitteraire.find(tem=>tem.id == 1)
        if(objet) {
          return objet.coefficient
        }
       return 0;
     },

      //convertir le tableau string en int de la somme payée par eleve
     convertirSommeResteMoi1(){
       if(this.ResteMoiTaille1 != 0){

         return this.ResteMoi110.map((i) => Number(i))
       }
       return 0
     },
     
       sommeTotalResteMoi1(){
          if(this.ResteMoiTaille1 != 0){

            return this.convertirSommeResteMoi1.reduce(function(a, b){
            return (a + b);
            }, 0);
          }
          return 0
    },

     Moyenne1(){
       if(isNaN(this.sommeTotalResteMoi1/this.ResteMoiTaille1)){
         return 0
       }
       return this.sommeTotalResteMoi1/this.ResteMoiTaille1
     },
      MoyenneCoefficient1(){
       return this.Coefficient1*this.Moyenne1
     },
      // Fin Calcul de moyenne matiere_id = 8


     // Debut Calcul de moyenne matiere_id = 8
      ResteMoi2(){
       let collect =[]
        this.ResteMoi1.forEach(element => {
         if(element.matiere_id == 2){
           collect.push(element.note)
         }
       });
    
       return collect;
     },
    ResteMoiTaille2(){
       let collect =[]
        this.ResteMoi1.forEach(element => {
         if(element.matiere_id == 2){
           collect.push(element.note)
         }
       });
    
       return collect.length;
     },
        Coefficient2(){
        let objet = this.MatiereLitteraire.find(tem=>tem.id == 2)
        if(objet) {
          return objet.coefficient
        }
       return 0;
     },

      //convertir le tableau string en int de la somme payée par eleve
     convertirSommeResteMoi2(){
         return this.ResteMoi2.map((i) => Number(i))
     },
     
       sommeTotalResteMoi2(){
        return this.convertirSommeResteMoi2.reduce(function(a, b){
        return (a + b);
        }, 0);
    },

     Moyenne2(){
        if(isNaN(this.sommeTotalResteMoi2/this.ResteMoiTaille2)){
         return 0
       }
       return this.sommeTotalResteMoi2/this.ResteMoiTaille2
     },
      MoyenneCoefficient2(){
       return this.Coefficient2*this.Moyenne2
     },
      // Fin Calcul de moyenne matiere_id = 2




     // Debut Calcul de moyenne matiere_id = 3
      ResteMoi3(){
       let collect =[]
        this.ResteMoi1.forEach(element => {
         if(element.matiere_id == 3){
           collect.push(element.note)
         }
       });
    
       return collect;
     },
    ResteMoiTaille3(){
       let collect =[]
        this.ResteMoi1.forEach(element => {
         if(element.matiere_id == 3){
           collect.push(element.note)
         }
       });
    
       return collect.length;
     },
        Coefficient3(){
        let objet = this.MatiereLitteraire.find(tem=>tem.id == 3)
        if(objet) {
          return objet.coefficient
        }
       return 0;
     },

      //convertir le tableau string en int de la somme payée par eleve
     convertirSommeResteMoi3(){
         return this.ResteMoi3.map((i) => Number(i))
     },
     
       sommeTotalResteMoi3(){
        return this.convertirSommeResteMoi3.reduce(function(a, b){
        return (a + b);
        }, 0);
    },

     Moyenne3(){
        if(isNaN(this.sommeTotalResteMoi3/this.ResteMoiTaille3)){
         return 0
       }
       return this.sommeTotalResteMoi3/this.ResteMoiTaille3
     },
      MoyenneCoefficient3(){
       return this.Coefficient3*this.Moyenne3
     },
      // Fin Calcul de moyenne matiere_id = 3


     // Debut Calcul de moyenne matiere_id = 4
      ResteMoi4(){
       let collect =[]
        this.ResteMoi1.forEach(element => {
         if(element.matiere_id == 4){
           collect.push(element.note)
         }
       });
    
       return collect;
     },
    ResteMoiTaille4(){
       let collect =[]
        this.ResteMoi1.forEach(element => {
         if(element.matiere_id == 4){
           collect.push(element.note)
         }
       });
    
       return collect.length;
     },
         Coefficient4(){
        let objet = this.MatiereLitteraire.find(tem=>tem.id == 4)
        if(objet) {
          return objet.coefficient
        }
       return 0;
     },
      //convertir le tableau string en int de la somme payée par eleve
     convertirSommeResteMoi4(){
         return this.ResteMoi4.map((i) => Number(i))
     },
     
       sommeTotalResteMoi4(){
        return this.convertirSommeResteMoi4.reduce(function(a, b){
        return (a + b);
        }, 0);
    },

     Moyenne4(){
        if(isNaN(this.sommeTotalResteMoi4/this.ResteMoiTaille4)){
         return 0
       }
       return this.sommeTotalResteMoi4/this.ResteMoiTaille4
     },
      MoyenneCoefficient4(){
       return this.Coefficient4*this.Moyenne4
     },
      // Fin Calcul de moyenne matiere_id = 4


     // Debut Calcul de moyenne matiere_id = 5
      ResteMoi5(){
       let collect =[]
        this.ResteMoi1.forEach(element => {
         if(element.matiere_id == 5){
           collect.push(element.note)
         }
       });
    
       return collect;
     },
    ResteMoiTaille5(){
       let collect =[]
        this.ResteMoi1.forEach(element => {
         if(element.matiere_id == 5){
           collect.push(element.note)
         }
       });
    
       return collect.length;
     },
        Coefficient5(){
        let objet = this.MatiereLitteraire.find(tem=>tem.id == 5)
        if(objet) {
          return objet.coefficient
        }
       return 0;
     },
      //convertir le tableau string en int de la somme payée par eleve
     convertirSommeResteMoi5(){
         return this.ResteMoi5.map((i) => Number(i))
     }, 
       sommeTotalResteMoi5(){
        return this.convertirSommeResteMoi5.reduce(function(a, b){
        return (a + b);
        }, 0);
    },
     Moyenne5(){
        if(isNaN(this.sommeTotalResteMoi5/this.ResteMoiTaille5)){
         return 0
       }
       return this.sommeTotalResteMoi5/this.ResteMoiTaille5
     },
      MoyenneCoefficient5(){
       return this.Coefficient5*this.Moyenne5
     },
      // Fin Calcul de moyenne matiere_id = 5

     // Debut Calcul de moyenne matiere_id = 6
      ResteMoi6(){
       let collect =[]
        this.ResteMoi1.forEach(element => {
         if(element.matiere_id == 6){
           collect.push(element.note)
         }
       });
    
       return collect;
     },
    ResteMoiTaille6(){
       let collect =[]
        this.ResteMoi1.forEach(element => {
         if(element.matiere_id == 6){
           collect.push(element.note)
         }
       });
    
       return collect.length;
     },
        Coefficient6(){
        let objet = this.MatiereLitteraire.find(tem=>tem.id == 6)
        if(objet) {
          return objet.coefficient
        }
       return 0;
     },
      //convertir le tableau string en int de la somme payée par eleve
     convertirSommeResteMoi6(){
         return this.ResteMoi6.map((i) => Number(i))
     }, 
       sommeTotalResteMoi6(){
        return this.convertirSommeResteMoi6.reduce(function(a, b){
        return (a + b);
        }, 0);
    },
     Moyenne6(){
        if(isNaN(this.sommeTotalResteMoi6/this.ResteMoiTaille6)){
         return 0
       }
       return this.sommeTotalResteMoi6/this.ResteMoiTaille6
     },
      MoyenneCoefficient6(){
       return this.Coefficient6*this.Moyenne6
     },
      // Fin Calcul de moyenne matiere_id = 6


  // Debut Calcul de moyenne matiere_id = 7
      ResteMoi7(){
       let collect =[]
        this.ResteMoi1.forEach(element => {
         if(element.matiere_id == 7){
           collect.push(element.note)
         }
       });
       return collect;
     },
        
      ResteMoiTaille7(){
       let collect =[]
        this.ResteMoi1.forEach(element => {
         if(element.matiere_id == 7){
           collect.push(element.note)
         }
       });  
       return collect.length;
     },
      Coefficient7(){
        let objet = this.MatiereLitteraire.find(tem=>tem.id == 7)
        if(objet) {
          return objet.coefficient
        }
       return 0;
     },
  
      sommeTotalResteMoi7(){
        return this.convertirSommeResteMoi7.reduce(function(a, b){
        return (a + b);
        }, 0);
    },

     //convertir le tableau string en int de la somme payée par eleve
     convertirSommeResteMoi7(){
         return this.ResteMoi7.map((i) => Number(i))
     },

     Moyenne7(){
        if(isNaN(this.sommeTotalResteMoi7/this.ResteMoiTaille7)){
         return 0
       }
       return this.sommeTotalResteMoi7/this.ResteMoiTaille7
     },
      MoyenneCoefficient7(){
       return this.Coefficient7*this.Moyenne7
     },

  // Fin Calcul de moyenne matiere_id = 7



     // Debut Calcul de moyenne matiere_id = 8
  
      ResteMoi8(){
       let collect =[]
        this.ResteMoi1.forEach(element => {
         if(element.matiere_id == 8){
           collect.push(element.note)
         }
       });
    
       return collect;
     },
    ResteMoiTaille8(){
       let collect =[]
        this.ResteMoi1.forEach(element => {
         if(element.matiere_id == 8){
           collect.push(element.note)
         }
       });
    
       return collect.length;
     },
      Coefficient8(){
        let objet = this.MatiereLitteraire.find(tem=>tem.id == 8)
        if(objet) {
          return objet.coefficient
        }
       return 0;
     },

      //convertir le tableau string en int de la somme payée par eleve
     convertirSommeResteMoi8(){
         return this.ResteMoi8.map((i) => Number(i))
     },
     
       sommeTotalResteMoi8(){
        return this.convertirSommeResteMoi8.reduce(function(a, b){
        return (a + b);
        }, 0);
    },

     Moyenne8(){
        if(isNaN(this.sommeTotalResteMoi8/this.ResteMoiTaille8)){
         return 0
       }
       return this.sommeTotalResteMoi8/this.ResteMoiTaille8
     },

     MoyenneCoefficient8(){
       return this.Coefficient8*this.Moyenne8
     },
      // Fin Calcul de moyenne matiere_id = 8
     // Debut Calcul de moyenne matiere_id = 8
  
      ResteMoi9(){
       let collect =[]
        this.ResteMoi1.forEach(element => {
         if(element.matiere_id == 9){
           collect.push(element.note)
         }
       });
    
       return collect;
     },
    ResteMoiTaille9(){
       let collect =[]
        this.ResteMoi1.forEach(element => {
         if(element.matiere_id == 9){
           collect.push(element.note)
         }
       });
    
       return collect.length;
     },
      Coefficient9(){
        let objet = this.MatiereLitteraire.find(tem=>tem.id == 9)
        if(objet) {
          return objet.coefficient
        }
       return 0;
     },

      //convertir le tableau string en int de la somme payée par eleve
     convertirSommeResteMoi9(){
         return this.ResteMoi9.map((i) => Number(i))
     },
     
       sommeTotalResteMoi9(){
        return this.convertirSommeResteMoi9.reduce(function(a, b){
        return (a + b);
        }, 0);
    },

     Moyenne9(){
        if(isNaN(this.sommeTotalResteMoi9/this.ResteMoiTaille9)){
         return 0
       }
       return this.sommeTotalResteMoi9/this.ResteMoiTaille9
     },

      MoyenneCoefficient9(){
       return this.Coefficient9*this.Moyenne9
     },
      // Fin Calcul de moyenne matiere_id = 9
     // Debut Calcul de moyenne matiere_id = 8
  
      ResteMoi10(){
       let collect =[]
        this.ResteMoi1.forEach(element => {
         if(element.matiere_id == 10){
           collect.push(element.note)
         }
       });
    
       return collect;
     },
    ResteMoiTaille10(){
       let collect =[]
        this.ResteMoi1.forEach(element => {
         if(element.matiere_id == 10){
           collect.push(element.note)
         }
       });
    
       return collect.length;
     },
      Coefficient10(){
        let objet = this.MatiereLitteraire.find(tem=>tem.id == 10)
        if(objet) {
          return objet.coefficient
        }
       return 0;
     },

      //convertir le tableau string en int de la somme payée par eleve
     convertirSommeResteMoi10(){
         return this.ResteMoi10.map((i) => Number(i))
     },
     
       sommeTotalResteMoi10(){
        return this.convertirSommeResteMoi10.reduce(function(a, b){
        return (a + b);
        }, 0);
    },

     Moyenne10(){
        if(isNaN(this.sommeTotalResteMoi10/this.ResteMoiTaille10)){
         return 0
       }
       return this.sommeTotalResteMoi10/this.ResteMoiTaille10
     },

      MoyenneCoefficient10(){
       return this.Coefficient10*this.Moyenne10
     },
      // Fin Calcul de moyenne matiere_id = 10


     // Debut Calcul de moyenne matiere_id = 11
  
      ResteMoi11(){
       let collect =[]
        this.ResteMoi1.forEach(element => {
         if(element.matiere_id == 11){
           collect.push(element.note)
         }
       });
    
       return collect;
     },
    ResteMoiTaille11(){
       let collect =[]
        this.ResteMoi1.forEach(element => {
         if(element.matiere_id == 11){
           collect.push(element.note)
         }
       });
    
       return collect.length;
     },
      Coefficient11(){
        let objet = this.MatiereLitteraire.find(tem=>tem.id == 11)
        if(objet) {
          return objet.coefficient
        }
       return 0;
     },

      //convertir le tableau string en int de la somme payée par eleve
     convertirSommeResteMoi11(){
         return this.ResteMoi11.map((i) => Number(i))
     },
     
       sommeTotalResteMoi11(){
        return this.convertirSommeResteMoi11.reduce(function(a, b){
        return (a + b);
        }, 0);
    },

     Moyenne11(){
        if(isNaN(this.sommeTotalResteMoi11/this.ResteMoiTaille11)){
         return 0
       }
       return this.sommeTotalResteMoi11/this.ResteMoiTaille11
     },

      MoyenneCoefficient11(){
       return this.Coefficient11*this.Moyenne11
     },
      // Fin Calcul de moyenne matiere_id = 11


     // Debut Calcul de moyenne matiere_id = 12
  
      ResteMoi12(){
       let collect =[]
        this.ResteMoi1.forEach(element => {
         if(element.matiere_id == 12){
           collect.push(element.note)
         }
       });
    
       return collect;
     },
    ResteMoiTaille12(){
       let collect =[]
        this.ResteMoi1.forEach(element => {
         if(element.matiere_id == 12){
           collect.push(element.note)
         }
       });
    
       return collect.length;
     },
      Coefficient12(){
        let objet = this.MatiereLitteraire.find(tem=>tem.id == 12)
        if(objet) {
          return objet.coefficient
        }
       return 0;
     },

      //convertir le tableau string en int de la somme payée par eleve
     convertirSommeResteMoi12(){
         return this.ResteMoi12.map((i) => Number(i))
     },
     
       sommeTotalResteMoi12(){
        return this.convertirSommeResteMoi12.reduce(function(a, b){
        return (a + b);
        }, 0);
    },

     Moyenne12(){
        if(isNaN(this.sommeTotalResteMoi12/this.ResteMoiTaille12)){
         return 0
       }
       return this.sommeTotalResteMoi12/this.ResteMoiTaille12
     },

      MoyenneCoefficient12(){
       return this.Coefficient12*this.Moyenne12
     },
      // Fin Calcul de moyenne matiere_id = 12


     // Debut Calcul de moyenne matiere_id = 13
      ResteMoi13(){
       let collect =[]
        this.ResteMoi1.forEach(element => {
         if(element.matiere_id == 13){
           collect.push(element.note)
         }
       });
    
       return collect;
     },
    ResteMoiTaille13(){
       let collect =[]
        this.ResteMoi1.forEach(element => {
         if(element.matiere_id == 13){
           collect.push(element.note)
         }
       });
    
       return collect.length;
     },
      Coefficient13(){
        let objet = this.MatiereLitteraire.find(tem=>tem.id == 13)
        if(objet) {
          return objet.coefficient
        }
       return 0;
     },

      //convertir le tableau string en int de la somme payée par eleve
     convertirSommeResteMoi13(){
         return this.ResteMoi13.map((i) => Number(i))
     },
     
       sommeTotalResteMoi13(){
        return this.convertirSommeResteMoi13.reduce(function(a, b){
        return (a + b);
        }, 0);
    },

     Moyenne13(){
        if(isNaN(this.sommeTotalResteMoi13/this.ResteMoiTaille13)){
         return 0
       }
       return this.sommeTotalResteMoi13/this.ResteMoiTaille13
     },

      MoyenneCoefficient13(){
       return this.Coefficient13*this.Moyenne13
     },
      // Fin Calcul de moyenne matiere_id = 13


     // Debut Calcul de moyenne matiere_id = 8
      ResteMoi14(){
       let collect =[]
        this.ResteMoi1.forEach(element => {
         if(element.matiere_id == 14){
           collect.push(element.note)
         }
       });
    
       return collect;
     },
    ResteMoiTaille14(){
       let collect =[]
        this.ResteMoi1.forEach(element => {
         if(element.matiere_id == 14){
           collect.push(element.note)
         }
       });
    
       return collect.length;
     },
      Coefficient14(){
        let objet = this.MatiereLitteraire.find(tem=>tem.id == 14)
        if(objet) {
          return objet.coefficient
        }
       return 0;
     },

      //convertir le tableau string en int de la somme payée par eleve
     convertirSommeResteMoi14(){
         return this.ResteMoi14.map((i) => Number(i))
     },
     
       sommeTotalResteMoi14(){
        return this.convertirSommeResteMoi14.reduce(function(a, b){
        return (a + b);
        }, 0);
    },

     Moyenne14(){
        if(isNaN(this.sommeTotalResteMoi14/this.ResteMoiTaille14)){
         return 0
       }
       return this.sommeTotalResteMoi14/this.ResteMoiTaille14
     },
      MoyenneCoefficient14(){
       return this.Coefficient14*this.Moyenne14
     },
      // Fin Calcul de moyenne matiere_id = 14


     // Debut Calcul de moyenne matiere_id = 15
      ResteMoi15(){
       let collect =[]
        this.ResteMoi1.forEach(element => {
         if(element.matiere_id == 15){
           collect.push(element.note)
         }
       });
    
       return collect;
     },
    ResteMoiTaille15(){
       let collect =[]
        this.ResteMoi1.forEach(element => {
         if(element.matiere_id == 15){
           collect.push(element.note)
         }
       });
    
       return collect.length;
     },
      Coefficient15(){
        let objet = this.MatiereLitteraire.find(tem=>tem.id == 15)
        if(objet) {
          return objet.coefficient
        }
       return 0;
     },

      //convertir le tableau string en int de la somme payée par eleve
     convertirSommeResteMoi15(){
         return this.ResteMoi15.map((i) => Number(i))
     },
     
       sommeTotalResteMoi15(){
        return this.convertirSommeResteMoi15.reduce(function(a, b){
        return (a + b);
        }, 0);
    },

     Moyenne15(){
        if(isNaN(this.sommeTotalResteMoi15/this.ResteMoiTaille15)){
         return 0
       }
       return this.sommeTotalResteMoi15/this.ResteMoiTaille15
     },
      MoyenneCoefficient15(){
       return this.Coefficient15*this.Moyenne15
     },
      // Fin Calcul de moyenne matiere_id = 15

     // Debut Calcul de moyenne matiere_id = 8
      ResteMoi16(){
       let collect =[]
        this.ResteMoi1.forEach(element => {
         if(element.matiere_id == 16){
           collect.push(element.note)
         }
       });
    
       return collect;
     },
    ResteMoiTaille16(){
       let collect =[]
        this.ResteMoi1.forEach(element => {
         if(element.matiere_id == 16){
           collect.push(element.note)
         }
       });
    
       return collect.length;
     },
      Coefficient16(){
        let objet = this.MatiereLitteraire.find(tem=>tem.id == 16)
        if(objet) {
          return objet.coefficient
        }
       return 0;
     },

      //convertir le tableau string en int de la somme payée par eleve
     convertirSommeResteMoi16(){
         return this.ResteMoi16.map((i) => Number(i))
     },
     
       sommeTotalResteMoi16(){
        return this.convertirSommeResteMoi16.reduce(function(a, b){
        return (a + b);
        }, 0);
    },

     Moyenne16(){
        if(isNaN(this.sommeTotalResteMoi17/this.ResteMoiTaille17)){
         return 0
       }
       return this.sommeTotalResteMoi16/this.ResteMoiTaille16
     },
      MoyenneCoefficient16(){
       return this.Coefficient16*this.Moyenne16
     },
      // Fin Calcul de moyenne matiere_id = 16


     // Debut Calcul de moyenne matiere_id = 17
      ResteMoi17(){
       let collect =[]
        this.ResteMoi1.forEach(element => {
         if(element.matiere_id == 17){
           collect.push(element.note)
         }
       });
    
       return collect;
     },
    ResteMoiTaille17(){
       let collect =[]
        this.ResteMoi1.forEach(element => {
         if(element.matiere_id == 17){
           collect.push(element.note)
         }
       });
    
       return collect.length;
     },
      Coefficient17(){
        let objet = this.MatiereLitteraire.find(tem=>tem.id == 17)
        if(objet) {
          return objet.coefficient
        }
       return 0;
     },

      //convertir le tableau string en int de la somme payée par eleve
     convertirSommeResteMoi17(){
         return this.ResteMoi17.map((i) => Number(i))
     },
     
       sommeTotalResteMoi17(){
        return this.convertirSommeResteMoi17.reduce(function(a, b){
        return (a + b);
        }, 0);
    },

     Moyenne17(){
        if(isNaN(this.sommeTotalResteMoi17/this.ResteMoiTaille17)){
         return 0
       }
       return this.sommeTotalResteMoi17/this.ResteMoiTaille17
     },
      MoyenneCoefficient17(){
       return this.Coefficient17*this.Moyenne17
     },
      // Fin Calcul de moyenne matiere_id = 17

     // Debut Calcul de moyenne matiere_id = 18
      ResteMoi18(){
       let collect =[]
        this.ResteMoi1.forEach(element => {
         if(element.matiere_id == 18){
           collect.push(element.note)
         }
       });
    
       return collect;
     },
    ResteMoiTaille18(){
       let collect =[]
        this.ResteMoi1.forEach(element => {
         if(element.matiere_id == 18){
           collect.push(element.note)
         }
       });
    
       return collect.length;
     },
      Coefficient18(){
        let objet = this.MatiereLitteraire.find(tem=>tem.id == 18)
        if(objet) {
          return objet.coefficient
        }
       return 0;
     },

      //convertir le tableau string en int de la somme payée par eleve
     convertirSommeResteMoi18(){
         return this.ResteMoi18.map((i) => Number(i))
     },
     
       sommeTotalResteMoi18(){
        return this.convertirSommeResteMoi18.reduce(function(a, b){
        return (a + b);
        }, 0);
    },

     Moyenne18(){
        if(isNaN(this.sommeTotalResteMoi18/this.ResteMoiTaille18)){
         return 0
       }
       return this.sommeTotalResteMoi18/this.ResteMoiTaille18
     },

      MoyenneCoefficient18(){
       return this.Coefficient18*this.Moyenne18
     },
      // Fin Calcul de moyenne matiere_id = 18

     // Debut Calcul de moyenne matiere_id = 8
      ResteMoi19(){
       let collect =[]
        this.ResteMoi1.forEach(element => {
         if(element.matiere_id == 19){
           collect.push(element.note)
         }
       });
    
       return collect;
     },
    ResteMoiTaille19(){
       let collect =[]
        this.ResteMoi1.forEach(element => {
         if(element.matiere_id == 19){
           collect.push(element.note)
         }
       });
    
       return collect.length;
     },
      Coefficient19(){
        let objet = this.MatiereLitteraire.find(tem=>tem.id == 19)
        if(objet) {
          return objet.coefficient
        }
       return 0;
     },

      //convertir le tableau string en int de la somme payée par eleve
     convertirSommeResteMoi19(){
         return this.ResteMoi19.map((i) => Number(i))
     },
     
       sommeTotalResteMoi19(){
        return this.convertirSommeResteMoi19.reduce(function(a, b){
        return (a + b);
        }, 0);
    },

     Moyenne19(){
        if(isNaN(this.sommeTotalResteMoi19/this.ResteMoiTaille19)){
         return 0
       }
       return this.sommeTotalResteMoi19/this.ResteMoiTaille19
     },

      MoyenneCoefficient19(){
       return this.Coefficient19*this.Moyenne19
     },
      // Fin Calcul de moyenne matiere_id = 19

     // Debut Calcul de moyenne matiere_id = 20
      ResteMoi20(){
       let collect =[]
        this.ResteMoi1.forEach(element => {
         if(element.matiere_id == 20){
           collect.push(element.note)
         }
       });
    
       return collect;
     },
    ResteMoiTaille20(){
       let collect =[]
        this.ResteMoi1.forEach(element => {
         if(element.matiere_id == 20){
           collect.push(element.note)
         }
       });
    
       return collect.length;
     },
      Coefficient20(){
        let objet = this.MatiereLitteraire.find(tem=>tem.id == 20)
        if(objet) {
          return objet.coefficient
        }
       return 0;
     },

      //convertir le tableau string en int de la somme payée par eleve
     convertirSommeResteMoi20(){
         return this.ResteMoi20.map((i) => Number(i))
     },
     
       sommeTotalResteMoi20(){
        return this.convertirSommeResteMoi20.reduce(function(a, b){
        return (a + b);
        }, 0);
    },

     Moyenne20(){
        if(isNaN(this.sommeTotalResteMoi20/this.ResteMoiTaille20)){
         return 0
       }
       return this.sommeTotalResteMoi20/this.ResteMoiTaille20
     },
      MoyenneCoefficient20(){
       return this.Coefficient20*this.Moyenne20
     },
      // Fin Calcul de moyenne matiere_id = 20


     // Debut Calcul de moyenne matiere_id = 21
      ResteMoi21(){
       let collect =[]
        this.ResteMoi1.forEach(element => {
         if(element.matiere_id == 21){
           collect.push(element.note)
         }
       });
    
       return collect;
     },
    ResteMoiTaille21(){
       let collect =[]
        this.ResteMoi1.forEach(element => {
         if(element.matiere_id == 21){
           collect.push(element.note)
         }
       });
    
       return collect.length;
     },
      Coefficient21(){
        let objet = this.MatiereLitteraire.find(tem=>tem.id == 21)
        if(objet) {
          return objet.coefficient
        }
       return 0;
     },

      //convertir le tableau string en int de la somme payée par eleve
     convertirSommeResteMoi21(){
         return this.ResteMoi21.map((i) => Number(i))
     },
     
       sommeTotalResteMoi21(){
        return this.convertirSommeResteMoi21.reduce(function(a, b){
        return (a + b);
        }, 0);
    },

     Moyenne21(){
        if(isNaN(this.sommeTotalResteMoi21/this.ResteMoiTaille21)){
         return 0
       }
       return this.sommeTotalResteMoi21/this.ResteMoiTaille21
     },
      MoyenneCoefficient21(){
       return this.Coefficient21*this.Moyenne21
     },
      // Fin Calcul de moyenne matiere_id = 21

     // Debut Calcul de moyenne matiere_id = 22
  
      ResteMoi22(){
       let collect =[]
        this.ResteMoi1.forEach(element => {
         if(element.matiere_id == 22){
           collect.push(element.note)
         }
       });
    
       return collect;
     },
    ResteMoiTaille22(){
       let collect =[]
        this.ResteMoi1.forEach(element => {
         if(element.matiere_id == 22){
           collect.push(element.note)
         }
       });
    
       return collect.length;
     },
      Coefficient22(){
        let objet = this.MatiereLitteraire.find(tem=>tem.id == 22)
        if(objet) {
          return objet.coefficient
        }
       return 0;
     },

      //convertir le tableau string en int de la somme payée par eleve
     convertirSommeResteMoi22(){
         return this.ResteMoi22.map((i) => Number(i))
     },
     
       sommeTotalResteMoi22(){
        return this.convertirSommeResteMoi22.reduce(function(a, b){
        return (a + b);
        }, 0);
    },

     Moyenne22(){
        if(isNaN(this.sommeTotalResteMoi22/this.ResteMoiTaille22)){
         return 0
       }
       return this.sommeTotalResteMoi22/this.ResteMoiTaille22
     },
      MoyenneCoefficient22(){
       return this.Coefficient22*this.Moyenne22
     },
      // Fin Calcul de moyenne matiere_id = 22



   ResteMoi1(){
     if(this.formData.trimestre_id != ""){

       let collect =[]
       this.MatiereLitteraire.filter(item =>{
         this.GetterNote.forEach(element => {        
           if(item.id == element.matiere_id && element.trimestre_id == this.formData.trimestre_id  && element.student_id == this.editText.id){
             collect.push(element)
           }
         })
       })
       return collect;
     }
     return []
     },
   ResteMoi001(){
     if(this.formData.trimestre_id != ""){
       let collect =[]
       this.MatiereLitteraire.filter(item =>{
         this.GetterNote.forEach(element => {        
           if(item.id == element.matiere_id && element.trimestre_id == this.formData.trimestre_id ){
             collect.push(element)
           }
         })
       })
       return collect;
     }
     return []
     },
     NoteGoupeMatiere1(){     
        let collect =[]
        let objet = this.GetterNote
        if(objet.length >0){
          objet.forEach(element => {
            if(element.matiere_id == 1){
              collect.push(element)
            }
          });
        }
        return collect;     
     },

     testMoiAussi(){
      return (id1, id2)=>{
        if(id1 != "" && id2 !=""){
          let objet = this.MatiereParStudent(id1).lastIndexOf(id2)
          if(objet == 0){
            return this.MatiereParStudent(id1).length
          }else if(objet == undefined){
            return 0
          }
          return objet
        }else if(id1 != "" && id2 ==0){
          return -1
        }
      }
     },
    rangEleve(){
      return (id)=>{
        if(id != ""){
          let objet= this.GetterNote.filter(tem => tem.matiere_id == id && tem.classe_id == this.editText.classe_id); 
          if(objet){
            return objet
          }
        }
      }
    },
     MatiereParStudent(){    
       return (id) =>{
         if(id != ""){
            var note1 =[]
        let objet = this.GetterNote.filter(tem => tem.matiere_id == id && tem.classe_id == this.editText.classe_id);   
        if (objet.length > 0) {
          let array1 = [];
          let array2 = [];
          let array3 = [];
          // let array4 = [];
          objet.forEach(function (val) {
            if(val.student_id ==1){
              array1.push(val.note); 
            }
            if(val.student_id ==2){
              array2.push(val.note); 
            }
            if(val.student_id ==3){
              array3.push(val.note); 
            }
            // if(val.student_id ==4){
            //   array4.push(val.note); 
            // }
          });
          let unique1 = array1;      
          let unique2 = array2;      
          let unique3 = array3;      
          // let unique4 = array4;      
         if (unique1.length == 0) {return [];}
         else{
           let test1 = unique1.map(Number).reduce(function(a,b){
             return (a +b);
           }, 0);
            note1.push(Math.round(test1/unique1.length))
          //  return note1
         }
         if (unique2.length == 0) {return [];}
         else{
           let test2 = unique2.map(Number).reduce(function(a,b){
             return (a +b);
           }, 0);

            note1.push(Math.round(test2/unique2.length))
            // note1 = note1.sort(function(a,b){
            //   return a-b
            // })

            // return note1
         }
         if (unique3.length == 0) {return [];}
         else{
           let test3 = unique3.map(Number).reduce(function(a,b){
             return (a +b);
           }, 0);

            note1.push(Math.round(test3/unique3.length))
            note1 = note1.sort(function(a,b){
              return a-b
            })

         }
            return note1
        //  if (unique4.length == 0) {return [];}
        //  else{
        //    let test4 = unique4.map(Number).reduce(function(a,b){
        //      return (a +b);
        //    }, 0);

        //     note1.push(Math.round(test4/unique4.length))
        //     note1 = note1.sort(function(a,b){
        //       return a-b
        //     })

        //     return note1
        //  }
        } 
        return 0;
             
         }
       }
       
     //  } 
     },
     MatiereParStudent001(){    
       return (id) =>{
         if(id != ""){
           let objet = this.GetterNote.filter(tem => tem.matiere_id == id && tem.classe_id == this.editText.classe_id );   
           let note1 =[]
        if (objet.length > 0) {
        
          objet.forEach(function (val) {
           note1.push(val)
          });
          let unique1 = note1;      
            if(unique1.length == 0){
              return []
            }

            return unique1
      
        } 
        return [];
             
         }
       }
       
     //  } 
     },

     MatiereParStudenuut(){
       var note1 = []
       let collect =[]
      //  let Taille1 =0
        this.NoteGoupeMatiere1.forEach(element => {
         if(element.student_id == 1){
           collect.push(element.note)
          //  Taille1 = collect.length
           note1.push( collect.length)
         }
        
       });
       return collect.length;
     },

   FilterByCoef(){
     if(this.formData.trimestre_id != ""){

       let collect =[]
       this.MatiereLitteraire.filter(item =>{
         this.GetterNote.forEach(element => {        
           if(item.id == element.matiere_id && element.trimestre_id == this.formData.trimestre_id){
             collect.push(item.coefficient)
           }
         })
       })
       return collect;
     }
     return 0
     },



     //Moyenne globale matière litteraire
   MoyenneTotalScientifique(){
       return Math.round(this.MoyenneMatScience1+this.MoyenneMatScience2+this.MoyenneMatScience3+this.MoyenneMatScience4+this.MoyenneMatScience5+this.MoyenneMatScience6+
       this.MoyenneMatScience7+this.MoyenneMatScience8+this.MoyenneMatScience9+this.MoyenneMatScience10+this.MoyenneMatScience11+this.MoyenneMatScience12+
       this.MoyenneMatScience13+this.MoyenneMatScience14+this.MoyenneMatScience15+this.MoyenneMatScience16+this.MoyenneMatScience17+this.MoyenneMatScience18+
       this.MoyenneMatScience19+this.MoyenneMatScience20+this.MoyenneMatScience21+this.MoyenneMatScience22)
     },

     SommeMoyenneTotalScientifique(){
       return Math.round(this.MoyenneCoefficientSC1+this.MoyenneCoefficientSC2+this.MoyenneCoefficientSC3+this.MoyenneCoefficientSC4+this.MoyenneCoefficientSC5+this.MoyenneCoefficientSC6+
       this.MoyenneCoefficientSC7+this.MoyenneCoefficientSC8+this.MoyenneCoefficientSC9+this.MoyenneCoefficientSC10+this.MoyenneCoefficientSC11+this.MoyenneCoefficientSC12+
       this.MoyenneCoefficientSC13+this.MoyenneCoefficientSC14+this.MoyenneCoefficientSC15+this.MoyenneCoefficientSC16+this.MoyenneCoefficientSC17+this.MoyenneCoefficientSC18+
       this.MoyenneCoefficientSC19+this.MoyenneCoefficientSC20+this.MoyenneCoefficientSC21+this.MoyenneCoefficientSC22)
     },


 //Moyenne globale matière litteraire
   MoyenneTotalAutre(){
       return Math.round(this.MoyenneMatAutre1+this.MoyenneMatAutre2+this.MoyenneMatAutre3+this.MoyenneMatAutre4+this.MoyenneMatAutre5+this.MoyenneMatAutre6+
       this.MoyenneMatAutre7+this.MoyenneMatAutre8+this.MoyenneMatAutre9+this.MoyenneMatAutre10+this.MoyenneMatAutre11+this.MoyenneMatAutre12+
       this.MoyenneMatAutre13+this.MoyenneMatAutre14+this.MoyenneMatAutre15+this.MoyenneMatAutre16+this.MoyenneMatAutre17+this.MoyenneMatAutre18+
       this.MoyenneMatAutre19+this.MoyenneMatAutre20+this.MoyenneMatAutre21+this.MoyenneMatAutre22)
     },

      SommeMoyenneTotalAutre(){
       return Math.round(this.MoyenneCoefficientAut1+this.MoyenneCoefficientAut2+this.MoyenneCoefficientAut3+this.MoyenneCoefficientAut4+this.MoyenneCoefficientAut5+this.MoyenneCoefficientAut6+
       this.MoyenneCoefficientAut7+this.MoyenneCoefficientAut8+this.MoyenneCoefficientAut9+this.MoyenneCoefficientAut10+this.MoyenneCoefficientAut11+this.MoyenneCoefficientAut12+
       this.MoyenneCoefficientAut13+this.MoyenneCoefficientAut14+this.MoyenneCoefficientAut15+this.MoyenneCoefficientAut16+this.MoyenneCoefficientAut17+this.MoyenneCoefficientAut18+
       this.MoyenneCoefficientAut19+this.MoyenneCoefficientAut20+this.MoyenneCoefficientAut21+this.MoyenneCoefficientAut22)
     },

     SommeMoyenneTotaux(){
       return Math.round(this.SommeMoyenneTotalAutre+this.SommeMoyenneTotalScientifique+this.SommeMoyenneTotalLiterraire)
     },

     MoyenneTrimestre1(){
       return (this.SommeMoyenneTotaux/this.CoeffecientTotal).toFixed(2)
     },

     // Debut Calcul de moyenne matiere_id = 1
      MatScience1(){
       let collect =[]
        this.MatiereScientifique.forEach(element => {
         if(element.matiere_id == 1){
           collect.push(element.note)
         }
        
       });
    //    if(collect.length == 0){return []}
       return collect;
     },
    MatScienceTaille1(){
       let collect =[]
        this.MatiereScientifique.forEach(element => {
         if(element.matiere_id == 1){
           collect.push(element.note)
         }
       });
    
       return collect.length;
     },
     CoefficientMatScience1(){
        let objet = this.MatiereScience.find(tem=>tem.id == 1)
        if(objet) {
          return objet.coefficient
        }
       return 0;
     },

      //convertir le tableau string en int de la somme payée par eleve
     convertirSommeMatScience1(){
       if(this.MatScienceTaille1 != 0){

         return this.MatScience1.map((i) => Number(i))
       }
       return 0
     },
     
       sommeTotalMatScience1(){
          if(this.MatScienceTaille1 != 0){

            return this.convertirSommeMatScience1.reduce(function(a, b){
            return (a + b);
            }, 0);
          }
          return 0
    },

     MoyenneMatScience1(){
       if(isNaN(this.sommeTotalMatScience1/this.MatScienceTaille1)){
         return 0
       }
       return this.sommeTotalMatScience1/this.MatScienceTaille1
     },

      MoyenneCoefficientSC1(){
       return this.CoefficientMatScience1*this.MoyenneMatScience1
     },
      // Fin Calcul de moyenne matiere_id = 1


     // Debut Calcul de moyenne matiere_id = 2
      MatScience2(){
       let collect =[]
        this.MatiereScientifique.forEach(element => {
         if(element.matiere_id == 2){
           collect.push(element.note)
         }
       });
    
       return collect;
     },
    MatScienceTaille2(){
       let collect =[]
        this.MatiereScientifique.forEach(element => {
         if(element.matiere_id == 2){
           collect.push(element.note)
         }
       });
    
       return collect.length;
     },
       CoefficientMatScience2(){
        let objet = this.MatiereScience.find(tem=>tem.id == 2)
        if(objet) {
          return objet.coefficient
        }
       return 0;
     },
      //convertir le tableau string en int de la somme payée par eleve
     convertirSommeMatScience2(){
         return this.MatScience2.map((i) => Number(i))
     },
     
       sommeTotalMatScience2(){
        return this.convertirSommeMatScience2.reduce(function(a, b){
        return (a + b);
        }, 0);
    },

     MoyenneMatScience2(){
        if(isNaN(this.sommeTotalMatScience2/this.MatScienceTaille2)){
         return 0
       }
       return this.sommeTotalMatScience2/this.MatScienceTaille2
     },
      MoyenneCoefficientSC2(){
       return this.CoefficientMatScience2*this.MoyenneMatScience2
     },
      // Fin Calcul de moyenne matiere_id = 2




     // Debut Calcul de moyenne matiere_id = 3
      MatScience3(){
       let collect =[]
        this.MatiereScientifique.forEach(element => {
         if(element.matiere_id == 3){
           collect.push(element.note)
         }
       });
    
       return collect;
     },
    MatScienceTaille3(){
       let collect =[]
        this.MatiereScientifique.forEach(element => {
         if(element.matiere_id == 3){
           collect.push(element.note)
         }
       });
    
       return collect.length;
     },
        CoefficientMatScience3(){
        let objet = this.MatiereScience.find(tem=>tem.id == 3)
        if(objet) {
          return objet.coefficient
        }
       return 0;
     },

      //convertir le tableau string en int de la somme payée par eleve
     convertirSommeMatScience3(){
         return this.MatScience3.map((i) => Number(i))
     },
     
       sommeTotalMatScience3(){
        return this.convertirSommeMatScience3.reduce(function(a, b){
        return (a + b);
        }, 0);
    },

     MoyenneMatScience3(){
        if(isNaN(this.sommeTotalMatScience3/this.MatScienceTaille3)){
         return 0
       }
       return this.sommeTotalMatScience3/this.MatScienceTaille3
     },

      MoyenneCoefficientSC3(){
       return this.CoefficientMatScience3*this.MoyenneMatScience3
     },
      // Fin Calcul de moyenne matiere_id = 3


     // Debut Calcul de moyenne matiere_id = 4
      MatScience4(){
       let collect =[]
        this.MatiereScientifique.forEach(element => {
         if(element.matiere_id == 4){
           collect.push(element.note)
         }
       });
    
       return collect;
     },
    MatScienceTaille4(){
       let collect =[]
        this.MatiereScientifique.forEach(element => {
         if(element.matiere_id == 4){
           collect.push(element.note)
         }
       });
    
       return collect.length;
     },
        CoefficientMatScience4(){
        let objet = this.MatiereScience.find(tem=>tem.id == 4)
        if(objet) {
          return objet.coefficient
        }
       return 0;
     },

      //convertir le tableau string en int de la somme payée par eleve
     convertirSommeMatScience4(){
         return this.MatScience4.map((i) => Number(i))
     },
     
       sommeTotalMatScience4(){
        return this.convertirSommeMatScience4.reduce(function(a, b){
        return (a + b);
        }, 0);
    },

     MoyenneMatScience4(){
        if(isNaN(this.sommeTotalMatScience4/this.MatScienceTaille4)){
         return 0
       }
       return this.sommeTotalMatScience4/this.MatScienceTaille4
     },
      MoyenneCoefficientSC4(){
       return this.CoefficientMatScience4*this.MoyenneMatScience4
     },
      // Fin Calcul de moyenne matiere_id = 4


     // Debut Calcul de moyenne matiere_id = 5
      MatScience5(){
       let collect =[]
        this.MatiereScientifique.forEach(element => {
         if(element.matiere_id == 5){
           collect.push(element.note)
         }
       });
    
       return collect;
     },
    MatScienceTaille5(){
       let collect =[]
        this.MatiereScientifique.forEach(element => {
         if(element.matiere_id == 5){
           collect.push(element.note)
         }
       });
    
       return collect.length;
     },
        CoefficientMatScience5(){
        let objet = this.MatiereScience.find(tem=>tem.id == 5)
        if(objet) {
          return objet.coefficient
        }
       return 0;
     },
      //convertir le tableau string en int de la somme payée par eleve
     convertirSommeMatScience5(){
         return this.MatScience5.map((i) => Number(i))
     }, 
       sommeTotalMatScience5(){
        return this.convertirSommeMatScience5.reduce(function(a, b){
        return (a + b);
        }, 0);
    },
     MoyenneMatScience5(){
        if(isNaN(this.sommeTotalMatScience5/this.MatScienceTaille5)){
         return 0
       }
       return this.sommeTotalMatScience5/this.MatScienceTaille5
     },
      MoyenneCoefficientSC5(){
       return this.CoefficientMatScience5*this.MoyenneMatScience5
     },
      // Fin Calcul de moyenne matiere_id = 5

     // Debut Calcul de moyenne matiere_id = 6
      MatScience6(){
       let collect =[]
        this.MatiereScientifique.forEach(element => {
         if(element.matiere_id == 6){
           collect.push(element.note)
         }
       });
    
       return collect;
     },
    MatScienceTaille6(){
       let collect =[]
        this.MatiereScientifique.forEach(element => {
         if(element.matiere_id == 6){
           collect.push(element.note)
         }
       });
    
       return collect.length;
     },
        CoefficientMatScience6(){
        let objet = this.MatiereScience.find(tem=>tem.id == 6)
        if(objet) {
          return objet.coefficient
        }
       return 0;
     },
      //convertir le tableau string en int de la somme payée par eleve
     convertirSommeMatScience6(){
         return this.MatScience6.map((i) => Number(i))
     }, 
       sommeTotalMatScience6(){
        return this.convertirSommeMatScience6.reduce(function(a, b){
        return (a + b);
        }, 0);
    },
     MoyenneMatScience6(){
        if(isNaN(this.sommeTotalMatScience6/this.MatScienceTaille6)){
         return 0
       }
       return this.sommeTotalMatScience6/this.MatScienceTaille6
     },
      MoyenneCoefficientSC6(){
       return this.CoefficientMatScience6*this.MoyenneMatScience6
     },
      // Fin Calcul de moyenne matiere_id = 6


  // Debut Calcul de moyenne matiere_id = 7
      MatScience7(){
       let collect =[]
        this.MatiereScientifique.forEach(element => {
         if(element.matiere_id == 7){
           collect.push(element.note)
         }
       });
       return collect;
     },
        
      MatScienceTaille7(){
       let collect =[]
        this.MatiereScientifique.forEach(element => {
         if(element.matiere_id == 7){
           collect.push(element.note)
         }
       });  
       return collect.length;
     },
        CoefficientMatScience7(){
        let objet = this.MatiereScience.find(tem=>tem.id == 7)
        if(objet) {
          return objet.coefficient
        }
       return 0;
     },
  
      sommeTotalMatScience7(){
        return this.convertirSommeMatScience7.reduce(function(a, b){
        return (a + b);
        }, 0);
    },

     //convertir le tableau string en int de la somme payée par eleve
     convertirSommeMatScience7(){
         return this.MatScience7.map((i) => Number(i))
     },

     MoyenneMatScience7(){
        if(isNaN(this.sommeTotalMatScience7/this.MatScienceTaille7)){
         return 0
       }
       return this.sommeTotalMatScience7/this.MatScienceTaille7
     },
      MoyenneCoefficientSC7(){
       return this.CoefficientMatScience7*this.MoyenneMatScience7
     },

  // Fin Calcul de moyenne matiere_id = 7



     // Debut Calcul de moyenne matiere_id = 8
  
      MatScience8(){
       let collect =[]
        this.MatiereScientifique.forEach(element => {
         if(element.matiere_id == 8){
           collect.push(element.note)
         }
       });
    
       return collect;
     },
    MatScienceTaille8(){
       let collect =[]
        this.MatiereScientifique.forEach(element => {
         if(element.matiere_id == 8){
           collect.push(element.note)
         }
       });
    
       return collect.length;
     },
        CoefficientMatScience8(){
        let objet = this.MatiereScience.find(tem=>tem.id == 8)
        if(objet) {
          return objet.coefficient
        }
       return 0;
     },

      //convertir le tableau string en int de la somme payée par eleve
     convertirSommeMatScience8(){
         return this.MatScience8.map((i) => Number(i))
     },
     
       sommeTotalMatScience8(){
        return this.convertirSommeMatScience8.reduce(function(a, b){
        return (a + b);
        }, 0);
    },

     MoyenneMatScience8(){
        if(isNaN(this.sommeTotalMatScience8/this.MatScienceTaille8)){
         return 0
       }
       return this.sommeTotalMatScience8/this.MatScienceTaille8
     },
      MoyenneCoefficientSC8(){
       return this.CoefficientMatScience8*this.MoyenneMatScience8
     },
      // Fin Calcul de moyenne matiere_id = 8
     // Debut Calcul de moyenne matiere_id = 8
  
      MatScience9(){
       let collect =[]
        this.MatiereScientifique.forEach(element => {
         if(element.matiere_id == 9){
           collect.push(element.note)
         }
       });
    
       return collect;
     },
    MatScienceTaille9(){
       let collect =[]
        this.MatiereScientifique.forEach(element => {
         if(element.matiere_id == 9){
           collect.push(element.note)
         }
       });
    
       return collect.length;
     },

        CoefficientMatScience9(){
        let objet = this.MatiereScience.find(tem=>tem.id == 9)
        if(objet) {
          return objet.coefficient
        }
       return 0;
     },

      //convertir le tableau string en int de la somme payée par eleve
     convertirSommeMatScience9(){
         return this.MatScience9.map((i) => Number(i))
     },
     
       sommeTotalMatScience9(){
        return this.convertirSommeMatScience9.reduce(function(a, b){
        return (a + b);
        }, 0);
    },

     MoyenneMatScience9(){
        if(isNaN(this.sommeTotalMatScience9/this.MatScienceTaille9)){
         return 0
       }
       return this.sommeTotalMatScience9/this.MatScienceTaille9
     },
      MoyenneCoefficientSC9(){
       return this.CoefficientMatScience9*this.MoyenneMatScience9
     },
      // Fin Calcul de moyenne matiere_id = 9
     // Debut Calcul de moyenne matiere_id = 8
  
      MatScience10(){
       let collect =[]
        this.MatiereScientifique.forEach(element => {
         if(element.matiere_id == 10){
           collect.push(element.note)
         }
       });
    
       return collect;
     },
    MatScienceTaille10(){
       let collect =[]
        this.MatiereScientifique.forEach(element => {
         if(element.matiere_id == 10){
           collect.push(element.note)
         }
       });
    
       return collect.length;
     },
        CoefficientMatScience10(){
        let objet = this.MatiereScience.find(tem=>tem.id == 10)
        if(objet) {
          return objet.coefficient
        }
       return 0;
     },

      //convertir le tableau string en int de la somme payée par eleve
     convertirSommeMatScience10(){
         return this.MatScience10.map((i) => Number(i))
     },
     
       sommeTotalMatScience10(){
        return this.convertirSommeMatScience10.reduce(function(a, b){
        return (a + b);
        }, 0);
    },

     MoyenneMatScience10(){
        if(isNaN(this.sommeTotalMatScience10/this.MatScienceTaille10)){
         return 0
       }
       return this.sommeTotalMatScience10/this.MatScienceTaille10
     },
      MoyenneCoefficientSC10(){
       return this.CoefficientMatScience10*this.MoyenneMatScience10
     },
      // Fin Calcul de moyenne matiere_id = 10


     // Debut Calcul de moyenne matiere_id = 11
  
      MatScience11(){
       let collect =[]
        this.MatiereScientifique.forEach(element => {
         if(element.matiere_id == 11){
           collect.push(element.note)
         }
       });
    
       return collect;
     },
    MatScienceTaille11(){
       let collect =[]
        this.MatiereScientifique.forEach(element => {
         if(element.matiere_id == 11){
           collect.push(element.note)
         }
       });
    
       return collect.length;
     },
      CoefficientMatScience11(){
        let objet = this.MatiereScience.find(tem=>tem.id == 11)
        if(objet) {
          return objet.coefficient
        }
       return 0;
     },

      //convertir le tableau string en int de la somme payée par eleve
     convertirSommeMatScience11(){
         return this.MatScience11.map((i) => Number(i))
     },
     
       sommeTotalMatScience11(){
        return this.convertirSommeMatScience11.reduce(function(a, b){
        return (a + b);
        }, 0);
    },

     MoyenneMatScience11(){
        if(isNaN(this.sommeTotalMatScience11/this.MatScienceTaille11)){
         return 0
       }
       return this.sommeTotalMatScience11/this.MatScienceTaille11
     },
      MoyenneCoefficientSC11(){
       return this.CoefficientMatScience11*this.MoyenneMatScience11
     },
      // Fin Calcul de moyenne matiere_id = 11


     // Debut Calcul de moyenne matiere_id = 12
  
      MatScience12(){
       let collect =[]
        this.MatiereScientifique.forEach(element => {
         if(element.matiere_id == 12){
           collect.push(element.note)
         }
       });
    
       return collect;
     },
    MatScienceTaille12(){
       let collect =[]
        this.MatiereScientifique.forEach(element => {
         if(element.matiere_id == 12){
           collect.push(element.note)
         }
       });
    
       return collect.length;
     },
        CoefficientMatScience12(){
        let objet = this.MatiereScience.find(tem=>tem.id == 12)
        if(objet) {
          return objet.coefficient
        }
       return 0;
     },

      //convertir le tableau string en int de la somme payée par eleve
     convertirSommeMatScience12(){
         return this.MatScience12.map((i) => Number(i))
     },
     
       sommeTotalMatScience12(){
        return this.convertirSommeMatScience12.reduce(function(a, b){
        return (a + b);
        }, 0);
    },

     MoyenneMatScience12(){
        if(isNaN(this.sommeTotalMatScience12/this.MatScienceTaille12)){
         return 0
       }
       return this.sommeTotalMatScience12/this.MatScienceTaille12
     },
      MoyenneCoefficientSC12(){
       return this.CoefficientMatScience12*this.MoyenneMatScience12
     },
      // Fin Calcul de moyenne matiere_id = 12


     // Debut Calcul de moyenne matiere_id = 13
      MatScience13(){
       let collect =[]
        this.MatiereScientifique.forEach(element => {
         if(element.matiere_id == 13){
           collect.push(element.note)
         }
       });
    
       return collect;
     },
    MatScienceTaille13(){
       let collect =[]
        this.MatiereScientifique.forEach(element => {
         if(element.matiere_id == 13){
           collect.push(element.note)
         }
       });
    
       return collect.length;
     },
        CoefficientMatScience13(){
        let objet = this.MatiereScience.find(tem=>tem.id == 13)
        if(objet) {
          return objet.coefficient
        }
       return 0;
     },

      //convertir le tableau string en int de la somme payée par eleve
     convertirSommeMatScience13(){
         return this.MatScience13.map((i) => Number(i))
     },
     
       sommeTotalMatScience13(){
        return this.convertirSommeMatScience13.reduce(function(a, b){
        return (a + b);
        }, 0);
    },

     MoyenneMatScience13(){
        if(isNaN(this.sommeTotalMatScience13/this.MatScienceTaille13)){
         return 0
       }
       return this.sommeTotalMatScience13/this.MatScienceTaille13
     },
      MoyenneCoefficientSC13(){
       return this.CoefficientMatScience13*this.MoyenneMatScience13
     },
      // Fin Calcul de moyenne matiere_id = 13


     // Debut Calcul de moyenne matiere_id = 8
      MatScience14(){
       let collect =[]
        this.MatiereScientifique.forEach(element => {
         if(element.matiere_id == 14){
           collect.push(element.note)
         }
       });
    
       return collect;
     },
    MatScienceTaille14(){
       let collect =[]
        this.MatiereScientifique.forEach(element => {
         if(element.matiere_id == 14){
           collect.push(element.note)
         }
       });
    
       return collect.length;
     },
        CoefficientMatScience14(){
        let objet = this.MatiereScience.find(tem=>tem.id == 14)
        if(objet) {
          return objet.coefficient
        }
       return 0;
     },

      //convertir le tableau string en int de la somme payée par eleve
     convertirSommeMatScience14(){
         return this.MatScience14.map((i) => Number(i))
     },
     
       sommeTotalMatScience14(){
        return this.convertirSommeMatScience14.reduce(function(a, b){
        return (a + b);
        }, 0);
    },

     MoyenneMatScience14(){
        if(isNaN(this.sommeTotalMatScience14/this.MatScienceTaille14)){
         return 0
       }
       return this.sommeTotalMatScience14/this.MatScienceTaille14
     },
      MoyenneCoefficientSC14(){
       return this.CoefficientMatScience14*this.MoyenneMatScience14
     },
      // Fin Calcul de moyenne matiere_id = 14


     // Debut Calcul de moyenne matiere_id = 15
      MatScience15(){
       let collect =[]
        this.MatiereScientifique.forEach(element => {
         if(element.matiere_id == 15){
           collect.push(element.note)
         }
       });
    
       return collect;
     },
    MatScienceTaille15(){
       let collect =[]
        this.MatiereScientifique.forEach(element => {
         if(element.matiere_id == 15){
           collect.push(element.note)
         }
       });
    
       return collect.length;
     },
        CoefficientMatScience15(){
        let objet = this.MatiereScience.find(tem=>tem.id == 15)
        if(objet) {
          return objet.coefficient
        }
       return 0;
     },

      //convertir le tableau string en int de la somme payée par eleve
     convertirSommeMatScience15(){
         return this.MatScience15.map((i) => Number(i))
     },
     
       sommeTotalMatScience15(){
        return this.convertirSommeMatScience15.reduce(function(a, b){
        return (a + b);
        }, 0);
    },

     MoyenneMatScience15(){
        if(isNaN(this.sommeTotalMatScience15/this.MatScienceTaille15)){
         return 0
       }
       return this.sommeTotalMatScience15/this.MatScienceTaille15
     },
      MoyenneCoefficientSC15(){
       return this.CoefficientMatScience15*this.MoyenneMatScience15
     },
      // Fin Calcul de moyenne matiere_id = 15

     // Debut Calcul de moyenne matiere_id = 8
      MatScience16(){
       let collect =[]
        this.MatiereScientifique.forEach(element => {
         if(element.matiere_id == 16){
           collect.push(element.note)
         }
       });
    
       return collect;
     },
    MatScienceTaille16(){
       let collect =[]
        this.MatiereScientifique.forEach(element => {
         if(element.matiere_id == 16){
           collect.push(element.note)
         }
       });
    
       return collect.length;
     },
        CoefficientMatScience16(){
        let objet = this.MatiereScience.find(tem=>tem.id == 16)
        if(objet) {
          return objet.coefficient
        }
       return 0;
     },

      //convertir le tableau string en int de la somme payée par eleve
     convertirSommeMatScience16(){
         return this.MatScience16.map((i) => Number(i))
     },
     
       sommeTotalMatScience16(){
        return this.convertirSommeMatScience16.reduce(function(a, b){
        return (a + b);
        }, 0);
    },

     MoyenneMatScience16(){
        if(isNaN(this.sommeTotalMatScience16/this.MatScienceTaille16)){
         return 0
       }
       return this.sommeTotalMatScience16/this.MatScienceTaille16
     },
      MoyenneCoefficientSC16(){
       return this.CoefficientMatScience16*this.MoyenneMatScience16
     },
      // Fin Calcul de moyenne matiere_id = 16


     // Debut Calcul de moyenne matiere_id = 17
      MatScience17(){
       let collect =[]
        this.MatiereScientifique.forEach(element => {
         if(element.matiere_id == 17){
           collect.push(element.note)
         }
       });
    
       return collect;
     },
    MatScienceTaille17(){
       let collect =[]
        this.MatiereScientifique.forEach(element => {
         if(element.matiere_id == 17){
           collect.push(element.note)
         }
       });
    
       return collect.length;
     },
        CoefficientMatScience17(){
        let objet = this.MatiereScience.find(tem=>tem.id == 17)
        if(objet) {
          return objet.coefficient
        }
       return 0;
     },

      //convertir le tableau string en int de la somme payée par eleve
     convertirSommeMatScience17(){
         return this.MatScience17.map((i) => Number(i))
     },
     
       sommeTotalMatScience17(){
        return this.convertirSommeMatScience17.reduce(function(a, b){
        return (a + b);
        }, 0);
    },

     MoyenneMatScience17(){
        if(isNaN(this.sommeTotalMatScience17/this.MatScienceTaille17)){
         return 0
       }
       return this.sommeTotalMatScience17/this.MatScienceTaille17
     },
      MoyenneCoefficientSC17(){
       return this.CoefficientMatScience17*this.MoyenneMatScience17
     },
      // Fin Calcul de moyenne matiere_id = 17

     // Debut Calcul de moyenne matiere_id = 18
      MatScience18(){
       let collect =[]
        this.MatiereScientifique.forEach(element => {
         if(element.matiere_id == 18){
           collect.push(element.note)
         }
       });
    
       return collect;
     },
    MatScienceTaille18(){
       let collect =[]
        this.MatiereScientifique.forEach(element => {
         if(element.matiere_id == 18){
           collect.push(element.note)
         }
       });
    
       return collect.length;
     },
        CoefficientMatScience18(){
        let objet = this.MatiereScience.find(tem=>tem.id == 18)
        if(objet) {
          return objet.coefficient
        }
       return 0;
     },

      //convertir le tableau string en int de la somme payée par eleve
     convertirSommeMatScience18(){
         return this.MatScience18.map((i) => Number(i))
     },
     
       sommeTotalMatScience18(){
        return this.convertirSommeMatScience18.reduce(function(a, b){
        return (a + b);
        }, 0);
    },

     MoyenneMatScience18(){
        if(isNaN(this.sommeTotalMatScience18/this.MatScienceTaille18)){
         return 0
       }
       return this.sommeTotalMatScience18/this.MatScienceTaille18
     },
      MoyenneCoefficientSC18(){
       return this.CoefficientMatScience18*this.MoyenneMatScience18
     },
      // Fin Calcul de moyenne matiere_id = 18

     // Debut Calcul de moyenne matiere_id = 8
      MatScience19(){
       let collect =[]
        this.MatiereScientifique.forEach(element => {
         if(element.matiere_id == 19){
           collect.push(element.note)
         }
       });
    
       return collect;
     },
    MatScienceTaille19(){
       let collect =[]
        this.MatiereScientifique.forEach(element => {
         if(element.matiere_id == 19){
           collect.push(element.note)
         }
       });
    
       return collect.length;
     },
        CoefficientMatScience19(){
        let objet = this.MatiereScience.find(tem=>tem.id == 19)
        if(objet) {
          return objet.coefficient
        }
       return 0;
     },

      //convertir le tableau string en int de la somme payée par eleve
     convertirSommeMatScience19(){
         return this.MatScience19.map((i) => Number(i))
     },
     
       sommeTotalMatScience19(){
        return this.convertirSommeMatScience19.reduce(function(a, b){
        return (a + b);
        }, 0);
    },

     MoyenneMatScience19(){
        if(isNaN(this.sommeTotalMatScience19/this.MatScienceTaille19)){
         return 0
       }
       return this.sommeTotalMatScience19/this.MatScienceTaille19
     },
      MoyenneCoefficientSC19(){
       return this.CoefficientMatScience19*this.MoyenneMatScience19
     },
      // Fin Calcul de moyenne matiere_id = 19

     // Debut Calcul de moyenne matiere_id = 20
      MatScience20(){
       let collect =[]
        this.MatiereScientifique.forEach(element => {
         if(element.matiere_id == 20){
           collect.push(element.note)
         }
       });
    
       return collect;
     },
    MatScienceTaille20(){
       let collect =[]
        this.MatiereScientifique.forEach(element => {
         if(element.matiere_id == 20){
           collect.push(element.note)
         }
       });
    
       return collect.length;
     },
        CoefficientMatScience20(){
        let objet = this.MatiereScience.find(tem=>tem.id == 20)
        if(objet) {
          return objet.coefficient
        }
       return 0;
     },

      //convertir le tableau string en int de la somme payée par eleve
     convertirSommeMatScience20(){
         return this.MatScience20.map((i) => Number(i))
     },
     
       sommeTotalMatScience20(){
        return this.convertirSommeMatScience20.reduce(function(a, b){
        return (a + b);
        }, 0);
    },

     MoyenneMatScience20(){
        if(isNaN(this.sommeTotalMatScience20/this.MatScienceTaille20)){
         return 0
       }
       return this.sommeTotalMatScience20/this.MatScienceTaille20
     },
      MoyenneCoefficientSC20(){
       return this.CoefficientMatScience20*this.MoyenneMatScience20
     },
      // Fin Calcul de moyenne matiere_id = 20


     // Debut Calcul de moyenne matiere_id = 21
      MatScience21(){
       let collect =[]
        this.MatiereScientifique.forEach(element => {
         if(element.matiere_id == 21){
           collect.push(element.note)
         }
       });
    
       return collect;
     },
    MatScienceTaille21(){
       let collect =[]
        this.MatiereScientifique.forEach(element => {
         if(element.matiere_id == 21){
           collect.push(element.note)
         }
       });
    
       return collect.length;
     },
        CoefficientMatScience21(){
        let objet = this.MatiereScience.find(tem=>tem.id == 21)
        if(objet) {
          return objet.coefficient
        }
       return 0;
     },

      //convertir le tableau string en int de la somme payée par eleve
     convertirSommeMatScience21(){
         return this.MatScience21.map((i) => Number(i))
     },
     
       sommeTotalMatScience21(){
        return this.convertirSommeMatScience21.reduce(function(a, b){
        return (a + b);
        }, 0);
    },

     MoyenneMatScience21(){
        if(isNaN(this.sommeTotalMatScience21/this.MatScienceTaille21)){
         return 0
       }
       return this.sommeTotalMatScience21/this.MatScienceTaille21
     },
      MoyenneCoefficientSC21(){
       return this.CoefficientMatScience21*this.MoyenneMatScience21
     },
      // Fin Calcul de moyenne matiere_id = 21

     // Debut Calcul de moyenne matiere_id = 22
      MatScience22(){
       let collect =[]
        this.MatiereScientifique.forEach(element => {
         if(element.matiere_id == 22){
           collect.push(element.note)
         }
       });
       return collect;
     },
    MatScienceTaille22(){
       let collect =[]
        this.MatiereScientifique.forEach(element => {
         if(element.matiere_id == 22){
           collect.push(element.note)
         }
       });
       return collect.length;
     },
        CoefficientMatScience22(){
        let objet = this.MatiereScience.find(tem=>tem.id == 22)
        if(objet) {
          return objet.coefficient
        }
       return 0;
     },

      //convertir le tableau string en int de la somme payée par eleve
     convertirSommeMatScience22(){
         return this.MatScience22.map((i) => Number(i))
     },
     
       sommeTotalMatScience22(){
        return this.convertirSommeMatScience22.reduce(function(a, b){
        return (a + b);
        }, 0);
    },

     MoyenneMatScience22(){
        if(isNaN(this.sommeTotalMatScience22/this.MatScienceTaille22)){
         return 0
       }
       return this.sommeTotalMatScience22/this.MatScienceTaille22
     },
      MoyenneCoefficientSC22(){
       return this.CoefficientMatScience22*this.MoyenneMatScience22
     },
      // Fin Calcul de moyenne matiere_id = 22



   MatiereScientifique(){
     if(this.formData.trimestre_id != ""){
       let collect =[]
       this.MatiereScience.filter(item =>{
         this.GetterNote.forEach(element => {        
           if(item.id == element.matiere_id && element.trimestre_id == this.formData.trimestre_id && element.student_id == this.editText.id){
             collect.push(element)
           }
         })
       })
       return collect;
     }
     return []
     },
  


// Debut Calcul de moyenne matiere_id = 1
      MatAutre1(){
       let collect =[]
        this.AutreMatiere.forEach(element => {
         if(element.matiere_id == 1){
           collect.push(element.note)
         }
       });
       return collect;
     },
    MatAutreTaille1(){
       let collect =[]
        this.AutreMatiere.forEach(element => {
         if(element.matiere_id == 1){
           collect.push(element.note)
         }
       });
       return collect.length;
     },
     CoefficientMatAutre1(){
        let objet = this.MatiereAutre.find(tem=>tem.id == 1)
        if(objet) {
          return objet.coefficient
        }
       return 0;
     },
      //convertir le tableau string en int de la somme payée par eleve
     convertirSommeMatAutre1(){
         return this.MatAutre1.map((i) => Number(i))
     },
     
       sommeTotalMatAutre1(){
        return this.convertirSommeMatAutre1.reduce(function(a, b){
        return (a + b);
        }, 0);
    },

     MoyenneMatAutre1(){
        if(isNaN(this.sommeTotalMatAutre1/this.MatAutreTaille1)){
         return 0
       }
       return this.sommeTotalMatAutre1/this.MatAutreTaille1
     },
     MoyenneCoefficientAut1(){
       return this.CoefficientMatAutre1*this.MoyenneMatAutre1
     },
      // Fin Calcul de moyenne matiere_id = 1
// Debut Calcul de moyenne matiere_id = 2
      MatAutre2(){
       let collect =[]
        this.AutreMatiere.forEach(element => {
         if(element.matiere_id == 2){
           collect.push(element.note)
         }
       });
       return collect;
     },
    MatAutreTaille2(){
       let collect =[]
        this.AutreMatiere.forEach(element => {
         if(element.matiere_id == 2){
           collect.push(element.note)
         }
       });
       return collect.length;
     },
       CoefficientMatAutre2(){
        let objet = this.MatiereAutre.find(tem=>tem.id == 2)
        if(objet) {
          return objet.coefficient
        }
       return 0;
     },

      //convertir le tableau string en int de la somme payée par eleve
     convertirSommeMatAutre2(){
         return this.MatAutre2.map((i) => Number(i))
     },
     
       sommeTotalMatAutre2(){
        return this.convertirSommeMatAutre2.reduce(function(a, b){
        return (a + b);
        }, 0);
    },

     MoyenneMatAutre2(){
        if(isNaN(this.sommeTotalMatAutre2/this.MatAutreTaille2)){
         return 0
       }
       return this.sommeTotalMatAutre2/this.MatAutreTaille2
     },
      MoyenneCoefficientAut2(){
       return this.CoefficientMatAutre2*this.MoyenneMatAutre2
     },
      // Fin Calcul de moyenne matiere_id = 2
// Debut Calcul de moyenne matiere_id = 3
      MatAutre3(){
       let collect =[]
        this.AutreMatiere.forEach(element => {
         if(element.matiere_id == 3){
           collect.push(element.note)
         }
       });
       return collect;
     },
    MatAutreTaille3(){
       let collect =[]
        this.AutreMatiere.forEach(element => {
         if(element.matiere_id == 3){
           collect.push(element.note)
         }
       });
       return collect.length;
     },
          CoefficientMatAutre3(){
        let objet = this.MatiereAutre.find(tem=>tem.id == 3)
        if(objet) {
          return objet.coefficient
        }
       return 0;
     },

      //convertir le tableau string en int de la somme payée par eleve
     convertirSommeMatAutre3(){
         return this.MatAutre3.map((i) => Number(i))
     },
     
       sommeTotalMatAutre3(){
        return this.convertirSommeMatAutre3.reduce(function(a, b){
        return (a + b);
        }, 0);
    },

     MoyenneMatAutre3(){
        if(isNaN(this.sommeTotalMatAutre3/this.MatAutreTaille3)){
         return 0
       }
       return this.sommeTotalMatAutre3/this.MatAutreTaille3
     },
      MoyenneCoefficientAut3(){
       return this.CoefficientMatAutre3*this.MoyenneMatAutre3
     },
      // Fin Calcul de moyenne matiere_id = 3

// Debut Calcul de moyenne matiere_id = 4
      MatAutre4(){
       let collect =[]
        this.AutreMatiere.forEach(element => {
         if(element.matiere_id == 4){
           collect.push(element.note)
         }
       });
       return collect;
     },
    MatAutreTaille4(){
       let collect =[]
        this.AutreMatiere.forEach(element => {
         if(element.matiere_id == 4){
           collect.push(element.note)
         }
       });
       return collect.length;
     },
       CoefficientMatAutre4(){
        let objet = this.MatiereAutre.find(tem=>tem.id == 4)
        if(objet) {
          return objet.coefficient
        }
       return 0;
     },

      //convertir le tableau string en int de la somme payée par eleve
     convertirSommeMatAutre4(){
         return this.MatAutre4.map((i) => Number(i))
     },
     
       sommeTotalMatAutre4(){
        return this.convertirSommeMatAutre4.reduce(function(a, b){
        return (a + b);
        }, 0);
    },

     MoyenneMatAutre4(){
        if(isNaN(this.sommeTotalMatAutre4/this.MatAutreTaille4)){
         return 0
       }
       return this.sommeTotalMatAutre4/this.MatAutreTaille4
     },
      MoyenneCoefficientAut4(){
       return this.CoefficientMatAutre4*this.MoyenneMatAutre4
     },
      // Fin Calcul de moyenne matiere_id = 4

// Debut Calcul de moyenne matiere_id = 5
      MatAutre5(){
       let collect =[]
        this.AutreMatiere.forEach(element => {
         if(element.matiere_id == 5){
           collect.push(element.note)
         }
       });
       return collect;
     },
    MatAutreTaille5(){
       let collect =[]
        this.AutreMatiere.forEach(element => {
         if(element.matiere_id == 5){
           collect.push(element.note)
         }
       });
       return collect.length;
     },
     CoefficientMatAutre5(){
        let objet = this.MatiereAutre.find(tem=>tem.id == 5)
        if(objet) {
          return objet.coefficient
        }
       return 0;
     },
      //convertir le tableau string en int de la somme payée par eleve
     convertirSommeMatAutre5(){
         return this.MatAutre5.map((i) => Number(i))
     },
     
       sommeTotalMatAutre5(){
        return this.convertirSommeMatAutre5.reduce(function(a, b){
        return (a + b);
        }, 0);
    },

     MoyenneMatAutre5(){
        if(isNaN(this.sommeTotalMatAutre5/this.MatAutreTaille5)){
         return 0
       }
       return this.sommeTotalMatAutre5/this.MatAutreTaille5
     },
      MoyenneCoefficientAut5(){
       return this.CoefficientMatAutre5*this.MoyenneMatAutre5
     },
      // Fin Calcul de moyenne matiere_id = 5

// Debut Calcul de moyenne matiere_id = 6
      MatAutre6(){
       let collect =[]
        this.AutreMatiere.forEach(element => {
         if(element.matiere_id == 6){
           collect.push(element.note)
         }
       });
       return collect;
     },
    MatAutreTaille6(){
       let collect =[]
        this.AutreMatiere.forEach(element => {
         if(element.matiere_id == 6){
           collect.push(element.note)
         }
       });
       return collect.length;
     },
     CoefficientMatAutre6(){
        let objet = this.MatiereAutre.find(tem=>tem.id == 6)
        if(objet) {
          return objet.coefficient
        }
       return 0;
     },
      //convertir le tableau string en int de la somme payée par eleve
     convertirSommeMatAutre6(){
         return this.MatAutre6.map((i) => Number(i))
     },
     
       sommeTotalMatAutre6(){
        return this.convertirSommeMatAutre6.reduce(function(a, b){
        return (a + b);
        }, 0);
    },

     MoyenneMatAutre6(){
        if(isNaN(this.sommeTotalMatAutre6/this.MatAutreTaille6)){
         return 0
       }
       return this.sommeTotalMatAutre6/this.MatAutreTaille6
     },
      MoyenneCoefficientAut6(){
       return this.CoefficientMatAutre6*this.MoyenneMatAutre6
     },
      // Fin Calcul de moyenne matiere_id = 6

// Debut Calcul de moyenne matiere_id = 7
      MatAutre7(){
       let collect =[]
        this.AutreMatiere.forEach(element => {
         if(element.matiere_id == 7){
           collect.push(element.note)
         }
       });
       return collect;
     },
    MatAutreTaille7(){
       let collect =[]
        this.AutreMatiere.forEach(element => {
         if(element.matiere_id == 7){
           collect.push(element.note)
         }
       });
       return collect.length;
     },
     CoefficientMatAutre7(){
        let objet = this.MatiereAutre.find(tem=>tem.id == 7)
        if(objet) {
          return objet.coefficient
        }
       return 0;
     },
      //convertir le tableau string en int de la somme payée par eleve
     convertirSommeMatAutre7(){
         return this.MatAutre7.map((i) => Number(i))
     },
     
       sommeTotalMatAutre7(){
        return this.convertirSommeMatAutre7.reduce(function(a, b){
        return (a + b);
        }, 0);
    },

     MoyenneMatAutre7(){
        if(isNaN(this.sommeTotalMatAutre7/this.MatAutreTaille7)){
         return 0
       }
       return this.sommeTotalMatAutre7/this.MatAutreTaille7
     },
      MoyenneCoefficientAut7(){
       return this.CoefficientMatAutre7*this.MoyenneMatAutre7
     },
      // Fin Calcul de moyenne matiere_id = 7

// Debut Calcul de moyenne matiere_id = 8
      MatAutre8(){
       let collect =[]
        this.AutreMatiere.forEach(element => {
         if(element.matiere_id == 8){
           collect.push(element.note)
         }
       });
       return collect;
     },
    MatAutreTaille8(){
       let collect =[]
        this.AutreMatiere.forEach(element => {
         if(element.matiere_id == 8){
           collect.push(element.note)
         }
       });
       return collect.length;
     },
     CoefficientMatAutre8(){
        let objet = this.MatiereAutre.find(tem=>tem.id == 8)
        if(objet) {
          return objet.coefficient
        }
       return 0;
     },
      //convertir le tableau string en int de la somme payée par eleve
     convertirSommeMatAutre8(){
         return this.MatAutre8.map((i) => Number(i))
     },
     
       sommeTotalMatAutre8(){
        return this.convertirSommeMatAutre8.reduce(function(a, b){
        return (a + b);
        }, 0);
    },

     MoyenneMatAutre8(){
        if(isNaN(this.sommeTotalMatAutre8/this.MatAutreTaille8)){
         return 0
       }
       return this.sommeTotalMatAutre8/this.MatAutreTaille8
     },
      MoyenneCoefficientAut8(){
       return this.CoefficientMatAutre8*this.MoyenneMatAutre8
     },
      // Fin Calcul de moyenne matiere_id = 8

// Debut Calcul de moyenne matiere_id = 9
      MatAutre9(){
       let collect =[]
        this.AutreMatiere.forEach(element => {
         if(element.matiere_id == 9){
           collect.push(element.note)
         }
       });
       return collect;
     },
    MatAutreTaille9(){
       let collect =[]
        this.AutreMatiere.forEach(element => {
         if(element.matiere_id == 9){
           collect.push(element.note)
         }
       });
       return collect.length;
     },
     CoefficientMatAutre9(){
        let objet = this.MatiereAutre.find(tem=>tem.id == 9)
        if(objet) {
          return objet.coefficient
        }
       return 0;
     },
      //convertir le tableau string en int de la somme payée par eleve
     convertirSommeMatAutre9(){
         return this.MatAutre9.map((i) => Number(i))
     },
     
       sommeTotalMatAutre9(){
        return this.convertirSommeMatAutre9.reduce(function(a, b){
        return (a + b);
        }, 0);
    },

     MoyenneMatAutre9(){
        if(isNaN(this.sommeTotalMatAutre9/this.MatAutreTaille9)){
         return 0
       }
       return this.sommeTotalMatAutre9/this.MatAutreTaille9
     },
      MoyenneCoefficientAut9(){
       return this.CoefficientMatAutre9*this.MoyenneMatAutre9
     },
      // Fin Calcul de moyenne matiere_id = 9

// Debut Calcul de moyenne matiere_id = 10
      MatAutre10(){
       let collect =[]
        this.AutreMatiere.forEach(element => {
         if(element.matiere_id == 10){
           collect.push(element.note)
         }
       });
       return collect;
     },
    MatAutreTaille10(){
       let collect =[]
        this.AutreMatiere.forEach(element => {
         if(element.matiere_id == 10){
           collect.push(element.note)
         }
       });
       return collect.length;
     },
     CoefficientMatAutre10(){
        let objet = this.MatiereAutre.find(tem=>tem.id == 10)
        if(objet) {
          return objet.coefficient
        }
       return 0;
     },
      //convertir le tableau string en int de la somme payée par eleve
     convertirSommeMatAutre10(){
         return this.MatAutre10.map((i) => Number(i))
     },
     
       sommeTotalMatAutre10(){
        return this.convertirSommeMatAutre10.reduce(function(a, b){
        return (a + b);
        }, 0);
    },

     MoyenneMatAutre10(){
        if(isNaN(this.sommeTotalMatAutre10/this.MatAutreTaille10)){
         return 0
       }
       return this.sommeTotalMatAutre10/this.MatAutreTaille10
     },
      MoyenneCoefficientAut10(){
       return this.CoefficientMatAutre10*this.MoyenneMatAutre10
     },
      // Fin Calcul de moyenne matiere_id = 10

// Debut Calcul de moyenne matiere_id = 11
      MatAutre11(){
       let collect =[]
        this.AutreMatiere.forEach(element => {
         if(element.matiere_id == 11){
           collect.push(element.note)
         }
       });
       return collect;
     },
    MatAutreTaille11(){
       let collect =[]
        this.AutreMatiere.forEach(element => {
         if(element.matiere_id == 11){
           collect.push(element.note)
         }
       });
       return collect.length;
     },
     CoefficientMatAutre11(){
        let objet = this.MatiereAutre.find(tem=>tem.id == 11)
        if(objet) {
          return objet.coefficient
        }
       return 0;
     },
      //convertir le tableau string en int de la somme payée par eleve
     convertirSommeMatAutre11(){
         return this.MatAutre11.map((i) => Number(i))
     },
     
       sommeTotalMatAutre11(){
        return this.convertirSommeMatAutre11.reduce(function(a, b){
        return (a + b);
        }, 0);
    },

     MoyenneMatAutre11(){
        if(isNaN(this.sommeTotalMatAutre11/this.MatAutreTaille11)){
         return 0
       }
       return this.sommeTotalMatAutre11/this.MatAutreTaille11
     },
      MoyenneCoefficientAut11(){
       return this.CoefficientMatAutre11*this.MoyenneMatAutre11
     },
      // Fin Calcul de moyenne matiere_id = 11

// Debut Calcul de moyenne matiere_id = 12
      MatAutre12(){
       let collect =[]
        this.AutreMatiere.forEach(element => {
         if(element.matiere_id == 12){
           collect.push(element.note)
         }
       });
       return collect;
     },
    MatAutreTaille12(){
       let collect =[]
        this.AutreMatiere.forEach(element => {
         if(element.matiere_id == 12){
           collect.push(element.note)
         }
       });
       return collect.length;
     },
     CoefficientMatAutre12(){
        let objet = this.MatiereAutre.find(tem=>tem.id == 12)
        if(objet) {
          return objet.coefficient
        }
       return 0;
     },
      //convertir le tableau string en int de la somme payée par eleve
     convertirSommeMatAutre12(){
         return this.MatAutre12.map((i) => Number(i))
     },
     
       sommeTotalMatAutre12(){
        return this.convertirSommeMatAutre12.reduce(function(a, b){
        return (a + b);
        }, 0);
    },

     MoyenneMatAutre12(){
        if(isNaN(this.sommeTotalMatAutre12/this.MatAutreTaille12)){
         return 0
       }
       return this.sommeTotalMatAutre12/this.MatAutreTaille12
     },
      MoyenneCoefficientAut12(){
       return this.CoefficientMatAutre12*this.MoyenneMatAutre12
     },
      // Fin Calcul de moyenne matiere_id = 12

// Debut Calcul de moyenne matiere_id = 13
      MatAutre13(){
       let collect =[]
        this.AutreMatiere.forEach(element => {
         if(element.matiere_id == 13){
           collect.push(element.note)
         }
       });
       return collect;
     },
    MatAutreTaille13(){
       let collect =[]
        this.AutreMatiere.forEach(element => {
         if(element.matiere_id == 13){
           collect.push(element.note)
         }
       });
       return collect.length;
     },
     CoefficientMatAutre13(){
        let objet = this.MatiereAutre.find(tem=>tem.id == 13)
        if(objet) {
          return objet.coefficient
        }
       return 0;
     },
      //convertir le tableau string en int de la somme payée par eleve
     convertirSommeMatAutre13(){
         return this.MatAutre13.map((i) => Number(i))
     },
     
       sommeTotalMatAutre13(){
        return this.convertirSommeMatAutre13.reduce(function(a, b){
        return (a + b);
        }, 0);
    },

     MoyenneMatAutre13(){
        if(isNaN(this.sommeTotalMatAutre13/this.MatAutreTaille13)){
         return 0
       }
       return this.sommeTotalMatAutre13/this.MatAutreTaille13
     },
      MoyenneCoefficientAut13(){
       return this.CoefficientMatAutre13*this.MoyenneMatAutre13
     },
      // Fin Calcul de moyenne matiere_id = 13

// Debut Calcul de moyenne matiere_id = 14
      MatAutre14(){
       let collect =[]
        this.AutreMatiere.forEach(element => {
         if(element.matiere_id == 14){
           collect.push(element.note)
         }
       });
       return collect;
     },
    MatAutreTaille14(){
       let collect =[]
        this.AutreMatiere.forEach(element => {
         if(element.matiere_id == 14){
           collect.push(element.note)
         }
       });
       return collect.length;
     },
         CoefficientMatAutre14(){
        let objet = this.MatiereAutre.find(tem=>tem.id == 14)
        if(objet) {
          return objet.coefficient
        }
       return 0;
     },

      //convertir le tableau string en int de la somme payée par eleve
     convertirSommeMatAutre14(){
         return this.MatAutre14.map((i) => Number(i))
     },
     
       sommeTotalMatAutre14(){
        return this.convertirSommeMatAutre14.reduce(function(a, b){
        return (a + b);
        }, 0);
    },

     MoyenneMatAutre14(){
        if(isNaN(this.sommeTotalMatAutre14/this.MatAutreTaille14)){
         return 0
       }
       return this.sommeTotalMatAutre14/this.MatAutreTaille14
     },
      MoyenneCoefficientAut14(){
       return this.CoefficientMatAutre14*this.MoyenneMatAutre14
     },
      // Fin Calcul de moyenne matiere_id = 14

// Debut Calcul de moyenne matiere_id = 15
      MatAutre15(){
       let collect =[]
        this.AutreMatiere.forEach(element => {
         if(element.matiere_id == 15){
           collect.push(element.note)
         }
       });
       return collect;
     },
    MatAutreTaille15(){
       let collect =[]
        this.AutreMatiere.forEach(element => {
         if(element.matiere_id == 15){
           collect.push(element.note)
         }
       });
       return collect.length;
     },
       CoefficientMatAutre15(){
        let objet = this.MatiereAutre.find(tem=>tem.id == 15)
        if(objet) {
          return objet.coefficient
        }
       return 0;
     },

      //convertir le tableau string en int de la somme payée par eleve
     convertirSommeMatAutre15(){
         return this.MatAutre15.map((i) => Number(i))
     },
     
       sommeTotalMatAutre15(){
        return this.convertirSommeMatAutre15.reduce(function(a, b){
        return (a + b);
        }, 0);
    },

     MoyenneMatAutre15(){
        if(isNaN(this.sommeTotalMatAutre15/this.MatAutreTaille15)){
         return 0
       }
       return this.sommeTotalMatAutre15/this.MatAutreTaille15
     },
      MoyenneCoefficientAut15(){
       return this.CoefficientMatAutre15*this.MoyenneMatAutre15
     },
      // Fin Calcul de moyenne matiere_id = 15
// Debut Calcul de moyenne matiere_id = 16
      MatAutre16(){
       let collect =[]
        this.AutreMatiere.forEach(element => {
         if(element.matiere_id == 16){
           collect.push(element.note)
         }
       });
       return collect;
     },
    MatAutreTaille16(){
       let collect =[]
        this.AutreMatiere.forEach(element => {
         if(element.matiere_id == 16){
           collect.push(element.note)
         }
       });
       return collect.length;
     },
      CoefficientMatAutre16(){
        let objet = this.MatiereAutre.find(tem=>tem.id == 16)
        if(objet) {
          return objet.coefficient
        }
       return 0;
     },
      //convertir le tableau string en int de la somme payée par eleve
     convertirSommeMatAutre16(){
         return this.MatAutre16.map((i) => Number(i))
     },
     
       sommeTotalMatAutre16(){
        return this.convertirSommeMatAutre16.reduce(function(a, b){
        return (a + b);
        }, 0);
    },

     MoyenneMatAutre16(){
        if(isNaN(this.sommeTotalMatAutre16/this.MatAutreTaille16)){
         return 0
       }
       return this.sommeTotalMatAutre16/this.MatAutreTaille16
     },
      MoyenneCoefficientAut16(){
       return this.CoefficientMatAutre16*this.MoyenneMatAutre16
     },
      // Fin Calcul de moyenne matiere_id = 16

// Debut Calcul de moyenne matiere_id = 16
      MatAutre17(){
       let collect =[]
        this.AutreMatiere.forEach(element => {
         if(element.matiere_id == 17){
           collect.push(element.note)
         }
       });
       return collect;
     },
    MatAutreTaille17(){
       let collect =[]
        this.AutreMatiere.forEach(element => {
         if(element.matiere_id == 17){
           collect.push(element.note)
         }
       });
       return collect.length;
     },
      CoefficientMatAutre17(){
        let objet = this.MatiereAutre.find(tem=>tem.id == 17)
        if(objet) {
          return objet.coefficient
        }
       return 0;
     },
      //convertir le tableau string en int de la somme payée par eleve
     convertirSommeMatAutre17(){
         return this.MatAutre17.map((i) => Number(i))
     },
     
       sommeTotalMatAutre17(){
        return this.convertirSommeMatAutre17.reduce(function(a, b){
        return (a + b);
        }, 0);
    },

     MoyenneMatAutre17(){
        if(isNaN(this.sommeTotalMatAutre17/this.MatAutreTaille17)){
         return 0
       }
       return this.sommeTotalMatAutre17/this.MatAutreTaille17
     },
      MoyenneCoefficientAut17(){
       return this.CoefficientMatAutre17*this.MoyenneMatAutre17
     },
      // Fin Calcul de moyenne matiere_id = 16

// Debut Calcul de moyenne matiere_id = 18
      MatAutre18(){
       let collect =[]
        this.AutreMatiere.forEach(element => {
         if(element.matiere_id == 18){
           collect.push(element.note)
         }
       });
       return collect;
     },
    MatAutreTaille18(){
       let collect =[]
        this.AutreMatiere.forEach(element => {
         if(element.matiere_id == 18){
           collect.push(element.note)
         }
       });
       return collect.length;
     },
          CoefficientMatAutre18(){
        let objet = this.MatiereAutre.find(tem=>tem.id == 18)
        if(objet) {
          return objet.coefficient
        }
       return 0;
     },

      //convertir le tableau string en int de la somme payée par eleve
     convertirSommeMatAutre18(){
         return this.MatAutre18.map((i) => Number(i))
     },
     
       sommeTotalMatAutre18(){
        return this.convertirSommeMatAutre18.reduce(function(a, b){
        return (a + b);
        }, 0);
    },

     MoyenneMatAutre18(){
        if(isNaN(this.sommeTotalMatAutre18/this.MatAutreTaille18)){
         return 0
       }
       return this.sommeTotalMatAutre18/this.MatAutreTaille18
     },
      MoyenneCoefficientAut18(){
       return this.CoefficientMatAutre18*this.MoyenneMatAutre18
     },
      // Fin Calcul de moyenne matiere_id = 18

// Debut Calcul de moyenne matiere_id = 19
      MatAutre19(){
       let collect =[]
        this.AutreMatiere.forEach(element => {
         if(element.matiere_id == 19){
           collect.push(element.note)
         }
       });
       return collect;
     },
    MatAutreTaille19(){
       let collect =[]
        this.AutreMatiere.forEach(element => {
         if(element.matiere_id == 19){
           collect.push(element.note)
         }
       });
       return collect.length;
     },
         CoefficientMatAutre19(){
        let objet = this.MatiereAutre.find(tem=>tem.id == 19)
        if(objet) {
          return objet.coefficient
        }
       return 0;
     },
      //convertir le tableau string en int de la somme payée par eleve
     convertirSommeMatAutre19(){
         return this.MatAutre19.map((i) => Number(i))
     },
     
       sommeTotalMatAutre19(){
        return this.convertirSommeMatAutre19.reduce(function(a, b){
        return (a + b);
        }, 0);
    },

     MoyenneMatAutre19(){
        if(isNaN(this.sommeTotalMatAutre19/this.MatAutreTaille19)){
         return 0
       }
       return this.sommeTotalMatAutre19/this.MatAutreTaille19
     },
      MoyenneCoefficientAut19(){
       return this.CoefficientMatAutre19*this.MoyenneMatAutre19
     },
      // Fin Calcul de moyenne matiere_id = 19

// Debut Calcul de moyenne matiere_id = 20
      MatAutre20(){
       let collect =[]
        this.AutreMatiere.forEach(element => {
         if(element.matiere_id == 20){
           collect.push(element.note)
         }
       });
       return collect;
     },
    MatAutreTaille20(){
       let collect =[]
        this.AutreMatiere.forEach(element => {
         if(element.matiere_id == 20){
           collect.push(element.note)
         }
       });
       return collect.length;
     },
      CoefficientMatAutre20(){
        let objet = this.MatiereAutre.find(tem=>tem.id == 20)
        if(objet) {
          return objet.coefficient
        }
       return 0;
     },
      //convertir le tableau string en int de la somme payée par eleve
     convertirSommeMatAutre20(){
         return this.MatAutre20.map((i) => Number(i))
     },
     
       sommeTotalMatAutre20(){
        return this.convertirSommeMatAutre20.reduce(function(a, b){
        return (a + b);
        }, 0);
    },

     MoyenneMatAutre20(){
        if(isNaN(this.sommeTotalMatAutre20/this.MatAutreTaille20)){
         return 0
       }
       return this.sommeTotalMatAutre20/this.MatAutreTaille20
     },
      MoyenneCoefficientAut20(){
       return this.CoefficientMatAutre20*this.MoyenneMatAutre20
     },
      // Fin Calcul de moyenne matiere_id = 20

// Debut Calcul de moyenne matiere_id = 21
      MatAutre21(){
       let collect =[]
        this.AutreMatiere.forEach(element => {
         if(element.matiere_id == 21){
           collect.push(element.note)
         }
       });
       return collect;
     },
    MatAutreTaille21(){
       let collect =[]
        this.AutreMatiere.forEach(element => {
         if(element.matiere_id == 21){
           collect.push(element.note)
         }
       });
       return collect.length;
     },
       CoefficientMatAutre21(){
        let objet = this.MatiereAutre.find(tem=>tem.id == 21)
        if(objet) {
          return objet.coefficient
        }
       return 0;
     },
      //convertir le tableau string en int de la somme payée par eleve
     convertirSommeMatAutre21(){
         return this.MatAutre21.map((i) => Number(i))
     },
     
       sommeTotalMatAutre21(){
        return this.convertirSommeMatAutre21.reduce(function(a, b){
        return (a + b);
        }, 0);
    },

     MoyenneMatAutre21(){
        if(isNaN(this.sommeTotalMatAutre21/this.MatAutreTaille21)){
         return 0
       }
       return this.sommeTotalMatAutre21/this.MatAutreTaille21
     },
      MoyenneCoefficientAut21(){
       return this.CoefficientMatAutre21*this.MoyenneMatAutre21
     },
      // Fin Calcul de moyenne matiere_id = 21

// Debut Calcul de moyenne matiere_id = 22
      MatAutre22(){
       let collect =[]
        this.AutreMatiere.forEach(element => {
         if(element.matiere_id == 22){
           collect.push(element.note)
         }
       });
       return collect;
     },
    MatAutreTaille22(){
       let collect =[]
        this.AutreMatiere.forEach(element => {
         if(element.matiere_id == 22){
           collect.push(element.note)
         }
       });
       return collect.length;
     },
         CoefficientMatAutre22(){
        let objet = this.MatiereAutre.find(tem=>tem.id == 22)
        if(objet) {
          return objet.coefficient
        }
       return 0;
     },
     
      //convertir le tableau string en int de la somme payée par eleve
     convertirSommeMatAutre22(){
         return this.MatAutre22.map((i) => Number(i))
     },
     
       sommeTotalMatAutre22(){
        return this.convertirSommeMatAutre22.reduce(function(a, b){
        return (a + b);
        }, 0);
    },

     MoyenneMatAutre22(){
        if(isNaN(this.sommeTotalMatAutre22/this.MatAutreTaille22)){
         return 0
       }
       return this.sommeTotalMatAutre22/this.MatAutreTaille22
     },
      MoyenneCoefficientAut22(){
       return this.CoefficientMatAutre22*this.MoyenneMatAutre22
     },
      // Fin Calcul de moyenne matiere_id = 22
// Debut Calcul de moyenne matiere_id = 23
      MatAutre23(){
       let collect =[]
        this.AutreMatiere.forEach(element => {
         if(element.matiere_id == 23){
           collect.push(element.note)
         }
       });
       return collect;
     },
    MatAutreTaille23(){
       let collect =[]
        this.AutreMatiere.forEach(element => {
         if(element.matiere_id == 23){
           collect.push(element.note)
         }
       });
       return collect.length;
     },
      CoefficientMatAutre23(){
        let objet = this.MatiereAutre.find(tem=>tem.id == 23)
        if(objet) {
          return objet.coefficient
        }
       return 0;
     },
      //convertir le tableau string en int de la somme payée par eleve
     convertirSommeMatAutre23(){
         return this.MatAutre23.map((i) => Number(i))
     },
     
       sommeTotalMatAutre23(){
        return this.convertirSommeMatAutre23.reduce(function(a, b){
        return (a + b);
        }, 0);
    },

     MoyenneMatAutre23(){
        if(isNaN(this.sommeTotalMatAutre23/this.MatAutreTaille23)){
         return 0
       }
       return this.sommeTotalMatAutre23/this.MatAutreTaille23
     },
      MoyenneCoefficientAut23(){
       return this.CoefficientMatAutre23*this.MoyenneMatAutre23
     },
      // Fin Calcul de moyenne matiere_id = 23

// Debut Calcul de moyenne matiere_id = 24
      MatAutre24(){
       let collect =[]
        this.AutreMatiere.forEach(element => {
         if(element.matiere_id == 24){
           collect.push(element.note)
         }
       });
       return collect;
     },
    MatAutreTaille24(){
       let collect =[]
        this.AutreMatiere.forEach(element => {
         if(element.matiere_id == 24){
           collect.push(element.note)
         }
       });
       return collect.length;
     },
        CoefficientMatAutre24(){
        let objet = this.MatiereAutre.find(tem=>tem.id == 24)
        if(objet) {
          return objet.coefficient
        }
       return 0;
     },

      //convertir le tableau string en int de la somme payée par eleve
     convertirSommeMatAutre24(){
         return this.MatAutre24.map((i) => Number(i))
     },
     
       sommeTotalMatAutre24(){
        return this.convertirSommeMatAutre24.reduce(function(a, b){
        return (a + b);
        }, 0);
    },

     MoyenneMatAutre24(){
        if(isNaN(this.sommeTotalMatAutre24/this.MatAutreTaille24)){
         return 0
       }
       return this.sommeTotalMatAutre24/this.MatAutreTaille24
     },
      MoyenneCoefficientAut24(){
       return this.CoefficientMatAutre24*this.MoyenneMatAutre24
     },
      // Fin Calcul de moyenne matiere_id = 24



   AutreMatiere(){
     if(this.formData.trimestre_id != ""){
       let collect =[]
       this.MatiereAutre.filter(item =>{
         this.GetterNote.forEach(element => {        
           if(item.id == element.matiere_id && element.trimestre_id == this.formData.trimestre_id && element.student_id == this.editText.id){
             collect.push(element)
           }
         })
       })
       return collect;
     }
     return []
     },

     TaillePArMatiere(){
       return (id1)=>{
         if(this.formData.trimestre_id != "" && this.formData.trimestre_id !=null && id1 !="" && id1!=null){
        let objet = this.GetterNote.filter(tem =>tem.student_id == this.editText.id && 
        tem.trimestre_id == this.formData.trimestre_id && tem.matiere_id == id1);   
        let array_exercie = [];
        if (objet.length > 0) {
          objet.forEach(function (val) {
            array_exercie.push(val.note);
          });
          let unique = array_exercie;
          console.log(unique);         
         if (unique.length == 0) {return [];}
         return unique.map(Number).length;
        } 
        return 0;
         }
         return 0      
       }
     },
 
  
MoyenneTotalEtCoeffecientTotal(){
  return this.MoyenneTotal*this.CoeffecientTotal
},

MoyenneTotal(){
  return Math.round(this.MoyenneTotalScientifique+this.MoyenneTotalLiterraire+this.MoyenneTotalAutre)
},
CoeffecientTotal(){
  return this.CoeffTotalLitteraire+this.CoeffTotalScience+this.CoeffTotalAutre
},

 
  //Coefficient total de la litterature
  CoeffTotalLitteraire(){
    let objet = this.gettersMatiere.filter(tem=>tem.statut == 1 && tem.coefficient &&
      tem.classe_id == this.editText.classe_id)
      let array_exercie = [];
        if (objet.length > 0) {
          objet.forEach(function (val) {
            array_exercie.push(val.coefficient);
          });
          let unique = array_exercie;
          console.log(unique);         
          if (unique.length == 0) {return [];}
          return unique.map(Number).reduce(function(a,b){
            return a +b;
          }, 0);
        } return 0;
  },

  //Coefficient total de la science
  CoeffTotalScience(){
    let objet = this.gettersMatiere.filter(tem=>tem.statut == 2 && tem.coefficient &&
      tem.classe_id == this.editText.classe_id)
      let array_exercie = [];
        if (objet.length > 0) {
          objet.forEach(function (val) {
            array_exercie.push(val.coefficient);
          });
          let unique = array_exercie;
          console.log(unique);         
          if (unique.length == 0) {return [];}
          return unique.map(Number).reduce(function(a,b){
            return a +b;
          }, 0);
        } return 0;
  },
  //Coefficient total des autres matières
  CoeffTotalAutre(){
    let objet = this.gettersMatiere.filter(tem=>tem.statut == 3 && tem.coefficient &&
      tem.classe_id == this.editText.classe_id)
      let array_exercie = [];
        if (objet.length > 0) {
          objet.forEach(function (val) {
            array_exercie.push(val.coefficient);
          });
          let unique = array_exercie;
          console.log(unique);         
          if (unique.length == 0) {return [];}
          return unique.map(Number).reduce(function(a,b){
            return a +b;
          }, 0);
        } return 0;
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
         "SupprimerCantine", "getAbsence", "AjouterAbsence", "AjouterCantine", "getScolarite", "AjouterScolarite",
         "get_note"]),
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