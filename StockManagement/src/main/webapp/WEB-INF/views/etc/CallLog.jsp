<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>전산팀 호출 로그</title>
    
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>

    <link href="https://fonts.googleapis.com/css2?family=Pretendard:wght@100;300;400;500;700&display=swap" rel="stylesheet">

    <link rel="stylesheet" href="/css/etc/CallLog.css">
</head>
<body>
    <header>
		<%@ include file="../etc/Header.jsp" %>
	</header>
    <table class="logList" border ="1">
        <thead></thead>
        <tbody></tbody>
    </table>

    <script src="/js/etc/CallLog.js"></script>
</body>
</html>