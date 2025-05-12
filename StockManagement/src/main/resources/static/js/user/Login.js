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
			location.href = response;
		},
		error: function(xhr){
			alert(xhr.responseText);
			
			return false;
		}
	});
})

//x 버튼 클릭 시 모달 창 닫기
$(".modal-close").on("click", function(){
	$(".modal").hide();
})


$("#call-erpteam").on("click", function(){
	$(".modal").show();
});

$("#sendToErpTeam").on("click", function(){
	let checked_location = $("input[name='location']:checked");
	let checked_reason = $("input[name='reason']:checked");

	//유효성 검사
	if(checked_location.length === 0){
		alert("현 위치를 선택해주세요.");
		return;
	}

	if(checked_reason.length === 0){
		alert("호출 사유를 선택해주세요.");
		return;
	}

	let requesterLocation = checked_location.val();
	let reason = checked_reason.val();
	
	$.ajax({
		url: "/user/call",
		type: "POST",
		data:{
			requesterLocation: requesterLocation,
			reason: reason
		},
		success: function(response){
			location.href = response;
		},
		error: function(xhr){
			alert(xhr.responseText);
			
			return false;
		}
	});
});
