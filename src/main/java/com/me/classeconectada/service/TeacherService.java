package com.me.classeconectada.service;

import com.me.classeconectada.model.Teacher;
import com.me.classeconectada.repository.TeacherRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TeacherService {
    @Autowired
    private TeacherRepository repository;
    
    public List<Teacher> findAll() {
        return repository.findAll();
    }
    
    public Teacher findById(Long id) {
        return repository.findById(id).orElse(null);
    }
    
    public Teacher save(Teacher teacher) {
        return repository.save(teacher);
    }
    
    public void delete(Long id) {
        repository.deleteById(id);
    }
}
