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
          <app-task-item :data="task.data"> </app-task-item>
        </div>
      </div>
    </div>

    <div class="content">
      <div class="menu">
        <div class="menu-wrapper">
          <ul class="menu-items">
            <li class="menu-item">
              <button class="menu-item-button" @click="openPopup">
                <i class="fa fa-check-square-o"></i>
              </button>
              <div class="menu-item-bounce"></div>
            </li>
            <li class="menu-item">
              <button class="menu-item-button">
                <i class="fa fa-inbox"></i>
              </button>
              <div class="menu-item-bounce"></div>
            </li>
            <li class="menu-item">
              <button class="menu-item-button">
                <i class="fa fa-trash"></i>
              </button>
              <div class="menu-item-bounce"></div>
            </li>
          </ul>
          <button class="menu-toggle-button">
            <i class="fa fa-plus menu-toggle-icon"></i>
          </button>
        </div>
      </div>
    </div>

    <app-task-modal
      :active="isPopupActive"
      @closePopup="closePopup"
    ></app-task-modal>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import AppTaskItem from './AppTaskItem';
import AppTaskModal from './AppTaskModal';
import { initAnimationButton } from '../UI/buttonAnimation';

export default {
  name: 'AppTask',

  components: { AppTaskItem, AppTaskModal },

  data: function () {
    return {
      count: 0,
      columns: ['Сегодня', 'Завтра', 'След. неделя', 'Потом'],
      isPopupActive: false,
    };
  },

  computed: {
    ...mapGetters(['tasks']),
  },

  mounted: function () {
    initAnimationButton();
    console.log('hello');
  },

  methods: {
    ...mapActions({
      updateInputTask: 'updateInputTask',
      addNewTask: 'addNewTask',
      moveTaskInDays: 'moveTaskInDays',
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

    openPopup() {
      this.isPopupActive = true;
    },

    closePopup() {
      this.isPopupActive = false;
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

.menu {
  width: 300px;
  height: 200px;
  margin: 0 auto 100px;
  position: relative;
  -webkit-transform: translateZ(0);
  transform: translateZ(0);
  &-wrapper {
    position: absolute;
    left: 50%;
    bottom: 10px;
  }
  &-toggle-button,
  &-item-bounce,
  &-item-button {
    background: #4f4f64;
    border-radius: 50%;
    width: 80px;
    height: 80px;
    margin-left: -40px;
    margin-top: -40px;
    height: 80px;
    color: #fff;
    border: none;
    outline: none;
    position: relative;
  }

  &-toggle-button {
    background: transparent;
    position: absolute;
    top: 0;
    left: 0;
  }
  &-toggle-icon {
    font-size: 30px;
    position: absolute;
    top: 0;
    left: 0;
    width: 80px;
    height: 80px;
    line-height: 80px;
  }
  &-items {
    list-style-type: none;
    padding: 0;
    margin: 0;
    position: absolute;
    left: 0;
    top: 0;
  }
  &-item {
    position: absolute;
    top: 0;
    left: 0;
    width: 0;
    height: 0;
  }
  &-item-bounce {
    position: absolute;
    top: 0;
    left: 0;
  }

  &-item-button {
    width: 60px;
    height: 60px;
    margin-left: -30px;
    margin-top: -30px;
    position: absolute;
    top: 0;
    left: 0;
    color: #ad4c4c;
    .fa {
      font-size: 1.5rem;
      color: #fff;
    }
    .fa-inbox {
      transform: rotate(182deg);
    }
    .fa-check-square-o {
      transform: rotate(-120deg);
    }
    .fa-trash {
      transform: rotate(120deg);
    }
  }
}
</style>
