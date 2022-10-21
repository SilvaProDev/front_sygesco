<template>
  <div >
    
       <!-- TopBar -->
        <nav class="navbar navbar-expand navbar-light bg-navbar topbar mb-4 static-top">
         
          <!-- <button id="sidebarToggleTop" class="btn btn-link rounded-circle" @click.prevent="toggle2" v-if="getterProfileUsers.length !=0">
            <i class="fa fa-bars" style="color:#fff"></i>
          </button> -->
          
          <ul class="navbar-nav ml-auto">
           
            <li class="nav-item dropdown no-arrow mx-1">
              <a class="nav-link dropdown-toggle"  id="messagesDropdown" role="button" data-toggle="dropdown"
                aria-haspopup="true" aria-expanded="false">
               
               <span  class="badge badge-success" style="font-size: 11px;">
                 {{LibelleRole(getterProfileUsers.role_id)}}
               </span>
              </a>
             
            </li>
            <li class="nav-item dropdown no-arrow mx-1" v-if="getterProfileUsers.length !=0">
              <a class="nav-link dropdown-toggle"  id="messagesDropdown" role="button" data-toggle="dropdown"
                aria-haspopup="true" aria-expanded="false">
               
               <span style="background-color:red;font-size: 11px;" class="badge badge-warning">{{AnneEncours}}</span>
              </a>
             
            </li>
            <li class="nav-item dropdown no-arrow mx-1" v-if="getterProfileUsers.length !=0">
              <a class="nav-link dropdown-toggle"  id="messagesDropdown" role="button" data-toggle="dropdown"
                aria-haspopup="true" aria-expanded="false">
               
                <span style="background-color:green;font-size: 12px;" class="badge badge-success">{{TrimestreEncours}}</span>
                
              </a>
             
            </li>
              <!-- ******************************************* -->
            <li class="nav-item dropdown no-arrow mx-1" v-if="getterProfileUsers.length !=0">
              <a class="nav-link dropdown-toggle" @click.prevent="toggle" href=""   role="button" data-toggle="dropdown"
                >
            
                <span style="background-color:;font-size: 11px;" class="badge badge-dark" >{{$t("nav.langue")}}</span>
                <!-- <span  class="d-none d-lg-inline text-white">{{ $t("nav.langue") }}</span> -->
              </a>
             
            </li>
            <!-- <div class="topbar-divider d-none d-sm-block"></div> -->
            <li class="nav-item dropdown no-arrow" >
              <a class="nav-link dropdown-toggle" @click.prevent="toggle1" href="">
                <span style="background-color:red;font-size: 11px;" class="badge badge-danger" >{{$t("nav.parametre")}}</span>
              </a>
            
            </li>
            <!-- ******************************************* -->
          
          </ul>
        </nav>
     
           
    <Drawer @close="annuler" align="right" :closeable="true">
      <div v-if="open" class="ModalStyle">        
         <div class="card-body" style="width:300px !important;" >
          
                  <div class="row">
                    <a class="dropdown-item" href="#" @click.prevent="setLocale('fr')" style="color:#fff">
                      <img  src="/front/img/france.png" style="width: 25px; height:20px;"> &nbsp; &nbsp;
                      FR
                    </a>
                  </div>
                 <hr>
                  <div class="row">
                    <a class="dropdown-item" href="#" @click.prevent="setLocale('en')" style="color:#fff">
                <img  src="/front/img/united-states.png" style="width: 25px; height:20px;"> &nbsp; &nbsp;
                 Ang
               </a>
                  </div>
                 <hr>
                  <div class="row">
                    <a class="dropdown-item" href="#" @click.prevent="setLocale('arab')" style="color:#fff">
                    <img  src="/front/img/emirats-arabes-uni.png" style="width: 25px; height:20px;"> &nbsp; &nbsp;
                    Arab
                  </a>
                  </div>
                 <hr>                                 
                  <div class="row">
                    <div class="col-sm-12">                     
                      <a class="btn btn-warning pl-3 pr-3" href="" @click.prevent="annuler">Fermer</a>
                    </div>
                  </div>
                </div> 
      </div>
    </Drawer>
           
    <Drawer2 @close="annuler2" align="left" :closeable="true">
      <div v-if="open2" class="ModalStyle">        
         <div class="card-body" style="width:300px !important;" >
                 
           
      <div class="row">
         
    <ul class="navbar-nav sidebar sidebar-light accordion bg-info" id="accordionSidebar" >
      
      <li class="sidebar-brand d-flex align-items-center ">
        
         <a v-if="getterProfileUsers.length !=0" :title="getterProfileUsers.name"  href="#" @click.prevent="ProfilUser" style="text-decoration: none;color:#fff">
        <div class="sidebar-brand-icon">
          <span v-if="getterProfileUsers.length !=0 && getterProfileUsers.image != 'vide' && getterProfileUsers.image !=null">
          <img :src="getterProfileUsers.image" class="rounded-circle  bg-primary" width="30">

          </span>
        <span v-else>
          <img :src="url" alt="Admin" class="rounded-circle  bg-primary" width="40">
        </span>
                    Profile 
        </div>
      
        <div class="ml-5" style="color:#000">               
               
          </div> 
                </a>        
        
      
      </li>
      <li class="nav-item" v-if=" getterProfileUsers.length != 0">

          <a href="" class="nav-link collapsed p-4" style="text-decoration: none;" @click.prevent="Accueil">
            <div class="BlockUserItemsub" style="color:#000; font-weight:bold">
              <i style="color:#000" class="fas fa-home"></i>
               <span >{{ $t("SideBar.Accueile") }}</span>
            </div>
          </a>
         
      </li>
      <hr class="sidebar-divider my-0" v-if=" getterProfileUsers.length != 0">
      <li class="nav-item" v-if=" getterProfileUsers.length != 0">

          <a href="" class="nav-link collapsed p-4" style="text-decoration: none;" @click.prevent="BilanAnnee">
            <div class="BlockUserItemsub" style="color:#000; font-weight:bold">
              <i style="color:#000" class="fas fa-home"></i>
               <span >Bilan Annuel</span>
            </div>
          </a>
         
      </li>
     
      <hr class="sidebar-divider my-0" v-if=" getterProfileUsers.role_id ==1 || getterProfileUsers.role_id ==3">
      <li class="nav-item " v-if=" getterProfileUsers.role_id ==1 || getterProfileUsers.role_id ==3">
         <a href="" class="nav-link collapsed"  @click.prevent="dashbords">
        <div class="BlockUserItemsub" 
        style="color:#000; font-weight:bold">
          <i style="color:#000" class="fas fa-fw fa-tachometer-alt"></i>
          <span>{{ $t("SideBar.TableauDeBord") }}</span>
        </div>
      </a>
      
      </li>
      <hr class="sidebar-divider"  v-if="getterProfileUsers.length !=0 && getterProfileUsers.role_id ==1">
    
      <li class="nav-item" v-if="getterProfileUsers.length !=0 && getterProfileUsers.role_id ==1">
          <div class="BlockUserItem" :class="{ BlockUserItemOver: menu_active == 3 }"
         @click.prevent="selectionMenu(3)" >
    
      <div class="item-menu" >
       
        <a href="" class="nav-link">
         <i style="color:#000" class="fas fa-user-plus"></i>
         <span  style="color:#000; font-weight:bold">

         {{ $t("SideBar.inscriptions") }}
         </span>
        </a>
      </div>
    </div>
    <div class="BlockUsersubmenu" style="display: none;color:#000; font-weight:bold" 
      v-bind:class="{ afficheSousMenu: menu_active == 3,}">
       
      <a href="" class="nav-link collapsed"  @click.prevent="activedOptionMenu(131, 'inscription')">
        <div class="BlockUserItemsub" :class="{ BlockUserItemsubOver: menu_active == 131 }">
          <span  style="color:#000; font-weight:bold">

        {{ $t("SideBarli.nouvelleInscription") }}
         </span>
         
        </div>
      </a>
    
    </div>
   
      </li>
    <hr class="sidebar-divider" v-if=" getterProfileUsers.role_id ==1 || getterProfileUsers.role_id ==3">
      <li class="nav-item" v-if=" getterProfileUsers.role_id ==1 || getterProfileUsers.role_id ==3">
          <div
      class="BlockUserItem"
      :class="{ BlockUserItemOver: menu_active == 5 }"
      @click.prevent="selectionMenu(5)"
    >
    
      <div class="AlignLeft item-menu" >
       
        <a href="" class="nav-link">
         <i style="color:#000" class="fas fa-user"></i>
          <span  style="color:#000; font-weight:bold">

         {{ $t("SideBar.DetailEleve") }}
         </span>
        
        </a>
    </div>
    </div>
    <div class="BlockUsersubmenu" style="display: none" 
      v-bind:class="{ afficheSousMenu: menu_active == 5,}">
       
      <a href="" class="flex-sm-fill nav-link"  @click.prevent="ListeEleve">
        <div class="BlockUserItemsub" :class="{ BlockUserItemsubOver: menu_active == 100 }">
          <span  style="color:#000; font-weight:bold">
             {{ $t("SideBarli.ListeDesEleve") }}
          </span>         
        </div>
      </a>
      </div>

      </li>

       <hr class="sidebar-divider" v-if="getterProfileUsers.length !=0 && getterProfileUsers.role_id ==3">
      <li class="nav-item" v-if="getterProfileUsers.length !=0 && getterProfileUsers.role_id ==3">
          <div
      class="BlockUserItem"
      :class="{ BlockUserItemOver: menu_active == 120 }"
      @click.prevent="selectionMenu(120)"
    >
    
      <div class="AlignLeft item-menu" >
       
        <a href="" class="nav-link">
          <img style="color:red;" src="/front/img/icons8.png" alt="" width="15px">
      <!-- <i class="fa fa-book fa-fw" aria-hidden="true"></i> -->
       
       <span  style="color:#000; font-weight:bold">
             {{ $t("SideBar.Livret") }}
          </span>
        </a>
    </div>
    </div>
    <div class="BlockUsersubmenu" style="display: none" 
      v-bind:class="{ afficheSousMenu: menu_active == 120,}">
        <a href="" class="flex-sm-fill  nav-link"  @click.prevent="ConfigLivret">
        <div class="BlockUserItemsub" :class="{ BlockUserItemsubOver: menu_active == 123 }">
         
           <span  style="color:#000; font-weight:bold">
             {{ $t("SideBarli.configLivret") }}
          </span>
        </div>
       </a>
      <a href="" class="flex-sm-fill  nav-link"  @click.prevent="InsertionLivret">
        <div class="BlockUserItemsub" :class="{ BlockUserItemsubOver: menu_active == 121 }">
       
        <span  style="color:#000; font-weight:bold">
              {{ $t("SideBarli.NewLivret") }}
          </span>
        
        </div>
      </a>
      <a href="" class="flex-sm-fill  nav-link"  @click.prevent="VoirLivret">
        <div class="BlockUserItemsub" :class="{ BlockUserItemsubOver: menu_active == 122 }">
          <span  style="color:#000; font-weight:bold">
              {{ $t("SideBarli.VoirLivret") }}
          </span>
         
        </div>
      </a>
     
    
      </div>
      </li>
       <hr class="sidebar-divider" v-if=" getterProfileUsers.role_id ==1 || getterProfileUsers.role_id ==3">
      <li class="nav-item" v-if=" getterProfileUsers.role_id ==1 || getterProfileUsers.role_id ==3">
          <div
      class="BlockUserItem"
      :class="{ BlockUserItemOver: menu_active == 11 }"
      @click.prevent="selectionMenu(11)"
    >
    
      <div class="AlignLeft item-menu" >
       
        <a href="" class="nav-link">
      <i style="color:#000" class="fa fa-book fa-fw" aria-hidden="true"></i>
        
          <span  style="color:#000; font-weight:bold">
              {{ $t("SideBar.note") }}
          </span>
        </a>
    </div>
    </div>
    <div class="BlockUsersubmenu" style="display: none" 
      v-bind:class="{ afficheSousMenu: menu_active == 11,}">
       
      <a href="" class="flex-sm-fill  nav-link"  @click.prevent="NotesDeEleve">
        <div class="BlockUserItemsub" :class="{ BlockUserItemsubOver: menu_active == 100 }">
        
          <span  style="color:#000; font-weight:bold">
               {{ $t("SideBarli.NoteIndividuelle") }}
          </span>
        </div>
      </a>
      <a href="" class="flex-sm-fill  nav-link"  @click.prevent="activedOptionMenu(100, 'NotesGroupe')">
        <div class="BlockUserItemsub" :class="{ BlockUserItemsubOver: menu_active == 100 }">
         
         <span  style="color:#000; font-weight:bold">
              {{ $t("SideBarli.NoteGroupe") }}
          </span>
        </div>
      </a>
      <a href="" class="flex-sm-fill  nav-link"  @click.prevent="VoirNotesDetail">
        <div class="BlockUserItemsub" :class="{ BlockUserItemsubOver: menu_active == 12 }">
     
       <span  style="color:#000; font-weight:bold">
              {{ $t("SideBarli.DetailDesNotes") }}
          </span>
        </div>
      </a>
    
      </div>
      </li>

       <hr class="sidebar-divider" v-if="getterProfileUsers.length !=0 && getterProfileUsers.role_id ==1">
      <li class="nav-item" v-if="getterProfileUsers.length !=0 && getterProfileUsers.role_id ==1">
          <div
      class="BlockUserItem"
      :class="{ BlockUserItemOver: menu_active == 7 }"
      @click.prevent="selectionMenu(7)"
    >
    
      <div class="AlignLeft item-menu" >
       
        <a href="" class="nav-link">
         <i style="color:#000" class="fas fa-utensils"></i>
         <span  style="color:#000; font-weight:bold">
              {{ $t("SideBar.cantine") }}
          </span>
        
        </a>
    </div>
    </div>
    <div class="BlockUsersubmenu" style="display: none" 
      v-bind:class="{ afficheSousMenu: menu_active == 7,}">
       
      <a href="" class="flex-sm-fill  nav-link"  @click.prevent="activedOptionMenu(701, 'Cantine')">
        <div class="BlockUserItemsub" :class="{ BlockUserItemsubOver: menu_active == 701 }">
     
          <span  style="color:#000; font-weight:bold">
             {{ $t("SideBarli.cantineStatistique") }}
          </span>
        </div>
      </a>
      <a href="" class="flex-sm-fill  nav-link"  @click.prevent="activedOptionMenu(702, 'PayerCantine')">
        <div class="BlockUserItemsub" :class="{ BlockUserItemsubOver: menu_active == 702 }">
       
          <span  style="color:#000; font-weight:bold">
             {{ $t("SideBarli.cantineDetail") }}
          </span>
        </div>
      </a>
    
      </div>
   
      </li>

       <hr class="sidebar-divider" v-if="getterProfileUsers.length !=0 && getterProfileUsers.role_id ==1">
      <li class="nav-item" v-if="getterProfileUsers.length !=0 && getterProfileUsers.role_id ==1">
          <div class="BlockUserItem"  :class="{ BlockUserItemOver: menu_active == 15 }"
          @click.prevent="selectionMenu(15)">
    
      <div class="AlignLeft item-menu" >
       
        <a href="" class="nav-link">
         <i style="color:#000" class="fab fa-cc-amazon-pay"></i>
          <span  style="color:#000; font-weight:bold">
             {{ $t("SideBar.scolarite") }}
          </span>
        
        </a>
    </div>
    </div>
    <div class="BlockUsersubmenu" style="display: none" 
      v-bind:class="{ afficheSousMenu: menu_active == 15}">
       
      <a href="" class="flex-sm-fill  nav-link"  @click.prevent="activedOptionMenu(41, 'ScolaritePaiement')">
        <div class="BlockUserItemsub" :class="{ BlockUserItemsubOver: menu_active == 41 }">
        
         <span  style="color:#000; font-weight:bold">
            {{ $t("SideBarli.scolarite") }}
          </span>
        </div>
      </a>
      <a href="" class="flex-sm-fill  nav-link"  @click.prevent="activedOptionMenu(42, 'ScolariteStatistique')">
        <div class="BlockUserItemsub" :class="{ BlockUserItemsubOver: menu_active == 42 }">
           <span  style="color:#000; font-weight:bold">
             {{ $t("SideBarli.statistColarite") }}
          </span>
        </div>
      </a>
      <a href="" class="flex-sm-fill  nav-link"  @click.prevent="activedOptionMenu(412, 'ScolariteEtat')">
        <div class="BlockUserItemsub" :class="{ BlockUserItemsubOver: menu_active == 412 }">
           <span  style="color:#000; font-weight:bold">
            Etat de paiement
          </span>
        </div>
      </a>
    
      </div>
      </li>
       <hr class="sidebar-divider" v-if="getterProfileUsers.length !=0 && getterProfileUsers.role_id ==1"> 

      <li class="nav-item" v-if="getterProfileUsers.length !=0 && getterProfileUsers.role_id ==1">
          <div class="BlockUserItem"  :class="{ BlockUserItemOver: menu_active == 80 }"
          @click.prevent="selectionMenu(80)">
    
      <div class="AlignLeft item-menu" >
       
        <a href="" class="nav-link">
        <i style="color:#000" class="fas fa-car"></i>
        <span  style="color:#000; font-weight:bold">
            {{ $t("SideBar.transport") }}
          </span>
          
        </a>
    </div>
    </div>
    <div class="BlockUsersubmenu" style="display: none" 
      v-bind:class="{ afficheSousMenu: menu_active == 80}">
       
      <a href="" class="flex-sm-fill  nav-link"  @click.prevent="activedOptionMenu(81, 'TransportPaiement')">
        <div class="BlockUserItemsub" :class="{ BlockUserItemsubOver: menu_active == 81 }">
      
        <span  style="color:#000; font-weight:bold">
             {{ $t("SideBarli.transport") }}
          </span>
        </div>
      </a>
      <a href="" class="flex-sm-fill  nav-link"  @click.prevent="activedOptionMenu(82, 'TransportStatistique')">
        <div class="BlockUserItemsub" :class="{ BlockUserItemsubOver: menu_active == 82 }">
       
        <span  style="color:#000; font-weight:bold">
              {{ $t("SideBarli.statisTransport") }}
          </span>
        </div>
      </a>
    
      </div>
      </li>


       <hr class="sidebar-divider" v-if="getterProfileUsers.length !=0 && getterProfileUsers.role_id ==1">
      <li class="nav-item" v-if="getterProfileUsers.length !=0 && getterProfileUsers.role_id ==1">
          <div class="BlockUserItem"  :class="{ BlockUserItemOver: menu_active == 16 }"
          @click.prevent="selectionMenu(16)">
    
      <div class="AlignLeft item-menu" >
       
        <a href="" class="nav-link">
        <i style="color:#000" class="fas fa-bell"></i>
        <span style="color:#000; font-weight:bold">
        {{ $t("SideBar.notification") }}
        </span>
        
        </a>
    </div>
    </div>
    <div class="BlockUsersubmenu" style="display: none" 
      v-bind:class="{ afficheSousMenu: menu_active == 16}">
       
      <a href="" class="flex-sm-fill  nav-link"  @click.prevent="activedOptionMenu(43, 'NotificationEmail')">
        <div class="BlockUserItemsub" :class="{ BlockUserItemsubOver: menu_active == 43 }">
    
      <span style="color:#000; font-weight:bold">
         {{ $t("SideBarli.email") }}
        </span>
        </div>
      </a>
      <a href="" disabled="disabled" class="flex-sm-fill  nav-link"  @click.prevent="activedOptionMenu(44, 'NotificationSms')">
        <div  class="BlockUserItemsub" :class="{ BlockUserItemsubOver: menu_active == 44 }">
      
      <span  style="color:#000; font-weight:bold">
         {{ $t("SideBarli.sms") }}
        
        </span>
        </div>
      </a>
    
      </div>
      </li>
         <hr class="sidebar-divider">
      
    
     
      <div class="version" id="version-ruangadmin"></div>
    </ul>
      </div>
      

                 <hr>                                 
                  <div class="row">
                    <div class="col-sm-12">                     
                      <a class="btn btn-warning pl-3 pr-3" href="" @click.prevent="annuler2">Fermer</a>
                    </div>
                  </div>
                  
                </div> 
      </div>
    </Drawer2>

        <Drawer1 @close="annuler1" align="right" :closeable="true" >
      <div v-if="open1" class="ModalStyle">        
         <div class="card-body" style="width:350px !important;" >
          
            <div class="row">
              <a  href="#" class="dropdown-item"  @click.prevent="AjouterAnnee">
            <i class="fa fa-cogs"></i>
                {{ $t("ul.anne") }}
                
          </a>
            </div>
            <hr>
            <div class="row">
              <a v-if="getterProfileUsers.length !=0 && getterProfileUsers.role_id ==1" class="dropdown-item" href="#"  @click.prevent="AjouterSemestre">
            <i class="fab fa-accusoft"></i>
                {{ $t("ul.trimestre") }}
          </a>
            </div>
            <hr>
            <div class="row">
              <a v-if="getterProfileUsers.length !=0 && getterProfileUsers.role_id ==1" class="dropdown-item" href="#" @click.prevent="AjouterNiveau">
                 <i class="fas fa-layer-group"></i>
                     {{ $t("ul.niveau") }}
                </a>
            </div>
            <hr>
            <div class="row">
              <a v-if="getterProfileUsers.length !=0 && getterProfileUsers.role_id ==1" class="dropdown-item" href="#" @click.prevent="AjouterMatiere">
              <i class="fas fa-book-open"></i>
                     {{ $t("ul.matiere") }}
                </a>
            </div>
                 <hr>                                 
            <div class="row">
              <a v-if="getterProfileUsers.length !=0 && getterProfileUsers.role_id ==1" class="dropdown-item" href="#" @click.prevent="AjouterEntete">
                <i class="fas fa-address-book"></i>
                   Entête
                </a>
            </div>
                 <hr>                                 
            <div class="row">
              <a v-if="getterProfileUsers.length !=0 && getterProfileUsers.role_id ==1" class="dropdown-item" href="#" @click.prevent="ConfigAccueil">
               <i class="fas fa-sliders"></i>
                   Configurer l'accueil
                </a>
            </div>
                 <hr>                                 
            <div class="row">
              <a  class="dropdown-item" href="#" @click.prevent="AjouterPermission">
               <i class="fas fa-chalkboard-teacher"></i>
                    Permission
                </a>
            </div>
                 <hr>                                 
            <div class="row">
              <a  class="dropdown-item" href="#" @click.prevent="AjouterRole">
                <i class="fas fa-user -tag" ></i>
                    Rôle
                </a>
            </div>
                 <hr>                                 
            <div class="row">
              <a v-if="getterProfileUsers.length !=0 && getterProfileUsers.role_id ==1"  class="dropdown-item" href="#" @click.prevent="AjouterUtilisateurs">
               <i class="fas fa-users-cog"></i>
                    Utilisateurs
                </a>
            </div>
                 <hr>                                 
                                           
            <div class="row">
              <a v-if="getterProfileUsers.lengt!= 0 && getterProfileUsers.role_id != 0" class="dropdown-item" href="#" @click.prevent="ProfilUser">
                <i class="fas fa-user"></i>
                    Profile 
               
                </a>
            </div>
                 <hr> 
                 <div class="row">
              <a v-if="getterProfileUsers.length !=0 && getterProfileUsers.role_id != 0" class="dropdown-item" href="#" @click.prevent="SeDeconnecter()">
              <i class="fas fa-sign-in-alt"></i>
                    Se deconnecter
                </a>
            </div>
                 <hr>                                 
                  <div class="row">
                    <div class="col-sm-12">                     
                      <a class="btn btn-warning pl-3 pr-3" href="" @click.prevent="annuler1">Fermer</a>
                    </div>
                  </div>
                </div> 
      </div>
    </Drawer1>
        <!-- Topbar -->
  </div>
