package com.whattowatch;

import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

import com.whattowatch.model.User;
import com.whattowatch.repository.UserRepository;
import com.whattowatch.service.UserService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.*;
import java.util.*;

class UserServiceTest {

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private UserService userService;

    private User user;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        user = User.builder()
                .id(1L)
                .name("John Doe")
                .age(30)
                .email("john.doe@example.com")
                .build();
    }

    @Test
    void testFindAllUsers() {
        List<User> users = new ArrayList<>();
        users.add(user);
        when(userRepository.findAll()).thenReturn(users);

        List<User> result = userService.findAllUsers();

        assertNotNull(result);
        assertEquals(1, result.size());
        assertEquals("John Doe", result.getFirst().getName());
    }

    @Test
    void testFindUserById() {
        when(userRepository.findById(1L)).thenReturn(Optional.of(user));

        Optional<User> result = userService.findUserById(1L);

        assertTrue(result.isPresent());
        assertEquals("John Doe", result.get().getName());
    }

    @Test
    void testFindOrAddUser_WhenUserExists() {
        when(userRepository.findById(user.getId())).thenReturn(Optional.of(user));

        User result = userService.findOrAddUser(user);

        assertNotNull(result);
        assertEquals(user.getId(), result.getId());
        verify(userRepository, never()).save(any(User.class));
    }

    @Test
    void testFindOrAddUser_WhenUserDoesNotExist() {
        when(userRepository.findById(user.getId())).thenReturn(Optional.empty());
        when(userRepository.save(user)).thenReturn(user);

        User result = userService.findOrAddUser(user);

        assertNotNull(result);
        assertEquals(user.getId(), result.getId());
        verify(userRepository, times(1)).save(user);
    }

    @Test
    void testSaveUser() {
        when(userRepository.save(user)).thenReturn(user);

        User result = userService.saveUser(user);

        assertNotNull(result);
        assertEquals("john.doe@example.com", result.getEmail());
    }

    @Test
    void testUpdateUser() {
        User updatedUser = User.builder()
                .id(1L)
                .name("Jane Doe")
                .age(28)
                .email("jane.doe@example.com")
                .build();

        when(userRepository.findById(1L)).thenReturn(Optional.of(user));
        when(userRepository.save(any(User.class))).thenReturn(updatedUser);

        Optional<User> result = userService.updateUserById(1L, updatedUser);

        assertTrue(result.isPresent());
        assertEquals("Jane Doe", result.get().getName());
        assertEquals(28, result.get().getAge());
        assertEquals("jane.doe@example.com", result.get().getEmail());
    }

    @Test
    void testDeleteUserById() {
        doNothing().when(userRepository).deleteById(1L);

        userService.deleteUserById(1L);

        verify(userRepository, times(1)).deleteById(1L);
    }
}

