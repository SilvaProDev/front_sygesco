import Api from "../../../routes/apiUrl/api.js"
import { asyncLoading } from 'vuejs-loading-plugin'
import Vue from "vue"
// import authHeader from '../../../services/header';



  //ACTION DE LA CLASSE

  export const get_all_student = ({commit})=>{
    commit("SET_LOADING_STUDENT", true)
    
    Api.get('/student').then(resp =>{
      commit("GET_ALL_STUDENT", resp.data)
      commit("SET_LOADING_STUDENT", false)
    }).catch(error =>console.log(error));
}

export const AjouterEleve = ({commit, dispatch}, objet)=>{
    asyncLoading(Api.post('/students', objet
   
  ))
       .then(resp =>{   
             commit("AJOUTER_STUDENT", resp.data);
            //    commit("GET_ALL_Niveau", resp.data);
            dispatch("get_all_student")      
            Vue.notify({
              title: 'Success',
              text: "Enregistrement Effectué avec Succès!",
              type: "success"
            })
                    
       }).catch(error => {
        console.log(error)
         Vue.notify({
            title: 'Erreur',
            text: "Un problème est survenu !",
            type: "error"
        });
    })
      
}
export const ImporterEleve = ({commit, dispatch}, objet)=>{
    asyncLoading(Api.post('/import/student', objet,
    
    ))
       .then(resp =>{
           
               commit("IMPORT_STUDENT", resp.data);
            //    commit("GET_ALL_Niveau", resp.data);
            dispatch("get_all_student")
               
            Vue.notify({
              title: 'Success',
              text: "Importaion Effectué avec Succès!",
              type: "success"
            })
              
            
       }).catch(error => {
            console.log(error)
             Vue.notify({
                title: 'Erreur',
                text: "Importaion Echouée ces données existe déjà !",
                type: "error"
            });
        })
}

export const ModifierEleve = ({commit, dispatch}, objet)=>{
    asyncLoading(Api.post('/student',objet)).then(resp =>{
           commit("MODIFIER_STUDENT", resp.data)
           dispatch("get_all_student")  
           dispatch("get_all_student")  
           dispatch("get_all_student")  
           
           Vue.notify({
            title: 'Success',
            text: "Modification effectuée avec Succès!",
            type: "success"
          })
           
       }).catch(error =>console.log(error));
}


//Suppression
export function SupprimerEleve({ commit }, id) {

    this.$app.$dialog
      .confirm("Voulez vouz vraiment supprimer ?.")
      .then(dialog => {
        commit('SUPPRIMER_STUDENT', id)
        Api.delete('/student/' + id,).then(() => dialog.close())
      })
  }


  export function getEleveParClasse({ commit },search) {
   
   // return new Promise((resolve,reject)=>{
      Api.get('/student_par_classe/'+search,).then((response) => {
           commit('GET_ALL_STUDENT', response.data)
           
         }).catch(error => {
           console.log(error)
         })
   // })
   
   }

    //ACTION DE LA NOTE

    export const get_note = ({commit})=>{
    
      Api.get('/note').then(resp =>{
          commit("GET_ALL_NOTE", resp.data)
      }).catch(error =>console.log(error));
  }
  
  export const AjouterNote = ({commit, dispatch}, objet)=>{
      asyncLoading(Api.post('/note', objet))
         .then(resp =>{
             
                 commit("AJOUTER_NOTE", resp.data);
              //    commit("GET_ALL_Niveau", resp.data);
              dispatch("get_note")
                 
              Vue.notify({
                title: 'Success',
                text: "Enregistrement  Effectué avec Succès!",
                type: "success"
              })
                
              
         }).catch(error =>console.log(error));
  }
  export const ModifierNote = ({commit, dispatch}, objet)=>{
      asyncLoading(Api.put('/note/'+ objet.id,objet)).then(resp =>{
             commit("MODIFIER_NOTE", resp.data)
             dispatch("get_note")  
             
             Vue.notify({
              title: 'Success',
              text: "Modification  effectuée avec Succès!",
              type: "success"
            })
             
         }).catch(error =>console.log(error));
  }
  
  
  //Suppression
  export function SupprimerNote({ commit }, id) {
  
      this.$app.$dialog
        .confirm("Voulez vouz vraiment supprimer ?.")
        .then(dialog => {
          commit('SUPPRIMER_NOTE', id)
          Api.delete('/note/' + id,).then(() => dialog.close())
        })
    }



//ACTION DE LA CANTINE

