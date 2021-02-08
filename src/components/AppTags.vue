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
    <div class="tags-modal__input-wrapper">
      <input
        v-model="inputTagTask"
        type="text"
        placeholder="Добавить тэг"
        class="tags-modal__input"
        @keydown.enter="handleAddNewTag"
      />
      <div class="add-tag" @click="handleOpenColors">
        <i class="las la-plus-circle"></i>
      </div>
    </div>
    <app-colors-modal
      :is-open="isOpenColorsPopup"
      @closePopup="handleClosePopup"
    ></app-colors-modal>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { uuid } from '../utils';
import AppColorsModal from './AppColorsModal';

export default {
  name: 'AppTags',

  components: { AppColorsModal },

  data() {
    return {
      isOpenColorsPopup: false,
    };
  },

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

    handleOpenColors() {
      this.isOpenColorsPopup = true;
    },

    handleClosePopup() {
      this.isOpenColorsPopup = false;
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../assets/css/base.scss';

.hide-completed__tasks {
  margin-bottom: 120px;
}

.tags-container {
  width: 20%;
  background-color: $bg-color-2;
  padding: 30px 20px;
}

.la-plus-circle {
  transform: scale(1.3);
  margin-left: 10px;
  transition: 0.3s all cubic-bezier(0.075, 0.82, 0.165, 1);
  cursor: pointer;

  &:hover {
    transform: scale(1.5);
  }
}

.tags-modal {
  &__item {
    margin: 15px 0;
  }

  &__input {
    width: 100%;
    outline: none;
    border: none;
    border-bottom: 1px solid transparent;
    padding: 10px 0;
    color: $font-color-1;
    background-color: transparent;
    border-bottom: 1px solid white;
    transition: all 0.3s;

    &:focus + .underline {
      transform: scale(1);
    }

    &-wrapper {
      display: flex;
      align-items: center;
    }
  }
}
</style>
