"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTodo = exports.updateTodo = exports.getTodos = exports.createTodo = void 0;
const todoModel_1 = require("../models/todoModel");
// Todo APIs
const TODOs = [];
const createTodo = (req, res, next) => {
    const text = req.body.text;
    const newTodo = new todoModel_1.Todo(Math.floor(Math.random() * 89999).toString(), text);
    TODOs.push(newTodo);
    res.status(201).json({ message: 'Created the todo', createTodo: newTodo });
};
exports.createTodo = createTodo;
const getTodos = (req, res) => {
    res.status(200).json({ todos: TODOs, count: TODOs.length });
};
exports.getTodos = getTodos;
const updateTodo = (req, res) => {
    const todoId = req.params.id;
    const updatedText = req.body.text;
    const todoIndex = TODOs.findIndex(todo => todo.id === todoId);
    if (todoIndex < 0) {
        throw new Error('Could not find todo!');
    }
    TODOs[todoIndex] = new todoModel_1.Todo(TODOs[todoIndex].id, updatedText);
    res.status(200).json({ message: 'TodoList updated successfully', updatedTodo: TODOs[todoIndex] });
};
exports.updateTodo = updateTodo;
const deleteTodo = (req, res) => {
    const todoId = req.params.id;
    const todoIndex = TODOs.findIndex(todo => todo.id === todoId);
    if (todoIndex < 0) {
        throw new Error('Could not find todo!');
    }
    TODOs.splice(todoIndex, 1);
    res.json({ message: 'Todo deleted successfully!' });
};
exports.deleteTodo = deleteTodo;
