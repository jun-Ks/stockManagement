$(document).ready(function(){
    let userId = $("#userId").text();
	
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

	const today = new Date();

	const year = today.getFullYear();
	const month = String(today.getMonth() + 1).padStart(2, '0'); // 0부터 시작하므로 +1
	const day = String(today.getDate()).padStart(2, '0');

	const formattedDate = `${year}-${month}-${day}`;
	$(".startDate").val(formattedDate)
	$(".endDate").val(formattedDate)
})

//테이블 만드는 함수
function makeTbl(logList, itemInfoList){
	let thead = 
		"<tr>" + 
			"<th class='th_drawingNo'>도면번호</th>" + 
			"<th class='th_itemName'>품목명</th>" + 
			"<th class='th_location'>위치</th>"+
			"<th class='th_quantity'>수량</th>" +
			"<th class='th_deliveryDate'>출고일 </th>" +
        "</tr>";
            

	$(".deliveryList thead").html(thead);

	let tbody = ""; 

	
	if(logList.length > 0){
		for(let i = 0; i < logList.length; i++){
			tbody +=
				"<tr>" +
                    "<input type='hidden' class='hidden_no' value='" + logList[i].no + "'>" + 
					"<td class='td_drawingNo ellipsis'>" + itemInfoList[i].drawingNo + "</td>" +
					"<td class='td_itemName ellipsis'>" + itemInfoList[i].itemName + "</td>" +
					"<td class='td_location'>" + itemInfoList[i].location + "</td>" + 
					"<td class='td_quantity'>" + logList[i].cartQty + "</td>" +
					"<td class='td_deliveryDate'>" + logList[i].deliveryDate.split("T")[0].substring(2)  + "</td>" +
				"</tr>";
		}
	}else{
		tbody = 
			`<tr>
				<td colspan='5'> 출고 데이터가 없습니다. </td>
			</tr>`;
	}
	
	$(".deliveryList tbody").html(tbody);
}

//리스트 터치 시 모달창
$(document).on("click", ".deliveryList tbody tr", function(){
    let deliveryNo = $(this).find(".hidden_no").val();
    
    $(".modal").show();

    $.ajax({
		url: "/delivery/list/" + deliveryNo,
		type: "GET",		
		success: function(response){
			let deliveryLog = response.log;
			let itemInfo = response.info;

            let tbody = `
                <tr>
                    <th>품목코드</th><td>${itemInfo.itemCode}</td>
                </tr>
                <tr>
                    <th>도면번호</th><td>${itemInfo.drawingNo}</td>
                </tr>
                <tr>
                    <th>품목명</th><td>${itemInfo.itemName}</td>
                </tr>
                <tr>
                    <th>위치</th><td>${itemInfo.location}</td>
                </tr>
                <tr>
                    <th>출고수량</th><td>${deliveryLog.cartQty}</td>
                </tr>
                <tr>
                    <th>출고일자</th><td class="modal_td_deliveryDate">${deliveryLog.deliveryDate.replace("T", " ")}</td>
                </tr>
            `
            $(".modal-deliveryInfoTable tbody").html(tbody)
		},
		error: function(xhr){
			alert(xhr.responseText);
			
			return false;
		}
	});
});

//모달닫기
$(document).on("click", ".modal-close, .modal-close-btn", function(){
    $(".modal").hide();
});

$(".search_btn").on("click", function(){
	let userId = $("#userId").text();
	let startDate = $(".startDate").val();
	let endDate = $(".endDate").val();

	if(startDate > endDate){
		alert("시작일은 종료일 이후로 설정해 주세요.");
		return false;
	}

    $.ajax({
		url: "/delivery/list/" + userId + "/" + startDate + "/" + endDate,
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