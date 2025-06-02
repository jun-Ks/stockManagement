$(document).ready(function(){
	searchItemInfo();
});
//품목검색 함수
function searchItemInfo(){
	$(".cartBox").show();
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
					"<th id='th_detailDrawingNo'>세부규격</th>" + 
					"<th id='th_type'>타입</th>" + 
					"<th id='th_itemName'>품명</th>" + 
					"<th id='th_status'>제품상태</th>" + 
					"<th id='th_quantity'>수량</th>" + 
					"<th id='th_location'>위치</th>" +
					"<th id='th_note'>비고</th>" + 
					"<th id='th_putCart'>수정</th>"
				"</tr>";
			$(".infoTable thead").html(thead);	
					
			if(info.length === 0){
				let emptyTbody = 
					"<tr>" + 
						"<td colspan='8'>검색결과가 없습니다.</td>" +
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
						"<td class='td_detailDrwingNo'>" + info[i].detailDrawingNo + "</td>" + 
						"<td class='td_type'>" + info[i].type + "</td>" +  
						"<td class='td_itemName'>" + info[i].itemName + "</td>" + 
						"<td class='td_status'>" + info[i].status + "</td>" +  
						"<td class='td_quantity'>" + info[i].calculatedQuantity + "</td>" +  
						"<td class='td_location'>" + info[i].location + "</td>" +
						"<td class='td_note'>" + info[i].note + "</td>" +
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
}

//검색 버튼 클릭하면 품목검색 함수 실행
$("#search").on("click", function(){
	searchItemInfo();
})

//엔터치면 품목검색 실행
$("#searchKeyword").on("keyup", function(e) {
    if (e.key === "Enter") {  // 엔터 키가 눌렸을 때
        searchItemInfo();  // #search 버튼을 클릭한 것처럼 동작
    }
});

//위치수정하기(+) 버튼 클릭 시 오른쪽에 장바구니 창 띄우고 추가
$(document).on("click", ".putCart", function(){
	$(".cartBox").addClass("active"); // 슬라이드 인
	let row = $(this).closest("tr");
	let itemCode = row.find(".td_itemCode").text();
	let no = row.find(".td_no").text();
	let drawingNo = row.find(".td_drawingNo").text();
	let type = row.find(".td_type").text();
	let itemName = row.find(".td_itemName").text();
	let calculatedQuantity = row.find(".td_quantity").text();
	let note = row.find(".td_note").text();
	let location = row.find(".td_location").text();
	
	let thead = 
		"<tr>" + 
			"<th id='th_cart_no'>no</th>" + 
			//"<th id='th_cart_itemCode'>품목코드</th>" + 
			"<th id='th_cart_drawingNo'>도면번호</th>" +
			"<th id='th_cart_type'>타입</th>" + 
			"<th id='th_cart_itemName'>품명</th>" + 
			"<th id='th_cart_qty'>수량</th>" +
			"<th id='th_cart_request-qty'>수정 수량</th>" + 
			"<th id='th_cart_location'>현 위치</th>" +
			"<th id='th_cart_request-loca'>수정 위치</th>" + 
			"<th id='th_cart_del'>삭제</th>"
		"</tr>";
		
	$(".cartTable thead").html(thead);
	
	let tbody = 
		"<tr>" +
			"<td class='cart_id'>" + no + "</td>" + 
			//"<td class='cart_itemCode'>" + itemCode + "</td>" + 
			"<td class='cart_drawingNo'>" + drawingNo + "</td>" + 
			"<td class='cart_type'>" + type + "</td>" + 
			"<td class='cart_itemName'>" + itemName + "</td>" + 
			"<td class='cart_quantity'>" + calculatedQuantity + "</td>" + 
			"<td class='request-quantity'><input type='text' class='input_quantity'></td>" + 
			"<td class='cart_location'>" + location + "</td>" +
			"<td class='request-location'>" +
				"<select class='rackName'></select> - " +
				"<select class='rackNumber'></select> - " +
				"<select class='rackStage'></select>" +
			"</td>" + 
			"<td class='cart_del'>-</td>" + 
			"<td class='cart_note' style='display:none'>" + note + "</td>" + 
		"</tr>";
		
	$(".cartTable tbody").append(tbody);
	
	let tfoot = 
		"<tr>" + 
			"<td colspan='9' class='cart-last-td'><button id='requestBtn'>수정요청</button></td>" + 
		"</tr>";
	$(".cartTable tfoot").html(tfoot);
	
	let addedRow = $(".cartTable tbody tr").last(); // 가장 최근에 추가된 row
	
	selectLocation(addedRow);
})

//수정요청위치
function selectLocation(row){
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

	let $rackName = row.find('.rackName');
	let $rackNumber = row.find('.rackNumber');
	let $rackStage = row.find('.rackStage');

	$rackName.append('<option value="NULL">선택</option>');
	$rackNumber.append('<option value="NULL"></option>');
	$rackStage.append('<option value="NULL"></option>');
	$.each(rackNames, function(index, name) {
		$rackName.append(`<option value="${name}">${name.toUpperCase()}</option>`);
	});

	$rackName.on('change', function() {
		const selectedRack = $(this).val();
		$rackNumber.empty().append('<option value="NULL">선택</option>');
		$rackStage.empty().append('<option value="NULL">선택</option>');

		if (selectedRack === 'NULL') return;

		const maxNumber = rackNumberMap[selectedRack] || 0;
		for (let i = 1; i <= maxNumber; i++) {
			const padded = String(i).padStart(2, '0');
			$rackNumber.append(`<option value="${padded}">${padded}</option>`);
		}
	});

	$rackNumber.on('change', function() {
		const selectedRack = $rackName.val();
		const selectedNumber = $(this).val();

		$rackStage.empty().append('<option value="NULL">선택</option>');

		if (selectedRack === 'NULL' || selectedNumber === 'NULL') return;

		let floors = [];
		if (['a','b','c','d','e','f','g','h','i','j'].includes(selectedRack)) {
			floors = ['1F', '2F', '3F'];
		} else if (['k','l','m','n'].includes(selectedRack)) {
			floors = ['1F', '2F', '3F', '4F', '5F'];
		}

		$.each(floors, function(index, floor) {
			$rackStage.append(`<option value="${floor}">${floor}</option>`);
		});
	});
}

//수정요청하기
$(document).on("click", "#requestBtn", function(){
	//수정 요청 위치 유효성 검사
	let location_test = true;
	
	$(".request-location").each(function(){
		let savedLocation = $(this).closest("tr").find(".cart_location").text().toUpperCase();

		const rackName = $(this).find(".rackName").val();
		const rackNumber = $(this).find(".rackNumber").val();
		const rackStage = $(this).find(".rackStage").val();
		let requestLocation = rackName + "-" + rackNumber + "-" + rackStage;

		let savedQuantity = $(this).closest("tr").find(".cart_quantity").text();
		const input_quantity = $(this).closest("tr").find(".input_quantity").val();
		
		//조건검사
		// 항목의 존재 여부
		const hasRackName = rackName !== "NULL";
		const hasRackNumber = rackNumber !== "NULL";
		const hasRackStage = rackStage !== "NULL";
		const hasQuantity = input_quantity !== "";
		const isRackAllFilled = hasRackName && hasRackNumber && hasRackStage;
		const alertmsg = "수정 사항이 선택(혹은 입력)이 되지 않았습니다. 확인해주세요.";

		// === 1단계: 입력 유효성 검사 ===
		if (!hasRackName && !hasRackNumber && !hasRackStage && !hasQuantity) {
			alert(alertmsg);
			location_test = false;
			return false;
		}

		if (hasQuantity && (hasRackName || hasRackNumber || hasRackStage) && !isRackAllFilled) {
			alert(alertmsg);
			location_test = false;
			return false;
		}

		if (!hasQuantity && (hasRackName || hasRackNumber || hasRackStage) && !isRackAllFilled) {
			alert(alertmsg);
			location_test = false;
			return false;
		}

		// === 2단계: 실제 변경 사항 비교 ===
		// (입력은 했지만 바뀐 게 없다면 false 처리)
		if (isRackAllFilled && savedLocation === requestLocation.toUpperCase()) {
			alert("수정 할 위치가 현 위치랑 같습니다. 확인해주세요.");
			location_test = false;
			return false;
		}

		if (hasQuantity && savedQuantity === input_quantity) {
			alert("수정 할 수량이 현 수량과 같습니다. 확인해주세요.");
			location_test = false;
			return false;
		}

	});
	
	//유효성 검사 true일 경우 수정 진행되도록 설정
	if(location_test){
		//장바구니 정보담기
		let cart_info = [];
		
		$(".cart_id").each(function(){
			let item_id = $(this).text();
			let itemCode = $(this).closest("tr").find($(".cart_itemCode")).text();
			let drawingNo = $(this).closest("tr").find($(".cart_drawingNo")).text();
			let type = $(this).closest("tr").find($(".cart_type")).text();
			let quantity = $(this).closest("tr").find($(".cart_quantity")).text();
			let modi_quantity = $(this).closest("tr").find($(".input_quantity")).val();
			let location = $(this).closest("tr").find($(".cart_location")).text();
			let itemName = $(this).closest("tr").find($(".cart_itemName")).text();
			let note = $(this).closest("tr").find($(".cart_note")).text();
			let modi_location = 
				$(this).closest("tr").find($(".rackName")).val() + "-" +
				$(this).closest("tr").find($(".rackNumber")).val() + "-" +
				$(this).closest("tr").find($(".rackStage")).val();
							
			cart_info.push({
				requesterId: $("#userId").text(),
				requesterName: $("#userName").text(),
				requesterDept: $("#userDept").text(),
				itemId: item_id,
				itemCode: itemCode, 
				drawingNo: drawingNo,
				type: type,
				itemName: itemName,
				location: location,
				note: note,
				modiLocation: modi_location.toLocaleUpperCase(),
				quantity: parseInt(quantity),
				modiQuantity: parseInt(modi_quantity)
			});
		});
		console.log(cart_info)
		
		//위치 수정 정보들 백엔드로 넘기기
		$.ajax({
			url: "/stock/request/modi/location/quantity",
			type: "POST",
			contentType: "application/json",
			data: JSON.stringify(cart_info),
			success: function(response){
				alert(response)
				sessionStorage.setItem("fromModiLocationPage", "true");
				window.location.replace("/stock/request/list");
			},
			error: function(xhr){
				alert(xhr.responseText);
				
				return false;
			}
		});
	}//if
	
	
})

//장바구니에서 - 버튼 클릭하면 리스트 삭제
$(document).on("click", ".cart_del", function(){
	$(this).closest("tr").remove();
	
	if($(".cart_id").length === 0){
		$(".cartBox").removeClass("active"); // 슬라이드 아웃
		$("#requestBtn").hide();
		$(".cart-last-td").text("위치 변경 요청 할 항목이 없습니다.");
	}
});

$(document).on("click", ".closeBtn button", function(){ 
	$(".cartBox").removeClass("active"); // 슬라이드 아웃
});

$(document).ready(function() {
    // 카트 오픈 버튼 클릭 시
    $(".openCartBtn").click(function() {
        $(".cartBox").addClass("active");
    });

    // 닫기 버튼 클릭 시
    $(".closeBtn button").click(function() {
        $(".cartBox").removeClass("active");
    });
});