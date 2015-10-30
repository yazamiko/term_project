function checkEventCode(eventCode) {
	var response = {validate: true, errMsg: ""};
	if(/^([A-Za-z0-9]){3,15}$/.test(eventCode)) {
		return response;
	} else {
		response.validate = false;
		response.errMsg = "<li>Event Code must contain only letter and number</li>";
		return response;
	}
}

function checkName(name) {
	var response = {validate: true, errMsg: ""};
	if(/^.{3,50}$/.test(name)) {
		return response;
	} else {
		response.validate = false;
		response.errMsg = "<li>Name must contain more than 3 and less than 50 characters</li>";
		return response;
	}
}

function checkStartDate(startDate) {
	var response = {validate: true, errMsg: ""};
	if(/^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/.test(startDate)) {
		return response;
	} else {
		response.validate = false;
		response.errMsg = "<li>Start date format: mm/dd/yyyy</li>";
		return response;
	}
}

function checkEndDate(endDate) {
	var response = {validate: true, errMsg: ""};
	if(/^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/.test(endDate)) {
		return response;
	} else {
		response.validate = false;
		response.errMsg = "<li>End date format: mm/dd/yyyy</li>";
		return response;
	}
}

function checkEndAfterStart(start, end) {
	var response = {validate: true, errMsg: ""};
	if(start[0] > end[0]) {
		response.validate = false;
		response.errMsg = "<li>Start Date should be before the End Date</li>";
	} else {
		if(start[1] > end[1] && start[0] == end[0]) {
			response.validate = false;
			response.errMsg = "<li>Start Date should be before the End Date</li>";
		} else {
			if(start[2] > end[2] && start[1] == end[1]) {
				response.validate = false;
				response.errMsg = "<li>Start Date should be before the End Date</li>";
			}
		}
	}
	return response;
}

function checkDescription(description) {
	var response = {validate: true, errMsg: ""};
	if(/^.{3,50}$/.test(description)) {
		return response;
	} else {
		response.validate = false;
		response.errMsg = "<li>Description must contain more than 3 and less than 50 characters</li>";
		return response;
	}
}

function checkAdType(adType) {
	var response = {validate: true, errMsg: ""};
	if(/^[A-Za-z]{3,11}$/.test(adType)) {
		return response;
	} else {
		response.validate = false;
		response.errMsg = "<li>Ad Type must contain only letters</li>";
		return response;
	}
}

function validateForm() {
	var validate = true;
	var errMsg = "";

	//get event code from form input
	var eventCode = document.getElementById("event_code").value;
	//check  event code and get response
	eventCodeResponse = checkEventCode(eventCode);
	if (eventCodeResponse.validate == false) {
		validate = false;
		errMsg += eventCodeResponse.errMsg;
	}
	//get name from form input
	var name = document.getElementById("name").value;
	//check  name and get response
	nameResponse = checkName(name);
	if (nameResponse.validate == false) {
		validate = false;
		errMsg += nameResponse.errMsg;
	}
	//get start date from form input
	var startDate = document.getElementById("start_date").value;
	//check start date and get response
	startDateResponse = checkStartDate(startDate);
	if (startDateResponse.validate == false) {
		validate = false;
		errMsg += startDateResponse.errMsg;
	}

	//get end date from form input
	var endDate = document.getElementById("end_date").value;
	//check end date and get response
	endDateResponse = checkEndDate(endDate);
	if (endDateResponse.validate == false) {
		validate = false;
		errMsg += endDateResponse.errMsg;
	}

	//check id start date is before end date
	dataStartDate = startDate.split("-");
	dataEndDate = endDate.split("-");
	endAfterStartResponse = checkEndAfterStart(dataStartDate, dataEndDate);
	if (endAfterStartResponse.validate == false) {
		validate = false;
		errMsg += endAfterStartResponse.errMsg;
	}
	//get description from form input
	var description = document.getElementById("description").value;
	//check description and get response
	descriptionResponse = checkDescription(description);
	if (descriptionResponse.validate == false) {
		validate = false;
		errMsg += descriptionResponse.errMsg;
	}
	
	//get description from form input
	var adType = document.getElementById("ad_type").value;
	//check description and get response
	adTypeResponse = checkAdType(adType);
	if (adTypeResponse.validate == false) {
		validate = false;
		errMsg += adTypeResponse.errMsg;
	}
	
	if (validate == false) {
		document.getElementById("headErrMsg").innerHTML 
			= "Correct the following errors:";
		document.getElementById("errMsg").innerHTML = errMsg;
	}

	return validate;
}