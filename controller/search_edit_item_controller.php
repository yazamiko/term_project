<?php
require('../dao/item_dao.php');
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

$itemDAO = new ItemDAO();
$result = $itemDAO->readByProperty($_GET["search"], $_GET["property"]);

session_start();

$outp = "[";
foreach($result as $rs) {
	$_SESSION["edit_item"] = $rs->getItemNumber();
    if ($outp != "[") {$outp .= ",";}
    $outp .= '{"ItemNumber":"'  . $rs->getItemNumber() . '",';
    $outp .= '"ItemDescription":"'   . $rs->getItemDescription() . '",';
    $outp .= '"Category":"'   . $rs->getCategory() . '",';
    $outp .= '"DepartmentName":"'   . $rs->getDepartmentName() . '",';
    $outp .= '"PurchaseCost":"'   . $rs->getPurchaseCost() . '",';
    $outp .= '"FullRetailPrice":"'. $rs->getFullRetailPrice()  . '"}'; 
}
$outp .="]";


echo($outp);
?>