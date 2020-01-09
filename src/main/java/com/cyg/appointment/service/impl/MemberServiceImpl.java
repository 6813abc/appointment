package com.cyg.appointment.service.impl;

import com.cyg.appointment.entity.Consumption;
import com.cyg.appointment.entity.Member;
import com.cyg.appointment.entity.User;
import com.cyg.appointment.exception.BaseResult;
import com.cyg.appointment.exception.ResultEnum;
import com.cyg.appointment.exception.ResultUtil;
import com.cyg.appointment.mapper.ConsumptionMapper;
import com.cyg.appointment.mapper.MemberMapper;
import com.cyg.appointment.mapper.UserMapper;
import com.cyg.appointment.service.MemberService;
import com.cyg.appointment.util.Constants;
import com.cyg.appointment.util.DateUtil;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.RandomStringUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * @Description: member
 * @Author: cyg
 * @Date: 2019/1/5
 * @Version:
 **/
@Service
@Slf4j
public class MemberServiceImpl implements MemberService {

    @Autowired
    private UserMapper userMapper;
    @Autowired
    private MemberMapper memberMapper;
    @Autowired
    private ConsumptionMapper consumptionMapper;

    @Override
    @Transactional(rollbackFor = Exception.class)
    public BaseResult renewMember(String token, String phone, String data, Long money) throws Exception {
        if (StringUtils.isEmpty(phone)) {
            return ResultUtil.error(ResultEnum.PHONE_PASSWORD_EMPTY);
        }
        return consumption(phone, money, Constants.OPENM_EMBERSHIP, data);
    }

    @Override
    public BaseResult consumption(String phone, Long money, Integer choice, String data) throws Exception {
        //校验用户账号密码
        User user = userMapper.getUserByPhone(phone);
        if (user == null) {
            return ResultUtil.error(ResultEnum.NO_USER_INFO);
        }
        //余额不足
        Long balance = user.getBalance() == null ? 0 : user.getBalance();
        if (balance < money) {
            return ResultUtil.error(ResultEnum.BALANCE_IS_LOW);
        }
        //扣余额
        balance = balance - money;
        userMapper.updateBalance(phone, balance);
        if (choice.equals(Constants.OPENM_EMBERSHIP)) {
            //增加积分
            Long integral = money;
            if (user.getMemberId() == null) {
                //会员信息为空,新增会员
                Member member = new Member();
                member.setIntegral(integral);
                member.setUserId(user.getUserId());
                member.setGrade(getGrade(integral));
                member.setMemberDate(DateUtil.getToDayTime());
                member.setUpToDate(DateUtil.getTime(Integer.parseInt(data) * 30));
                memberMapper.addMember(member);
                userMapper.uodateMemberId(phone, member.getId());
            } else {
                //会员信息不为空
                Member member = memberMapper.getMemberById(user.getMemberId());
                integral = member.getIntegral() == null ? integral : member.getIntegral() + integral;
                member.setIntegral(integral);
                member.setUpToDate(DateUtil.getTime(member.getUpToDate(), Integer.parseInt(data) * 30));
                member.setGrade(getGrade(integral));
                memberMapper.updateMember(member);
            }
        }
        //消费记录
        Consumption consumption = new Consumption();
        String id = DateUtil.getTodayFlow() + "11" + RandomStringUtils.randomAlphanumeric(10);
        consumption.setId(id);
        String time = DateUtil.getToDayTime();
        consumption.setCreateTime(time);
        consumption.setMoney(money);
        consumption.setPhone(phone);
        consumption.setType(Constants.RECHARGE_MEMBER);
        consumptionMapper.addConsumption(consumption);
        return ResultUtil.success(ResultEnum.OK);
    }

    /**
     * 积分的会员等级区间
     **/
    private String getGrade(Long integral) {
        if (integral < Constants.QT_GRADE) {
            return Constants.QT;
        } else if (integral < Constants.BY_GRADE) {
            return Constants.BY;
        } else if (integral < Constants.HJ_GRADE) {
            return Constants.HJ;
        } else if (integral < Constants.ZS_GRADE) {
            return Constants.ZS;
        } else {
            return Constants.ZZ;
        }
    }
}
