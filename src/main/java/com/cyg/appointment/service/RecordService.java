package com.cyg.appointment.service;

import com.cyg.appointment.entity.Consumption;
import com.cyg.appointment.entity.Recharge;
import com.cyg.appointment.exception.BaseResult;
import com.cyg.appointment.exception.ResultUtil;
import com.cyg.appointment.mapper.ConsumptionMapper;
import com.cyg.appointment.mapper.RechargeMapper;
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
public class RecordService {

    @Autowired
    private RechargeMapper rechargeMapper;
    @Autowired
    private ConsumptionMapper consumptionMapper;


    public BaseResult selectAllRecharge(String token, String phone, Long page, Integer limit) {
        Long index = (page - 1) * limit;
        List<Recharge> recharges = rechargeMapper.selectAllRecharge(phone, index, limit);
        Map<String, Object> map = new HashMap<>(4);
        map.put("length", rechargeMapper.selectLength());
        map.put("data", recharges);
        return ResultUtil.success(map);
    }


    public BaseResult selectAllConsumption(String token, String phone, Long page, Integer limit) {
        Long index = (page - 1) * limit;
        List<Consumption> recharges = consumptionMapper.selectAllConsumption(phone, index, limit);
        Map<String, Object> map = new HashMap<>(4);
        map.put("length", consumptionMapper.selectLength());
        map.put("data", recharges);
        return ResultUtil.success(map);
    }
}
