package com.me.classeconectada.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class GradeDTO {
    private Long id;
    private Long studentId;
    private String studentNome;
    private Long subjectId;
    private String subjectNome;
    private Double value;
    private String description;
    private LocalDate examDate;
}
