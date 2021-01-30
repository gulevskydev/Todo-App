<template>
  <div
    class="task__container flex justify-center flex-col items-start w-3/5 px-12"
  >
    <div>
      <!-- Days -->
      <div
        v-for="(column, $columnIndex) of tasks"
        :key="column.id"
        class="task__day font-bold my-4 uppercase text-left"
      >
        <!-- Title of the day -->
        <h2 class="task__wrapper flex flex-col justify-center content-start">
          {{ column.name }}
        </h2>

        <!-- Container -->
        <container
          group-name="1"
          :get-child-payload="getChildPayload($columnIndex)"
          @drop="onDrop($event, $columnIndex)"
        >
          <!-- Main task -->
          <draggable v-for="task of column.todos" :key="task.id" draggable>
            <app-task-item :task="task"> </app-task-item>

            <!-- SubTask -->
            <div v-for="subTask of task.subTasks" :key="subTask.id">
              <app-subtask-item :data="subTask.input"></app-subtask-item>
            </div>
          </draggable>
        </container>
      </div>
    </div>

    <app-main-button></app-main-button>

    <app-task-modal></app-task-modal>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { Container, Draggable } from 'vue-smooth-dnd';

// Components import
import AppTaskItem from './AppTaskItem';
import AppTaskModal from './AppTaskModal';
import AppMainButton from './AppMainButton';
import AppSubtaskItem from './AppSubtaskItem';

export default {
  name: 'AppTask',

  components: {
    AppTaskItem,
    AppTaskModal,
    AppMainButton,
    AppSubtaskItem,
    Draggable,
    Container,
  },

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
      moveTask: 'moveTask',
      popupIsOpen: 'popupIsOpen',
    }),

    onDrop(dropResult, index) {
      this.moveTask({ index, dropResult });
    },
    getGhostParent() {
      return document.body;
    },
    onDropReady(dropResult) {
      console.log('drop ready', dropResult);
    },

    getChildPayload(col) {
      return (index) => this.tasks[col].todos[index];
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
