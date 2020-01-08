package com.cyg.appointment.util;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import redis.clients.jedis.Jedis;
import redis.clients.jedis.JedisPool;

/**
 * @Description: jedis操作redis工具类
 * @Author: cyg
 * @Date: 2019/11/11
 * @Version:
 **/
@Component
public class JedisUtil {
    @Autowired
    JedisPool jedisPool;

    public void set(String key, String value) {
        try (Jedis jedis = jedisPool.getResource()) {
            jedis.setnx(key, value);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
    public void set(String key, String value, int time) {
        try (Jedis jedis = jedisPool.getResource()) {
            jedis.setex(key, time, value);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public String get(String key) {
        try (Jedis jedis = jedisPool.getResource()) {
            return jedis.get(key);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    public Long del(String key) {
        try (Jedis jedis = jedisPool.getResource()) {
            return jedis.del(key);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
}
