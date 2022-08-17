
export const LOGIN_USER = (state, user) => {
  state.isLoggedIn = true
  state.user = user;
};
export const LOGOUT_USER = (state) => {
  state.isLoggedIn = false
 // state.user = user;
};
export const LOGIN_TOKEN = (state, message) => {
  state.token = message
}

export const PROILE_USER = (state, message) => {
  state.profile_user = message
}

export const SET_LOADING_AFFECTATION =(state, tableau)=>{
  state.loadingAffectation = tableau
}

export const SET_LOADING_USER =(state, tableau)=>{
  state.loadingUser = tableau
}

// export const SET_ERROR_MESSAGE = (state, message) => {
//   state.errorMessage = message
// }


// export const LOGIN_TOKEN = (state, message) => {
//   state.token = message
// }

export const GET_USER_ONLINE =(state, tableau)=>{
    state.on_line_user = tableau
}
export const GET_ALL_UTILISATEUR =(state, tableau)=>{
    state.utilisateur = tableau
}

export const AJOUTER_UTILISATEUR =(state, nouveau)=>{
    state.utilisateur.unshift(nouveau)
}

export const MODIFIER_UTILISATEUR = (state, objetModifie) => {
    state.utilisateur = state.utilisateur.map(elt => {
      if (elt.id == objetModifie.id) {
        elt = { ...objetModifie };
      }
  
      return elt;
    });
  };

  export const SUPPRIMER_UTILISATEUR = (state, id) => {
    state.utilisateur = state.utilisateur.filter(prest => prest.id != id)
}

export const MODIFIER_UTILISATEUR_ENCOURS = (state, objetModifie) => {
  state.utilisateur = state.utilisateur.map(elt => {
    if (elt.id == objetModifie.id) {
      elt = { ...objetModifie };
    }

    return elt;
  });
};


//MUTATION AFFECTATION
export const GET_AFFECTATION =(state, tableau)=>{
    state.affectation = tableau
}

export const AJOUTER_AFFECTATION =(state, nouveau)=>{
    state.affectation.unshift(nouveau)
}

export const MODIFIER_AFFECTATION = (state, objetModifie) => {
    state.affectation = state.affectation.map(elt => {
      if (elt.id == objetModifie.id) {
        elt = { ...objetModifie };
      }
  
      return elt;
    });
  };

  export const SUPPRIMER_AFFECTATION = (state, id) => {
    state.affectation = state.affectation.filter(prest => prest.id != id)
}

export const MODIFIER_AFFECTATION_ENCOURS = (state, objetModifie) => {
  state.affectation = state.affectation.map(elt => {
    if (elt.id == objetModifie.id) {
      elt = { ...objetModifie };
    }

    return elt;
  });
};

//MUTATION DU ROLE
export const GET_ROLE =(state, tableau)=>{
  state.role = tableau
}

export const AJOUTER_ROLE =(state, nouveau)=>{
  state.role.unshift(nouveau)
}

export const MODIFIER_ROLE = (state, objetModifie) => {
  state.role = state.role.map(elt => {
    if (elt.id == objetModifie.id) {
      elt = { ...objetModifie };
    }

    return elt;
  });
};

export const SUPPRIMER_ROLE = (state, id) => {
  state.role = state.role.filter(prest => prest.id != id)
}

//MUTATION PERMISSION
export const GET_PERMISSION =(state, tableau)=>{
    state.permission = tableau
}

export const AJOUTER_PERMISSION =(state, nouveau)=>{
    state.permission.unshift(nouveau)
}

export const MODIFIER_PERMISSION = (state, objetModifie) => {
    state.permission = state.permission.map(elt => {
      if (elt.id == objetModifie.id) {
        elt = { ...objetModifie };
      }
  
      return elt;
    });
  };

  export const SUPPRIMER_PERMISSION = (state, id) => {
    state.permission = state.permission.filter(prest => prest.id != id)
}

