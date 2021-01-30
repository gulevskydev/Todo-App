const UPDATE_INPUT_TASK = (state, payload) => {
  state.inputTask = payload;
};

const UPDATE_INPUT_SUB_TASK = (state, { id, input }) => {
  console.log(id, input, 'MUTATIONS');
  state.inputSubTask[id].input = input;
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

const ADD_NEW_SUB_TASK_INPUT = (state) => {
  const newId = state.inputSubTask[state.inputSubTask.length - 1].id + 1;
  state.inputSubTask.push({ id: newId, input: '' });
};

export default {
  UPDATE_INPUT_TASK,
  ADD_NEW_TASK,
  MOVE_TASK,
  CHANGE_MENU_OPEN_STATUS,
  POPUP_IS_OPEN,
  UPDATE_INPUT_SUB_TASK,
  ADD_NEW_SUB_TASK_INPUT,
};
