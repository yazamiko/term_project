function retrieveResult() {
    var xmlhttp = new XMLHttpRequest();
    var url = "../controller/report2_controller.php";
    xmlhttp.open("POST", url, true);
    
    var amountOff = document.getElementById("amount_off").value;
    var typeValue = document.getElementById("type_value").value;
    var params = "amountOff="+amountOff+"&typeValue="+typeValue;

    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    
    xmlhttp.onreadystatechange=function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            //alert(xmlhttp.responseText);
            myFunction(xmlhttp.responseText);
        }
    }
    
    xmlhttp.send(params);

    return false;
}

function myFunction(response) {
    var arr = JSON.parse(response);
    
    var i, k;
    var out = "";

    out+="<table class='table table-striped table-hover'>";
    out += "<tr>" +
            "<th>Promotion Code</th>" +
            "<th>Name</th>" +
            "<th>Description</th>" +
            "<th>Amount Off</th>" +
            "<th>Promotion Type</th>" +
        "</tr>";
    //alert(i);
    for(i= 0; i < arr.length; i++) {
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
        "</td></tr>";
    }
    out += "</table>";
    out += "<hr/>";  

    document.getElementById("resultTable").innerHTML = out;
   
}