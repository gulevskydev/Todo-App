<template>
  <div>
    <svg viewBox="0 0 0 0" style="position: absolute; z-index: -1; opacity: 0">
      <defs>
        <linearGradient
          id="boxGradient"
          gradientUnits="userSpaceOnUse"
          x1="0"
          y1="0"
          x2="25"
          y2="25"
        >
          <stop offset="0%" stop-color="#27FDC7" />
          <stop offset="100%" stop-color="#0FC0F5" />
        </linearGradient>

        <linearGradient id="lineGradient">
          <stop offset="0%" stop-color="#0FC0F5" />
          <stop offset="100%" stop-color="#27FDC7" />
        </linearGradient>

        <path
          id="todo__line"
          stroke="url(#lineGradient)"
          d="M21 12.3h168v0.1z"
        ></path>
        <path
          id="todo__box"
          stroke="url(#boxGradient)"
          d="M21 12.7v5c0 1.3-1 2.3-2.3 2.3H8.3C7 20 6 19 6 17.7V7.3C6 6 7 5 8.3 5h10.4C20 5 21 6 21 7.3v5.4"
        ></path>
        <path
          id="todo__check"
          stroke="url(#boxGradient)"
          d="M10 13l2 2 5-5"
        ></path>
        <circle id="todo__circle" cx="13.5" cy="12.5" r="10"></circle>
      </defs>
    </svg>

    <div class="todo-list">
      <div class="todo-container">
        <label class="todo">
          <input
            class="todo__state"
            :class="{ _active: completed }"
            type="checkbox"
          />

          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            viewBox="0 0 200 25"
            class="todo__icon"
          >
            <use xlink:href="#todo__line" class="todo__line"></use>
            <use xlink:href="#todo__box" class="todo__box"></use>
            <use xlink:href="#todo__check" class="todo__check"></use>
            <use xlink:href="#todo__circle" class="todo__circle"></use>
          </svg>

          <div class="todo__text" @click="setTaskCompletedStatus">
            {{ task.mainTask }}
          </div>
        </label>
      </div>
    </div>
    <!-- <div class="task__name">
      {{ task.mainTask }}
    </div>
    <div class="task__tag">{{ task.tag.name }}</div>
    <i
      class="fa fa-pencil-square-o"
      aria-hidden="true"
      @click.stop="editTask"
    ></i> -->
  </div>
</template>

<script>
import { mapActions } from 'vuex';

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
    };
  },

  methods: {
    ...mapActions({
      popupEditTaskIsOpen: 'popupEditTaskIsOpen',
    }),

    editTask() {
      this.popupEditTaskIsOpen(this.task.id);
    },

    setTaskCompletedStatus() {
      this.completed = !this.completed;
    },
  },
};
</script>

<style lang="scss" scoped>
.todo-list {
  font-size: 20px;
  max-width: 15em;
  margin: auto;
  padding: 0.5em 1em;
  box-shadow: 0 5px 30px rgba(0, 0, 0, 0.2);
}

.todo {
  display: block;
  position: relative;
  padding: 1em 1em 1em 16%;
  margin: 0 auto;
  cursor: pointer;
  border-bottom: solid 1px #ddd;

  &:last-child {
    border-bottom: none;
  }
}

.todo__state {
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0;
}

.todo__text {
  color: saturate(#1b4a4e, 15%);
  transition: all 0.8s / 2 linear 0.8s / 2;
}

.todo-container {
  position: relative;
}

.todo__icon {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: auto;
  margin: auto;

  fill: none;
  stroke: #27fdc7;
  stroke-width: 2;
  stroke-linejoin: round;
  stroke-linecap: round;
}

.todo__line,
.todo__box,
.todo__check {
  transition: stroke-dashoffset 0.8s cubic-bezier(0.9, 0, 0.5, 1);
}

.todo__circle {
  stroke: #27fdc7;
  stroke-dasharray: 1 6;
  stroke-width: 0;

  transform-origin: 13.5px 12.5px;
  transform: scale(0.4) rotate(0deg);
  animation: none 0.8s linear; //cubic-bezier(.08,.56,.04,.98);

  @keyframes explode {
    //0% { stroke-width: 0; transform: scale(0.5) rotate(0deg); }
    30% {
      stroke-width: 3;
      stroke-opacity: 1;
      transform: scale(0.8) rotate(40deg);
      //animation-timing-function: cubic-bezier(.89,.01,.95,.51);
    }
    100% {
      stroke-width: 0;
      stroke-opacity: 0;
      transform: scale(1.1) rotate(60deg);
      //animation-timing-function: cubic-bezier(.08,.56,.04,.98);
    }
  }
}

.todo__box {
  stroke-dasharray: 56.1053, 56.1053;
  stroke-dashoffset: 0;
  transition-delay: 0.8s * 0.2;
}
.todo__check {
  stroke: #27fdc7;
  stroke-dasharray: 9.8995, 9.8995;
  stroke-dashoffset: 9.8995;
  transition-duration: 0.8s * 0.4;
}
.todo__line {
  stroke-dasharray: 168, 1684;
  stroke-dashoffset: 168;
}
.todo__circle {
  animation-delay: 0.8s * 0.7;
  animation-duration: 0.8s * 0.7;
}

.todo__state._active {
  ~ .todo__text {
    transition-delay: 0s;
    color: #5ebec1;
    opacity: 0.6;
  }

  ~ .todo__icon .todo__box {
    stroke-dashoffset: 56.1053;
    transition-delay: 0s;
  }
  ~ .todo__icon .todo__line {
    stroke-dashoffset: -8;
  }
  ~ .todo__icon .todo__check {
    stroke-dashoffset: 0;
    transition-delay: 0.8s * 0.6;
  }
  ~ .todo__icon .todo__circle {
    animation-name: explode;
  }
}
</style>
