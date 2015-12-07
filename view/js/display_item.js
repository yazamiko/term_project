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
