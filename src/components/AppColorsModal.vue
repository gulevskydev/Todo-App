<template>
  <div v-if="isOpen" class="modal-frame" :class="{ active: isOpen }">
    <div class="modal-body">
      <div class="modal-inner">
        <button id="close" class="close" @click.stop="closePopup">
          <i class="las la-times"></i>
        </button>

        <div v-for="color in tagsColors" :key="color.id">
          <div
            class="color-picker"
            :style="`background-color: ${color['background-color']}; background-image: ${color['background-image']}`"
            @click="handleSelectColor(color)"
          ></div>
        </div>
      </div>
    </div>

    <div class="modal-overlay"></div>
  </div>
</template>

<script>
export default {
  name: 'AppColorsModal',

  props: {
    isOpen: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      tagsColors: [
        {
          id: 1,
          'background-color': '#4158D0',
          'background-image':
            'linear-gradient(43deg, #4158D0 0%, #C850C0 46%, #FFCC70 100%)',
          isActive: true,
        },

        {
          id: 2,
          'background-color': '#85FFBD',
          'background-image':
            'linear-gradient(45deg, #85FFBD 0%, #FFFB7D 100%)',
          isActive: false,
        },

        {
          id: 3,
          'background-color': '#FBAB7E',
          'background-image':
            'linear-gradient(62deg, #FBAB7E 0%, #F7CE68 100%)',
          isActive: false,
        },
      ],
    };
  },

  methods: {
    closePopup() {
      this.$emit('closePopup');
    },

    handleSelectColor(selectedColor) {
      this.updateSelectedColor(selectedColor);
      this.$emit('selectColor', selectedColor);
    },

    updateSelectedColor(selectedColor) {
      this.tagsColors = this.tagsColors.map((color) => {
        return color.id === selectedColor.id
          ? { ...color, isActive: true }
          : { ...color, isActive: false };
      });
    },
  },
};
</script>

<style scoped lang="scss">
.close {
  position: absolute;
  top: 10px;
  font-size: 16px;
  right: 5px;
  color: #999;
  cursor: pointer;
  background: none;
  border: none;
  z-index: 2;
}
.color-picker {
  height: 24px;
  width: 24px;
  border-radius: 50%;
}
.las {
  transition: 0.3s cubic-bezier(0.075, 0.82, 0.165, 1);
}

.las:hover {
  transform: scale(1.3);
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

.modal-body {
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 200px;
  border-radius: 3px;
  background: #fff;
  position: absolute;
  left: 50%;
  margin-left: -250px;
  height: 350px;
  margin-top: -200px;
  top: 50%;
  z-index: 100;
}

.modal-inner {
  position: relative;
  padding: 20px;
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
</style>
