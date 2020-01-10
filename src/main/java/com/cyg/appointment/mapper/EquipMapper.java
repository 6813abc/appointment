package com.cyg.appointment.mapper;

import com.cyg.appointment.entity.EquipType;
import com.cyg.appointment.entity.Recharge;
import com.cyg.appointment.vo.EquipTypeSelectVo;
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
public interface EquipMapper {

    /**
     * 功能描述:新增器材种类
     *
     * @param equipType equipType
     * @return void
     * @date 2019/1/9
     */
    @Insert("insert into equip_type (code,name,unit_price,picture_id,create_time) " +
            "value (#{e.code},#{e.name},#{e.unitPrice},#{e.pictureId},#{e.createTime})")
    @Options(useGeneratedKeys = true, keyProperty = "e.id")
    void addEquipType(@Param("e") EquipType equipType);

    /**
     * 功能描述:查询器材类型
     *
     * @param limit 限制
     * @param index 开始
     * @return void
     * @date 2019/1/6
     */
    @Select("select e.id,e.code,e.name,e.unit_price,e.create_time,f.base64 from equip_type e join file f on e.picture_id = f.id   order by e.create_time desc limit #{index},#{limit}")
    @Results({
            @Result(column = "create_time", property = "createTime"),
            @Result(column = "unit_price", property = "unitPrice"),
            @Result(column = "base64", property = "pictureCode"),
    })
    List<EquipTypeSelectVo> selectAllEquipType(Long index, Integer limit);

    /**
     * 功能描述:查询器材类型
     *
     * @param id id
     * @return void
     * @date 2019/1/6
     */
    @Select("select * from equip_type where id = #{id}")
    @Results({
            @Result(column = "create_time", property = "createTime"),
            @Result(column = "unit_price", property = "unitPrice"),
            @Result(column = "base64", property = "pictureCode"),
    })
    EquipType selectEquipTypeById(Long id);


    @Update("update equip_type set code = #{e.code},name=#{e.name},unit_price=#{unitPrice}")
    void updateEquipType(@Param("e") EquipType equipType);

    /**
     * 功能描述:查询数据量
     *
     * @return java.lang.String
     * @date 2019/12/28
     */
    @Select("select count(*) from equip_type")
    Integer selectEquipTypeLength();

    /**
     * 功能描述:查询数据量
     *
     * @return java.lang.String
     * @date 2019/12/28
     */
    @Select("select count(*) from equip")
    Integer selectEquipLength();
}
