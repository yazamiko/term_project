<?php
	require('../dao/ad_event_dao.php');
	header("Access-Control-Allow-Origin: *");
	header("Content-Type: application/json; charset=UTF-8");
	
	$adDAO = new AdDAO();
	$result = null;
	
	$eventCode = "";
	$eventName = "";
	$startDate = "";
	$endDate = "";
	$desc = "";
	
	if(isset($_GET["eventCode"]))
		$eventCode = $_GET["eventCode"];
	if(isset($_GET["eventName"]))
		$eventName = $_GET["eventName"];
	if(isset($_GET["startDate"]))
		$startDate = $_GET["startDate"];
	if(isset($_GET["endDate"]))
		$endDate = $_GET["endDate"];
	if(isset($_GET["desc"]))
		$desc = $_GET["desc"];
	
	$result = $adDAO->readByProperty($eventCode, $eventName, $startDate, $endDate, $desc);
		
	$outp = "[";
	foreach($result as $rs) {
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