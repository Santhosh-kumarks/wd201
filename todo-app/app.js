const express = require("express");
const app = express();
const { Todo } = require("./models");
const bodyParser = require("body-parser");
const path = require("path");
const { response } = require("express");

app.use(bodyParser.json());
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname + "public")));


app.get("/", async (req, res) => {
  const Alltodos = await Todo.getTodos();
  if (req.accepts("html")) {
    res.render("index", {
      Alltodos,
    });
  } else {
    res.json(Alltodos);
  }
});

app.get("/todos", async (req, res) => {
  try {
    const todos = await Todo.findAll({ order: [["id", "ASC"]] });
    return res.json(todos);
  } catch (error) {
    console.log(error);
    return res.status(422).json(error);
  }
});

app.post("/todos", async (req, res) => {
  console.log("Body : ", req.body);
  try {
    const todo = await Todo.addTodo({
      title: req.body.title,
      dueDate: req.body.dueDate,
      completed: false,
    });
    return res.json(todo);
  } catch (error) {
    console.log(error);
    return response.status(422).json(error);
  }
});

app.put("/todos/:id/markAsCompleted", async (req, res) => {
  console.log("Todo marks completed : ", req.params.id);
  const todo = await Todo.findByPk(req.params.id);
  try {
    const UpdaTo = await todo.markAsCompleted();
    return res.json(UpdaTo);
  } catch (error) {
    console.log(error);
    return response.status(422).json(error);
  }
});

app.delete("/todos/:id", async (req, res) => {
  console.log("We have to delete a Todo with ID: ", req.params.id);
  const Del_row = await Todo.destroy({ where: { id: req.params.id } });
  res.send(Del_row ? true : false);
});

module.exports = app;