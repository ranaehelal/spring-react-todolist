package com.example.todolist.repos;

import com.example.todolist.model.TodoItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TodoItemRepo extends JpaRepository<TodoItem, Long> {

}


