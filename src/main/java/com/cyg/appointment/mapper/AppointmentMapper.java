package com.cyg.appointment.mapper;

import com.cyg.appointment.entity.Appointment;
import org.apache.ibatis.annotations.*;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * @Description: 预约
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

    /**
     * 功能描述:查询消费记录
     *
     * @param limit 限制
     * @param index 开始
     * @param phone 联系方式
     * @return void
     * @date 2020/4/30
     */
    @Select("select * from appointment where phone = #{phone} order by create_date desc limit #{index},#{limit}")
    @Results({
            @Result(column = "coach_id", property = "coachId"),
            @Result(column = "field_id", property = "fieldId"),
            @Result(column = "create_date", property = "createDate"),
            @Result(column = "start_date", property = "startDate"),
            @Result(column = "end_date", property = "endDate"),
            @Result(column = "dis_count", property = "disCount"),
    })
    List<Appointment> selectAllAppointment(String phone, Long index, Integer limit);

    /**
     * 功能描述:查询数据量
     *
     * @return void
     * @date 2020/4/30
     */
    @Select("select count(*) from appointment")
    Integer selectLength();
}
