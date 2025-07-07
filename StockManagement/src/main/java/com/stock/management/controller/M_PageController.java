package com.stock.management.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import jakarta.servlet.http.HttpSession;

@Controller
@RequestMapping("/m")

public class M_PageController {

    private String isLogined(HttpSession session, String page){
		if(session.getAttribute("userId") == null){
			return "/mobile/auth/Login";
		}
		return page;
	}

    //로그인페이지
    @GetMapping("")
    public String pdaMainPage() {
        return "/mobile/auth/Login";
    }

    //로그인페이지
    @GetMapping("/")
    public String pdaMainPage2() {
        return "/mobile/auth/Login";
    }

    //메뉴페이지
    @GetMapping("/menu")
    public String selectMenu(HttpSession session) {
        return isLogined(session, "/mobile/etc/SelectMenu");
    }
    
    //품목조회/출고페이지
    @GetMapping("/stock")
    public String stockViewPage(HttpSession session) {
        return isLogined(session, "/mobile/stock/StockSearch");
    }
    
    //출고리스트 페이지
    @GetMapping("/delivery/list")
    public String deliveryList(HttpSession session) {
        return isLogined(session, "/mobile/stock/DeliveryList");
    }
    
    //구매요청
    @GetMapping("/purchase")
    public String purchasePage(HttpSession session) {
        return isLogined(session, "/mobile/request/Purchase");
    }
    
    //구매요청리스트
    @GetMapping("/purchase/requested-list")
    public String purchaseRequestedListPage(HttpSession session) {
        return isLogined(session, "/mobile/request/PurchaseRequestList");
    }
    
    //로그아웃
	@PostMapping("/logout")
	public String logout(HttpSession session) {
		session.invalidate();
		return "/mobile/auth/Login"; // 로그인 페이지로 이동
	}

}
