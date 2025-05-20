//옵션 불러오기
$(document).ready(function(){ 
    $.ajax({
        url: "/label/location/rackName",
        type: "GET",		
        success: function(rackNames){
            rackNames.forEach(function(rackName, index){
                let nameInfo = 
                    "<option value='" + rackName + "'>" + rackName + "</option>";
                $("#rackName").append(nameInfo);
            });
        },
        error: function(xhr){
            alert(xhr.responseText);
            
            return false;
        }
    });
});

$("#rackName").on("change", function(){
    $("#rackNumber").show();
    let rackName = $("#rackName").val();
    $.ajax({
        url: "/label/location/" + rackName + "/rackNumber",
        type: "GET",		
        success: function(rackNumbers){
            rackNumbers.forEach(function(rackNumber, index){
                let numberInfo = 
                    "<option value='" + rackNumber + "'>" + rackNumber + "</option>";
                $("#rackNumber").append(numberInfo);
            });
        },
        error: function(xhr){
            alert(xhr.responseText);
            
            return false;
        }
    });
});

$("#rackNumber").on("change", function(){
    $("#rackStage").show();
    let rackName = $("#rackName").val();
    let rackNumber = $("#rackNumber").val();
    $.ajax({
        url: "/label/location/" + rackName + "/" + rackNumber + "/rackStage",
        type: "GET",		
        success: function(rackStages){
            rackStages.forEach(function(rackStage, index){
                let stageInfo = 
                    "<option value='" + rackStage + "'>" + rackStage + "</option>";
                $("#rackStage").append(stageInfo);
            });
        },
        error: function(xhr){
            alert(xhr.responseText);
            
            return false;
        }
    });
});

$("#makeQR").on("click", function(){
    let rackName = $("#rackName").val();
    let rackNumber = $("#rackNumber").val();
    let rackStage = $("#rackStage").val();

    let locationData = {
        rackName : rackName,
        rackNumber : rackNumber,
        rackStage : rackStage
    }; 
    $.ajax({
        url: "/label/qr",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify(locationData),
        success: function(info){
            let qrCodes = info[0].qrInfo;
            let location = info[0].locations;
            let tbody = "";
            //console.log("info:", info); // 구조를 확인
            // let thead = 
            //     "<tr class='th_print'>" +
            //         "<th colspan='6'><img id='printImg' src='/img/printer.png'></th>" +
            //     "</tr>";
            // $(".infoTable thead").html(thead)
            for(let i = 0; i < qrCodes.length; i += 6){
                tbody += "<tr>";
                
                for(let j = 0; j < 6; j++){
                    if(i + j < qrCodes.length){
                        tbody += 
                            "<td>" + 
                                "<img src='data:image/png;base64," + qrCodes[i + j] + "'>" +
                                "<div class='location-info'>" + location[i + j] + "</div>" + 
                            "</td>";
                    }else{
                        tbody += "";
                    }
                }
            }
            $(".infoTable tbody").html(tbody);
        },
        error: function(xhr){
            alert(xhr.responseText);
            
            return false;
        }
    });
});

$(document).on("click", "#printImg", function(){
    window.print();
});