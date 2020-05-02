package com.cyg.appointment.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

/**
 * @author cyg
 * @date 2020/4/24 16:25
 **/
@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class AppointmentEquip {

    private Long id;
    private Long appointmentId;
    private Long equipTypeId;
    private String createDate;
}
