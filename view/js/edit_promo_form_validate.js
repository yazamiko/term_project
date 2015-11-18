function sendData() {
    var xmlhttp = new XMLHttpRequest();
    var url = "../controller/edit_promo_form_controller.php";
    xmlhttp.open("POST", url, true);

    var params = "name=" + document.getElementById("name").value +
    		"&description=" + document.getElementById("description").value +
    		"&amount_off=" + document.getElementById("amount_off").value +
    		"&promo_type=" + document.getElementById("promo_type").value

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
  			 location.href='search_update_promo.html';
		});
   	}
}

/*
	VALIDATE FUNCTIONS
*/

function checkName(name) {
	var response = {validate: true, errMsg: ""};
	if(/([A-Za-z]*(\s)?.{1,35})$|^((\$)(\s)?(\d(\.\d{2}))[A-Za-z]*)+$|^(\d{2}\%(\s)?[A-Za-z]*)+$/.test(name)) {
		return response;
	} else {
		response.validate = false;
		response.errMsg = "<li>Promotion name can start with letters, '$' sign followed by numbers and letters, or numbers followed by '%' sign which is followed by letters</li>";
		return response;
	}
}

function checkDescription(description) {
	var response = {validate: true, errMsg: ""};
	if(/^([A-Za-z]*(\s)?.{1,35})$|^((\$)(\s)?(\d(\.\d{2}))[A-Za-z]*)+$|^(\d{2}\%(\s)?[A-Za-z]*)+$/.test(description)) {
		return response;
	} else {
		response.validate = false;
		response.errMsg = "<li>Description can start with letters, '$' sign followed by numbers and letters, or numbers followed by '%' sign which is followed by letters</li>";
		return response;
	}
}

function checkAmountOff(amountOff) {
	var response = {validate: true, errMsg: ""};
	if(/^(\d{1}(\.\d{2})?)$|^(\.\d{2})$/.test(amountOff)) {
		return response;
	} else {
		response.validate = false;
		response.errMsg = "<li>Amount off must be 1 digit followed by decimal which is followed by 2 digits, or a decimal followed by 2 digits </li>";
		return response;
	}
}

function checkPromoType(promoType) {
	var response = {validate: true, errMsg: ""};
	response.validate = true;
	return response;
}

function validateForm() {
	var validate = true;
	var errMsg = "";

	//get item description from form input
	var name = document.getElementById("name").value;
	//check  item description and get response
	nameResponse = checkName(name);
	if(nameResponse.validate == false) {
		validate = false;
		errMsg += nameResponse.errMsg;
	}
	//get category from form input
	var description = document.getElementById("description").value;
	//check category and get response
	descriptionResponse = checkDescription(description);
	if (descriptionResponse.validate == false) {
		validate = false;
		errMsg += descriptionResponse.errMsg;
	}
	//get purchase cost from form input
	var amountOff = document.getElementById("amount_off").value;
	//check purchase cost and get response
	amountOffResponse = checkAmountOff(amountOff);
	if (amountOffResponse.validate == false) {
		validate = false;
		errMsg += amountOffResponse.errMsg;
	}

	//get purchase cost from form input
	var promoType = document.getElementById("promo_type").value;
	//check purchase cost and get response
	promoTypeResponse = checkPromoType(promoType);
	if (promoTypeResponse.validate == false) {
		validate = false;
		errMsg += promoTypeResponse.errMsg;
	}

	if (validate == false) {
		document.getElementById("headErrMsg").innerHTML 
			= "Please correct the following errors:";
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
