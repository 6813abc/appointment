package com.cyg.appointment.entity;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class EquipTypeSpecificChoice {
    private Long specificId;
    private Integer order;
    private String  option;
}
