const storeInputTask = (state) => state.inputTask;

const tasks = (state) => state.tasks;

const isOpenMenuButton = (state) => state.isOpenMenuButton;

const popupIsOpen = (state) => state.popupIsOpen;

const storeInputSubTask = (state) => state.inputSubTask;

const storeInputSubTaskValue = (state) => (id) => {
  console.log('Store', id, state);
  return state.inputSubTask[id].input;
};

export default {
  storeInputTask,
  tasks,
  isOpenMenuButton,
  popupIsOpen,
  storeInputSubTask,
  storeInputSubTaskValue,
};
