package com.cyg.appointment.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import sun.rmi.runtime.Log;

/**
 * @author cyg
 * @date 2020/4/24 16:25
 **/
@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Appointment {

    private Long id;
    private Long userId;
    private Long coachId;
    private Long fieldId;
    private String createDate;
    private String startDate;
    private String endDate;
    private Long money;
}
