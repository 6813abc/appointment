package com.cyg.appointment.service.impl;

import com.cyg.appointment.dto.EquipTypeAddDto;
import com.cyg.appointment.dto.EquipTypeUpdateDto;
import com.cyg.appointment.entity.Equip;
import com.cyg.appointment.entity.EquipType;
import com.cyg.appointment.entity.EquipTypeSpecific;
import com.cyg.appointment.entity.File;
import com.cyg.appointment.exception.BaseResult;
import com.cyg.appointment.exception.ResultEnum;
import com.cyg.appointment.exception.ResultUtil;
import com.cyg.appointment.mapper.EquipMapper;
import com.cyg.appointment.mapper.FileMapper;
import com.cyg.appointment.mapper.SpecificMapper;
import com.cyg.appointment.service.EquipService;
import com.cyg.appointment.util.DateUtil;
import com.cyg.appointment.vo.EquipTypeSelectVo;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @author cyg
 * @date 2020/1/9 16:33
 **/
@Service
@Slf4j
public class EquipServiceImpl implements EquipService {

    @Autowired
    private EquipMapper equipMapper;
    @Autowired
    private FileMapper fileMapper;
    @Autowired
    private SpecificMapper specificMapper;

    @Override
    @Transactional(rollbackFor = Exception.class)
    public BaseResult addEquipTye(String token, EquipTypeAddDto equipTypeAddDto) {
        EquipType equipType = new EquipType();
        BeanUtils.copyProperties(equipTypeAddDto, equipType);
        //新增器材图片
        File file = new File();
        file.setBase64(equipTypeAddDto.getPictureCode());
        fileMapper.addFile(file);
        equipType.setPictureId(file.getId());
        equipType.setCreateTime(DateUtil.getToDayTime());
        //新增器材种类
        equipMapper.addEquipType(equipType);
        return ResultUtil.success(ResultEnum.OK);
    }

    @Override
    public BaseResult updateEquipType(String token, EquipTypeUpdateDto equipTypeUpdateDto) {
        EquipType equipType = equipMapper.selectEquipTypeById(equipTypeUpdateDto.getId());
        BeanUtils.copyProperties(equipTypeUpdateDto, equipType);
        equipMapper.updateEquipType(equipType);
        return ResultUtil.success(ResultEnum.OK);
    }

    @Override
    public BaseResult selectAllEquipType(String token, Long page, Integer limit) {
        Long index = (page - 1) * limit;
        List<EquipTypeSelectVo> equipTypeSelectVos = equipMapper.selectAllEquipType(index, limit);
        for (EquipTypeSelectVo equipTypeSelectVo : equipTypeSelectVos){
            Long count = equipMapper.selectEquipTypeLengthByEquipTypeId(equipTypeSelectVo.getId());
            equipTypeSelectVo.setCount(count);
        }
        Map<String, Object> map = new HashMap<>(4);
        map.put("length", equipMapper.selectEquipTypeLength());
        map.put("data", equipTypeSelectVos);
        return ResultUtil.success(ResultEnum.OK, map);
    }
}
