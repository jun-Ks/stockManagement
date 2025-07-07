const currentPath = window.location.pathname;

$(document).ready(function(){
    if(currentPath === "/m/menu"){
        $(".goToMenu").hide()
    }
})

$(".goToMenu").on("click", function(){
    location.href = "/m/menu";
})

$("#logout").on("click", function(){
    $("#logoutForm").submit();
});