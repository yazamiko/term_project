<?php
require('../dao/ad_event_dao.php');
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

session_start();
$arrEventCode = $_SESSION['ad_event_values'];
$arrPromoCode = $_SESSION['ad_event_promo_code'];

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