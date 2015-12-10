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
        document.getElementById("errMsg").innerHTML = "<li>Please select at least one item.</li>";
    }
    
    return box;
}

function sendToEditPage() {
    var eventCode = getQueryVariable("eventCode");
    location.href = "edit_ad_event_form_ui.html?eventCode=" + eventCode;

}

function retrieveResult() {
    var xmlhttp = new XMLHttpRequest();
    var url = "../controller/search_edit_ad_event_controller.php";

    var search = getQueryVariable("eventCode");

    xmlhttp.onreadystatechange=function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            myFunction(xmlhttp.responseText);
        }
    }

    xmlhttp.open("GET", url +"?search=" + search, true);
    xmlhttp.send();

   retrievePromotion();
}

function myFunction(response) {
    var arr = JSON.parse(response);
    var adEventLabel = document.getElementById("eventCode").value;
    document.getElementById("eventCode").innerHTML = arr[0].eventCode;
    document.getElementById("adName").innerHTML = arr[0].adName;
    document.getElementById("startDate").innerHTML = arr[0].startDate;
    document.getElementById("endDate").innerHTML = arr[0].endDate;
    document.getElementById("adDescription").innerHTML = arr[0].adDescription;
    document.getElementById("adType").innerHTML = arr[0].adType;
}

function retrievePromotion() {
    var xmlhttp = new XMLHttpRequest();
    var url = "../controller/ad_event_page_controller.php";

    var search = getQueryVariable('eventCode');
    $('#ecode').val(search);

    xmlhttp.onreadystatechange=function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            preparePromotionResult(xmlhttp.responseText);
        }
    }

    xmlhttp.open("GET", url +"?search=" + search, true);
    xmlhttp.send();

    return false;
}
function preparePromotionResult(response) {
    var arr = JSON.parse(response);
    var i;
//    var eventCode = getQueryVariable("eventCode");
    var out="<table class='table table-striped table-hover'>";
    out += "<tr>" +
            "<th>Promotion Code</th>" +
            "<th>Name</th>" +
            "<th>Description</th>" +
            "<th>Amount Off</th>" +
            "<th>Promotion Type</th>" +
            "<th>Remove</th>" +
            "<th>Notes</th>" +
        "</tr>";
        var count = arr.length;
    for(i = 0; i < arr.length; i++) {
        retrieveNotes(arr[i],  getQueryVariable("eventCode"), function(arr, note){
            out += "<tr><td>" +
            arr.PromoCode +
            "</td><td>" +
            arr.Name +
            "</td><td>" +
            arr.Description +
            "</td><td>" +
            arr.AmountOff +
            "</td><td>" +
            arr.PromoType +
            "</td><td>" +
            "<input type='checkbox' id='promotions[]' name='promotions[]' value="+ arr.PromoCode +">" +
    		"</td><td>" +
    		"<a href='edit_display_ad_event_promotion.html?event_code="+  getQueryVariable("eventCode") +
    		"&promo_code="+arr.PromoCode+"'>"+ note +"</a>" +
    		//retrieveNotes(arr[i].PromoCode,  getQueryVariable("eventCode"))+
            "</td></tr>";
            count = count - 1;
            if ( count === 0) {
                out += "</table>";
                document.getElementById("resultTable").innerHTML = out;
            }
        });
    }
}

function retrieveNotes(item, eventCode, callback)
{
	var xmlhttp = new XMLHttpRequest();
    var url = "../controller/display_ad_event_promotion_controller.php";
	
    xmlhttp.onreadystatechange=function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            callback(item, prepareNotesResult(xmlhttp.responseText));
        }
    }

    xmlhttp.open("GET", url +"?event_code=" + eventCode + "&promo_code=" + item.PromoCode, true);
    xmlhttp.send();
}

function prepareNotesResult(response) {
    var arr = JSON.parse(response);
	return arr[0].Notes;
}