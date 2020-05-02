package com.cyg.appointment.controller;

import com.cyg.appointment.dto.AppointmentAddDto;
import com.cyg.appointment.dto.EquipTypeUpdateDto;
import com.cyg.appointment.exception.BaseResult;
import com.cyg.appointment.service.AppointmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * @author cyg
 * @date 2020/4/27 12:12
 **/
@RestController
@CrossOrigin
public class AppointmentController {

    @Autowired
    private AppointmentService appointmentService;

    @RequestMapping("/addAppointment")
    public BaseResult addAppointment(String token, AppointmentAddDto appointmentAddDto) {
        return appointmentService.addAppointment(token, appointmentAddDto);
    }

    @RequestMapping("/selectCoachAppointment")
    public BaseResult selectCoachAppointment(String token, Long coachId) {
        return appointmentService.selectCoachAppointment(token, coachId);
    }

    @RequestMapping("/selectAllAppointment")
    public BaseResult selectAllAppointment(String token, String phone, Long page, Integer limit) {
        return appointmentService.selectAllAppointment(token, phone, page, limit);
    }
}
