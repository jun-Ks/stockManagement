package com.stock.management.user.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.stock.management.user.dto.CallLogDTO;
import com.stock.management.user.mapper.ICallMapper;


@Service
public class CallService implements ICallService {

    @Autowired
    ICallMapper mapper;

    //로그 db에 저장
    @Override
    public int insertCallLog(CallLogDTO logInfo) {

        int result = mapper.insertCallLog(logInfo);

        return 0; 
    }


}
