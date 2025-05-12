$(document).ready(function(){
	let params = sessionStorage.getItem("fromModiLocationPage");
		
	if(params === "true"){
		console.log("params is true");
		$(".option").removeClass("active");
		$("#location").addClass("active");
		$(".tab-content").removeClass("active");
		$(".tab-content.location").addClass("active");
		unApprovalModiLocationRequestList();
	}else{
		//페이지 로드 시, 입고요청 페이지 메인으로 들어가기
		unApprovalStockRequestList();
	}
	//세션삭제
	sessionStorage.removeItem("fromModiLocationPage");

	//미승인건만 체크 defalut
	$("#unApproval").prop("checked", true);
	
	if(userDept === "구매팀" || userDept === "ERP팀"){
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
				if(cnt_stockRequest > 0){
					newBadge("stock");
				}
				if(cnt_modiLocaRequest > 0){
					newBadge("location");
				}
			},
			error: function(xhr){
				alert(xhr.responseText);
				return false;
			}
		});
	}//IF
	
});


$(document).on("click", ".option", function(){

    $(".option").removeClass("active");  // 모든 옵션에서 'active' 클래스를 제거
    $(this).addClass("active");           // 클릭된 옵션에 'active' 클래스를 추가

    // tab-content에 active 클래스를 제거하고, 클릭된 id에 해당하는 콘텐츠만 보이도록 처리
    $(".tab-content").removeClass("active");  // 모든 탭 콘텐츠에서 'active' 클래스를 제거
	
	let isUnApproval = $("#unApproval").prop("checked");
	
    if($(this).attr("id") === "stock"){
        $(".stock").addClass("active");       // 'stock' 탭 클릭 시 입고 요청 테이블을 활성화
		if(isUnApproval){
			unApprovalStockRequestList();
		}else{
	        getRequestStockList(userId, userDept);
		}

    } else if($(this).attr("id") === "location"){
        $(".location").addClass("active");    // 'location' 탭 클릭 시 위치 변경 요청 테이블을 활성화
		
		if(isUnApproval){
			unApprovalModiLocationRequestList();
		}else{
	        getRequestModiLocationList(userId, userDept);
		}

    }

});


// 입고 요청 리스트
function getRequestStockList(userId, userDept){
	$.ajax({
		url: "/request/stock/list/" + userId + "/" + userDept,
		type: "POST",
		contentType: "application/json",
		success: function(response){
			let list = response;
			makeStockPartTable(list, userDept);
		},
		error: function(xhr){
			alert(xhr.responseText);
			return false;
		}
	});
}

// 위치변경 요청 리스트
function getRequestModiLocationList(userId, userDept){
	$.ajax({
		url: "/request/modi-location/list/" + userId + "/" + userDept,
		type: "POST",
		contentType: "application/json",
		success: function(response){
			let list = response;
			makeLocationPartTable(list, userDept);
		},
		error: function(xhr){
			alert(xhr.responseText);
			return false;
		}
	});
}

// 입고 요청 테이블 만들기
function makeStockPartTable(list, userDept) {
	let thead = 
		"<tr>" + 
			((userDept === "구매팀" || userDept === "ERP팀") ? "<th class='stock-th-check'>선택</th>" : "") + 
			"<th>no</th>" +
			"<th>타입</th>" +
			"<th>품목코드</th>" +
			"<th>품목명</th>" +
			"<th>도면번호</th>" +
			"<th>세부규격</th>" + 
			"<th>수량</th>" +
			"<th>위치</th>" +
			"<th>요청자 부서</th>" +
			"<th>요청자 성명</th>" +
			"<th>요청날짜</th>" +
			"<th>승인여부</th>" +
		"</tr>";
	$(".requestStockList thead").html(thead);

	let tbody = "";
	if(list.length > 0){
		for(let i = 0; i < list.length; i++){
			tbody += 
				"<tr>" + 
					((userDept === "구매팀" || userDept === "ERP팀") ? "<td><input type='checkbox' class='stockTbl_check'></td>" : "") +
					"<td class='stock_requestNo'>" + list[i].no + "</td>" +
					"<td class='stock_type'>" + list[i].type + "</td>" +
					"<td class='stock_itemCode'>" + list[i].itemCode + "</td>" + 
					"<td class='stock_itemName'>" + list[i].itemName + "</td>" +
					"<td class='stock_drawingNo'>" + (list[i].drawingNo === null ? "-" : list[i].drawingNo) + "</td>" +
					"<td class='stock_detailDrawingNo'>" + (list[i].detailDrawingNo === null ? "-" : list[i].drawingNo) + "</td>" +
					"<td class='stock_basicQuantity'>" + list[i].basicQuantity + "</td>" +
					"<td class='stock_location'>" + (list[i].location === null ? "-" : list[i].location) + "</td>" +
					"<td class='stock_requesterDept'>" + list[i].requesterDept + "</td>" +
					"<td class='stock_requesterName'>" + list[i].requesterName + "</td>" +
					"<td>" + list[i].insertDate.replace("T", " ") + "</td>" +
					"<td class='stock_approval'>" + (list[i].approval === 0 ? "미승인" : "완료") + "</td>" +
				"</tr>";
		}
	}else{
		tbody = 
			`
			<tr>
				<td colspan='13'>요청 데이터가 없습니다. </td>
			</tr>
			`;
	}
	
	$(".requestStockList tbody").html(tbody);
	
	if(userDept === "구매팀" || userDept === "ERP팀"){
		$(".stock_approval").each(function(){
			if($(this).text() === "미승인"){
				let tfoot = 
					"<tr>" + 
						"<td colspan='13'><button id='approval'>입고 승인하기</button></td>" +
					"</tr>";
						
				$(".requestStockList tfoot").html(tfoot);
				return false;
			}//if
		})//each
	}//userDept if
	
}

