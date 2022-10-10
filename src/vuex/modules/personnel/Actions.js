import Api from "../../../routes/apiUrl/api.js"
import { asyncLoading } from 'vuejs-loading-plugin'
import Vue from "vue"
import router from "../../../routes/index"
 import authHeader from "../../../services/auth-header"


export function login({commit}, user){
   if((user.email || user.phone) && user.password){

      asyncLoading( Api.post('/auth/login', {
        email: user.email,
        password: user.password,
        phone: user.phone,
        UserRole: user.UserRole
    })).then(response => {           
        commit('LOGIN_USER', response.data)
        localStorage.setItem('token',JSON.stringify(response.data.access_token))
        localStorage.setItem("Users",JSON.stringify(response.data))
          router.push({ name: 'Profile' }) 
                                       
        }).catch((error) => {console.log(error)
          Vue.notify({
            title: 'Erreur',
            text: "Le mot de passe, l'email ou le numéro est incorrect ! Avez-vous choisi le bon onglet ?",
            type: "error"
        })
        });
    }  
 }
// export const getUserProfile = ({commit}, id)=>{

//   Api.get('/auth/profile_user/'+id,).then(resp =>{
//       commit("PROILE_USER", resp.data.user)
//   }).catch(error =>console.log(error));
// }
export  function getUserProfile({commit}) {
  return new Promise((resolve,reject)=>{
    commit("SET_LOADING_USER",true)
    Api.get('/auth/user-profile',{ headers: authHeader() }).then(response => {
      
      resolve(response.data)
      commit("PROILE_USER",response.data)
      commit("SET_LOADING_USER",false)
      
      }).catch(error =>{
       reject(error)
      });
  })  
  }
export  function getUserOnLine({commit}) {
  return new Promise((resolve,reject)=>{
    Api.get('/auth/user-online',{ headers: authHeader() }).then(response => {
      
      resolve(response.data)
      commit("GET_USER_ONLINE",response.data)
      
      }).catch(error =>{
       reject(error)
      });
  })  
  }

  export const logoutUser =({commit, dispatch},user )=>{
    //  localStorage.removeItem('Users')
  //  localStorage.removeItem('token')
    asyncLoading(Api.post('/auth/logout', {
      id: user.id,
    },{ headers: authHeader() })).then(resp =>{
        
      dispatch("getUserProfile")
      dispatch("getUserOnLine")
      localStorage.removeItem('token')
      commit("PROILE_USER", resp.data)
    
  }).catch(error =>console.log(error));
   localStorage.removeItem('token')
  router.push({ name: 'Redirection' })
      // location.reload();
    
  }

  export const changePassword = ({commit,dispatch}, objet)=>{
    asyncLoading(Api.post('/auth/change-password',objet, { headers: authHeader() })).then(response =>{
      commit("PROILE_USER",response.data)
      dispatch("getUserProfile")
      localStorage.removeItem('token')
          Vue.notify({
            title: 'Success',
        text: 'Le mot de passe a été modifié avec Succès!',
        type: "success"
      });
      router.push({ name: 'Redirection' })
      }).catch((error) => {console.log(error)
        Vue.notify({
          title: 'Erreur',
          text: "L'ancien mot de passe est incorrect !",
          type: "error"
      })
     
    })
      // router.push({ name: 'LoginUser' })
  }
//ACTION DE L UTILISATEUR
// export const getUserOnLine = ({commit})=>{
//     Api.get('/auth/user-online').then(resp =>{
//         commit("GET_USER_ONLINE", resp.data)
//     }).catch(error =>console.log(error));
// }
//ACTION DE L UTILISATEUR
export const getUtilisateur = ({commit})=>{
    Api.get('/user').then(resp =>{
        commit("GET_ALL_UTILISATEUR", resp.data)
    }).catch(error =>console.log(error));
}

export const AjouterUtilisateur = ({commit, dispatch}, objet)=>{
    asyncLoading(Api.post('/user', objet))
       .then(resp =>{
           
              commit("AJOUTER_UTILISATEUR", resp.data);
            //    commit("GET_ALL_ANNEE", resp.data);
            dispatch("getUtilisateur")
               
            Vue.notify({
                   title: 'Success',
                text: 'Enregistrement Effectué avec Succès!',
                type: "success"
              })
              
            
       }).catch(error =>console.log(error));
}
export const SearchUser =({commit}, search)=>{
  Api.get('/search/user/'+search).then(resp=>{
    commit('GET_ALL_UTILISATEUR', resp.data.users)
  })
}
export const ModifierUtilisateur = ({commit, dispatch}, objet)=>{
    asyncLoading(Api.post('/user-update',objet)).then(resp =>{
           commit("MODIFIER_UTILISATEUR", resp.data)
           dispatch("getUtilisateur")
           Vue.notify({
            title: 'Success',
            text: 'La modification a été Effectué avec Succès!',
            type: "success"
          })
           
       }).catch(error =>console.log(error));
}
export const suspendreUtilisateur = ({commit, dispatch}, objet)=>{
    asyncLoading(Api.put('/user_suspendre/'+ objet.id, objet)).then(resp =>{
           commit("MODIFIER_UTILISATEUR", resp.data)
           dispatch("getUtilisateur")
           Vue.notify({
            title: 'Success',
            text: "Suspension effectuée avec Succès!",
            type: "success"
          })
           
       }).catch(error =>console.log(error));
}

