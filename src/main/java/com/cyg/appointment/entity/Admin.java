package com.cyg.appointment.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

/**
 * @Description: 管理员
 * @Author: cyg
 * @Date: 2019/12/29
 * @Version:
 **/
@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Admin {

    private Long id;

    private String phone;

    private String password;

    private Long imgId;

    private String role;

    private String sex;

    private String age;

    private String name;
}
