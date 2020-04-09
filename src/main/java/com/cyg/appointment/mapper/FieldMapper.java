package com.cyg.appointment.mapper;

import com.cyg.appointment.entity.Field;
import com.cyg.appointment.vo.FieldSelectVo;
import org.apache.ibatis.annotations.*;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * @Description: 场地
 * @Author: cyg
 * @Date: 2019/12/25
 * @Version:
 **/
@Repository
public interface FieldMapper {

    /**
     * 功能描述:新增场地
     *
     * @param field 编码
     * @return java.lang.String
     * @date 2019/12/27
     */
    @Insert("insert into Field (base64) value (#{f.base64})")
    @Options(useGeneratedKeys = true, keyProperty = "f.id")
    void addFiledd(@Param("f") Field field);

    /**
     * 功能描述:更新场地
     *
     * @param field 编码和id
     * @return java.lang.String
     * @date 2019/12/27
     */
    @Update("update Field set base64 = #{f.base64} where id = #{f.id}")
    void updateFiled(@Param("f") Field field);

    /**
     * 功能描述:
     *
     * @param limit 限制
     * @param index 开始
     * @return com.cyg.appointment.entity.Field
     * @date 2019/12/29
     */
    @Select("select e.id,e.room_number,e.address,e.capacity,f.base64 from field e join file f on e.img_id = f.id   limit #{index},#{limit}")
    @Results({
            @Result(column = "room_number", property = "roomNumber"),
            @Result(column = "base64", property = "code"),
    })
    List<FieldSelectVo> selectAllFiled(Long index, Integer limit);

    /**
     * 功能描述:查询数据量
     *
     * @return java.lang.String
     * @date 2019/12/28
     */
    @Select("select count(*) from field")
    Integer selectLength();
}
