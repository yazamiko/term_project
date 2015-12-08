function retrieveResult() {
    var xmlhttp = new XMLHttpRequest();
    var url = "../controller/report1_controller.php";
    xmlhttp.open("POST", url, true);
	
    var start_date = document.getElementById("start_date").value;
    var end_date = document.getElementById("end_date").value;
	var params = "start_date="+start_date+"&end_date="+end_date;

    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	
    xmlhttp.onreadystatechange=function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            alert(xmlhttp.responseText);
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

    for(i = 0; i < arr.length; i++) {
        NumOfPromos = arr[i].promotions.length;
        out+="<div class='panel panel-primary'><div class='panel-heading'><div class='panel-title'>"+arr[i]['ad'].adName+"</div></div><div class='panel-body'>"
        out+="<table class='table table-striped table-hover'>";
        out += "<tr>" +
                "<th>Event Code</th>" +
                "<th>Name</th>" +
                "<th>Start Date</th>" +
                "<th>End Date</th>" +
                "<th>Description</th>" +
                "<th>Type</th>" +
            "</tr>";
            out += "<tr><td>" +
            arr[i]['ad'].eventCode +
            "</td><td>" +
            arr[i]['ad'].adName +
            "</td><td>" +
            arr[i]['ad'].startDate +
            "</td><td>" +
            arr[i]['ad'].endDate +
            "</td><td>" +
            arr[i]['ad'].adDescription +
            "</td><td>" +
            arr[i]['ad'].adType +
            "</td></tr>";
        out += "</table><br />";

        if(NumOfPromos > 0) {

            out+="<table class='table table-striped table-hover'>";
            out+="<h3>promotions associated with it</h3>";
            out += "<tr>" +
                    "<th>Promotion Code</th>" +
                    "<th>Name</th>" +
                    "<th>Description</th>" +
                    "<th>Amount Off</th>" +
                    "<th>Promotion Type</th>" +
                "</tr>";
            //alert(i);
            for(k = 0; k < NumOfPromos; k++) {
                out += "<tr><td>" +
                arr[i].promotions[k].PromoCode +
                "</td><td>" +
                arr[i].promotions[k].Name +
                "</td><td>" +
                arr[i].promotions[k].Description +
                "</td><td>" +
                arr[i].promotions[k].AmountOff +
                "</td><td>" +
                arr[i].promotions[k].PromoType +
                "</td></tr>";
            }
            out += "</table>";
        }
        out += "</div></div><hr/>"  
    }

    document.getElementById("resultTable").innerHTML = out;
   
}