function getQueryVariable(variable)
{
       var query = window.location.search.substring(1);
       var vars = query.split("&");
       for (var i=0;i<vars.length;i++) {
               var pair = vars[i].split("=");
               if(pair[0] == variable){return pair[1];}
       }
       return(false);
}

function retrieveItem() {
    var xmlhttp = new XMLHttpRequest();
    var url = "../controller/search_edit_item_controller.php";

    var search = getQueryVariable("item_number");
    var property = 'ItemNumber';

    xmlhttp.onreadystatechange=function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            prepareItem(xmlhttp.responseText);
        }
    }

    xmlhttp.open("GET", url +"?search=" + search + "&property=" + property, true);
    xmlhttp.send();
}

function prepareItem(response) {
    var arr = JSON.parse(response);
    var i;

	var out="<div class='panel panel-primary'><div class='panel-heading'><div class='panel-title'>Item Number "+arr[0].ItemNumber+"</div></div><div class='panel-body'>"
	out +="<table class='table table-striped table-hover'>";
	out += "<tr>" +
	   // "<th>Item Number</th>" +
		"<th>Item Description</th>" +
		"<th>Category</th>" +
		"<th>Department Name</th>" +
		"<th>Purchase Cost</th>" +
		"<th>Full Retail Price</th>" +
		"<th>Savings</th>" +
		"</tr>";

	out += "<tr><td>" +
   // arr[i].ItemNumber+
   // "</td><td>" +
	arr[0].ItemDescription +
	"</td><td>" +
	arr[0].Category +
	"</td><td>" +
	arr[0].DepartmentName +
	"</td><td>" +
	arr[0].PurchaseCost +
	"</td><td>" +
	arr[0].FullRetailPrice +
	"</td><td>" +
	getQueryVariable("savings") +
	"</td></tr>" ;
	
    out += "</table>";
    document.getElementById("itemResultTable").innerHTML = out;
}

function retrievePromotion() {
    var xmlhttp = new XMLHttpRequest();
    var url = "../controller/search_promotion_controller.php?";
    
	var promoCode = getQueryVariable("promo_code");
	var name ="";
	var description="";
	
    if(promoCode != "")
        url += "promoCode=" + promoCode + "&";
    if(name != "")
        url += "name=" + name + "&";
    if(description != "")
        url += "description=" + description + "&";
    
    url = url.slice(0, -1);
    
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

	var out="<div class='panel panel-primary'><div class='panel-heading'><div class='panel-title'>Promotion Code "+arr[0].PromoCode+"</div></div><div class='panel-body'>"
	out +="<table class='table table-striped table-hover'>";
	out += "<tr>" +
		//"<th>Promotion Code</th>" +
		"<th>Name</th>" +
		"<th>Description</th>" +
		"<th>Amount Off</th>" +
		"<th>Promotion Type</th>" +
	"</tr>";
	out += "<tr><td>" +
   // arr[i].PromoCode +
   // "</td><td>" +
	arr[0].Name +
	"</td><td>" +
	arr[0].Description +
	"</td><td>" +
	arr[0].AmountOff +
	"</td><td>" +
	arr[0].PromoType +
	"</td></tr>";
	
    out += "</table>";
    document.getElementById("promoResultTable").innerHTML = out;
}

function retrieveAdEvent() {
    var xmlhttp = new XMLHttpRequest();
    var url = "../controller/display_item_ad_report4_controller.php?";
	
	var eventCode = getQueryVariable("event_codes");
	var arrEventCodes = decodeURIComponent(eventCode);

	url += "arrEventCodes=" + arrEventCodes;

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
	var out="<div class='panel panel-primary'><div class='panel-heading'><div class='panel-title'>Ad Events</div></div><div class='panel-body'>"
	out +="<table class='table table-striped table-hover'>";
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
    document.getElementById("adResultTable").innerHTML = out;
}