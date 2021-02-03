<template>
  <div class="tags-container">
    <div class="hide-completed__tasks" @click="handleCompletedSwitch">
      Скрыть выполненные
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'AppTags',
  methods: {
    ...mapActions({
      switchCompeltedShowTasksStatus: 'switchCompeltedShowTasksStatus',
    }),
    handleCompletedSwitch() {
      console.log('click hide');
      this.switchCompeltedShowTasksStatus();
    },
  },
};
</script>

<style lang="scss" scoped>
.tags-container {
  width: 20%;
  background-color: brown;
}
</style>
