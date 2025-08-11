package com.example.todolist.controllers;


import com.example.todolist.model.TodoItem;
import com.example.todolist.services.TodoItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/todos")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:3001"})
public class TodoItemController {
    @Autowired
    private TodoItemService todoItemService;


    @GetMapping("/user/{userId}")
    public List<TodoItem> getTodosByUser(@PathVariable Long userId) {
        return todoItemService.getTodosByUserId(userId);
    }


    @PostMapping("/user/{userId}")
    public TodoItem createTodo(@PathVariable Long userId, @RequestBody TodoItem todoItem) {
        return todoItemService.createTodoItem(userId, todoItem);
    }

    @PutMapping("/{todoId}")
    public TodoItem updateTodo(@PathVariable Long todoId, @RequestBody TodoItem todoItem) {
        return todoItemService.updateTodoItem(todoId, todoItem);
    }

    @DeleteMapping("/{todoId}")
    public void deleteTodo(@PathVariable Long todoId) {
        todoItemService.deleteTodoItem(todoId);
    }


    @GetMapping("/user/{userId}/completed")
    public List<TodoItem> getCompletedTodos(@PathVariable Long userId) {
        return todoItemService.getCompletedTasksByUser(userId);
    }

    @GetMapping("/user/{userId}/not-completed")
    public List<TodoItem> getNotCompletedTodos(@PathVariable Long userId) {
        return todoItemService.getNotCompletedTasksByUser(userId);
    }

    @PutMapping("/{todoId}/toggle")
    public TodoItem toggleTodoComplete(@PathVariable Long todoId) {
        return todoItemService.toggleComplete(todoId);
    }

}
