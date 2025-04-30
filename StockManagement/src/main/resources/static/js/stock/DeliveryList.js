//출고리스트 페이지 로드되면 금일 출고 리스트 전개



$(document).ready(function(){
	inputToday();
	$.ajax({
		url: "/delivery/list/today/" + userId,
		type: "GET",		
		success: function(response){
			let logList = response.logList;
			let itemInfoList = response.itemInfoList;
			
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

$("#searchData").on("click", function(){
	
	let startDate = $("#startDate").val();
	let endDate = $("#endDate").val();
	
	$.ajax({
		url: "/delivery/list/"+ userId + "/" + startDate + "/" + endDate,
		type: "GET",		
		success: function(response){
			let logList = response.logList;
			let itemInfoList = response.itemInfoList;
			
			makeTbl(logList, itemInfoList);
		},
		error: function(xhr){
			alert(xhr.responseText);
			
			return false;
		}
	});
});


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