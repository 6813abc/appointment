package com.cyg.appointment.vo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

/**
 * @Description: 管理员查询
 * @Author: cyg
 * @Date: 2019/12/29
 * @Version:
 **/
@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class AdminSelect {

    private Long id;

    private String phone;

    private String role;

    private String sex;

    private String age;

    private String name;

    private Long imgId;

    private String code;
}
