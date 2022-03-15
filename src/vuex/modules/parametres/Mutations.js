export const SET_LOADING_ENTETE =(state, tableau)=>{
    state.loadingconfigEntete = tableau
}
export const GET_ALL_ANNEE =(state, tableau)=>{
    state.anne = tableau
}
export const SET_LOADING_ALL_ANNEE =(state, tableau)=>{
    state.loadingYear = tableau
}
export const SET_LOADING_TRANSPORT =(state, tableau)=>{
    state.loadingTransport = tableau
}

export const AJOUTER_ANNEE =(state, nouveau)=>{
    state.anne.unshift(nouveau)
}

export const MODIFIER_ANNEE = (state, objetModifie) => {
    state.anne = state.anne.map(elt => {
      if (elt.id == objetModifie.id) {
        elt = { ...objetModifie };
      }
  
      return elt;
    });
  };

  export const SUPPRIMER_ANNEE = (state, id) => {
    state.anne = state.anne.filter(prest => prest.id != id)
}

export const MODIFIER_ANNEE_ENCOURS = (state, objetModifie) => {
  state.anne = state.anne.map(elt => {
    if (elt.id == objetModifie.id) {
      elt = { ...objetModifie };
    }

    return elt;
  });
};

//MUTATION DU BILAN
export const GET_ALL_BILAN =(state, tableau)=>{
  state.bilan = tableau
}

export const AJOUTER_BILAN =(state, nouveau)=>{
  state.bilan.unshift(nouveau)
}

export const MODIFIER_BILAN = (state, objetModifie) => {
  state.bilan = state.bilan.map(elt => {
    if (elt.id == objetModifie.id) {
      elt = { ...objetModifie };
    }

    return elt;
  });
};

export const SUPPRIMER_BILAN = (state, id) => {
  state.bilan = state.bilan.filter(prest => prest.id != id)
}

//MUTATION DU NIVEAU
export const GET_ALL_NIVEAU =(state, tableau)=>{
  state.niveau = tableau
}

export const AJOUTER_NIVEAU =(state, nouveau)=>{
  state.niveau.unshift(nouveau)
}

export const MODIFIER_NIVEAU = (state, objetModifie) => {
  state.niveau = state.niveau.map(elt => {
    if (elt.id == objetModifie.id) {
      elt = { ...objetModifie };
    }

    return elt;
  });
};

export const SUPPRIMER_NIVEAU = (state, id) => {
  state.niveau = state.niveau.filter(prest => prest.id != id)
}

//MUTATION DE LA CLASSE
export const GET_ALL_CLASSE =(state, tableau)=>{
  state.classe = tableau
}

export const AJOUTER_CLASSE =(state, nouveau)=>{
  state.classe.unshift(nouveau)
}

export const MODIFIER_CLASSE = (state, objetModifie) => {
  state.classe = state.classe.map(elt => {
    if (elt.id == objetModifie.id) {
      elt = { ...objetModifie };
    }

    return elt;
  });
};

export const SUPPRIMER_CLASSE = (state, id) => {
  state.classe = state.classe.filter(prest => prest.id != id)
}


  //MUTATION DE TRIMESTRE

export const GET_ALL_SEMESTRE =(state, tableau)=>{
  state.trimestre = tableau
}

export const AJOUTER_SEMESTRE =(state, nouveau)=>{
  state.trimestre.unshift(nouveau)
}

export const MODIFIER_SEMESTRE = (state, objetModifie) => {
  state.trimestre = state.trimestre.map(elt => {
    if (elt.id == objetModifie.id) {
      elt = { ...objetModifie };
    }

    return elt;
  });
};

export const SUPPRIMER_SEMESTRE = (state, id) => {
  state.trimestre = state.trimestre.filter(prest => prest.id != id)
}

export const MODIFIER_SEMESTRE_ENCOURS = (state, objetModifie) => {
state.trimestre = state.trimestre.map(elt => {
  if (elt.id == objetModifie.id) {
    elt = { ...objetModifie };
  }

  return elt;
});
};



//MUTATION DE LA MATIERE
export const GET_ALL_MATIERE =(state, tableau)=>{
  state.matiere = tableau
}

export const AJOUTER_MATIERE =(state, nouveau)=>{
  state.matiere.unshift(nouveau)
}

export const MODIFIER_MATIERE = (state, objetModifie) => {
  state.matiere = state.matiere.map(elt => {
    if (elt.id == objetModifie.id) {
      elt = { ...objetModifie };
    }

    return elt;
  });
};

export const SUPPRIMER_MATIERE = (state, id) => {
  state.EnvoiEmail = state.EnvoiEmail.filter(prest => prest.id != id)
}

//MUTATION DE LA MATIERE
export const GET_ALL_NOUVELLE_MATIERE =(state, tableau)=>{
  state.nouvelle_matiere = tableau
}

export const AJOUTER_NOUVELLE_MATIERE =(state, nouveau)=>{
  state.nouvelle_matiere.unshift(nouveau)
}

export const MODIFIER_NOUVELLE_MATIERE = (state, objetModifie) => {
  state.nouvelle_matiere = state.nouvelle_matiere.map(elt => {
    if (elt.id == objetModifie.id) {
      elt = { ...objetModifie };
    }

    return elt;
  });
};

export const SUPPRIMER_NOUVELLE_MATIERE = (state, id) => {
  state.nouvelle_matiere = state.nouvelle_matiere.filter(prest => prest.id != id)
}



//MUTATION ENVOI D'EMAIL
export const GET_ALL_EMAIL =(state, tableau)=>{
  state.EnvoiEmail = tableau
}

