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
    inputSubTask: [{ id: 1, input: '' }],
    completedSubtasks: [false],
    tags: [
      { id: 1, name: 'Работа', active: true },
      { id: 2, name: 'Хобби', active: false },
    ],
    completedTasks: [],
    isOpenMenuButton: false,
    popupIsOpen: false,
    isTagsPopupOpen: false,
    editPopupIsOpen: false,
    showCompletedTasks: true,
    editingTask: {},
    tasks: [
      {
        name: 'Сегодня',
        id: 1,
        todos: [],
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
