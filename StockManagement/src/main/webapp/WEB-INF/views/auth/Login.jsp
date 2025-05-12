<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>윈텍 창고 재고 검색 페이지</title>

<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<link href="https://fonts.googleapis.com/css2?family=Pretendard:wght@100;300;400;500;700&display=swap" rel="stylesheet">
<link rel="stylesheet" type="text/css" href="/css/auth/Login.css">
</head>
<body>

<div class="container">
	<div class="input-group">
		<img src="http://www.win-tec.co.kr/img/logo.png" alt="(주)윈텍" title="">
		<h3>윈텍 창고 품목 검색/출고 페이지</h3>
	    <input type="text" id="userId" placeholder="아이디"><br>
	</div>
	<div class="input-group">
	    <input type="password" id="userPw" placeholder="패스워드"><br>
	</div>
	<button id="login">로그인</button>
	<br>
	<!-- <button id="call-erpteam">전산팀 호출하기</button> -->
	<div id="erpModal" class="modal">
		<div class="modal-content">
		<span class="modal-close">&times;</span>
		<h2>전산팀 호출</h2>
		<p>현 위치를 선택해주세요</p>
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

			<input type="radio" id="r5" name="reason" class="modal-reason" value="기타">
			<label for="r5">기타</label>
			<br><br>
			<button type="button" id="sendToErpTeam">요청 전송</button>
		</div>
	</div>
</div>
</div>

<footer>
	<%@ include file="../etc/Footer.jsp" %>
</footer>

<script src="/js/user/Login.js"></script>

	<div class="footer">
	    <div class="footer-content">
			<p>&copy; 2025 WINTEC — Developed by KSJ</p>
	    </div>
	</div>
</body>
</html>