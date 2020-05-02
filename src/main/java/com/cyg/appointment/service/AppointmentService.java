package com.cyg.appointment.service;

import com.cyg.appointment.dto.AppointmentAddDto;
import com.cyg.appointment.dto.AppointmentSelectDto;
import com.cyg.appointment.entity.*;
import com.cyg.appointment.exception.BaseResult;
import com.cyg.appointment.exception.ResultEnum;
import com.cyg.appointment.exception.ResultUtil;
import com.cyg.appointment.mapper.*;
import com.cyg.appointment.util.Constants;
import com.cyg.appointment.util.DateUtil;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

/**
 * @Description: appointment
 * @Author: cyg
 * @Date: 2019/1/9
 * @Version:
 **/
@Service
@Slf4j
public class AppointmentService {

    private final UserMapper userMapper;
    private final MemberMapper memberMapper;
    private final AppointmentMapper appointmentMapper;
    private final AdminMapper adminMapper;
    private final FieldMapper fieldMapper;
    private final AppointmentEquipMapper appointmentEquipMapper;
    private final EquipMapper equipMapper;

    public AppointmentService(UserMapper userMapper, MemberMapper memberMapper, AppointmentMapper appointmentMapper, AdminMapper adminMapper, FieldMapper fieldMapper, AppointmentEquipMapper appointmentEquipMapper, EquipMapper equipMapper) {
        this.userMapper = userMapper;
        this.memberMapper = memberMapper;
        this.appointmentMapper = appointmentMapper;
        this.adminMapper = adminMapper;
        this.fieldMapper = fieldMapper;
        this.appointmentEquipMapper = appointmentEquipMapper;
        this.equipMapper = equipMapper;
    }


    /**
     * 功能描述:
     *
     * @param token             token
     * @param appointmentAddDto 添加预约
     * @return com.cyg.appointment.exception.BaseResult
     * @author cyg
     * @date 2020/1/9
     */
    @Transactional(rollbackFor = Exception.class)
    public BaseResult addAppointment(String token, AppointmentAddDto appointmentAddDto) {
        try {
            User user = userMapper.getUserByPhone(appointmentAddDto.getPhone());
            if (user == null) {
                return ResultUtil.error(ResultEnum.NO_USER_INFO);
            }
            double moneyCountAll = 0d;
            double disCountAll = 0d;
            double actualMoney = 0d;
            System.out.println(appointmentAddDto);
            if (StringUtils.isEmpty(appointmentAddDto.getTime())) {
                return ResultUtil.error(ResultEnum.TIME_NOT_NULL);
            }
            List<Appointment> appointments = new ArrayList<>();
            String[] times = appointmentAddDto.getTime().split("、");
            for (String time : times) {
                Appointment appointment = new Appointment();
                BeanUtils.copyProperties(appointmentAddDto, appointment);
                appointment.setCreateDate(DateUtil.getToDayTime());
                String[] dates = time.split("/");
                String year = dates[0].substring(0, 4);
                String month = dates[1].length() == 2 ? dates[1] : "0" + dates[1];
                String day = dates[2].length() == 6 ? dates[2].substring(0, 2) : "0" + dates[2].substring(0, 1);
                String[] hours = dates[3].split("-");
                String startHour = hours[0].length() == 5 ? hours[0] + ":" + "00" : "0" + hours[0] + ":" + "00";
                String endHour = hours[1].length() == 5 ? hours[1] + ":" + "00" : "0" + hours[1] + ":" + "00";
                String startTime = year + "-" + month + "-" + day + " " + startHour;
                String endTime = year + "-" + month + "-" + day + " " + endHour;
                appointment.setStartDate(startTime);
                appointment.setEndDate(endTime);
                //计算花费金额
                double money = 0;
                double discount;
                double moneyCount = Constants.ONE;
                Member member = memberMapper.getMemberById(user.getMemberId());
                if (member != null) {
                    int i = DateUtil.getToDayTime().compareTo(member.getUpToDate());
                    //代表会员还未过期
                    if (i < 0) {
                        money = getMoney(moneyCount, member.getGrade());
                    } else {
                        money = getMoney(moneyCount, "普通用户");
                    }
                } else {
                    money = getMoney(moneyCount, "普通用户");
                }
                discount = moneyCount - money;
                moneyCountAll += moneyCount;
                disCountAll += discount;
                actualMoney += money;
                appointment.setMoney(money);
                appointment.setDisCount(discount);
                appointments.add(appointment);
            }
            if (user.getBalance() < actualMoney) {
                return ResultUtil.error(ResultEnum.BALANCE_IS_LOW);
            }
            double balance = user.getBalance() - actualMoney;
            userMapper.updateBalance(user.getPhone(), balance);
            for (Appointment appointment : appointments) {
                System.out.println(appointment);
                appointmentMapper.addAppointment(appointment);
                String[] equipIds = appointmentAddDto.getEquipId().split(",");
                for (String equipId : equipIds) {
                    AppointmentEquip appointmentEquip = new AppointmentEquip();
                    appointmentEquip.setAppointmentId(appointment.getId());
                    appointmentEquip.setCreateDate(DateUtil.getToDayTime());
                    appointmentEquip.setEquipTypeId(Long.valueOf(equipId));
                    appointmentEquipMapper.addAppointmentEquip(appointmentEquip);
                }
            }
            Map<String, Object> map = new HashMap<>(4);
            map.put("moneyCountAll", moneyCountAll);
            map.put("disCountAll", disCountAll);
            map.put("actualMoney", actualMoney);
            map.put("balance", balance);
            return ResultUtil.success(ResultEnum.OK, map);
        } catch (Exception e) {
            e.printStackTrace();
            return ResultUtil.error(ResultEnum.ERROR);
        }
    }

