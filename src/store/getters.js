const storeInputTask = (state) => state.inputTask;

const tasks = (state) => state.tasks;

const isOpenMenuButton = (state) => state.isOpenMenuButton;

const popupIsOpen = (state) => state.popupIsOpen;

const storeInputSubTask = (state) => state.inputSubTask;

const storeInputNewTag = (state) => state.inputTag;

const storeTags = (state) => state.tags;

const storeInputSubTaskValue = (state) => (id) => {
  return state.inputSubTask[id].input;
};

const storeIsTagsPopupOpen = (state) => {
  return state.isTagsPopupOpen;
};

const editPopupIsOpen = (state) => state.editPopupIsOpen;

const editingTask = (state) => state.editingTask;

const filterByTag = (state) => {
  console.log('filter tag', state.filterByTag);
  return state.filterByTag;
};

export default {
  storeInputTask,
  tasks,
  isOpenMenuButton,
  popupIsOpen,
  storeInputSubTask,
  storeInputSubTaskValue,
  storeTags,
  storeIsTagsPopupOpen,
  editPopupIsOpen,
  editingTask,
  storeInputNewTag,
  filterByTag,
};
