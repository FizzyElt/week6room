import './assets/css/normalize.css'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import vueaxios from 'vue-axios'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faWifi, faCoffee, faWineGlassAlt, faConciergeBell, faPhone, faWind, faDoorClosed, faCouch, faMountain, faSmoking, faBaby, faDog, faTv, faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faWifi,faCoffee,faWineGlassAlt,faConciergeBell,faTv,faWind,faDoorClosed,faCouch,faMountain,faSmoking,faBaby,faDog,faCheckCircle);
Vue.component('font-awesome-icon', FontAwesomeIcon);
Vue.config.productionTip = false
Vue.use(vueaxios,axios);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
