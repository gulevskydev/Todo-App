<template>
  <div class="task__container flex justify-center flex-col items-start px-12">
    <div>
      <!-- Days -->
      <div
        v-for="(column, $columnIndex) of tasks"
        :key="column.id"
        class="task__day font-bold my-4 text-left"
      >
        <!-- Title of the day -->
        <h2 class="task__wrapper flex flex-col justify-center content-start">
          {{ column.name }}
        </h2>

        <!-- Container -->
        <container
          group-name="1"
          :get-child-payload="getChildPayload($columnIndex)"
          orientation="vertical"
          @drop.prevent="onDrop($event, $columnIndex)"
        >
          <template v-for="task of column.todos">
            <draggable
              v-if="!task.isCompleted"
              :key="task.id"
              draggable
              dragover.prevent
            >
              {{ task.tag.id }}
              <app-task-item
                v-if="checkIfNeedTofilterByTag(task.tag.id)"
                :task="task"
              >
              </app-task-item>
              <!-- SubTask -->
              <!-- <div v-for="subTask of task.subTasks" :key="subTask.id">
              <app-subtask-item :data="subTask.input"></app-subtask-item>
            </div> -->
            </draggable>
            <!-- <app-task-item v-else :task="task" :key="task.id"> </app-task-item> -->
          </template>
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
// import AppSubtaskItem from './AppSubtaskItem';

export default {
  name: 'AppTask',

  components: {
    AppTaskItem,
    AppTaskModal,
    AppMainButton,
    Draggable,
    Container,
  },

  mounted() {
    document.addEventListener(
      'dragstart',
      function (event) {
        event.preventDefault();
      },
      false,
    );
  },

  beforeDestroy() {
    document.addEventListener('dragstart');
  },

  data: function () {
    return {
      count: 0,
      columns: ['Сегодня', 'Завтра', 'След. неделя', 'Потом'],
    };
  },

  computed: {
    ...mapGetters(['tasks', 'filterByTag']),
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

    handleDrag(e, task) {
      console.log('task click');
      if (task.isCompleted) {
        e.preventDefault();
      }
    },

    checkIfNeedTofilterByTag(id) {
      if (this.filterByTag) {
        return this.filterByTag === id;
      }
      return true;
    },
  },
};
</script>

<style lang="scss" scoped>
@tailwind base;
@tailwind components;
@tailwind utilities;

.task__container {
  width: 35%;
  background-color: blueviolet;
  margin-left: 10%;

  &::selection {
    display: none;
  }
}

.task__day {
  width: 600px;
}

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
