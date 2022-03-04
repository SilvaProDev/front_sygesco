import Vue from 'vue'
import App from './App.vue'
import VueAxios from 'vue-axios'
import VueRouter from 'vue-router'
import router from "./routes"
import store from "./vuex/store"
import vuetify from "./plugins/vuetify.js"
import Vuelidate from 'vuelidate'
import VuejsDialog from 'vuejs-dialog';
import 'vuejs-dialog/dist/vuejs-dialog.min.css';
import axios from 'axios'
import 'bootstrap'
import './../node_modules/jquery/dist/jquery.min.js';
import './../node_modules/bootstrap/dist/js/bootstrap.min.js';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import Notifications from 'vue-notification'
import VueLoading from 'vuejs-loading-plugin'
import Datatable from 'vue2-datatable-component'
import VueTableDynamic from 'vue-table-dynamic'
import VueHtmlToPaper from 'vue-html-to-paper';
import { VuejsDatatableFactory } from 'vuejs-datatable';
import XLSX from 'xlsx'
// import VueI18n from 'vue-i18n'
import i18n from './i18n'
import money from 'v-money'
import VueApexCharts from 'vue-apexcharts'
import JsonExcel from "vue-json-excel";
import Loader from "@/components/Loader.vue"
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';


Vue.use(Loading);
Vue.component('Loader', Loader)
Vue.component("downloadExcel", JsonExcel);
Vue.use(VueApexCharts)


const money_option = {
  decimal: ',',
  thousands: ' ',
  prefix: ' ',
  suffix: ' ',
  precision: 0,
  masked: false
}

Vue.use(money, money_option)
// Vue.use(VueI18n)
Vue.use(XLSX)
Vue.use( VuejsDatatableFactory );
Vue.config.productionTip = false
Vue.use(VueTableDynamic)
Vue.use(VueHtmlToPaper, options);
Vue.use(Datatable)
Vue.use(Notifications)
Vue.use(require('vue-moment'));
// Vue.use(VueLoading)
Vue.use(VuejsDialog, {
  html: true,
  loader: true,
  okText: 'Continuer',
  cancelText: 'Annuler',
  animation: 'bounce'
});
Vue.use(VueLoading, {
  dark: true, // default false
  text: 'Patientez ...', // default 'Loading'
  //loading: true, // default false
  // background: 'rgb(255,255,255)', // set custom background
})
const options = {
  name: '_blank',
  specs: [
    'fullscreen=yes',
    'titlebar=yes',
    'scrollbars=yes'
  ],
  styles: [
    'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css',
    'https://unpkg.com/kidlat-css/css/kidlat.css',
    "http://sidcf.agosoftprojet.com/lien/css/matrix-style.css"
  ]
}
Vue.use(VueLoading, {
  dark: true, // default false
  text: 'Patientez ...', // default 'Loading'
  
});
Vue.use(require('vue-shortkey'))
Vue.use(VueRouter)
Vue.use(Vuelidate)
Vue.use(VueAxios, axios)

// use beforeEach route guard to set the language
router.beforeEach((to, from, next) => {

  // use the language from the routing param or default language
  let language = to.params.lang;
  if (!language) {
    language = 'en'
  }

  // set the current language for i18n.
  i18n.locale = language
  next()
})


const app =new Vue({
  render: h => h(App),
  router,
  vuetify,
  store,
  i18n,
}).$mount('#app');
store.$app = app;
