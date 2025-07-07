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
			"<th class='th_location'>위치</th>"+
			"<th class='th_requestQuantity'>수량</th>" +
			"<th class='th_requestDate'>요청일</th>" +
        "</tr>";
            

	$(".purchaseList thead").html(thead);

	let tbody = ""; 

    let isApproval = "background-color: lightgrey";
    
	if(info.length > 0){
        for(let i = 0; i < info.length; i++){
            let isApprovalStyle = info[i].approval === 1 ? isApproval : "";
			tbody +=
				"<tr style='" + isApprovalStyle + "'>" +
                    "<input type='hidden' class='hidden_no' value='" + info[i].no + "'>" + 
					"<td class='td_itemName ellipsis'>" + info[i].itemName + "</td>" +
					"<td class='td_drawingNo ellipsis'>" + info[i].drawingNo + "</td>" +
					"<td class='td_location'>" + info[i].location + "</td>" + 
					"<td class='td_quantity'>" + info[i].requestQuantity + "</td>" +
					"<td class='td_deliveryDate'>" + info[i].insertDate.split("T")[0].substring(2)  + "</td>" +
				"</tr>";
		}
	}else{
		tbody = 
			`<tr>
				<td colspan='5'> 요청 데이터가 없습니다. </td>
			</tr>`;
	}
	
	$(".purchaseList tbody").html(tbody);
}

//리스트 클릭 시 상세내용 보이기
$(document).on("click", ".purchaseList tbody tr", function(){
    let no = $(this).find(".hidden_no").val();
    
     $.ajax({
        url: "/stock/request/no/" + no,
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
    let td_requestQuantity = info.requestQuantity;
    let td_location = info.location;
    let td_approval = info.approval  === 1 ? "승인" : "미승인";
    let td_insertDate = info.insertDate.replace("T", " ");

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
            <th>위치</th><td>${td_location}</td>
        </tr>
        <tr>
            <th>요청수량</th><td>${td_requestQuantity}</td>
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

$(".search_btn").on("click", function(){
    let requesterId = $("#userId").text();
    let startDate = $(".startDate").val();
    let endDate = $(".startDate").val();
    
    searchInfo(requesterId, startDate, endDate);
});

function searchInfo(requesterId, startDate, endDate){
    $.ajax({
		url: "/stock/request/list/requester/" + requesterId + "/" + startDate + "/" + endDate,
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