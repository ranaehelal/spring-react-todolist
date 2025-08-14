package com.example.todolist.repos;

import com.example.todolist.model.TodoItem;
import com.example.todolist.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


//has every thing i want
// like to find all data or find by the pd (ID)
//save new delete by ID

@Repository
public interface TodoItemRepo extends JpaRepository<TodoItem, Long> {
    List<TodoItem> findByCompleteTrue();
    List<TodoItem> findByCompleteFalse();

    // noneed implementation
    List<TodoItem> findByUserAndComplete(User user, boolean complete);


}


