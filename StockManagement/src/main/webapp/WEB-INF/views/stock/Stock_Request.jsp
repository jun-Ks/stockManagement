<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>입고 / 제품 위치 변경 요청</title>

<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>

<link href="https://fonts.googleapis.com/css2?family=Pretendard:wght@100;300;400;500;700&display=swap" rel="stylesheet">

<link rel="stylesheet" href="/css/stock/Stock_Request.css">
</head>
<body>
<header>
	<%@ include file="../etc/Header.jsp" %>
</header>
	
<div class="requestBox">
	<div class="form-group">
		<label for="type">품목코드</label>
		<input type="text" id="itemCode">
	</div>
	
	<div class="form-group">
		<label for="type">타입</label>
		<input type="text" id="type">
	</div>

	<div class="form-group">
		<label for="itemName">품목명</label>
		<input type="text" id="itemName">
	</div>

	<div class="form-group">
		<label for="drawingNo">도면번호</label>
		<input type="text" id="drawingNo">
	</div>

	<div class="form-group">
		<label for="detailDrawingNo">세부규격</label>
		<input type="text" id="detailDrawingNo">
	</div>

	<div class="form-group">
		<label for="basicQuantity">수량</label>
		<input type="number" id="basicQuantity" min="0" step="1">
	</div>

	<div class="form-group">
		<label>위치</label>
		<div class="location-selects">
			<select id="rackName"></select>
			<select id="rackNumber"></select>
			<select id="rackStage"></select>
		</div>
	</div>

	<div class="form-group">
		<label for="note">비고</label>
		<input type="text" id="note">
	</div>

	<button id="requestBtn">입고요청</button>
</div>


<script src="/js/stock/Stock_Request.js"></script>

</body>
</html>