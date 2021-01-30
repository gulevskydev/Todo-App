<template>
  <div v-if="popupIsOpen" class="modal-frame" :class="{ active: popupIsOpen }">
    <div class="modal-body" v-click-outside="closePopup">
      <div class="modal-inner">
        <button id="close" class="close" @click="closePopup">
          <i class="fa fa-times"></i>
        </button>

        <div class="modal-title">Новая задача</div>

        <div class="modal-input__container">
          <input
            v-model="inputTask"
            type="text"
            placeholder="Введите задачу, которую хотите добавить"
            class="modal-input__input"
            @keydown.enter="addTask"
          />
          <span class="underline"></span>
        </div>

        <div
          v-for="(input, $subTaskIndex) of storeInputSubTask"
          :key="$subTaskIndex"
        >
          <input
            :value="storeInputSubTaskValue($subTaskIndex)"
            @input="handleSubTaskInput($subTaskIndex, $event)"
            type="text"
            placeholder="Введите задачу, которую хотите добавить"
            class="modal-input__input"
            @keydown.enter="addTask"
          />
          />
        </div>

        <div class="modal-input__tags" @click="openTagsPopup">
          {{ activeTag.name }}
        </div>
        <app-tags-modal :tags="storeTags"></app-tags-modal>

        <div class="add-task__button" @click="addTask" @keydown.enter="addTask">
          Добавить
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
    }),

    handleSubTaskInput(id, e) {
      this.updateInputSubTask({ id, input: e.target.value });
      if (this.isNeededToAddNewSubTaskInput()) this.addNewSubTaskInput();
    },

    addTask() {
      this.addNewTask({
        id: uuid(),
        mainTask: this.inputTask,
        subTasks: this.storeInputSubTask,
      });

      this.clearInput();
      this.closePopup();
    },

    isNeededToAddNewSubTaskInput() {
      return (
        this.storeInputSubTask.filter(({ input }) => input.length === 0)
          .length === 0
      );
    },

    openTagsPopup() {
      this.isTagsPopupActive();
    },

    clearInput() {
      this.updateInputTask('');
      this.resetSubTasks([{ id: 1, input: '' }]);
    },

    closePopup() {
      this.popupIsClosed();
    },
  },
};
</script>

<style lang="scss" scoped>
.close {
  position: absolute;
  top: 10px;
  font-size: 16px;
  right: 5px;
  color: #999;
  cursor: pointer;
  background: none;
  border: none;
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
  color: black;
  margin-bottom: 20px;
  font-size: 18px;
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
  color: #fff;
}

.modal-body {
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 500px;
  border-radius: 3px;
  background: #fff;
  position: absolute;
  left: 50%;
  margin-left: -250px;
  height: 400px;
  margin-top: -200px;
  top: 50%;
  z-index: 100;
}

.modal-inner {
  position: relative;
  padding: 50px;
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

.modal-frame.active {
  visibility: visible;
  height: inherit;
  display: block;
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
  font-size: 18px;
  color: #333;
  font-weight: bold;
  margin-bottom: 12px;
}

input::-webkit-input-placeholder {
  color: #aaa;
}
</style>
