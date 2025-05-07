$(document).ready(function(){
	serchItemInfo();
});

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
					"<th id='th_quantity'>수량</th>" + 
					"<th id='th_location'>위치</th>" +
					"<th id='th_putCart'>출고</th>"
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
						"<td class='td_detailDrwingNo'>" + info[i].detailDrawingNo + "</td>" + 
						"<td class='td_type'>" + info[i].type + "</td>" +  
						"<td class='td_itemName'>" + info[i].itemName + "</td>" +  
						"<td class='td_quantity'>" + info[i].calculatedQuantity + "</td>" +  
						"<td class='td_location'>" + info[i].location + "</td>" +
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
	serchItemInfo();
})

//엔터치면 품목검색 실행
$("#searchKeyword").on("keyup", function(e) {
    if (e.key === "Enter") {  // 엔터 키가 눌렸을 때
        serchItemInfo();  // #search 버튼을 클릭한 것처럼 동작
    }
});

//출고하기(+) 버튼 클릭 시 오른쪽에 장바구니 창 띄우고 추가
$(document).on("click", ".putCart", function(){
	$(".cartBox").addClass("active"); // 슬라이드 인

		let row = $(this).closest("tr");
		let no = row.find(".td_no").text();
		let drawingNo = row.find(".td_drawingNo").text();
		let type = row.find(".td_type").text();
		let itemName = row.find(".td_itemName").text();
		let calculatedQuantity = row.find(".td_quantity").text();
		let location = row.find(".td_location").text();
		
		let thead = 
			"<tr>" + 
				"<th id='th_cart_no'>no</th>" + 
				"<th id='th_cart_drawingNo'>도면번호</th>" +
				"<th id='th_cart_itemName'>품명</th>" + 
				"<th id='th_cart_location'>위치</th>" +
				"<th id='th_cart_qty'>수량</th>" +
				"<th id='th_cart_delivaryQty'>출고수량</th>" +
				"<th id='th_cart_del'>삭제</th>" +  
			"</tr>";
			
		$(".cartTable thead").html(thead);
		
		let tbody = 
			"<tr>" +
				"<td class='cart_id'>" + no + "</td>" + 
				"<td>" + drawingNo + "</td>" + 
				"<td class='cart_itemName'>" + itemName + "</td>" + 
				"<td class='cart_location'>" + location + "</td>" +
				"<td class='cart_qty'>" + calculatedQuantity + "</td>" + 
				"<td><input type='number' class='delivery-quantity'></td>" + 
				"<td class='cart_del'>-</td>" + 
			"</tr>";
			
		$(".cartTable tbody").append(tbody);
		
		let tfoot = 
			"<tr>" + 
				"<td colspan='7'><button id='deliveryBtn'>출고하기</button></td>" + 
			"</tr>";
		$(".cartTable tfoot").html(tfoot);
})

//수량에 특수문자 음수 등 넣지 못하도록 막기 + 출고수량이 재고수량 보다 초과하지 못하도록 경고창
$(document).on("input", ".delivery-quantity", function(){
	let val = $(this).val().replace(/[^0-9]/g, "");
	$(this).val(val); // 숫자만 남기고 적용
	
	let row = $(this).closest("tr");
	let cart_qty = parseInt(row.find(".cart_qty").text().replace(/[^0-9]/g, ""));
	let currentVal = parseInt(val);

	if (currentVal > cart_qty) {
		alert("현재고 초과 수량으로 출고 할 수 없습니다.");
		$(this).val(cart_qty); // 최대치로 조정
		
	}
});

//출고하기
$(document).on("click", "#deliveryBtn", function(){
	//출고수량 유효성 검사
	let qty_test = true;
	$(".delivery-quantity").each(function(){
		if($(this).val() === "0" || $(this).val() === ""){
			
			alert("출고수량이 0이거나, 입력되지 않았습니다. \n 확인해주세요.");
			
			qty_test = false;
			
			return false;
		}
	})
	
	//유효성 검사 true일 경우 출고 진행되도록 설정
	if(qty_test){
		//장바구니 정보담기
		let cart_info = [];
		
		//장바구니에 담긴 id, 출고 수량 담기
		$(".cart_id").each(function(){
			let item_id = $(this).text();
			let qty = $(this).closest("tr").find($(".delivery-quantity")).val();
			
			cart_info.push({
				userId: $("#userId").text(),
				userName: $("#userName").text(),
				userDept: $("#userDept").text(),
				itemId: item_id,
				cartQty: qty
			});
		});
		console.log(cart_info)
		
		//출고 정보들 백엔드로 넘기기
		$.ajax({
			url: "/stock/cart/delivery",
			type: "POST",
			contentType: "application/json",
			data: JSON.stringify(cart_info),
			success: function(response){
				alert(response)
				location.href = "/stock/delivery/list/";
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