package com.cyg.appointment.exception;

/**
 * @Description: 返回
 * @Author: cyg
 * @Date: 2019/8/1
 * @Version:
 **/
public class ResultUtil {


    public static <T> BaseResult<T> success(ResultEnum resultEnum, T data) {
        return commonResult(resultEnum.getCode(), resultEnum.getMessage(), data);
    }

    public static <T> BaseResult<T> success(ResultEnum resultEnum) {
        return commonResult(resultEnum.getCode(), resultEnum.getMessage(), null);
    }

    public static <T> BaseResult<T> success(String code, String message) {
        BaseResult<T> result = new BaseResult<>();
        result.setCode(code);
        result.setMessage(message);
        result.setData(null);
        return result;
    }

    public static <T> BaseResult<T> success( T data) {
        BaseResult<T> result = new BaseResult<>();
        result.setCode("200");
        result.setMessage("请求成功");
        result.setData(data);
        return result;
    }

    public static <T> BaseResult<T> error(ResultEnum resultEnum, T data) {
        return commonResult(resultEnum.getCode(), resultEnum.getMessage(), data);
    }

    public static <T> BaseResult<T> error(ResultEnum resultEnum) {
        return commonResult(resultEnum.getCode(), resultEnum.getMessage(), null);
    }

    public static <T> BaseResult<T> error(String code, String message) {
        BaseResult<T> result = new BaseResult<>();
        result.setCode(code);
        result.setMessage(message);
        result.setData(null);
        return result;
    }

    public static <T> BaseResult<T> error(String code, String message, T data) {
        BaseResult<T> result = new BaseResult<>();
        result.setCode(code);
        result.setMessage(message);
        result.setData(data);
        return result;
    }

    private static <T> BaseResult<T> commonResult(String code, String message, T data) {
        BaseResult<T> result = new BaseResult<>();
        result.setCode(code);
        result.setMessage(message);
        result.setData(data);
        return result;
    }
}