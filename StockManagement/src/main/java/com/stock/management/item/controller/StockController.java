package com.stock.management.item.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.stock.management.item.dto.DeliveryListDTO;
import com.stock.management.item.dto.DeliveryLogDTO;
import com.stock.management.item.dto.ItemInfoDTO;
import com.stock.management.item.service.IItemService;

@RestController
public class StockController {
	
	@Autowired
	IItemService service;
	
	//출고정보 불러오기
	@GetMapping("/delivery/list/today/{userId}")
	public ResponseEntity<DeliveryListDTO> getDeliveryListByToday(@PathVariable("userId") String userId){
					
		//로그인된 아이디 금일 출고한 정보리스트 확인
		List<DeliveryLogDTO> logList = service.getDeliveryLogByToday(userId);
		
		//제품 정보리스트 담기
		List<ItemInfoDTO> itemInfoList = new ArrayList<>();
		
		for (int i = 0; i < logList.size(); i++) {
		    int itemId = logList.get(i).getItemId();
		    itemInfoList.addAll(service.getItemById(itemId));
		}
		
		//출고 리스트 + 제품 정보 return
		DeliveryListDTO response = new DeliveryListDTO();
		response.setItemInfoList(itemInfoList);
		response.setLogList(logList);
		
		return ResponseEntity.ok(response);
		
	}
	
	//출고정보 날짜별로 불러오기
	@GetMapping("/delivery/list/{userId}/{startDate}/{endDate}")
	public ResponseEntity<DeliveryListDTO> getDeliveryListByDate(
			@PathVariable("startDate") String startDate, 
			@PathVariable("endDate") String endDate, 
			@PathVariable("userId")String userId
			){
		
		//기간 별 로그담기
		List<DeliveryLogDTO> logList = service.getDeliveryLogByDate(startDate, endDate, userId);
		
		//제품 정보리스트 담기
		List<ItemInfoDTO> itemInfoList = new ArrayList<>();
		
		for (int i = 0; i < logList.size(); i++) {
		    int itemId = logList.get(i).getItemId();
		    itemInfoList.addAll(service.getItemById(itemId));
		}
		
		//출고 리스트 + 제품 정보 return
		DeliveryListDTO response = new DeliveryListDTO();
		response.setItemInfoList(itemInfoList);
		response.setLogList(logList);
		
		return ResponseEntity.ok(response);
	}
	

}
