package com.cyg.appointment.service;

import com.cyg.appointment.exception.BaseResult;

/**
 * @Description: member
 * @Author: cyg
 * @Date: 2019/1/5
 * @Version:
 **/
public interface MemberService {

    /**
     * 功能描述:
     *
     * @param token token
     * @param phone phone
     * @param data  续约时常 1，3，6，12
     * @param money money 扣款金额
     * @return com.cyg.appointment.exception.BaseResult
     * @date 2020/1/5
     * @throws Exception
     */
    BaseResult renewMember(String token, String phone, String data, Long money) throws Exception;

    /**
     * 功能描述: 消费
     *
     * @param phone  电话
     * @param money  消费金额
     * @param choice 消费类型 1、开会员 2.
     * @param data   开会员月份数
     * @return com.cyg.appointment.exception.BaseResult
     * @date 2020/1/6
     * @throws Exception
     */
    BaseResult consumption(String phone, Long money, Integer choice, String data) throws Exception;
}
