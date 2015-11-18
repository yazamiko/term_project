function retrievePromotion() {
    var xmlhttp = new XMLHttpRequest();
    var url = "../controller/search_promotion_controller.php?";
    
    var promoCode = document.getElementById("promoCode").value;
    var name = document.getElementById("name").value;
    var description = document.getElementById("description").value;

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
        "<a href='../controller/add_multiple_items_promotion_controller.php?promo_code="+ arr[i].PromoCode +"'>Add</a>"+
        "</td></tr>";
    }
    out += "</table>";
    document.getElementById("resultTable").innerHTML = out;
}