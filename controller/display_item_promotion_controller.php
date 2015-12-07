<?php
require('../dao/item_dao.php');
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

session_start();
$arrItemNumbers = $_SESSION['item_number_values'];

$itemDAO = new ItemDAO();
$result = $itemDAO->retrieveItems($arrItemNumbers);

$outp = "[";
foreach($result as $rs) {
    if ($outp != "[") {$outp .= ",";}
    $outp .= '{"ItemNumber":"'  . $rs->getItemNumber() . '",';
    $outp .= '"ItemDescription":"'   . $rs->getItemDescription() . '",';
    $outp .= '"Category":"'   . $rs->getCategory() . '",';
    $outp .= '"DepartmentName":"'   . $rs->getDepartmentName() . '",';
    $outp .= '"PurchaseCost":"'   . $rs->getPurchaseCost() . '",';
    $outp .= '"FullRetailPrice":"'   . $rs->getFullRetailPrice() . '",';
    $outp .= '"SalePrice":"'. $rs->getSalePrice()  . '"}'; 
}
$outp .="]";


echo($outp);
?>