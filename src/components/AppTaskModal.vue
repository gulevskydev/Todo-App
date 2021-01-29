<template>
  <div class="modal-frame" :class="{ active: popupIsOpen }">
    <div class="modal-body">
      <div class="modal-inner">
        <button id="close" class="close" @click="closePopup">
          <i class="fa fa-times"></i>
        </button>
        <!-- <div class="wrapper"> -->
        <input
          v-model="inputTask"
          type="text"
          placeholder="Введите задачу, которую хотите добавить"
          class="input"
          @keydown.enter="addTask"
        />
        <span class="underline"></span>
        <!-- </div> -->
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

export default {
  name: 'AppTaskModal',

  computed: {
    ...mapGetters(['storeInputTask', 'tasks', 'popupIsOpen']),
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
      popupIsClosed: 'popupIsOpen',
    }),

    addTask() {
      this.addNewTask({
        id: uuid(),
        data: this.inputTask,
      });

      this.clearInput();
      this.closePopup();
    },

    clearInput() {
      this.updateInputTask('');
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
  -webkit-transition: 0.15s ease-in-out;
  -moz-transition: 0.15s ease-in-out;
  -ms-transition: 0.15s ease-in-out;
  -o-transition: 0.15s ease-in-out;
  transition: 0.15s ease-in-out;
  width: 200px;
  display: block;
  font-family: montserrat, arial, sans-serif;
  overflow: hidden;
}

.btn:hover {
  background: #5082b9;
}

/**
 *	Custom Modal
 */

.modal-frame {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  z-index: 50;
  visibility: hidden;
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
  -webkit-transform: scale(0.5);
  -webkit-transition: 0.2s ease-in-out;
  -moz-transform: scale(0.5);
  -moz-transition: 0.2s ease-in-out;
  -ms-transform: scale(0.5);
  -ms-transition: 0.2s ease-in-out;
  -o-transform: scale(0.5);
  -o-transition: 0.2s ease-in-out;
  transform: scale(0.5);
  transition: 0.2s ease-in-out;
}

/**
 *  Modal overlay
*/

.modal-overlay {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  visibility: hidden;
  opacity: 0;
  background: #333;
  -webkit-transition: 0.15s ease-in-out;
  -moz-transition: 0.15s ease-in-out;
  -ms-transition: 0.15s ease-in-out;
  -o-transition: 0.15s ease-in-out;
  transition: 0.15s ease-in-out;
}

.modal-inner {
  -webkit-transform: scale(0.95);
  -moz-transform: scale(0.95);
  -ms-transform: scale(0.95);
  -o-transform: scale(0.95);
  transform: scale(0.95);
}

/**
 *  Enter states
 */

.modal-frame.active {
  visibility: visible;
  height: inherit;
  display: block;
}

.modal-frame.active .modal-body {
  -webkit-animation: popperIn 0.45s;
  -moz-animation: popperIn 0.45s;
  -ms-animation: popperIn 0.45s;
  -o-animation: popperIn 0.45s;
  animation: popperIn 0.45s;
}

@-webkit-keyframes popperIn {
  0% {
    opacity: 0;
    -webkit-transform: scale(1.06);
  }
  40% {
    opacity: 1;
  }

  100% {
    -webkit-transform: scale(1);
  }
}

@-moz-keyframes popperIn {
  0% {
    opacity: 0;
    -moz-transform: scale(1.06);
  }
  40% {
    opacity: 1;
  }

  100% {
    -moz-transform: scale(1);
  }
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

@-webkit-keyframes popperOut {
  0% {
    opacity: 1;
    -webkit-transform: scale(1);
  }
  30% {
    opacity: 1;
  }
  40% {
    -webkit-transform: scale(1.05);
  }

  100% {
    opacity: 0;
    -webkit-transform: scale(1.15);
  }
}

@-moz-keyframes popperOut {
  0% {
    opacity: 1;
    -moz-transform: scale(1);
  }
  30% {
    opacity: 1;
  }
  40% {
    -moz-transform: scale(1.05);
  }

  100% {
    opacity: 0;
    -moz-transform: scale(1.15);
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
  -webkit-transform: scale(1);
  -webkit-transition: 0.15s ease-in-out;
  -webkit-transition-delay: 0.13s;
  -moz-transform: scale(1);
  -moz-transition: 0.15s ease-in-out;
  -moz-transition-delay: 0.13s;
  -ms-transform: scale(1);
  -ms-transition: 0.15s ease-in-out;
  -ms-transition-delay: 0.13s;
  -o-transform: scale(1);
  -o-transition: 0.15s ease-in-out;
  -o-webkit-transition-delay: 0.13s;
  transform: scale(1);
  transition: 0.15s ease-in-out;
  transition-delay: 0.13s;
}

.modal-frame.active .modal-overlay {
  opacity: 0.5;
  visibility: visible;
}

/**
 *  Leave States
*/
.modal-frame.leave .modal-body {
  opacity: 0;
  -webkit-animation: popperOut 0.5s;
  -webkit-transition: 0.3s ease-in-out;
  -webkit-transition-delay: 0.2s;
  -webkit-transform: scale(0.95);
  -moz-animation: popperOut 0.5s;
  -moz-transition: 0.3s ease-in-out;
  -moz-transition-delay: 0.2s;
  -moz-transform: scale(0.95);
  -ms-animation: popperOut 0.5s;
  -ms-transition: 0.3s ease-in-out;
  -ms-transition-delay: 0.2s;
  -ms-transform: scale(0.95);
  animation: popperOut 0.5s;
  transition: 0.3s ease-in-out;
  transition-delay: 0.2s;
  transform: scale(0.95);
}

.modal-frame.leave .modal-inner {
  opacity: 0;
  -webkit-transform: scale(0.95);
  -webkit-transition: 0.15s ease-in-out;
  -moz-transform: scale(0.95);
  -moz-transition: 0.15s ease-in-out;
  -ms-transform: scale(0.95);
  -ms-transition: 0.15s ease-in-out;
  -o-transform: scale(0.95);
  -o-transition: 0.15s ease-in-out;
  transform: scale(0.95);
  transition: 0.15s ease-in-out;
}

.wrapper {
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0px 2px 1px 0px #ddd;
  box-sizing: border-box;
  height: 300px;
  left: 50%;
  margin: -150px 0 0 -150px;
  position: absolute;
  top: 50%;
  width: 300px;
}

.input {
  background-color: transparent;
  border: none;
  border-bottom: 1px solid #ccc;
  color: #555;
  box-sizing: border-box;
  font-family: 'Arvo';
  font-size: 18px;
  height: 50px;
  left: 20%;
  margin: -25px 0 0 -100px;
  padding: 10px 0px;
  position: relative;
  top: 50%;
  width: 100%;

  &:focus {
    outline: none;
  }
}

input::-webkit-input-placeholder {
  color: #aaa;
}

input:focus::-webkit-input-placeholder {
  color: dodgerblue;
}

.input:focus + .underline {
  transform: scale(1);
}

.underline {
  background-color: dodgerblue;
  display: inline-block;
  height: 2px;
  left: 5%;
  margin-top: -4px;
  position: absolute;
  top: 78px;
  -webkit-transform: scale(0, 1);
  transform: scale(0, 1);
  -webkit-transition: all 0.5s linear;
  transition: all 0.5s linear;
  width: 90%;
}
</style>