// 위치변경 요청 테이블 만들기
function makeLocationPartTable(list, userDept) {
	
	let thead = 
		"<tr>" + 
			((userDept === "구매팀" || userDept === "ERP팀") ? "<th class='location-th-check'>선택</th>" : "") + 
			"<th>no</th>" +
			"<th>품목no</th>" +
			"<th>품목코드</th>" + 
			"<th>타입</th>" + 
			"<th>품목명</th>" +
			"<th>도면번호</th>" +
			"<th>위치</th>" +
			"<th>변경 요청 위치</th>" + 
			"<th>요청자 부서</th>" +
			"<th>요청자 성명</th>" +
			"<th>요청날짜</th>" +
			"<th>승인여부</th>" +
		"</tr>";
	$(".requestModiLocationList thead").html(thead);

	let tbody = "";
	
	if(list.length > 0){
		for(let i = 0; i < list.length; i++){
			tbody += 
				"<tr>" +
					((userDept === "구매팀" || userDept === "ERP팀") ? "<td><input type='checkbox' class='locationTbl_check'></td>" : "") +
					"<td class='location_requestNo'>" + list[i].no + "</td>" +
					"<td class='location_itemid'>" + list[i].itemId + "</td>" + 
					"<td class='location_itemCode'>" + list[i].itemCode + "</td>" + 
					"<td>" + list[i].type + "</td>" +
					"<td>" + list[i].itemName + "</td>" +
					"<td>" + list[i].drawingNo + "</td>" +
					"<td>" + list[i].location + "</td>" +
					"<td class='location_modiLocaion'>" + list[i].modiLocation + "</td>" +
					"<td>" + list[i].requesterDept + "</td>" +
					"<td>" + list[i].requesterName + "</td>" +
					"<td>" + list[i].insertDate.replace("T", " ") + "</td>" +
					"<td class='location_approval'>" + (list[i].approval === 0 ? "미승인" : "완료") + "</td>" +
				"</tr>";
		}
	}else{
		tbody = 
		`
		<tr>
			<td colspan='13'>요청 데이터가 없습니다.</td>
		</tr>
		`;
	}

	$(".requestModiLocationList tbody").html(tbody);
	
	if(userDept === "구매팀" || userDept === "ERP팀"){
		$(".location_approval").each(function(){
			if($(this).text() === "미승인"){
				let tfoot = 
					"<tr>" + 
						"<td colspan='13'><button id='location_approval'>변경 승인하기</button></td>" +
					"</tr>";
					
				$(".requestModiLocationList tfoot").html(tfoot);
				return false;
			}//if
		})//each
	}//userDept if
}


//선택 클릭 시 일괄 체크
$(document).on("click", ".stock-th-check", function() {
	const isAllChecked = $(".stockTbl_check").length === $(".stockTbl_check:checked").length;
	$(".stockTbl_check").prop("checked", !isAllChecked);  // 체크 or 해제 둘 다 처리
});

$(document).on("click", ".location-th-check", function() {
	const isAllChecked = $(".locationTbl_check").length === $(".locationTbl_check:checked").length;
	$(".locationTbl_check").prop("checked", !isAllChecked);  // 체크 or 해제 둘 다 처리
});

