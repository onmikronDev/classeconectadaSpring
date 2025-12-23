package com.me.classeconectada.service;

import com.me.classeconectada.model.Student;
import com.me.classeconectada.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StudentService {
    @Autowired
    private StudentRepository repository;
    
    public List<Student> findAll() {
        return repository.findAll();
    }
    
    public Student findById(Long id) {
        return repository.findById(id).orElse(null);
    }
    
    public Student save(Student student) {
        return repository.save(student);
    }
    
    public void delete(Long id) {
        repository.deleteById(id);
    }
}
