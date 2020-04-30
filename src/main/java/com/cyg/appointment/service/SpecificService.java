package com.cyg.appointment.service;

import com.cyg.appointment.entity.EquipTypeSpecificChoice;
import com.cyg.appointment.entity.Specific;
import com.cyg.appointment.exception.BaseResult;
import com.cyg.appointment.exception.ResultEnum;
import com.cyg.appointment.exception.ResultUtil;
import com.cyg.appointment.mapper.SpecificMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * @author cyg
 * @date 2020/1/9 10:05
 **/
@Service
@Transactional(rollbackFor = Exception.class)
@Slf4j
public class SpecificService {

    @Autowired
    private SpecificMapper specificMapper;


    public BaseResult selectAllSpecific(String token) {

        return ResultUtil.success(ResultEnum.OK, specificMapper.selectAllSpecific());
    }


    public BaseResult selectAllEquipTypeSpecificChoiceBySpecificId(String token, Long specificId) {
        return ResultUtil.success(ResultEnum.OK, specificMapper.selectAllEquipTypeSpecificChoiceBySpecificId(specificId));
    }


    public BaseResult addSpecific(String token, Specific specific) {
        specificMapper.addSpecific(specific);
        return ResultUtil.success(ResultEnum.OK);
    }


    public BaseResult addEquipTypeSpecificChoice(String token, EquipTypeSpecificChoice equipTypeSpecificChoice) {
        specificMapper.addEquipTypeSpecificChoice(equipTypeSpecificChoice);
        return ResultUtil.success(ResultEnum.OK);
    }
}
