package com.stock.management.user.service;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.stock.management.user.dto.LoginDTO;
import com.stock.management.user.dto.UserInfoDTO;
import com.stock.management.user.mapper.IUserMapper;

@Service
public class UserService implements IUserService{
	
	@Autowired
	IUserMapper mapper;

	//로그인
	@Override
	public int login(LoginDTO loginInfo) {
		
		int result = mapper.login(loginInfo);
		
		if(result == 1) {
			
		}
		return result;
	}

	//아이디로 user 성명, 부서 불러오기
	@Override
	public UserInfoDTO getUserInfoById(String userId) {
		
		UserInfoDTO userInfo = mapper.getUserInfoById(userId);
		
		return userInfo;
	}

	
}
