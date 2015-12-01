function checkBoxChecked()
{
    var checkedAtLeastOne = false;
    $('input[type="checkbox"]').each(function() {
        if ($(this).is(":checked")) {
            checkedAtLeastOne = true;
        }
    });
    return checkedAtLeastOne;
}

function validate()
{
    var box = checkBoxChecked();
    if(box == false)
    {
        document.getElementById("headErrMsg").innerHTML 
            = "Correct the following error:";
        document.getElementById("errMsg").innerHTML = "<li>Please select at least one item.</li>";
    }
    
    return box;
}

function retrieveResult() {
    var xmlhttp = new XMLHttpRequest();
    var url = "../controller/search_item_controller.php?";
	
    var itemNum = document.getElementById("item_number").value;
    var itemDesc = document.getElementById("item_desc").value;
	
	var e = document.getElementById("category");
	if(e == null)
		var cat = "";
	else
		var cat = e.options[e.selectedIndex].value;
	
    var d = document.getElementById("dept_name");
	if(d == null)
		var deptName = "";
	else
		var deptName = d.options[d.selectedIndex].value;

    if(itemNum != "")
        url += "item_num=" + itemNum + "&";
    if(itemDesc != "")
        url += "item_desc=" + itemDesc + "&";
    if(cat != "")
        url += "category=" + cat + "&";
    if(deptName != "")
        url += "dept_name=" + deptName + "&";
    
    url = url.slice(0, -1);
	
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
            "<th>Select Item(s)</th>" +
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



function retrieveCategory() {
    var xmlhttp = new XMLHttpRequest();
    var url = "../controller/retrieve_category_controller.php";
	
	xmlhttp.onreadystatechange=function() {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			itemCategoryResult(xmlhttp.responseText);
		}
	}
		
	xmlhttp.open("GET", url, true);
	xmlhttp.send();
	
    return false;
}

function itemCategoryResult(response) {
    var arr = JSON.parse(response);
    var i;
    var out="<select class='form-control' name='category' id='category' onchange='retrieveResult()'>";
	out += "<option value=''>SELECT CATEGORY</option>";
	
    for(i = 0; i < arr.length; i++) {
        out += "<option value='" + arr[i].Category + "'>" + arr[i].Category + "</option>";
    }
	out += "<option value='other'>OTHER</option>";
    out += "</select>";
    document.getElementById("categoryDropDown").innerHTML = out;
}

function retrieveDepartment() {
    var xmlhttp = new XMLHttpRequest();
    var url = "../controller/retrieve_department_controller.php";
	
	xmlhttp.onreadystatechange=function() {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			itemDepartmentResult(xmlhttp.responseText);
		}
	}
		
	xmlhttp.open("GET", url, true);
	xmlhttp.send();
	
    return false;
}

function itemDepartmentResult(response) {
    var arr = JSON.parse(response);
    var i;
    var out="<select class='form-control' name='dept_name' id='dept_name' onchange='retrieveResult()'>";
	out += "<option value=''>SELECT DEPARTMENT NAME</option>";
	
    for(i = 0; i < arr.length; i++) {
        out += "<option value='" + arr[i].DepartmentName + "'>" + arr[i].DepartmentName + "</option>";
    }
	out += "<option value='otherDep'>OTHER</option>";
    out += "</select>";
    document.getElementById("deptDropDown").innerHTML = out;
}
