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

function sendToEditPage() {
    var eventCode = getQueryVariable("eventCode");
    location.href = "edit_ad_event_form_ui.html?eventCode=" + eventCode;

}

function retrieveResult() {
    var xmlhttp = new XMLHttpRequest();
    var url = "../controller/search_edit_ad_event_controller.php";

    var search = getQueryVariable("eventCode");
    var property = 'EventCode';

    xmlhttp.onreadystatechange=function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            myFunction(xmlhttp.responseText);
        }
    }

    xmlhttp.open("GET", url +"?search=" + search + "&property=" + property, true);
    xmlhttp.send();
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
    var url = "../controller/search_promotion_controller.php";

    var search = document.getElementById("search").value;
    var property = document.getElementById("property").value;

    xmlhttp.onreadystatechange=function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            preparePromotionResult(xmlhttp.responseText);
        }
    }

    xmlhttp.open("GET", url +"?search=" + search + "&property=" + property, true);
    xmlhttp.send();
}
function preparePromotionResult(response) {
    var arr = JSON.parse(response);
    var i;
    var eventCode = getQueryVariable("eventCode");
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
        "<a href=../controller/add_multiple_ad_events_promotion_controller.php?eventCode="
        + eventCode +"&promo_code="+ arr[i].PromoCode +">Add</a>"+
        "</td></tr>";
    }
    out += "</table>";
    document.getElementById("resultTable").innerHTML = out;
}