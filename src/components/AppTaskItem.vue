<template>
  <div>
    <div class="todo-list draggable-item">
      <div class="todo-container" :class="{ _active: isCompletedTask }">
        <span @click="setTaskCompletedStatus"></span>
        <div class="todo__text">
          {{ task.mainTask }}
          <ins
            ><i>{{ task.mainTask }}</i></ins
          >
        </div>

        <div class="todo__options">
          <div class="todo__task-tag">{{ task.tag.name }}</div>
          <i
            class="fa fa-pencil-square-o"
            aria-hidden="true"
            @click.stop="editTask"
          ></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'AppTaskItem',
  props: {
    task: {
      type: Object,
      default: () => ({}),
    },
  },
  data: function () {
    return {
      taskMessage: this.data,
      completed: false,
      activeAnimation: false,
    };
  },

  computed: {
    ...mapGetters(['tasks']),

    isCompletedTask() {
      console.log('isCompletd');
      const idOfTheTask = this.task.id;
      return this.tasks.some((day) =>
        day.todos.some((todo) => todo.id === idOfTheTask && todo.isCompleted),
      );
    },
  },

  methods: {
    ...mapActions({
      popupEditTaskIsOpen: 'popupEditTaskIsOpen',
      updateCompletedTaskStatus: 'updateCompletedTaskStatus',
    }),

    editTask() {
      this.popupEditTaskIsOpen(this.task.id);
      this.isCompletedTask();
    },

    setTaskCompletedStatus() {
      this.updateCompletedTaskStatus(this.task);
    },
  },
};
</script>

<style lang="scss" scoped>
.todo-list {
  font-size: 20px;
  padding: 0.5em 1em;
  box-shadow: 0 5px 30px rgba(0, 0, 0, 0.2);
}

.todo {
  display: flex;
  justify-content: space-between;
  position: relative;
  padding: 1em 1em 1em 16%;
  margin: 0 auto;
  cursor: pointer;
  border-bottom: solid 1px #ddd;

  &:last-child {
    border-bottom: none;
  }
}

.fa {
  cursor: pointer;
}

.todo__options {
  display: flex;
}

ins {
  position: absolute;
  display: block;
  bottom: 0;
  left: 0;
  height: 0;
  width: 100%;
  overflow: hidden;
  text-decoration: none;
  transition: height 300ms cubic-bezier(0.4, 0, 0.23, 1);

  i {
    position: absolute;
    bottom: 0;
    font-style: normal;
    color: #4fc3f7;
  }
}

.todo__state {
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0;
}

.todo__task-tag {
  width: max-content;
  margin-right: 20px;
  margin-bottom: 20px;
  font-size: 14px;
  padding: 4px 8px;
  border-radius: 20px;
  background: #4975a6;
}

.todo__text {
  position: relative;
  font-weight: normal;
  font-size: 16px;
  display: flex;
  width: 100%;
  margin-right: 30px;
  align-items: center;
  color: #9e9e9e;
  transition: color 250ms cubic-bezier(0.4, 0, 0.23, 1);
  cursor: pointer;
}

.todo-container {
  position: relative;
  display: flex;
  align-items: center;
}

span {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 20px;
  width: 30px;
  height: 20px;
  background: transparent;
  border: 1px solid #9e9e9e;
  border-radius: 4px;
  cursor: pointer;
  transition-property: border, background;
  transition: 250ms cubic-bezier(0.4, 0, 0.23, 1);

  &:hover,
  :focus {
    background: rgba(255, 255, 255, 0.1);
  }
}

._active {
  span {
    border: 1px solid #ffeb3b;
    background: #ffeb3b;
    animation: shrink-bounce 200ms cubic-bezier(0.4, 0, 0.23, 1);

    &::before {
      content: '';
      position: absolute;
      top: 0.6em;
      left: 0.2em;
      border-right: 3px solid transparent;
      border-bottom: 3px solid transparent;
      transform: rotate(45deg);
      transform-origin: 0% 100%;
      animation: checkbox-check 125ms 250ms cubic-bezier(0.4, 0, 0.23, 1)
        forwards;
    }
  }

  ins {
    height: 100%;
  }
}

@keyframes shrink-bounce {
  0% {
    transform: scale(1);
  }
  33% {
    transform: scale(0.85);
  }
  100% {
    transform: scale(1);
  }
}
@keyframes checkbox-check {
  0% {
    width: 0;
    height: 0;
    border-color: #212121;
    transform: translate3d(0, 0, 0) rotate(45deg);
  }
  33% {
    width: 0.2em;
    height: 0;
    transform: translate3d(0, 0, 0) rotate(45deg);
  }
  100% {
    width: 0.2em;
    height: 0.5em;
    border-color: #212121;
    transform: translate3d(0, -0.5em, 0) rotate(45deg);
  }
}
</style>
