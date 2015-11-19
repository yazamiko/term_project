function sendData() {
    var xmlhttp = new XMLHttpRequest();
    var url = "../controller/item_form_controller.php";
    xmlhttp.open("POST", url, true);

    var params = "item_number=" + document.getElementById("item_number").value +
    		"&item_desc=" + document.getElementById("item_desc").value +
    		"&category=" + document.getElementById("category").value +
    		"&dept_name=" + document.getElementById("dept_name").value +
    		"&purchase_cost=" + document.getElementById("purchase_cost").value +
    		"&full_retail_price=" + document.getElementById("full_retail_price").value;

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

   	if(arr.status) {
   		$( "#modalButton" ).click(function() {
  			location.reload();
		});
   	}
}

/*
	VALIDATE FUNCTIONS
*/
function checkItemNumber(itemNumber) {
	var response = {validate: true, errMsg: ""};
	if(/^[1-9][0-9]{5,}$/.test(itemNumber)) {
		return response;
	} else {
		response.validate = false;
		response.errMsg = "<li>Item number must have more than 6 digits and start from 1 to 9</li>";
		return response;
	}
}
function checkItemDescription(itemDesc) {
	var response = {validate: true, errMsg: ""};
	if(/^.{3,50}$/.test(itemDesc)) {
		return response;
	} else {
		response.validate = false;
		response.errMsg = "<li>Item description must have more than 3 characters and less than 50</li>";
		return response;
	}
}
function checkCategory(category) {
	var response = {validate: true, errMsg: ""};
	if(/^[A-Za-z]+([\-\/ ][A-Za-z]*)?$/.test(category)) {
		return response;
	} else {
		response.validate = false;
		response.errMsg = "<li>Category must have only letters, slash or space</li>";
		return response;
	}
}
function checkDepartmentName(deptName) {
	var response = {validate: true, errMsg: ""};
	if(/^[A-Za-z]+([\-\/ ][A-Za-z]*)?$/.test(deptName)) {
		return response;
	} else {
		response.validate = false;
		response.errMsg = "<li>Department Name must have only letters, slash or space</li>";
		return response;
	}
}
function checkPurchaseCost(purchaseCost) {
	var response = {validate: true, errMsg: ""};
	if(/^\d+\.\d{2}$/.test(purchaseCost)) {
		return response;
	} else {
		response.validate = false;
		response.errMsg = "<li>Purchase cost must contain only numbers followed by period and 2 digits after the period</li>";
		return response;
	}
}
function checkFullRetailPrice(fullRetailPrice) {
	var response = {validate: true, errMsg: ""};
	if(/^\d+\.\d{2}$/.test(fullRetailPrice)) {
		return response;
	} else {
		response.validate = false;
		response.errMsg = "<li>Full retail price must contain only numbers followed by period and 2 digits after the period</li>";
		return response;
	}
}

function validateForm() {
	var validate = true;
	var errMsg = "";

	//get item number from form input
	var itemNumber = document.getElementById("item_number").value;
	//check  item number and get response
	itemNumberResponse = checkItemNumber(itemNumber);
	if (itemNumberResponse.validate == false) {
		validate = false;
		errMsg += itemNumberResponse.errMsg;
	}
	//get item description from form input
	var itemDesc = document.getElementById("item_desc").value;
	//check  item description and get response
	itemDescResponse = checkItemDescription(itemDesc);
	if(itemDescResponse.validate == false) {
		validate = false;
		errMsg += itemDescResponse.errMsg;
	}
	//get category from form input
	var category = document.getElementById("category").value;
	//check category and get response
	categoryResponse = checkCategory(category);
	if (categoryResponse.validate == false) {
		validate = false;
		errMsg += categoryResponse.errMsg;
	}
	//get department name from form input
	var deptName = document.getElementById("dept_name").value;
	//check department name and get response
	deptNameResponse = checkDepartmentName(deptName);
	if (deptNameResponse.validate == false) {
		validate = false;
		errMsg += deptNameResponse.errMsg;
	}
	//get purchase cost from form input
	var purchaseCost = document.getElementById("purchase_cost").value;
	//check purchase cost and get response
	purchaseCostResponse = checkPurchaseCost(purchaseCost);
	if (purchaseCostResponse.validate == false) {
		validate = false;
		errMsg += purchaseCostResponse.errMsg;
	}
	//get full retail price from form input
	var fullRetailPrice = document.getElementById("full_retail_price").value;
	//check full retail price and get response
	fullRetailPriceResponse = checkFullRetailPrice(fullRetailPrice);
	if (fullRetailPriceResponse.validate == false) {
		validate = false;
		errMsg += fullRetailPriceResponse.errMsg;
	}

	if (validate == false) {
		document.getElementById("headErrMsg").innerHTML 
			= "Correct the following errors:";
		document.getElementById("errMsg").innerHTML = errMsg;
	} else {
		sendData();
	}

	return false;
}
function clearAll()
{
	document.getElementById("headErrMsg").innerHTML = "";
		document.getElementById("errMsg").innerHTML = "";
}