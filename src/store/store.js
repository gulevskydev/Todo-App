import Vue from 'vue';
import Vuex from 'vuex';

// Store imports
import mutations from './mutations';
import actions from './actions';
import getters from './getters';

Vue.use(Vuex);

export const store = new Vuex.Store({
  /* eslint-disable */
  state: {
    inputTask: '',
    isOpenMenuButton: false,
    popupIsOpen: false,
    tasks: [
      {
        name: 'Сегодня',
        id: 1,
        todos: [
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
      {
        name: 'Завтра',
        id: 2,
        todos: [],
      },
      {
        name: 'След. Неделя',
        id: 3,
        todos: [],
      },
      {
        name: 'Потом',
        id: 4,
        todos: [],
      },
    ],
  },

  mutations,

  actions,

  getters,

  // use strict mode only in production
  strict: process.env.NODE_ENV !== 'production',
});
