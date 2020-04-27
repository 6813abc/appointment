package com.cyg.appointment.controller;

import com.cyg.appointment.entity.EquipTypeSpecificChoice;
import com.cyg.appointment.entity.Specific;
import com.cyg.appointment.exception.BaseResult;
import com.cyg.appointment.service.SpecificService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * @Description: 属性管理
 * @Author: cyg
 * @Date: 2019/1/11
 * @Version:
 **/
@RestController
@CrossOrigin
public class SpecificController {

    @Autowired
    private SpecificService specificService;

    @RequestMapping("/selectAllSpecific")
    public BaseResult selectAllSpecific(String token) {
        return specificService.selectAllSpecific(token);
    }

    @RequestMapping("/selectAllEquipTypeSpecificChoiceBySpecificId")
    public BaseResult selectAllEquipTypeSpecificChoiceBySpecificId(String token, Long specificId) {
        return specificService.selectAllEquipTypeSpecificChoiceBySpecificId(token,specificId);
    }

    @RequestMapping("/addSpecific")
    public BaseResult addSpecific(String token,Specific specific) {
        return specificService.addSpecific(token,specific );
    }

    @RequestMapping("/addEquipTypeSpecificChoice")
    public BaseResult addEquipTypeSpecificChoice(String token, EquipTypeSpecificChoice equipTypeSpecificChoice) {
        return specificService.addEquipTypeSpecificChoice(token, equipTypeSpecificChoice);
    }
}
