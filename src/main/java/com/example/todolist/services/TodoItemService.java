package com.example.todolist.services;

import com.example.todolist.model.TodoItem;
import com.example.todolist.model.User;
import com.example.todolist.repos.TodoItemRepo;
import com.example.todolist.repos.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service

public class TodoItemService {
    @Autowired
    private TodoItemRepo todoItemRepo;

    @Autowired
    private UserRepo userRepo;

    public List<TodoItem> getTodosByUserId(Long userId) {
        User user = userRepo.findById(userId).orElse(null);
        if (user != null) {
            return user.getTodos();
        } else {
            throw new RuntimeException("User not found with id: " + userId);
        }
    }

    public TodoItem createTodoItem(long userId,TodoItem todoItem) {
        User user = userRepo.findById(userId).orElse(null);
        if (user != null) {
            todoItem.setUser(user);
            return todoItemRepo.save(todoItem);
        }
        else {
            throw new RuntimeException("User not found");
        }

    }

    public TodoItem updateTodoItem(Long todoId, TodoItem updatedTodo) {
        TodoItem existingTodo = todoItemRepo.findById(todoId) .orElse(null);

        if (existingTodo != null) {


            existingTodo.setTitle(updatedTodo.getTitle());
            existingTodo.setDescription(updatedTodo.getDescription());
            existingTodo.setLabel(updatedTodo.getLabel());
            existingTodo.setDate(updatedTodo.getDate());
            existingTodo.setComplete(updatedTodo.isComplete());

            return todoItemRepo.save(existingTodo);
        } else {
            throw new RuntimeException("Todo with id not found : " + todoId);
        }
    }

    public void deleteTodoItem(Long todoId ) {
        TodoItem existingTodo = todoItemRepo.findById(todoId).orElse(null);


        if (existingTodo != null) {
            User user = existingTodo.getUser();

            user.removeTodo(existingTodo);
            userRepo.save(user);

             todoItemRepo.delete(existingTodo);
        } else {
            throw new RuntimeException("Todo with id not found : " + todoId);
        }
    }


    public List<TodoItem> getCompletedTasks() {
        return todoItemRepo.findByCompleteTrue();
    }
    public List<TodoItem> getNotCompletedTasks() {
        return todoItemRepo.findByCompleteFalse();
    }

    public TodoItem toggleComplete(Long todoId) {
        TodoItem existingTodo = todoItemRepo.findById(todoId).orElse(null);
        if (existingTodo != null) {
            existingTodo.setComplete(!existingTodo.isComplete());
            return todoItemRepo.save(existingTodo);
        } else {
            throw new RuntimeException("Todo with id not found : " + todoId);
        }
    }

}
