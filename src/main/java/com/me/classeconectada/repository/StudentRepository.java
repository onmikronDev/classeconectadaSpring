package com.me.classeconectada.repository;

import com.me.classeconectada.model.Student;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface StudentRepository extends JpaRepository<Student, Long> {
    List<Student> findByActiveTrue();
}
