import Vue from 'vue';
import Vuikit from 'vuikit';
import './eventBus';
import App from './App.vue';
import Modal from './Modal.vue';
import Purposes from './Purposes.vue';
import '@vuikit/theme';

Vue.use(Vuikit);

Vue.component('Modal', Modal);
Vue.component('Purposes', Purposes);

function renderVueApp () {
  return new Promise ((resolve, reject) => {

    let div = document.createElement("div");
    div.setAttribute('id', 'app');
    document.body.appendChild(div);

    const vm = new Vue({
      el : '#app',
      render : h => h(App),
      created () {
        this.$bus.$on('full-consent', function () {
          resolve('fullConsent');
        });
        this.$bus.$on('user-selection', function (selection) {
          resolve(selection);
        });
      }
    });
    
  });
};

export default renderVueApp;