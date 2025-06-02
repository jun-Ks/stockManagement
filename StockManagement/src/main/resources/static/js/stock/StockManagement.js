$(document).ready(function(){
	$(".modify-box").hide();
	makeRackSelect();
})
//option 선택 시 active 클래스 추가
$(document).on("click", ".option", function(){
	
    $(".option").removeClass("active");
    $(this).addClass("active");

    if($(this).attr("id") === "stock-insert"){
		
        $("#stock-insert").addClass("active");     

		$(".modify-box").hide();
		$(".insert-box").show();
		
    } else if($(this).attr("id") === "stock-modify"){
		
        $("#stock-modify").addClass("active");

		$(".modify-box").show();
		$(".insert-box").hide();
    }
});

//등록 버튼 클릭 시 데이터 컨트롤러로 넘겨주기
$("#insertBtn").on("click", function(){
	insertStockInfo();
})

//품목등록 데이터가져오기
function insertStockInfo(){

	let itemCode = $("#code").val().toUpperCase();
	let type = $("#type").val().toUpperCase();
	let itemName = $("#itemName").val().toUpperCase();
	let drawingNo = $("#drawingNo").val().toUpperCase();
	let detailDrawingNo = $("#detailDrawingNo").val().toUpperCase();
	let basicQuantity = $("#basicQuantity").val();
	let rackName = ($("#rackName").val() || "").toUpperCase();
	let rackNumber = ($("#rackNumber").val() || "").toUpperCase();
	let rackStage = ($("#rackStage").val() || "").toUpperCase();
	let location = (rackName + "-" + rackNumber + "-" + rackStage);
	let status = $("#status").val();
	let note = $("#note").val();
	//공구실 체크되어있으면 location = 공구실로 설정
	if($("#toolRoom-chk").prop("checked")){
		location = "공구실";
	}

	if(checkData(itemCode, type, itemName, drawingNo,	detailDrawingNo, basicQuantity, rackName, rackNumber, rackStage, status)){
		let insertData = {
			itemCode: itemCode, 
			type: type, 
			itemName: itemName,
			drawingNo: drawingNo, 
			detailDrawingNo: detailDrawingNo,
			basicQuantity: basicQuantity,
			calculatedQuantity: basicQuantity,
			location: location,
			status: status,
			note: note
		};
		
		$.ajax({
			url: "/item/info",
			type: "POST",
			contentType: "application/json",
			data: JSON.stringify({
				insertData, 
				userId, 
				userName, 
				userDept
			}),
			success: function(response){
				alert(response);
				window.location.reload();
			},
			error: function(xhr){
				alert(xhr.responseText);
			}
		});
	}
}

//품목검색 함수
function serchItemInfo(){
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
					"<th id='th_del'>삭제</th>" + 
				"</tr>";
			$(".stockList thead").html(thead);	
					
			if(info.length === 0){
				let emptyTbody = 
					"<tr>" + 
						"<td colspan='10'>검색결과가 없습니다.</td>" +
					"</tr>";
					
				$(".stockList tbody").html(emptyTbody);
				
				return;
			}
			
			let tbody = "";
			for(let i = 0; i < info.length; i++){
				
				tbody +=
					"<tr id='itemId-" + info[i].no + "'>" +
						"<td class='td_no'>" + info[i].no + "</td>" +  
						"<td class='td_itemCode'>" + info[i].itemCode + "</td>" + 
						"<td class='td_drawingNo'>" + info[i].drawingNo + "</td>" + 
						"<td class='td_detailDrawingNo'>" + info[i].detailDrawingNo + "</td>" + 
						"<td class='td_type'>" + info[i].type + "</td>" +  
						"<td class='td_itemName'>" + info[i].itemName + "</td>" + 
						"<td class='td_status'>" + info[i].status + "</td>" +  
						"<td class='td_quantity'>" + info[i].calculatedQuantity + "</td>" +  
						"<td class='td_location'>" + info[i].location + "</td>" +
						"<td class='td_note'>" + info[i].note + "</td>" + 
						"<td class='td_del'> x </td>" + 
					"</tr>";						
			}
			$(".stockList tbody").html(tbody);
		},
		error: function(xhr){
			alert(xhr.responseText);
			
			return false;
		}
	});
}

//검색 버튼 클릭하면 품목검색 함수 실행
$("#search").on("click", function(){
	serchItemInfo();
})

//엔터치면 품목검색 실행
$("#searchKeyword").on("keyup", function(e) {
    if (e.key === "Enter") {  // 엔터 키가 눌렸을 때
        serchItemInfo();  // #search 버튼을 클릭한 것처럼 동작
    }
});

