<?php
require('../dao/promo_dao.php');
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

$promoDAO = new PromoDAO();
$result = $promoDAO->readPromotionItem($_GET["search"]);

$outp = "[";
foreach($result as $rs) {
	if ($outp != "[") {$outp .= ",";}
	$outp .= '{"PromoCode":"'  . $rs->getPromoCode() . '",';
	$outp .= '"ItemNumber":"'   . $rs->getItemNumber() . '",';
	$outp .= '"ItemDescription":"'   . $rs->getItemDescription() . '",';
	$outp .= '"FullRetailPrice":"'   . $rs->getFullRetailPrice() . '",';
	$outp .= '"SalePrice":"'   . $rs->getSalePrice() . '"}';
}
$outp .="]";


echo($outp);
?>