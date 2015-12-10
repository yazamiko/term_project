
function retrieveResult() {
    var xmlhttp = new XMLHttpRequest();
    var url = "../controller/top_50_report_controller.php";

    xmlhttp.onreadystatechange=function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            myFunction(xmlhttp.responseText);
        }
    }

    xmlhttp.open("GET", url, true);
    xmlhttp.send();

    return false;
}

function myFunction(response) {
    var arr = JSON.parse(response);
    var i;
    var out="<table class='table table-striped table-hover'>";
    out += "<tr>" +
            "<th>Item Number</th>" +
            "<th>Promotion Code</th>" +
            "<th>Full Retail Price</th>" +
            "<th>Sale Price</th>" +
            "<th>Savings</th>" +
            "<th>Event Codes</th>" +
        "</tr>";
    for(i = 0; i < arr.length; i++) {
        out += "<tr><td>" +
        "<a href='display_item_report4.html?item_number="+ arr[i].ItemNumber +"&promo_code="+
				arr[i].PromoCode+"&savings="+arr[i].Savings+"&event_codes="+arr[i].EventCodes+"'>"+ arr[i].ItemNumber +"</a>" +
        //arr[i].ItemNumber +
        "</td><td>" +
        arr[i].PromoCode +
        "</td><td>" +
        arr[i].FullRetailPrice +
        "</td><td>" +
        arr[i].SalePrice +
		"</td><td>" +
        arr[i].Savings +
		"</td><td>" +
        arr[i].EventCodes +
       // "</td><td>" +
       // "<a href='edit_display_ad_event_promotion.html?event_code="+ arr[i].EventCode +"&promo_code="+ arr[i].PromoCode +"'>Edit</a>" +
        "</td></tr>" ;
    }
    out += "</table>";
    document.getElementById("resultTable").innerHTML = out;
}
