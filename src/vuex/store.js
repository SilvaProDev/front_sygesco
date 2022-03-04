import Vue from "vue";
import Vuex from "vuex";

import parametres from "./modules/parametres/index"
import students from "./modules/student/index"
import personnels from "./modules/personnel/index"
Vue.use(Vuex);


export default new Vuex.Store({
   modules:{
       parametres:parametres,
       student:students,
       personnel:personnels,
   }
})