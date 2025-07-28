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

    <!-- Toastify CSS -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/toastify-js/src/toastify.min.css">

    <!-- Toastify JS -->
    <script src="https://cdn.jsdelivr.net/npm/toastify-js"></script>
</head>
<body>
    <header>
		<%@ include file="../../mobile/etc/Header.jsp" %>
	</header>
    
    <div class="searchBox">
        <input type="text"
            id="search-location"
            inputmode="none"
            autocomplete="off"
            autocorrect="off"
            autocapitalize="off"
            spellcheck="false" />
        <div class="input_location">PDA 오른쪽 주황색 버튼을 눌러 <br> QR코드를 스캔해주세요.</div>
    </div>
    <div class="info-container"></div>
    <div class="empty-container" style="display: none;"></div>
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
                <button class="modal-deliveryBtn">출고하기</button>
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

    <!--스캔 불가시 검색 초기화-->
    <a href="/m/stock" class="floating-button" title="검색 초기화">
        <i class="fa fa-refresh"></i>
    </a>
    <script src="/mobile/js/StockSearch.js"></script>
    <script src="/mobile/js/searchFunc.js"></script>
</body>
</html>