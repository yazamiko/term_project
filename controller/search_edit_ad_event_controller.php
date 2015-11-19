<?php
	require('../dao/ad_event_dao.php');
	header("Access-Control-Allow-Origin: *");
	header("Content-Type: application/json; charset=UTF-8");

$adDAO = new AdDAO();

$result = $adDAO->readByProperty($_GET["search"], "", "", "", "");

session_start();

$outp = "[";
	foreach($result as $rs) {
		$_SESSION["edit_ad_event"] = $rs->getEventCode();
		if ($outp != "[") {$outp .= ",";}
		$outp .= '{"eventCode":"'  . $rs->getEventCode() . '",';
		$outp .= '"adName":"'   . $rs->getAdName() . '",';
		$outp .= '"adDescription":"'   . $rs->getAdDescription() . '",';
		$outp .= '"startDate":"'   . $rs->getStartDate() . '",';
		$outp .= '"endDate":"'   . $rs->getEndDate() . '",';
		$outp .= '"adType":"'. $rs->getAdType()  . '"}'; 
	}
	$outp .="]";

echo($outp);
?>