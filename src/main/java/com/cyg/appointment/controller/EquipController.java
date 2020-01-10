package com.cyg.appointment.controller;

import com.cyg.appointment.dto.EquipTypeAddDto;
import com.cyg.appointment.dto.EquipTypeUpdateDto;
import com.cyg.appointment.exception.BaseResult;
import com.cyg.appointment.service.EquipService;
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
public class EquipController {

    @Autowired
    private EquipService equipService;

    @RequestMapping("/addEquipTye")
    public BaseResult addEquipTye(String token, EquipTypeAddDto equipTypeAddDto) {
        return equipService.addEquipTye(token,equipTypeAddDto);
    }

    @RequestMapping("/updateEquipType")
    public BaseResult updateEquipType(String token, EquipTypeUpdateDto equipTypeUpdateDto) {
        return equipService.updateEquipType(token,equipTypeUpdateDto);
    }

    @RequestMapping("/selectAllEquipType")
    public BaseResult selectAllEquipType(String token,  Long page, Integer limit) {
        return equipService.selectAllEquipType(token, page, limit);
    }
}
