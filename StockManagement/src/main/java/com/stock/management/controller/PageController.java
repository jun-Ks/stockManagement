package com.stock.management.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

import jakarta.servlet.http.HttpSession;

@Controller
public class PageController {

	private String isLogined(HttpSession session, String page){
		if(session.getAttribute("userId") == null){
			return "/auth/Login";
		}
		return page;
	}

	//로그인 페이지
	@GetMapping("/")
	public String indexPage() {
		return "/auth/Login";
	}
	
	//재고 검색 / 출고
	@GetMapping("/stock")
	public String stockViewPage(HttpSession session) {
		return isLogined(session, "/stock/StockSearch");
	}
	
	//출고현황 리스트
	@GetMapping("/stock/delivery/list/")
	public String deliveryListByToday(HttpSession session) {
		return isLogined(session, "/stock/DeliveryList");
	}
	
	//입고요청
	@GetMapping("/stock/request")
	public String updateStockRequest(HttpSession session) {
		return isLogined(session, "/stock/Stock_Request");	
	}
	
	//위치 변경 
	@GetMapping("/stock/location/modi/request")
	public String updateLocationRequest(HttpSession session) {
		return isLogined(session, "/stock/LocationModi_Request");		
	}
	
	//요청/변경 현황페이지
	@GetMapping("/stock/request/list")
	public String requestListPage(HttpSession session) {
		return isLogined(session, "/stock/RequestList");	
	}
	
	//관리자 품목 관리
	@GetMapping("/stock/management")
	public String managementPage(HttpSession session) {
		return isLogined(session, "/stock/StockManagement");	
	}
	
	@PostMapping("/auth/logout")
	public String logout(HttpSession session) {
		session.invalidate();
		return "redirect:/"; // 로그인 페이지로 이동
	}

	//로그페이지
	@GetMapping("/erpteam/log")
	public String callLog(HttpSession session , @RequestParam(name = "linkDept", required = false) String linkDept){
		String dept = (String) session.getAttribute("userDept");
		
		if(dept != null && dept.equals("ERP팀")){
			return isLogined(session, "/etc/CallLog");
		}else if(linkDept != null && linkDept.equals("ERP팀")){
			return "/etc/CallLog";
		}else if(dept == null){
			return "redirect:/";
		}
		return "redirect:/";
	}
}
