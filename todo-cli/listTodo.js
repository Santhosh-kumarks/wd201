const db = require("./models/index");

const listTodo = async () => {
  try {
    await db.Todo.showList();
  } catch (error) {
    console.error(error);
  }
};
(async () => {
  await listTodo();
})();
Footer
© 2023 GitHub, Inc.
Footer navigation
Terms
Privacy
Security
