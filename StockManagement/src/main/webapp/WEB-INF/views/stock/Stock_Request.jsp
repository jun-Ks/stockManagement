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
	
	<div class="optionsBox"> 
	    <div class="option active" id="purchaseRequestBtn">구매요청</div>
	    <div class="option" id="stockDataInsertRequestBtn">제품 데이터 추가 요청</div>
	</div>

	<div class="requestList">

	</div>

	<div class="requestBox" id="purchaseRequestBox">
		<div class="form-group">
			<div class="form-notice">구매요청 할 품목을 아래 버튼을 클릭하여 찾고 추가해주세요.</div>
			<button id="searchItemBtn">+ 품목 추가</button>
		</div>
		<div class="purchaseRequestList">
			<button id="sendRequestBtn">구매요청 전송</button>
			<table class="requestListTbl cartTable" border="1">
				<thead>
					<tr> 
						<th id="cart_no">no</th> 
						<th id="cart_itemCode">품목코드</th> 
						<th id="cart_drawingNo">도면번호</th>
						<th id="cart_itemName">품명</th> 
						<th id="cart_location">위치</th>
						<th id="cart_quantity">수량</th>
						<th id="cart_requestQty">요청수량</th>
						<th id="cart_del">삭제</th>
					</tr>
				</thead>
				<tbody>
	
				</tbody>
			</table>
		</div>
	</div>

	<!-- 모달 오버레이 -->
	<div id="itemSearchModal" class="modal-overlay">
		<div class="modal-content">
			<div class="modal-header">
				<div class="modal-title">품목 검색</div>
				<span class="modal-close">&times;</span>
			</div>
			<div class="modal-body">
				<div class="searchBox">
					<select id="search-option">
						<option value="drawingNo">도면번호</option>
						<option value="itemName">품목명</option>
						<option value="itemCode">품목코드</option>
						<option value="location">위치</option>
					</select>
					<input type="text" id="searchKeyword">
					<button id="modal-search">검색</button>
				</div>
				<div id="searchResultList">
					<table class="search-result-list infoTable">
						<thead>
						</thead>
						<tbody>
						</tbody>
					</table>
				</div>
			</div>
		</div>
	</div>

	<div class="requestBox" id="stockDataRequestBox">
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