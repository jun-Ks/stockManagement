<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>요청 현황 페이지</title>

<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>

<link href="https://fonts.googleapis.com/css2?family=Pretendard:wght@100;300;400;500;700&display=swap" rel="stylesheet">

<link rel="stylesheet" href="/css/stock/RequestList.css">

</head>
<body>
	<header>
		<%@ include file="../etc/Header.jsp" %>
	</header>

	<div class="optionsBox">
		<div class="check-option">
			<input type="checkbox" id="unApproval"> 미승인건만 보기
		</div>
	</div>

	<div class="optionsBox"> 
	    <div class="option active" id="stock">입고 요청</div>
	    <div class="option" id="location">위치 변경 요청</div>
	</div>

	<div class="requestList">
		<div class="tab-content stock active">
			<table class="requestStockList" border="1">
				<thead></thead>
				<tbody></tbody>
				<tfoot></tfoot>
			</table>
		</div>
		<div class="tab-content location">
			<table class="requestModiLocationList" border="1">
				<thead></thead>
				<tbody></tbody>
				<tfoot></tfoot>
			</table>
		</div>
	</div>

	<script src="/js/stock/RequestList.js"></script>
</body>
</html>
