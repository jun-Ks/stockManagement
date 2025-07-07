<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Header</title>
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100;300;400;500;700;900&display=swap" rel="stylesheet">

    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">

    <link rel="stylesheet" type="text/css" href="/mobile/css/Header.css">
</head>
<body>
    
    <div class="header">
        <span class="goToMenu"><i class="fas fa-arrow-left"></i></span>
        <span class="loginInfo">
            <span id="userId">${userId }</span> / 
            <span id="userName">${userName }</span> / 
            <span id="userDept">${userDept }</span> / 
            <span id="logout">로그아웃</span>
            <form id="logoutForm" action="/m/logout" method="POST" style="display:none">
            </form>
        </span>
		<!-- <form id="logoutForm" action="/auth/logout" method="post">
			<button type="submit"></button>
		</form>
		<span id="logout">로그아웃</span> -->
	</div>

    <script src="/mobile/js/Header.js"></script>

</body>
</html>