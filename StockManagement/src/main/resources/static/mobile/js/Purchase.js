function isAppMode() {
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches
        || window.navigator.standalone === true;

    const isAndroidWebView = /\bwv\b/.test(navigator.userAgent) || /; wv\)/.test(navigator.userAgent);

    const isNoReferrer = document.referrer === ""; // 앱에서 열면 종종 referrer 없음

    return isStandalone || isAndroidWebView || isNoReferrer;
}

//페이지 로드되면 input에 포커스 갖다놓기
$(document).ready(function(){
    let searchBox = $("#search-location");

    searchBox.focus();
})

//검색버튼
$("#search-btn").on("click", function(){
    let searchBox = $("#search-location");
    //유효성검사
    if(searchBox.val() === ""){
        alert("위치를 스캔(or 입력)해주세요.");
        return false;
    }
    serchItemInfo();
})

$("#search-location").on("keydown", function(e){
    if(e.key === "Enter" || e.keyCode === 13){
        serchItemInfo();
    };
})

//품목검색 함수
function serchItemInfo(){
	$(".cartBox").show();
	let searchOption = "location";
	let searchKeyword = $("#search-location").val().toUpperCase();

	$.ajax({
		url: "/stock/item",
		type: "POST",
		data:{
			searchOption: searchOption,
			searchKeyword: searchKeyword
		},
		success: function(list){
			let infoCard = "";
            list.forEach(function(info, index){
                infoCard += 
                    "<div class='info-card'>" + 
                        "<div class='info'>" + 
                            "<input type='hidden' value='" + info.no + "' class='item_no'>" + 
                            "<h3>" + info.itemName + "</h3>" + 
                            "<p class='drawingNo'>" + info.drawingNo + "</p>" + 
                            "<span>" + "수량 : " + "</span>" + 
                            "<span class='quantity'>" + info.calculatedQuantity + "</span>" + 
                        "</div>" + 
                    "</div>"
                ;
            });
            $(".info-container").html(infoCard);
            
		},
		error: function(xhr){
			alert(xhr.responseText);
			
			return false;
		}
	});
}

//품목 선택 하면 모달 창띄우기
$(document).on("click", ".info-card", function(){
    $("#purchaseModal").show();
    let item_no = $(this).find(".item_no").val();


    let searchOption = "no";
    let searchKeyword = item_no;
    let quantity = $(this).find(".quantity").text();


    $.ajax({
		url: "/stock/item/" + item_no,
		type: "GET",
		success: function(info){
            makeModalTable(info);
		},
		error: function(xhr){
			alert(xhr.responseText);
			
			return false;
		}
	});
})


function makeModalTable(info){
    let td_itemNo = info.no;
    let td_itemCode = info.itemCode;
    let td_drawingNo = info.drawingNo;
    let td_itemName = info.itemName;
    let td_status = info.status;
    let td_quantity = info.calculatedQuantity;
    let td_note = info.note;

    let thead = `
        <tr>
            <input type="hidden" class="hidden_itemNo" value="${td_itemNo}">
            <th>품목코드</th><td>${td_itemCode}</td>
        </tr>
        <tr>
            <th>도면번호</th><td>${td_drawingNo}</td>
        </tr>
        <tr>
            <th>제품명</th><td>${td_itemName}</td> 
        </tr>
        <tr>
            <th>제품상태</th><td>${td_status}</td>
        </tr>
        <tr>
            <th>비고</th><td>${td_note}</td>
        </tr>
        <tr>
            <th>현 수량</th><td class="modal_td_quantity">${td_quantity}</td>
        </tr>
    `;
    $(".modal-purchaseTable thead").html(thead);

    let tbody = `
        <tr>
            <th>요청수량</th>
            <td>
                <button class='minus_quantity'><i class="fa fa-minus"></i></button>
                <input type="text" class='input_purchase_quantity' readonly>
                <button class='plus_quantity'><i class="fa fa-plus"></i></button>
            </td>
        <tr>
    `;
    $(".modal-purchaseTable tbody").html(tbody);

}

