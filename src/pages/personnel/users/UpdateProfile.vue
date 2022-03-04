<template>
  <div>
      <Loader :isVisible="loadingData"/>
   <loading :active.sync="isLoading" :opacity="0.7" :loader="'dots'" :color="'#70CD07'" :background-color="'#000'"
                                     :can-cancel="false"
                                     :is-full-page="false"></loading>
   <div class="container">
		<div class="main-body">
             <!-- Breadcrumb -->
          <nav aria-label="breadcrumb" class="main-breadcrumb">
            <ol class="breadcrumb">
              <li class="breadcrumb-item">
                   <router-link to="/" tag="li">
                    <a href="">Home</a>
                    </router-link>
              </li>
              <li class="breadcrumb-item"><a href="" @click.prevent="retour"  >Profile</a></li>
              <li class="breadcrumb-item active" aria-current="page">Modifier Profile</li>
            </ol>
          </nav>
          <!-- /Breadcrumb -->
			<div class="row">
				<div class="col-lg-4">
					<div class="card">
						<div class="card-body">
							<div class="d-flex flex-column align-items-center text-center" v-if="user">
								<span v-if="user.image =='vide' || user.image ==null">
								<img src="https://bootdey.com/img/Content/avatar/avatar6.png" alt="Admin" class="rounded-circle p-1 bg-primary" width="110">
								</span>
								<span v-else>
									<img :src="user.image" alt="Admin" class="rounded-circle p-1 bg-primary" width="130">

								</span>
								<div class="mt-3">
									<h4>{{user.name}}</h4>
									<p class="text-secondary mb-1">{{LibelleRole(getterProfileUsers.role_id) || 'Non renseigné'}}</p>
									<p class="text-muted font-size-sm">{{user.adresse}}</p>
									
								</div>
							</div>
						<!-- {{getterProfileUsers}} -->
							
						</div>
					</div>
				</div>
				<div class="col-lg-8">
					<div class="card">
						<div class="card-body">
							<div class="row mb-3">
								<div class="col-sm-3">
									<h6 class="mb-0">Nom et Prenom</h6>
								</div>
								<div class="col-sm-9 text-secondary">
									<input type="text" class="form-control" value="John Doe" v-model="user.name">
								</div>
							</div>
							<div class="row mb-3">
								<div class="col-sm-3">
									<h6 class="mb-0">Email</h6>
								</div>
								<div class="col-sm-9 text-secondary">
									<input v-model="user.email" type="email" class="form-control" placeholder="email">
								</div>
							</div>
							<div class="row mb-3">
								<div class="col-sm-3">
									<h6 class="mb-0">Téléphone</h6>
								</div>
								<div class="col-sm-9 text-secondary">
									<input v-model="user.phone" type="tel" class="form-control" placeholder="numéro">
								</div>
							</div>
							<div class="row mb-3">
								<div class="col-sm-3">
									<h6 class="mb-0">Adresse</h6>
								</div>
								<div class="col-sm-9 text-secondary">
									<input v-model="user.adresse" type="text" class="form-control" placeholder="adresse">
								</div>
							</div>
							<div class="row mb-3">
								<div class="col-sm-3">
									<h6 class="mb-0">Genre</h6>
								</div>
								<div class="col-sm-9 text-secondary">
									<input  v-model="user.sexe" type="text" class="form-control" placeholder="genre">
								</div>
							</div>
							<div class="row mb-3">
								<div class="col-sm-3">
									<h6 class="mb-0">Photo</h6>
								</div>
								<div class="col-sm-9 text-secondary">
								<input  type="file" class="form-control" id="avatar" name="avatar" @change="OnchangeImage"
                                    accept="image/png, image/jpeg, image/jpg">
								</div>
							</div>
							<div class="row">
								<div class="col-sm-3"></div>
								<div class="col-sm-9 text-secondary">
									<input type="button" @click.prevent="modifierPhotoProfil()" class="btn btn-primary px-4" value="Modifier">
								</div>
							</div>
						</div>
					</div>
					<!-- <div class="row">
						<div class="col-sm-12">
							<div class="card">
								<div class="card-body">
									<h5 class="d-flex align-items-center mb-3">Project Status</h5>
									<p>Web Design</p>
									<div class="progress mb-3" style="height: 5px">
										<div class="progress-bar bg-primary" role="progressbar" style="width: 80%" aria-valuenow="80" aria-valuemin="0" aria-valuemax="100"></div>
									</div>
									<p>Website Markup</p>
									<div class="progress mb-3" style="height: 5px">
										<div class="progress-bar bg-danger" role="progressbar" style="width: 72%" aria-valuenow="72" aria-valuemin="0" aria-valuemax="100"></div>
									</div>
									
								</div>
							</div>
						</div>
					</div> -->
				</div>
			</div>
		</div>
	</div>
    
   <notifications />
  </div>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex'
      import axios from "axios"
      
          import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
    export default {
        components:{
            Loading
        },
        data() {
    //           this.getUser().then(res => {
    //   this.wholename = res.name
    //   this.email = res.email
     
    // })

    return {
        wholename: '',
        email: '',
		user:'',
		formData:{
			name:'',
		},
		selectedFile:'',
         isLoading:true,
      }
      
    },
  
        created(){
           this.getUserProfile();
        this.getUtilisateur()
             this.getRole();
             this.getAnnee();
          this.user = this.gettersUtilisateur.find(tem=>tem.id == this.$route.params.id)
          this. isLoading =false,
          console.log( this.user)
        },

    computed: {
          ...mapGetters("parametres",["gettersAnne"]),
          ...mapGetters('personnel', ['getterProfileUsers',"gettersUtilisateur", "gettersRole","gettersloadingUser"]),


   loadingData(){
    return this.gettersloadingUser
       
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
	AnneEncours(){
       let obj = this.gettersAnne.find(tem=>tem.encours == 1)
       if(obj){
         return obj.id;
       }
       return ""
     }
 
        },

        methods: {
            
          ...mapActions("parametres",["getAnnee"]),
              ...mapActions('personnel', ['getUserProfile','getUtilisateur','ModifierUtilisateur',"getRole"]),


               getUser() {
              return axios.get('auth/profile_user', {
               
              }).then(res => {
                   console.log("silva reuissite")
                      return res.data
                  })
                  .catch(err =>{
                      console.log(err)
                  });
        },

 OnchangeImage(e) {
                const files = e.target.files;
                 this.selectedFile = event.target.files[0];
                Array.from(files).forEach(file => this.addImage(file));
            },
            
             addImage(file) {
                if (!file.type.match("image.*")) {
                    this.info_img=true;
                    console.log(`${file.name} le fichier doit etre une image`);
                    return;
                }
                this.info_img=false;
                let reader = new FileReader();
                let vm = this;
                reader.onload = e => {
                    vm.user.image = e.target.result;
                };
                reader.readAsDataURL(file);
            },
addFichierPDF(file) {
                let reader = new FileReader();
                let vm = this;
                reader.onload = e => {
                    vm.imagePDF = "pdf.png";
                    vm.namePDF = file.name;
                    vm.fichierPDF = e.target.result;
                };
                reader.readAsDataURL(file);
            },
            modifierPhotoProfil () {
                const formData = new FormData();
                // formData.append('fichier', this.selectedImage, this.selectedImage.name)
                formData.append('id', this.user.id)
                formData.append('name', this.user.name)
                formData.append('adresse', this.user.adresse)
                formData.append('sexe', this.user.sexe)
                formData.append('annee_id', this.AnneEncours)
                formData.append('phone', this.user.phone)
                formData.append('email', this.user.email)
                formData.append('role_id', this.user.role_id)
				if( this.selectedFile!==""){
				formData.append('fichier', this.selectedFile, this.selectedFile.name);
				}
		
               let config = {
                header : {
                'Content-Type' : 'multipart/form-data'
                },

            }
				this.ModifierUtilisateur(formData, config)
				// this.get_all_student();
				this.$router.go(-1)

            },

            retour(){
                this.$router.go(-1)
            }
        }
    }
</script>

<style scoped>
body{
    background: #f7f7ff;
    margin-top:20px;
}
.card {
    position: relative;
    display: flex;
    flex-direction: column;
    min-width: 0;
    word-wrap: break-word;
    background-color: #fff;
    background-clip: border-box;
    border: 0 solid transparent;
    border-radius: .25rem;
    margin-bottom: 1.5rem;
    box-shadow: 0 2px 6px 0 rgb(218 218 253 / 65%), 0 2px 6px 0 rgb(206 206 238 / 54%);
}
.me-2 {
    margin-right: .5rem!important;
}
</style>