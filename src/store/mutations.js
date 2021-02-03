const UPDATE_INPUT_TASK = (state, payload) => {
  state.inputTask = payload;
};

const UPDATE_INPUT_SUB_TASK = (state, { id, input, updateCompletedStatus }) => {
  state.inputSubTask = state.inputSubTask.map((subtask, index) => {
    return index === id
      ? {
          input,
          isCompleted:
            updateCompletedStatus && input.length
              ? !subtask.isCompleted
              : false,
        }
      : subtask;
  });
};

const RESET_SUB_TASKS = (state, payload) => {
  state.inputSubTask = payload;
};

const ADD_NEW_TASK = (state, payload) => {
  console.log(state, payload, 'Add new task', state.tasks[0]);
  state.tasks[0].todos.push(payload);
  payload.subTasks.slice(1).forEach(() => state.completedSubtasks.push(false));
  state.tasks[0].todos.sort((a, b) => a.isCompleted - b.isCompleted);

  if (!state.showCompletedTasks) {
    console.log('completed tasks');
    // state.completedTasks[0].push(payload);
    // state.completedTasks[0].push(payload);
  }
};

const UPDATE_COMPLETED_SUBTASK = (state, subTaskId) => {
  state.completedSubtasks = state.completedSubtasks.map((subtask, id) =>
    id === subTaskId ? true : subtask,
  );
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

const DELETE_SUBTASK_INPUT = (state, id) => {
  state.inputSubTask = state.inputSubTask.filter((_, index) => index !== id);
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

const UPDATE_COMPLETED_STATUS = (state, task) => {
  // Change completed status for current task and update the state
  state.tasks = state.tasks.map((day) => {
    return {
      ...day,
      todos: day.todos.map((todo) => {
        if (todo.id === task.id) {
          return {
            ...todo,
            isCompleted: !todo.isCompleted,
          };
        }
        return todo;
      }),
    };
  });

  // Move all new tasks to the end before the beginning of completed ones started
  state.tasks.map((el) => {
    return el.todos.sort((a, b) => a.isCompleted - b.isCompleted);
  });

  if (!state.showCompletedTasks) {
    // Render only not completed tasks
    state.tasks = state.tasks.map((day) => {
      return {
        ...day,
        todos: day.todos.filter((todo) => !todo.isCompleted),
      };
    });

    // Add new completed task to the store and change the completed status to true
    state.completedTasks[0].push({ ...task, isCompleted: true });
    console.log(state.completedTasks, 'completed tasks state');
  }
};

const SWITCH_COMPLETED_SHOW_TASKS_STATUS = (state) => {
  /**
   *  To hide completed tasks:
   *  1. Change state for showCompletedTasks
   *  2. Filter all completed tasks and remove them form state and then add to completedTasks store
   */
  if (state.showCompletedTasks) {
    state.showCompletedTasks = false;
    state.completedTasks = state.tasks.map((day) => {
      return day.todos.filter((todo) => todo.isCompleted);
    });
    state.tasks = state.tasks.map((day) => {
      return {
        ...day,
        todos: day.todos.filter((todo) => !todo.isCompleted),
      };
    });
  } else {
    /**
     * Change state to show completed tasks
     *
     */
    state.showCompletedTasks = true;
    state.tasks = state.tasks.map((day, i) => {
      console.log('Complted tasks', state.completedTasks[i]);
      return {
        ...day,
        todos: [...day.todos, ...state.completedTasks[i]],
      };
    });
    state.completedTasks = [];
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
  UPDATE_COMPLETED_STATUS,
  UPDATE_COMPLETED_SUBTASK,
  DELETE_SUBTASK_INPUT,
  SWITCH_COMPLETED_SHOW_TASKS_STATUS,
};
