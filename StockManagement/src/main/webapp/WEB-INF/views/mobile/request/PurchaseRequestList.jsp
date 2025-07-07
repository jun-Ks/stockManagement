<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>구매요청리스트</title>

    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">

    <link rel="stylesheet" type="text/css" href="/mobile/css/PurchaseRequestList.css">
</head>
<body>
    <header>
		<%@ include file="../../mobile/etc/Header.jsp" %>
	</header>

    <div class="purchaseList-container">
        <div class="title">구매 요청 리스트</div>
        <div class="notice">
            상세정보를 보시려면 리스트를 터치하세요.
        </div>
        <div class="searchBox">
            <div>
                <input type="date" class="startDate"> ~ <input type="date" class="endDate">
                <button class="search_btn">검색</button>
            </div>
        </div>
        <div class="listBox">
            <table class="purchaseList">
                <thead></thead>
                <tbody></tbody>
            </table>
        </div>
    </div>
    
    <!-- 모달 구조 -->
    <div id="reqeustModal" class="modal">
        <div class="modal-content">
            <span class="modal-close">&times;</span>
            <h2>출고정보 상세보기</h2>
            <table class="modal-reqeustInfoTable">
                <thead></thead>
                <tbody></tbody>
            </table>
            <button class="modal-close-btn">닫기</button>
        </div>
    </div>

    <script src="/mobile/js/PurchaseRequestList.js"></script>
</body>
</html>