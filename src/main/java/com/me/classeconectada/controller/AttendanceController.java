package com.me.classeconectada.controller;

import com.me.classeconectada.model.Attendance;
import com.me.classeconectada.model.AttendanceStatus;
import com.me.classeconectada.service.AttendanceService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/attendances")
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
public class AttendanceController {
    private final AttendanceService attendanceService;
    
    @GetMapping
    public ResponseEntity<List<Attendance>> getAll() {
        return ResponseEntity.ok(attendanceService.findAll());
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Attendance> getById(@PathVariable Long id) {
        return attendanceService.findById(id)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }
    
    @GetMapping("/student/{studentId}")
    public ResponseEntity<List<Attendance>> getByStudent(@PathVariable Long studentId) {
        return ResponseEntity.ok(attendanceService.findByStudentId(studentId));
    }
    
    @GetMapping("/student/{studentId}/stats")
    public ResponseEntity<Map<String, Long>> getStudentStats(@PathVariable Long studentId) {
        long present = attendanceService.countByStudentIdAndStatus(studentId, AttendanceStatus.PRESENT);
        long absent = attendanceService.countByStudentIdAndStatus(studentId, AttendanceStatus.ABSENT);
        long justified = attendanceService.countByStudentIdAndStatus(studentId, AttendanceStatus.JUSTIFIED);
        
        return ResponseEntity.ok(Map.of(
            "present", present,
            "absent", absent,
            "justified", justified
        ));
    }
    
    @PostMapping
    public ResponseEntity<Attendance> create(@Valid @RequestBody Attendance attendance) {
        try {
            Attendance savedAttendance = attendanceService.save(attendance);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedAttendance);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }
    
    @PostMapping("/mark")
    public ResponseEntity<Attendance> markAttendance(
            @RequestParam Long studentId,
            @RequestParam AttendanceStatus status,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
        try {
            LocalDate attendanceDate = date != null ? date : LocalDate.now();
            Attendance attendance = attendanceService.updateOrCreate(studentId, status, attendanceDate);
            return ResponseEntity.ok(attendance);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        try {
            attendanceService.delete(id);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
}
