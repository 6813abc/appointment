package com.cyg.appointment.controller;

import com.cyg.appointment.dto.UserAdd;
import com.cyg.appointment.exception.BaseResult;
import com.cyg.appointment.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;

/**
 * @Description: 用户管理
 * @Author: cyg
 * @Date: 2019/12/27
 * @Version:
 **/
@RestController
@CrossOrigin
public class UserController {

    @Autowired
    private UserService userService;

    @RequestMapping("/userLogin")
    public BaseResult loginUser(HttpServletRequest request, String phone, String password, String code) {
        return userService.loginUser(request, phone, password, code);
    }

    @RequestMapping("/getCode")
    public BaseResult getCode(HttpServletRequest request) {
        return userService.getCode(request);
    }

    @RequestMapping("/addUser")
    public BaseResult addUser(UserAdd userAdd) {
        return userService.addUser(userAdd);
    }

    @RequestMapping("selectAllUser")
    public BaseResult selectAllUser(String token, Long page, Integer limit) {
        return userService.selectAllUser(token, page, limit);
    }

    @RequestMapping("rechargeBalance")
    public BaseResult selectAllUser(String token, String phone, Long money) {
        return userService.rechargeBalance(token, phone, money);
    }
}
