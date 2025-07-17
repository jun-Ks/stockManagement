package com.stock.management.item.controller;


import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.stock.management.item.dto.ItemInfoDTO;
import com.stock.management.item.dto.PurchaseApprovalDTO;
import com.stock.management.item.dto.RequestModiLocationDTO;
import com.stock.management.item.dto.RequestPurchaseDTO;
import com.stock.management.item.dto.RequestStockDTO;
import com.stock.management.item.service.IItemService;
import com.stock.management.item.service.IRequestService;


@RestController
public class RequestController {

	@Autowired
	IRequestService service;
	
	@Autowired
	IItemService itemService;
	
	//입고 요청
	@PostMapping("/stock/request/info")
	public ResponseEntity<String> insertRequestStockInfo(@RequestBody RequestStockDTO requestInfo){

		
		String uuid = UUID.randomUUID().toString();
		
		requestInfo.setGroupId(uuid);
		
		int result = service.insertRequestStockInfo(requestInfo);
		
		if(result != 0) {
			return ResponseEntity.ok("입고 요청 완료");
			
		}else {
			 return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                     .body("요청실패.. 전산팀에 문의해주세요.");
		}

	}
	
	//위치+수량 변경 요청
	@PostMapping("/stock/request/modi/location/quantity")
	public ResponseEntity<String> insertRequestModiLocationInfo(@RequestBody List<RequestModiLocationDTO> requestInfo) {
		
		int result = 0;
		
		for(int i = 0 ; i < requestInfo.size(); i++) {
			String uuid = UUID.randomUUID().toString();
			
			requestInfo.get(i).setGroupId(uuid);
			result += service.insertRequestModiLocationInfo(requestInfo.get(i));
		}
		//System.out.println(requestInfo.toString());
		
		if(result != 0) {
			return ResponseEntity.ok(result + "건 요청 등록 완료.");
		}
		
		
		return ResponseEntity.status(HttpStatus.BAD_REQUEST)
		.body("요청실패.. 전산팀에 문의해주세요.");
	}
	
	//재고 요청 리스트 전개 by id
	@PostMapping("/request/stock/list/{userId}/{userDept}")
	public ResponseEntity<List<RequestStockDTO>> getRequestList(
			@PathVariable("userId") String requesterId,
			@PathVariable("userDept") String userDept){
		//부서가 구매팀/erp팀이면 전체 리스트 확인 할 수 있도록 return 
		if(userDept.equals("구매팀") || userDept.equals("ERP팀")) {
			
			List<RequestStockDTO> requestAllList = service.getRequestStockList();
			return ResponseEntity.ok(requestAllList);
			
		}else {
			
			List<RequestStockDTO> requestList = service.getRequestStockListById(requesterId);
			return ResponseEntity.ok(requestList);
		}
	}
	
	//위치 수정 요청 리스트 전개 by id
	@PostMapping("/request/modi-location/list/{userId}/{userDept}")
	public ResponseEntity<List<RequestModiLocationDTO>> getRequestModiLocaList(
			@PathVariable("userId") String requesterId,
			@PathVariable("userDept") String userDept){
		
		//부서가 구매팀/erp팀이면 전체 리스트 확인 할 수 있도록 return 
		if(userDept.equals("구매팀") || userDept.equals("ERP팀")) {
			
			List<RequestModiLocationDTO> requestAllList = service.getRequestModiLocaList();
			
			return ResponseEntity.ok(requestAllList);
			
		}else {
			
			List<RequestModiLocationDTO> requestList = service.getRequestModiLocaListById(requesterId);
			
			return ResponseEntity.ok(requestList);
		}
	}
 	
