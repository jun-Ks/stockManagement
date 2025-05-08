//출고리스트 페이지 로드되면 금일 출고 리스트 전개

$(document).ready(function(){
	
	//관리자 체크메뉴 show, hide
	if(userDept === "구매팀" || userDept === "ERP팀"){
		$("#manager-menu").show();
		$("#manager-shipment-chk").attr("checked", "true")
	}else{
		$("#manager-menu").hide();
	}
	
	//오늘날짜로 시작/끝날짜 기본으로 넣어놓기
	inputToday();
	
	$.ajax({
		url: "/delivery/list/today/" + userId,
		type: "GET",		
		success: function(response){
			let logList = response.logList;
			let itemInfoList = response.itemInfoList;
			$("#searched-startDate").text($("#startDate").val());
			$("#searched-endDate").text($("#endDate").val());
			makeTbl(logList, itemInfoList);
		},
		error: function(xhr){
			alert(xhr.responseText);
			
			return false;
		}
	});
});

//오늘날짜로 시작/끝날짜 기본으로 넣어놓기
function inputToday(){
	const today = new Date();
	const year = today.getFullYear();
	const month = String(today.getMonth() + 1).padStart(2, '0');
	const day = String(today.getDate()).padStart(2, '0');
	const todayStr = `${year}-${month}-${day}`;

	$("#startDate, #endDate").val(todayStr);
}

//조회버튼 클릭 시 해당 기간 내 데이터 조회
$("#searchData").on("click", function(){
	searchListByDate();
});

//기간 내 데이터 조회함수
function searchListByDate(){
	let startDate = $("#startDate").val();
	let endDate = $("#endDate").val();
	
	$.ajax({
		url: "/delivery/list/"+ userId + "/" + startDate + "/" + endDate,
		type: "GET",		
		success: function(response){
			let logList = response.logList;
			let itemInfoList = response.itemInfoList;
			$("#searched-startDate").text(startDate);
			$("#searched-endDate").text(endDate);
			makeTbl(logList, itemInfoList);
		},
		error: function(xhr){
			alert(xhr.responseText);
			
			return false;
		}
	});
}

//기간 내 사용자 상관없이 모든 출고데이터 조회 - 관리자용
function searchAllListByDate(){
	let startDate = $("#startDate").val();
	let endDate = $("#endDate").val();
	$.ajax({
		url: "/delivery/all-list/" + startDate + "/" + endDate,
		type: "GET",		
		success: function(response){
			let logList = response.logList;
			let itemInfoList = response.itemInfoList;
			$("#searched-startDate").text(startDate);
			$("#searched-endDate").text(endDate);
			makeTbl(logList, itemInfoList);
		},
		error: function(xhr){
			alert(xhr.responseText);
			
			return false;
		}
	});
}
//테이블 만드는 함수
function makeTbl(logList, itemInfoList){
	let thead = 
		"<tr>" + 
			"<th>제품 ID</th>" + 
			"<th>도면번호</th>" + 
			"<th>품목명</th>" + 
			"<th>위치</th>"+
			"<th>출고수량</th>" +
			"<th>출고자 id </th>" +
			"<th>출고자 부서</th>" +
			"<th>출고자 성명</th>" + 
			"<th>출고일 </th>";

	$(".deliveryList thead").html(thead);

	let tbody = ""; 

	for(let i = 0; i < logList.length; i++){
		tbody +=
			"<tr>" +
				"<td>" + itemInfoList[i].no + "</td>" +
				"<td>" + itemInfoList[i].drawingNo + "</td>" +
				"<td>" + itemInfoList[i].itemName + "</td>" +
				"<td>" + itemInfoList[i].location + "</td>" + 
				"<td>" + logList[i].cartQty + "</td>" +
				"<td>" + logList[i].userId + "</td>" +
				"<td>" + logList[i].userDept + "</td>" +
				"<td>" + logList[i].userName + "</td>" +
				"<td>" + logList[i].deliveryDate.replace("T", " ") + "</td>" +
			"</tr>";
	}
	$(".deliveryList tbody").html(tbody);
}

$("#manager-shipment-chk").on("change", function(){
	if($("#manager-shipment-chk").prop("checked")){
		searchListByDate();
	}else{
		searchAllListByDate();
	}
})
//엑셀 변환
$("#createExcel").on("click", function(){
	let searched_startDate = $("#searched-startDate").text();
	let searched_endDate = $("#searched-endDate").text();
	let status = 0; //0본인, 1전체
	
	//관리자 + 관리자 메뉴 체크 유무
	let is_checked = $("#manager-shipment-chk").prop("checked");
	
	if(userDept === "구매팀" || userDept === "ERP팀"){
		//본인 것만
		if(is_checked){
			status = 0;
		}else{
			status = 1;
		}
	}
	deliveryAjax(searched_startDate, searched_endDate, status, userId);
});

function deliveryAjax(searched_startDate, searched_endDate, status, userId){
	$.ajax({
		url: "/delivery-list/excel/" + searched_startDate + "/" + searched_endDate + "/" + userId + "/" + status,
		type: "POST",		
		xhrFields: {
            responseType: 'blob' // 서버에서 엑셀 파일을 Blob 형태로 받음
        },
		success: function(blob, status, xhr) {
			// 1. 서버에서 내려준 파일명 추출
	        const disposition = xhr.getResponseHeader('Content-Disposition');
	        let filename = 'download.xlsx'; // 기본값
			
	        if (disposition && disposition.indexOf('filename=') !== -1) {
	            const match = disposition.match(/filename="?(.+)"?/);
	            if (match.length > 1) {
	                filename = decodeURIComponent(match[1]);
					console.log(filename)
	            }
	        }

	        // 2. 링크 생성해서 다운로드 처리
	        const link = document.createElement('a');
	        const url = window.URL.createObjectURL(blob);
	        link.href = url;
	        link.download = filename;
	        document.body.appendChild(link);
	        link.click();

	        // 3. 메모리 정리
	        window.URL.revokeObjectURL(url);
	        document.body.removeChild(link);	
		},
		error: function(xhr){
			alert(xhr.responseText);
			
			return false;
		}
	});
}