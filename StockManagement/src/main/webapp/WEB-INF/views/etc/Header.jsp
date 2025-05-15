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
		<a href="#" class="header-menu" id="call-erpteam">🚨전산팀 호출하기🚨</a>
		<a href="/erpteam/log" class="header-menu" id="call-log">호출 로그</a>
	</div>

	</div>
		
	<div id="erpModal" class="modal">
		<div class="modal-content">
			<span class="modal-close">&times;</span><br>
			<h2>전산팀 호출</h2>
			<p>현 위치를 선택해주세요.</p>
			<div id="help-location">
				<input type="radio" id="l1" name="location" class="modal-location" value="부자재창고">
				<label for="l1">부자재 창고</label>

				<input type="radio" id="l2" name="location" class="modal-location" value="엘레베이터옆">
				<label for="l2">엘레베이터 옆</label>
			</div>
			<hr>
			<p>어떤 사유로 호출하시나요?</p>
			<div id="erpForm">
				<input type="radio" id="r2" name="reason" class="modal-reason" value="네트워크">
				<label for="r2">인터넷 또는 네트워크 문제</label>

				<input type="radio" id="r3" name="reason" class="modal-reason" value="로그인">
				<label for="r3">로그인 오류</label>

				<input type="radio" id="r4" name="reason" class="modal-reason" value="사용법">
				<label for="r4">사용법</label>

				<input type="radio" id="r5" name="reason" class="modal-reason" value="컴퓨터문제">
				<label for="r5">컴퓨터 문제</label>

				<input type="radio" id="r6" name="reason" class="modal-reason" value="기타">
				<label for="r6">기타</label>
				<br><br>
				<button type="button" id="sendRequest">요청 전송</button>
			</div>
		</div>
	</div>

	<div id="callingState" class="modal">
		<div class="modal-content">
			<span class="modal-close">&times;</span><br>
			<h2>전산팀 호출</h2>
			<div class="statePanel"></div>
		</div>
	</div>
	<script src="/js/etc/Header.js"></script>
</body>
</html>