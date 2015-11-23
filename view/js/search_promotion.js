function sendData(promotion) {
    var xmlhttp = new XMLHttpRequest();
    var url = "../controller/add_multiple_items_promotion_controller.php";
    xmlhttp.open("POST", url, true);

    var params = "promo_code=" + promotion;

    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    xmlhttp.onreadystatechange=function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            getSubmitStatus(xmlhttp.responseText);
        }
    }

    xmlhttp.send(params);
}

function getSubmitStatus(response) {
    var arr = JSON.parse(response);
    $('#msgModal').html(arr.msg);
    $('#myModal').modal('show');

   	if(arr.status) {
   		$( "#modalButton" ).click(function() {
  			location.href = "../";
		});
   	}
}


function retrieveItem() {
    var xmlhttp = new XMLHttpRequest();
    var url = "../controller/display_item_controller.php";
	
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
            "<th>Item Description</th>" +
            "<th>Category</th>" +
            "<th>Department Name</th>" +
            "<th>Purchase Cost</th>" +
            "<th>Full Retail Price</th>" +
        "</tr>";
    for(i = 0; i < arr.length; i++) {
        out += "<tr><td>" +
        arr[i].ItemNumber +
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
        "</td></tr>" ;
    }
    out += "</table>";
    document.getElementById("itemTable").innerHTML = out;
}


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
            "<th>Select Promotion</th>" +
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
		"<button type='reset' class='btn btn-link' role='link' type='submit' name='promo' onclick='sendData(" + arr[i].PromoCode +")'>Add</button>" +
        "</td></tr>";
    }
    out += "</table>";
    document.getElementById("resultTable").innerHTML = out;
}