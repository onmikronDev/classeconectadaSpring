package com.me.classeconectada.service;

import com.me.classeconectada.model.User;
import com.me.classeconectada.model.UserType;
import com.me.classeconectada.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class UserServiceTest {

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private UserService userService;

    private User testUser;

    @BeforeEach
    void setUp() {
        testUser = new User();
        testUser.setId(1L);
        testUser.setNome("Test User");
        testUser.setEmail("test@email.com");
        testUser.setSenha("123456");
        testUser.setCpf("123.456.789-00");
        testUser.setTelefone("(11) 98765-4321");
        testUser.setTipo(UserType.ALUNO);
        testUser.setActive(true);
    }

    @Test
    void testFindAllActive() {
        List<User> users = Arrays.asList(testUser);
        when(userRepository.findByActiveTrue()).thenReturn(users);

        List<User> result = userService.findAllActive();

        assertEquals(1, result.size());
        assertEquals(testUser.getEmail(), result.get(0).getEmail());
        verify(userRepository, times(1)).findByActiveTrue();
    }

    @Test
    void testFindById() {
        when(userRepository.findById(1L)).thenReturn(Optional.of(testUser));

        Optional<User> result = userService.findById(1L);

        assertTrue(result.isPresent());
        assertEquals(testUser.getEmail(), result.get().getEmail());
        verify(userRepository, times(1)).findById(1L);
    }

    @Test
    void testFindByEmail() {
        when(userRepository.findByEmail("test@email.com")).thenReturn(Optional.of(testUser));

        Optional<User> result = userService.findByEmail("test@email.com");

        assertTrue(result.isPresent());
        assertEquals(testUser.getNome(), result.get().getNome());
        verify(userRepository, times(1)).findByEmail("test@email.com");
    }

    @Test
    void testSaveUser() {
        when(userRepository.save(any(User.class))).thenReturn(testUser);

        User result = userService.save(testUser);

        assertNotNull(result);
        assertEquals(testUser.getEmail(), result.getEmail());
        assertTrue(result.getActive());
        verify(userRepository, times(1)).save(any(User.class));
    }

    @Test
    void testUpdateUser() {
        User updateData = new User();
        updateData.setNome("Updated Name");
        updateData.setEmail("updated@email.com");
        updateData.setSenha("newpassword");
        updateData.setCpf("987.654.321-00");
        updateData.setTelefone("(11) 99999-9999");
        updateData.setTipo(UserType.PROFESSOR);

        when(userRepository.findById(1L)).thenReturn(Optional.of(testUser));
        when(userRepository.save(any(User.class))).thenReturn(testUser);

        User result = userService.update(1L, updateData);

        assertNotNull(result);
        verify(userRepository, times(1)).findById(1L);
        verify(userRepository, times(1)).save(any(User.class));
    }

    @Test
    void testUpdateUserNotFound() {
        when(userRepository.findById(999L)).thenReturn(Optional.empty());

        assertThrows(RuntimeException.class, () -> {
            userService.update(999L, testUser);
        });
    }

    @Test
    void testDeleteUser() {
        when(userRepository.findById(1L)).thenReturn(Optional.of(testUser));
        when(userRepository.save(any(User.class))).thenReturn(testUser);

        userService.delete(1L);

        verify(userRepository, times(1)).findById(1L);
        verify(userRepository, times(1)).save(any(User.class));
    }

    @Test
    void testDeleteUserNotFound() {
        when(userRepository.findById(999L)).thenReturn(Optional.empty());

        assertThrows(RuntimeException.class, () -> {
            userService.delete(999L);
        });
    }

    @Test
    void testAuthenticateSuccess() {
        when(userRepository.findByEmail("test@email.com")).thenReturn(Optional.of(testUser));

        User result = userService.authenticate("test@email.com", "123456");

        assertNotNull(result);
        assertEquals(testUser.getEmail(), result.getEmail());
        verify(userRepository, times(1)).findByEmail("test@email.com");
    }

    @Test
    void testAuthenticateWrongPassword() {
        when(userRepository.findByEmail("test@email.com")).thenReturn(Optional.of(testUser));

        User result = userService.authenticate("test@email.com", "wrongpassword");

        assertNull(result);
        verify(userRepository, times(1)).findByEmail("test@email.com");
    }

    @Test
    void testAuthenticateUserNotFound() {
        when(userRepository.findByEmail("notfound@email.com")).thenReturn(Optional.empty());

        User result = userService.authenticate("notfound@email.com", "123456");

        assertNull(result);
        verify(userRepository, times(1)).findByEmail("notfound@email.com");
    }

    @Test
    void testAuthenticateInactiveUser() {
        testUser.setActive(false);
        when(userRepository.findByEmail("test@email.com")).thenReturn(Optional.of(testUser));

        User result = userService.authenticate("test@email.com", "123456");

        assertNull(result);
        verify(userRepository, times(1)).findByEmail("test@email.com");
    }

    @Test
    void testFindByTipo() {
        List<User> users = Arrays.asList(testUser);
        when(userRepository.findByTipo(UserType.ALUNO)).thenReturn(users);

        List<User> result = userService.findByTipo(UserType.ALUNO);

        assertEquals(1, result.size());
        assertEquals(UserType.ALUNO, result.get(0).getTipo());
        verify(userRepository, times(1)).findByTipo(UserType.ALUNO);
    }
}
