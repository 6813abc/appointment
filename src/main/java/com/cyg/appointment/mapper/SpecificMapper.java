package com.cyg.appointment.mapper;

import com.cyg.appointment.entity.EquipTypeSpecific;
import com.cyg.appointment.entity.EquipTypeSpecificChoice;
import com.cyg.appointment.entity.Recharge;
import com.cyg.appointment.entity.Specific;
import org.apache.ibatis.annotations.*;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * equip种类属性
 *
 * @author cyg
 * @date 2020/1/9 15:07
 **/
@Repository
public interface SpecificMapper {

    /**
     * 功能描述:新增器材类型属性和器材种类的关联干洗
     *
     * @param equipTypeSpecific 属性和器材关联关系
     * @return void
     * @date 2019/1/11
     */
    @Insert("insert into equip_type_specific (equip_type_id,name,value) value (#{e.equipTypeId},#{e.name},#{e.value})")
    void addEquipTypeSpecific(@Param("e") EquipTypeSpecific equipTypeSpecific);

    /**
     * 功能描述:新增器材类型属性名称
     *
     * @param specific 器材类型的特殊名称
     * @return void
     * @date 2019/1/11
     */
    @Insert("insert into specific (name) value (#{s.name})")
    @Options(useGeneratedKeys = true, keyProperty = "s.id")
    void addSpecific(@Param("s") Specific specific);

    /**
     * 功能描述:新增器材类型的名称的选项
     *
     * @param equipTypeSpecificChoice 器材类型的特殊选项
     * @return void
     * @date 2019/1/11
     */
    @Insert("insert into equip_type_specific_choice (specific_id,order,option) value (#{e.specificId}," +
            "#{e.order},#{e.option})")
    void addEquipTypeSpecificChoice(@Param("e") EquipTypeSpecificChoice equipTypeSpecificChoice);

    /**
     * 功能描述:查询器材类型的特特殊名称
     *
     * @return void
     * @date 2019/1/11
     */
    @Select("select * from `specific`")
    List<Specific> selectAllSpecific();

    /**
     * 功能描述:查询器材类型的特特殊名称
     *
     * @param specificId 器材属性名称
     * @return void
     * @date 2019/1/11
     */
    @Select("select * from equip_type_specific_choice where specific_id=#{specificId}")
    @Results({
            @Result(column = "specific_d", property = "specificId"),
    })
    List<EquipTypeSpecificChoice> selectAllEquipTypeSpecificChoiceBySpecificId(Long specificId);
}
