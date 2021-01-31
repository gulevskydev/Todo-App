const UPDATE_INPUT_TASK = (state, payload) => {
  state.inputTask = payload;
};

const UPDATE_INPUT_SUB_TASK = (state, { id, input }) => {
  console.log(id, input, 'MUTATIONS');
  state.inputSubTask[id].input = input;
};

const RESET_SUB_TASKS = (state, payload) => {
  state.inputSubTask = payload;
};

const ADD_NEW_TASK = (state, payload) => {
  console.log(state, payload, 'Add new task', state.tasks[0]);
  state.tasks[0].todos.push(payload);
};

const UPDATE_TASK = (state, payload) => {
  state.tasks = state.tasks.map((day) => {
    return {
      ...day,
      todos: day.todos.map((todo) => {
        return todo.id === payload.id ? payload : todo;
      }),
    };
  });
};

const MOVE_TASK = (state, { index, dropResult }) => {
  const { removedIndex, addedIndex, payload } = dropResult;

  if (removedIndex === null && addedIndex === null) return;

  const result = state.tasks[index].todos.slice();
  let itemToAdd = payload;

  if (removedIndex !== null) {
    itemToAdd = result.splice(removedIndex, 1)[0];
  }

  if (addedIndex !== null) {
    result.splice(addedIndex, 0, itemToAdd);
  }

  state.tasks[index].todos = result.slice();
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

const IS_TAGS_POPUP_ACTIVE = (state) => {
  state.isTagsPopupOpen = !state.isTagsPopupOpen;
};

const UPDATE_ACTIVE_TAG = (state, id) => {
  const tags = state.tags.map((tag) => {
    if (tag.id === id) return { ...tag, active: true };
    return { ...tag, active: false };
  });
  state.tags = [...tags];
};

const POPUP_EDIT_TASK_IS_OPEN = (state, id) => {
  state.editPopupIsOpen = !state.editPopupIsOpen;

  // If before that moment pop up was not opened
  if (state.editPopupIsOpen) {
    state.tasks.forEach((day) =>
      day.todos.forEach((task) => {
        if (task.id === id) {
          state.editingTask = task;
        }
      }),
    );

    /**
     * Updating state modal pop up data depending on the edited task
     */
    state.inputTask = state.editingTask.mainTask;
    state.inputSubTask = state.editingTask.subTasks.map((subtask) => ({
      ...subtask,
    }));
    UPDATE_ACTIVE_TAG(state, state.editingTask.tag.id);
  }
};

export default {
  UPDATE_INPUT_TASK,
  ADD_NEW_TASK,
  MOVE_TASK,
  CHANGE_MENU_OPEN_STATUS,
  POPUP_IS_OPEN,
  UPDATE_INPUT_SUB_TASK,
  ADD_NEW_SUB_TASK_INPUT,
  RESET_SUB_TASKS,
  IS_TAGS_POPUP_ACTIVE,
  UPDATE_ACTIVE_TAG,
  POPUP_EDIT_TASK_IS_OPEN,
  UPDATE_TASK,
};
