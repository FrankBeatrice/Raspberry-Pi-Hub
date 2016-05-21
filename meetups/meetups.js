var MeetUpService = function(){

	var url = "https://api.meetup.com/";
	var uri = "find/groups";
	var key = "101573715c795e5932587a474b582840";


	this.getMeetUps= function(req){

		var queryURL = url + uri + "?key=" + key + "&zip=11211&radius=1&category=25&order=members&sign=true";

		$.ajax({
			url: queryURL,
			method: 'GET',
			dataType: "jsonp"
		
		}).success(function(response) {
            console.log(response);
		}).error(function(response){
		  	console.log(response);
		});
	}
};

