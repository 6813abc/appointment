package com.cyg.appointment.exception;

/**
 * @Description: 返回消息枚举类
 * @Author: cyg
 * @Date: 2019/8/1
 * @Version:
 **/
public enum ResultEnum {

    /****/
    ERROR("-1", "系统内部异常"),
    OK("200", "请求成功"),
    NO_USER_INFO("50001", "用户不存在"),
    PASSWORD_ERROR("50003", "密码错误"),
    PHONE_PASSWORD_EMPTY("50004", "账号或密码为空"),
    CODE_ERROR("50005", "获取验证按失败"),
    CODE_EMPTY("50006", "验证码为空"),
    CODE_NOT_CORRECT("50007", "验证码校验失败"),
    HEAD_CODE_EMPTY("50008", "请上传一个头像"),
    PHONE_IS_USE("50009", "该手机号已经被注册"),
    IS_NOT_AUTH("500010", "账号无权限"),
    TOKEN_IS_NOT_AUTH("50011", "登录过期"),
    BALANCE_IS_LOW("50012", "余额不足"),
    TIME_NOT_NULL("50013", "时间不能为空"),
    ;
    private String code;
    private String message;

    ResultEnum(String code, String message) {
        this.code = code;
        this.message = message;
    }

    @Override
    public String toString() {
        return "ResultEnum{" +
                "code='" + code + '\'' +
                ", message='" + message + '\'' +
                '}';
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
