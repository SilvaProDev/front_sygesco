<template>
  <div >
    <!-- <header id="navigation" class="sidebar-blue" style="background-color:#6A4DFB">
        <button id="sidebarToggleTop" class="btn btn-link rounded-circle"
           v-bind:class="{active: isChange }"  @click="openMenu2()">
            <i class="fa fa-bars" style="color:#fff;"></i> 
          </button>
    </header> -->
       <!-- Sidebar -->

      
    <ul class="navbar-nav sidebar sidebar-light accordion bg-info" id="accordionSidebar" >
      <li class="sidebar-brand d-flex align-items-center " href="index.html">
        
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
    <!-- Sidebar -->
  </div>
</template>

<script>
import {mapGetters, mapActions} from "vuex";
export default {
    name:"sidebars",

    data(){
      return{
         url:"/front/img/avatar1.jpg",
        drawer:false,
        isChange:false,
         menu_active: 1,
      menuSelection: false,
      }
    },
    created(){
      this.getUserProfile();
       this.getRole();
    },
      computed:{
      ...mapGetters("parametres",["gettersAnne"]),
       ...mapGetters('personnel', ['getterProfileUsers', "gettersRole"]),
      active(){
        let objet = this.getterProfileUsers.role_id;
        if(objet == 1){
         return true
        }
        return false
      },
      active1(){
        let objet = this.getterProfileUsers.role_id;
        if(objet == 1 || objet == 3){
         return true
        }
        return false
      },
          AnneEncours(){
          let obj = this.gettersAnne.find(tem=>tem.encours == 1)
          if(obj){
            return obj.debut_annee+"-"+obj.fin_annee;
          }
          return ""
        },
      },
    methods: {
      ...mapActions("parametres",["getAnnee","AjouterAnnee", "SupprimerAnnee","ModifierAnnee", "ModifierAnneeEncours"]),
       ...mapActions('personnel', ['getUserProfile','logoutUser', "getRole"]),
     
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
        ProfilUser(){
        this.$router.push({
          name:"Profile"
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
        AjouterUser(){
        this.$router.push({
          name:"LoginUser"
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
     openMenu2(){ 
        this.isChange=!this.isChange
      },
  },
   
}
</script>

<style scoped>


.tailMenu {
  width: 24%;
}

.tailMenu2 {
  width: 24%;
  margin-left: 24%;
  left: 0px;
  opacity: 1;
}
.afficheInfoMenu {
  display: block;
  opacity: 1;
}
.affiche3 {
  margin: -1px 15px 0px 0px;
}
.afficheTitle {
  display: inline-block;
}

.affiche01 {
  padding-left: 22px;
}
.afficheContent {
  width: 92%;
  margin-left: 8%;
}
.tailleContainte2 {
  width: 65px;
}
.BlockUsersubmenuCache {
  display: none !important;
}
.afficheSousMenu {
  display: block !important;
}
.icAffiche {
  margin: -1px auto 0px 25%;
}
.cacheInfoMenu {
  display: none;
  opacity: 1;
}
.log{
  height: 30px;
  width: 50px;;
}
router-link a{
    text-decoration: none !important;
}

</style>