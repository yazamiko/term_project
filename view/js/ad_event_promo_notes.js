function sendData() {
    var xmlhttp = new XMLHttpRequest();
    var url = "../controller/add_multiple_ad_events_promotion_controller.php";
    xmlhttp.open("POST", url, true);

    var params = "notes=" + document.getElementById("notes").value;

    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    xmlhttp.onreadystatechange=function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            getSubmitStatus(xmlhttp.responseText);
        }
    }

    xmlhttp.send(params);
}

function getSubmitStatus(response) {
    var arr = JSON.parse(response);
    $('#msgModal').html(arr.msg);
    $('#myModal').modal('show');

	$( "#modalButton" ).click(function() {
		if(arr.status == false)
			location.href = window.history.back();
		else if(arr.status == true)
			location.href = "../view/display_ad_event_promotion.html";
	});
 }

function noNotes()
{
	document.getElementById("notes").value = "";
	sendData();
}

/*
	VALIDATE FUNCTIONS
*/

function checkNotes()
{
	var notes = document.getElementById("notes").value;
	
	var response = {validation: true, errMsg: ""};
	if(/^.{0,50}$/.test(notes))
	{
		return response;
	}
	else
	{
		response.validation = false;
		response.errMsg = "<li>Notes must be less than 50 alpha-numeric characters.</li>";
		return response;
	}
}

function validate()
{
	var test = true;
	var errMsg = "";

	var notesResponse = checkNotes();
	if(notesResponse.validation == false)
	{
		test = false;
		errMsg += notesResponse.errMsg;
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