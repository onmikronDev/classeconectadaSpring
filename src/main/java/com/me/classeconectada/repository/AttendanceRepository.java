package com.me.classeconectada.repository;

import com.me.classeconectada.model.Attendance;
import com.me.classeconectada.model.AttendanceStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface AttendanceRepository extends JpaRepository<Attendance, Long> {
    List<Attendance> findByStudentId(Long studentId);
    Optional<Attendance> findByStudentIdAndDate(Long studentId, LocalDate date);
    long countByStudentIdAndStatus(Long studentId, AttendanceStatus status);
}
