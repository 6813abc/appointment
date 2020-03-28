package com.cyg.appointment.controller;

import com.cyg.appointment.exception.BaseResult;
import com.cyg.appointment.service.impl.FieldService;
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
public class FieldController {

    @Autowired
    private FieldService fieldService;

   /* @RequestMapping("/addField")
    public BaseResult addFiled(String token, EquipTypeAddDto equipTypeAddDto) {
        return equipService.addFiled(token,equipTypeAddDto);
    }*/

    /*@RequestMapping("/updateField")
    public BaseResult updateEquipType(String token, EquipTypeUpdateDto equipTypeUpdateDto) {
        return equipService.updateEquipType(token,equipTypeUpdateDto);
    }*/

    @RequestMapping("/selectAllField")
    public BaseResult selectAllFiled(String token,  Long page, Integer limit) {
        return fieldService.selectAll(token, page, limit);
    }
}
