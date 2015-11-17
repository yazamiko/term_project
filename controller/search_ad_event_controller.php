<?php
	require('../dao/ad_event_dao.php');
	header("Access-Control-Allow-Origin: *");
	header("Content-Type: application/json; charset=UTF-8");
	
	$adDAO = new AdDAO();
	$result = null;
	$property = $_GET["property"];
	
	if($property == "dates")
		$result = $adDAO->readByDates($_GET["startDate"], $_GET["endDate"]);
	else
		$result = $adDAO->readByProperty($_GET["search"], $property);
		
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