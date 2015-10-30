<?php
	require('../model/ad.php');
	require('../dao/ad_event_dao.php');

	$newAd = new adEvent();
	$adDAO = new AdDAO();

	$newAd->setEventCode($_POST["event_code"]);
	$newAd->setAdName($_POST["event_name"]);
	$newAd->setAdDescription($_POST["ad_description"]);
	$newAd->setStartDate($_POST["start_date"]);
	$newAd->setEndDate($_POST["end_date"]);
	$newAd->setType($_POST["ad_type"]);

	$adDAO->create($newAd);

	header("Location:../");
?>