//모달 닫기
$(document).on("click", ".modal-close", function(){
    $(".modal").hide();
})

// 바깥 영역 클릭 시 닫기
$(document).on("click", ".modal", function(e){
    // 클릭한 요소가 .modal-content 내부가 아니면 (= 바깥 영역이면)
    if (!$(e.target).closest(".modal-content").length) {
        $(".modal").hide();
    }
});

//화살표로 수량조절
$(document).on("click", ".minus_quantity", function(){
    let $input = $(this).closest("tr").find(".input_purchase_quantity");
    let purchase_quantity_val = parseInt($input.val()) || 0; // 숫자 변환, NaN 방지
    purchase_quantity_val = Math.max(purchase_quantity_val - 1, 0); // 최소값 0 유지
    $input.val(purchase_quantity_val);
});

$(document).on("click", ".plus_quantity", function(){
    let purchase_quantity_val = $(this).closest("tr").find(".input_purchase_quantity").val() === "" ? 0 : $(this).closest("tr").find(".input_purchase_quantity").val();
    purchase_quantity_val = parseInt(purchase_quantity_val) + 1;
    $(this).closest("tr").find(".input_purchase_quantity").val(purchase_quantity_val);
})


//입력 창 클릭 시 입력 키보드 보이기
$(document).on("click", ".input_purchase_quantity", function(){
    $(".modal-purchaseInput").show();
});

//숫자버튼 입력
$(document).on("click", ".keyboard button", function(){
    let currentVal = $(".input_purchase_quantity").val() === "0" 
                    || $(".input_purchase_quantity").val() === "00" 
                    ? "" 
                    : $(".input_purchase_quantity").val();
    let buttonVal = $(this).text();
    let input_value = currentVal + buttonVal;

    $(".input_purchase_quantity").val(input_value);

    //delete 키
    if(buttonVal === "←"){
        let delete_input = currentVal.slice(0, -1);
        $(".input_purchase_quantity").val(delete_input);
    }
});

//요청하기
$(document).on("click", ".keyboard-purchase", function(){
    let itemNo = $(".hidden_itemNo").val();
    let purchase_quantity = $(".input_purchase_quantity").val();

    //유효성검사
    if(purchase_quantity === "" || purchase_quantity === "0" || purchase_quantity === "00"){
        alert("출고수량이 입력되지 않았습니다.\n확인해주세요.")
        return false;
    }

    let request_info = {
        requestQuantity: purchase_quantity,
        requesterId: $("#userId").text(),
        requesterName: $("#userName").text(),
        requesterDept: $("#userDept").text(),
        itemId: itemNo
    };
		
    //요청 정보들 백엔드로 넘기기
    $.ajax({
        url: "/mobile/stock/request/qty",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify(request_info),
        success: function(response){
            alert(response)
            $(".modal").hide();
            
        },
        error: function(xhr){
            alert(xhr.responseText);
            
            return false;
        }
    });
});

function onScanSuccessResult(decodedText){
    $("#qrModal").hide();
    let searchBox = $("#search-location");

    html5QrCode.stop()
      .then(() => {
          html5QrCode.clear();
          // 필요시 모달 닫기, 결과 처리 등
          $("#qrModal").hide();
          searchBox.val(decodedText);
          serchItemInfo();
      })
      .catch(err => {
         alert("카메라 종료 오류:", err);
      });
}

let html5QrCode;

$("#qrScan").on("click", function () {
    let isBrowser = true;
    if(isAppMode()){
        isBrowser = false;
        // 모달 열기
        $("#qrModal").css("display", "block");
        return false;
    }
    // 모달 열기
    $("#qrModal").css("display", "block");

    // QR 스캔 시작
    if(isBrowser){
        html5QrCode = new Html5Qrcode("reader");
        html5QrCode.start(
            { facingMode: "environment" },
            { fps: 10, qrbox: 250 },
            onScanSuccessResult
        );
    }
});