import { RequestHandler } from 'express';
import { Todo } from '../models/todoModel';

// Todo APIs

const TODOs: Todo[] = [];

export const createTodo: RequestHandler = (req, res, next) => {
    const text = (req.body as {text: string}).text;
    const newTodo = new Todo(Math.floor(Math.random()*89999).toString(), text);

    TODOs.push(newTodo);

    res.status(201).json({ message: 'Created the todo', createTodo: newTodo});
};

export const getTodos: RequestHandler = (req, res) => {
    res.status(200).json({todos: TODOs, count: TODOs.length})
}

export const updateTodo: RequestHandler<{id: string}> = (req, res) => {
    const todoId = req.params.id;

    const updatedText = (req.body as {text: string}).text;

    const todoIndex = TODOs.findIndex(todo => todo.id === todoId);

    if(todoIndex < 0){
        throw new Error('Could not find todo!');
    }

    TODOs[todoIndex] = new Todo(TODOs[todoIndex].id, updatedText);
    res.status(200).json({ message: 'TodoList updated successfully', updatedTodo: TODOs[todoIndex]});
}

export const deleteTodo: RequestHandler = (req, res) => {
    const todoId = req.params.id;

    const todoIndex = TODOs.findIndex(todo => todo.id === todoId);

    if(todoIndex < 0){
        throw new Error('Could not find todo!');
    }

    TODOs.splice(todoIndex, 1);

    res.json({ message: 'Todo deleted successfully!'});
}