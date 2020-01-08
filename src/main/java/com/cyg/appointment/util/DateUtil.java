package com.cyg.appointment.util;

import org.apache.commons.lang3.time.DateFormatUtils;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

/**
 * @Description: 时间工具类
 * @Author: cyg
 * @Date: 2019/11/12
 * @Version:
 **/
public class DateUtil {

    public static String getToday() {
        Calendar calendar = Calendar.getInstance();
        return DateFormatUtils.format(calendar.getTime(), Constants.DATE_YYYY_MM_DD);
    }
    public static String getTodayFlow() {
        Calendar calendar = Calendar.getInstance();
        return DateFormatUtils.format(calendar.getTime(), Constants.DATEYYYYMMDDHMMSS);
    }

    public static String getToDayTime() {
        Calendar calendar = Calendar.getInstance();
        return DateFormatUtils.format(calendar.getTime(), Constants.DATE_YYYY_MM_DD_HH_MM_SS);
    }

    public static String getTime(int day) {
        Calendar calendar = Calendar.getInstance();
        calendar.add(Calendar.DATE, day);
        return DateFormatUtils.format(calendar.getTime(), Constants.DATE_YYYY_MM_DD_HH_MM_SS);
    }

    public static String getTime(String data, int day) throws Exception {
        SimpleDateFormat sdf = new SimpleDateFormat(Constants.DATE_YYYY_MM_DD_HH_MM_SS);
        Date date = sdf.parse(data);
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(date);
        calendar.add(Calendar.DATE, day);
        return DateFormatUtils.format(calendar.getTime(), Constants.DATE_YYYY_MM_DD_HH_MM_SS);
    }

    public static String getDay(int day) {
        Calendar calendar = Calendar.getInstance();
        calendar.add(Calendar.DATE, day);
        return DateFormatUtils.format(calendar.getTime(), Constants.DATE_YYYY_MM_DD);
    }

    public static String getWeek(String date) {
        String[] weekDays = {"星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"};
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(new Date(getDateByStr2(date).getTime()));
        return weekDays[calendar.get(Calendar.DAY_OF_WEEK) - 1];
    }

    private static Date getDateByStr2(String dd) {
        SimpleDateFormat sd = new SimpleDateFormat("yyyy-MM-dd");
        Date date;
        try {
            date = sd.parse(dd);
        } catch (ParseException e) {
            date = null;
            e.printStackTrace();
        }
        return date;
    }
}
