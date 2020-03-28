package com.cyg.appointment.service;

import com.cyg.appointment.dto.UserAdd;
import com.cyg.appointment.exception.BaseResult;

import javax.servlet.http.HttpServletRequest;

/**
 * @Description: user
 * @Author: cyg
 * @Date: 2019/12/27
 * @Version:
 **/
public interface UserService {

    /**
     * 功能描述:
     *
     * @param request  获取ip
     * @param phone    手机号
     * @param password 密码
     * @param code     验证码
     * @return com.cyg.appointment.exception.BaseResult
     * @date 2019/12/27
     */
    BaseResult loginUser(HttpServletRequest request, String phone, String password, String code);

    /**
     * 功能描述:
     *
     * @param request 主要是获取用户的ip来作为验证码储存进redis的key
     * @return com.cyg.appointment.exception.BaseResult
     * @date 2019/12/28
     */
    BaseResult getCode(HttpServletRequest request);

    /**
     * 功能描述: 用户注册
     *
     * @param userAdd 新增用户dto
     * @return com.cyg.appointment.exception.BaseResult
     * @date 2019/12/28
     */
    BaseResult addUser(UserAdd userAdd);

    /**
     * 功能描述:
     *
     * @param token token
     * @param page  页数
     * @param limit 限制
     * @return com.cyg.appointment.exception.BaseResult
     * @date 2020/1/4
     */
    BaseResult selectAllUser(String token, Long page, Integer limit);

    /**
     * 功能描述:
     *
     * @param token token
     * @param phone phone
     * @param money 充值金额
     * @return com.cyg.appointment.exception.BaseResult
     * @date 2020/1/6
     */
    BaseResult rechargeBalance(String token, String phone, Long money);
}
