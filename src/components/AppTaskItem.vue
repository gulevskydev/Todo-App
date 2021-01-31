<template>
  <div>
    <div class="task__name">
      {{ task.mainTask }}
    </div>
    <div class="task__tag">{{ task.tag.name }}</div>
    <i
      class="fa fa-pencil-square-o"
      aria-hidden="true"
      @click.stop="editTask"
    ></i>
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
    };
  },

  methods: {
    ...mapActions({
      popupEditTaskIsOpen: 'popupEditTaskIsOpen',
    }),

    editTask() {
      this.popupEditTaskIsOpen(this.task.id);
    },
  },
};
</script>

<style></style>