	//approval 여부 따라 입고 요청 리스트 조회
	@PostMapping("/request/stock/list/approval/{approval}/{userDept}/{userId}")
	public ResponseEntity<List<RequestStockDTO>> getReqeustStockListByApproval(
			@PathVariable("approval") int approval, 
			@PathVariable("userDept")String userDept, 
			@PathVariable("userId")String userId){
		
		if(userDept.equals("구매팀") || userDept.equals("ERP팀")) {
			List<RequestStockDTO> requestList = service.getRequestStockListByApproval(approval);
			return ResponseEntity.ok(requestList);
		}else {
			List<RequestStockDTO> requestList = service.getRequestStockListByApprovalId(approval, userId);

			return ResponseEntity.ok(requestList);
		}
	}
	
	//approval 여부 따라 입고 요청 리스트 조회
	@PostMapping("/request/modi-location/list/approval/{approval}/{userDept}/{userId}")
	public ResponseEntity<List<RequestModiLocationDTO>> getRequestModiLocaListByApproval(
			@PathVariable("approval") int approval,
			@PathVariable("userDept")String userDept, 
			@PathVariable("userId")String userId){
		
		if(userDept.equals("구매팀") || userDept.equals("ERP팀")) {
			List<RequestModiLocationDTO> requestList = service.getRequestModiLocaListByApproval(approval);
			return ResponseEntity.ok(requestList);
		}else {
			
			List<RequestModiLocationDTO> requestList =service.getRequestModiLocaListByApprovalId(approval, userId);
			
			return ResponseEntity.ok(requestList);
		}
	}
	
	//입고요청 승인
	@PutMapping("/request/stock/approval/{approvalUser}")
	public ResponseEntity<String> approvalStockRequest(@PathVariable("approvalUser") String approvalUser, 
			@RequestBody List<ItemInfoDTO> requestInfo){
		
		final String requestType = "stockRequest";
		
		//요청정보승인, groupId 설정
		for(ItemInfoDTO info : requestInfo) {
			service.approvalStockRequest(approvalUser, info.getNo());
			
			//요청 no로 그룹아이디 가져오기
			String groupId = service.getGroupIdByRequesterNo(info.getNo(), requestType);
			
			//그룹아이디 requestInfo에 담아주기
			info.setGroupId(groupId);
		}
		
		//요청정보 바탕으로 입고 데이터 등록하기
		int insertResult = itemService.insertItemInfo(requestInfo);
		
		if(insertResult <= 0) {
			 return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                     .body("등록실패.. 전산팀에 문의해주세요.");
		}
		
		//요청테이블에 itemId업데이트
		int finalResult = 0;
		for(ItemInfoDTO info : requestInfo) {
			
			String groupId = info.getGroupId();
			int itemId = itemService.getItemIdIdByGroupId(groupId);
			
			finalResult += service.updateRequestItemId(requestType, itemId, groupId);
		}
		
		//최종결과반환
		
		if(finalResult > 0) {
			return ResponseEntity.ok(finalResult + "건 등록완료..!");
		}else {
			 return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                     .body("등록실패.. 전산팀에 문의해주세요.");
		}
	}
	
	//위치 변경 요청 승인
	@PutMapping("/request/location/approval/{approvalUser}")
	public ResponseEntity<String> approvalLocationRequest(
			@PathVariable("approvalUser") String approvalUser,
			@RequestBody List<RequestModiLocationDTO> requestInfo
			){
		//  System.out.println(requestInfo.toString());
	 	
		int updateResult = 0;
		
		//요청정보 승인
		for(RequestModiLocationDTO info : requestInfo) {
			int approvalResult = service.approvalLocationRequest(approvalUser, info.getItemId());
			
			if(approvalResult > 0) {
				//System.out.println(info.getQuantity());
				updateResult += itemService.modifyLocation(info.getItemId(), info.getModiLocation(), info.getModiQuantity());
			}
		}
		
		//결과반환
		if(updateResult > 0 ) {
			return ResponseEntity.ok(updateResult + "건 위치 수정 완료.");
		}else {
			 return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                     .body("등록실패.. 전산팀에 문의해주세요.");
		}
	}
	
