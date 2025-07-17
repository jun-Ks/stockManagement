//카드 클릭 시, 위치변경 or 수량변경 할 것인지 선택
$(document).on("click", ".info-card", function(){
    let item_no = $(this).find(".item_no").val();

    showActionMenu(function(action){
        if(action === "change-location"){
            //위치변경
            modiLocation(item_no);
        }else{
            //수량변경
        }
    });
});

//위치변경 함수
function modiLocation(item_no){
    $(".modal").show();

    $(".modal-title").text("위치변경요청");

    //item_no로 위치가져오기
    $.ajax({
        url: "/stock/item/" + item_no,
        type: "GET",
        success: function (info) {
            let thead = `
                <tr>
                    <input type="hidden" value="${info.no}" class="modal-hiddenItemNo">
                    <th>품목코드</th>
                    <td>${info.itemCode}</td>
                </tr>
                <tr>
                    <th>도면번호</th>
                    <td>${info.drawingNo}</td>
                </tr>
                <tr>
                    <th>제품명</th>
                    <td>${info.itemName}</td>
                </tr>
                <tr>
                    <th>제품상태</th>
                    <td>${info.status}</td>
                </tr>
                <tr>
                    <th>비고</th>
                    <td>${info.note}</td>
                </tr>
                <tr>
                    <th>현 수량</th>
                    <td>${info.calculatedQuantity}</td>
                </tr>
            `
            $(".modal-table thead").html(thead)

            let tbody = `
                <tr>
                    <th>현 위치</th>
                    <td class="modal-td_location">${info.location}</td>
                </tr>
                <tr>
                    <th class="modal-th_modiLoation">변경 요청 <br>위치</th>
                    <td class="modal-td_modiLocation">
                        <select class="rackName"></select> - 
                        <select class="rackNumber"></select> - 
                        <select class="rackStage"></select>
                    </td>
                </tr>
            `;
            $(".modal-table tbody").html(tbody);
            
            //변경 할 위치에 select box 넣기
            let addedRow = $(".modal-table tbody tr").last();
            selectLocation(addedRow);

            //확인버튼에 data-type 넣어줘서 위치변경인거 확인가능하게하기
            $(".modal-requestBtn").attr("data-type", "modiLocation");
        },
        error: function (xhr) {
            alert(xhr.responseText);

            return false;
        }
    });
}

function showActionMenu(callback) {
  Swal.fire({
    title: '어떤 작업을 요청하시겠어요?',
    icon: 'question',
    showCancelButton: false,
    showConfirmButton: false,
    html: `
      <div class="custom-action-container">
        <button class="swal2-confirm swal2-styled action-btn" data-action="change-location">
            위치변경
        </button>
        <button class="swal2-confirm swal2-styled action-btn" data-action="change-quantity">
            수량변경
        </button>
      </div>
    `,
    didOpen: () => {
      document.querySelectorAll('.action-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const action = btn.getAttribute('data-action');
          Swal.close();
          callback(action);
        });
      });
    }
  });
}

//수정요청위치
function selectLocation(row){
	const rackNames = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n', 'o'];
	const rackNumberMap = {
		a: 14,
		b: 12, c: 12, d: 12, e: 12, f: 12,
		g: 13,
		h: 12, i: 12, j: 12,
		k: 4,
		l: 6, m: 6,
		n: 2,
		o: 16
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
		} else if (['k','l','m','n', 'o'].includes(selectedRack)) {
			floors = ['1F', '2F', '3F', '4F', '5F'];
		}

		$.each(floors, function(index, floor) {
			$rackStage.append(`<option value="${floor}">${floor}</option>`);
		});
	});
}

//요청 확인
$(document).on("click", ".modal-requestBtn", function(){
    let data_type = $(this).data("type");
    let no = $(".modal-hiddenItemNo").val();
    
    let isTest = true;
    let data = "";
    let requestLocation = "";
    //위치변경
    if(data_type === "modiLocation"){
        let currentLocation = $(".modal-td_location").text();
        let rackName = $(".rackName").val().toUpperCase();
        let rackNumber = $(".rackNumber").val();
        let rackStage = $(".rackStage").val().toUpperCase();
        requestLocation = rackName + "-" + rackNumber + "-" + rackStage;

        //유효성검사
        const hasRackName = rackName !== "NULL";
		const hasRackNumber = rackNumber !== "NULL";
		const hasRackStage = rackStage !== "NULL";

        //빈칸검사
        if(!hasRackName || !hasRackNumber || !hasRackStage){
            showFailToast("요청 위치가 선택되지 않았습니다.");
            isTest = false;
            return false;
        }

        //현위치 === 요청위치 같을경우
        if(currentLocation === requestLocation){
            showFailToast("현 위치와 요청 위치가 같습니다.");
            isTest = false;
            return false;
        }

        //위치정보 담아보내기
    }
    if(isTest){
        $.ajax({
            url: "/stock/" + data_type + "/" + no,
            type: "PUT",
            contentType: "application/json",  // JSON으로 보내기
            data: JSON.stringify({ 
                requesterId: $("#userId").text(),
                modiLocation: requestLocation
             }),  // JSON 형식으로 감싸서 전송
            success: function(info){
                
            },
            error: function(xhr){
                alert(xhr.responseText);
                
                return false;
            }
        });
    }
})
