$("#login").on("click", function(){
	let userId = $("#userId").val().toUpperCase();
	let userPw = $("#userPw").val();
	
	$.ajax({
		url: "/user",
		type: "POST",
		data:{
			id: userId,
			pw: userPw
		},
		success: function(response){
			location.href = "/m/menu";
		},
		error: function(xhr){
			alert(xhr.responseText);
			
			return false;
		}
	});
})

// 엔터 키로 로그인
$("#userId, #userPw").on("keyup", function(e) {
    if (e.key === "Enter" || e.keyCode === 13) {
        $("#login").click();
    }
});
