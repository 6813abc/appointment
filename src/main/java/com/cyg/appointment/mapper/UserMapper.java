package com.cyg.appointment.mapper;

import com.cyg.appointment.entity.User;
import org.apache.ibatis.annotations.*;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * @Description: 用户
 * @Author: cyg
 * @Date: 2019/12/25
 * @Version:
 **/
@Repository
public interface UserMapper {

    /**
     * 功能描述:根据用户名查询用户
     *
     * @param phone 手机号
     * @return java.lang.String
     * @date 2019/12/28
     */
    @Select("select * from user where phone = #{phone}")
    @Results({
            @Result(column = "user_id", property = "userId"),
            @Result(column = "img_id", property = "imgId"),
            @Result(column = "member_id", property = "memberId"),
    })
    User getUserByPhone(String phone);

    /**
     * 功能描述:新增用户
     *
     * @param user 用户
     * @return void
     * @date 2019/12/28
     */
    @Insert("insert into user (phone,password,name,img_id,sex,address) " +
            "value (#{u.phone},#{u.password},#{u.name},#{u.imgId},#{u.sex},#{u.address})")
    @Options(useGeneratedKeys = true, keyProperty = "u.userId")
    void addUser(@Param("u") User user);

    /**
     * 功能描述:查询所有
     *
     * @param index 开始
     * @param limit 限制
     * @return java.lang.String
     * @date 2019/12/28
     */
    @Select("select * from user limit #{index},#{limit}")
    @Results({
            @Result(column = "user_id", property = "userId"),
            @Result(column = "img_id", property = "imgId"),
            @Result(column = "member_id", property = "memberId"),
    })
    List<User> selectAll(Long index, Integer limit);

    /**
     * 功能描述:查询数据量
     *
     * @return java.lang.String
     * @date 2019/12/28
     */
    @Select("select count(*) from user")
    Integer selectLength();

    /**
     * 功能描述:
     *
     * @param phone   电话
     * @param balance 余额
     * @return void
     * @date 2020/1/5
     */
    @Update("update user set balance = #{balance} where phone =#{phone}")
    void updateBalance(String phone, Long balance);

    /**
     * 功能描述:
     *
     * @param phone    电弧
     * @param memberId memberId
     * @return void
     * @date 2020/1/6
     */
    @Update("update user set member_id=#{memberId} where phone =#{phone}")
    void uodateMemberId(String phone, Long memberId);
}
