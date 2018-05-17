import Vue from 'vue';
import Vuikit from 'vuikit';

// import and make global all components
import App from './App.vue';
import Modal from './components/Modal.vue';
import Purposes from './components/Purposes.vue';
import Vendors from './components/Vendors.vue';
import Breadcrumb from './components/Breadcrumb.vue';

import './eventBus';
import '@vuikit/theme';
import '../../cookie/cookieutils.js';

Vue.use(Vuikit);

// registering all components globally
Vue.component('Modal', Modal);
Vue.component('Purposes', Purposes);
Vue.component('Vendors', Vendors);
Vue.component('app-breadcrumb', Breadcrumb);
Vue.component('app-init', App);

// creating a root in the DOM for the app to attach to, when called
const div = document.createElement('div');
div.setAttribute('id', 'cmp-app');
document.body.appendChild(div);

// create the app instance and attach it to the DOM in a hidden state
const vm = new Vue(App).$mount('#cmp-app');

// this function is called to load the UI, it accepts the clientId
function renderVueApp (clientId) {
  return new Promise((resolve, reject) => {
    if (vm) {
      vm.$store.commit('setClientId', 1);
      vm.show = true;
      vm.$bus.$on('save-selection', value => {
        console.log(`CMP-UI :: Resolving Promise (save-selection): ${JSON.stringify(value)}`);
        resolve(vm.consentObject);
      });
    } else {
      console.error(`CMP-UI :: No App Present`);
    }
  });
}

export default renderVueApp;