import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import VueApexCharts from 'vue-apexcharts'

Vue.config.productionTip = false

//Charts
Vue.use(VueApexCharts)

Vue.component('apexchart', VueApexCharts)

//SweetAlert
Vue.use(VueSweetalert2);

new Vue({
  router,
  vuetify,
  render: h => h(App),
}).$mount('#app')
