package com.cyg.appointment.controller;

import com.cyg.appointment.dto.UserAdd;
import com.cyg.appointment.entity.Member;
import com.cyg.appointment.exception.BaseResult;
import com.cyg.appointment.exception.ResultEnum;
import com.cyg.appointment.exception.ResultUtil;
import com.cyg.appointment.service.MemberService;
import com.cyg.appointment.service.UserService;
import lombok.extern.slf4j.Slf4j;
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
@Slf4j
public class MemberController {

    @Autowired
    private MemberService memberService;


    @RequestMapping("renewMember")
    public BaseResult renewMember(String token, String phone, String data, Long money) {
        try {
            return memberService.renewMember(token, phone, data, money);
        } catch (Exception e) {
            e.printStackTrace();
            log.error("系统异常：" + e);
            return ResultUtil.error(ResultEnum.ERROR);
        }
    }
}
