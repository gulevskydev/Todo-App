const updateInputTask = (context, payload) => {
  context.commit('UPDATE_INPUT_TASK', payload);
};

const updateInputSubTask = (context, payload) => {
  context.commit('UPDATE_INPUT_SUB_TASK', payload);
};

const resetSubTasks = (context, payload) => {
  context.commit('RESET_SUB_TASKS', payload);
};

const addNewSubTaskInput = (context) => {
  context.commit('ADD_NEW_SUB_TASK_INPUT');
};

const addNewTask = (context, task) => {
  context.commit('ADD_NEW_TASK', task);
};

const moveTaskInDays = (context, payload) => {
  context.commit('MOVE_TASK', payload);
};

const changeMenuOpenStatus = (context) => {
  context.commit('CHANGE_MENU_OPEN_STATUS');
};

const popupIsOpen = (context) => {
  console.log('Open popup default');
  context.commit('POPUP_IS_OPEN');
};

const isTagsPopupActive = (context) => {
  context.commit('IS_TAGS_POPUP_ACTIVE');
};

const deleteSubTaskInput = (context, id) => {
  context.commit('DELETE_SUBTASK_INPUT', id);
};

const updateActiveTag = (context, payload) => {
  context.commit('UPDATE_ACTIVE_TAG', payload);
};

const popupEditTaskIsOpen = (context, id) => {
  context.commit('POPUP_EDIT_TASK_IS_OPEN', id);
};

const moveTask = (context, payload) => {
  context.commit('MOVE_TASK', payload);
};

const updateTask = (context, task) => {
  context.commit('UPDATE_TASK', task);
};

const updateCompletedTaskStatus = (context, task) => {
  context.commit('UPDATE_COMPLETED_STATUS', task);
};

const updateCompletedSubTasks = (context, subTaskId) => {
  context.commit('UPDATE_COMPLETED_SUBTASK', subTaskId);
};

const switchCompeltedShowTasksStatus = (context) => {
  context.commit('SWITCH_COMPLETED_SHOW_TASKS_STATUS');
};

const updateInputTag = (context, input) => {
  context.commit('UPDATE_INPUT_TAG', input);
};

const addNewTagToTheStore = (context, payload) => {
  context.commit('ADD_NEW_TAG_TO_THE_STORE', payload);
};

export default {
  updateInputTask,
  addNewTask,
  moveTaskInDays,
  changeMenuOpenStatus,
  popupIsOpen,
  updateInputSubTask,
  addNewSubTaskInput,
  resetSubTasks,
  isTagsPopupActive,
  updateActiveTag,
  popupEditTaskIsOpen,
  moveTask,
  updateTask,
  updateCompletedTaskStatus,
  updateCompletedSubTasks,
  deleteSubTaskInput,
  switchCompeltedShowTasksStatus,
  updateInputTag,
  addNewTagToTheStore,
};
