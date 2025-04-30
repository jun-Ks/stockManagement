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
	}
});

$("#logout").on("click", function(){
	$("#logoutForm").submit();
})