//Suppression
export function SupprimerUtilisateur({ commit }, id) {

    this.$app.$dialog
      .confirm("Voulez vouz vraiment supprimer ?.")
      .then(dialog => {
        commit('SUPPRIMER_UTILISATEUR', id)
        Api.delete('/user/' + id,).then(() => dialog.close())
      })
  }
  //connection


//ACTION DE L AFFECTATION
export const getAffectation = ({commit})=>{
  commit("SET_LOADING_AFFECTATION", true)
    Api.get('/affectation').then(resp =>{
        commit("GET_AFFECTATION", resp.data)
        commit("SET_LOADING_AFFECTATION", false)
    }).catch(error =>console.log(error));
}

export const AjouterAffectation = ({commit, dispatch}, objet)=>{
    asyncLoading(Api.post('/affectation', objet))
       .then(resp =>{
           
            commit("AJOUTER_AFFECTATION", resp.data);
     
            dispatch("getAffectation")
               
            Vue.notify({
                   title: 'Success',
                text: 'Enregistrement Effectué avec Succès!',
                type: "success"
              })
              
            
       }).catch(error =>console.log(error));
}
export const ModifierAffectation = ({commit, dispatch}, objet)=>{
    asyncLoading(Api.post('/affectations',objet)).then(resp =>{
           commit("MODIFIER_AFFECTATION", resp.data)
           dispatch("getAffectation")
           Vue.notify({
            title: 'Success',
            text: 'La modification a été Effectué avec Succès!',
            type: "success"
          })
           
       }).catch(error =>console.log(error));
}
// export const ModifierUtilisateurEncours = ({commit, dispatch}, objet)=>{
//     asyncLoading(Api.put('/affectation/'+ objet.id, objet)).then(resp =>{
//            commit("MODIFIER_ANNEE_ENCOURS", resp.data)
//            dispatch("getUtilisateur")
//            Vue.notify({
//             title: 'Success',
//             text: "L'année  a été modifier avec Succès!",
//             type: "success"
//           })
           
//        }).catch(error =>console.log(error));
// }

//Suppression

export function SupprimerAffectation({ commit }, id) {

    this.$app.$dialog
      .confirm("Voulez vouz vraiment supprimer ?.")
      .then(dialog => {
        commit('SUPPRIMER_AFFECTATION', id)
        Api.delete('/affectation/' + id,).then(() => dialog.close())
      })
  }

    //ACTION DE L ENTETE
    export const getRole = ({commit})=>{
      Api.get('/role').then(resp =>{
          commit("GET_ROLE", resp.data)
      }).catch(error =>console.log(error));
  }
  
  export const AjouterRole = ({commit, dispatch}, objet)=>{
      asyncLoading(Api.post('/role', objet))
         .then(resp =>{
             
                 commit("AJOUTER_ROLE", resp.data);
             
              dispatch("getRole")
              dispatch("getPermission")
                 
              Vue.notify({
                title: 'Success',
                text: 'Le paiement a été Effectué avec Succès!',
                type: "success"
              })
                
              
         }).catch(error =>console.log(error));
  }
  export const ModifierRole = ({commit,dispatch}, objet)=>{
      asyncLoading(Api.put('/role/'+ objet.id,objet)).then(resp =>{
             commit("MODIFIER_ROLE", resp.data)
             dispatch("getRole")
             dispatch("getPermission")
             Vue.notify({
              title: 'Success',
              text: 'La modification a été Effectué avec Succès!',
              type: "success"
            })
             
         }).catch(error =>console.log(error));
  }
  
  
  //Suppression
  export function SupprimerRole({ commit }, id) {
  
      this.$app.$dialog
        .confirm("Voulez vouz vraiment supprimer ?")
        .then(dialog => {
          commit('SUPPRIMER_ROLE', id)
          Api.delete('/role/' + id,).then(() => dialog.close())
        })
    }

//ACTION DE LA PERMISSION
export const getPermission = ({commit})=>{
 
    Api.get('/permission').then(resp =>{
        commit("GET_PERMISSION", resp.data)
       
    }).catch(error =>console.log(error));
}

export const AjouterPermission = ({commit, dispatch}, objet)=>{
    asyncLoading(Api.post('/permission', objet))
       .then(resp =>{
           
            commit("AJOUTER_PERMISSION", resp.data);
     
            dispatch("getPermission")
               
            Vue.notify({
                   title: 'Success',
                text: 'Enregistrement Effectué avec Succès!',
                type: "success"
              })
              
            
       }).catch(error =>console.log(error));
}
export const ModifierPermission = ({commit, dispatch}, objet)=>{
    asyncLoading(Api.put('/permission/'+ objet.id,objet)).then(resp =>{
           commit("MODIFIER_PERMISSION", resp.data)
           dispatch("getPermission")
           Vue.notify({
            title: 'Success',
            text: 'La modification a été Effectué avec Succès!',
            type: "success"
          })
           
       }).catch(error =>console.log(error));
}

//Suppression

export function SupprimerPermission({ commit }, id) {

    this.$app.$dialog
      .confirm("Voulez vouz vraiment supprimer ?.")
      .then(dialog => {
        commit('SUPPRIMER_PERMISSION', id)
        Api.delete('/permission/' + id,).then(() => dialog.close())
      })
  }