<template>
  <div
    v-if="popupIsOpen || editPopupIsOpen"
    class="modal-frame"
    :class="{ active: popupIsOpen || editPopupIsOpen }"
  >
    <div class="modal-body" v-click-outside="closePopup">
      <div class="modal-inner">
        <button id="close" class="close" @click="closePopup">
          <i class="fa fa-times"></i>
        </button>

        <div class="modal-title">Новая задача</div>

        <div class="body-task-container">
          <div class="modal-input__container">
            <!-- Task input -->
            <input
              v-model="inputTask"
              type="text"
              placeholder="Введите задачу, которую хотите добавить"
              class="modal-input__input"
              @keydown.enter="saveTask"
            />
            <span class="underline"></span>
          </div>

          <div
            v-for="(input, $subTaskIndex) of storeInputSubTask"
            :key="$subTaskIndex"
          >
            <!-- Subtask input -->
            <div
              v-if="editPopupIsOpen"
              class="subtask__container"
              :class="{ _active: input.isCompleted }"
            >
              <span
                v-if="input.input.length"
                class="checkbox"
                @click="setTaskCompletedStatus($subTaskIndex)"
              ></span>
              <i v-else class="las la-arrow-right"></i>
              <input
                ref="subtask"
                :value="storeInputSubTaskValue($subTaskIndex)"
                @input="handleSubTaskInput($subTaskIndex, $event)"
                type="text"
                placeholder="Введите подзадачу, которую хотите добавить"
                class="modal-input__input"
                @keyup.delete="handleDeleteSubTaskInput($subTaskIndex)"
              />
            </div>
            <div v-else>
              <div class="subtask__container">
                <i class="las la-arrow-right"></i>
                <input
                  :value="storeInputSubTaskValue($subTaskIndex)"
                  @input="handleSubTaskInput($subTaskIndex, $event)"
                  type="text"
                  placeholder="Введите задачу, которую хотите добавить"
                  class="modal-input__input"
                />
              </div>
            </div>
          </div>
        </div>
        <!-- Active tag of the task -->
        <div class="modal-input__tags" @click="openTagsPopup">
          {{ activeTag.name }}
        </div>
        <!-- All tags wich can be selected -->
        <app-tags-modal :tags="storeTags"></app-tags-modal>
        <!-- Save button -->
        <div class="add-task__button" @click="saveTask">
          {{ this.editPopupIsOpen ? 'Сохранить' : 'Добавить' }}
        </div>
      </div>
    </div>

    <div class="modal-overlay"></div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { uuid } from '../utils';

// Compontents
import AppTagsModal from './AppTagsModal';

