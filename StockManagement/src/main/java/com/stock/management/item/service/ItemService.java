package com.stock.management.item.service;

import java.util.List;

import org.apache.ibatis.annotations.Param;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.stock.management.item.dto.CartInfoDTO;
import com.stock.management.item.dto.DeliveryLogDTO;
import com.stock.management.item.dto.ItemInfoDTO;
import com.stock.management.item.dto.ManagementLogDTO;
import com.stock.management.item.dto.SearchDTO;
import com.stock.management.item.mapper.IItemMapper;


@Service
public class ItemService implements IItemService{

	@Autowired
	IItemMapper mapper;
	
	//키워드로 품목찾기
	@Override
	public List<ItemInfoDTO> getItemByOption(SearchDTO searchInfo) {
		//System.out.println(searchInfo.toString());
		List<ItemInfoDTO> itemList = mapper.getItemByOption(searchInfo);
		//System.out.println("service : " + itemList.toString());
		return itemList;
	}
	
	//출고 시 calculatedQuantity 수량 감소	
	@Override
	public int deliveryById(int itemId, int cartQty) {
		
		int deliveryResult = mapper.deliveryById(itemId, cartQty);
		
		return deliveryResult;
	}
	
	//출고 시 정보 로그로 남기기
	@Override
	public int insertDeliveryLog(CartInfoDTO cartInfo) {
		int insertResult = mapper.insertDeliveryLog(cartInfo);
		
		return insertResult;
	}
	
	//오늘 날짜 출고리스트 확인
	@Override
	public List<DeliveryLogDTO> getDeliveryLogByToday(@Param("userId") String userId) {
		
		List<DeliveryLogDTO> logList = mapper.getDeliveryLogByToday(userId);
		
		return logList;
	}
	
	//제품id로 제품정보가져오기
	@Override
	public List<ItemInfoDTO> getItemById(int itemId) {
		
		List<ItemInfoDTO> itemInfoList = mapper.getItemById(itemId);
		
		return itemInfoList;
	}
	
	//기간 별 출고 리스트 가져오기
	@Override
	public List<DeliveryLogDTO> getDeliveryLogByDate(String stratDate, String endDate,
			String userId) {
		
		List<DeliveryLogDTO> logList = mapper.getDeliveryLogByDate(stratDate, endDate, userId);
		
		return logList;
	}

	//제품 정보 등록(입고)하기
	@Override
	public int insertItemInfo(List<ItemInfoDTO> itemInfo) {
		System.out.println(itemInfo.toString());
		for(int i = 0; i < itemInfo.size(); i++) {
			itemInfo.get(i).setCalculatedQuantity(itemInfo.get(i).getBasicQuantity());
		}
		int result = mapper.insertItemInfo(itemInfo);
		return result;
	}
	
	//제품위치 수정하기
	@Override
	public int modifyLocation(int itemId, String modiLocation) {
		
		int result = mapper.modifyLocation(itemId, modiLocation);
		
		return result;
	}

	//그룹아이디로 제품아이디가져오기
	@Override
	public int getItemIdIdByGroupId(String groupId) {
		
		int result = mapper.getItemIdIdByGroupId(groupId);
		
		return result;
	}

	//관리자 - 단품 - 제품정보등록
	@Override
	public int insertInfo(ItemInfoDTO info) {
		
		int result = mapper.insertInfo(info);
		return result;
	}
	
	//관리자 - 제품정보 수정
	@Override
	public int modifyInfo(ItemInfoDTO info) {
		
		int result = mapper.modifyInfo(info); 
		return result;
	}
	
	//관리자 - 제품정보 삭제
	@Override
	public int deleteInfo(int itemId) {
		
		int result = mapper.deleteInfo(itemId);
		return result;
	}
	
	//관리자 - 품목등록/수정/삭제 로그 기록하기
	@Override
	public int insertManagementLog(ManagementLogDTO logInfo) {
		int result = mapper.insertManagementLog(logInfo);
		
		return result;
	}


	

}
