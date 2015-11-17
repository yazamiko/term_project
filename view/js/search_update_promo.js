function retrievePromotion() {
    var xmlhttp = new XMLHttpRequest();
    var url = "../controller/search_update_promo_controller.php";

    var search = document.getElementById("search").value;
    var property = document.getElementById("property").value;

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
            "<th>Add to Ad Event</th>" +
        "</tr>";
    for(i = 0; i < arr.length; i++) {
        out += "<tr><td>" +
        "<a href='promo_page.html?promo_code="+ arr[i].PromoCode +"'>"+ arr[i].PromoCode +"</a>"+
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
    document.getElementById("resultTable2").innerHTML = out;
}
