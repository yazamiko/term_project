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

function retrieveResult() {
    var xmlhttp = new XMLHttpRequest();
    var url = "../controller/search_edit_item_controller.php";

    var search = getQueryVariable("item_number");
    var property = 'ItemNumber';

    xmlhttp.onreadystatechange=function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            //alert(xmlhttp.responseText);
            myFunction(xmlhttp.responseText);
        }
    }

    xmlhttp.open("GET", url +"?search=" + search + "&property=" + property, true);
    xmlhttp.send();
}

function myFunction(response) {
    var arr = JSON.parse(response);
    var itemNumberLabel = document.getElementById("item_number").value;
    document.getElementById("item_number").innerHTML = arr[0].ItemNumber;
    document.getElementById("item_desc").innerHTML = arr[0].ItemDescription;
    document.getElementById("category").innerHTML = arr[0].Category;
    document.getElementById("dept_name").innerHTML = arr[0].DepartmentName;
    document.getElementById("purchase_cost").innerHTML = arr[0].PurchaseCost;
    document.getElementById("full_retail_price").innerHTML = arr[0].FullRetailPrice;
}

function retrievePromotion() {
    var xmlhttp = new XMLHttpRequest();
    var url = "../controller/biggest_savings_controller.php";

    var search = getQueryVariable('item_number');
    
    xmlhttp.onreadystatechange=function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
		  //alert(xmlhttp.responseText);
            preparePromotionResult(xmlhttp.responseText);
        }
    }

    xmlhttp.open("GET", url +"?search=" + search, true);
    xmlhttp.send();

    return false;
}
function preparePromotionResult(response) {
    var arr = JSON.parse(response);

    if(arr.length > 0) {
      promoCode = arr[0].PromoCode;

      var salePrice = parseFloat(arr[0].SalePrice);
      var diff = arr[0].FullRetailPrice - arr[0].SalePrice;
      
      document.getElementById("promo_code").innerHTML = promoCode;
      document.getElementById("sale_price").innerHTML = salePrice.toFixed(2);
      document.getElementById("saving").innerHTML = diff.toFixed(2);

      retrieveAdEvent(promoCode);
    }

}

function retrieveAdEvent(promoCode) {
    var xmlhttp = new XMLHttpRequest();
    var url = "../controller/adevent_from_biggest_savings_controller.php";

    var search = promoCode;
    
    xmlhttp.onreadystatechange=function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
          //alert(xmlhttp.responseText);
            prepareEventResult(xmlhttp.responseText);
        }
    }

    url += "?search=" + search;

    xmlhttp.open("GET", url , true);
    xmlhttp.send();
}

function prepareEventResult(response) {
    //alert(response);
    var arr = JSON.parse(response);
    //    var eventCode = getQueryVariable("eventCode");
   if(arr.length > 0) {
      document.getElementById("event_code").innerHTML = arr[0].eventCode;
      document.getElementById("event_name").innerHTML = arr[0].adName;
   }
}