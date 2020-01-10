package com.cyg.appointment.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

/**
 * equip详情
 *
 * @author cyg
 * @date 2020/1/9 15:57
 **/
@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Equip {

    private Long id;
    private Long equipTypeId;
    private Integer count;
    private String createDate;
    private Long orderId;
}
