<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>품목 관리 페이지</title>

<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>

<link href="https://fonts.googleapis.com/css2?family=Pretendard:wght@100;300;400;500;700&display=swap" rel="stylesheet">

<link rel="stylesheet" href="/css/stock/StockManagement.css">

</head>
<body>
	<header>
		<%@ include file="../etc/Header.jsp" %>
	</header>
	<div class="optionsBox"> 
	    <div class="option active" id="stock-insert">품목등록</div>
	    <div class="option" id="stock-modify">품목 수정/삭제</div>
	</div>
	<div class="managementBox">
		<div class="insert-box">
			<div class="form-group">
				<label for="type">품목코드</label>
				<input type="text" id="code">
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
			    <label for="type">도면번호</label>
			    <div class="input-wrapper">
			        <input type="text" id="drawingNo">
			        <!-- <span class="search">중복체크</span> -->
			    </div>
			</div>
			
			<div class="form-group">
			    <label for="type">세부규격</label>
			    <div class="input-wrapper">
			        <input type="text" id="detailDrawingNo">
			    </div>
			</div>

			<div class="form-group">
				<label>제품상태</label>
				<div class="select-status">
					<select id="status">
						<option value="">선택해주세요.</option>
						<option value="">---------------</option>
						<option value="완제품">완제품</option>
						<option value="가공중">가공중</option>
						<option value="소재">소재</option>
						<option value="불량">불량</option>
						<option value="">---------------</option>
						<option value="부자재">부자재</option>
						<option value="공구">공구</option>
						<option value="기타">기타</option>
					</select>
				</div>
			</div>

			<div class="form-group">
				<label for="basicQuantity">수량</label>
				<input type="number" id="basicQuantity" min="0" step="1">
			</div>
		
			<div class="form-group">
				<label>위치
					<span id="toolRoom">
						<input type="checkbox" id="toolRoom-chk"> <span>공구실</span>
					</span>
				</label>
				<!-- <div id="notice"> * 위치가 아래 항목으로 등록 할 수 없을 경우, 빈공백으로 등록 후 전산팀으로 "위치 등록 요청"을 해주세요.</div> -->
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

			<button id="insertBtn">등록</button>
		</div>
		<div class="modify-box">
			<div class="searchBox">
				<select id="search-option">
					<option value="drawingNo">도면번호</option>
					<option value="itemName">품목명</option>
					<option value="itemCode">품목코드</option>
					<option value="type">타입</option>
					<option value="location">위치</option>
				</select>
				<input type="text" id="searchKeyword">
				<button id="search">검색</button>
			</div>
			<table class="stockList">
				<thead></thead>
				<tbody></tbody>
				<tfoot></tfoot>
			</table>
		</div>
	</div>	
	
	
	<!-- 모달 창 -->
	<div id="itemModal" class="modal" style="display:none;">
		<div class="modal-content">
			<span class="close">&times;</span>
			
			<h2 id="modal-title">품목 수정/삭제</h2>
			
			<p class="modal-index"><strong>품목번호:</strong> <input type="text" id="modalNo" readonly></p>
			<p class="modal-index"><strong>품목코드:</strong> <input type="text" id="modalItemCode"></p>
		    <p class="modal-index"><strong>도면번호:</strong> <input type="text" id="modalDrawingNo"></p>
		    <p class="modal-index"><strong>세부규격:</strong> <input type="text" id="modalDetailDrawingNo"></p>
		    <p class="modal-index"><strong>타입:</strong> <input type="text" id="modalType"></p>
		    <p class="modal-index"><strong>품명:</strong> <input type="text" id="modalItemName"></p>
		    <p class="modal-index"><strong>제품상태:</strong></p>
			<p class="status-select">
				<select id="modalStatus"></select>
			</p>
		    <p class="modal-index"><strong>수량:</strong> <input type="text" id="modalQuantity"></p>
		    <p class="modal-index"><strong>위치:</strong></p>
		    <p class="location-selects">
				<select id="modalRackName"></select>
				<select id="modalRackNumber"></select>
				<select id="modalRackStage"></select>
			</p>
			<p class="modal-index"><strong>비고:</strong><input type="text" id="modalNote"></p>
			<div class="modal-buttons-box">
				<button id="deleteBtn">삭제</button>
				<button id="modifyBtn">수정</button>
			</div>
		</div>
	</div>
	<script src="/js/stock/StockManagement.js"></script>
</body>
</html>