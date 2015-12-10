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

function sendData() {
    var xmlhttp = new XMLHttpRequest();
    var url = "../controller/edit_notes_controller.php";
    xmlhttp.open("POST", url, true);

    var params = "event_code=" + document.getElementById("event_code").value +
    		"&promo_code=" + document.getElementById("promo_code").value +
    		"&notes=" + document.getElementById("notes").value;

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
  			location.href = window.history.back();
		});
   	}
}

function retrieveResult() {
    var xmlhttp = new XMLHttpRequest();
    var url = "../controller/search_edit_ad_event_controller.php";

    var search = getQueryVariable("event_code");

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
    var i;
//    var eventCode = getQueryVariable("eventCode");
    var out="<table class='table table-striped table-hover'>";
    out += "<tr>" +
            "<th>Ad Event Code</th>" +
            "<th>Ad Event Name</th>" +
            "<th>Start Date</th>" +
            "<th>End Date Off</th>" +
            "<th>Ad Desctiption</th>" +
            "<th>Type</th>" +
        "</tr>";
    for(i = 0; i < arr.length; i++) {
        out += "<tr><td>" +
		"<input type='text' id='event_code' name='event_code' value='"+arr[i].eventCode+"' hidden>"+
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

function retrievePromotion() {
    var xmlhttp = new XMLHttpRequest();
    var url = "../controller/edit_display_promo_controller.php";

    var search = getQueryVariable('promo_code');
    $('#ecode').val(search);

    xmlhttp.onreadystatechange=function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            preparePromotionResult(xmlhttp.responseText);
        }
    }

    xmlhttp.open("GET", url +"?search=" + search, true);
    xmlhttp.send();

   retrieveNotes();
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
        "</tr>";
    for(i = 0; i < arr.length; i++) {
        out += "<tr><td>" +
		"<input type='text' id='promo_code' name='promo_code' value='"+arr[i].PromoCode+"' hidden>"+
        arr[i].PromoCode +
        "</td><td>" +
        arr[i].Name +
        "</td><td>" +
        arr[i].Description +
        "</td><td>" +
        arr[i].AmountOff +
        "</td><td>" +
        arr[i].PromoType +
        "</td></tr>";
    }
    out += "</table>";
    document.getElementById("resultTable").innerHTML = out;
}

function retrieveNotes()
{
	var xmlhttp = new XMLHttpRequest();
    var url = "../controller/display_ad_event_promotion_controller.php";

    var eventCode = getQueryVariable('event_code');
    var promoCode = getQueryVariable('promo_code');
    //$('#ecode').val(search);

    xmlhttp.onreadystatechange=function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            prepareNotesResult(xmlhttp.responseText);
        }
    }

    xmlhttp.open("GET", url +"?event_code=" + eventCode + "&promo_code=" + promoCode, true);
    xmlhttp.send();
}

function prepareNotesResult(response) {
    var arr = JSON.parse(response);
    //var adEventLabel = document.getElementById("eventCode").value;
    document.getElementById("notes").value = arr[0].Notes;
}