package com.cyg.appointment.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

/**
 * 消费记录
 *
 * @author cyg
 * @date 2020/1/9 11:04
 **/
@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Consumption {

    private String id;
    private String phone;
    private Long money;
    private String createTime;
    /**
     * 充值会员、预约教练等
     **/
    private String type;
}

