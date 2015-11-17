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
	if(document.getElementById("resultTable").innerHTML == "")
	{
		document.getElementById("headErrMsg").innerHTML 
			= "Correct the following errors:";
		document.getElementById("errMsg").innerHTML = "<li>Please search for something first.</li>";
		return false;
	}
	
	var box = checkBoxChecked();
	if(box == false)
	{
		document.getElementById("headErrMsg").innerHTML 
			= "Correct the following errors:";
		document.getElementById("errMsg").innerHTML = "<li>Please select at least one promotion.</li>";
	}
	
	return box;
}

function retrievePromotion() {
    var xmlhttp = new XMLHttpRequest();
    var url = "../controller/search_promotion_controller.php";

    var search = document.getElementById("search").value;
    var property = document.getElementById("property").value;
	
	document.getElementById("headErrMsg").innerHTML 
				= "";
	document.getElementById("errMsg").innerHTML = "";
	
    xmlhttp.onreadystatechange=function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            preparePromotionResult(xmlhttp.responseText);
        }
    }

    xmlhttp.open("GET", url +"?search=" + search + "&property=" + property, true);
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
            "<th>Add to this Promotion</th>" +
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