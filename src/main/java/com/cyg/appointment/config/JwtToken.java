package com.cyg.appointment.config;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import lombok.Data;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

import java.util.Date;

/**
 * @Description: TODO
 * @Author: cyg
 * @Date: 2019/12/27
 * @Version:
 **/
@Data
@Configuration
@Component
@Slf4j
public class JwtToken {

    /**
     * 秘钥
     */
    @Value("${jwt.secret}")
    private String secret;

    /**
     * 过期时间(秒)
     */
    @Value("${jwt.expire}")
    private long expire;


    /**
     * 生成jwt token
     */
    public String generateToken(String userId) {
        Date nowDate = new Date();
        Date expireDate = new Date(nowDate.getTime() + expire * 1000);
        return "Bearer" + Jwts.builder()
                .setHeaderParam("typ", "JWT")
                .setSubject(userId)
                .setIssuedAt(nowDate)
                .setExpiration(expireDate)
                .signWith(SignatureAlgorithm.HS512, secret)
                .compact();
    }

    public Claims getClaimByToken(String token) {
        if (StringUtils.isEmpty(token)) {
            return null;
        }
        try {
            String[] header = token.split("Bearer");
            token = header[1];
            return Jwts.parser().setSigningKey(secret).parseClaimsJws(token).getBody();
        } catch (Exception e) {
            log.error("validate is token error ", e);
            return null;
        }
    }


    public String getPhone(String token) {
        Claims claims = getClaimByToken(token);
        try {
            if (isTokenExpired(claims.getExpiration())) {
                return null;
            }
        } catch (Exception e) {
            return null;
        }
        return claims.getSubject();
    }

    /**
     * token是否过期
     *
     * @return true：过期
     */
    public static boolean isTokenExpired(Date expiration) {
        return expiration.before(new Date());
    }
}