	//입고요청, 위치변경요청 중 미승인건 cnt
	@GetMapping("/request/unapproval/count")
	public ResponseEntity<?> cntUnapproval(){
		int cnt_stockRequest = service.cntUnapprovalStockRequest();
		int cnt_modiLocaRequest = service.cntUnapprovalModiLocationRequest();
		int cnt_purchaseRequest = service.cntUnapprovalPurchaseRequest();
		
		Map<String, Integer> countResult = new HashMap<>();
		
		countResult.put("입고 요청", cnt_stockRequest);
		countResult.put("위치 변경", cnt_modiLocaRequest);
		countResult.put("구매 요청", cnt_purchaseRequest);

		return ResponseEntity.ok(countResult);
	}

	//요청 정보 수정
	@PutMapping("/request/list/type/{type}/id/{requestId}")
	public ResponseEntity<?> putMethodName(
		@PathVariable("type") String type, 
		@PathVariable("requestId") String string_requestId, 
		@RequestBody Object modiData) {

		int requestId = Integer.parseInt(string_requestId);
		String column = "";
		if(type.equals("a")){
			column = "modiQuantity";
		}else if(type.equals("b")){
			column = "modiLocation";
		}
	
		int result = service.requestInfoUpdate(column, modiData, requestId);


		if(result > 0 ) {
			return ResponseEntity.ok(modiData);
		}else{
			return ResponseEntity.status(HttpStatus.BAD_REQUEST)
				.body("수정실패.. 전산팀에 문의해주세요.");
		}
		
	}

	//구매요청추가
	@PostMapping("/stock/request/qty")
	public ResponseEntity<String> requestQty(@RequestBody List<RequestPurchaseDTO> requestInfo) {
		for(int i = 0 ; i < requestInfo.size(); i++) {
			String uuid = UUID.randomUUID().toString();
			requestInfo.get(i).setGroupId(uuid);
		}
		
		int result = service.insertPurchaseList(requestInfo);
		if(result > 0){
			return ResponseEntity.ok("요청 등록완료");
		}else{
			return ResponseEntity.status(HttpStatus.BAD_REQUEST)
				.body("수정실패.. 전산팀에 문의해주세요.");
		}
	}

	//구매요청 리스트
	@GetMapping("/request/purchase/list/approval/{approval}")
	public ResponseEntity<List<RequestPurchaseDTO>> getMethodName(@PathVariable("approval") int approval) {
		List<RequestPurchaseDTO> list = service.getRequestPurchaseList(approval);

		return ResponseEntity.ok(list);
	}
	
	//구매요청 - 수량 변경
	@PutMapping("/request/purchase/list/id/{requestId}")
	public ResponseEntity<?> updateRequestPurchaseQty(@PathVariable("requestId") int no, @RequestBody int requestQuantity) {
		
		int result = service.updateRequestPurchaseQty(no, requestQuantity);

		if(result > 0){
			return ResponseEntity.ok(requestQuantity);
		}else{
			return ResponseEntity.status(HttpStatus.BAD_REQUEST)
				.body("수정실패.. 전산팀에 문의해주세요.");
		}
	}
	
	//구매요청 승인
	@PutMapping("/request/purchase/approval/")
	public ResponseEntity<String> updateStockQuantity(@RequestBody List<PurchaseApprovalDTO> approvalList) {
		int updateInfoResult = 0;
		int finalResult = 0;
		//System.out.println(approvalList.size());
		for(int i = 0; i < approvalList.size(); i++){
			String approvalUser = approvalList.get(i).getApprovalUser();
			int requestId = approvalList.get(i).getRequestListId();
			// System.out.println(approvalUser + " / " + requestId);
			updateInfoResult += service.approvalRequestPurchase(requestId, approvalUser);
			// System.out.println("updateInfo : " + updateInfoResult);
			if(updateInfoResult > 0) {
				int itemId = approvalList.get(i).getItemId();
				int requestQuantity = approvalList.get(i).getRequestQuantity();
				finalResult += itemService.updateQuantity(requestQuantity, itemId);
				// System.out.println("final : " + finalResult);
			}else{
				return ResponseEntity.status(HttpStatus.BAD_REQUEST)
				.body("요청 등록 실패.. 전산팀에 문의해주세요.");
			}
		}
		
		if(finalResult > 0){
			return ResponseEntity.ok("수량 등록 완료");
		}else{
			return ResponseEntity.status(HttpStatus.BAD_REQUEST)
				.body("요청 등록 실패.. 전산팀에 문의해주세요.");
		}
	}

