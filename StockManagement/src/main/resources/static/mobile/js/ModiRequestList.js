$(document).ready(function(){
    //날짜 input에 기본값으로 오늘 날짜 넣기
	const today = new Date();

	const year = today.getFullYear();
	const month = String(today.getMonth() + 1).padStart(2, '0'); // 0부터 시작하므로 +1
	const day = String(today.getDate()).padStart(2, '0');

	const formattedDate = `${year}-${month}-${day}`;
	$(".startDate").val(formattedDate);
	$(".endDate").val(formattedDate);

    let startDate = $(".startDate").val();
    let endDate = $(".endDate").val();
    let requesterId = $("#userId").text();

    //오늘날짜요청 건 보이기
    searchInfo(requesterId, startDate, endDate);
})

function makeTbl(info){
	let thead = 
		"<tr>" + 
            "<th class='th_itemName'>품목명</th>" + 
            "<th class='th_drawingNo'>도면번호</th>" + 
			"<th class='th_location'>요청 위치</th>"+
			"<th class='th_requestQuantity'>요청 수량</th>" +
			"<th class='th_requestDate'>요청일</th>" +
        "</tr>";
            

	$(".modiRequestList thead").html(thead);

	let tbody = ""; 

    let isApproval = "background-color: lightgrey";
    
	if(info.length > 0){
        for(let i = 0; i < info.length; i++){
            let quantity = info[i].modiQuantity === 0 ? "-" : info[i].modiQuantity;
            let isApprovalStyle = info[i].approval === 1 ? isApproval : "";
			tbody +=
				"<tr style='" + isApprovalStyle + "'>" +
                    "<input type='hidden' class='hidden_no' value='" + info[i].no + "'>" + 
					"<td class='td_itemName ellipsis'>" + info[i].itemName + "</td>" +
					"<td class='td_drawingNo ellipsis'>" + info[i].drawingNo + "</td>" +
					"<td class='td_location'>" + info[i].modiLocation + "</td>" + 
					"<td class='td_quantity'>" + quantity + "</td>" +
					"<td class='td_deliveryDate'>" + info[i].insertDate.split("T")[0].substring(2)  + "</td>" +
				"</tr>";
		}
	}else{
		tbody = 
			`<tr>
				<td colspan='5'> 요청 데이터가 없습니다. </td>
			</tr>`;
	}
	
	$(".modiRequestList tbody").html(tbody);
}

//리스트 클릭 시 상세내용 보이기
$(document).on("click", ".modiRequestList tbody tr", function(){
    let requestNo = $(this).find(".hidden_no").val();
    
     $.ajax({
        url: "/modi/request/info/" + requestNo,
        type: "GET",
        success: function(info){
            makeModalTable(info)
        },
        error: function(xhr){
            alert(xhr.responseText);
            
            return false;
        }
	});
})

//모달 테이블만들기
function makeModalTable(info){
    $(".modal").show();
    let td_itemNo = info.no;
    let td_itemCode = info.itemCode;
    let td_itemName = info.itemName;
    let td_drawingNo = info.drawingNo;
    let td_type = info.type;
    let td_requestQuantity = info.modiQuantity;
    let td_location = info.modiLocation;
    let td_approval = info.approval  === 1 ? "승인" : "미승인";
    let td_insertDate = info.insertDate.replace("T", " ");
    
    //위치수정요청 시 수정요청위치, 수량수정요청시 수정요청수량으로 
    let modiTitle = td_location === "-" ? "요청수량" : "요청위치";
    //modiTitle 확인하여 수정요청 데이터 담기
    let modiData = modiTitle === "요청수량" ? td_requestQuantity : td_location;

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
        <tr class="modal-tr_modiData">
            <th>${modiTitle}</th><td class="modal-td_modiData">${modiData}</td>
        </tr>
        <tr>
            <th>요청일자</th><td class="td_insertDate">${td_insertDate}</td>
        </tr>
        <tr>
            <th>승인여부</th><td>${td_approval}</td>
        </tr>
    `;
    $(".modal-reqeustInfoTable thead").html(thead);
}

//모달닫기
$(".modal-close, .modal-close-btn").on("click", function(){
    $(".modal").hide();
})

//검색 버튼 클릭
$(".search_btn").on("click", function(){
    let requesterId = $("#userId").text();
    let startDate = $(".startDate").val();
    let endDate = $(".endDate").val();
    
    searchInfo(requesterId, startDate, endDate);
});


function searchInfo(requesterId, startDate, endDate){
    $.ajax({
		url: "/modi/request/list/" + requesterId + "/" + startDate + "/" + endDate,
		type: "GET",
		success: function(info){

            makeTbl(info);
		},
		error: function(xhr){
			alert(xhr.responseText);
			
			return false;
		}
	});
}