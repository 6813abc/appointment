package com.cyg.appointment.mapper;

import com.cyg.appointment.entity.Consumption;
import com.cyg.appointment.entity.Recharge;
import org.apache.ibatis.annotations.*;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * @Description: 消费记录
 * @Author: cyg
 * @Date: 2019/12/25
 * @Version:
 **/
@Repository
public interface ConsumptionMapper {

    /**
     * 功能描述:新增消费记录
     *
     * @param consumption 消费记录
     * @return void
     * @date 2019/1/9
     */
    @Insert("insert into consumption (id,phone,money,create_time,type) " +
            "value (#{c.id},#{c.phone},#{c.money},#{c.createTime},#{c.type})")
    void addConsumption(@Param("c") Consumption consumption);

    /**
     * 功能描述:查询消费记录
     *
     * @param limit 限制
     * @param index 开始
     * @param phone 联系方式
     * @return void
     * @date 2019/1/6
     */
    @Select("select * from consumption where phone = #{phone} order by create_time desc limit #{index},#{limit}")
    @Results({
            @Result(column = "create_time", property = "createTime"),
    })
    List<Consumption> selectAllConsumption(String phone, Long index, Integer limit);

    /**
     * 功能描述:查询数据量
     *
     * @return java.lang.String
     * @date 2019/12/28
     */
    @Select("select count(*) from consumption")
    Integer selectLength();
}
