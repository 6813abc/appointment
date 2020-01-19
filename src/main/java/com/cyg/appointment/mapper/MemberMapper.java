package com.cyg.appointment.mapper;

import com.cyg.appointment.entity.Member;
import com.cyg.appointment.entity.User;
import org.apache.ibatis.annotations.*;
import org.springframework.stereotype.Repository;

/**
 * @Description: member
 * @Author: cyg
 * @Date: 2020/1/6
 * @Version:
 **/
@Repository
public interface MemberMapper {

    /**
     * 功能描述:根据id
     *
     * @param id id
     * @return com.cyg.appointment.entity.Member
     * @date 2020/1/6
     */
    @Select("select * from member where id = #{id}")
    @Results({
            @Result(column = "member_date", property = "memberDate"),
            @Result(column = "up_to_date", property = "upToDate"),
    })
    Member getMemberById(Long id);

    /**
     * 功能描述:新增member
     *
     * @param member 会员
     * @return void
     * @date 2019/12/28
     */
    @Insert("insert into member (grade,integral,member_date,up_to_date) " +
            "value (#{m.grade},#{m.integral},#{m.memberDate},#{m.upToDate})")
    @Options(useGeneratedKeys = true, keyProperty = "m.id")
    void addMember(@Param("m") Member member);

    /**
     * 功能描述:修改member
     *
     * @param member 会员
     * @return void
     * @author cyg
     * @date 2020/1/19
     */
    @Update("update member set grade= #{m.grade},integral= #{m.integral}," +
            "member_date= #{m.memberDate},up_to_date= #{m.upToDate}")
    void updateMember(@Param("m") Member member);
}
