package com.cyg.appointment.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

/**
 * @Description: 会员
 * @Author: cyg
 * @Date: 2020/1/4
 * @Version:
 **/
@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Member {

    private Long id;
    /**
     * 等级
     **/
    private String grade;
    /**
     * 积分
     **/
    private Long integral;
    /**
     * 开卡时间
     **/
    private String memberDate;
    /**
     * 截至时间
     **/
    private String upToDate;
}
