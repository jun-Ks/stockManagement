<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>위치 수정 요청</title>

<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>

<link href="https://fonts.googleapis.com/css2?family=Pretendard:wght@100;300;400;500;700&display=swap" rel="stylesheet">

<link rel="stylesheet" href="/css/stock/LocationModi_Request.css">

<style>
	.infoBox{
		display: flex;
		gap: 20px; /* 두 박스 사이 여백 */
	}
	
	.cartBox{
		display: none;
	}
</style>
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>

</head>
<body>
	<header>
		<%@ include file="../etc/Header.jsp" %>
	</header>

	<div class="searchBox">
		<select id="search-option">
			<option value="drawingNo">도면번호</option>
			<option value="itemName">품목명</option>
			<option value="itemCode">품목코드</option>
			<option value="detailDrawingNo">세부규격</option>
			<option value="type">타입</option>
			<option value="location">위치</option>
		</select>
		<input type="text" id="searchKeyword">
		<button id="search">검색</button>
	</div>
	
	<div class="infoBox">
		<div class="resultBox">
			<table class="infoTable">
				<thead></thead>
				<tbody></tbody>			
			</table>
		</div>
		
		<div class="cartBox">
			<div class="closeBtn"> <button>X</button></div>
			<div><h3>수량/위치 변경 리스트</h3></div>
			<table class="cartTable">
				<thead></thead>
				<tbody></tbody>
				<tfoot></tfoot>
			</table>
		</div>
		
	</div>
	<div class="openCartBtn">
    	🛒
	</div>	
	<script src="/js/stock/LocationModi_Request.js"></script>

</body>
</html>