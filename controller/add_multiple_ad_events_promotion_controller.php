<?php
require('../dao/ad_event_dao.php');

session_start();
$arrEventCode = $_SESSION['ad_event_values'];
$arrPromoCode = $_SESSION['ad_event_promo_code'];

$myArray = array();

$notes = $_POST['notes'];

$adDAO = new AdDAO();

foreach ($arrEventCode as $eventCode){
	foreach ($arrPromoCode as $promoCode){
		$myArray[] = $adDAO->addEventToPromotion($eventCode, $promoCode, $notes);
	}
}

$result = $myArray[0];

foreach ($myArray as $arr)
{
	if($arr['status'] == false)
	{
		$result = $arr;
		break;
	}
}

echo json_encode($result);

?>