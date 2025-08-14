package com.example.todolist.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long userId;

    private String fname;
    private String lname;

    private String password;

    @Column(unique = true, nullable = false)
    private String email;

    // cascade to change in the user too if change in the todoo (like remove the todoo)
    //orphan removal to remove the from the database if the has no users

    @JsonIgnore
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)

    private final List<TodoItem> todos = new ArrayList<>();


    public String getFname() {
        return fname;
    }
    public void setFname(String fname) {
        this.fname = fname;
    }

    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }

    public String getLname() {
        return lname;
    }
    public void setLname(String lname) {
        this.lname = lname;
    }

    public String getPassword() {
        return password;
    }
    public void setPassword(String password) {
        this.password = password;
    }

    public long getUserId() {
        return userId;
    }
    public void setUserId(long userId) {
        this.userId = userId;
    }

    public List<TodoItem> getTodos() {
        return todos;
    }

    public void addTodo(TodoItem todo) {
        todos.add(todo);
        todo.setUser(this);
    }

    public void removeTodo(TodoItem todo) {
        todos.remove(todo);
        todo.setUser(null);
    }



    public User (){ }
    public User(String fname, String lname, String email, String password) {
        this.fname = fname;
        this.lname = lname;
        this.email = email;
        this.password = password;
    }



}
