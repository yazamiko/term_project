function retrieveAdEvent() {
    var xmlhttp = new XMLHttpRequest();
    var url = "../controller/search_promo_ad_event_controller.php";

    var search = document.getElementById("search").value;
    var property = document.getElementById("property").value;
	
	if(property == "dates")
	{
		var temp = search.split(" to ");
			
		if(temp.length == 2 && temp[0].length == 10 && temp[1].length == 10)
		{
			var startDate = temp[0];
			var endDate = temp[1];
			
			xmlhttp.onreadystatechange=function() {
				if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
					adEventResult(xmlhttp.responseText);
				}
			}
	
			xmlhttp.open("GET", url + "?property=" + property + "&startDate=" + startDate + "&endDate=" + endDate, true);
			xmlhttp.send();
		}
	}
	else
	{
		xmlhttp.onreadystatechange=function() {
			if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
				adEventResult(xmlhttp.responseText);
			}
		}
	
		xmlhttp.open("GET", url +"?search=" + search + "&property=" + property, true);
		xmlhttp.send();
	}
	
    return false;
}

function adEventResult(response) {
    var arr = JSON.parse(response);
    var i;
    var out="<table class='table table-striped table-hover'>";
    out += "<tr>" +
            "<th>Event Code</th>" +
            "<th>Name</th>" +
            "<th>Start Date</th>" +
            "<th>End Date</th>" +
            "<th>Description</th>" +
            "<th>Type</th>" +
            "<th>Add to this Ad Event</th>" +
        "</tr>";
    for(i = 0; i < arr.length; i++) {
        out += "<tr><td>" +
		"<a href='ad_event_page.html?eventCode="+ arr[i].eventCode +"'>"+ arr[i].eventCode +"</a>" +
        "</td><td>" +
        arr[i].adName +
        "</td><td>" +
		arr[i].startDate +
        "</td><td>" +
		arr[i].endDate +
        "</td><td>" +
        arr[i].adDescription +
        "</td><td>" +
        arr[i].adType +
		"</td><td>" +
		"<center><input type='checkbox' id='adEvents[]' name='adEvents[]' value="+ arr[i].eventCode +"></center>" +
        "</td></tr>";
    }
    out += "</table>";
    document.getElementById("resultTable").innerHTML = out;
}