export default {
  name: 'AppTaskModal',

  components: { AppTagsModal },

  data: function () {
    return {
      isFocused: false,
    };
  },

  directives: {
    'click-outside': {
      bind: function (el, binding, vnode) {
        el.clickOutsideEvent = function (event) {
          if (!(el === event.target || el.contains(event.target))) {
            vnode.context[binding.expression](event);
          }
        };
        document.body.addEventListener('click', el.clickOutsideEvent);
      },

      unbind: function (el) {
        document.body.removeEventListener('click', el.clickOutsideEvent);
      },
    },
  },

  computed: {
    ...mapGetters([
      'storeInputTask',
      'tasks',
      'popupIsOpen',
      'storeInputSubTask',
      'storeInputSubTaskValue',
      'storeTags',
      'editPopupIsOpen',
      'editingTask',
    ]),

    inputTask: {
      get() {
        return this.storeInputTask;
      },

      set(value) {
        this.updateInputTask(value);
      },
    },

    activeTag: function () {
      return this.storeTags.find((tag) => tag.active);
    },
  },

  methods: {
    ...mapActions({
      updateInputTask: 'updateInputTask',
      addNewTask: 'addNewTask',
      popupIsClosed: 'popupIsOpen',
      updateInputSubTask: 'updateInputSubTask',
      addNewSubTaskInput: 'addNewSubTaskInput',
      resetSubTasks: 'resetSubTasks',
      isTagsPopupActive: 'isTagsPopupActive',
      popupEditTaskIsOpen: 'popupEditTaskIsOpen',
      updateTask: 'updateTask',
      deleteSubTaskInput: 'deleteSubTaskInput',
    }),

    handleSubTaskInput(id, e, completed = false) {
      this.updateInputSubTask({
        id,
        input: completed ? e : e.target.value,
        updateCompletedStatus: completed,
      });
      if (this.isNeededToAddNewSubTaskInput()) this.addNewSubTaskInput();
    },

    saveTask() {
      if (this.editPopupIsOpen) {
        this.updateEditedTask();
      } else {
        this.addNewTaskToStore();
      }

      this.clearInput();
      this.closePopup();
    },

    isNeededToAddNewSubTaskInput() {
      return (
        this.storeInputSubTask.filter(({ input }) => input.length === 0)
          .length === 0
      );
    },

    addNewTaskToStore() {
      this.addNewTask({
        id: uuid(),
        mainTask: this.inputTask,
        isCompleted: false,
        tag: this.activeTag,
        subTasks: this.storeInputSubTask,
      });
    },

    updateEditedTask() {
      const updatedTask = {
        id: this.editingTask.id,
        mainTask: this.inputTask,
        tag: this.activeTag,
        subTasks: this.storeInputSubTask,
      };
      this.updateTask(updatedTask);
    },

    openTagsPopup() {
      this.isTagsPopupActive();
    },

    clearInput() {
      this.updateInputTask('');
      this.resetSubTasks([{ id: 1, input: '' }]);
    },

    closePopup() {
      // depending what we did - add new task or editing existed task
      if (this.editPopupIsOpen) {
        this.popupEditTaskIsOpen();
      } else {
        this.popupIsClosed();
      }
    },

    handleDeleteSubTaskInput(index) {
      // Check if it is not last input, because we need stay the last input
      console.log();
      if (
        index + 1 < this.storeInputSubTask.length &&
        !this.storeInputSubTask[index].input.length
      ) {
        this.deleteSubTaskInput(index);
      }
    },

    setTaskCompletedStatus(id) {
      if (this.$refs.subtask[id].value != null) {
        this.handleSubTaskInput(id, this.$refs.subtask[id].value, true);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../assets/css/base.scss';

.close {
  position: absolute;
  top: 10px;
  font-size: 20px;
  right: 5px;
  color: #999;
  cursor: pointer;
  background: none;
  border: none;
  transition: hover 0.3s;

  &:hover {
    transform: scale(1.1);
  }
}

.btn {
  border-radius: 2px;
  border: none;
  position: absolute;
  top: 50%;
  left: 50%;
  outline: 0;
  margin-top: -15px;
  margin: -15px auto 0 -100px;
  cursor: pointer;
  background: #4975a6;
  text-decoration: none;
  color: #fff;
  font-size: 16px;
  padding: 10px 5px;
  text-align: center;
  transition: 0.15s ease-in-out;
  width: 200px;
  display: block;
  font-family: montserrat, arial, sans-serif;
  overflow: hidden;
}

.modal-input__tags {
  width: max-content;
  color: $font-color-2;
  margin-bottom: 20px;
  font-size: 14px;
  padding: 4px 8px;
  border-radius: 20px;
  background: #4975a6;
}

.btn:hover {
  background: #5082b9;
}

.modal-frame {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  z-index: 50;
  visibility: hidden;
  cursor: pointer;
}

.add-task__button {
  height: 56px;
  border-radius: 8px;
  background: black;
  color: $font-color-2;
  width: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;
  transition: hover 0.5s;
}

.add-task__button:hover {
  color: $font-color-1;
}

.modal-body {
  width: 600px;
  border-radius: 3px;
  background: $bg-color-2;
  position: absolute;
  height: 500px;
  margin-top: -10%;
  z-index: 100;
}

.modal-inner {
  position: relative;
  padding: 40px 20px;
  opacity: 0;
  transform: scale(0.5);
  transition: 0.2s ease-in-out;
}
.modal-overlay {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  visibility: hidden;
  opacity: 0;
  background: #333;
  transition: 0.15s ease-in-out;
}

.modal-inner {
  transform: scale(0.95);
}

.la-arrow-right {
  margin-right: 10px;
}

.body-task-container {
  overflow-y: scroll;
  height: 260px;
  margin-bottom: 32px;
}

.checkbox {
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

  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
}
.subtask__container {
  display: flex;
  align-items: center;
  margin-left: 25px;

  .checkbox {
    width: 20px;
    height: 15px;
    margin-right: 12px;
    border-radius: 50%;
  }

  &._active {
    .checkbox {
      border: 1px solid #ffeb3b;
      background: #ffeb3b;
      animation: shrink-bounce 200ms cubic-bezier(0.4, 0, 0.23, 1);

      .la-arrow-right {
        display: none;
      }

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
  }
}
.modal-frame.active {
  visibility: visible;
  height: inherit;
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-frame.active .modal-body {
  animation: popperIn 0.45s;
}

@keyframes popperIn {
  0% {
    opacity: 0;
    transform: scale(1.06);
  }
  40% {
    opacity: 1;
  }

  100% {
    transform: scale(1);
  }
}

@keyframes popperOut {
  0% {
    opacity: 1;
    transform: scale(1);
  }
  30% {
    opacity: 1;
  }
  40% {
    transform: scale(1.05);
  }

  100% {
    opacity: 0;
    transform: scale(1.15);
  }
}

.modal-frame.active .modal-inner {
  opacity: 1;
  transform: scale(1);
  transition: 0.15s ease-in-out;
  transition-delay: 0.13s;
}

.modal-frame.active .modal-overlay {
  opacity: 0.5;
  visibility: visible;
}

.modal-frame.leave .modal-body {
  opacity: 0;
  animation: popperOut 0.5s;
  transition: 0.3s ease-in-out;
  transition-delay: 0.2s;
  transform: scale(0.95);
}

.modal-frame.leave .modal-inner {
  opacity: 0;
  transform: scale(0.95);
  transition: 0.15s ease-in-out;
}

.modal-input {
  $block: &;

  &__input {
    width: 100%;
    outline: none;
    border: none;
    border-bottom: 1px solid transparent;
    padding: 10px 0;
    color: $font-color-1;
    background-color: transparent;
    transition: all 0.3s;

    &:focus + .underline {
      transform: scale(1);
    }
  }

  &__container {
    position: relative;
  }
}

.underline {
  position: absolute;
  display: inline-block;
  width: 100%;
  height: 2px;
  left: 0px;
  top: 32px;
  background-color: dodgerblue;
  transform: scale(0, 1);
  transition: all 0.5s linear;
}

.modal-title {
  font-size: 24px;
  color: $font-color-2;
  font-weight: bold;
  margin-bottom: 32px;
}

input::-webkit-input-placeholder {
  color: #aaa;
}
</style>
