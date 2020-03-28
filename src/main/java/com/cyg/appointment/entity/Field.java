package com.cyg.appointment.entity;

import lombok.Data;
import lombok.ToString;

/**
 * @author cyg
 * @date 2020/3/25 15:45
 **/
@Data
@ToString
public class Field {

    private Long id;
    private String roomNumber;
    private String address;
    private Integer capacity;
    private Long imgId;
}
