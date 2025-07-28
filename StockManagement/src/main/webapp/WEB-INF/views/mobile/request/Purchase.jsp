<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>구매요청</title>

    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">

    <script src="https://unpkg.com/html5-qrcode"></script>

    <!-- Toastify CSS -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/toastify-js/src/toastify.min.css">
    <!-- Toastify JS -->
    <script src="https://cdn.jsdelivr.net/npm/toastify-js"></script>

    <!-- sweetalert2 CSS -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/sweetalert2@11/dist/sweetalert2.min.css">
    <!-- sweetalert2 JS -->
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>

    <link rel="stylesheet" type="text/css" href="/mobile/css/Purchase.css">
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
    <div id="purchaseModal" class="modal">
        <div class="modal-content">
            <span class="modal-close">&times;</span>
            <h2>구매요청하기</h2>
            <table class="modal-purchaseTable">
                <thead></thead>
                <tbody></tbody>
            </table>
            <div class="modal-purchaseInput">
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
                <button class="keyboard-purchase">요청하기</button>
            </div>
        </div>

    </div>

    <!-- 출고 리스트 바로가기 버튼 -->
    <a href="/m/purchase/requested-list" class="floating-button" title="출고리스트">
        <i class="fas fa-clipboard-list"></i>
    </a>
        <script src="/mobile/js/searchFunc.js"></script>
    <script src="/mobile/js/Purchase.js"></script>
</body>
</html>