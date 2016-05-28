var MeetUpService = function(){

	var url = "https://api.meetup.com/";
	var uri = "2/open_events";
	var key = "101573715c795e5932587a474b582840";


	this.getMeetUps= function(req){

		if(!req.radius)
			req.radius = 5

		var queryURL = url + uri + 
						"?key=" + key + 
						"&zip=" + req.zip +
						"&text=" + req.text +
						"&sign=true";

   	return $.ajax({
			url: queryURL,
			method: 'GET',
			dataType: "jsonp"
		
		}).then(function(res) {
            
            console.log(res);

         	var meetUps = [];
         	var results = res.results;
         	var limit = 10;

         	if (results.length < 10) {
         		limit = results.length;
         	}

        	for (var i = 0; i < limit; i++) {
            
            	var meetUpObject = {
            		name: results[i].name,
            		//phone: results[i].venue.phone,
            		event: results[i].event_url,
            		//address_1: results[i].venue.address_1,
            		//address_2: results[i].venue.address_2,
            		//city: results[i].venue.city,
            		//state: results[i].venue.state,
            		//zip: results[i].venue.zip,
            		lat: results[i].group.group_lat,
            		lon: results[i].group.group_lon

            	};

            	meetUps.push(meetUpObject);
			}
            
            return meetUps;

		});
	}
};




