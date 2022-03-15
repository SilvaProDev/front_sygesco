import Api from "../../../routes/apiUrl/api.js"
import { asyncLoading } from 'vuejs-loading-plugin'
import Vue from "vue"

//ACTION DE L ANNEE SCOLAIRE
export const getAnnee = ({commit})=>{
  commit('SET_LOADING_ALL_ANNEE', true)
    Api.get('/liste_annee').then(resp =>{
        commit("GET_ALL_ANNEE", resp.data)
      commit('SET_LOADING_ALL_ANNEE', false)
    }).catch(error =>console.log(error));
}

export const AjouterAnnee = ({commit, dispatch}, objet)=>{
    asyncLoading(Api.post('/add_annee', objet))
       .then(resp =>{
           
               commit("AJOUTER_ANNEE", resp.data);
            //    commit("GET_ALL_ANNEE", resp.data);
            dispatch("getAnnee")
               
            Vue.notify({
                   title: 'Success',
                text: 'Enregistrement Effectué avec Succès!',
                type: "success"
              })
              
            
       }).catch(error =>console.log(error));
}
export const ModifierAnnee = ({commit}, objet)=>{
    asyncLoading(Api.put('/update_annee/'+ objet.id, {
        debut_annee:objet.debut_annee,
        fin_annee:objet.fin_annee,
        date_debut:objet.date_debut,
        date_fin:objet.date_fin,
    })).then(resp =>{
           commit("MODIFIER_ANNEE", resp.data)
           Vue.notify({
            title: 'Success',
            text: 'La modification a été Effectué avec Succès!',
            type: "success"
          })
           
       }).catch(error =>console.log(error));
}
export const ModifierAnneeEncours = ({commit, dispatch}, objet)=>{
    asyncLoading(Api.put('/encours/'+ objet.id, {
      debut_annee:objet.debut_annee,
      fin_annee:objet.fin_annee,
      date_debut:objet.date_debut,
      date_fin:objet.date_fin,
    })).then(resp =>{
           commit("MODIFIER_ANNEE_ENCOURS", resp.data)
           dispatch("getAnnee")
           Vue.notify({
            title: 'Success',
            text: "L'année  a été modifier avec Succès!",
            type: "success"
          })
           
       }).catch(error =>console.log(error));
}

//Suppression
export function SupprimerAnnee({ commit }, id) {

    this.$app.$dialog
      .confirm("Voulez vouz vraiment supprimer ?.")
      .then(dialog => {
        commit('SUPPRIMER_ANNEE', id)
        Api.delete('/delete_annee/' + id,).then(() => dialog.close())
      })
  }

  //ACTION DU NIVEAU

  export const getNiveau = ({commit})=>{
    Api.get('/niveau').then(resp =>{
        commit("GET_ALL_NIVEAU", resp.data)
    }).catch(error =>console.log(error));
}

export const AjouterNiveau = ({commit, dispatch}, objet)=>{
    asyncLoading(Api.post('/niveau', objet))
       .then(resp =>{
           
               commit("AJOUTER_NIVEAU", resp.data);
            //    commit("GET_ALL_Niveau", resp.data);
            dispatch("getNiveau")
               
            Vue.notify({
              title: 'Success',
              text: 'Enregistrement a été Effectué avec Succès!',
              type: "success"
            })
              
            
       }).catch(error =>console.log(error));
}
export const ModifierNiveau = ({commit}, objet)=>{
    asyncLoading(Api.put('/niveau/'+ objet.id,objet)).then(resp =>{
           commit("MODIFIER_NIVEAU", resp.data)
           Vue.notify({
            title: 'Success',
            text: 'La modification a été Effectué avec Succès!',
            type: "success"
          })
           
       }).catch(error =>console.log(error));
}


//Suppression
export function SupprimerNiveau({ commit }, id) {

    this.$app.$dialog
      .confirm("Voulez vouz vraiment supprimer ?.")
      .then(dialog => {
        commit('SUPPRIMER_NIVEAU', id)
        Api.delete('/niveau/' + id,).then(() => dialog.close())
      })
  }

  //ACTION DE LA CLASSE

  export const getClasse = ({commit})=>{
    Api.get('/classe').then(resp =>{
        commit("GET_ALL_CLASSE", resp.data)
    }).catch(error =>console.log(error));
}

