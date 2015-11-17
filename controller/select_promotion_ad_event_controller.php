<?php
	session_start();

	$_SESSION['ad_event_promo_code'] = $checkboxValue = $_POST['promoCodes'];
	
	header("Location: ../view/search_ad_event_promo.html");
?>