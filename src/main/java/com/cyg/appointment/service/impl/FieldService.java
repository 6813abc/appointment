package com.cyg.appointment.service.impl;

import com.cyg.appointment.exception.BaseResult;
import com.cyg.appointment.exception.ResultEnum;
import com.cyg.appointment.exception.ResultUtil;
import com.cyg.appointment.mapper.FieldMapper;
import com.cyg.appointment.vo.FieldSelectVo;
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
    private FieldMapper filedMapper;

    public BaseResult selectAll(String token, Long page, Integer limit){
        Long index = (page - 1) * limit;
        List<FieldSelectVo> filedSelectVos = filedMapper.selectAllFiled(index, limit);
        Map<String, Object> map = new HashMap<>(4);
        map.put("length", filedMapper.selectLength());
        map.put("data", filedSelectVos);
        return ResultUtil.success(ResultEnum.OK, map);
    }

}
