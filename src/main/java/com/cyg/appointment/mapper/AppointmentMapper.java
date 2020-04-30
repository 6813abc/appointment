package com.cyg.appointment.mapper;

import com.cyg.appointment.entity.Admin;
import com.cyg.appointment.entity.Appointment;
import com.cyg.appointment.entity.EquipType;
import org.apache.ibatis.annotations.*;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * @Description: 管理员
 * @Author: cyg
 * @Date: 2019/12/29
 * @Version:
 **/
@Repository
public interface AppointmentMapper {

    /**
     * 功能描述:插入预约信息
     *
     * @param appointment appointment
     * @return void
     * @date 2020/4/28
     */
    @Insert("insert into appointment (phone,coach_id,field_id,create_date,start_date,end_date,money,dis_count) " +
            "value (#{a.phone},#{a.coachId},#{a.fieldId},#{a.createDate},#{a.startDate},#{a.endDate},#{a.money},#{a.disCount})")
    @Options(useGeneratedKeys = true, keyProperty = "a.id")
    void addAppointment(@Param("a") Appointment appointment);

    /**
     * 功能描述:查询某个教练还未到时见的预约
     *
     * @param coachId 教练id
     * @return java.util.List<com.cyg.appointment.entity.Appointment>
     * @author cyg
     * @date 2020/4/29
     */
    @Select("select * from appointment where coach_id = #{coachId} and start_date > now()")
    @Results({
            @Result(column = "coach_id", property = "coachId"),
            @Result(column = "field_id", property = "fieldId"),
            @Result(column = "create_date", property = "createDate"),
            @Result(column = "start_date", property = "startDate"),
            @Result(column = "end_date", property = "endDate"),
            @Result(column = "dis_count", property = "disCount"),
    })
    List<Appointment> selectCoachAppointment(Long coachId);
}
