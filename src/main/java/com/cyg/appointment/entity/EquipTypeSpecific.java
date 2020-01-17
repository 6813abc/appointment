package com.cyg.appointment.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

/**
 * equip种类属性
 *
 * @author cyg
 * @date 2020/1/9 15:07
 **/
@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class EquipTypeSpecific {

    private Long equipTypeId;
    private String name;
    private String value;
}
