package com.cyg.appointment.mapper;

import com.cyg.appointment.entity.Recharge;
import com.cyg.appointment.entity.User;
import org.apache.ibatis.annotations.*;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * @Description: 充值记录
 * @Author: cyg
 * @Date: 2019/12/25
 * @Version:
 **/
@Repository
public interface RechargeMapper {

    /**
     * 功能描述:新增充值记录
     *
     * @param recharge 充值记录
     * @return void
     * @date 2019/1/6
     */
    @Insert("insert into recharge (id,phone,money,create_time) " +
            "value (#{r.id},#{r.phone},#{r.money},#{r.createTime})")
    void addRecharge(@Param("r") Recharge recharge);

    /**
     * 功能描述:查询充值记录
     *
     * @param limit 限制
     * @param index 开始
     * @param phone 联系方式
     * @return void
     * @date 2019/1/6
     */
    @Select("select * from recharge where phone = #{phone} order by create_time desc limit #{index},#{limit}")
    @Results({
            @Result(column = "create_time", property = "createTime"),
    })
    List<Recharge> selectAllRecharge(String phone, Long index, Integer limit);

    /**
     * 功能描述:查询数据量
     *
     * @return java.lang.String
     * @date 2019/12/28
     */
    @Select("select count(*) from recharge")
    Integer selectLength();
}
