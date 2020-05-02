package com.cyg.appointment.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

/**
 * @author cyg
 * @date 2020/4/27 11:59
 **/
@Data
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class AppointmentSelectDto {
    private Long id;
    private String phone;
    private String coachName;
    private String fieldName;
    private String equipName;
    private String createDate;
    private String startDate;
    private String endDate;
    private Double money;
    private Double disCount;
}
