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

function retrievePromotion() {
    var xmlhttp = new XMLHttpRequest();
    var url = "../controller/search_promotion_controller.php";

    var search = getQueryVariable('promo_code');
    var property = "PromoCode";

    xmlhttp.onreadystatechange=function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            preparePromotionResult(xmlhttp.responseText);
        }
    }

    xmlhttp.open("GET", url +"?search=" + search + "&property=" + property, true);
    xmlhttp.send();

    retrieveResult();
}

function sendToEditPage() {
    var promoCode = getQueryVariable("promo_code");
    location.href = "edit_promo_form_ui.html?promo_code=" + promoCode;

}

function preparePromotionResult(response) {
    var arr = JSON.parse(response);
    document.getElementById("promo_code").innerHTML = arr[0].PromoCode;
    document.getElementById("name").innerHTML = arr[0].Name;
    document.getElementById("description").innerHTML = arr[0].Description;
    document.getElementById("amount_off").innerHTML = arr[0].AmountOff;
    document.getElementById("promo_type").innerHTML = arr[0].PromoType;
}

function retrieveResult() {
    var xmlhttp = new XMLHttpRequest();
    var url = "../controller/promotion_page_controller.php";

    var search = getQueryVariable('promo_code');

    xmlhttp.onreadystatechange=function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            myFunction(xmlhttp.responseText);
        }
    }

    xmlhttp.open("GET", url +"?search=" + search, true);
    xmlhttp.send();

    return false;
}

function myFunction(response) {
    var arr = JSON.parse(response);
    var i;
    var out="<table class='table table-striped table-hover'>";
    out += "<tr>" +
            "<th>Item Number</th>" +
            "<th>Item Description</th>" +
            "<th>Category</th>" +
            "<th>Department Name</th>" +
            "<th>Purchase Cost</th>" +
            "<th>Full Retail Price</th>" +
            "<th>Remove</th>" +
        "</tr>";
    for(i = 0; i < arr.length; i++) {
        out += "<tr><td>" +
        "<a href='item_page.html?item_number="+ arr[i].ItemNumber +"'>"+ arr[i].ItemNumber +"</a>" +
        "</td><td>" +
        arr[i].ItemDescription +
        "</td><td>" +
        arr[i].Category +
        "</td><td>" +
        arr[i].DepartmentName +
        "</td><td>" +
        arr[i].PurchaseCost +
        "</td><td>" +
        arr[i].FullRetailPrice +
        "</td><td>" +
        "<input type='checkbox' id='items[]' name='items[]' value="+ arr[i].ItemNumber +">" +
        "</td></tr>" ;
    }
    out += "</table>";
    document.getElementById("resultTable").innerHTML = out;
}
