$(document).ready(function(){
	
    $.ajax({
        url: "/log/list",
        type: "GET",
        contentType: "application/json",
        success: function(response){
            let logs = response;

            let thead = `
                <tr>
                    <th>NO</th>
                    <th>요청자ID</th>
                    <th>요청자성명</th>
                    <th>요청부서</th>
                    <th>요청위치</th>
                    <th>사유</th>
                    <th>요청일자</th>
                    <th>담당자</th>
                    <th>수락일자</th>
                </tr>
            `;

            $(".logList thead").html(thead);

            $.each(logs, function(index, log){
                let tbody = 
                    "<tr>" + 
                        "<td>" + log.no + "</td>" + 
                        "<td>" + log.requesterId + "</td>" + 
                        "<td>" + log.requesterName + "</td>" + 
                        "<td>" + log.requesterDept + "</td>" + 
                        "<td>" + log.requesterLocation + "</td>" + 
                        "<td>" + log.reason + "</td>" + 
                        "<td>" + log.requesterDate + "</td>" + 
                        "<td>" + log.callChecker + "</td>" + 
                        "<td>" + log.acceptDate + "</td>" +
                    "</tr>";
                    $(".logList tbody").append(tbody);
            });
        },
        error: function(xhr){
            alert(xhr.responseText);
        }
    });

});