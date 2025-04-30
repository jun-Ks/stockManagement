package com.stock.management.user.mapper;



import org.apache.ibatis.annotations.Mapper;

import com.stock.management.user.dto.LoginDTO;
import com.stock.management.user.dto.UserInfoDTO;

@Mapper
public interface IUserMapper {
	
	//로그인
	public int login(LoginDTO loginInfo);
	
	//로그인하는 아이디로 성명, 부서 불러오기
	public UserInfoDTO getUserInfoById(String userId);
	

}