	//구매요청등록 - 개별
	@PostMapping("/mobile/stock/request/qty")
	public ResponseEntity<String> requestQtyByMobile(@RequestBody RequestPurchaseDTO requestInfo) {
		String uuid = UUID.randomUUID().toString();
		requestInfo.setGroupId(uuid);
		
		int result = service.requestQtyByMobile(requestInfo);
		
		if(result > 0){
			return ResponseEntity.ok("요청 등록완료");
		}else{
			return ResponseEntity.status(HttpStatus.BAD_REQUEST)
				.body("수정실패.. 전산팀에 문의해주세요.");
		}
	}
	
	//구매요청리스트 - all by RequesterId
	@GetMapping("/stock/request/list/requester/{requesterId}/{startDate}/{endDate}")
	public ResponseEntity<List<RequestPurchaseDTO>> getRequestPurchaseListByRequesterId(
		@PathVariable("requesterId") String requesterId,
		@PathVariable("startDate") String startDate,
		@PathVariable("endDate") String endDate) {
		
		List<RequestPurchaseDTO> list = service.getRequestPurchaseListByRequesterId(requesterId, startDate, endDate);

		return ResponseEntity.ok(list);
	}
	
	//구매요청리스트 - 개별 by no
	@GetMapping("/stock/request/no/{no}")
	public ResponseEntity<RequestPurchaseDTO> getRequestPurchaseByNo(@PathVariable("no") int no) {

		RequestPurchaseDTO info = service.getRequestPurchaseByNo(no);
		
		return ResponseEntity.ok(info);
	}
	
	//수정요청 - 수량 OR 위치
	@PutMapping("/stock/{data_type}/{no}")
	public ResponseEntity<String> modifyInfo(@PathVariable("data_type") String data_type, @PathVariable("no") int no, @RequestBody RequestModiLocationDTO data) {
		String location = "";
		int quantity = 0;
		//NO로 현 품목정보가져오기
		ItemInfoDTO itemInfo = itemService.getItemInfoByItemNo(no);

		//requestDTO에 담기
		RequestModiLocationDTO requestInfo = new RequestModiLocationDTO();
		requestInfo.setItemId(itemInfo.getNo());
		requestInfo.setItemCode(itemInfo.getItemCode());
		requestInfo.setDrawingNo(itemInfo.getDrawingNo());
		requestInfo.setType(itemInfo.getType());
		requestInfo.setItemName(itemInfo.getItemName());
		requestInfo.setLocation(itemInfo.getLocation());
		requestInfo.setQuantity(itemInfo.getCalculatedQuantity());
		requestInfo.setNote(itemInfo.getNote());
		requestInfo.setGroupId(itemInfo.getGroupId());
		requestInfo.setRequesterId(data.getRequesterId());

		//위치변경
		if(data_type.equals("modiLocation")){
			location = data.getModiLocation();
			requestInfo.setModiLocation(location);
		}else{
			quantity = data.getModiQuantity();
			requestInfo.setModiQuantity(no);
		}

		int result = service.insertRequestModiLocationInfo(requestInfo);

		if(result > 0){
			return ResponseEntity.ok("변경 요청 등록 완료");
		}else{
			return ResponseEntity.status(HttpStatus.BAD_REQUEST)
				.body("요청 등록 실패.. 전산팀에 문의해주세요.");
		}
	}
}
