package com.stock.management.item.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.stock.management.item.dto.CartInfoDTO;
import com.stock.management.item.dto.DeliveryLogDTO;
import com.stock.management.item.dto.ItemInfoDTO;
import com.stock.management.item.dto.ManagementLogDTO;
import com.stock.management.item.dto.SearchDTO;

@Mapper
public interface IItemMapper {
	//키워드로 품목찾기
	public List<ItemInfoDTO> getItemByOption(SearchDTO searchInfo);
	
	//출고 시 calculatedQuantity 수량 감소
	public int deliveryById(@Param("id") int itemId, @Param("cartQty") int cartQty);
	
	//출고 시 로그남기기 
	public int insertDeliveryLog(CartInfoDTO cartInfo);
	
	//오늘날짜의 출고리스트 확인
	public List<DeliveryLogDTO> getDeliveryLogByToday(@Param("userId") String userId);
	
	//제품 id로 제품정보가져오기
	public List<ItemInfoDTO> getItemById(@Param("id") int itemId);
	
	//기간별 로그 가져오기
	public List<DeliveryLogDTO> getDeliveryLogByDate(@Param("startDate") String stratDate, @Param("endDate") String endDate, @Param("userId") String userId);
	
	//기간별 사용자 상관없이 출고로그 모두 가져오기
	public List<DeliveryLogDTO> getAllDeliveryLog(@Param("startDate") String stratDate, @Param("endDate") String endDate);
	
	//제품 정보 등록(입고)하기
	public int insertItemInfo(List<ItemInfoDTO> itemInfo);
	
	//제품 위치 수정하기
	public int modifyLocation(@Param("itemId") int itemId, @Param("modiLocation") String modiLocation);
	
	//제품아이디로 그룹아이디가져오기
	public int getItemIdIdByGroupId(@Param("groupId") String groupId);
	
	//관리자 - 제품정보등록
	public int insertInfo(ItemInfoDTO info);
	
	//관리자 - 제품 정보 수정
	public int modifyInfo(ItemInfoDTO info);
	
	//관리자 - 제품 정보 삭제
	public int deleteInfo(int itemId);
	
	//관리자 - 품목등록/수정/삭제 로그 기록하기
	public int insertManagementLog(ManagementLogDTO logInfo);
}
