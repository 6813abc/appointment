package com.cyg.appointment.service;

import com.cyg.appointment.exception.BaseResult;

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
     * @param phone 联系方式
     * @return com.cyg.appointment.exception.BaseResult
     * @date 2020/1/4
     */
    BaseResult selectAllRecharge(String token, String phone, Long page, Integer limit);

    /**
     * 功能描述:
     *
     * @param token token
     * @param page  页数
     * @param limit 限制
     * @param phone 联系方式
     * @return com.cyg.appointment.exception.BaseResult
     * @date 2020/1/4
     */
    BaseResult selectAllConsumption(String token, String phone, Long page, Integer limit);
}
