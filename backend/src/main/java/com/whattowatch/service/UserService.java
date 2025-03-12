package com.whattowatch.service;

import com.whattowatch.model.User;
import com.whattowatch.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;

    public List<User> findAllUsers() {
        return userRepository.findAll();
    }

    public Optional<User> findUserById(Long id) {
        return userRepository.findById(id);
    }

    public User findOrAddUser(User user) {
        return userRepository.findById(user.getId())
                .orElseGet(() -> userRepository.save(user));
    }

    public User saveUser(User user) {
        return userRepository.save(user);
    }

    public Optional<User> updateUserById(Long id, User userDetails) {
        return userRepository.findById(id).map(user -> {
            user.setName(userDetails.getName());
            user.setAge(userDetails.getAge());
            user.setEmail(userDetails.getEmail());
            return userRepository.save(user);
        });
    }

    public void deleteUserById(Long id) {
        userRepository.deleteById(id);
    }

    public void saveAll(Set<User> users) {
        userRepository.saveAll(users);
    }
}
