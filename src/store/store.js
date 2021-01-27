import Vue from 'vue';
import Vuex from 'vuex';

// Store imports
import mutations from './mutations';
import actions from './actions';
import getters from './getters';

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    inputTask: '',
    storeOfTasks: [
      {
        id: 1,
        data: 'Купить молоко',
      },
      {
        id: 2,
        data: 'Купить сок',
      },
    ],
  },

  mutations,

  actions,

  getters,

  // use strict mode only in production
  strict: process.env.NODE_ENV !== 'production',
});
