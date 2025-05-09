$("#login").on("click", function(){
	let userId = $("#userId").val().toUpperCase();
	let userPw = $("#userPw").val();
	
	$.ajax({
		url: "/user",
		type: "POST",
		data:{
			id: userId,
			pw: userPw
		},
		success: function(response){
			location.href = response;
		},
		error: function(xhr){
			alert(xhr.responseText);
			
			return false;
		}
	});
})

$("#call-erpteam").on("click", function(){
	alert("hi")
});