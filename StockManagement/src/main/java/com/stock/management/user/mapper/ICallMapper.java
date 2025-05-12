package com.stock.management.user.mapper;

import org.apache.ibatis.annotations.Mapper;

import com.stock.management.user.dto.CallLogDTO;

@Mapper
public interface ICallMapper {

    //로그db에 저장
    public int insertCallLog(CallLogDTO logInfo);
}
