package com.cyg.appointment.mapper;

import com.cyg.appointment.entity.File;
import com.cyg.appointment.entity.User;
import org.apache.ibatis.annotations.*;
import org.springframework.stereotype.Repository;

/**
 * @Description: 文件
 * @Author: cyg
 * @Date: 2019/12/25
 * @Version:
 **/
@Repository
public interface FileMapper {

    /**
     * 功能描述:新增文件
     *
     * @param file 编码
     * @return java.lang.String
     * @date 2019/12/27
     */
    @Insert("insert into file (base64) value (#{f.base64})")
    @Options(useGeneratedKeys = true, keyProperty = "f.id")
    void addFile(@Param("f") File file);

    /**
     * 功能描述:更新文件
     *
     * @param file 编码和id
     * @return java.lang.String
     * @date 2019/12/27
     */
    @Update("update file set base64 = #{f.base64} where id = #{f.id}")
    void updateFile(@Param("f") File file);

    /**
     * 功能描述:
     * @date 2019/12/29
     * @param id 图像id
     * @return com.cyg.appointment.entity.File
     */
    @Select("select * from file where id = #{id}")
    @Results({
            @Result(column = "id", property = "id"),
            @Result(column = "base64", property = "base64"),
    })
    File selectById(Long id);
}
