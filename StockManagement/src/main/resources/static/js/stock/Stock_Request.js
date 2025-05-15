$(document).ready(function() {
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