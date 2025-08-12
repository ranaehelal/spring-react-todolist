package com.example.todolist.services;

import com.example.todolist.model.User;
import com.example.todolist.repos.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service

public class UserService {
    @Autowired
    private UserRepo userRepo;

    public User registerUser(User user){
        if(userRepo.findByEmail(user.getEmail()) == null){
            return userRepo.save(user);
        }
        throw new RuntimeException("User with email " + user.getEmail() + " already exists");
    }
    public User loginUser (String email, String password){
        User user = userRepo.findByEmail(email);
        if(user != null && user.getPassword().equals(password)){
            return user;
        }
         throw new RuntimeException("Invalid password or email");
    }

    public User forgetPassword(String email ,String newPassword) {
        User user = userRepo.findByEmail(email);

        if (user != null) {
            user.setPassword(newPassword);
            return userRepo.save(user);
        } else {
            throw new RuntimeException("User not found with email: " + email);
        }
    }

}
