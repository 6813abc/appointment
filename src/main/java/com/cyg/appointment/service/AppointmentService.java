package com.cyg.appointment.service;

import com.cyg.appointment.dto.AppointmentAddDto;
import com.cyg.appointment.dto.EquipTypeAddDto;
import com.cyg.appointment.dto.EquipTypeUpdateDto;
import com.cyg.appointment.exception.BaseResult;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

/**
 * @Description: appointment
 * @Author: cyg
 * @Date: 2019/1/9
 * @Version:
 **/
@Service
@Slf4j
public class AppointmentService {


    /**
     * 功能描述:
     *
     * @param token             token
     * @param appointmentAddDto 添加预约
     * @return com.cyg.appointment.exception.BaseResult
     * @author cyg
     * @date 2020/1/9
     */
    BaseResult addAppointment(String token, AppointmentAddDto appointmentAddDto) {
        return null;
    }

}
