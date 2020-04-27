package com.cyg.appointment.controller;

import com.cyg.appointment.exception.BaseResult;
import com.cyg.appointment.service.RecordService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * @Description: 记录管理
 * @Author: cyg
 * @Date: 2019/1/9
 * @Version:
 **/
@RestController
@CrossOrigin
public class RechargeController {

    @Autowired
    private RecordService recordService;

    @RequestMapping("/selectAllRecharge")
    public BaseResult selectAllRecharge(String token, String phone, Long page, Integer limit) {
        return recordService.selectAllRecharge(token, phone, page, limit);
    }

    @RequestMapping("/selectAllConsumption")
    public BaseResult selectAllConsumption(String token, String phone, Long page, Integer limit) {
        return recordService.selectAllConsumption(token, phone, page, limit);
    }
}
