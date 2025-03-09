package com.whattowatch.controller;

import com.whattowatch.model.User;
import com.whattowatch.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user")
public class UserController {
    @Autowired
    private UserService service;

    @GetMapping
    public List<User> getAllUsers() { return service.getAllUsers(); }

    @PostMapping
    public User addUser(@RequestBody User user) { return service.saveUser(user); }

    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable Long id) { service.deleteUser(id); }

    @PutMapping("/{id}")
    public User updateUser(@PathVariable Long id, @RequestBody User userDetails) {
        return service.updateUser(id, userDetails);
    }
}
