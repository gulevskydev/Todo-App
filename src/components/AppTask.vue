<template>
  <div class="task__container flex justify-center flex-col items-start px-12">
    <div class="task__modal-wrapper">
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
          @drop="onDrop($event, $columnIndex)"
        >
          <template v-for="task of column.todos">
            <draggable
              v-if="!task.isCompleted"
              :key="task.id"
              draggable
              dragover.prevent
            >
              <app-task-item
                v-if="checkIfNeedTofilterByTag(task.tag.id)"
                :task="task"
              >
              </app-task-item>
            </draggable>
            <app-task-item
              v-else-if="checkIfNeedTofilterByTag(task.tag.id)"
              :task="task"
              :key="task.id"
            >
            </app-task-item>
          </template>
        </container>
      </div>
      <app-main-button></app-main-button>
    </div>

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
      // console.log('drop ready', dropResult);
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
@import '../assets/css/base.scss';
@tailwind base;
@tailwind components;
@tailwind utilities;

.task__container {
  background-color: $bg-color-2;
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

.task__modal-wrapper {
  position: relative;
}
</style>