export const AjouterClasse = ({commit, dispatch}, objet)=>{
    asyncLoading(Api.post('/classe', objet))
       .then(resp =>{
           
               commit("AJOUTER_CLASSE", resp.data);
            //    commit("GET_ALL_Niveau", resp.data);
            dispatch("getNiveau")
               
            Vue.notify({
              title: 'Success',
              text: 'Enregistrement a été Effectué avec Succès!',
              type: "success"
            })
              
            
       }).catch(error =>console.log(error));
}
export const ModifierClasse = ({commit}, objet)=>{
    asyncLoading(Api.put('/classe/'+ objet.id,objet)).then(resp =>{
           commit("MODIFIER_CLASSE", resp.data)
           Vue.notify({
            title: 'Success',
            text: 'La modification a été Effectué avec Succès!',
            type: "success"
          })
           
       }).catch(error =>console.log(error));
}


//Suppression
export function SupprimerClasse({ commit }, id) {

    this.$app.$dialog
      .confirm("Voulez vouz vraiment supprimer ?.")
      .then(dialog => {
        commit('SUPPRIMER_CLASSE', id)
        Api.delete('/classe/' + id,).then(() => dialog.close())
      })
  }









  //ACTION DU TRIMESTRE
export const getTrimestre = ({commit})=>{
  Api.get('/trimestre').then(resp =>{
      commit("GET_ALL_SEMESTRE", resp.data)
  }).catch(error =>console.log(error));
}

export const AjouterTrimestre = ({commit, dispatch}, objet)=>{
  asyncLoading(Api.post('/trimestre', objet))
     .then(resp =>{
         
             commit("AJOUTER_SEMESTRE", resp.data);
          //    commit("GET_ALL_ANNEE", resp.data);
          dispatch("getTrimestre")
             
          Vue.notify({
            title: 'Success',
            text: 'Enregistrement a été Effectué avec Succès!',
            type: "success"
          })
            
          
     }).catch(error =>console.log(error));
}
export const ModifierTrimestre = ({commit}, objet)=>{
  asyncLoading(Api.put('/trimestre/'+ objet.id, {
      annee_id:objet.annee_id,
      libelle:objet.libelle,
      date_debut:objet.date_debut,
      date_fin:objet.date_fin,
  })).then(resp =>{
         commit("MODIFIER_SEMESTRE", resp.data)
         Vue.notify({
          title: 'Success',
          text: 'La modification a été Effectué avec Succès!',
          type: "success"
        })
         
     }).catch(error =>console.log(error));
}
export const ModifierTrimestreEncours = ({commit, dispatch}, objet)=>{
  asyncLoading(Api.put('/trimestre_encours/'+ objet.id, {
    annee_id:objet.annee_id,
    libelle:objet.libelle,
    date_debut:objet.date_debut,
    date_fin:objet.date_fin,
  })).then(resp =>{
         commit("MODIFIER_SEMESTRE_ENCOURS", resp.data)
         dispatch("getTrimestre")
         Vue.notify({
          title: 'Success',
          text: 'Le changement a été Effectué avec Succès!',
          type: "success"
        })
         
     }).catch(error =>console.log(error));
}

//Suppression
export function SupprimerTrimestre({ commit }, id) {

  this.$app.$dialog
    .confirm("Voulez vouz vraiment supprimer ?.")
    .then(dialog => {
      commit('SUPPRIMER_SEMESTRE', id)
      Api.delete('/trimestre/' + id,).then(() => dialog.close())
    })
}




  //ACTION DE LA MATIERE

  export const getMatiere = ({commit})=>{
    Api.get('/matiere').then(resp =>{
        commit("GET_ALL_MATIERE", resp.data)
    }).catch(error =>console.log(error));
}

