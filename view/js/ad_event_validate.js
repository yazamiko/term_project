function sendData() {
    var xmlhttp = new XMLHttpRequest();
    var url = "../controller/ad_event_controller.php";
    xmlhttp.open("POST", url, true);

    var params = "event_code=" + document.getElementById("event_code").value +
    		"&event_name=" + document.getElementById("event_name").value +
    		"&start_date=" + document.getElementById("start_date").value +
    		"&end_date=" + document.getElementById("end_date").value +
    		"&ad_description=" + document.getElementById("ad_description").value +
    		"&ad_type=" + document.getElementById("ad_type").value;

    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    xmlhttp.onreadystatechange=function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        	alert(xmlhttp.responseText)
            getSubmitStatus(xmlhttp.responseText);
        }
    }

    xmlhttp.send(params);
}

function getSubmitStatus(response) {
    var arr = JSON.parse(response);
    $('#msgModal').html(arr.msg);
    $('#myModal').modal('show');

   	if(arr.status) {
   		$( "#modalButton" ).click(function() {
  			location.href = "../view/display_ad_event.html?eventCode=" + document.getElementById("event_code").value;
		});
   	}
}

/*
	VALIDATE FUNCTIONS
*/

function checkEventCode()
{
	var eCode = document.getElementById("event_code").value;
	
	var response = {validation: true, errMsg: ""};
	if(/^[A-Z0-9]{3,25}$/.test(eCode))
	{
		return response;
	}
	else
	{
		response.validation = false;
		response.errMsg = "<li>Ad event code must be more than 3 and less than 25 alpha-numeric characters.</li>";
		return response;
	}
}

function checkName()
{
	var adName = document.getElementById("event_name").value;
	
	var response = {validation: true, errMsg: ""};
	if(/^.{3,50}$/.test(adName))
	{
		return response;
	}
	else
	{
		response.validation = false;
		response.errMsg = "<li>Ad event name must have at least 3 characters and no more than 50.</li>";
		return response;
	}
}

function checkDates()
{
	var startDate = document.getElementById("start_date").value;
	var endDate = document.getElementById("end_date").value;
	
	var response = {validation: true, errMsg: ""};
	
	if(validDate(startDate) == false)
	{
		response.validation = false;
		response.errMsg += "<li>The start date is formatted wrong. Must be YYYY-MM-DD</li>";
	}
	if(validDate(endDate) == false)
	{
		response.validation = false;
		response.errMsg += "<li>The end date is formatted wrong. Must be YYYY-MM-DD</li>";
	}
	if(response.errMsg == "")
	{
		var start = Date.parse(startDate);
		var end = Date.parse(endDate);
		
		if(start > end)
		{
			response.validation = false;
			response.errMsg += "<li>The start date is after the end date.</li>";
		}
	}
	return response;
}

function validDate(date)
{	
	if(!(/^[\d]{4}\-[\d]{2}\-[\d]{2}$/.test(date)))
		return false;
	
	var parts = date.split("-");
	var month = parseInt(parts[1], 10);
	var day = parseInt(parts[2], 10);
	var year = parseInt(parts[0], 10);
	
	
	if((year < 2015) || (month < 0) || (month > 12))
		return false;
	
	var monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
	
	return day > 0 && day <= monthDays[month - 1];
	
}

function checkDescription()
{
	var desc = document.getElementById("ad_description").value;
	
	var response = {validation: true, errMsg: ""};
	if(/^.{3,50}$/.test(desc))
	{
		return response;
	}
	else
	{
		response.validation = false;
		response.errMsg = "<li>Ad event description must have at least 3 characters and no more than 50</li>";
		return response;
	}
}

function checkType()
{
	var adType = document.getElementById("ad_type").value;
	
	var response = {validation: true, errMsg: ""};
	if(/^[A-Za-z]{0,20}$/.test(adType))
	{
		return response;
	}
	else
	{
		response.validation = false;
		response.errMsg = "<li>Ad type must contain only letters and have no more than 20 characters.</li>";
		return response;
	}
}

function validate()
{
	var test = true;
	var errMsg = "";

	var codeResponse = checkEventCode();
	if(codeResponse.validation == false)
	{
		test = false;
		errMsg += codeResponse.errMsg;
	}

	var nameResponse = checkName();
	if(nameResponse.validation == false)
	{
		test = false;
		errMsg += nameResponse.errMsg;
	}
	
	var dateResponse = checkDates();
	if(dateResponse.validation == false)
	{
		test = false;
		errMsg += dateResponse.errMsg;
	}
	
	var descResponse = checkDescription();
	if(descResponse.validation == false)
	{
		test = false;
		errMsg += descResponse.errMsg;
	}

	var typeResponse = checkType();
	if(typeResponse.validation == false)
	{
		test = false;
		errMsg += typeResponse.errMsg;
	}

	if(test == false)
	{
		document.getElementById("headErrMsg").innerHTML 
			= "Correct the following errors:";
		document.getElementById("errMsg").innerHTML = errMsg;
	}
	else {
		sendData();
	}
	
	return false;
}

function clearAll()
{
	document.getElementById("headErrMsg").innerHTML = "";
		document.getElementById("errMsg").innerHTML = "";
}