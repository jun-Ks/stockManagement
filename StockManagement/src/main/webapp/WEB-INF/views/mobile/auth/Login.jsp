<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
  <title>로그인</title>
  <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
  <link href="https://fonts.googleapis.com/css2?family=Pretendard:wght@100;300;400;500;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" type="text/css" href="/mobile/css/Login.css">
</head>
<body>

  <header>
    <div>윈텍 창고 품목 출고 페이지</div>
  </header>

  <div class="login-container">
    <div class="login-box">
      <img src="/mobile/img/logo.png" alt="(주)윈텍" title="">
      
      <label for="username">아이디</label>
      <input type="text" id="userId" name="usesrId" required>

      <label for="password">비밀번호</label>
      <input type="password" id="userPw" required>

      <button id="login">로그인</button>

    </div>
  </div>
  <script src="/mobile/js/login.js"></script>
</body>
</html>
