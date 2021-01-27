<template>
  <div
    class="task__container flex justify-center flex-col items-start w-3/5 px-12"
  >
    <div>
      <div
        v-for="(column, $columnIndex) of tasks"
        :key="column.id"
        class="task__day font-bold my-4 uppercase text-left"
        @drop="moveTask($event, column.todos)"
        @dragover.prevent
        @dragenter.prevent
      >
        <h2 class="task__wrapper flex flex-col justify-center content-start">
          {{ column.name }}
        </h2>

        <div
          v-for="(task, $taskIndex) of column.todos"
          :key="task.id"
          draggable
          @dragstart="takeTask($event, $taskIndex, $columnIndex)"
        >
          <app-task-item :data="task.data"> </app-task-item>
        </div>
      </div>

      <!-- <h2 class="task__day font-bold my-4 uppercase text-left">Завтра</h2>
      <h2 class="task__day font-bold my-4 uppercase text-left">След. неделя</h2>
      <h2 class="task__day font-bold my-4 uppercase text-left">Потом</h2> -->
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
      columns: ['Сегодня', 'Завтра', 'След. неделя', 'Потом'],
    };
  },

  computed: {
    ...mapGetters(['storeInputTask', 'tasks']),

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
      moveTaskInDays: 'moveTaskInDays',
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

    takeTask(e, taskIndex, fromColumn) {
      e.dataTransfer.effectAllowed = 'move';
      e.dataTransfer.dropEffect = 'move';
      console.log('DRAG');

      e.dataTransfer.setData('task-index', taskIndex);
      e.dataTransfer.setData('from-column', fromColumn);
    },

    moveTask(e, toTask) {
      const fromColumnIndex = e.dataTransfer.getData('from-column');
      const taskIndex = e.dataTransfer.getData('task-index');
      const fromTasks = this.tasks[fromColumnIndex].todos;
      console.log(fromTasks, 'fromTasks', toTask, 'toTasks', taskIndex);

      this.moveTaskInDays({ fromTasks, toTask, taskIndex });
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