export const AjouterMatiere = ({commit, dispatch}, objet)=>{
    asyncLoading(Api.post('/matiere', objet))
       .then(resp =>{
           
               commit("AJOUTER_MATIERE", resp.data);
           
            dispatch("getMatiere")
               
            Vue.notify({
              title: 'Success',
              text: 'Enregistrement a été Effectué avec Succès!',
              type: "success"
            })
              
            
       }).catch(error =>console.log(error));
}
export const ModifierMatiere = ({commit}, objet)=>{
    asyncLoading(Api.put('/matiere/'+ objet.id,objet)).then(resp =>{
           commit("MODIFIER_MATIERE", resp.data)
           Vue.notify({
            title: 'Success',
            text: 'La modification a été Effectué avec Succès!',
            type: "success"
          })
           
       }).catch(error =>console.log(error));
}


//Suppression
export function SupprimerMatiere({ commit }, id) {

    this.$app.$dialog
      .confirm("Voulez vouz vraiment supprimer ?")
      .then(dialog => {
        commit('SUPPRIMER_MATIERE', id)
        Api.delete('/matiere/' + id,).then(() => dialog.close())
      })
  }
  //ACTION DE LA MATIERE

  export const getNouvelleMatiere = ({commit})=>{
    Api.get('/nouvelle-matiere').then(resp =>{
        commit("GET_ALL_NOUVELLE_MATIERE", resp.data)
    }).catch(error =>console.log(error));
}

export const AjouteNouvellerMatiere = ({commit, dispatch}, objet)=>{
    asyncLoading(Api.post('/nouvelle-matiere', objet))
       .then(resp =>{
           
               commit("AJOUTER_NOUVELLE_MATIERE", resp.data);
           
            dispatch("getNouvelleMatiere")
               
            Vue.notify({
              title: 'Success',
              text: 'Enregistrement a été Effectué avec Succès!',
              type: "success"
            })
              
            
       }).catch(error =>console.log(error));
}
export const ModifierNouvelleMatiere = ({commit}, objet)=>{
    asyncLoading(Api.put('/nouvelle-matiere/'+ objet.id,objet)).then(resp =>{
           commit("MODIFIER_NOUVELLE_MATIERE", resp.data)
           Vue.notify({
            title: 'Success',
            text: 'La modification a été Effectué avec Succès!',
            type: "success"
          })
           
       }).catch(error =>console.log(error));
}


//Suppression
export function SupprimerNouvelleMatiere({ commit }, id) {

    this.$app.$dialog
      .confirm("Voulez vouz vraiment supprimer ?")
      .then(dialog => {
        commit('SUPPRIMER_NOUVELLE_MATIERE', id)
        Api.delete('/nouvelle-matiere/' + id,).then(() => dialog.close())
      })
  }

  //ACTION DE L' EMAIL

  export const getMessageEmail = ({commit})=>{
    Api.get('/envoi-email').then(resp =>{
        commit("GET_ALL_EMAIL", resp.data)
    }).catch(error =>console.log(error));
}

export const AjouterMessageEmail = ({commit, dispatch}, objet)=>{
    asyncLoading(Api.post('/envoi-email', objet))
       .then(resp =>{
               commit("AJOUTER_EMAIL", resp.data);  
            dispatch("getMessageEmail")    
            Vue.notify({
              title: 'Success',
              text: 'Email envoyé avec Succès!',
              type: "success"
            })
                  
       }).catch(error =>console.log(error));
}
export const AjouterEmailUnique = ({commit, dispatch}, objet)=>{
    asyncLoading(Api.post('/envoi-email-unique', objet))
       .then(resp =>{
               commit("AJOUTER_EMAIL", resp.data);  
            dispatch("getMessageEmail")    
            Vue.notify({
              title: 'Success',
              text: 'Email envoyé avec Succès!',
              type: "success"
            })
                  
       }).catch(error =>console.log(error));
}
export const ModifierMessageEmail = ({commit}, objet)=>{
    asyncLoading(Api.put('/envoi-email/'+ objet.id,objet)).then(resp =>{
           commit("MODIFIER_EMAIL", resp.data)
           Vue.notify({
            title: 'Success',
            text: 'Email Effectué avec Succès!',
            type: "success"
          })
           
       }).catch(error =>console.log(error));
}
//Suppression
export function SupprimerMessageEmail({ commit }, id) {

    this.$app.$dialog
      .confirm("Voulez vouz vraiment supprimer ?")
      .then(dialog => {
        commit('SUPPRIMER_EMAIL', id)
        Api.delete('/envoi-email/' + id,).then(() => dialog.close())
      })
  }


  //ACTION DE SMS

  export const getMessageSms = ({commit})=>{
    Api.get('/envoi-sms').then(resp =>{
        commit("GET_ALL_SMS", resp.data)
    }).catch(error =>console.log(error));
}

