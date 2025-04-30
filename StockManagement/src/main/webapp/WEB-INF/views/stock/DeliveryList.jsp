<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>출고 리스트</title>

<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>

<link href="https://fonts.googleapis.com/css2?family=Pretendard:wght@100;300;400;500;700&display=swap" rel="stylesheet">

<link rel="stylesheet" href="/css/stock/DeliveryList.css">
</head>
<body>
	<header>
		<%@ include file="../etc/Header.jsp" %>
	</header>
	
	<div class="searchBox">
		<input type="date" id="startDate"> ~ <input type="date" id="endDate">
		<button id="searchData">조회</button>
	</div>
	<div class="deliveryListBox">
		<table class="deliveryList">
			<thead></thead>
			<tbody></tbody>
		</table>
	</div>
	
	<script src="/js/stock/DeliveryList.js"></script>
</body>
</html>