package com.stock.management.user.service;

import com.stock.management.user.dto.CallLogDTO;

public interface ICallService {
    
    //로그 db에 저장
    public int insertCallLog(CallLogDTO logInfo);
}
