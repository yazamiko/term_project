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
		document.getElementById("errMsg").innerHTML = "<li>Please select at least one promotion.</li>";
	}
	
	return box;
}

function retrieveAdEvent() {
    var xmlhttp = new XMLHttpRequest();
    var url = "../controller/display_ad_event_controller.php";
		
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
        "</tr>";
    for(i = 0; i < arr.length; i++) {
        out += "<tr><td>" +
		arr[i].eventCode +
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
		"</td></tr>";
    }
    out += "</table>";
    document.getElementById("adEventTable").innerHTML = out;
}

function retrievePromotion() {
    var xmlhttp = new XMLHttpRequest();
    var url = "../controller/search_promotion_controller.php?";
	
	var promoCode = document.getElementById("promoCode").value;
	var name = document.getElementById("name").value;
	var description = document.getElementById("description").value;

	if(promoCode != "")
		url += "promoCode=" + promoCode + "&";
	if(name != "")
		url += "name=" + name + "&";
	if(description != "")
		url += "description=" + description + "&";
	
	url = url.slice(0, -1);
	
	document.getElementById("headErrMsg").innerHTML = "";
	document.getElementById("errMsg").innerHTML = "";
	
    xmlhttp.onreadystatechange=function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            preparePromotionResult(xmlhttp.responseText);
        }
    }

    xmlhttp.open("GET", url, true);
    xmlhttp.send();

    return false;
}
function preparePromotionResult(response) {
    var arr = JSON.parse(response);
    var i;
    var out="<table class='table table-striped table-hover'>";
    out += "<tr>" +
            "<th>Promotion Code</th>" +
            "<th>Name</th>" +
            "<th>Description</th>" +
            "<th>Amount Off</th>" +
            "<th>Promotion Type</th>" +
            "<th>Select Promotion(s)</th>" +
        "</tr>";
    for(i = 0; i < arr.length; i++) {
        out += "<tr><td>" +
        arr[i].PromoCode +
        "</td><td>" +
        arr[i].Name +
        "</td><td>" +
        arr[i].Description +
        "</td><td>" +
        arr[i].AmountOff +
        "</td><td>" +
        arr[i].PromoType +
        "</td><td>" +
        "<center><input type='checkbox' id='promoCodes[]' name='promoCodes[]' value="+ arr[i].PromoCode +"></center>"+
        "</td></tr>";
    }
    out += "</table>";
    document.getElementById("resultTable").innerHTML = out;
}