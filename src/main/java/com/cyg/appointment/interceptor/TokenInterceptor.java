package com.cyg.appointment.interceptor;

import com.cyg.appointment.config.JwtToken;
import com.cyg.appointment.exception.ResultEnum;
import com.cyg.appointment.exception.ResultUtil;
import com.cyg.appointment.util.JedisUtil;
import com.cyg.appointment.util.ValidateCodeUtil;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.ArrayList;
import java.util.List;

/**
 * @Description: TODO
 * @Author: cyg
 * @Date: 2020/1/4
 * @Version:
 **/
@Component
@Slf4j
public class TokenInterceptor extends HandlerInterceptorAdapter {

    @Autowired
    private JwtToken jwtToken;

    /**
     * 在执行controller方法之前进行请求参数处理
     */
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        if (handler instanceof HandlerMethod) {
            HandlerMethod h = (HandlerMethod) handler;
            String token = request.getParameter("token");
            if (StringUtils.isEmpty(token)) {
                log.error("token为空");
                return false;
            }
            //校验token
            String phone = jwtToken.getPhone(token);
            if (phone == null) {
                log.error("token校验失败:{}", token);
                return false;
            }
            log.info("token校验通过");
            return true;
        }
        return false;
    }


    @Override
    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler,
                           ModelAndView modelAndView) throws Exception {

    }
}