//항목 선택 시 수정/삭제 모달 생성
$(document).on("click", ".stockList tbody tr", function(e){
	
	if ($(e.target).hasClass("td_del")) {
	    return; // .td_del 클릭 시 모달을 띄우지 않도록 종료
	}

	
    $("#itemModal").fadeIn();
	
	//수정 모달에 select 박스 추가 및 위치 정보 select 박스에 추가
	let td_location = $(this).find(".td_location").text();
	let location_parts = td_location.split("-");
	let td_rackName = location_parts[0];
	let td_rackNumber = location_parts[1];
	let td_rackStage = location_parts[2];
	   
	makeRackSelect_modal(td_rackName, td_rackNumber, td_rackStage);

	//수정 모달에 status select내용 추가
	let td_status = $(this).find(".td_status").text();
	makeStatusSelect_modal(td_status);

	//이외 input text값 추가
	let td_no = $(this).find(".td_no").text();
	let td_itemCode = $(this).find(".td_itemCode").text();
    let td_drawingNo = $(this).find(".td_drawingNo").text();
    let td_detailDrawingNo = $(this).find(".td_detailDrawingNo").text();
    let td_type = $(this).find(".td_type").text();
    let td_itemName = $(this).find(".td_itemName").text();
    let td_quantity = $(this).find(".td_quantity").text();
	
	let td_note = $(this).find(".td_note").text();

    $("#modalNo").val(td_no);
	$("#modalItemCode").val(td_itemCode);
    $("#modalDrawingNo").val(td_drawingNo);
    $("#modalDetailDrawingNo").val(td_detailDrawingNo);
    $("#modalType").val(td_type);
    $("#modalItemName").val(td_itemName);
    $("#modalQuantity").val(td_quantity);
	$("#modalNote").val(td_note);

	
});

//모달에서 x 선택 시 모달 닫히기
$(".close").on("click", function(){
	$("#itemModal").fadeOut();
})

