<template>
  <div>
  <div class="container-login" >
    <div class="row " >
      <div class="col-xl-12 col-lg-4 col-md-6"  >
        <div class="bloc-modale" style="width:100%;" :style="{ backgroundImage: 'url(' + images+ ')', width: '900%', height: '1000px' }">

        <div class="overlay" > 
        <div class="card col" style="width:100%; height:50%" >
          <div class="card-body p-0" >
            <!-- <div class="row"> -->
           
                <div class="login-form">
                 
                 

                    <form action="">
                        
                   <div class="row ">
            <!-- tableau des professeur -->
            <div class="col-xl-3 col-md-4">
             <a href="" title="Se connecter en tant que Administrateur ?" @click.prevent="AjouterUser(1)" style="text-decoration: none;">
                 <!-- <input type="hidden"  :value="1" > -->
            <div class="card h-100 p-2" style="background-color:#008000;">
                <div class="card-body ">
                  <div class="row align-items-center">
                    <div class="col mr-3">
                      <div class="text-xs font-weight-bold text-uppercase text-black ">Administrateur </div>
                      <div class="h5 mb-0 font-weight-bold"></div>                   
                    </div>
                    <div class="col-auto">
                      <i class="fas fa-users fa-4x text-info"></i>
                    </div>
                  </div>
                </div>
              </div>
             </a>
            </div>
            <div class="col-xl-3 col-md-4">
              <a href="" title="Se connecter en tant que professeur ?" style="text-decoration: none;" @click.prevent="AjouterUser(2)">
                  <div class="card h-100">
                <div class="card-body p-2" style="background-color:#DCDCDC;">
                  <div class="row align-items-center">
                    <div class="col mr-3">
                      <div class="text-xs font-weight-bold text-uppercase text-black">Professeurs  </div>
                      <div class="h5 mb-2 font-weight-bold "></div>                   
                    </div>
                 
                    <div class="col-auto">
                      <i class="fas fa-users fa-4x text-warning"></i>
                    </div>
                  </div>
                </div>
              </div>
              </a>
            </div>

            <div class="col-xl-3 col-md-4">
                <a href="" title="Se connecter en tant que Secrétaire ?" style="text-decoration: none;" @click.prevent="AjouterUser(3)">
                <div class="card h-100 p-2" style="background-color:#41EFEB;">
                    <div class="card-body ">
                    <div class="row align-items-center">
                        <div class="col mr-3">
                        <div class="text-xs font-weight-bold text-uppercase text-black">Secrétaire</div>
                        <div class="h5 mb-0 font-weight-bold "></div>                   
                        </div>
                        <div class="col-auto">
                        <i class="fas fa-users fa-4x text-dark"></i>
                        </div>
                    </div>
                    </div>
                </div>

                </a>
            </div>
            <div class="col-xl-3 col-md-4">
                <a href="" title="Se connecter en tant que Parents ?" style="text-decoration: none;" @click.prevent="AjouterUser(4)">
              <div class="card h-100 ">
                <div class="card-body p-2" style="background-color:#FF0000;">
                  <div class="row align-items-center">
                    <div class="col mr-3">
                      <div class="text-xs font-weight-bold text-uppercase text-black">Parents</div>
                      <div class="h5 mb-0 font-weight-bold"> </div>                   
                    </div>
                    <div class="col-auto">
                      <i class="fas fa-users fa-4x text-dark"></i>
                    </div>
                  </div>
                </div> 
              </div>
                </a>
            </div>
          
                          </div>
                    </form>
                
                </div>
            <!-- </div> -->
          </div>
        </div>
          </div>
        </div>
      </div>
    </div>
  </div>
   <notifications  />
  </div>
</template>

<script>
import {required, email} from "vuelidate/lib/validators";
import {mapGetters, mapActions} from "vuex";
export default {

 props: ['Nombre'],
data(){
  return {
      images:"/front/img/school-image.jpeg",
      Nombre1:1,
      Nombre2:2,
      Nombre3:3,
      Nombre4:4,

    User:{
      email:"",
      password:"",
      phone:""
      
    }
  }
},
   validations:{
        User:{
              email:{ email},
              password:{ required}
        },
     
},

 computed:{
     
     ...mapGetters("personnel",["gettersUtilisateur", "gettersAffectation"]),

 },

  methods:{

          ...mapActions('personnel', ['login']),

          connexionUser(){
              this.$v.User.$touch();
            if(this.$v.User.$error) {
                return
            }

            console.log(this.User)
            this.login(this.User)
          },
            AjouterUser(id){
                if(id ==1 || id ==2 || id ==3 || id ==4){

                    this.$router.push({
                      name:"LoginUser",
                      params: {
                            Nombre: id
                        }
                    })
                }

          
      },
  }
}
</script>

<style scoped>

/* .container-login{
  background-color: black;
} */
.bloc-modale{
  background: rgba(12, 3, 3, 0.5);
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
    position: fixed;
    top: 200px;
    bottom: 0;
    left: 300px;
    right: 40;   
}

 .modale {
  background: #f1f1f1;
        color: #333;
        padding: 40px;
        position: fixed;
        top: 10%;
        width:35%;
        /* margin-right: 45%; */
        left: 60%;
}

 .close{
  position: absolute;
  top: 10px;
  right: 10px;
}
router-link a{
    text-decoration: none !important;
}
</style>