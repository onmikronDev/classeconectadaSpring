package com.me.classeconectada.service;

import com.me.classeconectada.model.Subject;
import com.me.classeconectada.repository.SubjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SubjectService {
    @Autowired
    private SubjectRepository repository;
    
    public List<Subject> findAll() {
        return repository.findAll();
    }
    
    public Subject findById(Long id) {
        return repository.findById(id).orElse(null);
    }
    
    public Subject save(Subject subject) {
        return repository.save(subject);
    }
    
    public void delete(Long id) {
        repository.deleteById(id);
    }
}
