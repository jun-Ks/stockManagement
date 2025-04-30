package com.stock.management.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

import jakarta.servlet.http.HttpSession;

@Controller
public class PageController {
	
	//로그인 페이지
	@GetMapping("/")
	public String indexPage() {
		return "/auth/Login";
	}
	
	//재고 검색 / 출고
	@GetMapping("/stock")
	public String stockViewPage() {
		return "/stock/StockSearch";
	}
	
	//출고현황 리스트
	@GetMapping("/stock/delivery/list/")
	public String deliveryListByToday() {
		return "/stock/DeliveryList";
	}
	
	//입고요청
	@GetMapping("/stock/request")
	public String updateStockRequest() {
		
		return "/stock/Stock_Request";
	}
	
	//위치 변경 
	@GetMapping("/stock/location/modi/request")
	public String updateLocationRequest() {
		
		return "/stock/LocationModi_Request";
	}
	
	//요청/변경 현황페이지
	@GetMapping("/stock/request/list")
	public String requestListPage() {
		
		return "/stock/RequestList";
	}
	
	//관리자 품목 관리
	@GetMapping("/stock/management")
	public String managementPage() {
		
		return "/stock/StockManagement";
	}
	
	@PostMapping("/auth/logout")
	public String logout(HttpSession session) {
		session.invalidate();
		return "redirect:/"; // 로그인 페이지로 이동
	}
}
