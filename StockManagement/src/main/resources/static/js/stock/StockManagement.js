//location select option 추가
$(document).ready(function(){
	//품목수정/삭제 파트 hide
	//$(".modify-box").hide();
	$(".modify-box").show();
	$(".insert-box").hide();
	
	//location selectbox 추가
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
	let drawingNo = $("#drawingNo").val().toUpperCase();
	let detailDrawingNo = $("#detailDrawingNo").val().toUpperCase();
	let basicQuantity = $("#basicQuantity").val();
	let location = ($("#rackName").val() + "-" + $("#rackNumber").val() + "-" + $("#rackStage").val()).toUpperCase();
	
	let insertData = {
		itemCode: itemCode, 
		type: type, 
		drawingNo: drawingNo, 
		detailDrawingNo, detailDrawingNo,
		basicQuantity: basicQuantity,
		calculatedQuantity: basicQuantity,
		location: location
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
			location.reload();
		},
		error: function(xhr){
			alert(xhr.responseText);
		}
	});
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
					"<th id='th_drawingNo'>도면번호</th>" +
					"<th id='th_detailDrawingNo'>세부규격</th>" + 
					"<th id='th_type'>타입</th>" + 
					"<th id='th_itemName'>품명</th>" + 
					"<th id='th_quantity'>수량</th>" + 
					"<th id='th_location'>위치</th>" +
					"<th id='th_del'>삭제</th>" + 
				"</tr>";
			$(".stockList thead").html(thead);	
					
			if(info.length === 0){
				let emptyTbody = 
					"<tr>" + 
						"<td colspan='7'>검색결과가 없습니다.</td>" +
					"</tr>";
					
				$(".stockList tbody").html(emptyTbody);
				
				return;
			}
			
			let tbody = "";
			for(let i = 0; i < info.length; i++){
				
				tbody +=
					"<tr>" +
						"<td class='td_no'>" + info[i].no + "</td>" +  
						"<td class='td_drawingNo'>" + info[i].drawingNo + "</td>" + 
						"<td class='td_detailDrwingNo'>" + info[i].detailDrawingNo + "</td>" + 
						"<td class='td_type'>" + info[i].type + "</td>" +  
						"<td class='td_itemName'>" + info[i].itemName + "</td>" +  
						"<td class='td_quantity'>" + info[i].calculatedQuantity + "</td>" +  
						"<td class='td_location'>" + info[i].location + "</td>" +
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
$(document).on("click", ".stockList tbody", function(){
	let td_no = $(this).cloest("tr").find(".td_no").text();
	
	alert(td_no)
})