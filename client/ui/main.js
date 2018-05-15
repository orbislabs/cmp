import Vue from 'vue';
import Vuikit from 'vuikit';
import './eventBus';
import App from './App.vue';
import Modal from './components/Modal.vue';
import Purposes from './components/Purposes.vue';
import Vendors from './components/Vendors.vue';
import Breadcrumb from './components/Breadcrumb.vue';
import '@vuikit/theme';

Vue.use(Vuikit);

Vue.component('Modal', Modal);
Vue.component('Purposes', Purposes);
Vue.component('Vendors', Vendors);
Vue.component('app-breadcrumb', Breadcrumb);
Vue.component('app-init', App);

const div = document.createElement('div');
div.setAttribute('id', 'cmp-app');
document.body.appendChild(div);

const vm = new Vue(App).$mount('#cmp-app');

function renderVueApp () {
  return new Promise((resolve, reject) => {
    if (vm) {
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
