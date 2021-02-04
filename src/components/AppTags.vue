<template>
  <div class="tags-container">
    <div class="hide-completed__tasks" @click="handleCompletedSwitch">
      Скрыть выполненные
    </div>
    <div
      v-for="tag in storeTags"
      :key="tag.id"
      class="tags-modal__item"
      @click="handleFilteByTaskClick(tag.id)"
    >
      {{ tag.name }}
    </div>
    <input
      v-model="inputTagTask"
      type="text"
      placeholder="Введите подзадачу, которую хотите добавить"
      @keydown.enter="handleAddNewTag"
    />
    <div class="add-tag" @click="handleAddNewTag">
      <i class="las la-plus-circle"></i>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { uuid } from '../utils';

export default {
  name: 'AppTags',
  computed: {
    ...mapGetters(['storeTags', 'storeInputNewTag']),
    inputTagTask: {
      get() {
        return this.storeInputNewTag;
      },

      set(value) {
        this.updateInputTag(value);
      },
    },
  },
  methods: {
    ...mapActions({
      switchCompeltedShowTasksStatus: 'switchCompeltedShowTasksStatus',
      updateInputTag: 'updateInputTag',
      addNewTagToTheStore: 'addNewTagToTheStore',
      filterTasksByTagID: 'filterTasksByTagID',
    }),

    handleCompletedSwitch() {
      this.switchCompeltedShowTasksStatus();
    },

    handleAddNewTag() {
      this.addNewTagToTheStore({
        id: uuid(),
        name: this.storeInputNewTag,
        active: false,
      });
      this.clearTagInput();
    },

    handleFilteByTaskClick(id) {
      this.filterTasksByTagID(id);
    },

    clearTagInput() {
      this.updateInputTag('');
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