//location 값생성
function makeRackSelect(){
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
	$('#rackName').append(
		'<option value="NULL">A~N 선택해주세요.</option>'
	);

	// rackName에 A~N 옵션 추가
	$.each(rackNames, function(index, name) {
		$('#rackName').append(
			`<option value="${name}">${name.toUpperCase()}</option>`);
		
	});

	// rackName 선택 시 rackNumber 설정
	$('#rackName').on('change', function() {
		const selectedRack = $(this).val();
		$('#rackNumber').empty().append('<option value="NULL">선택</option>');
		$('#rackStage').empty().append('<option value="NULL">선택</option>');

		if (selectedRack === "") return;

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
}
function makeRackSelect_modal(td_rackName, td_rackNumber, td_rackStage) {
	
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
	$('#modalRackName').empty().append(
		'<option value="' + td_rackName + '">' + td_rackName + "</option>" + 
		'<option value="NULL">A~N 선택해주세요.</option>'
	);
	$('#modalRackNumber').empty().append(
		'<option value="' + td_rackNumber + '">' + td_rackNumber + "</option>"
	);
	$('#modalRackStage').empty().append(
		'<option value="' + td_rackStage + '">' + td_rackStage + "</option>"
	);
	
	// rackName에 A~N 옵션 추가
	$.each(rackNames, function(index, name) {
		$('#modalRackName').append(
			`<option value="${name}">${name.toUpperCase()}</option>`);
		
	});

	// rackName 선택 시 rackNumber 설정
	$('#modalRackName').on('change', function() {
		const selectedRack = $(this).val();
		$('#modalRackNumber').empty().append('<option value="NULL">선택</option>');
		$('#modalRackStage').empty().append('<option value="NULL">선택</option>');

		if (selectedRack === 'NULL') return;

		const maxNumber = rackNumberMap[selectedRack] || 0;

		for (let i = 1; i <= maxNumber; i++) {
			const padded = String(i).padStart(2, '0');
			$('#modalRackNumber').append(`<option value="${padded}">${padded}</option>`);
		}
	});

	// rackNumber 선택 시 rackStage 설정
	$('#modalRackNumber').on('change', function() {
		const selectedRack = $('#modalRackName').val();
		const selectedNumber = $(this).val();

		$('#modalRackStage').empty().append('<option value="NULL">선택</option>');

		if (selectedRack === 'NULL' || selectedNumber === 'NULL') return;

		let floors = [];
		if (['a','b','c','d','e','f','g','h','i','j'].includes(selectedRack)) {
			floors = ['1F', '2F', '3F'];
		} else if (['k','l','m','n'].includes(selectedRack)) {
			floors = ['1F', '2F', '3F', '4F', '5F'];
		}

		$.each(floors, function(index, floor) {
			$('#modalRackStage').append(`<option value="${floor}">${floor}</option>`);
		});
	});
}

//수정모달 - 제품상태 selectbox 생성
function makeStatusSelect_modal(td_status){
	let selectData = 
		"<option value='" + td_status + "'>" + td_status + "</option>" +
		"<option value=''>----------------------------------------------------------------</option>" + 
		"<option value='완제품'>완제품</option>" +
		"<option value='가공중'>가공중</option>" +
		"<option value='소재'>소재</option>" +
		"<option value='불량'>불량</option>" +
		"<option value=''>----------------------------------------------------------------</option>" +
		"<option value='부자재'>부자재</option>" +
		"<option value='공구'>공구</option>" +
		"<option value='기타'>기타</option>";
	$("#modalStatus").html(selectData);
	
}
//수정 버튼 클릭 - 데이터 컨트롤러로 넘기기
$("#modifyBtn").on("click", function(){
	if (confirm("수정하시겠습니까?")) {
		let no = $("#modalNo").val();
		let drawingNo = $("#modalDrawingNo").val().toUpperCase();
		let itemCode = $("#modalItemCode").val().toUpperCase();
		let detailDrawingNo = $("#modalDetailDrawingNo").val().toUpperCase();
		let type = $("#modalType").val().toUpperCase();
		let itemName = $("#modalItemName").val().toUpperCase();
		let calculatedQuantity = $("#modalQuantity").val();
		let modalRackName = $("#modalRackName").val().toUpperCase();
		let modalRackNumber = $("#modalRackNumber").val().toUpperCase();
		let modalRackStage = $("#modalRackStage").val().toUpperCase();
		let note = $("#modalNote").val();
		let location = modalRackName + "-" + modalRackNumber + "-" + modalRackStage;
		let status = $("#modalStatus").val();
		
		let info = {
			no: no,
			itemCode: itemCode,
			drawingNo: drawingNo,
			detailDrawingNo: detailDrawingNo,
			type: type,
			itemName: itemName,
			calculatedQuantity: calculatedQuantity,
			location: location,
			note: note,
			status: status
		};

		$.ajax({
			url: "/item/info/modification",
			type: "PUT",
			contentType: "application/json",
			data: JSON.stringify(info),
			success: function(response){
				alert(response);
				$(".modal").hide();
				//수정성공하면 해당 행 정보 업데이트
				let itemRow = $("#itemId-" + no);
				
				itemRow.find(".td_drawingNo").text(drawingNo);
				itemRow.find(".td_itemCode").text(itemCode);
				itemRow.find(".td_detailDrawingNo").text(detailDrawingNo);
				itemRow.find(".td_type").text(type);
				itemRow.find(".td_itemName").text(itemName);
				itemRow.find(".td_quantity").text(calculatedQuantity);
				itemRow.find(".td_location").text(location);
				itemRow.find(".td_status").text(status);
				itemRow.find(".td_note").text(note);
				
			},
			error: function(xhr){
				alert(xhr.responseText);
			}
		});
	}
	
});

//삭제버튼 클릭 - 정보제거
$("#deleteBtn").on("click", function(){
	if (confirm("해당 품목을 정말로 삭제하시겠습니까?\n삭제 시, 관련 정보(입고/출고 정보, 등록/수정 요청 등)가 모두 삭제 됩니다.")) {
		//itemId따고 - 삭제 진행
		let itemId = $("#modalNo").val();
		deleteInfo(itemId);
		$.ajax({
			url: "/item/info/" + itemId,
			type: "DELETE",
			success: function(response){
				alert(response);
				//성공시 모달 닫고 뒤 품목 수정/삭제 페이지에서도 해당 행 삭제
				$(".modal").hide();
				$("#itemId-" + itemId).remove();
			},
			error: function(xhr){
				alert(xhr.responseText);
			}
		});
	}
});

//조회 화면에서 삭제버튼 클릭 - 정보제거
$(document).on("click", ".td_del", function(){
	if (confirm("해당 품목을 정말로 삭제하시겠습니까?\n삭제 시, 관련 정보(입고/출고 정보, 등록/수정 요청 등)가 모두 삭제 됩니다.")) {
		//itemId따고 - 삭제 진행
		let itemId = $(this).closest("tr").find(".td_no").text();
		deleteInfo(itemId);
	}
});

function deleteInfo(itemId){
	$.ajax({
		url: "/item/info/" + itemId,
		type: "DELETE",
		success: function(response){
			alert(response);
			//성공시 모달 닫고 뒤 품목 수정/삭제 페이지에서도 해당 행 삭제
			$(".modal").hide();
			$("#itemId-" + itemId).remove();
		},
		error: function(xhr){
			alert(xhr.responseText);
		}
	});
}

//위치 - 공구실 체크 시 위치 select박스 비활성화
$("#toolRoom-chk").on("change", function() {
    if ($(this).prop("checked")) {
        // 체크되었을 때 select 비활성화
        $(".location-selects select").prop("disabled", true);
    } else {
        // 체크 해제 시 select 활성화
        $(".location-selects select").prop("disabled", false);
    }
});

//유효성검사 함수
function checkData(itemCode, type, itemName, drawingNo,	detailDrawingNo, basicQuantity, rackName, rackNumber, rackStage, status){
	const data = [
		        { value: itemCode,        name: "품목코드" },
        { value: type,            name: "타입" },
        { value: itemName,        name: "품목명" },
        { value: drawingNo,       name: "도면번호" },
        { value: detailDrawingNo, name: "세부규격" },
        { value: status,          name: "제품상태" },
        { value: basicQuantity,   name: "수량" }
	];

	for(let i = 0; i < data.length; i++){
		if(!data[i].value){
			alert(`${data[i].name} 입력되지 않았습니다.`);
			return false;
		}
	}

	let is_locationChecked = $("#toolRoom-chk").prop("checked")
	
	if(!is_locationChecked){
		if (!rackName || !rackNumber || !rackStage) {
		alert("위치가 입력되지 않았습니다.");
		return false;
		}
	}
	return true;
}