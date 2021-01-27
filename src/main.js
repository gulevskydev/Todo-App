import Vue from 'vue';
import App from './App.vue';
import { store } from './store/store';

import './assets/css/reset.css';
import './assets/css/base.scss';

Vue.config.productionTip = false;
/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  render: (h) => h(App),
});
