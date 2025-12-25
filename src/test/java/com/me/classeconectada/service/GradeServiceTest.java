package com.me.classeconectada.service;

import com.me.classeconectada.model.Grade;
import com.me.classeconectada.model.Student;
import com.me.classeconectada.model.Subject;
import com.me.classeconectada.model.UserType;
import com.me.classeconectada.repository.GradeRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class GradeServiceTest {

    @Mock
    private GradeRepository gradeRepository;

    @InjectMocks
    private GradeService gradeService;

    private Grade testGrade;
    private Student testStudent;
    private Subject testSubject;

    @BeforeEach
    void setUp() {
        testStudent = new Student();
        testStudent.setId(1L);
        testStudent.setNome("Test Student");
        testStudent.setEmail("student@email.com");
        testStudent.setTipo(UserType.ALUNO);

        testSubject = new Subject();
        testSubject.setId(1L);
        testSubject.setName("Matemática");
        testSubject.setActive(true);

        testGrade = new Grade();
        testGrade.setId(1L);
        testGrade.setStudent(testStudent);
        testGrade.setSubject(testSubject);
        testGrade.setValue(8.5);
        testGrade.setDescription("Prova Bimestral");
        testGrade.setExamDate(LocalDate.now());
    }

    @Test
    void testFindAll() {
        List<Grade> grades = Arrays.asList(testGrade);
        when(gradeRepository.findAll()).thenReturn(grades);

        List<Grade> result = gradeService.findAll();

        assertEquals(1, result.size());
        assertEquals(testGrade.getValue(), result.get(0).getValue());
        verify(gradeRepository, times(1)).findAll();
    }

    @Test
    void testFindById() {
        when(gradeRepository.findById(1L)).thenReturn(Optional.of(testGrade));

        Optional<Grade> result = gradeService.findById(1L);

        assertTrue(result.isPresent());
        assertEquals(testGrade.getValue(), result.get().getValue());
        verify(gradeRepository, times(1)).findById(1L);
    }

    @Test
    void testFindByStudentId() {
        List<Grade> grades = Arrays.asList(testGrade);
        when(gradeRepository.findByStudentId(1L)).thenReturn(grades);

        List<Grade> result = gradeService.findByStudentId(1L);

        assertEquals(1, result.size());
        assertEquals(testStudent.getId(), result.get(0).getStudent().getId());
        verify(gradeRepository, times(1)).findByStudentId(1L);
    }

    @Test
    void testFindBySubjectId() {
        List<Grade> grades = Arrays.asList(testGrade);
        when(gradeRepository.findBySubjectId(1L)).thenReturn(grades);

        List<Grade> result = gradeService.findBySubjectId(1L);

        assertEquals(1, result.size());
        assertEquals(testSubject.getId(), result.get(0).getSubject().getId());
        verify(gradeRepository, times(1)).findBySubjectId(1L);
    }

    @Test
    void testFindByStudentIdAndSubjectId() {
        List<Grade> grades = Arrays.asList(testGrade);
        when(gradeRepository.findByStudentIdAndSubjectId(1L, 1L)).thenReturn(grades);

        List<Grade> result = gradeService.findByStudentIdAndSubjectId(1L, 1L);

        assertEquals(1, result.size());
        assertEquals(testStudent.getId(), result.get(0).getStudent().getId());
        assertEquals(testSubject.getId(), result.get(0).getSubject().getId());
        verify(gradeRepository, times(1)).findByStudentIdAndSubjectId(1L, 1L);
    }

    @Test
    void testSaveGrade() {
        when(gradeRepository.save(any(Grade.class))).thenReturn(testGrade);

        Grade result = gradeService.save(testGrade);

        assertNotNull(result);
        assertEquals(testGrade.getValue(), result.getValue());
        verify(gradeRepository, times(1)).save(any(Grade.class));
    }

    @Test
    void testUpdateGrade() {
        Grade updateData = new Grade();
        updateData.setValue(9.5);
        updateData.setDescription("Prova Final");
        updateData.setExamDate(LocalDate.now().plusDays(7));

        when(gradeRepository.findById(1L)).thenReturn(Optional.of(testGrade));
        when(gradeRepository.save(any(Grade.class))).thenReturn(testGrade);

        Grade result = gradeService.update(1L, updateData);

        assertNotNull(result);
        verify(gradeRepository, times(1)).findById(1L);
        verify(gradeRepository, times(1)).save(any(Grade.class));
    }

    @Test
    void testUpdateGradeNotFound() {
        when(gradeRepository.findById(999L)).thenReturn(Optional.empty());

        assertThrows(RuntimeException.class, () -> {
            gradeService.update(999L, testGrade);
        });
    }

    @Test
    void testDeleteGrade() {
        doNothing().when(gradeRepository).deleteById(1L);

        gradeService.delete(1L);

        verify(gradeRepository, times(1)).deleteById(1L);
    }
}
