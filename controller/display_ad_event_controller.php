<?php
require('../dao/ad_event_dao.php');

session_start();
$arrEventCode = $_SESSION['ad_event_values'];

$adDAO = new AdDAO();

$result = $adDAO->retrieveAdEvents($arrEventCode);

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