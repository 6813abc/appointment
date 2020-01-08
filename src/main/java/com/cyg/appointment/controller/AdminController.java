package com.cyg.appointment.controller;

import com.cyg.appointment.exception.BaseResult;
import com.cyg.appointment.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;

/**
 * @Description: 管理员管理
 * @Author: cyg
 * @Date: 2019/12/27
 * @Version:
 **/
@RestController
@CrossOrigin
public class AdminController {

    @Autowired
    private AdminService adminService;

    @RequestMapping("/adminLogin")
    public BaseResult loginAdmin(HttpServletRequest request, String phone, String password, String role) {
        return adminService.loginAdmin(request, phone, password, role);
    }

    @RequestMapping("selectAllCoach")
    public BaseResult selectAllCoach(String token, Long page, Integer limit) {
        return adminService.selectAllCoach(token, page, limit);
    }

    @RequestMapping("selectByPhone")
    public BaseResult selectByPhone(String token, String phone) {
        return adminService.selectByPhone(token, phone);
    }

    @PostMapping("updateImg")
    public BaseResult updateImg(String phone, String token, String newCode) {
        return adminService.updateImg(token, phone, newCode);
    }

    @RequestMapping("updatePassword")
    public BaseResult updatePassword(String phone, String token, String oldPassword, String newPassword) {
        return adminService.updatePassword(token, phone, oldPassword, newPassword);
    }
}
