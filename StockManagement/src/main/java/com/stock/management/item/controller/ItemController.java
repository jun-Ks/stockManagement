package com.stock.management.item.controller;

import java.util.Collections;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.stock.management.item.dto.SearchDTO;
import com.stock.management.item.dto.CartInfoDTO;
import com.stock.management.item.dto.ItemInfoDTO;
import com.stock.management.item.dto.ItemInfoInsertDTO;
import com.stock.management.item.dto.ManagementLogDTO;
import com.stock.management.item.service.IItemService;

@RestController
public class ItemController {

	@Autowired
	IItemService service;
	
	//item 정보 검색하기
	@PostMapping("/stock/item")
	public ResponseEntity<?> getItemInfo(SearchDTO searchInfo){
		//System.out.println(searchInfo.toString());
		
		//serch option, keyword를 바탕으로 제품 찾기
		List<ItemInfoDTO> itemList = service.getItemByOption(searchInfo);
		//System.out.println(itemList.toString());
		//배열이 비었으면 null return
		if(itemList == null || itemList.isEmpty()) { 
			return ResponseEntity.ok(Collections.emptyList());
			
		}
		
		return ResponseEntity.ok(itemList);
	}
	
	//장바구니 품목들 출고하기
	@PostMapping("/stock/cart/delivery")
	public ResponseEntity<String> deliveryItems(@RequestBody List<CartInfoDTO> cartInfo){
		//출고수량만큼 calculatedQuantity 개수 - 시키기
		int logResult = 0;
		for(int i = 0; i < cartInfo.size(); i++) {
			//id, 개수 추출
			int itemId = cartInfo.get(i).getItemId();
			int cartQty = cartInfo.get(i).getCartQty();
			
			//제품 출고 진행
			int deliveryResult = service.deliveryById(itemId, cartQty);
			
			//출고 db에 정상적으로 남겨지면 로그기록
			if(deliveryResult > 0) {
				logResult += service.insertDeliveryLog(cartInfo.get(i));
			}//if
		}//for
		if(logResult != 0) {
			//System.out.println(logResult + "건 출고 로그 기록완료.");
			return ResponseEntity.ok(logResult + "건 출고 완료.");
			
		}else {
			 return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                     .body("등록실패.. 전산팀에 문의해주세요.");
		}//if
	}
	
	//제품정보등록하기
	@PostMapping("/item/info")
	public ResponseEntity<String> insertInfo(@RequestBody ItemInfoInsertDTO info){
		ItemInfoDTO itemInfo = info.getInsertData();
		
		int itemInfoInsertResult = service.insertInfo(itemInfo);
		
		if(itemInfoInsertResult > 0) {
			ManagementLogDTO logInfo = new ManagementLogDTO();
			logInfo.setUserId(info.getUserId());
			logInfo.setUserDept(info.getUserDept());
			logInfo.setUserName(info.getUserName());
			logInfo.setItemId(itemInfo.getNo());
			logInfo.setDrawingNo(itemInfo.getDrawingNo());
			logInfo.setType("등록");
			
			
			int logInsertResult = service.insertManagementLog(logInfo);
			
			if(logInsertResult > 0) {
				return ResponseEntity.ok("등록완료.");
			}else {
				 return ResponseEntity.status(HttpStatus.BAD_REQUEST)
	                     .body("등록실패..(log) 전산팀에 문의해주세요.");
			}
			
		}
		return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body("등록실패..(db) 전산팀에 문의해주세요.");
	}
	
	//제품정보수정
	@PutMapping("/item/info/modification")
	public ResponseEntity<String> modifyInfo(@RequestBody ItemInfoDTO info){
		int result = service.modifyInfo(info);
		
		if(result > 0) {
			return ResponseEntity.ok("수정성공");
		}
		 return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                 .body("수정실패.. 전산팀에 문의해주세요.");
	}
	
	@DeleteMapping("/item/info/{itemId}")
	public ResponseEntity<String> deleteInfo(@PathVariable("itemId") String itemId){
		int int_itemId = Integer.parseInt(itemId);
		int result = service.deleteInfo(int_itemId);
		
		if(result > 0) {
			return ResponseEntity.ok("삭제완료");
		}
		return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body("삭제실패.. 전산팀에 문의해주세요.");
		
	}
}
