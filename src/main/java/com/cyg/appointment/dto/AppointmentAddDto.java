package com.cyg.appointment.dto;

import lombok.*;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Null;

/**
 * @author cyg
 * @date 2020/4/27 11:59
 **/
@Data
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class AppointmentAddDto {
    private String phone;
    private Long coachId;
    private Long fieldId;
    private String equipId;
    private String time;
}
