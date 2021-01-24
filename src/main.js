import Vue from 'vue';
import App from './App.vue';
import store from './store/store';

import './assets/css/reset.css';
import './assets/css/base.scss';

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  render: (h) => h(App),
});

// TODO закончить основной функционал для app task
// 1. Добавить vuex
// 2. Добавить AppTaskItem, который будет рендерить каждую задачу
//    добавленные задачи будут сразу рендериться в колонке Сегодня, потом их можно будет перетаскивать
// 3. Сделать логику для взаимодейсвтия со стором vuex
// 4. Привести стили в более менее приятный вид
