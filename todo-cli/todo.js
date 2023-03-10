const todoList = () => {
  all = [];
  const add = (todoItem) => {
    all.push(todoItem);
  };
  const markAsComplete = (index) => {
    all[index].completed = true;
  };

  function due(dueDate) {
    const today = new Date().toISOString().split("T")[0];
    return dueDate == today;
  }

  const overdue = () => {
    return all.filter(
      (el) => el.dueDate < new Date().toISOString().split("T")[0]
    );
    // Write the date check condition here and return the array
    // of overdue items accordingly.
  };

  const dueToday = () => {
    return all.filter(
      (el) => el.dueDate === new Date().toISOString().split("T")[0]
    );
    // Write the date check condition here and return the array
    // of todo items that are due today accordingly.
  };

  const dueLater = () => {
    return all.filter(
      (el) => el.dueDate > new Date().toISOString().split("T")[0]
    );
    // Write the date check condition here and return the array
    // of todo items that are due later accordingly.
  };

  const toDisplayableList = (list) => {
    return list.map((el) => toString(el)).join("\n");
    // Format the To-Do list here, and return the output string
    // as per the format given above.
  };

  function toString(all) {
    const dueDate = due(all.dueDate) ? "" : all.dueDate;
    const check = all.completed ? "[x]" : "[ ]";
    return `${check} ${all.title} ${dueDate}`;
  }

  return {
    all,
    add,
    markAsComplete,
    overdue,
    dueToday,
    dueLater,
    toDisplayableList,
  };
};
module.exports = todoList;
