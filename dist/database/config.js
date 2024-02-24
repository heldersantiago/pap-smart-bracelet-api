"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const todo_1 = require("../models/todo");
const connection = new sequelize_typescript_1.Sequelize({
    dialect: "mysql",
    host: "localhost",
    username: "hps",
    password: "heldersantigo273@",
    database: "todos",
    port: 3006,
    logging: false,
    models: [todo_1.Todos],
});
exports.default = connection;
