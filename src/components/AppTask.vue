<template>
  <div
    class="task__container flex justify-center flex-col items-start w-3/5 px-12"
  >
    <div class="task__wrapper flex flex-col justify-center content-start">
      <h2 class="task__day font-bold my-4 uppercase text-left">Сегодня</h2>
      <div v-for="task of storeOfTasks" :key="task.id">
        <app-task-item :data="task.data"> </app-task-item>
      </div>

      <h2 class="task__day font-bold my-4 uppercase text-left">Завтра</h2>
      <h2 class="task__day font-bold my-4 uppercase text-left">След. неделя</h2>
      <h2 class="task__day font-bold my-4 uppercase text-left">Потом</h2>
    </div>
    <div class="input__container flex items-center w-full">
      <input
        v-model="inputTask"
        type="text"
        placeholder="Введите задачу, которую хотите добавить"
        class="input__input mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
      />

      <div
        class="input__add-task flex justify-center overflow-hidden content-center ml-4 relative bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center"
        @click="addTask"
      >
        <svg width="15" height="17" viewBox="0 0 15 17">
          <path
            fill="#fff"
            d="M8.438 3.563l4.593 4.593a.928.928 0 001.312-1.313L8.16.66a.933.933 0 00-1.32 0L.656 6.844a.928.928 0 001.312 1.313l4.595-4.594v10.504c0 .515.417.933.933.933h.008a.933.933 0 00.934-.933V3.563z"
          ></path>
        </svg>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import AppTaskItem from './AppTaskItem';
import { uuid } from '../utils';

export default {
  name: 'AppTask',

  components: { AppTaskItem },

  data: function () {
    return {
      count: 0,
    };
  },

  computed: {
    ...mapGetters(['storeInputTask', 'storeOfTasks']),

    inputTask: {
      get() {
        return this.storeInputTask;
      },

      set(value) {
        this.updateInputTask(value);
      },
    },
  },

  methods: {
    ...mapActions({
      updateInputTask: 'updateInputTask',
      addNewTask: 'addNewTask',
    }),

    addTask() {
      this.addNewTask({
        id: uuid(),
        data: this.inputTask,
      });

      this.clearInput();
    },

    clearInput() {
      this.updateInputTask('');
    },
  },
};
</script>

<style lang="scss" scoped>
@tailwind base;
@tailwind components;
@tailwind utilities;

.input {
  &__input {
    color: #000;
  }

  &__add-task {
    width: 38px;
    height: 38px;
    cursor: pointer;
  }
}
</style>
