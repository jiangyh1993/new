(function(){
	'use strict';

	$.get('/api/user',function(users){
		var cnt = '<tbody><tr><th></th><th></th></tr>';
		users.forEach(function(user){
			cnt += '<tr><td>' + user.firstName + '</td><td>' + user.lastName +'</td></tr>';
		});
		cnt += '</tbody>'
		$('#cnt').html(cnt);
	})
})()
