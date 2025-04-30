package com.stock.management.item.service;

import java.util.List;
import java.util.UUID;

import org.apache.ibatis.annotations.Param;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.stock.management.item.dto.ItemInfoDTO;
import com.stock.management.item.dto.RequestModiLocationDTO;
import com.stock.management.item.dto.RequestStockDTO;
import com.stock.management.item.mapper.IRequestMapper;
import com.stock.management.user.dto.UserInfoDTO;
import com.stock.management.user.service.IUserService;

@Service
public class RequestService implements IRequestService{
	
	@Autowired
	IRequestMapper mapper;
	
	@Autowired
	IItemService itemService;
	
	@Autowired
	IUserService userService;
	
	
	//입고 요청 하기
	@Override
	public int insertRequestStockInfo(RequestStockDTO requestInfo) {
		
		String requesterId = requestInfo.getRequesterId();
		
		//requesterId로 사용자 정보 불러오기
		UserInfoDTO userInfo = userService.getUserInfoById(requesterId);
		
		requestInfo.setRequesterDept(userInfo.getDept());
		requestInfo.setRequesterName(userInfo.getName());
		
		//groupId 설정해주기
		String groupId =UUID.randomUUID().toString();
		
		requestInfo.setGroupId(groupId);
		
		int result = mapper.insertRequestStockInfo(requestInfo);
		
		return result;
	}
	
	//위치변경정보 등록하기
	@Override
	public int insertRequestModiLocationInfo(RequestModiLocationDTO requestInfo) {
		
		String requesterId = requestInfo.getRequesterId();
		
		//requesterId로 사용자 정보 불러오기
		UserInfoDTO userInfo = userService.getUserInfoById(requesterId);
		
		requestInfo.setRequesterDept(userInfo.getDept());
		requestInfo.setRequesterName(userInfo.getName());
	
		int result = mapper.insertRequestModiLocationInfo(requestInfo);
		
		return result;
	}
	
	//입고요청 리스트 by id
	@Override
	public List<RequestStockDTO> getRequestStockListById(String requesterId) {
		
		List<RequestStockDTO> requestList = mapper.getRequestStockListById(requesterId);
		
		return requestList;
	}
	
	//위치 변경 요청 리스트 by id
	@Override
	public List<RequestModiLocationDTO> getRequestModiLocaListById(String requesterId) {
		
		List<RequestModiLocationDTO> requestList = mapper.getRequestModiLocaListById(requesterId);
		
		return requestList;
	}
	
	//입고 요청 리스트 by 승인여부따라
	@Override
	public List<RequestStockDTO> getRequestStockListByApproval(int approval) {
		
		List<RequestStockDTO> requestList = mapper.getRequestStockListByApproval(approval);
		
		return requestList;
	}
	
	//위치 변경 요청 리스트 by 승인여부따라
	@Override
	public List<RequestModiLocationDTO> getRequestModiLocaListByApproval(int approval) {
		
		List<RequestModiLocationDTO> requestList = mapper.getRequestModiLocaListByApproval(approval);
		
		return requestList;
	}
		
	//입고 요청 리스트
	@Override
	public List<RequestStockDTO> getRequestStockList() {
		List<RequestStockDTO> requestList = mapper.getRequestStockList();
		return requestList;
	}

	//위치 변경 요청 리스트
	@Override
	public List<RequestModiLocationDTO> getRequestModiLocaList() {
		
		List<RequestModiLocationDTO> requestList = mapper.getRequestModiLocaList();
		
		return requestList;
	}
	
	//입고 요청 승인
	@Override
	public int approvalStockRequest(String approvalUserName, int requestNo) {
		
		//stock테이블 승인컬럼 update
		int approvalRequest = mapper.approvalStockRequest(approvalUserName, requestNo);
		
		//upadate 완료되면 제품정보 등록(입고) 처리
		if(approvalRequest > 0) {
			return approvalRequest;
		}
		return 0;
	}

	//위치변경 요청 승인
	@Override
	public int approvalLocationRequest(String approvalUserName, int itemId) {
		
		int approvalRequest = mapper.approvalLocationRequest(approvalUserName, itemId);
		
		if(approvalRequest > 0) {
			return approvalRequest;
		}
		return 0;
	}
	
	//request no로 groupId 가져오기
	@Override
	public String getGroupIdByRequesterNo(int requesterNo, String requestType) {
		
		String groupId = mapper.getGroupIdByRequesterNo(requesterNo, requestType);
		
		return groupId;
	}

	//요청 승인 시 그룹아이디로 아이템 아이디 찾아와서 item아이디 등록
	@Override
	public int updateRequestItemId(String requestType, int itemId, String groupId) {
		
		int result = mapper.updateRequestItemId(requestType, itemId, groupId);
		
		return result;
	}
	


}