//미승인건만 보기 체크 시 미승인 건 들만 보여줌
$("#unApproval").on("change", function(){
	if($(this).prop("checked")){
		
		unApprovalStockRequestList();
		
		unApprovalModiLocationRequestList();
	}else{
		getRequestStockList(userId, userDept);
		getRequestModiLocationList(userId, userDept);
	}//if
})

//미승인 입고요청리스트
function unApprovalStockRequestList(){
	let approval = 0;
	//입고요청 테이블
	$.ajax({
		url: "/request/stock/list/approval/" + approval + "/" + userDept + "/" + userId,
		type: "POST",
		success: function(response){
			let list = response;
			makeStockPartTable(list, userDept);
		},
		error: function(xhr){
			alert(xhr.responseText);
			
			return false;
		}
	});
}

//미승인 위치변경요청리스트
function unApprovalModiLocationRequestList(){
	let approval = 0;
	let url = "/request/modi-location/list/approval/" + approval + "/" + userDept + "/" + userId;
	//위치변경 테이블
	$.ajax({
		url: url,
		type: "POST",
		success: function(response){
			let list = response;
			makeLocationPartTable(list, userDept);
		},
		error: function(xhr){
			alert(xhr.responseText);
			
			return false;
		}
	});
}
//입고승인하기
$(document).on("click", "#approval", function() {
	let stockRequestData =[];
	let approvalUser = userName;
	let isApproval = true;
    $(".stockTbl_check").each(function() {
        if ($(this).prop("checked")) {
			let approval = $(this).closest("tr").find(".stock_approval").text();
			
			if(approval === "미승인"){
				 let requestNo = $(this).closest("tr").find(".stock_requestNo").text();
			     let type = $(this).closest("tr").find(".stock_type").text().toUpperCase();
				 let itemCode = $(this).closest("tr").find(".stock_itemCode").text().toUpperCase();
			     let itemName = $(this).closest("tr").find(".stock_itemName").text().toUpperCase();
			     let drawingNo = $(this).closest("tr").find(".stock_drawingNo").text() === "-" ? "" : $(this).closest("tr").find(".stock_drawingNo").text().toUpperCase();
				 let detailDrawingNo = $(this).closest("tr").find(".stock_detailDrawingNo").text();
			     let basicQuantity = $(this).closest("tr").find(".stock_basicQuantity").text();
			     let location = $(this).closest("tr").find(".stock_location").text().toUpperCase();
			     let requesterDept = $(this).closest("tr").find(".stock_requesterDept").text();
			     let requesterName = $(this).closest("tr").find(".stock_requesterName").text();
				
				stockRequestData.push({
					no: requestNo,
					type: type, 
					itemCode: itemCode,
					itemName: itemName, 
					drawingNo: drawingNo, 
					detailDrawingNo: detailDrawingNo,
					basicQuantity: basicQuantity,
					location: location, 
					requesterDept: requesterDept, 
					requesterName: requesterName
				});
			}else{
				alert("이미 승인된 요청 건이 체크 되어있습니다. 확인 바랍니다.");
				isApproval = false;
				return false;
			} //if-approval
     
        };//if
    });//each
	
	if(isApproval){
		$.ajax({
			url: "/request/stock/approval/" + approvalUser,
			type: "PUT",
			contentType: "application/json",
			data: JSON.stringify(stockRequestData),
			success: function(response){
				alert(response);
				location.reload();
			},
			error: function(xhr){
				alert(xhr.responseText);
				
				return false;
			}
		});
	}
	
			
});

//위치변경승인하기
$(document).on("click", "#location_approval", function(){
	let locationRequestInfo = [];
	let approvalUser = userName;
	
	$(".locationTbl_check").each(function(){
		if ($(this).prop("checked")){
			let requestNo = $(this).closest("tr").find(".location_requestNo").text();
			let itemId = $(this).closest("tr").find(".location_itemid").text();
			let requestLocation = $(this).closest("tr").find(".location_modiLocaion").text();
			
			locationRequestInfo.push({
				no: requestNo,
				itemId: itemId, 
				modiLocation: requestLocation
			});
		}//if
	});//each
	
	$.ajax({
		url: "/request/location/approval/" + approvalUser,
		type: "PUT",
		contentType: "application/json",
		data: JSON.stringify(locationRequestInfo),
		success: function(response){
			alert(response);
			location.reload();
		},
		error: function(xhr){
			alert(xhr.responseText);
		}
	});
})

//미승인건 있을경우 new 달아주기
function newBadge(type){
	let badgeId = "#" + type;
	if($(badgeId + " .new-badge").length === 0){
		let newBadge = "<span class='new-badge'>N</span>";
		$(badgeId).append(newBadge);
	}
	
}