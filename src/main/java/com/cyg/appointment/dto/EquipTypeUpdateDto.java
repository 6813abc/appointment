package com.cyg.appointment.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

/**
 * equip种类
 *
 * @author cyg
 * @date 2020/1/9 15:07
 **/
@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class EquipTypeUpdateDto {
    private Long id;
    private String code;
    private String name;
    private Long unitPrice;
}
