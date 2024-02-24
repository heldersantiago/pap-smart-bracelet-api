"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = require("body-parser");
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
app.use((0, body_parser_1.json)());
app.use((0, body_parser_1.urlencoded)({ extended: true }));
app.get('/todos', (req, res) => {
    res.send('Hello World!');
});
// app.use("/todos", router);
app.use((err, req, res, next) => {
    res.status(500).json({ message: err.message });
});
// connection
//   .sync()
//   .then(() => {
//     console.log("Database successfully connected");
//   })
//   .catch((err) => {
//     console.log("Error at connection", err);
//   });
app.listen(3002, () => {
    console.log("Server started at port 3000");
});
