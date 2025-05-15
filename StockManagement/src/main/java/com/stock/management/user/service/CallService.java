package com.stock.management.user.service;

import java.util.List;

import org.apache.ibatis.annotations.Param;
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

    //로그가져오기
    @Override
    public List<CallLogDTO> getLogList() {
        List<CallLogDTO> logList = mapper.getLogList();

        return logList;
    }

    //가장 최근에 등록한 로그 no가져오기
    @Override
    public int getCurrentNo() {
        int currentNo = mapper.getCurrentNo();
        return currentNo;
    }

    //특정 NO의 담당자가 없으면 0, 있으면 1반환
    @Override
    public int getCheckerStatus(int no) {
        int result = mapper.getCheckerStatus(no);

        return result;
    }


}
