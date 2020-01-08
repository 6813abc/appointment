package com.cyg.appointment.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

/**
 * @Description: 新增用户
 * @Author: cyg
 * @Date: 2019/12/28
 * @Version:
 **/
@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class UserAdd {
    private String password;
    private String phone;
    private String name;
    private String sex;
    private String address;
    /**
     * 头像的base64编码
     **/
    private String code;
}
