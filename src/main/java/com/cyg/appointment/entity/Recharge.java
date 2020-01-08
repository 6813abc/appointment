package com.cyg.appointment.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

/**
 * @Description: 充值记录
 * @Author: cyg
 * @Date: 2020/1/6
 * @Version:
 **/
@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Recharge {
    private String id;
    private String phone;
    private Long money;
    private String createTime;
}
