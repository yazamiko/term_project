<?php
require('../dao/promo_dao.php');
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

$promoDAO = new PromoDAO();
$result = $promoDAO->readByProperty($_GET["search"], $_GET["property"]);

session_start();


$list = array();
foreach($result as $rs) {
	$_SESSION["edit_promo"] = $rs->getPromoCode();
   	$list[] = array('PromoCode' => $rs->getPromoCode(),
   					'Name' => $rs->getName(),
   					'Description' => $rs->getDescription(),
   					'AmountOff' => $rs->getAmountOff(),
   					'PromoType' => $rs->getPromoType());
}

echo(json_encode($list));
?>
