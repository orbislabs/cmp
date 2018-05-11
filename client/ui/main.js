import Vue from 'vue';
import Vuikit from 'vuikit';
import App from './App.vue';
import Modal from './Modal.vue';
import Purposes from './Purposes.vue';
import '@vuikit/theme';

Vue.use(Vuikit);

Vue.component('Modal', Modal);
Vue.component('Purposes', Purposes);

let div = document.createElement("div");
div.setAttribute('id', 'app');
document.body.appendChild(div);

new Vue({
  el : '#app',
  render : h => h(App)
});