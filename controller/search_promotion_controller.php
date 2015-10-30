<?php
require('../dao/promo_dao.php');
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");


$promotionDAO = new PromoDAO();
$result = $promotionDAO->readByProperty($_GET["search"], $_GET["property"]);

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