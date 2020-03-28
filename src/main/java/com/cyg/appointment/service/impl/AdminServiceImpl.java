package com.cyg.appointment.service.impl;

import com.cyg.appointment.config.JwtToken;
import com.cyg.appointment.dto.AdminDto;
import com.cyg.appointment.entity.Admin;
import com.cyg.appointment.entity.File;
import com.cyg.appointment.entity.User;
import com.cyg.appointment.exception.BaseResult;
import com.cyg.appointment.exception.ResultEnum;
import com.cyg.appointment.exception.ResultUtil;
import com.cyg.appointment.mapper.AdminMapper;
import com.cyg.appointment.mapper.FileMapper;
import com.cyg.appointment.mapper.UserMapper;
import com.cyg.appointment.service.AdminService;
import com.cyg.appointment.util.JedisUtil;
import com.cyg.appointment.util.ValidateCodeUtil;
import com.cyg.appointment.vo.AdminSelect;
import com.sun.org.apache.bcel.internal.generic.NEW;
import net.coobird.thumbnailator.Thumbnails;
import org.apache.commons.lang3.StringUtils;
import org.apache.ibatis.annotations.Select;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @Description: TODO
 * @Author: cyg
 * @Date: 2019/12/29
 * @Version:
 **/
@Service
public class AdminServiceImpl implements AdminService {
    @Autowired
    private AdminMapper adminMapper;
    @Autowired
    private JwtToken jwtToken;
    @Autowired
    private ValidateCodeUtil validateCodeUtil;
    @Autowired
    private JedisUtil jedisUtil;
    @Autowired
    private FileMapper fileMapper;

    @Override
    public BaseResult loginAdmin(HttpServletRequest request, String phone, String password, String role) {
        if (StringUtils.isEmpty(phone) || StringUtils.isEmpty(password)) {
            return ResultUtil.error(ResultEnum.PHONE_PASSWORD_EMPTY);
        }
        //校验用户账号密码
        Admin admin = adminMapper.getAdminByPhone(phone);
        if (admin == null) {
            return ResultUtil.error(ResultEnum.NO_USER_INFO);
        }
        if (!password.equals(admin.getPassword())) {
            return ResultUtil.error(ResultEnum.PASSWORD_ERROR);
        }
        File file = fileMapper.selectById(admin.getImgId());
        Map<String, String> map = new HashMap<>(4);
        if (StringUtils.isEmpty(role)) {
            role = "";
        }
        //权限判断
        if (!admin.getRole().contains(role)) {
            return ResultUtil.error(ResultEnum.IS_NOT_AUTH);
        }
        //生成token
        String token = jwtToken.generateToken(phone);
        map.put("role", admin.getRole());
        map.put("token", token);
        if (file != null) {
            map.put("code", file.getBase64());
        }
        return ResultUtil.success(map);
    }

    @Override
    public BaseResult selectAllCoach(String token, Long page, Integer limit) {
        Long index = (page - 1) * limit;
        List<Admin> admins = adminMapper.selectAll(index, limit);
        Map<String, Object> map = new HashMap<>(4);
        map.put("length", adminMapper.selectLength());
        map.put("data", admins);
        return ResultUtil.success(map);
    }

    @Override
    public BaseResult selectAllCoach2(String token) {
        List<Admin> admins = adminMapper.selectAllCoach2();
        List<AdminDto> adminDtos = new ArrayList<>();
        for (Admin admin : admins) {
            AdminDto adminDto = new AdminDto();
            BeanUtils.copyProperties(admin, adminDto);
            File file = fileMapper.selectById(admin.getImgId());
            adminDto.setCode(file.getBase64());
            adminDtos.add(adminDto);
        }
        return ResultUtil.success(adminDtos);
    }

    @Override
    public BaseResult selectByPhone(String token, String phone) {
        Admin admin = adminMapper.getAdminByPhone(phone);
        AdminSelect adminSelect = new AdminSelect();
        BeanUtils.copyProperties(admin, adminSelect);
        File file = fileMapper.selectById(admin.getImgId());
        if (file != null) {
            adminSelect.setCode(file.getBase64());
        }
        return ResultUtil.success(adminSelect);
    }

    @Override
    public BaseResult updateImg(String token, String phone, String newCode) {
        Admin admin = adminMapper.getAdminByPhone(phone);
        if (admin == null) {
            return ResultUtil.error(ResultEnum.NO_USER_INFO);
        }
        Long imgId = admin.getImgId();
        File file = new File();
        if (imgId == null) {
            file.setBase64(newCode);
            fileMapper.addFile(file);
        } else {
            file = fileMapper.selectById(imgId);
            if (file == null) {
                file.setBase64(newCode);
                fileMapper.addFile(file);
            } else {
                file.setBase64(newCode);
                fileMapper.updateFile(file);
            }
        }
        return ResultUtil.success(ResultEnum.OK);
    }

    @Override
    public BaseResult updatePassword(String token, String phone, String oldPassword, String newPassword) {
        Admin admin = adminMapper.getAdminByPhone(phone);
        if (admin == null) {
            return ResultUtil.error(ResultEnum.NO_USER_INFO);
        }
        if (!admin.getPassword().equals(oldPassword)) {
            return ResultUtil.error(ResultEnum.PASSWORD_ERROR);
        }
        adminMapper.updatePassword(phone, newPassword);
        return ResultUtil.success(ResultEnum.OK);
    }
}
