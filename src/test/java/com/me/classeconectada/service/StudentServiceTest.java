package com.me.classeconectada.service;

import com.me.classeconectada.model.SchoolClass;
import com.me.classeconectada.model.Student;
import com.me.classeconectada.model.UserType;
import com.me.classeconectada.repository.StudentRepository;
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
class StudentServiceTest {

    @Mock
    private StudentRepository studentRepository;

    @InjectMocks
    private StudentService studentService;

    private Student testStudent;
    private SchoolClass testClass;

    @BeforeEach
    void setUp() {
        testClass = new SchoolClass();
        testClass.setId(1L);
        testClass.setName("Turma A");
        testClass.setActive(true);

        testStudent = new Student();
        testStudent.setId(1L);
        testStudent.setNome("Test Student");
        testStudent.setEmail("student@email.com");
        testStudent.setSenha("123456");
        testStudent.setCpf("123.456.789-00");
        testStudent.setTelefone("(11) 98765-4321");
        testStudent.setTipo(UserType.ALUNO);
        testStudent.setActive(true);
        testStudent.setTurma(testClass);
        testStudent.setPai("Pai do Aluno");
        testStudent.setMae("Mãe do Aluno");
    }

    @Test
    void testFindAllActive() {
        List<Student> students = Arrays.asList(testStudent);
        when(studentRepository.findByActiveTrue()).thenReturn(students);

        List<Student> result = studentService.findAllActive();

        assertEquals(1, result.size());
        assertEquals(testStudent.getEmail(), result.get(0).getEmail());
        verify(studentRepository, times(1)).findByActiveTrue();
    }

    @Test
    void testFindById() {
        when(studentRepository.findById(1L)).thenReturn(Optional.of(testStudent));

        Optional<Student> result = studentService.findById(1L);

        assertTrue(result.isPresent());
        assertEquals(testStudent.getEmail(), result.get().getEmail());
        verify(studentRepository, times(1)).findById(1L);
    }

    @Test
    void testFindByTurmaId() {
        List<Student> students = Arrays.asList(testStudent);
        when(studentRepository.findByTurmaId(1L)).thenReturn(students);

        List<Student> result = studentService.findByTurmaId(1L);

        assertEquals(1, result.size());
        assertEquals(testStudent.getTurma().getId(), result.get(0).getTurma().getId());
        verify(studentRepository, times(1)).findByTurmaId(1L);
    }

    @Test
    void testSaveStudent() {
        when(studentRepository.save(any(Student.class))).thenReturn(testStudent);

        Student result = studentService.save(testStudent);

        assertNotNull(result);
        assertEquals(testStudent.getEmail(), result.getEmail());
        assertTrue(result.getActive());
        verify(studentRepository, times(1)).save(any(Student.class));
    }

    @Test
    void testUpdateStudent() {
        Student updateData = new Student();
        updateData.setNome("Updated Student");
        updateData.setEmail("updated@email.com");
        updateData.setCpf("987.654.321-00");
        updateData.setTelefone("(11) 99999-9999");
        updateData.setPai("Novo Pai");
        updateData.setMae("Nova Mãe");

        when(studentRepository.findById(1L)).thenReturn(Optional.of(testStudent));
        when(studentRepository.save(any(Student.class))).thenReturn(testStudent);

        Student result = studentService.update(1L, updateData);

        assertNotNull(result);
        verify(studentRepository, times(1)).findById(1L);
        verify(studentRepository, times(1)).save(any(Student.class));
    }

    @Test
    void testUpdateStudentNotFound() {
        when(studentRepository.findById(999L)).thenReturn(Optional.empty());

        assertThrows(RuntimeException.class, () -> {
            studentService.update(999L, testStudent);
        });
    }

    @Test
    void testDeleteStudent() {
        when(studentRepository.findById(1L)).thenReturn(Optional.of(testStudent));
        when(studentRepository.save(any(Student.class))).thenReturn(testStudent);

        studentService.delete(1L);

        verify(studentRepository, times(1)).findById(1L);
        verify(studentRepository, times(1)).save(any(Student.class));
    }

    @Test
    void testDeleteStudentNotFound() {
        when(studentRepository.findById(999L)).thenReturn(Optional.empty());

        assertThrows(RuntimeException.class, () -> {
            studentService.delete(999L);
        });
    }
}
