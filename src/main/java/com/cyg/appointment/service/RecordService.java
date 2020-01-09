package com.cyg.appointment.service;

import com.cyg.appointment.dto.UserAdd;
import com.cyg.appointment.exception.BaseResult;

import javax.servlet.http.HttpServletRequest;

/**
 * @Description: 记录
 * @Author: cyg
 * @Date: 2019/12/27
 * @Version:
 **/
public interface RecordService {

    /**
     * 功能描述:
     *
     * @param token token
     * @param page  页数
     * @param limit 限制
     * @return com.cyg.appointment.exception.BaseResult
     * @date 2020/1/4
     */
    BaseResult selectAllRecharge(String token, Long page, Integer limit);
}
