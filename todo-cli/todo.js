const todoList = () => {
  all = [];
  const add = (todoItem) => {
    all.push(todoItem);
  };
  const markAsComplete = (index) => {
    all[index].completed = true;
  };

  const overdue = () => {
    const od = all.filter(
      (item) => item.dueDate.split("-")[2] < new Date().getDate()
    );
    return od;
  };

  const dueToday = () => {
    const Dt = all.filter(
      (item) => item.dueDate.split("-")[2] === String(new Date().getDate())
    );
    return Dt;
  };

  const dueLater = () => {
    const Dl = all.filter(
      (item) => item.dueDate.split("-")[2] > new Date().getDate()
    );
    return Dl;
  };

  const toDisplayableList = (list) => {
    const f_result = list.map(
      (item) =>
        `${item.completed ? "[x]" : "[ ]"} ${item.title} ${
          item.dueDate.split("-")[2] === String(new Date().getDate())
            ? ""
            : item.dueDate
        }`
    );

    return f_result.join("\n");
  };

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
