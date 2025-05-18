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
                let acceptDateClass = (log.acceptDate != null) ? "acceptDate-highlight" : "";
                let tbody = 
                    "<tr>" + 
                        "<td>" + log.no + "</td>" + 
                        "<td>" + log.requesterId + "</td>" + 
                        "<td class='td_requesterName'>" + log.requesterName + "</td>" + 
                        "<td>" + log.requesterDept + "</td>" + 
                        "<td>" + log.requesterLocation + "</td>" + 
                        "<td>" + log.reason + "</td>" + 
                        "<td>" + (log.requesterDate != null ? log.requesterDate.replace("T", " ") : "-") + "</td>" + 
                        "<td class='td_callChecker'>" + (log.callChecker === null ? "-" : log.callChecker) + "</td>" + 
                        "<td class='td_acceptDate "+ acceptDateClass +"'>" + (log.acceptDate != null ? log.acceptDate.replace("T", " ") : "-") + "</td>" +
                    "</tr>";
                    $(".logList tbody").append(tbody);
            });
        },
        error: function(xhr){
            alert(xhr.responseText);
        }
    });

});