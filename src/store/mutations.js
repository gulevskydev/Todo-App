const UPDATE_INPUT_TASK = (state, payload) => {
  state.inputTask = payload;
};

const ADD_NEW_TASK = (state, payload) => {
  state.tasks[0].todos.push(payload);
};

const MOVE_TASK = (state, { fromTasks, toTask, taskIndex }) => {
  const taskMove = fromTasks.splice(taskIndex, 1)[0];
  toTask.push(taskMove);
};

export default {
  UPDATE_INPUT_TASK,
  ADD_NEW_TASK,
  MOVE_TASK,
};