export const AjouterMessageSms = ({commit, dispatch}, objet)=>{
    asyncLoading(Api.post('/envoi-sms', objet))
       .then(resp =>{
           
               commit("AJOUTER_SMS", resp.data);
           
            dispatch("getMessageSms")
               
            Vue.notify({
              title: 'Success',
              text: 'SMS à été Effectué avec Succès!',
              type: "success"
            })
              
            
       }).catch(error =>console.log(error));
}
export const ModifierMessageSms = ({commit}, objet)=>{
    asyncLoading(Api.put('/envoi-sms/'+ objet.id,objet)).then(resp =>{
           commit("MODIFIER_SMS", resp.data)
           Vue.notify({
            title: 'Success',
            text: 'La modification a été Effectué avec Succès!',
            type: "success"
          })
           
       }).catch(error =>console.log(error));
}


//Suppression
export function SupprimerMessageSms({ commit }, id) {

    this.$app.$dialog
      .confirm("Voulez vouz vraiment supprimer ?")
      .then(dialog => {
        commit('SUPPRIMER_SMS', id)
        Api.delete('/envoi-sms/' + id,).then(() => dialog.close())
      })
  }

  //ACTION DE SMS

  export const getBilan = ({commit})=>{
    Api.get('/bilan').then(resp =>{
        commit("GET_ALL_BILAN", resp.data)
    }).catch(error =>console.log(error));
}

export const AjouterBilan = ({commit, dispatch}, objet)=>{
    asyncLoading(Api.post('/bilan', objet))
       .then(resp =>{
           
               commit("AJOUTER_BILAN", resp.data);
           
            dispatch("getBilan")
               
            Vue.notify({
              title: 'Success',
              text: "L'enrégistrement à été Effectué avec Succès!",
              type: "success"
            })
              
            
       }).catch(error =>console.log(error));
}
export const ModifierBilan = ({commit}, objet)=>{
    asyncLoading(Api.put('/bilan/'+ objet.id,objet)).then(resp =>{
           commit("MODIFIER_BILAN", resp.data)
           Vue.notify({
            title: 'Success',
            text: 'La modification a été Effectué avec Succès!',
            type: "success"
          })
           
       }).catch(error =>console.log(error));
}


//Suppression
export function SupprimerBilan({ commit }, id) {

    this.$app.$dialog
      .confirm("Voulez vouz vraiment supprimer ?")
      .then(dialog => {
        commit('SUPPRIMER_BILAN', id)
        Api.delete('/bilan/' + id,).then(() => dialog.close())
      })
  }


  //ACTION DE TRANSPORT
  export const getTransport = ({commit})=>{
    commit("SET_LOADING_TRANSPORT", true)
    Api.get('/transport').then(resp =>{
      commit("GET_TRANSPORT", resp.data)
      commit("SET_LOADING_TRANSPORT", false)
    }).catch(error =>console.log(error));
}

export const AjouterTransport = ({commit, dispatch}, objet)=>{
    asyncLoading(Api.post('/transport', objet))
       .then(resp =>{
           
               commit("AJOUTER_TRANSPORT", resp.data);
           
            dispatch("getTransport")
               
            Vue.notify({
              title: 'Success',
              text: 'Le paiement a été Effectué avec Succès!',
              type: "success"
            })
              
            
       }).catch(error =>console.log(error));
}
export const ModifierTransport = ({commit}, objet)=>{
    asyncLoading(Api.put('/transport/'+ objet.id,objet)).then(resp =>{
           commit("MODIFIER_TRANSPORT", resp.data)
           Vue.notify({
            title: 'Success',
            text: 'La modification a été Effectué avec Succès!',
            type: "success"
          })
           
       }).catch(error =>console.log(error));
}