</template>

<script>
import {mapGetters, mapActions} from "vuex";
import Drawer from "vue-simple-drawer"
import Drawer1 from "vue-simple-drawer"
import Drawer2 from "vue-simple-drawer"

import axios from "axios"
export default {
    name:"navBars",
  
    components:{
        Drawer,
        Drawer1,
        Drawer2,
        
      },
    data(){
      return{
        showIsModal: false,
         url:"/front/img/avatar1.jpg",
        isModalVisible:false,
        listOne: false,
        isChange:false,

        //
       // isChange:false,
         menu_active: 1,
      menuSelection: false,
        innerOpen: false,
          align: "right",
           open: false,
        innerOpen1: false,
          align1: "right",
           open1: false,
        innerOpen2: false,
          align2: "right",
           open2: false,

        wholename: '',
        email: '',
      }
    },
      created(){
      if(this.gettersAnne.length ==0){
        this.getAnnee();
      }
       this.getUserProfile();
        this.getRole();
        // this.logoutUser();
      this.getTrimestre()
    },
      computed:{
      ...mapGetters("parametres",["gettersAnne", "gettersTrimestre",]),
       ...mapGetters('personnel', ['getterProfileUsers',"gettersRole","user"]),
      active(){
        let objet = this.getterProfileUsers.role_id;
        if(objet == 1){
         return true
        }
        return false
      },
      taille(){
        return this.getterProfileUsers.length
      },
          AnneEncours(){
          let obj = this.gettersAnne.find(tem=>tem.encours == 1)
          if(obj){
            return obj.debut_annee+"-"+obj.fin_annee;
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
         LibelleRole(){
         return (id)=>{
             if(id != null && id != ""){
                 let text = this.gettersRole.find(tem =>tem.id == id)
                 if(text){
                     return text.libelle;
                 }
                 return ""
             }
         }
     },

      },
    methods:{
       ...mapActions("parametres",["getAnnee","AjouterAnnee", "SupprimerAnnee","ModifierAnnee", "ModifierAnneeEncours", 
       "getTrimestre",]),
       ...mapActions('personnel', ['getUserProfile','logoutUser',"getRole"]),
      
      showModal(){
        
        this.isModalVisible = !this.isModalVisible
      },
      fermer(){
        
           this.isModalVisible = false
        },

        toggle(){
          this.open = !this.open
          },
        annuler(){
          this.open =false
        },
        toggle1(){
          this.open1 = !this.open1
          },
        annuler1(){
          this.open1 =false
        },
        toggle2(){
          this.open2 = !this.open2
          },
        annuler2(){
          this.open2 =false
        },

       getUser() {
              return axios.get('auth/profile_user', {
                  headers:{
                      Authorization: 'Bearer' `${localStorage.token}`
                  }
              }).then(res => {
                   console.log("silva reuissite")
                      return res.data
                  })
                  .catch(err =>{
                      console.log(err)
                  });
        },

        SeDeconnecter(){
           let obj ={
               id:this.getterProfileUsers.id,
               email:this.getterProfileUsers.email ,
              //  user: this.user.access_token
              }
              console.log(obj)
            this.annuler1()
          this.logoutUser(obj)
        },
      //Fonction de modification de la langue
      setLocale(locale){
        this.$i18n.locale = locale,
        this.$router.push({
          params:{lang:locale}
        })
        this.annuler()
      },
      AjouterAnnee(){
        // if(this.active == true){
        //   this.$router.push({
        //     name:"AnneeScolaire"
        //   })
        //   this.annuler1()
        // }else if(confirm("Désoler, vous ne pouvez pas acceder à cette page, Se connecter ..?") ==true){
        //   this.AjouterUser()
        // }
        this.$router.push({
            name:"AnneeScolaire"
          })
        
      },
      AjouterNiveau(){
        if(this.active == true){
          
          this.$router.push({
            name:"Niveau"
          })
          this.annuler1()
        }else if(confirm("Désoler, vous ne pouvez pas acceder à cette page, Se connecter ..?") ==true){
          this.AjouterUser()
        }
      },
      AjouterClasse(){
         if(this.active == true){
           this.$router.push({
             name:"Classe"
           })  
           this.annuler1()
        }
         else if(confirm("Désoler, vous ne pouvez pas acceder à cette page, Se connecter ..?") ==true){
          this.AjouterUser()
        }
      },
      AjouterSemestre(){
         if(this.active == true){
           this.$router.push({
             name:"Semestre"
           })
           this.annuler1()         
        }
        else if(confirm("Désoler, vous ne pouvez pas acceder à cette page, Se connecter ..?") ==true){
          this.AjouterUser()
        }
      },
      AjouterMatiere(){
         if(this.active == true){
           this.$router.push({
             name:"Matiere"
           })
           this.annuler1()        
        }
       else if(confirm("Désoler, vous ne pouvez pas acceder à cette page, Se connecter ..?") ==true){
          this.AjouterUser()
        }
      },
      AjouterEntete(){
         if(this.active == true){        
           this.$router.push({
             name:"EnteteConfig"
           })
           this.annuler1()
        }
        else if(confirm("Désoler, vous ne pouvez pas acceder à cette page, Se connecter ..?") ==true){
          this.AjouterUser()
        }
      },
      AjouterUtilisateurs(){
         if(this.active == true){         
           this.$router.push({
             name:"Utilisateur"
           })
           this.annuler1()
        }
        else if(confirm("Désoler, vous ne pouvez pas acceder à cette page, Se connecter ..?") ==true){
          this.AjouterUser()
        }
      },
      AjouterPermission(){
      //    if(this.active == true){
          
      //      this.$router.push({
      //        name:"Permission"
      //      })
      //      this.annuler1()
      //   }
      //  else if(confirm("Désoler, vous ne pouvez pas acceder à cette page, Se connecter ..?") ==true){
      //     this.AjouterUser()
      //   }
      this.$router.push({
             name:"Permission"
           })
      },
      ProfilUser(){
        this.$router.push({
          name:"Profile"
        })
        this.annuler1()
      },
      AjouterUser(){
        this.$router.push({
          name:"LoginUser"
        })
        this.annuler1()
      },
      AjouterRole(){
        //  if(this.active == true){         
        //    this.$router.push({
        //      name:"Role"
        //    })
        //    this.annuler1()
        // }
        // else if(confirm("Désoler, vous ne pouvez pas acceder à cette page, Se connecter?") ==true){
        //   this.AjouterUser()
        // }
        this.$router.push({
             name:"Role"
           })
      },
      ConfigAccueil(){
         if(this.active == true){          
           this.$router.push({
             name:"AfficheAccueil"
           })
           this.annuler1()
        }
        else if(confirm("Désoler, vous ne pouvez pas acceder à cette page, Se connecter?") ==true){
          this.AjouterUser()
        }
      },
       openMenu2(){
        
        this.isChange=!this.isChange
      },
        
     dashbords(){
        this.$router.push({
          name:'Dashbord'
        })
      },
     Accueil(){
        this.$router.push({
          name:'Caroussel'
        })
      },
     BilanAnnee(){
        this.$router.push({
          name:'BilanAnne'
        })
      },
     
      VoirNotesDetail(){
        if(this.active1 == true){
          this.$router.push({
            name:'NotesDetail'
          })
        }else if(confirm("Désoler, vous ne pouvez pas acceder à cette page, Se connecter ..?") ==true){
          this.AjouterUser()
        }
      },
      NotesDeEleve(){
        if(this.active1 == true){
          this.$router.push({
            name:'NotesEleve'
          })
        }else if(confirm("Désoler, vous ne pouvez pas acceder à cette page, Se connecter ..?") ==true){
          this.AjouterUser()
        }
      },
      ListeEleve(){
        if(this.active1 == true){
          this.$router.push({
            name:'ListeDesEleves'
          })
        }else if(confirm("Désoler, vous ne pouvez pas acceder à cette page, Se connecter ..?") ==true){
          this.AjouterUser()
        }
      },
      ConfigLivret(){
        if(this.active1 == true){
          this.$router.push({
            name:'Configuration'
          })
        }
      },
      InsertionLivret(){
        if(this.active1 == true){
          this.$router.push({
            name:'Insertion'
          })
        }
      },
      VoirLivret(){
        if(this.active1 == true){
          this.$router.push({
            name:'Livret'
          })
        }
      },
      accueil(){
        this.$router.push({
          name:'Caroussel'
        })
      },
   
    selectionMenu(id) {
      if (this.menu_active == id) {
        this.menu_active = "";
      } else {
        this.menu_active = id;
        this.menuSelection = !this.menuSelection;
      }
    },
    activedOptionMenu(value, route_name) {
      if(this.active == true){
        this.menu_active = value;
        this.$router.push({
          name: route_name,
        });
      }else if(confirm("Désoler, vous ne pouvez pas acceder à cette page, Se connecter ..?") ==true){
          this.AjouterUser()
        }
    },
    
    },
}
</script>

<style scoped>

.menu {  
  font: 14px/1.5 'Open Sans', sans-serif;
  font-weight: 600;
  margin: 0;
  padding: 0;
  list-style: none;
}

.menu a {
  display: block;
  padding: 5px;
  color: #fff;
  text-decoration: none;
  border-radius: 30px;
}

.menu li {
  display:block;
  float: left;
  position: relative;
  /* background: #222; */
  color: #fff;
  min-width: 170px;
  
}

.menu li ul {
  position: absolute;
  left: 0;
  top: 61px;
  margin-top: 10px;
  padding: 0;
  
  
}

.menu li ul li {
  min-width: 200px;
  background: rgb(184, 183, 189);
  transition: background .2s;
}
.menu li ul {
  border-radius: 30px;
}

.menu li ul li:hover {
  
  background: rgb(7, 7, 7);
  color: #fff;
  
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .2s;
}
.fade-enter, .fade-leave-active {
  opacity: 0;
}
.flashit{
  color:rgb(104, 146, 238);
	-webkit-animation: flash linear 1s infinite;
	animation: flash linear 1s infinite;
}
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
        top: 8%;
        width:30%;
        margin-right: 50%;
        left: 33%;
}
.ModalStyle {
    width: 94%;
    height: auto;
    float: left;
    padding: 0 3% 0 3%;
    margin-bottom: 0;
    color: #fff;
    background-color: rgba(235, 226, 228, 0);

}
 .close{
  position: absolute;
  top: 10px;
  right: 10px;
}
.dropdown-item{
  color:#fff;
}
</style>