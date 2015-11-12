<?php
require('../dao/promo_dao.php');
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

$promoDAO = new PromoDAO();
$result = $promoDAO->readByProperty($_GET["search"], $_GET["property"]);

session_start();

$outp = "[";
foreach($result as $rs) {
	$_SESSION["edit_promo"] = $rs->getPromoCode();
    if ($outp != "[") {$outp .= ",";}
    $outp .= '{"PromoCode":"'  . $rs->getPromoCode() . '",';
    $outp .= '"Name":"'   . $rs->getName() . '",';
    $outp .= '"Description":"'   . $rs->getDescription() . '",';
    $outp .= '"AmountOff":"'   . $rs->getAmountOff() . '",';
    $outp .= '"PromoType":"'   . $rs->getPromoType() . '",';
}
$outp .="]";


echo($outp);
?>
