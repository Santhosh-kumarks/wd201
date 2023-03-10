const todoList = require("../todo");
const { add, markAsComplete, overdue, dueToday, dueLater } = todoList();
var d = new Date();
const formattedDate = (d) => {
  return d.toISOString().split("T")[0];
};
var dateToday = new Date();
const today = formattedDate(dateToday);
const yesterday = formattedDate(
  new Date(new Date().setDate(dateToday.getDate() - 1))
);
const tomorrow = formattedDate(
  new Date(new Date().setDate(dateToday.getDate() + 1))
);
describe("TodoList Test Suite", () => {
  beforeAll(() => {
    add({
      title: "Task Todo",
      completed: false,
      dueDate: new Date().toLocaleDateString("en-CA"),
    });
  });
  test("Should add new todo", () => {
    const todoItemsCount = all.length;
    add({
      title: "Submit assignment",
      dueDate: yesterday,
      completed: false,
    });
    expect(all.length).toBe(todoItemsCount + 1);
  });

  test("Should mark as complete", () => {
    expect(all[0].completed).toBe(false);
    markAsComplete(0);
    expect(all[0].completed).toBe(true);
  });
  test("check overdue data", () => {
    add({ title: "Pay rent", dueDate: yesterday, completed: true });
    expect(overdue().length).toBe(2);
  });
  test("check dueToday", () => {
    add({ title: "Pay tax", dueDate: today, completed: true });
    add({ title: "pay Vehicle tax", dueDate: today, completed: false });
    add({ title: "phone pay", dueDate: today, completed: false });
    add({ title: "gpay ", dueDate: today, completed: false });
    expect(dueToday().length).toBe(4);
  });
  test("check dueLater", () => {
    add({ title: "exam mark", dueDate: tomorrow, completed: false });    
    expect(dueLater().length).toBe(1);
  });
});
