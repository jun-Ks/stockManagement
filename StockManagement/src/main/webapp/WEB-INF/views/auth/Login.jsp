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
	<!--<button id="call-erpteam">전산팀 호출하기</button> !-->

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