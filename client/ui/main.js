import Vue from 'vue';
import Vuikit from 'vuikit';

// import and make global all components
import App from './App.vue';
import Modal from './components/Modal.vue';
import Purposes from './components/Purposes.vue';
import Vendors from './components/Vendors.vue';
import Breadcrumb from './components/Breadcrumb.vue';
import Toggle from './components/Toggle.vue';

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
Vue.component('cmp-toggle', Toggle);


// CODE TO CREATE IFRAME
/* const frame = document.createElement('iframe');
frame.setAttribute('id', 'myFrame');
frame.setAttribute('style', 'width:50%;height:50%;overflow:auto;background-color:azure');
document.body.appendChild(frame);
console.log(window.frames.myFrame.contentWindow.document.getElementsByTagName('body')[0]);
const iFrameBody = window.frames.myFrame.contentWindow.document.getElementsByTagName('body')[0];        
const div2 = document.createElement('div');
div2.setAttribute('id', 'cmp-app');
iFrameBody.appendChild(div2);
const vm = new Vue(App).$mount();
iFrameBody.appendChild(vm.$el); */



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
      vm.show = true;
      vm.$bus.$on('save-selection', value => {
        console.log(`CMP-UI :: Resolving Promise (save-selection): ${JSON.stringify(value)}`);
        resolve(value);
      });
    } else {
      console.error(`CMP-UI :: No App Present`);
    }
  });
}

export default renderVueApp;

