package com.stock.management.user.service;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.stock.management.user.dto.CallLogDTO;

public interface ICallService {
    
    //로그 db에 저장
    public int insertCallLog(CallLogDTO logInfo);

    //로그가져오기
    public List<CallLogDTO> getLogList();

    //가장 최근에 등록한 로그 no가져오기
    public int getCurrentNo();

    //특정 NO의 담당자가 없으면 0, 있으면 1반환
    public int getCheckerStatus(@Param("no") int no);
}
