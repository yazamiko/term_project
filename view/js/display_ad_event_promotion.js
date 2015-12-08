
function retrieveResult() {
    var xmlhttp = new XMLHttpRequest();
    var url = "../controller/display_ad_event_promotion_controller.php";

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
            "<th>Ad Event Code</th>" +
            "<th>Promotion Code</th>" +
            "<th>Notes</th>" +
         //   "<th>Remove</th>" +
        "</tr>";
    for(i = 0; i < arr.length; i++) {
        out += "<tr><td>" +
        //"<a href='item_page.html?item_number="+ arr[i].ItemNumber +"'>"+ arr[i].ItemNumber +"</a>" +
        arr[i].EventCode +
        "</td><td>" +
        arr[i].PromoCode +
        "</td><td>" +
        arr[i].Notes +
      //  "</td><td>" +
      //  arr[i].DepartmentName +
        "</td></tr>" ;
    }
    out += "</table>";
    document.getElementById("resultTable").innerHTML = out;
}
