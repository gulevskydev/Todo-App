const updateInputTask = (context, payload) => {
  context.commit('UPDATE_INPUT_TASK', payload);
};

const addNewTask = (context, payload) => {
  context.commit('ADD_NEW_TASK', payload);
};

export default {
  updateInputTask,
  addNewTask,
};
