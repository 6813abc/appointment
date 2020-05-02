package com.cyg.appointment.mapper;

import com.cyg.appointment.entity.Appointment;
import com.cyg.appointment.entity.AppointmentEquip;
import org.apache.ibatis.annotations.*;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * @Description: 器材预约
 * @Author: cyg
 * @Date: 2019/12/29
 * @Version:
 **/
@Repository
public interface AppointmentEquipMapper {

    /**
     * 功能描述:插入预约器材信息
     *
     * @param appointmentEquip appointmentEquip
     * @return void
     * @date 2020/4/28
     */
    @Insert("insert into appointment_equip (appointment_id,equip_type_id,create_time) " +
            "value (#{a.appointmentId},#{a.equipTypeId},#{a.createDate})")
    @Options(useGeneratedKeys = true, keyProperty = "a.id")
    void addAppointmentEquip(@Param("a") AppointmentEquip appointmentEquip);

    /**
     * 功能描述:查询预约器材信息
     *
     * @param appointmentId appointmentId
     * @return java.util.List<com.cyg.appointment.entity.Appointment>
     * @author cyg
     * @date 2020/4/29
     */
    @Select("select * from appointment_equip where appointment_id = #{appointmentId}")
    @Results({
            @Result(column = "appointment_id", property = "appointmentId"),
            @Result(column = "equip_type_id", property = "equipTypeId"),
            @Result(column = "create_date", property = "createDate"),
    })
    List<AppointmentEquip> selectAppointmentEquip(Long appointmentId);
}
