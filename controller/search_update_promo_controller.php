<?php
require('../dao/promo_dao.php');
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");


$promotionDAO = new PromoDAO();

$promoCode = "";
$name = "";
$description = "";
	
if(isset($_GET["promoCode"]))
	$promoCode = $_GET["promoCode"];
if(isset($_GET["name"]))
	$name = $_GET["name"];
if(isset($_GET["description"]))
	$description = $_GET["description"];

$result = $promotionDAO->readByProperty($promoCode, $name, $description);

$list = array();
foreach($result as $rs) {
   $list[] = array('PromoCode' => $rs->getPromoCode(),
   					'Name' => $rs->getName(),
   					'Description' => $rs->getDescription(),
   					'AmountOff' => $rs->getAmountOff(),
   					'PromoType' => $rs->getPromoType());
}

echo(json_encode($list));
?>
