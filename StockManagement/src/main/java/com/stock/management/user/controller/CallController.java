package com.stock.management.user.controller;

import java.util.List;

import org.apache.catalina.connector.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import com.stock.management.user.dto.CallLogDTO;
import com.stock.management.user.service.ICallService;

@RestController
public class CallController {
    
    @Autowired
    ICallService service;

    @PostMapping("/user/help")
    public ResponseEntity<String> callERPTeam(CallLogDTO callLog){
        int result = service.insertCallLog(callLog);

        if(result > 0){
            //전산팀 각자에게 요청 뿌려주기
        }
        return null;
    }

    //로그리스트 가져오기
    @GetMapping("/log/list")
    public ResponseEntity<List<CallLogDTO>> getLogList(){
        List<CallLogDTO> logList = service.getLogList();

        return ResponseEntity.ok(logList);
    }

    @GetMapping("/user/help/status")
    public ResponseEntity<Integer> checkerStatus(){

        //가장 최근에 등록한 no 불러오기 
        int currentNo = service.getCurrentNo();

        //담당자 배정이 됐는지 확인하기 
        int result = service.getCheckerStatus(currentNo);
        //System.out.println(" - 담당자여부 :  " + result);
        return ResponseEntity.ok(result);
    }
}
