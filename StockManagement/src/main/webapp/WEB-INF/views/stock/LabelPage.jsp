<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>라벨 조회 페이지</title>

<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>

<link href="https://fonts.googleapis.com/css2?family=Pretendard:wght@100;300;400;500;700&display=swap" rel="stylesheet">

<link rel="stylesheet" href="/css/stock/LabelPage.css">

<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>

</head>
<body>
	<header>
		<%@ include file="../etc/Header.jsp" %>
	</header>
	<div class="searchBox">
		<select id="rackName">
			<option value="NONE">구역선택</option>
		</select>
		<select id="rackNumber">
			<option value="NONE">선택</option>
		</select>
		<select id="rackStage">
			<option value="NONE">선택</option>
		</select>
		<button id="makeQR">QR코드 생성하기</button>
	</div>
	
	<div class="infoBox">
		<p id="label"></p>
		<div class="resultBox">
			<table class="infoTable" border="1">
				<thead></thead>
				<tbody></tbody>			
			</table>
		</div>
		

	</div>
	
	<script src="/js/stock/LabelPage.js"></script>

</body>
</html>