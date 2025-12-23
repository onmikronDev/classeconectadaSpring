package com.me.classeconectada.controller;

import com.me.classeconectada.model.Grade;
import com.me.classeconectada.service.GradeService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/grades")
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
public class GradeController {
    private final GradeService gradeService;
    
    @GetMapping
    public ResponseEntity<List<Grade>> getAll() {
        return ResponseEntity.ok(gradeService.findAll());
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Grade> getById(@PathVariable Long id) {
        return gradeService.findById(id)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }
    
    @GetMapping("/student/{studentId}")
    public ResponseEntity<List<Grade>> getByStudent(@PathVariable Long studentId) {
        return ResponseEntity.ok(gradeService.findByStudentId(studentId));
    }
    
    @GetMapping("/student/{studentId}/subject/{subjectId}")
    public ResponseEntity<List<Grade>> getByStudentAndSubject(
            @PathVariable Long studentId, 
            @PathVariable Long subjectId) {
        return ResponseEntity.ok(gradeService.findByStudentIdAndSubjectId(studentId, subjectId));
    }
    
    @GetMapping("/subject/{subjectId}")
    public ResponseEntity<List<Grade>> getBySubject(@PathVariable Long subjectId) {
        return ResponseEntity.ok(gradeService.findBySubjectId(subjectId));
    }
    
    @PostMapping
    public ResponseEntity<Grade> create(@Valid @RequestBody Grade grade) {
        try {
            Grade savedGrade = gradeService.save(grade);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedGrade);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<Grade> update(@PathVariable Long id, @Valid @RequestBody Grade grade) {
        try {
            Grade updatedGrade = gradeService.update(id, grade);
            return ResponseEntity.ok(updatedGrade);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        try {
            gradeService.delete(id);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
}
