<?php
require('../dao/ad_event_dao.php');
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

session_start();

if(isset($_GET["event_code"]))
{
	$arrEventCode = array($_GET["event_code"]);
}
else
	$arrEventCode = $_SESSION['ad_event_values'];
if(isset($_GET["promo_code"]))
{
	$arrPromoCode = array($_GET["promo_code"]);
}
else
$arrPromoCode = $_SESSION['ad_event_promo_code'];

//$arrEventCode = $_SESSION['ad_event_values'];
//$arrPromoCode = $_SESSION['ad_event_promo_code'];

$adDAO = new AdDAO();
$result = $adDAO->readAdEventPromoCombo($arrEventCode, $arrPromoCode);

$outp = "[";
foreach($result as $rs) {
    if ($outp != "[") {$outp .= ",";}
    $outp .= '{"EventCode":"'  . $rs->getEventCode() . '",';
    $outp .= '"PromoCode":"'   . $rs->getPromoCode() . '",';
    $outp .= '"Notes":"'   . $rs->getNotes() . '"}';
}
$outp .="]";


echo($outp);
?>