export const AJOUTER_EMAIL =(state, nouveau)=>{
  state.EnvoiEmail.unshift(nouveau)
}

export const MODIFIER_EMAIL = (state, objetModifie) => {
  state.EnvoiEmail = state.EnvoiEmail.map(elt => {
    if (elt.id == objetModifie.id) {
      elt = { ...objetModifie };
    }

    return elt;
  });
};

export const SUPPRIMER_EMAIL = (state, id) => {
  state.EnvoiEmail = state.EnvoiEmail.filter(prest => prest.id != id)
}

//MUTATION ENVOI DE SMS
export const GET_ALL_SMS =(state, tableau)=>{
  state.EnvoiSms = tableau
}

export const AJOUTER_SMS =(state, nouveau)=>{
  state.EnvoiSms.unshift(nouveau)
}

export const MODIFIER_SMS = (state, objetModifie) => {
  state.EnvoiSms = state.EnvoiSms.map(elt => {
    if (elt.id == objetModifie.id) {
      elt = { ...objetModifie };
    }

    return elt;
  });
};

export const SUPPRIMER_SMS = (state, id) => {
  state.EnvoiSms = state.EnvoiSms.filter(prest => prest.id != id)
}


//MUTATION DU TRANSPORT
export const GET_TRANSPORT =(state, tableau)=>{
  state.transport = tableau
}

export const AJOUTER_TRANSPORT =(state, nouveau)=>{
  state.transport.unshift(nouveau)
}

export const MODIFIER_TRANSPORT = (state, objetModifie) => {
  state.transport = state.transport.map(elt => {
    if (elt.id == objetModifie.id) {
      elt = { ...objetModifie };
    }

    return elt;
  });
};

export const SUPPRIMER_TRANSPORT = (state, id) => {
  state.configEntete = state.configEntete.filter(prest => prest.id != id)
}

//MUTATION DE LA CONFIGURATION DE L'ENTETE
export const GET_CONFIG_ENTETE =(state, tableau)=>{
  state.configEntete = tableau
}

export const AJOUTER_CONFIG_ENTETE =(state, nouveau)=>{
  state.configEntete.unshift(nouveau)
}

export const MODIFIER_CONFIG_ENTETE = (state, objetModifie) => {
  state.configEntete = state.configEntete.map(elt => {
    if (elt.id == objetModifie.id) {
      elt = { ...objetModifie };
    }

    return elt;
  });
};

export const SUPPRIMER_CONFIG_ENTETE = (state, id) => {
  state.configEntete = state.configEntete.filter(prest => prest.id != id)
}




//MUTATION DE L ACCUEIL
export const GET_ACCUEIL =(state, tableau)=>{
  state.accueil = tableau
}

export const AJOUTER_ACCUEIL =(state, nouveau)=>{
  state.accueil.unshift(nouveau)
}

export const MODIFIER_ACCUEIL = (state, objetModifie) => {
  state.accueil = state.accueil.map(elt => {
    if (elt.id == objetModifie.id) {
      elt = { ...objetModifie };
    }

    return elt;
  });
};
export const ACTIVE_ACCUEIL = (state, objetModifie) => {
  state.accueil = state.accueil.map(elt => {
    if (elt.id == objetModifie.id) {
      elt = { ...objetModifie };
    }

    return elt;
  });
};

export const SUPPRIMER_ACCUEIL = (state, id) => {
  state.accueil = state.accueil.filter(prest => prest.id != id)
}

//MUTATION DU LIVRET
export const GET_LIVRET =(state, tableau)=>{
  state.livret = tableau
}

export const AJOUTER_LIVRET =(state, nouveau)=>{
  state.livret.unshift(nouveau)
}

export const MODIFIER_LIVRET = (state, objetModifie) => {
  state.livret = state.livret.map(elt => {
    if (elt.id == objetModifie.id) {
      elt = { ...objetModifie };
    }

    return elt;
  });
};


export const SUPPRIMER_LIVRET = (state, id) => {
  state.livret = state.livret.filter(prest => prest.id != id)
}

//MUTATION DE LA CONFIG
export const GET_CONFIG_LIVRET =(state, tableau)=>{
  state.Configlivret = tableau
}

export const AJOUTER_CONFIG_LIVRET =(state, nouveau)=>{
  state.Configlivret.unshift(nouveau)
}

export const MODIFIER_CONFIG_LIVRET = (state, objetModifie) => {
  state.Configlivret = state.Configlivret.map(elt => {
    if (elt.id == objetModifie.id) {
      elt = { ...objetModifie };
    }

    return elt;
  });
};


export const SUPPRIMER_CONFIG_LIVRET = (state, id) => {
  state.Configlivret = state.Configlivret.filter(prest => prest.id != id)
}

//MUTATION DE LA CONFIG
export const GET_COMPETENCE_LIVRET =(state, tableau)=>{
  state.Competencelivret = tableau
}

export const AJOUTER_COMPETENCE_LIVRET =(state, nouveau)=>{
  state.Competencelivret.unshift(nouveau)
}

export const MODIFIER_COMPETENCE_LIVRET = (state, objetModifie) => {
  state.Competencelivret = state.Competencelivret.map(elt => {
    if (elt.id == objetModifie.id) {
      elt = { ...objetModifie };
    }

    return elt;
  });
};


export const SUPPRIMER_COMPETENCE_LIVRET = (state, id) => {
  state.Competencelivret = state.Competencelivret.filter(prest => prest.id != id)
}