    private double getMoney(double money, String grade) {
        switch (grade) {
            case Constants.QT:
                return money * 0.95;
            case Constants.BY:
                return money * 0.9;
            case Constants.HJ:
                return money * 0.85;
            case Constants.ZS:
                return money * 0.8;
            case Constants.ZZ:
                return money * 0.7;
            default:
                return money * 0.98;
        }
    }

    public BaseResult selectCoachAppointment(String token, Long coachId) {
        List<Appointment> appointments = appointmentMapper.selectCoachAppointment(coachId);
        return ResultUtil.success(ResultEnum.OK, appointments);
    }

    public BaseResult selectAllAppointment(String token, String phone, Long page, Integer limit) {
        Long index = (page - 1) * limit;
        List<Appointment> appointments = appointmentMapper.selectAllAppointment(phone, index, limit);
        List<AppointmentSelectDto> appointmentSelectDtos = new ArrayList<>();
        for (Appointment appointment : appointments) {
            AppointmentSelectDto appointmentSelectDto = new AppointmentSelectDto();
            BeanUtils.copyProperties(appointment, appointmentSelectDto);
            Admin admin = adminMapper.getAdminById(appointment.getCoachId());
            if (admin != null) {
                appointmentSelectDto.setCoachName(admin.getName());
            }
            Field field = fieldMapper.selectById(appointment.getFieldId());
            if (field != null) {
                appointmentSelectDto.setFieldName(field.getAddress());
            }
            StringBuilder equipName = new StringBuilder();
            List<AppointmentEquip> appointmentEquips = appointmentEquipMapper.selectAppointmentEquip(appointment.getId());
            for (int i = 0; i < appointmentEquips.size(); i++) {
                AppointmentEquip appointmentEquip = appointmentEquips.get(i);
                EquipType equipType = equipMapper.selectEquipTypeById(appointmentEquip.getEquipTypeId());
                if (i == appointmentEquips.size() - 1) {
                    equipName.append(equipType.getName());
                } else {
                    equipName.append("、").append(equipType.getName());
                }
            }
            appointmentSelectDto.setEquipName(equipName.toString());
            appointmentSelectDtos.add(appointmentSelectDto);
        }
        Map<String, Object> map = new HashMap<>(4);
        map.put("length", appointmentMapper.selectLength());
        map.put("data", appointmentSelectDtos);
        return ResultUtil.success(map);
    }
}
