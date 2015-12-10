<?php
require('../dao/promo_dao.php');

$promoDAO = new PromoDAO();
$promoCode="";
$name="";
$desc="";
	if(isset($_GET["promo_code"]))
		$promoCode = $_GET["promo_code"];
	if(isset($_GET["name"]))
		$name = $_GET["name"];
	if(isset($_GET["description"]))
		$desc = $_GET["description"];

$result = $promoDAO->readByProperty($promoCode, $name, $desc);

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