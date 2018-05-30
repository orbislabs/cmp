import Vue from 'vue';
import Vuikit from 'vuikit';

// import and make global all components
import App from './App.vue';
import Modal from './components/Modal.vue';
import Purposes from './components/Purposes.vue';
import Vendors from './components/Vendors.vue';
import Breadcrumb from './components/Breadcrumb.vue';
import Toggle from './components/Toggle.vue';

import EventBus from './eventBus';
import './uikit.css';
//import '@vuikit/theme'; TODO: this can be removed, right now we are using scoped CSS file from uikit
import '../../cookie/cookieutils.js';

Vue.use(Vuikit);

// registering all components globally
Vue.component('Modal', Modal);
Vue.component('Purposes', Purposes);
Vue.component('Vendors', Vendors);
Vue.component('app-breadcrumb', Breadcrumb);
Vue.component('app-init', App);
Vue.component('cmp-toggle', Toggle);

// creating a root in the DOM for the app to attach to, when called
const divToAttachApp = document.createElement('div');
divToAttachApp.setAttribute('id', 'cmp-app');
document.body.appendChild(divToAttachApp);

// create the app instance and attach it to the DOM in a hidden state
const vm = new Vue(App).$mount('#cmp-app');

// this function is called to load the UI, it accepts the clientId
function renderVueApp (clientId) {
  return new Promise((resolve, reject) => {
    if (vm) {
      vm.$store.commit('setClientId', parseInt(clientId));
      vm.$store.commit('syncClientDefaultsToUserObject', vm.$store.getters.getCurrentClientConfig.defaults);
      vm.$store.commit('changeShowState', true)
      EventBus.$on('save-selection', value => {
        console.log(`CMP-UI :: Resolving Promise (save-selection): ${JSON.stringify(value)}`);
        resolve(value);
      });
    } else {
      console.error(`CMP-UI :: No App Present`);
    }
  });
}

export default renderVueApp;
