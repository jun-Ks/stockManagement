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
	
	if(userDept === "구매팀" || userDept === "ERP팀" || userDept === "생산관리부"){
		$.ajax({
			url: "/request/unapproval/count",
			type: "GET",
			contentType: "application/json",
			success: function(response){
				let cnt_stockRequest = response["입고 요청"];
				let cnt_modiLocaRequest = response["위치 변경"];
				let cnt_purchaseRequest = response["구매 요청"];

				if(cnt_stockRequest > 0 || cnt_modiLocaRequest > 0 || cnt_purchaseRequest > 0){
					newBadge("requestListPage");
				}
				if(cnt_stockRequest > 0){
					newBadge("stock");
				}
				if(cnt_modiLocaRequest > 0){
					newBadge("location");
				}
				if(cnt_purchaseRequest > 0){
					newBadge("purchase")
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
		}else if($(this).attr("id") === "location"){
	        getRequestStockList(userId, userDept);
		}else if($(this).attr("id") === "purchase"){
			getPurchaseItemList(0, userDept);
		}

    } else if($(this).attr("id") === "location"){
        $(".location").addClass("active");    // 'location' 탭 클릭 시 위치 변경 요청 테이블을 활성화
		
		if(isUnApproval){
			unApprovalModiLocationRequestList();
		}else{
	        getRequestModiLocationList(userId, userDept);
		}

    }else if($(this).attr("id") === "purchase"){
		$(".purchase").addClass("active");    // 'location' 탭 클릭 시 위치 변경 요청 테이블을 활성화
		
		if(isUnApproval){
			getPurchaseItemList(0, userDept);
		}else{
	        getPurchaseItemList(1, userDept);
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

//구매 요청 리스트
function getPurchaseItemList(approval, userDept){
	
	$.ajax({
		url: "/request/purchase/list/approval/" + approval,
		type: "GET",
		success: function(response){
			let list = response;
			makePurchaseItemList(list, userDept);
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
			((userDept === "구매팀" || userDept === "ERP팀" || userDept === "생산관리부") ? "<th class='stock-th-check'>선택</th>" : "") + 
			"<th id='th_no'>no</th>" +
			"<th id='th_itemCode'>품목코드</th>" +
			"<th id='th_drawingNo'>도면번호</th>" +
			"<th id='th_detailDrawingNo'>세부규격</th>" + 
			"<th id='th_type'>타입</th>" +
			"<th id='th_itemName'>품목명</th>" +
			"<th id='th_basicQuantity'>수량</th>" +
			"<th id='th_location'>위치</th>" +
			//"<th id='th_note'>비고</th>" + 
			"<th id='th_requesterDept'>요청자 부서</th>" +
			"<th id='th_requesterName'>요청자 성명</th>" +
			"<th id='th_requesterDate'>요청날짜</th>" +
			"<th id='th_approval'>승인여부</th>" +
		"</tr>";
	$(".requestStockList thead").html(thead);

	let tbody = "";
	if(list.length > 0){
		for(let i = 0; i < list.length; i++){
			tbody += 
				"<tr>" + 
					((userDept === "구매팀" || userDept === "ERP팀" || userDept === "생산관리부") ? "<td><input type='checkbox' class='stockTbl_check'></td>" : "") +
					"<td class='stock_requestNo'>" + list[i].no + "</td>" +
					"<td class='stock_itemCode'>" + list[i].itemCode + "</td>" + 
					"<td class='stock_drawingNo'>" + (list[i].drawingNo === null ? "-" : list[i].drawingNo) + "</td>" +
					"<td class='stock_detailDrawingNo'>" + (list[i].detailDrawingNo === null ? "-" : list[i].drawingNo) + "</td>" +
					"<td class='stock_type'>" + list[i].type + "</td>" +
					"<td class='stock_itemName'>" + list[i].itemName + "</td>" +
					"<td class='stock_basicQuantity'>" + list[i].basicQuantity + "</td>" +
					"<td class='stock_location'>" + (list[i].location === null ? "-" : list[i].location) + "</td>" +
					//"<td class='stock_note'>" + list[i].note + "</td>" + 
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
				<td colspan='14'>요청 데이터가 없습니다. </td>
			</tr>
			`;
	}
	
	$(".requestStockList tbody").html(tbody);
	
	if(userDept === "구매팀" || userDept === "ERP팀" || userDept === "생산관리부"){
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
			((userDept === "구매팀" || userDept === "ERP팀" || userDept === "생산관리부") ? "<th class='location-th-check'>선택</th>" : "") + 
			"<th id='th_location_no'>no</th>" +
			"<th id='th_location_itemNo'>품목no</th>" +
			"<th id='th_location_itemCode'>품목코드</th>" + 
			"<th id='th_location_drawingNo'>도면번호</th>" +
			"<th id='th_location_type'>타입</th>" + 
			"<th id='th_location_itemName'>품목명</th>" +
			//"<th id='th_note'>비고</th>" + 
			"<th id='th_location_location'>위치</th>" +
			"<th id='th_location_modiLocation'>변경<br>위치</th>" + 
			"<th id='th_location_quantity'>수량</th>" + 
			"<th id='th_location_modiQuantity'>변경<br>수량</th>" + 
			"<th id='th_location_requesterDept'>요청자 부서</th>" +
			"<th id='th_location_requesterName'>요청자 성명</th>" +
			"<th id='th_location_requesterDate'>요청날짜</th>" +
			"<th id='th_location_approval'>승인여부</th>" +
		"</tr>";
	$(".requestModiLocationList thead").html(thead);

	let tbody = "";
	
	if(list.length > 0){
		for(let i = 0; i < list.length; i++){
			tbody += 
				"<tr>" +
					((userDept === "구매팀" || userDept === "ERP팀" || userDept === "생산관리부") ? "<td><input type='checkbox' class='locationTbl_check'></td>" : "") +
					"<td class='location_requestNo'>" + list[i].no + "</td>" +
					"<td class='location_itemCode'>" + (list[i].itemCode === "" ? "-" : list[i].itemCode) + "</td>" + 
					"<td class='location_itemid'>" + list[i].itemId + "</td>" + 
					"<td class='location_drawingNo'>" + list[i].drawingNo + "</td>" +
					"<td class='location_itemType'>" + list[i].type + "</td>" +
					"<td class='location_itemName'>" + list[i].itemName + "</td>" +
					//"<td class='location_note'>" + list[i].note + "</td>" + 
					"<td class='td_location'>" + list[i].location + "</td>" +
					"<td class='location_modiLocation'>" + (list[i].modiLocation === "NULL-NULL-NULL" ? "-" : list[i].modiLocation) + "</td>" +
					"<td class='hidden_location_modiLocation' style='display:none'>" + 
						(list[i].modiLocation === "NULL-NULL-NULL" ? "-" : list[i].modiLocation) + 
					"</td>" +
					"<td class='location_quantity'>" + list[i].quantity + "</td>" +
					"<td class='hidden_location_modiQuantity' style='display:none'>" + 
						(list[i].modiQuantity === 0 ? "-" : list[i].modiQuantity) + 
					"</td>" +
					"<td class='location_modiQuantity'>" + 
						(list[i].modiQuantity === 0 ? "-" : list[i].modiQuantity) + 
					"</td>" +
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
			<td colspan='14'>요청 데이터가 없습니다.</td>
		</tr>
		`;
	}

	$(".requestModiLocationList tbody").html(tbody);
	
	if(userDept === "구매팀" || userDept === "ERP팀" || userDept === "생산관리부"){
		$(".location_approval").each(function(){
			if($(this).text() === "미승인"){
				let tfoot = 
					"<tr>" + 
						"<td colspan='14'><button id='location_approval'>변경 승인하기</button></td>" +
					"</tr>";
					
				$(".requestModiLocationList tfoot").html(tfoot);
				return false;
			}//if
		})//each

	}//userDept if

	$(".td_location").each(function(){
		const td_location_text = $(this).closest("tr").find(".td_location").text();
		const td_modi_location_text = $(this).closest("tr").find(".location_modiLocation").text();
		
		const td_td_location = $(this).closest("tr").find(".td_location");
		const td_modi_location = $(this).closest("tr").find(".location_modiLocation");

		if((td_location_text !== td_modi_location_text) && (td_modi_location_text !== "-")){
			//td_modi_location.css("background-color", "rgb(183, 205, 236)");
			
			td_modi_location.css("box-shadow", "inset 0 5px 0 #FFB6C1, inset 0 -5px 0 #FFB6C1, inset -5px 0 0 #FFB6C1");
			td_td_location.css("box-shadow", "inset 0 5px 0 #FFB6C1, inset 0 -5px 0 #FFB6C1, inset 5px 0 0 #FFB6C1");
		}
		
		const td_quantity_text = $(this).closest("tr").find(".location_quantity").text();
		const modi_quantity_text = $(this).closest("tr").find(".location_modiQuantity").text();

		const td_quantity = $(this).closest("tr").find(".location_quantity");
		const td_modi_quantity = $(this).closest("tr").find(".location_modiQuantity");
		
		if((td_quantity_text !== modi_quantity_text) && (modi_quantity_text !== "-")){

			td_modi_quantity.css("box-shadow", "inset 0 5px 0 #FFB6C1, inset 0 -5px 0 #FFB6C1, inset -5px 0 0 #FFB6C1");
			td_quantity.css("box-shadow", "inset 0 5px 0 #FFB6C1, inset 0 -5px 0 #FFB6C1, inset 5px 0 0 #FFB6C1");
		}
		
	});
}

//구매요청테이블 만들기
function makePurchaseItemList(list, userDept){
	$(".requestPurchaseList").show()
	let thead = 
		"<tr>" + 
			((userDept === "구매팀" || userDept === "ERP팀" || userDept === "생산관리부") ? "<th class='purchase-th-check'>선택</th>" : "") + 
			"<th id='th_no'>no</th>" +
			//"<th id='th_itemId'>품목no</th>"+
			"<th id='th_itemCode'>품목코드</th>" +
			"<th id='th_drawingNo'>도면번호</th>" +
			"<th id='th_detailDrawingNo'>세부규격</th>" + 
			"<th id='th_type'>타입</th>" +
			"<th id='th_itemName'>품목명</th>" +
			"<th id='th_location'>위치</th>" +
			"<th id='th_basicQuantity'>현 수량</th>" +
			"<th id='th_requestQuantity'>요청수량</th>" + 
			//"<th id='th_note'>비고</th>" + 
			"<th id='th_requesterDept'>요청자 부서</th>" +
			"<th id='th_requesterName'>요청자 성명</th>" +
			"<th id='th_requesterDate'>요청날짜</th>" +
			"<th id='th_approval'>승인여부</th>" +
		"</tr>";
	$(".requestPurchaseList thead").html(thead);

	let tbody = "";
	if(list.length > 0){
		for(let i = 0; i < list.length; i++){
			tbody += 
				"<tr>" + 
					((userDept === "구매팀" || userDept === "ERP팀" || userDept === "생산관리부") ? "<td><input type='checkbox' class='purchaseTbl_check'></td>" : "") +
					"<td class='purchase_requestNo'>" + list[i].no + "</td>" +
					"<td class='purchase_itemId' style='display: none'>" + list[i].itemId + "</td>" + 
					"<td class='purchase_itemCode'>" + list[i].itemCode + "</td>" + 
					"<td class='purchase_drawingNo'>" + (list[i].drawingNo === null ? "-" : list[i].drawingNo) + "</td>" +
					"<td class='purchase_detailDrawingNo'>" + (list[i].detailDrawingNo === null ? "-" : list[i].drawingNo) + "</td>" +
					"<td class='purchase_type'>" + list[i].type + "</td>" +
					"<td class='purchase_itemName'>" + list[i].itemName + "</td>" +
					"<td class='purchase_location'>" + (list[i].location === null ? "-" : list[i].location) + "</td>" +
					"<td class='purchase_basicQuantity'>" + list[i].quantity + "</td>" +
					"<td class='hidden_purchase_requestQuantity' style='display: none'>" + list[i].requestQuantity + "</td>" +
					"<td class='purchase_requestQuantity'>" + list[i].requestQuantity + "</td>" +
					//"<td class='stock_note'>" + list[i].note + "</td>" + 
					"<td class='purchase_requesterDept'>" + list[i].requesterDept + "</td>" +
					"<td class='purchase_requesterName'>" + list[i].requesterName + "</td>" +
					"<td>" + list[i].insertDate.replace("T", " ") + "</td>" +
					"<td class='purchase_approval'>" + (list[i].approval === 0 ? "미승인" : "완료") + "</td>" +
				"</tr>";
		}
	}else{
		tbody = 
			`
			<tr>
				<td colspan='14'>요청 데이터가 없습니다. </td>
			</tr>
			`;
	}
	
	$(".requestPurchaseList tbody").html(tbody);
	
	if(userDept === "구매팀" || userDept === "ERP팀" || userDept === "생산관리부"){
		$(".purchase_approval").each(function(){
			if($(this).text() === "미승인"){
				let tfoot = 
					"<tr>" + 
						"<td colspan='14'><button id='purchase_approval'>입고 승인하기</button></td>" +
					"</tr>";
						
				$(".requestPurchaseList tfoot").html(tfoot);
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

$(document).on("click", ".purchase-th-check", function() {
	const isAllChecked = $(".purchaseTbl_check").length === $(".purchaseTbl_check:checked").length;
	$(".purchaseTbl_check").prop("checked", !isAllChecked);  // 체크 or 해제 둘 다 처리
});


//미승인건만 보기 체크 시 미승인 건 들만 보여줌
$("#unApproval").on("change", function(){
	if($(this).prop("checked")){
		
		unApprovalStockRequestList();
		
		unApprovalModiLocationRequestList();

		getPurchaseItemList(0, userDept);

	}else{
		getRequestStockList(userId, userDept);
		getRequestModiLocationList(userId, userDept);
		getPurchaseItemList(1, userDept)
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

//변경요청승인하기
$(document).on("click", "#location_approval", function(){
	let locationRequestInfo = [];
	let approvalUser = userName;
	
	$(".locationTbl_check").each(function(){

		let td_location = $(this).closest("tr").find(".td_location").text();
		let modi_location = $(this).closest("tr").find(".location_modiLocation").text();

		let td_quantity = $(this).closest("tr").find(".location_quantity").text();
		let modi_quantity = $(this).closest("tr").find(".location_modiQuantity").text();
		if ($(this).prop("checked")){
			let requestNo = $(this).closest("tr").find(".location_requestNo").text();
			let itemId = $(this).closest("tr").find(".location_itemid").text();
			let requestLocation = modi_location === "-" ? td_location : modi_location;
			let requestQuantity = modi_quantity === "-" ? td_quantity : modi_quantity;

			locationRequestInfo.push({
				no: requestNo,
				itemId: itemId, 
				modiLocation: requestLocation,
				modiQuantity: requestQuantity
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

//구매요청 승인하기
$(document).on("click", "#purchase_approval", function(){
	let purchaseRequestData = [];
	let isApproval = true;
	let approvalUser = userName;

	$(".purchaseTbl_check").each(function(){
		if($(this).prop("checked")){
			let approval = $(this).closest("tr").find(".purchase_approval").text();

			if(approval === "미승인"){
				let itemId = $(this).closest("tr").find(".purchase_itemId").text();
				let requestListId = $(this).closest("tr").find(".purchase_requestNo").text();
				let requestQuantity = $(this).closest("tr").find(".purchase_requestQuantity").text();
				purchaseRequestData.push({
					approvalUser: approvalUser,
					itemId: itemId,
					requestListId: requestListId,
					requestQuantity: requestQuantity
				});
			}else{
				alert("이미 승인된 요청 건이 체크 되어있습니다. 확인 바랍니다.");
				isApproval = false;
				return false;
			}
		}

		
	})

	
	if(isApproval){
		$.ajax({
			url: "/request/purchase/approval/",
			type: "PUT",
			contentType: "application/json",
			data: JSON.stringify(purchaseRequestData),
			success: function(response){
				alert(response);
				location.reload();
			},
			error: function(xhr){
				alert(xhr.responseText);
				
				return false;
			}
		});
	//console.log(itemIds); // 확인용
	}
})


// 변경 수량 td 클릭 시 input + 버튼 삽입
$(document).on("click", ".location_modiQuantity", function() {
	let hidden_text = $(this).closest("tr").find(".hidden_location_modiQuantity").text();
	let td_modi_quantity = 
		"<input type='text' class='input_modi_quantity' oninput='validateInput(this)' value='" + hidden_text + "'>" +
		"<button class='td_modi_QuantityBtn'><i class='fa-solid fa-check'></i></button>" + 
		"<button class='td_modi_QuantityCancelBtn'><i class='fa-solid fa-xmark'></i></button>";

	$(this).removeClass("location_modiQuantity"); // 클래스 제거
	$(this).addClass("modiQuantityMode");
	$(this).html(td_modi_quantity); // 버튼 삽입
});

// 수량 - 취소 버튼 클릭 시 원래 텍스트로 복원
$(document).on("click", ".td_modi_QuantityCancelBtn", function() {
	let td = $(this).closest("td");
	let originalText = td.closest("tr").find(".hidden_location_modiQuantity").text();

	td
		.removeClass()
		.addClass("location_modiQuantity")
		.text(originalText);
});



// 수량 - 수정 버튼 클릭 시 DB에 반영
$(document).on("click", ".td_modi_QuantityBtn", function() {
	let tr = $(this).closest("tr");
	if(tr.find(".input_modi_quantity").val() === tr.find(".location_quantity").text()){
		alert("기존 수량과 같습니다. 다시 확인해주세요.");
		return false;
	};

	let modiData = tr.find(".input_modi_quantity").val();

	let type = "a";
	let requestId = tr.find(".location_requestNo").text();

	$.ajax({
		url: "/request/list/type/" + type + "/id/" + requestId,
		type: "PUT",
		contentType: "application/json",
		data: JSON.stringify(modiData),
		success: function(response){
			if(response > 0){
				alert("수정성공");
			}
			let td = tr.find(".modiQuantityMode");
			td.removeClass().addClass("location_modiQuantity").text(response)
		},
		error: function(xhr){
			alert(xhr.responseText);
			
			return false;
		}
	});
});

//구매요청 - 구매요청 수량 변경
$(document).on("click", ".purchase_requestQuantity", function(){
	let hidden_text = $(this).closest("tr").find(".hidden_purchase_requestQuantity").text();
	let td_modi_quantity = 
		"<input type='text' class='input_purchase_quantity' oninput='validateInput(this)' value='" + hidden_text + "'>" +
		"<button class='td_purchase_QuantityBtn'><i class='fa-solid fa-check'></i></button>" + 
		"<button class='td_purchase_QuantityCancelBtn'><i class='fa-solid fa-xmark'></i></button>";

	$(this).removeClass("purchase_requestQuantity"); // 클래스 제거
	$(this).addClass("purchase_modiQuantityMode");
	$(this).html(td_modi_quantity); // 버튼 삽입

})

//구매요청 - 취소버튼 클릭시 원래 텍스트로 복원
$(document).on("click", ".td_purchase_QuantityCancelBtn", function() {
	let td = $(this).closest("td");
	let originalText = $(this).closest("tr").find(".hidden_purchase_requestQuantity").text();

	td
		.removeClass()
		.addClass("purchase_requestQuantity")
		.text(originalText);
});

//숫자만 입력하기
function validateInput(input) {
    // 현재 입력된 값
    const value = input.value;

    // 정규식: 숫자만 허용
    if (!/^\d*$/.test(value)) {
        input.value = value.replace(/[^\d]/g, '');
        return;
    }

    // 0만 입력된 경우 비우기
    if (value === "0") {
        input.value = "";
        return;
    }
}

//변경 위치 td 클릭 시 select 버튼 삽입
$(document).on("click", ".location_modiLocation", function () {
	let td = $(this);
	
	// 이미 select가 존재하면 재삽입하지 않음
	if (td.find('select').length > 0) return;

	let tr = td.closest("tr");
	let hidden_location = tr.find(".hidden_location_modiLocation").text();
	let location_parts = hidden_location.split("-");

	let td_rackName = location_parts[0];
	let td_rackNumber = location_parts[1];
	let td_rackStage = location_parts[2];

	let td_modi_location = `
		<select class="modalRackName" name="rackName"></select>-
		<select class="modalRackNumber" name="rackNumber"></select>-
		<select class="modalRackStage" name="rackStage"></select>
		<button class="td_modi_locationBtn"><i class="fa-solid fa-check"></i></button>
		<button class="td_modi_locationCancelBtn"><i class="fa-solid fa-xmark"></i></button>
		
	`;

	$(this).removeClass("location_modiLocation"); 
	$(this).addClass("modiLocationMode");
	$(this).html(td_modi_location)

	makeLocationSelect(td_rackName, td_rackNumber, td_rackStage, td);
	
});


//위치 셀렉트박스 함수
function makeLocationSelect(td_rackName, td_rackNumber, td_rackStage, container) {
	const rackNames = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n'];
	const rackNumberMap = {
		a: 14, b: 12, c: 12, d: 12, e: 12, f: 12,
		g: 13, h: 12, i: 12, j: 12, k: 4,
		l: 6, m: 6, n: 2
	};

	let $rackName = container.find('.modalRackName');
	let $rackNumber = container.find('.modalRackNumber');
	let $rackStage = container.find('.modalRackStage');

	const validRackName = td_rackName && td_rackName.trim() !== "" ? td_rackName : "NULL";
	const displayRackName = td_rackName && td_rackName.trim() !== "" ? td_rackName : "선택";

	// rackName 초기화
	$rackName.empty().append(`<option value="${validRackName}">${displayRackName}</option>`);
	if (validRackName !== "NULL") {
		$rackName.append(`<option value="NULL">선택</option>`);
	}
	$.each(rackNames, function(_, name) {
		$rackName.append(`<option value="${name}">${name.toUpperCase()}</option>`);
	});

	// rackNumber 초기화
	$rackNumber.empty();
	if (td_rackNumber && td_rackNumber.trim() !== "") {
		$rackNumber.append(`<option value="${td_rackNumber}">${td_rackNumber}</option>`);
	} else {
		$rackNumber.append(`<option value="NULL">선택</option>`);
	}

	// ✅ rackStage 초기화 (undefined 방지)
	$rackStage.empty();
	if (td_rackStage && td_rackStage.trim() !== "") {
		$rackStage.append(`<option value="${td_rackStage}">${td_rackStage}</option>`);
	} else {
		$rackStage.append(`<option value="NULL">선택</option>`);
	}

	// rackName change 이벤트
	$rackName.off('change').on('change', function () {
		const selectedRack = $(this).val();
		$rackNumber.empty().append('<option value="NULL">선택</option>');
		$rackStage.empty().append('<option value="NULL">선택</option>');

		if (selectedRack === 'NULL') return;

		const maxNumber = rackNumberMap[selectedRack] || 0;
		for (let i = 1; i <= maxNumber; i++) {
			let padded = String(i).padStart(2, '0');
			$rackNumber.append(`<option value="${padded}">${padded}</option>`);
		}
	});

	// rackNumber change 이벤트
	$rackNumber.off('change').on('change', function () {
		const selectedRack = $rackName.val();
		const selectedNumber = $(this).val();

		$rackStage.empty().append('<option value="NULL">선택</option>');
		if (selectedRack === 'NULL' || selectedNumber === 'NULL') return;

		let floors = ['1F', '2F', '3F'];
		if (['k', 'l', 'm', 'n'].includes(selectedRack)) {
			floors = ['1F', '2F', '3F', '4F', '5F'];
		}

		$.each(floors, function (_, floor) {
			$rackStage.append(`<option value="${floor}">${floor}</option>`);
		});
	});
}



//미승인건 있을경우 new 달아주기
function newBadge(type){
	let badgeId = "#" + type;
	if($(badgeId + " .new-badge").length === 0){
		let newBadge = "<span class='new-badge'>N</span>";
		$(badgeId).append(newBadge);
	}
	
}

// 변경 위치 x 버튼 시 원래로 돌려주기
$(document).on("click", ".td_modi_locationCancelBtn", function() {
    let td = $(this).closest("td");
    let originalText = td.closest("tr").find(".hidden_location_modiLocation").text();

    td.removeClass().addClass("location_modiLocation").text(originalText);
});

//변경 위치 승인하기
$(document).on("click", ".td_modi_locationBtn", function(){
	let tr = $(this).closest("tr");

	let input_rackName = tr.find(".modalRackName").val().toUpperCase();
	let input_rackNumber = tr.find(".modalRackNumber").val().toUpperCase();
	let input_rackStage = tr.find(".modalRackStage").val().toUpperCase();

	let input_location = input_rackName + "-" + input_rackNumber + "-" + input_rackStage;

	let savedLocation = tr.find(".td_location").text();

	//유효성 검사
	if(input_location === savedLocation){
		alert("기존 위치와 같습니다. 다시 확인해주세요.")
		return false;
	}

	let isFilledRack = input_rackName === "NULL" || input_rackNumber === "NULL" || input_rackStage === "NULL";

	if(isFilledRack){
		alert("수정 할 위치가 선택되지 않았습니다. 확인해주세요.");
		return false;
	}

	let modiData = input_location;

	let type = "b";
	let requestId = tr.find(".location_requestNo").text();

	$.ajax({
		url: "/request/list/type/" + type + "/id/" + requestId,
		type: "PUT",
		contentType: "application/json",
		data: JSON.stringify(modiData),
		success: function(response){
			alert("수정성공");
			let td = tr.find(".modiLocationMode");
			td.removeClass().addClass("location_modiLocation").text(response)
		},
		error: function(xhr){
			alert(xhr.responseText);
			
			return false;
		}
	});
});


//구매요청 - 수량 수정
$(document).on("click", ".td_purchase_QuantityBtn", function(){
	let tr = $(this).closest("tr");
	let input_quantity = tr.find(".input_purchase_quantity").val();
	let savedQuantity = tr.find(".hidden_purchase_requestQuantity").text();

	//유효성 검사
	if(input_quantity === savedQuantity){
		alert("기존 등록된 요청 수량과 같습니다. 다시 확인해주세요.")
		return false;
	}

	let isFilledQuantity = input_quantity === "";

	if(isFilledQuantity){
		alert("수량 입력되지 않았습니다. 확인해주세요.");
		return false;
	}
	let requestId = tr.find(".purchase_requestNo").text();

	//let modiData = {requestQuantity : input_quantity};

	$.ajax({
		url: "/request/purchase/list/id/" + requestId,
		type: "PUT",
		contentType: "application/json",
		data: JSON.stringify(input_quantity),
		success: function(response){
			alert("수정성공");
			let td = tr.find(".purchase_modiQuantityMode");
			td.removeClass().addClass("purchase_requestQuantity").text(response)
		},
		error: function(xhr){
			alert(xhr.responseText);
			
			return false;
		}
	});
})