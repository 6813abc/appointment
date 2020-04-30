package com.cyg.appointment.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

/**
 * @Description: TODO
 * @Author: cyg
 * @Date: 2019/12/27
 * @Version:
 **/
@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class User {
    private Long userId;
    private String password;
    private String phone;
    private String name;
    private Long imgId;
    private Long memberId;
    private String sex;
    private String address;
    private Double balance;
}
