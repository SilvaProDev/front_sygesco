import { groupBy } from "../../../Repositorie/Repository";

export const GetterStudent = state => state.student;
export const GetterNote = state => state.note;
export const GetterCantine = state => state.cantine;
export const GetterAbsence = state => state.absence;
export const GetterScolarite = state => state.scolarite;

export const gettersloadingScolarite = state =>state.loadingScolarite;
export const gettersloadingCantine = state =>state.loadingCantine;
export const gettersloadingStudent = state =>state.loadingStudent;

export const groupeNoteEtudiant = (state, getters) => {
    //delete getters.trieUaImmobilisation.
    return groupBy(getters.GetterNote, "student_id");
  };