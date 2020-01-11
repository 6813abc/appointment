package com.cyg.appointment.service;

import com.cyg.appointment.entity.EquipTypeSpecificChoice;
import com.cyg.appointment.entity.Specific;
import com.cyg.appointment.exception.BaseResult;

/**
 * @Description: 属性
 * @Author: cyg
 * @Date: 2019/12/27
 * @Version:
 **/
public interface SpecificService {

    /**
     * 功能描述:
     *
     * @param token token
     * @return com.cyg.appointment.exception.BaseResult
     * @date 2020/1/4
     */
    BaseResult selectAllSpecific(String token);

    /**
     * 功能描述:
     *
     * @param token      token
     * @param specificId 属性id
     * @return com.cyg.appointment.exception.BaseResult
     * @date 2020/1/4
     */
    BaseResult selectAllEquipTypeSpecificChoiceBySpecificId(String token, Long specificId);

    /**
     * 功能描述:
     *
     * @param token    token
     * @param specific 属性
     * @return com.cyg.appointment.exception.BaseResult
     * @date 2020/1/4
     */
    BaseResult addSpecific(String token, Specific specific);

    /**
     * 功能描述:
     *
     * @param token                   token
     * @param equipTypeSpecificChoice 属性值选项
     * @return com.cyg.appointment.exception.BaseResult
     * @date 2020/1/4
     */
    BaseResult addEquipTypeSpecificChoice(String token, EquipTypeSpecificChoice equipTypeSpecificChoice);
}
