package com.cyg.appointment.service;

import com.cyg.appointment.config.JwtToken;
import com.cyg.appointment.dto.UserAdd;
import com.cyg.appointment.entity.File;
import com.cyg.appointment.entity.Recharge;
import com.cyg.appointment.entity.User;
import com.cyg.appointment.exception.BaseResult;
import com.cyg.appointment.exception.ResultEnum;
import com.cyg.appointment.exception.ResultUtil;
import com.cyg.appointment.mapper.FileMapper;
import com.cyg.appointment.mapper.RechargeMapper;
import com.cyg.appointment.mapper.UserMapper;
import com.cyg.appointment.util.DateUtil;
import com.cyg.appointment.util.JedisUtil;
import com.cyg.appointment.util.ValidateCodeUtil;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.RandomStringUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @Description: TODO
 * @Author: cyg
 * @Date: 2019/12/27
 * @Version:
 **/
@Slf4j
@Service
public class UserService  {
    @Autowired
    private UserMapper userMapper;
    @Autowired
    private JwtToken jwtToken;
    @Autowired
    private ValidateCodeUtil validateCodeUtil;
    @Autowired
    private JedisUtil jedisUtil;
    @Autowired
    private FileMapper fileMapper;
    @Autowired
    private RechargeMapper rechargeMapper;

    public BaseResult loginUser(HttpServletRequest request, String phone, String password, String code) {
        if (StringUtils.isEmpty(phone) || StringUtils.isEmpty(password)) {
            return ResultUtil.error(ResultEnum.PHONE_PASSWORD_EMPTY);
        }
        //校验用户账号密码
        User user = userMapper.getUserByPhone(phone);
        if (user == null) {
            return ResultUtil.error(ResultEnum.NO_USER_INFO);
        }
        if (!password.equals(user.getPassword())) {
            return ResultUtil.error(ResultEnum.PASSWORD_ERROR);
        }
        String redisCode = jedisUtil.get(request.getRemoteAddr() + "_code");
        if (StringUtils.isEmpty(code)) {
            return ResultUtil.error(ResultEnum.CODE_EMPTY);
        }
        if (StringUtils.isEmpty(redisCode) || !redisCode.equals(code)) {
            return ResultUtil.error(ResultEnum.CODE_NOT_CORRECT);
        }
        File file = fileMapper.selectById(user.getImgId());
        //生成token
        String token = jwtToken.generateToken(phone);
        Map<String, String> map = new HashMap<>(4);
        map.put("token", token);
        if (file != null) {
            map.put("code", file.getBase64());
            map.put("name", user.getName());
            map.put("phone", user.getPhone());
        }
        return ResultUtil.success(ResultEnum.OK, map);
    }

    
    public BaseResult getCode(HttpServletRequest request) {
        try {
            String code = validateCodeUtil.getRandomCodeBase64(request);
            return ResultUtil.success(ResultEnum.OK, code);
        } catch (Exception e) {
            log.error(e.getMessage() + "={}", e);
            return ResultUtil.error(ResultEnum.CODE_ERROR);
        }
    }

    
    @Transactional(rollbackFor = Exception.class)
    public BaseResult addUser(UserAdd userAdd) {
        //判断手机号是否被注册
        if (userMapper.getUserByPhone(userAdd.getPhone()) != null) {
            return ResultUtil.error(ResultEnum.PHONE_IS_USE);
        }
        User user = new User();
        BeanUtils.copyProperties(userAdd, user);
        if (StringUtils.isEmpty(userAdd.getCode())) {
            return ResultUtil.error(ResultEnum.HEAD_CODE_EMPTY);
        }
        //添加头像
        File file = new File();
        file.setBase64(userAdd.getCode());
        fileMapper.addFile(file);
        user.setImgId(file.getId());
        //todo 处理会员

        //新增用户
        userMapper.addUser(user);
        return ResultUtil.success(ResultEnum.OK);
    }

    
    public BaseResult selectAllUser(String token, Long page, Integer limit) {
        Long index = (page - 1) * limit;
        List<User> admins = userMapper.selectAll(index, limit);
        Map<String, Object> map = new HashMap<>(4);
        map.put("length", userMapper.selectLength());
        map.put("data", admins);
        return ResultUtil.success(map);
    }

    
    @Transactional(rollbackFor = Exception.class)
    public BaseResult rechargeBalance(String token, String phone, Long money) {
        //校验用户账号密码
        User user = userMapper.getUserByPhone(phone);
        if (user == null) {
            return ResultUtil.error(ResultEnum.NO_USER_INFO);
        }
        Double balance = user.getBalance() == null ? 0 : user.getBalance();
        balance = balance + money;
        userMapper.updateBalance(phone, balance);
        //插入交易流水到数据库
        Recharge recharge = new Recharge();
        String id = DateUtil.getTodayFlow() + "00" + RandomStringUtils.randomAlphanumeric(10);
        recharge.setId(id);
        String time = DateUtil.getToDayTime();
        recharge.setCreateTime(time);
        recharge.setMoney(money);
        recharge.setPhone(phone);
        rechargeMapper.addRecharge(recharge);
        Map<String, Object> map = new HashMap<>(4);
        map.put("id", id);
        map.put("money", money);
        map.put("time", time);
        return ResultUtil.success(ResultEnum.OK, map);
    }
}
