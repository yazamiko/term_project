<?php
	require('../dao/ad_event_dao.php');
	header("Access-Control-Allow-Origin: *");
	header("Content-Type: application/json; charset=UTF-8");
	
	$newAd = new adEvent();
	$adDAO = new AdDAO();

	$newAd->setEventCode($_POST["event_code"]);
	$newAd->setAdName($_POST["event_name"]);
	$newAd->setAdDescription($_POST["ad_description"]);
	$newAd->setStartDate($_POST["start_date"]);
	$newAd->setEndDate($_POST["end_date"]);
	$newAd->setAdType($_POST["ad_type"]);

	$result = json_encode($adDAO->update($newAd));
	
	echo $result;
	
?>