export const get_Liste_Cantine = ({commit})=>{
    
  commit("SET_LOADING_CANTINE", true)
  Api.get('/cantine').then(resp =>{
    commit("GET_LISTE_CANTINE", resp.data)
    commit("SET_LOADING_CANTINE", false)
  }).catch(error =>console.log(error));
}

export const AjouterCantine = ({commit, dispatch}, objet)=>{
  asyncLoading(Api.post('/cantine', objet))
     .then(resp =>{
         
             commit("AJOUTER_CANTINE", resp.data);
          //    commit("GET_ALL_Niveau", resp.data);
          dispatch("get_Liste_Cantine")
             
          Vue.notify({
            title: 'Success',
            text: "Le paiement à été  Effectué avec Succès!",
            type: "success"
          })
            
          
     }).catch(error =>console.log(error));
}
export const ModifierCantine = ({commit, dispatch}, objet)=>{
  asyncLoading(Api.put('/cantine/'+ objet.id,objet)).then(resp =>{
         commit("MODIFIER_CANTINE", resp.data)
         dispatch("get_Liste_Cantine")  
         
         Vue.notify({
          title: 'Success',
          text: "Modification  effectuée avec Succès!",
          type: "success"
        })
         
     }).catch(error =>console.log(error));
}

//Suppression
export function SupprimerCantine({ commit }, id) {

  this.$app.$dialog
    .confirm("Voulez vouz vraiment supprimer ?.")
    .then(dialog => {
      commit('SUPPRIMER_CANTINE', id)
      Api.delete('/cantine/' + id,).then(() => dialog.close())
    })
}


//ACTION DE L ABSENCE

export const getAbsence = ({commit})=>{
    
  Api.get('/absence').then(resp =>{
      commit("GET_LISTE_ABSENCE", resp.data)
  }).catch(error =>console.log(error));
}

export const AjouterAbsence = ({commit, dispatch}, objet)=>{
  asyncLoading(Api.post('/absence', objet))
     .then(resp =>{
         
             commit("AJOUTER_ABSENCE", resp.data);
          //    commit("GET_ALL_Niveau", resp.data);
          dispatch("getAbsence")
             
          Vue.notify({
            title: 'Success',
            text: "Enregistrement de l'absence Effectué avec Succès!",
            type: "success"
          })
            
          
     }).catch(error =>console.log(error));
}
export const ModifierAbsence = ({commit, dispatch}, objet)=>{
  asyncLoading(Api.put('/absence/'+ objet.id,objet)).then(resp =>{
         commit("MODIFIER_ABSENCE", resp.data)
         dispatch("getAbsence")  
         
         Vue.notify({
          title: 'Success',
          text: "Modification  effectuée avec Succès!",
          type: "success"
        })
         
     }).catch(error =>console.log(error));
}

//Suppression
export function SupprimerAbsence({ commit }, id) {

  this.$app.$dialog
    .confirm("Voulez vouz vraiment supprimer ?.")
    .then(dialog => {
      commit('SUPPRIMER_ABSENCE', id)
      Api.delete('/absence/' + id,).then(() => dialog.close())
    })
}


//ACTION DE LA SCOLARIET

export const getScolarite = ({commit})=>{
    
  commit("SET_LOADING_SCOLARITE", true)
  Api.get('/scolarite').then(resp =>{
    commit("GET_LISTE_SCOLARITE", resp.data)
    commit("SET_LOADING_SCOLARITE", false)
  }).catch(error =>console.log(error));
}

export const AjouterScolarite = ({commit, dispatch}, objet)=>{
  asyncLoading(Api.post('/scolarite', objet))
     .then(resp =>{
         
             commit("AJOUTER_SCOLARITE", resp.data);
          //    commit("GET_ALL_Niveau", resp.data);
          dispatch("getScolarite")
             
          Vue.notify({
            title: 'Success',
            text: "Paiement  Effectué avec Succès!",
            type: "success"
          })
            
          
     }).catch(error =>console.log(error));
}
export const ModifierScolarite = ({commit, dispatch}, objet)=>{
  asyncLoading(Api.put('/scolarite/'+ objet.id,objet)).then(resp =>{
         commit("MODIFIER_SCOLARITE", resp.data)
         dispatch("getScolarite")  
         
         Vue.notify({
          title: 'Success',
          text: "Modification du Paiement effectuée avec Succès!",
          type: "success"
        })
         
     }).catch(error =>console.log(error));
}

//Suppression
export function SupprimerScolarite({ commit }, id) {

  this.$app.$dialog
    .confirm("Voulez vouz vraiment supprimer ?.")
    .then(dialog => {
      commit('SUPPRIMER_SCOLARITE', id)
      Api.delete('/scolarite/' + id,).then(() => dialog.close())
    })
}