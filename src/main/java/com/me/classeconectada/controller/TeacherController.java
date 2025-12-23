package com.me.classeconectada.controller;

import com.me.classeconectada.model.Teacher;
import com.me.classeconectada.service.TeacherService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/teachers")
@CrossOrigin(origins = "*")
public class TeacherController {
    @Autowired
    private TeacherService service;
    
    @GetMapping
    public List<Teacher> getAll() {
        return service.findAll();
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Teacher> getById(@PathVariable Long id) {
        Teacher teacher = service.findById(id);
        if (teacher == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(teacher);
    }
    
    @PostMapping
    public Teacher create(@Valid @RequestBody Teacher teacher) {
        return service.save(teacher);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<Teacher> update(@PathVariable Long id, @Valid @RequestBody Teacher teacher) {
        Teacher existing = service.findById(id);
        if (existing == null) {
            return ResponseEntity.notFound().build();
        }
        teacher.setId(id);
        return ResponseEntity.ok(service.save(teacher));
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        Teacher existing = service.findById(id);
        if (existing == null) {
            return ResponseEntity.notFound().build();
        }
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
