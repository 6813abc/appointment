package com.cyg.appointment.service.impl;

import com.cyg.appointment.exception.BaseResult;
import com.cyg.appointment.exception.ResultEnum;
import com.cyg.appointment.exception.ResultUtil;
import com.cyg.appointment.mapper.ConsumptionMapper;
import com.cyg.appointment.mapper.FiledMapper;
import com.cyg.appointment.mapper.RechargeMapper;
import com.cyg.appointment.vo.EquipTypeSelectVo;
import com.cyg.appointment.vo.FiledSelectVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @author cyg
 * @date 2020/1/9 10:05
 **/
@Service
public class FieldService {

    @Autowired
    private FiledMapper filedMapper;

    public BaseResult selectAll(String token, Long page, Integer limit){
        Long index = (page - 1) * limit;
        List<FiledSelectVo> filedSelectVos = filedMapper.selectAllFiled(index, limit);
        Map<String, Object> map = new HashMap<>(4);
        map.put("length", filedMapper.selectLength());
        map.put("data", filedSelectVos);
        return ResultUtil.success(ResultEnum.OK, map);
    }

}
