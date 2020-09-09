import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import '@mdi/font/css/materialdesignicons.min.css';
import 'animate.css/animate.min.css';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  // eslint-disable-next-line
  vuetify,
  render: h => h(App),
}).$mount('#app');
