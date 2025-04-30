package com.stock.management.user.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import com.stock.management.user.dto.LoginDTO;
import com.stock.management.user.dto.UserInfoDTO;
import com.stock.management.user.service.IUserService;

import jakarta.servlet.http.HttpSession;

@RestController
public class UserController {

	@Autowired
	IUserService service;
	
	//사용자 로그인
	@PostMapping("/user")
	public ResponseEntity<String> login(@ModelAttribute LoginDTO loginInfo, HttpSession session){
		
		int loginResult = service.login(loginInfo);
		
		//로그인 성공 시 세션에 아이디, 이름, 부서 세션에 저장하고 serch페이지로 이동
		if(loginResult == 1) {
			//아이디로 사용자 정보 불러오기
			UserInfoDTO userInfo = service.getUserInfoById(loginInfo.getId());
			
			//세션에 저장하기
			session.setAttribute("userId", loginInfo.getId());
			session.setAttribute("userName", userInfo.getName());
			session.setAttribute("userDept", userInfo.getDept());
			
			//페이지이동
			return ResponseEntity.status(HttpStatus.OK).body("/stock");
			
		}else {
			 return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("로그인 실패\n아이디나 패스워드를 확인해주세요.");
		}
			
	}
}
