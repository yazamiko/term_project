<?php
require('../dao/ad_event_dao.php');
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

$adDAO = new AdDAO();

//$eventCode="";
//$promoCode="";

$eventCode = $_POST["event_code"];
$promoCode = $_POST["promo_code"];
$notes = $_POST["notes"];

$result = $adDAO->updateEventPromotionNotes($eventCode, $promoCode, $notes);

/*$outp = "[";
foreach($result as $rs) {
	if ($outp != "[") {$outp .= ",";}
	$outp .= '{"EventCode":"'  . $rs->getEventCode() . '",';
	$outp .= '"PromoCode":"'   . $rs->getPromoCode() . '",';
	$outp .= '"Notes":"'   . $rs->getNotes() . '"}';

}
$outp .="]";
*/

echo(json_encode($result));
?>