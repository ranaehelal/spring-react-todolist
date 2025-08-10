package com.example.todolist.model;

import jakarta.persistence.*;


import java.time.LocalDate;

@Entity
@Table(name = "tasks")
public class TodoItem {

    // Primary key
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long todoId;

    // foreign key
    @ManyToOne
    @JoinColumn(name = "userId", nullable = false)
    private User user;

    // other attributes
    private String title;
    private  String description=null;

    private boolean complete=false;
    private String label=null;
    private LocalDate date=LocalDate.now();

    public TodoItem() {}




    public User getUser() {
        return user;
    }
    public void setUser(User user) {
        this.user = user;
    }

    public long getTodoId() {
        return todoId;
    }
    public void setTodoId(long todoId) {
        this.todoId = todoId;
    }

    public String getDescription() {
        return description;
    }
    public void setDescription(String description) {
        this.description = description;
    }

    public LocalDate getDate() {
        return date;
    }
    public void setDate(LocalDate date) {
        this.date = date;
    }

    public String getLabel() {
        return label;
    }
    public void setLabel(String label) {
        this.label = label;
    }

    public String getTitle() {
        return title;
    }
    public void setTitle(String title) {
        this.title = title;
    }

    public boolean isComplete() {
        return complete;
    }
    public void setComplete(boolean complete) {
        this.complete = complete;
    }


    public TodoItem (long todoId , User user, String title, String description , boolean complete, String label, LocalDate date) {
        this.todoId = todoId;
        this.user = user;
        this.title = title;
        this.description = description;
        this.complete = complete;
        this.label = label;
        this.date = date;
    }


}
