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
    var url = "../controller/search_edit_ad_event_controller.php";

    var search = getQueryVariable("eventCode");

    xmlhttp.onreadystatechange=function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            myFunction(xmlhttp.responseText);
        }
    }

    xmlhttp.open("GET", url +"?search=" + search, true);
    xmlhttp.send();
}

function myFunction(response) {
    var arr = JSON.parse(response);
    var adEventLabel = document.getElementById("eventCode").value;
    document.getElementById("eventCode").innerHTML = arr[0].eventCode;
    document.getElementById("adName").innerHTML = arr[0].adName;
    document.getElementById("startDate").innerHTML = arr[0].startDate;
    document.getElementById("endDate").innerHTML = arr[0].endDate;
    document.getElementById("adDescription").innerHTML = arr[0].adDescription;
    document.getElementById("adType").innerHTML = arr[0].adType;
}
