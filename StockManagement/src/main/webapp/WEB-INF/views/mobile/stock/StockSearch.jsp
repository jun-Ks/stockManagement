<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>품목조회/출고</title>

  <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">

  <script src="https://unpkg.com/html5-qrcode"></script>

  <link rel="stylesheet" type="text/css" href="/mobile/css/StockSearch.css">
</head>
<body>
    <header>
		<%@ include file="../../mobile/etc/Header.jsp" %>
	</header>
    
    <div class="searchBox">
        <input type="text" id="search-location"> 
        <!-- <input type="text" id="search-location" placeholder="여기를 터치 후 QR코드를 스캔해주세요.">  -->
        <!-- <button id="search-btn">검색</button> -->
        <button id="qrScan">QR스캔</button>
    </div>
    <div class="info-container"></div>

    <!-- 모달 구조 -->
    <div id="deliveryModal" class="modal">
        <div class="modal-content">
            <span class="modal-close">&times;</span>
            <h2>출고하기</h2>
            <table class="modal-deliveryTable">
                <thead></thead>
                <tbody></tbody>
            </table>
            <div class="modal-deliveryInput">
                <div class="keyboard">
                    <button>1</button>
                    <button>2</button>
                    <button>3</button>
                    <button>4</button>
                    <button>5</button>
                    <button>6</button>
                    <button>7</button>
                    <button>8</button>
                    <button>9</button>
                    <button>0</button>
                    <button>00</button>
                    <button>←</button>
                </div>
                <button class="keyboard-delivery">출고하기</button>
            </div>
        </div>

    </div>
    <!-- QR 모달 -->
    <div id="qrModal" class="modal">
    <div class="modal-content">
        <span class="modal-close">&times;</span>
        <h2>QR코드 스캔</h2>
        <div id="reader" style="width: 100%; max-width: 320px; margin: 0 auto;"></div>
    </div>
    </div>

    <!-- 출고 리스트 바로가기 버튼 -->
    <a href="/m/delivery/list" class="floating-button" title="출고리스트">
        <i class="fa-solid fa-dolly"></i>
    </a>
    <script src="/mobile/js/StockSearch.js"></script>
</body>
</html>