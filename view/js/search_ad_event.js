function checkBoxChecked()
{
	var checkedAtLeastOne = false;
	$('input[type="checkbox"]').each(function() {
		if ($(this).is(":checked")) {
			checkedAtLeastOne = true;
		}
	});
	return checkedAtLeastOne;
}

function validate()
{
	var box = checkBoxChecked();
	if(box == false)
	{
		document.getElementById("headErrMsg").innerHTML 
			= "Correct the following error:";
		document.getElementById("errMsg").innerHTML = "<li>Please select at least one ad event.</li>";
	}
	
	return box;
}

function retrieveAdEvent() {
    var xmlhttp = new XMLHttpRequest();
    var url = "../controller/search_ad_event_controller.php?";
	
	var eventCode = document.getElementById("event_code").value;
	var eventName = document.getElementById("event_name").value;
	var startDate = document.getElementById("start_date").value;
	var endDate = document.getElementById("end_date").value;
	var desc = document.getElementById("ad_description").value;

	if(eventCode != "")
		url += "eventCode=" + eventCode + "&";
	if(eventName != "")
		url += "eventName=" + eventName + "&";
	if(startDate != "")
		url += "startDate=" + startDate + "&";
	if(endDate != "")
		url += "endDate=" + endDate + "&";
	if(desc != "")
		url += "desc=" + desc + "&";
	
	url = url.slice(0, -1);
		
	document.getElementById("headErrMsg").innerHTML = "";
	document.getElementById("errMsg").innerHTML = "";
	
	xmlhttp.onreadystatechange=function() {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			adEventResult(xmlhttp.responseText);
		}
	}
		
	xmlhttp.open("GET", url, true);
	xmlhttp.send();
	
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
            "<th>Select Ad Event(s)</th>" +
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