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
		document.getElementById("name").value = arr[0].Name;
    		document.getElementById("description").value = arr[0].Description;
    		document.getElementById("amount_off").value = arr[0].AmountOff;
    		document.getElementById("promo_type").value = arr[0].PromoType;
}
