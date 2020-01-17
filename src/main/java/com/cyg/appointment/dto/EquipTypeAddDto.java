package com.cyg.appointment.dto;

import com.cyg.appointment.entity.EquipTypeSpecific;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.List;

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
public class EquipTypeAddDto {
    /**
     * 用来区分用重复器材时是否新增
     **/
    private String choose;
    private String code;
    private String name;
    private Long unitPrice;
    private String pictureCode;
    private List<EquipTypeSpecific> equipTypeSpecifics;
}
