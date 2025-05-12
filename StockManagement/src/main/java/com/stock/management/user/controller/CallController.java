package com.stock.management.user.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import com.stock.management.user.dto.CallLogDTO;
import com.stock.management.user.service.ICallService;

@RestController
public class CallController {
    
    @Autowired
    ICallService service;

    @PostMapping("/user/call")
    public ResponseEntity<String> callERPTeam(CallLogDTO callLog){
        
        return null;
    }
}
