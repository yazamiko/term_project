function retrieveResult() {
    var xmlhttp = new XMLHttpRequest();
    var url = "../controller/search_item_controller.php";

    var search = document.getElementById("search").value;
    var property = document.getElementById("property").value;

    xmlhttp.onreadystatechange=function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            myFunction(xmlhttp.responseText);
        }
    }

    xmlhttp.open("GET", url +"?search=" + search + "&property=" + property, true);
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
            "<th>Add</th>" +
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