package com.example.todolist.controllers;

import com.example.todolist.model.LoginRequest;
import com.example.todolist.model.User;
import com.example.todolist.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:3001"})
public class UserController {
    @Autowired
    private UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public User register(@RequestBody User user) {
        return userService.registerUser(user);
    }

    @PostMapping("/login")
    public User login(@RequestBody LoginRequest loginRequest) {
        return userService.loginUser(loginRequest.getEmail(), loginRequest.getPassword());
    }


    @PutMapping("/{userId}/forget-password")
    public User forgetPassword(@PathVariable Long userId, @RequestParam String newPassword) {
        return userService.forgetPassword(userId, newPassword);
    }


    @PostMapping("/logout")
    public ResponseEntity<Map<String, String>> logout() {
        HttpHeaders headers = new HttpHeaders();
        headers.setLocation(URI.create("/api/users/login"));
        return new ResponseEntity<>(headers, HttpStatus.FOUND);
    }



}
