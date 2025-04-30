<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>

<link href="https://fonts.googleapis.com/css2?family=Pretendard:wght@100;300;400;500;700&display=swap" rel="stylesheet">

<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>

<link rel="stylesheet" href="/css/etc/Header.css">


</head>
<body>
	<div class="loginInfo">
		<span id="userId">${userId }</span> / 
		<span id="userName">${userName }</span> / 
		<span id="userDept">${userDept }</span> / 
		<form id="logoutForm" action="/auth/logout" method="post">
			<button type="submit"></button>
		</form>
		<span id="logout">로그아웃</span>
	</div>
	<div class="menu-navi">
		<a href="/stock" class="header-menu" id="searchPage">품목조회/출고</a>
		<a href="/stock/delivery/list/" class="header-menu" id="deliveryListPage">출고리스트</a>
		<a href="/stock/request" class="header-menu" id="stockRequestPage">품목 입고요청</a>
		<a href="/stock/location/modi/request" class="header-menu" id="locationModiPage">위치 수정요청</a>
		<a href="/stock/request/list" class="header-menu" id="requestListPage">입고/위치수정 요청 리스트</a>
		<a href="/stock/management" class="header-menu" id="stock-management">품목관리</a>
	</div>
	
	<script src="/js/etc/Header.js"></script>
</body>
</html>