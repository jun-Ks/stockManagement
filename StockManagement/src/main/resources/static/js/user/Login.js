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

$('#userId, #userPw').on('keydown', function(e){
      if(e.key === 'Enter' || e.keyCode === 13){
        $('#login').click();
      }
});


