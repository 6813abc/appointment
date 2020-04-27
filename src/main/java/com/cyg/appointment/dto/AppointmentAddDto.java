package com.cyg.appointment.dto;

import lombok.Data;

/**
 * @author cyg
 * @date 2020/4/27 11:59
 **/
@Data
public class AppointmentAddDto {
    private Long userId;
    private Long coachId;
    private Long fieldId;
    private String equipId;
    private String time;
}
