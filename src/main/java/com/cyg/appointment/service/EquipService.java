package com.cyg.appointment.service;

import com.cyg.appointment.dto.EquipTypeAddDto;
import com.cyg.appointment.dto.EquipTypeUpdateDto;
import com.cyg.appointment.exception.BaseResult;

/**
 * @Description: equip
 * @Author: cyg
 * @Date: 2019/1/9
 * @Version:
 **/
public interface EquipService {


    /**
     * 功能描述:
     *
     * @param token           token
     * @param equipTypeAddDto 添加equipType
     * @return com.cyg.appointment.exception.BaseResult
     * @author cyg
     * @date 2020/1/9
     */
    BaseResult addEquipTye(String token, EquipTypeAddDto equipTypeAddDto);


    /**
     * 功能描述:
     *
     * @param token              token
     * @param equipTypeUpdateDto 编辑equipType
     * @return com.cyg.appointment.exception.BaseResult
     * @author cyg
     * @date 2020/1/10
     */
    BaseResult updateEquipType(String token, EquipTypeUpdateDto equipTypeUpdateDto);

    /**
     * 功能描述:查询器材种类
     *
     * @param token token
     * @param page  页数
     * @param limit 限制
     * @return com.cyg.appointment.exception.BaseResult
     * @date 2020/1/9
     */
    BaseResult selectAllEquipType(String token, Long page, Integer limit);
}
