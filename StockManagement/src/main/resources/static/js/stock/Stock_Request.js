$(document).ready(function() {
	$("#stockDataRequestBox").hide();
	$(".purchaseRequestList").hide();
	const rackNames = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n'];
	const rackNumberMap = {
		a: 14,
		b: 12, c: 12, d: 12, e: 12, f: 12,
		g: 13,
		h: 12, i: 12, j: 12,
		k: 4,
		l: 6, m: 6,
		n: 2
	};

	// rackName 초기 옵션 추가
	$('#rackName').append('<option value="NULL">A~N 선택해주세요.</option>');

	// rackName에 A~N 옵션 추가
	$.each(rackNames, function(index, name) {
		$('#rackName').append(`<option value="${name}">${name.toUpperCase()}</option>`);
	});

	// rackName 선택 시 rackNumber 설정
	$('#rackName').on('change', function() {
		const selectedRack = $(this).val();
		$('#rackNumber').empty().append('<option value="NULL">선택</option>');
		$('#rackStage').empty().append('<option value="NULL">선택</option>');

		if (selectedRack === 'NULL') return;

		const maxNumber = rackNumberMap[selectedRack] || 0;

		for (let i = 1; i <= maxNumber; i++) {
			const padded = String(i).padStart(2, '0');
			$('#rackNumber').append(`<option value="${padded}">${padded}</option>`);
		}
	});

	// rackNumber 선택 시 rackStage 설정
	$('#rackNumber').on('change', function() {
		const selectedRack = $('#rackName').val();
		const selectedNumber = $(this).val();

		$('#rackStage').empty().append('<option value="NULL">선택</option>');

		if (selectedRack === 'NULL' || selectedNumber === 'NULL') return;

		let floors = [];
		if (['a','b','c','d','e','f','g','h','i','j'].includes(selectedRack)) {
			floors = ['1F', '2F', '3F'];
		} else if (['k','l','m','n'].includes(selectedRack)) {
			floors = ['1F', '2F', '3F', '4F', '5F'];
		}

		$.each(floors, function(index, floor) {
			$('#rackStage').append(`<option value="${floor}">${floor}</option>`);
		});
	});
});


$("#requestBtn").on("click", function(){
	//입고정보 가져오기
	let itemCode = $("#itemCode").val().toUpperCase();
	let type = $("#type").val().toUpperCase();
	let itemName = $("#itemName").val().toUpperCase();
	let drawingNo = $("#drawingNo").val().toUpperCase();
	let detailDrawingNo = $("#detailDrawingNo").val().toUpperCase();
	let basicQuantity = parseInt($("#basicQuantity").val());
	let location = $("#rackName").val() + "-" + $("#rackNumber").val() + "-" + $("#rackStage").val();
	let note = $("#note").val();
	let requesterId = $("#userId").text().toUpperCase();
	
	//입고정보 유효성검사 - 품목명 미입력 경고
	if(itemName === ""){
		alert("품목명이 입력되지 않았습니다. 확인해주세요");
		
		return false;
	}
	
	
	//입고정보 모으기
	let request_info = {
		itemCode: itemCode,
	    requesterId: requesterId,
	    type: type, 
	    itemName: itemName, 
	    drawingNo: drawingNo,
		detailDrawingNo: detailDrawingNo,
	    basicQuantity: basicQuantity,
		note: note,
	    location: location.toUpperCase()
	};
	
	//입고 정보들 백엔드로 넘기기
	$.ajax({
		url: "/stock/request/info",
		type: "POST",
		contentType: "application/json",
		data: JSON.stringify(request_info),
		success: function(response){
			alert(response)
			window.location.replace("/stock/request/list");
		},
		error: function(xhr){
			alert(xhr.responseText);
			
		}
	});	
});

$("#basicQuantity").on("input", function () {
    let value = $(this).val();

    // 숫자가 아닌 문자 제거, 음수 방지, 소수점 방지
    value = value.replace(/[^0-9]/g, ""); 
    
    $(this).val(value);
});

//option 선택 시 active 클래스 추가
$(document).on("click", ".option", function(){

    $(".option").removeClass("active");
    $(this).addClass("active");

    if($(this).attr("id") === "purchaseRequestBtn"){
		
        $("#stock-purchaseRequestBtn").addClass("active");     

		$("#stockDataRequestBox").hide();
		$("#purchaseRequestBox").show();
		
    } else if($(this).attr("id") === "stockDataInsertRequestBtn"){
		
        $("#stockDataInsertRequestBtn").addClass("active");

		$("#stockDataRequestBox").show();
		$("#purchaseRequestBox").hide();
    }
});

// 모달 열기
$("#searchItemBtn").on("click", function () {
  $("#itemSearchModal").addClass("active");
});

// 모달 닫기
$(".modal-close").on("click", function () {
  $("#itemSearchModal").removeClass("active");
});

// 모달 외부 클릭 시 닫기
$(window).on("click", function (e) {
  if ($(e.target).is("#itemSearchModal")) {
    $("#itemSearchModal").removeClass("active");
  }
});


