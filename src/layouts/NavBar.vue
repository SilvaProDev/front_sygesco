<template>
  <div>
       <!-- TopBar -->
        <nav class="navbar navbar-expand navbar-light bg-navbar topbar mb-4 static-top">
          <!-- <button id="sidebarToggleTop" class="btn btn-link rounded-circle mr-5"
           v-bind:class="{active: isChange }"  @click="openMenu2()">
            <i class="fa fa-bars" style="color:#000;"></i> 
          </button> -->
          <!-- <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarToggleExternalContent" aria-controls="navbarToggleExternalContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button> -->
          
          
          <ul class="navbar-nav ml-auto">
           
            <li class="nav-item dropdown no-arrow mx-1">
              <a class="nav-link dropdown-toggle"  id="messagesDropdown" role="button" data-toggle="dropdown"
                aria-haspopup="true" aria-expanded="false">
               
               <span  class="badge badge-success">
                 {{LibelleRole(getterProfileUsers.role_id)}}
               </span>
              </a>
             
            </li>
            <li class="nav-item dropdown no-arrow mx-1">
              <a class="nav-link dropdown-toggle"  id="messagesDropdown" role="button" data-toggle="dropdown"
                aria-haspopup="true" aria-expanded="false">
               
               <span style="background-color:red;" class="badge badge-success">{{AnneEncours}}</span>
              </a>
             
            </li>
            <li class="nav-item dropdown no-arrow mx-1">
              <a class="nav-link dropdown-toggle"  id="messagesDropdown" role="button" data-toggle="dropdown"
                aria-haspopup="true" aria-expanded="false">
               
                <span style="background-color:green;" class="badge badge-success">{{TrimestreEncours}}</span>
                
              </a>
             
            </li>
             <li class="nav-item dropdown no-arrow" style="margin-right:10px;">
              <a class="nav-link dropdown-toggle" href="#" id="userDropdown" role="button" data-toggle="dropdown"
                aria-haspopup="true" aria-expanded="false">
                <!-- <img class="img-profile rounded-circle" src="img/boy.png" style="max-width: 60px"> -->
                <span style="background-color:;" class="ml-2 d-none d-lg-inline text-white small">{{ $t("nav.langue") }}</span>
              </a>
              <div class="dropdown-menu dropdown-menu-left shadow animated--grow-in" aria-labelledby="userDropdown">
                <a class="dropdown-item" href="#" @click.prevent="setLocale('fr')">
                 <img  src="/front/img/france.png" style="width: 25px; height:20px;"> &nbsp; &nbsp;
                  FR
                </a>
              <!-- <hr> -->
                <a class="dropdown-item" href="#" @click.prevent="setLocale('en')">
                 <img  src="/front/img/united-states.png" style="width: 25px; height:20px;"> &nbsp; &nbsp;
                  Ang
                </a>
                <a class="dropdown-item" href="#" @click.prevent="setLocale('arab')">
                 <img  src="/front/img/emirats-arabes-uni.png" style="width: 25px; height:20px;"> &nbsp; &nbsp;
                  Arab
                </a>
                <!-- <hr> -->
                <!-- <a class="dropdown-item" href="#">
                 <img  src="front/img/emirats-arabes-unis.png" style="width: 25px; height:20px;"> &nbsp; &nbsp;
                 Arab
                </a> -->
               
              </div>
            </li>
             <li class="nav-item dropdown no-arrow" style="margin-right:80px;" v-if=" getterProfileUsers.role_id ==1 || getterProfileUsers.role_id ==2">
              <a class="nav-link dropdown-toggle" href="#" id="userDropdown" role="button" data-toggle="dropdown"
                aria-haspopup="true" aria-expanded="false">
                <!-- <img class="img-profile rounded-circle" src="img/boy.png" style="max-width: 60px"> -->
                <span  class="ml-3 d-none d-lg-inline text-white small"> {{ $t("nav.parametre") }}</span>
              </a>
              <div class="dropdown-menu dropdown-menu-left shadow animated--grow-in mr-5" aria-labelledby="userDropdown">
                <a v-if="getterProfileUsers.length !=0 && getterProfileUsers.role_id ==1"  class="dropdown-item" href="#" @click.prevent="AjouterAnnee">
                 <i class="fa fa-cogs"></i>
                     {{ $t("ul.anne") }}
                     
                </a>
              <!-- <hr> -->
                <a v-if="getterProfileUsers.length !=0 && getterProfileUsers.role_id ==1" class="dropdown-item" href="#" @click.prevent="AjouterSemestre">
                  <i class="fab fa-accusoft"></i>
                     {{ $t("ul.trimestre") }}
                </a>
                <!-- <hr> -->
                <a v-if="getterProfileUsers.length !=0 && getterProfileUsers.role_id ==1" class="dropdown-item" href="#" @click.prevent="AjouterNiveau">
                 <i class="fas fa-layer-group"></i>
                     {{ $t("ul.niveau") }}
                </a>
                <a v-if="getterProfileUsers.length !=0 && getterProfileUsers.role_id ==1" class="dropdown-item" href="#" @click.prevent="AjouterClasse">
                 <i class="fas fa-home"></i>
                     {{ $t("ul.classe") }}
                </a>
                <a v-if="getterProfileUsers.length !=0 && getterProfileUsers.role_id ==1" class="dropdown-item" href="#" @click.prevent="AjouterMatiere">
              <i class="fas fa-book-open"></i>
                     {{ $t("ul.matiere") }}
                </a>
                <a v-if="getterProfileUsers.length !=0 && getterProfileUsers.role_id ==1" class="dropdown-item" href="#" @click.prevent="AjouterEntete">
                <i class="fas fa-address-book"></i>
                   Entête
                </a>
                <a v-if="getterProfileUsers.length !=0 && getterProfileUsers.role_id ==1" class="dropdown-item" href="#" @click.prevent="ConfigAccueil">
               <i class="fas fa-sliders"></i>
                   Configurer l'accueil
                </a>
                <a v-if="getterProfileUsers.length !=0 && getterProfileUsers.role_id ==1" class="dropdown-item" href="#" @click.prevent="AjouterPermission">
               <i class="fas fa-chalkboard-teacher"></i>
                    Permission
                </a>
                <a v-if="getterProfileUsers.length !=0 && getterProfileUsers.role_id ==1" class="dropdown-item" href="#" @click.prevent="AjouterRole">
                <i class="fas fa-user -tag" ></i>
                    Rôle
                </a>
                <a v-if="getterProfileUsers.length !=0 && getterProfileUsers.role_id ==1"  class="dropdown-item" href="#" @click.prevent="AjouterUtilisateurs">
               <i class="fas fa-users-cog"></i>
                    Utilisateurs
                </a>
                <hr>
                <!-- <a class="dropdown-item" href="#" @click.prevent="AjouterUtilisateurs">
                <i class="fas fa-users"></i>
                    Espace Parent
                </a>
                <hr> -->
                <a v-if="getterProfileUsers.length !=0" class="dropdown-item" href="#" @click.prevent="SeDeconnecter()">
              <i class="fas fa-sign-in-alt"></i>
                    Se deconnecter
                </a>
                <a v-if="getterProfileUsers.length !=0" class="dropdown-item" href="#" @click.prevent="ProfilUser">
                <i class="fas fa-user"></i>
                    Profile 
               
                </a>
                <a v-if="getterProfileUsers.length ==0" class="dropdown-item" href="#" @click.prevent="AjouterUser">
              <i class="fas fa-sign-in-alt"></i>
                    Se connecter
                </a>
              </div>
            </li>
            
           

         
          </ul>
        </nav>
        <!-- Topbar -->
  </div>
