<template>
  <div>
  <div class="container-login" >
    <div class="row ">
      <div class="col-xl-10 col-lg-12 col-md-9" >
        <div class="bloc-modale" style="width:100%"  :style="{ backgroundImage: 'url(' + images+ ')', width: '900%', height: '1000px' }">

        <div class="overlay" > 
        <div class="card shadow-lg" style="width:100%; margin-left:auto">
          <div class="card-body p-0" >
            <div class="row">
           
              <div class=" col-lg-12">
                <div class="login-form">
                 
                  <div class="mb-3">
                    <!-- <router-link tag="li"  to="/">
                    <a href=""  style="text-decoration: none;" >
                    </a>
                  </router-link> -->
                       <button @click.prevent="Retour" type="button" class="btn btn-success"> 👈👈<span >Retour</span> </button>
                  </div>
                  
                    <h3 class="h4 text-gray-900  font-weight-bold; text-center">Formulaire de connexion 
                      <span v-if="Nombre==1"> Administrateur</span> 
                      <span v-if="Nombre==2"> Professeur</span> 
                      <span v-if="Nombre==3">Secretaire</span> 
                      <span v-if="Nombre==4">Parent</span> 
                      </h3>
                  <form class="user">
                    <div class="form-group">
                      <label for="exampleInputEmail">Email:</label>
                      
                         <span style="color:red; font-style:italic;font-weight:bold"
                              v-if="!$v.User.email.email"
                              role="alert"> 
                              email invalide
                          </span> 
                      <input v-model="User.email" type="email" class="form-control" id="exampleInputEmail" aria-describedby="emailHelp"
                        placeholder="Enter votre Email" :disabled="User.phone != ''"
                        :class="{'is-invalid':$v.User.email.$error, 'is-valid':!$v.User.email.$invalid}">
                    </div>
                    <div class="form-group">
                      <label for="exampleInputEmail">Numéro:</label>
                       
                      <input v-model="User.phone" type="number" :disabled="User.email != ''"
                      class="form-control" id="exampleInputEmail" aria-describedby="emailHelp"
                        placeholder="Enter le numéro"
                        >
                    </div>
                    <div class="form-group" v-if="Nombre==4">
                         <label for="exampleInputPassword">Date de naissance:</label>
                          
                      <input  type="date" class="form-control" id="exampleInputPassword" placeholder="Password">
                    </div>
                    <div class="form-group" v-else>
                         <label for="exampleInputPassword">Mot de passe:</label>
                          <span style="color:red; font-style:italic;"
                            v-if="$v.User.password.$error && !$v.User.password.required"
                            role="alert"> 
                            <span style="color:red; font-weight:bold">*</span>
                            champs obligatoire!
                        </span> 
                      <input  v-model="User.password" type="password" class="form-control" id="exampleInputPassword" placeholder="Password"
                      @input="$v.User.password.$touch()">
                    </div>

                    <div class="form-group">
                      <div class="custom-control custom-checkbox small" style="line-height: 1.5rem;">
                        <input type="checkbox" class="custom-control-input" id="customCheck">
                        <label class="custom-control-label" for="customCheck">Me rappeler 
                          </label>
                      </div>
                    </div>
                    <div class="form-group">
                         <input @click.prevent="connexionUser()" type="submit" value="Connexion" class="btn btn-primary btn-block" style="margin: 10px 0;"
                         :disabled="!active">
                      <!-- <a href="" @click.prevent="connexionUser()" class="btn btn-primary btn-block">Connexion</a> -->
                    </div>
                    <!-- <hr>
                    <a href="index.html" class="btn btn-google btn-block">
                      <i class="fab fa-google fa-fw"></i> Login with Google
                    </a>
                    <a href="index.html" class="btn btn-facebook btn-block">
                      <i class="fab fa-facebook-f fa-fw"></i> Login with Facebook
                    </a> -->
                  </form>
                
                </div>
              </div>
            </div>
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
    images1:"https://us.123rf.com/450wm/maxkabakov/maxkabakov1602/maxkabakov160201629/52140629-concept-de-protection-pix%C3%A9lis%C3%A9-ferm%C3%A9-ic%C3%B4ne-cadenas-sur-fond-num%C3%A9rique-copyspace-vide-pour-la-carte-l.jpg?ver=6",
    images:"/front/img/log.webp",
    User:{
      email:"",
      password:"",
      phone:"",
      UserRole:this.Nombre
      
    }
  }
},
created(){
  console.log(this.$props);
  console.log(this.Nombre);
},
   validations:{
        User:{
              email:{ email},
              password:{ required}
        },
     
},

 computed:{
     
     ...mapGetters("personnel",["gettersUtilisateur", "gettersAffectation"]),

     active(){
       if(this.Nombre == 1 || this.Nombre == 2 || this.Nombre == 3 || this.Nombre == 4){
         return true
       }
       return false
     },

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

          Retour(){
             this.$router.push(
              {name:'Redirection'}
              )
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
    top: 100px;
    bottom: 0;
    left: 500px;
    right: 400;   
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