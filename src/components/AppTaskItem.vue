<template>
  <div>
    <div class="task__name">
      {{ data }}
    </div>
    <div class="task__tag">{{ tag }}</div>
    <i class="fa fa-pencil-square-o" aria-hidden="true" @click="editTask"></i>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'AppTaskItem',
  props: {
    data: {
      type: String,
      default: '',
    },

    tag: {
      tag: String,
      default: '',
    },
  },
  data: function () {
    return {
      taskMessage: this.data,
    };
  },

  methods: {
    ...mapActions({
      popupEditTaskIsOpen: 'popupEditTaskIsOpen',
    }),

    editTask() {
      console.log('Cliiick');
      this.popupEditTaskIsOpen();
    },
  },
};
</script>

<style></style>
