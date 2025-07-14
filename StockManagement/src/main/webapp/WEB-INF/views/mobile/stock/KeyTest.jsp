<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <title>스캐너 입력 테스트</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      padding: 30px;
    }
    #scan-input {
      font-size: 24px;
      width: 300px;
      height: 50px;
    }
    #result {
      margin-top: 20px;
      font-size: 20px;
      color: green;
    }
  </style>
</head>
<body>

  <h2>📷 스캐너 입력 테스트 페이지</h2>
  <p>아래 입력창에 포커스된 상태에서 스캐너로 QR/바코드를 입력해보세요.</p>

  <input type="text"
         id="scan-input"
         inputmode="none"
         autocomplete="off"
         autocorrect="off"
         autocapitalize="off"
         spellcheck="false"
         placeholder="스캔하면 여기에 표시됩니다" />

  <div id="result">스캔 결과가 여기에 표시됩니다</div>

  <script>
    const input = document.getElementById('scan-input');
    const result = document.getElementById('result');

    input.focus();

    input.addEventListener('keydown', function (e) {
      // Enter 입력 시 스캔 결과 표시
      if (e.key === 'Enter') {
        const value = input.value;
        result.textContent = '스캔 결과: ' + value;
        input.value = '';
        setTimeout(() => input.focus(), 100);
      }
    });

    // 주기적으로 포커스 유지
    setInterval(() => {
      if (document.activeElement !== input) {
        input.focus();
      }
    }, 1000);
  </script>

</body>
</html>
