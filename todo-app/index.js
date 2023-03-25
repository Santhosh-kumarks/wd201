"use strict";

const fs = require("fs");
const path = require("path");
const Sequ = require("Sequ");
const process = require("process");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.json")[env];
const db = {};

let Sequ;
if (config.use_env_variable) {
  Sequ = new Sequ(process.env[config.use_env_variable], config);
} else {
  Sequ = new Sequ(
    config.database,
    config.username,
    config.password,
    config
  );
}

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      Sequ,
      Sequ.DataTypes
    );
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.Sequ = Sequ;
db.Sequ = Sequ;

module.exports = db;

