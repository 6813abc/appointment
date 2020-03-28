package com.cyg.appointment.service;

import com.cyg.appointment.exception.BaseResult;

import javax.servlet.http.HttpServletRequest;

/**
 * @Description: 管理员
 * @Author: cyg
 * @Date: 2019/12/29
 * @Version:
 **/
public interface AdminService {
    /**
     * 功能描述:管理员登陆
     *
     * @param request  获取登陆ip
     * @param phone    电话
     * @param password 密码
     * @param role     角色
     * @return com.cyg.appointment.exception.BaseResult
     * @date 2019/12/29
     */
    BaseResult loginAdmin(HttpServletRequest request, String phone, String password, String role);

    /**
     * 功能描述:
     *
     * @param token token
     * @param limit 限制条数
     * @param page  页数
     * @return com.cyg.appointment.exception.BaseResult
     * @date 2019/12/31
     */
    BaseResult selectAllCoach(String token, Long page, Integer limit);

    /**
     * 功能描述:
     *
     * @param token token
     * @return com.cyg.appointment.exception.BaseResult
     * @date 2019/12/31
     */
    BaseResult selectAllCoach2(String token);


    /**
     * 功能描述:根据phone查询
     *
     * @param token token
     * @param phone 电话
     * @return com.cyg.appointment.exception.BaseResult
     * @date 2020/1/2
     */
    BaseResult selectByPhone(String token, String phone);

    /**
     * 功能描述:
     *
     * @param token   token
     * @param phone   电话
     * @param newCode 行头像的base64编码
     * @return com.cyg.appointment.exception.BaseResult
     * @date 2020/1/2
     */
    BaseResult updateImg(String token, String phone, String newCode);


    /**
     * 功能描述: 修改密码
     *
     * @param token       token
     * @param phone       电话
     * @param oldPassword 旧密码
     * @param newPassword 新密码
     * @return com.cyg.appointment.exception.BaseResult
     * @date 2020/1/3
     */
    BaseResult updatePassword(String token, String phone, String oldPassword, String newPassword);
}
