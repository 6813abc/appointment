package com.cyg.appointment.mapper;

import com.cyg.appointment.entity.Admin;
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
public interface AdminMapper {

    /**
     * 功能描述:根据电话查询管理员
     *
     * @param phone 手机号
     * @return java.lang.String
     * @date 2019/12/28
     */
    @Select("select * from admin where phone = #{phone}")
    @Results({
            @Result(column = "img_id", property = "imgId"),
    })
    Admin getAdminByPhone(String phone);

    /**
     * 功能描述:查询所有
     *
     * @param index 开始
     * @param limit 限制
     * @return java.lang.String
     * @date 2019/12/28
     */
    @Select("select * from admin limit #{index},#{limit}")
    @Results({
            @Result(column = "img_id", property = "imgId"),
    })
    List<Admin> selectAll(Long index, Integer limit);

    /**
     * 功能描述:查询所有教练
     *
     * @return java.lang.String
     * @date 2019/12/28
     */
    @Select("select * from admin where role = '教练'")
    @Results({
            @Result(column = "img_id", property = "imgId"),
    })
    List<Admin> selectAllCoach2();

    /**
     * 功能描述:查询数据量
     *
     * @return java.lang.String
     * @date 2019/12/28
     */
    @Select("select count(*) from admin")
    Integer selectLength();

    /**
     * 功能描述:修改密码
     *
     * @param phone    电话
     * @param password 新密码
     * @return void
     * @date 2020/1/4
     */
    @Update("update admin set password=#{password} where phone = #{phone}")
    void updatePassword(String phone, String password);
}
