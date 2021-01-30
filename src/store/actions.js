const updateInputTask = (context, payload) => {
  context.commit('UPDATE_INPUT_TASK', payload);
};

const updateInputSubTask = (context, payload) => {
  context.commit('UPDATE_INPUT_SUB_TASK', payload);
};

const addNewSubTaskInput = (context) => {
  context.commit('ADD_NEW_SUB_TASK_INPUT');
};

const addNewTask = (context, payload) => {
  context.commit('ADD_NEW_TASK', payload);
};

const moveTaskInDays = (context, payload) => {
  context.commit('MOVE_TASK', payload);
};

const changeMenuOpenStatus = (context) => {
  context.commit('CHANGE_MENU_OPEN_STATUS');
};

const popupIsOpen = (context) => {
  context.commit('POPUP_IS_OPEN');
};

export default {
  updateInputTask,
  addNewTask,
  moveTaskInDays,
  changeMenuOpenStatus,
  popupIsOpen,
  updateInputSubTask,
  addNewSubTaskInput,
};
