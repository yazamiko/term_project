<?php
require('../dao/promo_dao.php');
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

$promoDAO = new PromoDAO();
$promo = array($_GET["search"]);
$result = $promoDAO->retrievePromotions($promo);

$outp = "[";
foreach($result as $rs) {
	if ($outp != "[") {$outp .= ",";}
	$outp .= '{"PromoCode":"'  . $rs->getPromoCode() . '",';
	$outp .= '"Name":"'   . $rs->getName() . '",';
	$outp .= '"Description":"'   . $rs->getDescription() . '",';
	$outp .= '"AmountOff":"'   . $rs->getAmountOff() . '",';
	$outp .= '"PromoType":"'   . $rs->getPromotype() . '"}';

}
$outp .="]";


echo($outp);
?>