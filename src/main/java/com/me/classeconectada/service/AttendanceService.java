package com.me.classeconectada.service;

import com.me.classeconectada.model.Attendance;
import com.me.classeconectada.model.AttendanceStatus;
import com.me.classeconectada.model.Student;
import com.me.classeconectada.repository.AttendanceRepository;
import com.me.classeconectada.repository.StudentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AttendanceService {
    private final AttendanceRepository attendanceRepository;
    private final StudentRepository studentRepository;
    
    public List<Attendance> findAll() {
        return attendanceRepository.findAll();
    }
    
    public Optional<Attendance> findById(Long id) {
        return attendanceRepository.findById(id);
    }
    
    public List<Attendance> findByStudentId(Long studentId) {
        return attendanceRepository.findByStudentId(studentId);
    }
    
    public Optional<Attendance> findByStudentIdAndDate(Long studentId, LocalDate date) {
        return attendanceRepository.findByStudentIdAndDate(studentId, date);
    }
    
    public long countByStudentIdAndStatus(Long studentId, AttendanceStatus status) {
        return attendanceRepository.countByStudentIdAndStatus(studentId, status);
    }
    
    @Transactional
    public Attendance save(Attendance attendance) {
        return attendanceRepository.save(attendance);
    }
    
    @Transactional
    public Attendance updateOrCreate(Long studentId, AttendanceStatus status, LocalDate date) {
        Optional<Attendance> existing = findByStudentIdAndDate(studentId, date);
        
        if (existing.isPresent()) {
            Attendance attendance = existing.get();
            attendance.setStatus(status);
            return attendanceRepository.save(attendance);
        } else {
            Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new RuntimeException("Student not found with id: " + studentId));
            
            Attendance attendance = new Attendance();
            attendance.setStudent(student);
            attendance.setStatus(status);
            attendance.setDate(date);
            return attendanceRepository.save(attendance);
        }
    }
    
    @Transactional
    public void delete(Long id) {
        attendanceRepository.deleteById(id);
    }
}
