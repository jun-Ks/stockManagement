let userId = $("#userId").text();
let userDept = $("#userDept").text();
let userName = $("#userName").text();

$(document).ready(function(){
	//현재 페이지 링크 가져오기
	let currentPath = window.location.pathname;
	//현재페이지 링크가 클릭된 href와 경로가 같으면 active클래스 추가

	if(userDept === "ERP팀"){
		$("#call-log").show();
	}else{
		$("#call-log").hide();
	}
	$(".header-menu").each(function(){
		if($(this).attr("href") === currentPath){
			$(this).addClass("active");
		}
	});
	
	if(userDept === "구매팀" || userDept === "ERP팀" || userDept === "생산관리부"){
		$("#stock-management").show();

		$.ajax({
			url: "/request/unapproval/count",
			type: "GET",
			contentType: "application/json",
			success: function(response){
				let cnt_stockRequest = response["입고 요청"];
				let cnt_modiLocaRequest = response["위치 변경"];
				if(cnt_stockRequest > 0 || cnt_modiLocaRequest > 0){
					newBadge("requestListPage");
				}
			},
			error: function(xhr){
				alert(xhr.responseText);
			}
		});
	}

});

//미승인건 있을경우 new 달아주기
function newBadge(type){
	let badgeId = "#" + type;
	if($(badgeId + " .new-badge").length === 0){
		let newBadge = "<span class='new-badge'>N</span>";
		$(badgeId).append(newBadge);
	}
	
}

$("#logout").on("click", function(){
	$("#logoutForm").submit();
})

//x 버튼 클릭 시 모달 창 닫기
$(".modal-close").on("click", function(){
	$(".modal").hide();
	clearInterval(pollingInterval);
})

$("#call-erpteam").on("click", function(){
	$("#erpModal").show();
});

//전산팀 호출하기
$("#sendRequest").on("click", function(){
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
		url: "/user/help",
		type: "POST",
		data:{
			requesterLocation: requesterLocation,
			reason: reason,
			requesterId : userId,
			requesterName : userName,
			requesterDept : userDept
		},
		success: function(response){
			$("#erpModal").hide();
			$("#callingState").show();
			$("input[name='location'], input[name='reason']").prop("checked", false);
			callingStatus();
		},
		error: function(xhr){
			alert(xhr.responseText);
			
			return false;
		}
	});
});

let dotInterval = null;
let pollingInterval = null;
let isAccepted = false;
//닷 애니메이션
function startDotAnimation() {
	if (dotInterval === null) {
		let dots = "";
		dotInterval = setInterval(function () {
			dots = dots.length < 3 ? dots + "." : "";
			$(".statePanel").text("수락 확인 중입니다" + dots);
		}, 500);
	}
}
//닷 애니메이션 종료
function stopDotAnimation() {
	if (dotInterval !== null) {
		clearInterval(dotInterval);
		dotInterval = null;
	}
}

function callingStatus(){
	startDotAnimation(); // 애니메이션 즉시 시작
	pollingInterval = setInterval(function(){
		$.ajax({
			url: "/user/help/status",
			method: "GET",
			dataType: "json",
			success: function(response) {
				console.log("서버 응답:", response);
    			console.log("타입 확인:", typeof response);
				if (response > 0) {
					stopDotAnimation(); // 애니메이션 멈춤
					$(".statePanel").empty().html("요청이 확인 되었습니다. <br>전산팀 출발하였으니 잠시만 기다려 주세요! <br><br> 🏃‍♂️");
					clearInterval(pollingInterval);
				}
			},
			error: function(xhr, status, error) {
				console.error("요청 중 오류 발생:", error);
			}
		});
	}, 1500);
}