//검색 모달창
$("#modal-search").on("click", function(){
	let searchOption = $("#search-option").val();
	let searchKeyword = $("#searchKeyword").val().toUpperCase();

	$.ajax({
		url: "/stock/item",
		type: "POST",
		data:{
			searchOption: searchOption,
			searchKeyword: searchKeyword
		},
		success: function(response){
			let info = response;
			
			let thead = 
				"<tr>" + 
					"<th id='th_no'>no</th>" + 
					"<th id='th_itemCode'>품목코드</th>" + 
					"<th id='th_drawingNo'>도면번호</th>" +
					//"<th id='th_detailDrawingNo'>세부규격</th>" + 
					//"<th id='th_type'>타입</th>" + 
					"<th id='th_itemName'>품명</th>" + 
					//"<th id='th_status'>제품상태</th>" + 
					"<th id='th_quantity'>수량</th>" + 
					"<th id='th_location'>위치</th>" +
					//"<th id='th_note'>비고</th>" + 
					"<th id='th_putCart'>추가</th>"
				"</tr>";
			$(".infoTable thead").html(thead);	
					
			if(info.length === 0){
				let emptyTbody = 
					"<tr>" + 
						"<td colspan='7'>검색결과가 없습니다.</td>" +
					"</tr>";
					
				$(".infoTable tbody").html(emptyTbody);
				
				return;
			}
			
			let tbody = "";
			for(let i = 0; i < info.length; i++){
				
				tbody +=
					"<tr>" +
						"<td class='td_no'>" + info[i].no + "</td>" +  
						"<td class='td_itemCode'>" + info[i].itemCode + "</td>" +  
						"<td class='td_drawingNo'>" + info[i].drawingNo + "</td>" + 
						//"<td class='td_detailDrwingNo'>" + info[i].detailDrawingNo + "</td>" + 
						//"<td class='td_type'>" + info[i].type + "</td>" +  
						"<td class='td_itemName'>" + info[i].itemName + "</td>" +  
						//"<td class='td_status'>" + info[i].status + "</td>" + 
						"<td class='td_quantity'>" + info[i].calculatedQuantity + "</td>" +  
						"<td class='td_location'>" + info[i].location + "</td>" +
						//"<td class='td_note'>" + info[i].note + "</td>" + 
						"<td class='putCart'> + </td>" + 
					"</tr>";						
			}
			$(".infoTable tbody").html(tbody);
		},
		error: function(xhr){
			alert(xhr.responseText);
			
			return false;
		}
	});
})

//품목추가 검색 창에서 추가 버튼 클릭 하면 장바구니 테이블로 이동
$(document).on("click", ".putCart", function(){
	$(".purchaseRequestList").show();
	let tr = $(this).closest("tr");

	tr.css("background-color", "lightgray");
	let td_no = tr.find(".td_no").text();
	let td_itemCode = tr.find(".td_itemCode").text();
	let td_drawingNo = tr.find(".td_drawingNo").text();
	let td_itemName = tr.find(".td_itemName").text();
	let td_quantity = tr.find(".td_quantity").text();
	let td_location = tr.find(".td_location").text();


	let tbody = 
		"<tr>" +
			"<td class='cart_no'>" + td_no + "</td>" + 
			"<td class='cart_itemCode'>" + td_itemCode + "</td>" +
			"<td class='cart_drawingNo'>" + td_drawingNo + "</td>" +
			"<td class='cart_itemName'>" + td_itemName + "</td>" +
			"<td class='cart_location'>" + td_location + "</td>" +
			"<td class='cart_quantity'>" + td_quantity + "</td>" +
			"<td class='cart_requestQty'><input type='text' class='cart_input_qty'></td>" + 
			"<td class='cart_del'>❌</td>" + 
		"</tr>";

	$(".requestListTbl tbody").append(tbody)
});

//cart에서 x버튼누르면 삭제
$(document).on("click", ".cart_del", function(){
	let tr = $(this).closest("tr");
	tr.remove();

	if($(".cart_no").length === 0){
		$(".purchaseRequestList").hide();
	}
})

//수량 추가 요청 건 전송
$("#sendRequestBtn").on("click", function(){

	if($(".cart_no").length === 0){
		alert("요청 할 항목이 없습니다.")
		return false;
	}
	let data =[];
	$(".cart_no").each(function(list, index){
		let requesterId = $("#userId").text();
		let requesterDept = $("#userDept").text();
		let requesterName = $("#userName").text();
	
		let cart_no = $(this).text();
		let cart_requestQty = $(this).closest("tr").find(".cart_input_qty").val();
		

		data = [{
			requesterId: requesterId,
			requesterDept: requesterDept,
			requesterName: requesterName,
			no: cart_no,
			requestQuantity: cart_requestQty
		}];
	})
	$.ajax({
		url: "/stock/request/qty",
		type: "POST",
		data: JSON.stringify(data),
		contentType: "application/json",
		success: function(response){
			alert(response);
			window.location.replace("/stock/request/list");
		},
		error: function(xhr){
			
			return false;
		}
	});
})

$(document).on("input", ".cart_input_qty", function(){
    let val = $(this).val().replace(/[^0-9]/g, "");

    // 0 하나만 입력된 경우 제거
    if (val === "0") {
        val = "";
    }

    $(this).val(val);
});
