package com.cyg.appointment.util;

/**
 * @Description: 验证码工具类
 * @Author: cyg
 * @Date: 2019/12/28
 * @Version:
 **/

import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import sun.rmi.runtime.Log;

import javax.imageio.ImageIO;
import javax.servlet.http.HttpServletRequest;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.util.Base64;
import java.util.Random;

@Component
@Slf4j
public class ValidateCodeUtil {

    @Autowired
    private JedisUtil jedisUtil;

    private static Random random = new Random();
    //验证码的宽
    private int width = 165;
    //验证码的高
    private int height = 45;
    //验证码中夹杂的干扰线数量
    private int lineSize = 30;
    //验证码字符个数
    private int randomStrNum = 4;
    private String randomString = "0123456789";

    /**
     * 功能描述:字体的设置
     *
     * @param
     * @return java.awt.Font
     * @date 2019/12/28
     */
    private Font getFont() {
        return new Font("Times New Roman", Font.ROMAN_BASELINE, 40);
    }

    /**
     * 功能描述:颜色的设置
     *
     * @param fc
     * @param bc
     * @return java.awt.Color
     * @date 2019/12/28
     */
    private static Color getRandomColor(int fc, int bc) {
        fc = Math.min(fc, 255);
        bc = Math.min(bc, 255);
        int r = fc + random.nextInt(bc - fc - 16);
        int g = fc + random.nextInt(bc - fc - 14);
        int b = fc + random.nextInt(bc - fc - 12);
        return new Color(r, g, b);
    }

    /*
     * 功能描述:干扰线的绘制
     * @date 2019/12/28
     * @param g
     * @return void
     */
    private void drawLine(Graphics g) {
        int x = random.nextInt(width);
        int y = random.nextInt(height);
        int xl = random.nextInt(20);
        int yl = random.nextInt(10);
        g.drawLine(x, y, x + xl, y + yl);

    }

    /**
     * 功能描述:随机字符的获取
     *
     * @param num 长度
     * @return java.lang.String
     * @date 2019/12/28
     */
    private String getRandomString(int num) {
        num = num > 0 ? num : randomString.length();
        return String.valueOf(randomString.charAt(random.nextInt(num)));
    }

    /**
     * 功能描述: 字符串的绘制
     *
     * @param g
     * @param randomStr
     * @param i
     * @return java.lang.String
     * @date 2019/12/28
     */
    private String drawString(Graphics g, String randomStr, int i) {
        g.setFont(getFont());
        g.setColor(getRandomColor(108, 190));
        String rand = getRandomString(random.nextInt(randomString.length()));
        randomStr += rand;
        g.translate(random.nextInt(3), random.nextInt(6));
        g.drawString(rand, 40 * i + 10, 25);
        return randomStr;
    }


    /**
     * 功能描述:生成随机图片的base64编码字符串
     *
     * @param
     * @return java.lang.String
     * @date 2019/12/28
     */
    public String getRandomCodeBase64(HttpServletRequest request) throws Exception {
        // BufferedImage类是具有缓冲区的Image类,Image类是用于描述图像信息的类
        BufferedImage image = new BufferedImage(width, height, BufferedImage.TYPE_INT_BGR);
        Graphics g = image.getGraphics();
        g.fillRect(0, 0, width, height);
        g.setColor(getRandomColor(105, 189));
        g.setFont(getFont());
        //干扰线
        for (int i = 0; i < lineSize; i++) {
            drawLine(g);
        }
        //随机字符
        String randomStr = "";
        for (int i = 0; i < randomStrNum; i++) {
            randomStr = drawString(g, randomStr, i);
        }
        String ip = request.getRemoteAddr();
        if (StringUtils.isNoneEmpty(ip)) {
            log.info("验证码={}", randomStr);
            jedisUtil.set(ip + "_code", randomStr, 120);
        } else {
            throw new Exception("账号不能为空！");
        }
        g.dispose();
        String base64String;
        try {
            //返回 base64
            ByteArrayOutputStream bos = new ByteArrayOutputStream();
            ImageIO.write(image, "PNG", bos);
            byte[] bytes = bos.toByteArray();
            Base64.Encoder encoder = Base64.getEncoder();
            base64String = encoder.encodeToString(bytes);
        } catch (Exception e) {
            throw new Exception("生产验证码失败！");
        }
        return base64String;
    }
}