//Suppression
export function SupprimerTransport({ commit }, id) {

    this.$app.$dialog
      .confirm("Voulez vouz vraiment supprimer ?")
      .then(dialog => {
        commit('SUPPRIMER_TRANSPORT', id)
        Api.delete('/transport/' + id,).then(() => dialog.close())
      })
  }


  //ACTION DE L ENTETE
  export const getconfigEntete = ({commit})=>{
    commit("SET_LOADING_ENTETE", true)
    Api.get('/config-entete').then(resp =>{
        commit("GET_CONFIG_ENTETE", resp.data)
        commit("SET_LOADING_ENTETE", false)
    }).catch(error =>console.log(error));
}

export const AjouterconfigEntete = ({commit, dispatch}, objet)=>{
    asyncLoading(Api.post('/config-entetes', objet))
       .then(resp =>{
           
               commit("AJOUTER_CONFIG_ENTETE", resp.data);
           
            dispatch("getconfigEntete")
               
            Vue.notify({
              title: 'Success',
              text: "L'enrégistrement  a été Effectué avec Succès!",
              type: "success"
            })
              
            
       }).catch(error =>console.log(error));
}
export const ModifierconfigEntete = ({commit}, objet)=>{
    asyncLoading(Api.post('/config-entete', objet)).then(resp =>{
           commit("MODIFIER_CONFIG_ENTETE", resp.data)
           Vue.notify({
            title: 'Success',
            text: 'La modification a été Effectué avec Succès!',
            type: "success"
          })
           
       }).catch(error =>console.log(error));
}


//Suppression
export function SupprimerconfigEntete({ commit }, id) {

    this.$app.$dialog
      .confirm("Voulez vouz vraiment supprimer ?")
      .then(dialog => {
        commit('SUPPRIMER_CONFIG_ENTETE', id)
        Api.delete('/config-entete/' + id,).then(() => dialog.close())
      })
  }




  //ACTION DE L ENTETE
  export const getAccueil = ({commit})=>{
    Api.get('/accueil').then(resp =>{
        commit("GET_ACCUEIL", resp.data)
    }).catch(error =>console.log(error));
}

export const AjouterAccueil = ({commit, dispatch}, objet)=>{
    asyncLoading(Api.post('/accueils', objet))
       .then(resp =>{
           
               commit("AJOUTER_ACCUEIL", resp.data);
           
            dispatch("getAccueil")
               
            Vue.notify({
              title: 'Success',
              text: 'L enrégistrement a été Effectué avec Succès!',
              type: "success"
            })
              
            
       }).catch(error =>console.log(error));
}
export const ModifierAccueil= ({commit}, objet)=>{
    asyncLoading(Api.post('/accueil',objet)).then(resp =>{
           commit("MODIFIER_ACCUEIL", resp.data)
           Vue.notify({
            title: 'Success',
            text: 'La modification a été Effectué avec Succès!',
            type: "success"
          })
           
       }).catch(error =>console.log(error));
}
export const ActiverAccueil= ({commit}, objet)=>{
    asyncLoading(Api.put('/accueil/'+ objet.id,objet)).then(resp =>{
           commit("ACTIVE_ACCUEIL", resp.data)
           Vue.notify({
            title: 'Success',
            text: "L'activation a été Effectué avec Succès!",
            type: "success"
          })
           
       }).catch(error =>console.log(error));
}


//Suppression
export function SupprimerAccueil({ commit }, id) {

    this.$app.$dialog
      .confirm("Voulez vouz vraiment supprimer ?")
      .then(dialog => {
        commit('SUPPRIMER_ACCUEIL', id)
        Api.delete('/accueil/' + id,).then(() => dialog.close())
      })
  }

  
  //ACTION DU LIVRET
  export const getLivret = ({commit})=>{
    Api.get('/livret').then(resp =>{
        commit("GET_LIVRET", resp.data)
    }).catch(error =>console.log(error));
}

