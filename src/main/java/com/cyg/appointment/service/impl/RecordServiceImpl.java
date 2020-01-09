package com.cyg.appointment.service.impl;

import com.cyg.appointment.entity.Recharge;
import com.cyg.appointment.entity.User;
import com.cyg.appointment.exception.BaseResult;
import com.cyg.appointment.exception.ResultUtil;
import com.cyg.appointment.mapper.RechargeMapper;
import com.cyg.appointment.service.RecordService;
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
public class RecordServiceImpl implements RecordService {

    @Autowired
    private RechargeMapper rechargeMapper;

    @Override
    public BaseResult selectAllRecharge(String token, Long page, Integer limit) {
        Long index = (page - 1) * limit;
        List<Recharge> recharges = rechargeMapper.selectAllRecharge(index, limit);
        Map<String, Object> map = new HashMap<>(4);
        map.put("length", rechargeMapper.selectLength());
        map.put("data", recharges);
        return ResultUtil.success(map);
    }
}
