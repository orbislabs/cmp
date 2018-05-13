import Vue from 'vue';
import Vuikit from 'vuikit';
import './eventBus';
import App from './App.vue';
import Modal from './Modal.vue';
import Purposes from './Purposes.vue';
import Vendors from './Vendors.vue';
import '@vuikit/theme';

Vue.use(Vuikit);

Vue.component('Modal', Modal);
Vue.component('Purposes', Purposes);
Vue.component('Vendors', Vendors);


function renderVueApp() {
  return new Promise((resolve, reject) => {

    let div = document.createElement("div");
    div.setAttribute('id', 'app');
    document.body.appendChild(div);

      const vm = new Vue({
        el: '#app',
        render: h => h(App),
        created() {
            this.$bus.$on('full-consent', function() {
              console.log(`CMP-UI :: Promise Resolved: Full Consent`);
              resolve('fullConsent');
              this.$bus.$emit('ui-close', 'fullConsent');
            });
            this.$bus.$on('partial-consent', function(selection) {
              console.log(`CMP-UI :: Promise Resolved: ${selection}`);
              resolve(selection);
              this.$bus.$emit('ui-close', selection);
            });
          }
      });

    });
};


/* const vm = new Vue({
  el : '#app',
  render : h => h(App),
  created () {
    this.$bus.$on('full-consent', function () {
      //      
});
    this.$bus.$on('user-selection', function (selection) {
      resolve(selection);
    });
  }
}); */

/* let div = document.createElement("div");
div.setAttribute('id', 'app');
document.body.appendChild(div);

const InputUI = {
  el : '#app',
  render : h => h(App),
};

const ui = new Vue(InputUI); */



export default renderVueApp;