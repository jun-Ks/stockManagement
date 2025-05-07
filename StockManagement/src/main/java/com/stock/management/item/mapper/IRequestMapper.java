package com.stock.management.item.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.stock.management.item.dto.ItemInfoDTO;
import com.stock.management.item.dto.RequestModiLocationDTO;
import com.stock.management.item.dto.RequestStockDTO;

@Mapper
public interface IRequestMapper {
	//입고 요청 정보 등록하기 
	public int insertRequestStockInfo(RequestStockDTO requestInfo);
	
	//위치 변경 요청 정보 등록하기
	public int insertRequestModiLocationInfo(RequestModiLocationDTO requestInfo);
	
	//입고요청 리스트 by id
	public List<RequestStockDTO> getRequestStockListById(@Param("requesterId") String requesterId);
	
	//위치 변경 요청 리스트 by id
	public List<RequestModiLocationDTO> getRequestModiLocaListById(@Param("requesterId") String requesterId);
	
	//입고 요청 리스트 by 승인여부따라
	public List<RequestStockDTO> getRequestStockListByApproval(@Param("approval") int approval);
	
	//위치 변경 요청 리스트 by 승인여부따라
	public List<RequestModiLocationDTO> getRequestModiLocaListByApproval(@Param("approval") int approval);
	
	//입고 요청 리스트 by 승인여부 + id
	public List<RequestStockDTO> getRequestStockListByApprovalId(@Param("approval") int approval, @Param("requesterId") String requesterId);
	
	//위치 변경 요청 리스트 by 승인여부 + id
	public List<RequestModiLocationDTO> getRequestModiLocaListByApprovalId(@Param("approval") int approval, @Param("requesterId") String requesterId);
	
	//입고 요청 리스트
	public List<RequestStockDTO> getRequestStockList();
	
	//위치 변경 요청 리스트
	public List<RequestModiLocationDTO> getRequestModiLocaList();
	
	//입고 요청 승인
	public int approvalStockRequest(@Param("approvalUserName") String approvalUserName, @Param("requestNo") int requestNo);
			
	//위치변경 요청 승인
	public int approvalLocationRequest(@Param("approvalUserName") String approvalUserName, @Param("itemId") int itemId);
	
	//requesterNo로 groupId가져오기
	public String getGroupIdByRequesterNo(@Param("requesterNo") int requesterNo, @Param("requestType") String requestType);
	
	//요청 승인 시 그룹아이디로 아이템 아이디 찾아와서 item아이디 등록
	public int updateRequestItemId(@Param("requestType") String requestType, @Param("itemId") int itemId, @Param("groupId") String groupId);
	
	//미승인건 개수세기 - 입고요청
	public int cntUnapprovalStockRequest();
	
	//미승인건 개수세기 - 위치변경
	public int cntUnapprovalModiLocationRequest();
}
