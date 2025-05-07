let userId = $("#userId").text();
let userDept = $("#userDept").text();
let userName = $("#userName").text();

$(document).ready(function(){
	//현재 페이지 링크 가져오기
	let currentPath = window.location.pathname;
	//현재페이지 링크가 클릭된 href와 경로가 같으면 active클래스 추가
	$(".header-menu").each(function(){
		if($(this).attr("href") === currentPath){
			$(this).addClass("active");
		}
	});
	
	if(userDept === "구매팀" || userDept === "ERP팀"){
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
