package com.cyg.appointment.exception;

import java.io.Serializable;

/**
 * @Description: 返回结构
 * @Author: cyg
 * @Date: 2019/8/1
 * @Version:
 **/
public class BaseResult<T> implements Serializable {

    public String code;
    public String message;
    private T data;

    public BaseResult() {
    }
    public BaseResult(String code, String message, T data) {
        this.code = code;
        this.message = message;
        this.data = data;
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

    public T getData() {
        return data;
    }

    public void setData(T data) {
        this.data = data;
    }

    @Override
    public String toString() {
        return "BaseResult{" +
                "code='" + code + '\'' +
                ", message='" + message + '\'' +
                ", data=" + data +
                '}';
    }
}
