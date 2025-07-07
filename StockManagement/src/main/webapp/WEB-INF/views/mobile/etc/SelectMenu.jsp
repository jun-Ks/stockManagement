<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
  <title>메뉴선택</title>
  <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
  <link href="https://fonts.googleapis.com/css2?family=Pretendard:wght@100;300;400;500;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" type="text/css" href="/mobile/css/SelectMenu.css">
</head>
<body>

    <header>
		<%@ include file="../../mobile/etc/Header.jsp" %>
	</header>

    <h3 id="title">원하시는 메뉴를 선택해주세요.</h3>

    <div class="menu-container">
        <div class="menu-card" onclick="location.href='/m/stock'">
            <h3>품목조회/출고</h3>
        </div>
        <div class="menu-card" onclick="location.href='/m/delivery/list'">
            <h3>출고리스트</h3>
        </div>
        <div class="menu-card" onclick="location.href='/m/purchase'">
            <h3>구매요청</h3>
        </div>
        <div class="menu-card" onclick="location.href='/m/purchase/requested-list'">
            <h3>구매요청리스트</h3>
        </div>
    </div>
    <script src="/mobile/js/SelectMenu.js"></script>
</body>
</html>
