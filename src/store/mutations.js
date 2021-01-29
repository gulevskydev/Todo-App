const UPDATE_INPUT_TASK = (state, payload) => {
  state.inputTask = payload;
};

const ADD_NEW_TASK = (state, payload) => {
  state.tasks[0].todos.push(payload);
};

const MOVE_TASK = (state, { fromTasks, toTask, taskIndex, toTaskPosition }) => {
  const taskMove = fromTasks.splice(taskIndex, 1)[0];
  toTask.splice(toTaskPosition, 0, taskMove);
};

const CHANGE_MENU_OPEN_STATUS = (state) => {
  const isOpenPopup = !state.isOpenMenuButton;
  state.isOpenMenuButton = isOpenPopup;
};

const POPUP_IS_OPEN = (state) => {
  state.popupIsOpen = !state.popupIsOpen;
};

export default {
  UPDATE_INPUT_TASK,
  ADD_NEW_TASK,
  MOVE_TASK,
  CHANGE_MENU_OPEN_STATUS,
  POPUP_IS_OPEN,
};
