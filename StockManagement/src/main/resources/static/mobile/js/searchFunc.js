function inputBoxFocus(){
    $('#search-location').focus();  // 검색 input box 포커스
}

//페이지로드 되면 검색창 focus, 키보드 안뜨게
$(document).ready(function () {
    inputBoxFocus();
});

let scannedValue = '';

//스캐너 스캔시 텍스트 input 에 넣어주기
$("#search-location").on("keydown", function (e) {
    if (e.key === "Enter" || e.keyCode === 13) {
        inputBoxFocus(); // 포커스 초기화용
        $(".input_location").text($(this).val());
        serchItemInfo();
        $(this).val("");
    };
})

//품목검색 함수
function serchItemInfo(whether) {
    $(".cartBox").show();
    let searchOption = "location";
    let searchKeyword = "";

    if(!whether){
        //출고 전 검색일 경우 바코드 스캔 정보로 search
        searchKeyword = $("#search-location").val().toUpperCase();
        
    }else if(whether === "deliveryRefresh"){
        //출고 후 리프레쉬 -  검색상태에서 새로고침
        searchKeyword = $(".input_location").text().toUpperCase();
    }

    $.ajax({
        url: "/stock/item",
        type: "POST",
        data: {
            searchOption: searchOption,
            searchKeyword: searchKeyword
        },
        success: function (list) {
            let infoCard = "";
            let empty_notice_style = `
                font-size: 20px;
                font-weight: bold;
                margin: 30px auto;
                text-align: center;
            `;
            if(list.length === 0){
                $(".info-container").hide();
                $(".empty-container").show();
                infoCard = `
                    <div class="empty_notice" style="${empty_notice_style}">등록된 품목이 없습니다.</div>
                `;
                $(".empty-container").html(infoCard);
            }else{
                list.forEach(function (info, index) {
                    $(".empty-container").hide();
                    $(".info-container").show();
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
            }

        },
        error: function (xhr) {
            alert(xhr.responseText);

            return false;
        }
    });
}



//모달 닫기
$(document).on("click", ".modal-close", function () {
    $(".modal").hide();
    inputBoxFocus();
})

// 바깥 영역 클릭 시 닫기
$(document).on("click", ".modal", function (e) {
    // 클릭한 요소가 .modal-content 내부가 아니면 (= 바깥 영역이면)
    if (!$(e.target).closest(".modal-content").length) {
        $(".modal").hide();
        inputBoxFocus();
    }
});


// 출고 성공 알림 함수
function showSuccessToast(msg) {
    Toastify({
        text: msg,
        duration: 3000,
        close: true,
        gravity: "top",
        position: "center",
        backgroundColor: "#28a745", // 초록색
        stopOnFocus: true,
    }).showToast();
}

// 출고 실패 알림 함수
function showFailToast(msg) {
    Toastify({
        text: msg,
        duration: 3000,
        close: true,
        gravity: "top",
        position: "center",
        backgroundColor: "#dc3545", // 빨간색
        stopOnFocus: true,
    }).showToast();

}