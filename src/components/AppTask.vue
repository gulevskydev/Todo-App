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
          @dragover.prevent
          @dragenter.prevent
          @drop.stop="moveTask($event, column.todos, $taskIndex)"
          @dragstart="takeTask($event, $taskIndex, $columnIndex)"
        >
          <app-task-item :data="task.mainTask"> </app-task-item>
          <div v-for="subTask of task.subTasks" :key="subTask.id">
            <app-subtask-item :data="subTask.input"></app-subtask-item>
          </div>
        </div>
      </div>
    </div>

    <app-main-button></app-main-button>

    <app-task-modal></app-task-modal>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

// Components import
import AppTaskItem from './AppTaskItem';
import AppTaskModal from './AppTaskModal';
import AppMainButton from './AppMainButton';
import AppSubtaskItem from './AppSubtaskItem';

export default {
  name: 'AppTask',

  components: { AppTaskItem, AppTaskModal, AppMainButton, AppSubtaskItem },

  data: function () {
    return {
      count: 0,
      columns: ['Сегодня', 'Завтра', 'След. неделя', 'Потом'],
    };
  },

  computed: {
    ...mapGetters(['tasks']),
  },

  methods: {
    ...mapActions({
      updateInputTask: 'updateInputTask',
      addNewTask: 'addNewTask',
      moveTaskInDays: 'moveTaskInDays',
      popupIsOpen: 'popupIsOpen',
    }),

    takeTask(e, taskIndex, fromColumn) {
      this.makeDataTransferDragEffects(e);
      this.setDragDataTransfer(e, taskIndex, fromColumn);
    },

    makeDataTransferDragEffects(e) {
      e.dataTransfer.effectAllowed = 'move';
      e.dataTransfer.dropEffect = 'move';
    },

    setDragDataTransfer(e, taskIndex, fromColumn) {
      e.dataTransfer.setData('task-index', taskIndex);
      e.dataTransfer.setData('from-column', fromColumn);
    },

    moveTask(e, toTask, toTaskPosition) {
      const fromColumnIndex = e.dataTransfer.getData('from-column');
      const taskIndex = e.dataTransfer.getData('task-index');
      const fromTasks = this.tasks[fromColumnIndex].todos;

      this.moveTaskInDays({ fromTasks, toTask, taskIndex, toTaskPosition });
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

button:focus {
  outline: none;
}
</style>
