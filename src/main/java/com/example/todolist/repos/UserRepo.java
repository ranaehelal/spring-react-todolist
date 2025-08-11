package com.example.todolist.repos;

import com.example.todolist.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepo  extends JpaRepository<User, Long> {
    User findByEmail(String email);
    Boolean existsByEmail(String email);

}
