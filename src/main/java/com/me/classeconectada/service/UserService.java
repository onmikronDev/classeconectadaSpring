package com.me.classeconectada.service;

import com.me.classeconectada.model.User;
import com.me.classeconectada.model.UserType;
import com.me.classeconectada.repository.UserRepository;
import com.me.classeconectada.util.CpfValidator;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    
    public List<User> findAll() {
        return userRepository.findAll();
    }
    
    public List<User> findAllActive() {
        return userRepository.findByActiveTrue();
    }
    
    public Optional<User> findById(Long id) {
        return userRepository.findById(id);
    }
    
    public Optional<User> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }
    
    public List<User> findByTipo(UserType tipo) {
        return userRepository.findByTipo(tipo);
    }
    
    @Transactional
    public User save(User user) {
        // Validate CPF format
        if (user.getCpf() != null && !CpfValidator.isValid(user.getCpf())) {
            throw new RuntimeException("CPF inválido");
        }
        
        // Validate unique email
        if (user.getEmail() != null && userRepository.findByEmail(user.getEmail()).isPresent()) {
            throw new RuntimeException("Email já cadastrado");
        }
        
        // Validate unique CPF
        if (user.getCpf() != null && userRepository.findByCpf(user.getCpf()).isPresent()) {
            throw new RuntimeException("CPF já cadastrado");
        }
        
        // Encode password before saving
        if (user.getSenha() != null && !user.getSenha().isEmpty()) {
            user.setSenha(passwordEncoder.encode(user.getSenha()));
        }
        
        if (user.getActive() == null) {
            user.setActive(true);
        }
        return userRepository.save(user);
    }
    
    @Transactional
    public User update(Long id, User user) {
        User existingUser = userRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));
        
        existingUser.setNome(user.getNome());
        existingUser.setEmail(user.getEmail());
        if (user.getSenha() != null && !user.getSenha().isEmpty()) {
            // Encode password before updating
            existingUser.setSenha(passwordEncoder.encode(user.getSenha()));
        }
        existingUser.setCpf(user.getCpf());
        existingUser.setTelefone(user.getTelefone());
        existingUser.setEndereco(user.getEndereco());
        existingUser.setPai(user.getPai());
        existingUser.setMae(user.getMae());
        existingUser.setTipo(user.getTipo());
        
        return userRepository.save(existingUser);
    }
    
    @Transactional
    public void delete(Long id) {
        User user = userRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));
        user.setActive(false);
        userRepository.save(user);
    }
    
    @Transactional
    public void hardDelete(Long id) {
        userRepository.deleteById(id);
    }
    
    public User authenticate(String email, String senha) {
        Optional<User> user = userRepository.findByEmail(email);
        // Use BCrypt to compare passwords
        if (user.isPresent() && passwordEncoder.matches(senha, user.get().getSenha()) && user.get().getActive()) {
            return user.get();
        }
        return null;
    }
}
