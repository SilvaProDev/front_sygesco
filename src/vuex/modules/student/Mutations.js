
export const SET_LOADING_SCOLARITE =(state, tableau)=>{
  state.loadingScolarite = tableau
}
export const SET_LOADING_CANTINE =(state, tableau)=>{
  state.loadingCantine = tableau
}
export const SET_LOADING_STUDENT =(state, tableau)=>{
  state.loadingStudent = tableau
}


//MUTATION STUDENT

//MUTATION DE LA CLASSE
export const GET_ALL_STUDENT =(state, tableau)=>{
  state.student = tableau
}

export const AJOUTER_STUDENT =(state, nouveau)=>{
  state.student.unshift(nouveau)
}
export const IMPORT_STUDENT =(state, nouveau)=>{
  state.student.unshift(nouveau)
}

export const MODIFIER_STUDENT = (state, objetModifie) => {
  state.student = state.student.map(elt => {
    if (elt.id == objetModifie.id) {
      elt = { ...objetModifie };
    }

    return elt;
  });
};

export const SUPPRIMER_STUDENT = (state, id) => {
  state.student = state.student.filter(prest => prest.id != id)
}
//MUTATION DE LA NOTE
export const GET_ALL_NOTE =(state, tableau)=>{
  state.note = tableau
}

export const AJOUTER_NOTE =(state, nouveau)=>{
  state.note.unshift(nouveau)
}

export const MODIFIER_NOTE = (state, objetModifie) => {
  state.note = state.note.map(elt => {
    if (elt.id == objetModifie.id) {
      elt = { ...objetModifie };
    }

    return elt;
  });
};

export const SUPPRIMER_NOTE = (state, id) => {
  state.note = state.note.filter(prest => prest.id != id)
}




//MUTATION DE LA CANTINE
export const GET_LISTE_CANTINE =(state, tableau)=>{
  state.cantine = tableau
}

export const AJOUTER_CANTINE =(state, nouveau)=>{
  state.cantine.unshift(nouveau)
}

export const MODIFIER_CANTINE = (state, objetModifie) => {
  state.cantine = state.cantine.map(elt => {
    if (elt.id == objetModifie.id) {
      elt = { ...objetModifie };
    }

    return elt;
  });
};

export const SUPPRIMER_CANTINE = (state, id) => {
  state.cantine = state.cantine.filter(prest => prest.id != id)
}


//MUTATION DE L ABSENCE
export const GET_LISTE_ABSENCE =(state, tableau)=>{
  state.absence = tableau
}

export const AJOUTER_ABSENCE =(state, nouveau)=>{
  state.absence.unshift(nouveau)
}

export const MODIFIER_ABSENCE = (state, objetModifie) => {
  state.absence = state.absence.map(elt => {
    if (elt.id == objetModifie.id) {
      elt = { ...objetModifie };
    }

    return elt;
  });
};

export const SUPPRIMER_ABSENCE = (state, id) => {
  state.absence = state.absence.filter(prest => prest.id != id)
}



//MUTATION DE LA SCOLARITE
export const GET_LISTE_SCOLARITE =(state, tableau)=>{
  state.scolarite = tableau
}

export const AJOUTER_SCOLARITE =(state, nouveau)=>{
  state.scolarite.unshift(nouveau)
}

export const MODIFIER_SCOLARITE = (state, objetModifie) => {
  state.scolarite = state.scolarite.map(elt => {
    if (elt.id == objetModifie.id) {
      elt = { ...objetModifie };
    }

    return elt;
  });
};

export const SUPPRIMER_SCOLARITE = (state, id) => {
  state.scolarite = state.scolarite.filter(prest => prest.id != id)
}