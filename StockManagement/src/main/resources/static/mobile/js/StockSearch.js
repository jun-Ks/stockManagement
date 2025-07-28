//품목 선택 하면 모달 창띄우기
$(document).on("click", ".info-card", function () {
    $("#deliveryModal").show();
    let item_no = $(this).find(".item_no").val();

    $.ajax({
        url: "/stock/item/" + item_no,
        type: "GET",
        success: function (info) {
            makeModalTable(info);
        },
        error: function (xhr) {
            alert(xhr.responseText);

            return false;
        }
    });
})

//모달 내 table만들기
function makeModalTable(info) {
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
    $(".modal-deliveryTable thead").html(thead);

    let tbody = `
        <tr>
            <th>출고수량</th>
            <td>
                <button class='minus_quantity'><i class="fa fa-minus"></i></button>
                <input type="text" class='input_delivery_quantity' readonly>
                <button class='plus_quantity'><i class="fa fa-plus"></i></button>
            </td>
        <tr>
    `;
    $(".modal-deliveryTable tbody").html(tbody);

}

//화살표로 수량조절
$(document).on("click", ".minus_quantity", function () {
    let $input = $(this).closest("tr").find(".input_delivery_quantity");
    let delivery_quantity_val = parseInt($input.val()) || 0; // 숫자 변환, NaN 방지
    delivery_quantity_val = Math.max(delivery_quantity_val - 1, 0); // 최소값 0 유지
    $input.val(delivery_quantity_val);
});

$(document).on("click", ".plus_quantity", function () {
    let delivery_quantity_val = $(this).closest("tr").find(".input_delivery_quantity").val() === "" ? 0 : $(this).closest("tr").find(".input_delivery_quantity").val();
    delivery_quantity_val = parseInt(delivery_quantity_val) + 1;
    $(this).closest("tr").find(".input_delivery_quantity").val(delivery_quantity_val);
})

//숫자버튼 입력
$(document).on("click", ".keyboard button", function () {
    let currentVal = $(".input_delivery_quantity").val() === "0"
        || $(".input_delivery_quantity").val() === "00"
        ? ""
        : $(".input_delivery_quantity").val();
    let buttonVal = $(this).text();
    let input_value = currentVal + buttonVal;

    $(".input_delivery_quantity").val(input_value);

    //delete 키
    if (buttonVal === "←") {
        let delete_input = currentVal.slice(0, -1);
        $(".input_delivery_quantity").val(delete_input);
    }
});

//출고하기
$(document).on("click", ".modal-deliveryBtn", function () {
    let itemNo = $(".hidden_itemNo").val();
    let delivery_quantity = $(".input_delivery_quantity").val();

    //유효성검사
    if (delivery_quantity === "" || delivery_quantity === "0" || delivery_quantity === "00") {
        alert("출고수량이 입력되지 않았습니다.\n확인해주세요.")
        return false;
    }

    let cart_info = [];

    cart_info.push({
        userId: $("#userId").text(),
        userName: $("#userName").text(),
        userDept: $("#userDept").text(),
        itemId: itemNo,
        cartQty: delivery_quantity
    });

    //출고 정보들 백엔드로 넘기기
    $.ajax({
        url: "/stock/cart/delivery",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify(cart_info),
        success: function () {
            //성공메세지
            showSuccessToast("✅ 출고가 성공적으로 완료되었습니다!");
            
            //모달숨기기
            $(".modal").hide();

            //포커스 옮겨주기
            setTimeout(function () {
                $('#search-location').focus();
            }, 100); 

            serchItemInfo("deliveryRefresh");
        },
        error: function (xhr) {
            alert(xhr.responseText);

            return false;
        }
    });
});

//카메라qr스캔
// function onScanSuccessResult(decodedText) {
//     $("#qrModal").hide();
//     let searchBox = $("#search-location");

//     html5QrCode.stop()
//         .then(() => {
//             html5QrCode.clear();
//             // 필요시 모달 닫기, 결과 처리 등
//             $("#qrModal").hide();
//             searchBox.val(decodedText);
//             serchItemInfo();
//         })
//         .catch(err => {
//             alert("카메라 종료 오류:", err);
//         });
// }

// //카메라 스캔
// let html5QrCode;

// $("#qrScan").on("click", function () {

//     // 모달 열기
//     $("#qrModal").css("display", "block");

//     // QR 스캔 시작
//     html5QrCode = new Html5Qrcode("reader");
//     html5QrCode.start(
//         { facingMode: "environment" },
//         { fps: 10, qrbox: 250 },
//         onScanSuccessResult
//     );

// });
