<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>요청 현황 페이지</title>

<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>

<link href="https://fonts.googleapis.com/css2?family=Pretendard:wght@100;300;400;500;700&display=swap" rel="stylesheet">

<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />

<link rel="stylesheet" href="/css/stock/RequestList.css">

</head>
<body>
	<header>
		<%@ include file="../etc/Header.jsp" %>
	</header>

	<div class="optionsBox">
		<div class="check-option">
			<input type="checkbox" id="unApproval">
			<label for="unApproval">미승인건만 보기</label>
		</div>
	</div>

	<div class="optionsBox"> 
	    <div class="option active" id="stock">
	    	데이터 추가 요청
	    </div>
	    <div class="option" id="location">
	    	수량/위치 변경 요청
	    </div>
		<div class="option" id="purchase">
	    	구매 요청
	    </div>
	</div>

	<div class="requestList">
		<div class="tab-content stock active">
			<table class="requestStockList">
				<thead></thead>
				<tbody></tbody>
				<tfoot></tfoot>
			</table>
		</div>
		<div class="tab-content location">
			<table class="requestModiLocationList">
				<thead></thead>
				<tbody></tbody>
				<tfoot></tfoot>
			</table>
		</div>
		<div class="tab-content purchase">
			<table class="requestPurchaseList">
				<thead></thead>
				<tbody></tbody>
				<tfoot></tfoot>
			</table>
		</div>
	</div>


	<script src="/js/stock/RequestList.js"></script>
	
</body>
</html>
