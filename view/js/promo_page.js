
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
    var promoCode = getQueryVariable("promo_code");
    location.href = "edit_promo_form_ui.html?promo_code=" + promoCode;

}

function retrieveResult() {
    var xmlhttp = new XMLHttpRequest();
    var url = "../controller/search_edit_promo_controller.php";

    var search = getQueryVariable("promo_code");
    var property = 'PromoCode';

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
    var promoCodeLabel = document.getElementById("promo_code").value;
    document.getElementById("name").innerHTML = arr[0].Name;
    document.getElementById("description").innerHTML = arr[0].Description;
    document.getElementById("amount_off").innerHTML = arr[0].AmountOff;
    document.getElementById("promo_type").innerHTML = arr[0].PromoType;
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
    var itemNumber = getQueryVariable("item_number");
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
        "<a href=../controller/add_item_promotion_controller.php?item_number="
        + itemNumber +"&promo_code="+ arr[i].PromoCode +">Add</a>"+
        "</td></tr>";
    }
    out += "</table>";
    document.getElementById("resultTable").innerHTML = out;
}