</template>

<script>
import {mapGetters, mapActions} from "vuex";
import axios from "axios"
export default {
    name:"navBars",

    data(){
      return{
        isModalVisible:false,
        listOne: false,
        isChange:false,
        
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
       ...mapGetters('personnel', ['getterProfileUsers',"gettersRole"]),
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
          // localStorage.removeItem('token')
          this.logoutUser()
        },
      //Fonction de modification de la langue
      setLocale(locale){
        this.$i18n.locale = locale,
        this.$router.push({
          params:{lang:locale}
        })
      },
      AjouterAnnee(){
        if(this.active == true){
          this.$router.push({
            name:"AnneeScolaire"
          })
        }else if(confirm("Désoler, vous ne pouvez pas acceder à cette page, Se connecter ..?") ==true){
          // alert("Désoler, vous ne pouvez pas acceder à cette page")
          this.AjouterUser()
        }
        
      },
      AjouterNiveau(){
        if(this.active == true){

          this.$router.push({
            name:"Niveau"
          })
        }else if(confirm("Désoler, vous ne pouvez pas acceder à cette page, Se connecter ..?") ==true){
          this.AjouterUser()
        }
      },
      AjouterClasse(){
         if(this.active == true){
           this.$router.push({
             name:"Classe"
           })  
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
        }
        else if(confirm("Désoler, vous ne pouvez pas acceder à cette page, Se connecter ..?") ==true){
          this.AjouterUser()
        }
      },
      AjouterPermission(){
         if(this.active == true){
          
           this.$router.push({
             name:"Permission"
           })
        }
       else if(confirm("Désoler, vous ne pouvez pas acceder à cette page, Se connecter ..?") ==true){
          this.AjouterUser()
        }
      },
      ProfilUser(){
        this.$router.push({
          name:"Profile"
        })
      },
      AjouterUser(){
        this.$router.push({
          name:"LoginUser"
        })
      },
      AjouterRole(){
         if(this.active == true){         
           this.$router.push({
             name:"Role"
           })
        }
        else if(confirm("Désoler, vous ne pouvez pas acceder à cette page, Se connecter?") ==true){
          this.AjouterUser()
        }
      },
      ConfigAccueil(){
         if(this.active == true){          
           this.$router.push({
             name:"AfficheAccueil"
           })
        }
        else if(confirm("Désoler, vous ne pouvez pas acceder à cette page, Se connecter?") ==true){
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
</style>