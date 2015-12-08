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
    var url = "../controller/display_promotion_controller.php";

    var name = getQueryVariable("name");
    var desc = getQueryVariable("description");
 //   var property = "PromoCode";
	
	url += "?name=" + name;// + "&description=" + desc;
	
    xmlhttp.onreadystatechange=function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            preparePromotionResult(xmlhttp.responseText);
        }
    }

//    xmlhttp.open("GET", url +"?search=" + search + "&property=" + property, true);
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}

function preparePromotionResult(response) {
    var arr = JSON.parse(response);
    document.getElementById("promo_code").innerHTML = arr[0].PromoCode;
    document.getElementById("name").innerHTML = arr[0].Name;
    document.getElementById("description").innerHTML = arr[0].Description;
    document.getElementById("amount_off").innerHTML = arr[0].AmountOff;
    document.getElementById("promo_type").innerHTML = arr[0].PromoType;
}
