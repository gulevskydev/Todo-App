const UPDATE_INPUT_TASK = (state, payload) => {
  state.inputTask = payload;
};

const ADD_NEW_TASK = (state, payload) => {
  state.storeOfTasks.push(payload);
};

export default {
  UPDATE_INPUT_TASK,
  ADD_NEW_TASK,
};