export const AjouterLivret = ({commit, dispatch}, objet)=>{
    asyncLoading(Api.post('/livret', objet))
       .then(resp =>{
           
               commit("AJOUTER_LIVRET", resp.data);
           
            dispatch("getLivret")
               
            Vue.notify({
              title: 'Success',
              text: 'L enrégistrement a été Effectué avec Succès!',
              type: "success"
            })
              
            
       }).catch(error =>console.log(error));
}
export const ModifierLivret= ({commit}, objet)=>{
    asyncLoading(Api.put('/livret/'+objet.id,objet)).then(resp =>{
           commit("MODIFIER_LIVRET", resp.data)
           Vue.notify({
            title: 'Success',
            text: 'La modification a été Effectué avec Succès!',
            type: "success"
          })
           
       }).catch(error =>console.log(error));
}

//Suppression
export function SupprimerLivret({ commit }, id) {

    this.$app.$dialog
      .confirm("Voulez vouz vraiment supprimer ?")
      .then(dialog => {
        commit('SUPPRIMER_LIVRET', id)
        Api.delete('/livret/' + id,).then(() => dialog.close())
      })
  }

  //ACTION DE LA CONFIG 
  export const getConfigLivret = ({commit})=>{
    Api.get('/config-livret').then(resp =>{
        commit("GET_CONFIG_LIVRET", resp.data)
    }).catch(error =>console.log(error));
}

export const AjouterConfigLivret = ({commit, dispatch}, objet)=>{
    asyncLoading(Api.post('/config-livret', objet))
       .then(resp =>{          
               commit("AJOUTER_CONFIG_LIVRET", resp.data);           
            dispatch("getConfigLivret")         
            Vue.notify({
              title: 'Success',
              text: 'L enrégistrement a été Effectué avec Succès!',
              type: "success"
            })
                      
       }).catch(error =>console.log(error));
}
export const ModifierConfigLivret= ({commit}, objet)=>{
    asyncLoading(Api.put('/config-livret/'+objet.id,objet)).then(resp =>{
           commit("MODIFIER_CONFIG_LIVRET", resp.data)
           Vue.notify({
            title: 'Success',
            text: 'La modification a été Effectué avec Succès!',
            type: "success"
          })
           
       }).catch(error =>console.log(error));
}

//Suppression
export function SupprimerConfigLivret({ commit }, id) {

    this.$app.$dialog
      .confirm("Voulez vouz vraiment supprimer ?")
      .then(dialog => {
        commit('SUPPRIMER_CONFIG_LIVRET', id)
        Api.delete('/config-livret/' + id,).then(() => dialog.close())
      })
  }

  //ACTION DE LA CONFIG 
  export const getCompentenceLivret = ({commit})=>{
    Api.get('/competence-livret').then(resp =>{
        commit("GET_COMPETENCE_LIVRET", resp.data)
    }).catch(error =>console.log(error));
}

export const AjouterCompentenceLivret = ({commit, dispatch}, objet)=>{
    asyncLoading(Api.post('/competence-livret', objet))
       .then(resp =>{          
               commit("AJOUTER_COMPETENCE_LIVRET", resp.data);           
            dispatch("getConfigLivret")         
            Vue.notify({
              title: 'Success',
              text: 'L enrégistrement a été Effectué avec Succès!',
              type: "success"
            })
                      
       }).catch(error =>console.log(error));
}
export const ModifierCompentenceLivret= ({commit}, objet)=>{
    asyncLoading(Api.put('/competence-livret/'+objet.id,objet)).then(resp =>{
           commit("MODIFIER_COMPETENCE_LIVRET", resp.data)
           Vue.notify({
            title: 'Success',
            text: 'La modification a été Effectué avec Succès!',
            type: "success"
          })
           
       }).catch(error =>console.log(error));
}

//Suppression
export function SupprimerCompentenceLivret({ commit }, id) {

    this.$app.$dialog
      .confirm("Voulez vouz vraiment supprimer ?")
      .then(dialog => {
        commit('SUPPRIMER_COMPETENCE_LIVRET', id)
        Api.delete('/competence-livret/' + id,).then(() => dialog.close())
      })
  }