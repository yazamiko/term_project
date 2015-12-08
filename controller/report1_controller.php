<?php
require('../dao/ad_event_dao.php');
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

$start_date = $_POST['start_date'];
$end_date = $_POST['end_date'];

$ret = array();

$adDAO = new AdDAO(); 
$adEvents = $adDAO->readByDate($start_date, $end_date);

foreach ($adEvents as $ad) {
	$promotions = $adDAO->readPromotionFromAdEvent($ad->getEventCode());
	$p_array = array();
	foreach ($promotions as $p) {
		$temp = array('PromoCode' => $p->getPromoCode(), 'Name' => $p->getName(), 
			'Description' => $p->getDescription(), 'AmountOff' => $p->getAmountOff(),
			'PromoType' => $p->getPromoType());
		array_push($p_array, $temp);
	}
	$ad_array = array('eventCode' => $ad->getEventCode(), 'adName' => $ad->getAdName(),
		'startDate' => $ad->getStartDate(), 'endDate' => $ad->getEndDate(), 
		'adDescription' => $ad->getAdDescription(), 'adType' => $ad->getAdType());
	$result = array('ad' => $ad_array, 'promotions' => $p_array);
	array_push($ret, $result);
}
echo json_encode($ret);
?>