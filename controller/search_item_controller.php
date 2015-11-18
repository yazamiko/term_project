<?php
require('../dao/item_dao.php');
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

$itemDAO = new ItemDAO();

$itemNum = "";
$itemDesc = "";
$cat = "";
$deptName = "";

if(isset($_GET["item_num"]))
    $itemNum = $_GET["item_num"];
if(isset($_GET["item_desc"]))
    $itemDesc = $_GET["item_desc"];
if(isset($_GET["category"]))
    $cat = $_GET["category"];
if(isset($_GET["dept_name"]))
    $deptName = $_GET["dept_name"];

$result = $itemDAO->readByProperty($itemNum, $itemDesc, $cat, $deptName);

$outp = "[";
foreach($result as $rs) {
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