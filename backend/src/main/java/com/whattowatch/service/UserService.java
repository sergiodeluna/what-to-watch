package com.whattowatch.service;

import com.whattowatch.model.User;
import com.whattowatch.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserRepository repository;

    public List<User> getAllUsers() { return repository.findAll(); }

    public User saveUser(User user) { return repository.save(user); }

    public void deleteUser(Long id) { repository.deleteById(id); }

    public User updateUser(Long id, User userDetails) {
        return repository.findById(id)
                .map(user -> {
                    user.setName(userDetails.getName());
                    user.setAge(userDetails.getAge());
                    user.setEmail(userDetails.getEmail());
                    return repository.save(user);
                })
                .orElseThrow(() -> new RuntimeException("User not found"));
    }
}
