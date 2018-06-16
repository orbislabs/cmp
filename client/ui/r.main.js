//import app from './App.vue';
import Vue from 'vue';
import App from './App.vue';

export default function fetchAppFromServer() {
    console.log('calling me')
    Vue.component('App', () => import(/* webpackChunkName: "ui" */ './App.vue')
        .then(app => console.log('here I am!', app))
    );
    
    createDivForMount(); // this makes <div id="cmp-app"></div>

    const vm = new Vue(App).$mount('#cmp-app');
}

function createDivForMount() {
    const divForMount = document.createElement('div');
    divForMount.setAttribute('id', 'cmp-app');
    document.body.appendChild(divForMount);
    console.log(divForMount);
    Promise.resolve(divForMount);
}



